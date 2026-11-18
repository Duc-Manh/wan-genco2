import type { WanVertex, WanEdge, WanTextLine } from '../types/wan.ts';
import { buildStencilPath } from '../data/stencils.ts';

const SVG_NS = 'http://www.w3.org/2000/svg';

export interface RenderOptions {
  showGrid: boolean;
  showBoundaries: boolean;
  showEdgeLabels: boolean;
  activeCategories: Set<string>;
  selectedRegion: string;
  searchQuery: string;
  selectedId: string | null;
  hoveredId: string | null;
}

function escapeId(raw: string): string {
  return raw.replace(/[^a-zA-Z0-9_-]/g, '');
}

function resolveFontFamily(family: string): string {
  if (family.toLowerCase().includes('times')) {
    return "'Times New Roman', Times, serif";
  }
  return "'Calibri', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
}

function createTextGroup(
  lines: WanTextLine[],
  boxWidth: number,
  boxHeight: number
): SVGGElement {
  const g = document.createElementNS(SVG_NS, 'g');
  g.setAttribute('class', 'wan-label-group');

  const lineHeights = lines.map((line) => {
    const maxFs = Math.max(...line.runs.map((r) => r.fontSize), 12);
    return maxFs * 1.18;
  });
  const totalHeight = lineHeights.reduce((acc, h) => acc + h, 0);
  let currentY = (boxHeight - totalHeight) / 2;

  lines.forEach((line, idx) => {
    const lineH = lineHeights[idx];
    const maxFs = Math.max(...line.runs.map((r) => r.fontSize), 12);
    const baselineY = currentY + maxFs * 0.84;
    currentY += lineH;

    const textEl = document.createElementNS(SVG_NS, 'text');
    const isLeft = line.align === 'left';
    const xPos = isLeft ? 4 : boxWidth / 2;

    textEl.setAttribute('x', xPos.toFixed(2));
    textEl.setAttribute('y', baselineY.toFixed(2));
    textEl.setAttribute('text-anchor', isLeft ? 'start' : 'middle');
    textEl.setAttribute('xml:space', 'preserve');

    for (const run of line.runs) {
      const tspan = document.createElementNS(SVG_NS, 'tspan');
      tspan.textContent = run.text;
      tspan.setAttribute('fill', run.color || '#000000');
      tspan.setAttribute('font-size', `${run.fontSize}px`);
      tspan.setAttribute('font-family', resolveFontFamily(run.fontFamily));
      if (run.bold) {
        tspan.setAttribute('font-weight', '700');
      }
      if (run.underline) {
        tspan.setAttribute('text-decoration', 'underline');
      }
      textEl.appendChild(tspan);
    }

    g.appendChild(textEl);
  });

  return g;
}

function createArrowPolygon(
  tipX: number,
  tipY: number,
  fromX: number,
  fromY: number,
  color: string,
  strokeWidth: number
): SVGPolygonElement | null {
  const dx = tipX - fromX;
  const dy = tipY - fromY;
  const len = Math.hypot(dx, dy);
  if (len < 1e-3) return null;

  const ux = dx / len;
  const uy = dy / len;
  const size = Math.max(8, strokeWidth * 3.2);
  const halfWidth = size * 0.52;

  const baseX = tipX - ux * size;
  const baseY = tipY - uy * size;
  const leftX = baseX - uy * halfWidth;
  const leftY = baseY + ux * halfWidth;
  const rightX = baseX + uy * halfWidth;
  const rightY = baseY - ux * halfWidth;

  const poly = document.createElementNS(SVG_NS, 'polygon');
  poly.setAttribute(
    'points',
    `${tipX.toFixed(2)},${tipY.toFixed(2)} ${leftX.toFixed(2)},${leftY.toFixed(2)} ${rightX.toFixed(2)},${rightY.toFixed(2)}`
  );
  poly.setAttribute('fill', color);
  return poly;
}

export function buildDiagramSvg(
  svg: SVGSVGElement,
  vertices: WanVertex[],
  edges: WanEdge[]
): {
  elementMap: Map<string, SVGGElement>;
  boundaryElements: SVGGElement[];
  edgeLabelElements: SVGGElement[];
} {
  svg.innerHTML = '';
  const elementMap = new Map<string, SVGGElement>();
  const boundaryElements: SVGGElement[] = [];
  const edgeLabelElements: SVGGElement[] = [];

  // 1. <defs> for gradients and grid pattern
  const defs = document.createElementNS(SVG_NS, 'defs');

  // Subtle CAD grid pattern
  const smallGrid = document.createElementNS(SVG_NS, 'pattern');
  smallGrid.setAttribute('id', 'wan-grid-small');
  smallGrid.setAttribute('width', '50');
  smallGrid.setAttribute('height', '50');
  smallGrid.setAttribute('patternUnits', 'userSpaceOnUse');
  const smallPath = document.createElementNS(SVG_NS, 'path');
  smallPath.setAttribute('d', 'M 50 0 L 0 0 0 50');
  smallPath.setAttribute('fill', 'none');
  smallPath.setAttribute('stroke', 'rgba(148, 163, 184, 0.16)');
  smallPath.setAttribute('stroke-width', '1');
  smallGrid.appendChild(smallPath);
  defs.appendChild(smallGrid);

  const largeGrid = document.createElementNS(SVG_NS, 'pattern');
  largeGrid.setAttribute('id', 'wan-grid-large');
  largeGrid.setAttribute('width', '250');
  largeGrid.setAttribute('height', '250');
  largeGrid.setAttribute('patternUnits', 'userSpaceOnUse');
  const rectGrid = document.createElementNS(SVG_NS, 'rect');
  rectGrid.setAttribute('width', '250');
  rectGrid.setAttribute('height', '250');
  rectGrid.setAttribute('fill', 'url(#wan-grid-small)');
  const largePath = document.createElementNS(SVG_NS, 'path');
  largePath.setAttribute('d', 'M 250 0 L 0 0 0 250');
  largePath.setAttribute('fill', 'none');
  largePath.setAttribute('stroke', 'rgba(148, 163, 184, 0.32)');
  largePath.setAttribute('stroke-width', '1.5');
  largeGrid.appendChild(rectGrid);
  largeGrid.appendChild(largePath);
  defs.appendChild(largeGrid);

  // Collect unique gradients from vertices
  const gradientMap = new Map<string, string>();
  for (const v of vertices) {
    if (
      v.fillColor !== 'none' &&
      v.gradientColor !== 'none' &&
      v.fillColor.toLowerCase() !== v.gradientColor.toLowerCase()
    ) {
      const key = `${v.fillColor}_${v.gradientColor}_${v.gradientDirection}`;
      if (!gradientMap.has(key)) {
        const gradId = `grad-${ escapeId(key) }`;
        gradientMap.set(key, gradId);
        const lg = document.createElementNS(SVG_NS, 'linearGradient');
        lg.setAttribute('id', gradId);
        lg.setAttribute('x1', '0%');
        lg.setAttribute('x2', '0%');
        if (v.gradientDirection === 'north') {
          lg.setAttribute('y1', '100%');
          lg.setAttribute('y2', '0%');
        } else {
          lg.setAttribute('y1', '0%');
          lg.setAttribute('y2', '100%');
        }
        const stop1 = document.createElementNS(SVG_NS, 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', v.fillColor);
        const stop2 = document.createElementNS(SVG_NS, 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', v.gradientColor);
        lg.appendChild(stop1);
        lg.appendChild(stop2);
        defs.appendChild(lg);
      }
    }
  }

  svg.appendChild(defs);

  // 2. Viewport Root Group
  const viewportGroup = document.createElementNS(SVG_NS, 'g');
  viewportGroup.setAttribute('id', 'wan-viewport');

  // Canvas paper background
  const paperBg = document.createElementNS(SVG_NS, 'rect');
  paperBg.setAttribute('id', 'wan-paper-bg');
  paperBg.setAttribute('x', '60');
  paperBg.setAttribute('y', '60');
  paperBg.setAttribute('width', '6110');
  paperBg.setAttribute('height', '4120');
  paperBg.setAttribute('rx', '8');
  paperBg.setAttribute('fill', '#ffffff');
  viewportGroup.appendChild(paperBg);

  // Grid overlay
  const gridRect = document.createElementNS(SVG_NS, 'rect');
  gridRect.setAttribute('id', 'wan-grid-overlay');
  gridRect.setAttribute('x', '106');
  gridRect.setAttribute('y', '106');
  gridRect.setAttribute('width', '6019');
  gridRect.setAttribute('height', '4032');
  gridRect.setAttribute('fill', 'url(#wan-grid-large)');
  gridRect.setAttribute('pointer-events', 'none');
  viewportGroup.appendChild(gridRect);

  // Combine vertices and edges in exact Z-order, keeping frame và boundaries behind interactive nodes
  type RenderItem =
    | { kind: 'vertex'; item: WanVertex; priority: number }
    | { kind: 'edge'; item: WanEdge; priority: number };

  const renderList: RenderItem[] = [];

  for (const v of vertices) {
    let priority = 2;
    if (v.category === 'frame') priority = 0;
    else if (v.category === 'boundary' || v.id === '2') priority = 1;
    else if (v.category === 'cloud') priority = 1.5;
    renderList.push({ kind: 'vertex', item: v, priority });
  }

  for (const e of edges) {
    renderList.push({ kind: 'edge', item: e, priority: 1.8 });
  }

  renderList.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return a.item.zOrder - b.item.zOrder;
  });

  for (const entry of renderList) {
    if (entry.kind === 'vertex') {
      const v = entry.item;
      const g = document.createElementNS(SVG_NS, 'g');
      g.setAttribute('class', `wan-element wan-vertex cat-${v.category}`);
      g.setAttribute('data-id', v.id);
      g.setAttribute('data-kind', 'vertex');
      g.setAttribute('data-category', v.category);
      g.setAttribute('data-region', v.region);

      const cx = v.width / 2;
      const cy = v.height / 2;
      const transform =
        v.rotation !== 0
          ? `translate(${v.x}, ${v.y}) rotate(${v.rotation}, ${cx}, ${cy})`
          : `translate(${v.x}, ${v.y})`;
      g.setAttribute('transform', transform);

      if (v.category === 'frame') {
        g.setAttribute('pointer-events', 'none');
      }

      const { d, mode } = buildStencilPath(v.stencilId, v.width, v.height, v.flipH);

      const hasFill =
        mode === 'fillstroke' &&
        v.fillColor !== 'none' &&
        v.fillOpacity > 0;
      const hasStroke =
        v.strokeColor !== 'none' &&
        v.strokeColor.toLowerCase() !== '#ffffff' &&
        v.strokeWidth > 0 &&
        v.strokeOpacity > 0;

      if (hasFill || hasStroke) {
        const path = document.createElementNS(SVG_NS, 'path');
        path.setAttribute('d', d);
        path.setAttribute('class', 'wan-shape-path');

        if (hasFill) {
          const gradKey = `${v.fillColor}_${v.gradientColor}_${v.gradientDirection}`;
          const gradId = gradientMap.get(gradKey);
          path.setAttribute('fill', gradId ? `url(#${gradId})` : v.fillColor);
          if (v.fillOpacity < 1) {
            path.setAttribute('fill-opacity', String(v.fillOpacity));
          }
        } else {
          path.setAttribute('fill', 'none');
        }

        if (hasStroke) {
          path.setAttribute('stroke', v.strokeColor);
          path.setAttribute('stroke-width', String(v.strokeWidth));
          if (v.strokeOpacity < 1) {
            path.setAttribute('stroke-opacity', String(v.strokeOpacity));
          }
          if (v.dashed) {
            path.setAttribute('stroke-dasharray', '9,6');
          }
        } else {
          path.setAttribute('stroke', 'none');
        }

        if (v.category === 'boundary' || v.id === '2') {
          path.setAttribute('pointer-events', 'stroke');
        }

        g.appendChild(path);
      } else if (v.lines.length > 0 && v.category !== 'frame') {
        // Invisible hit rect for pure text nodes (like Station headers) so they can be clicked easily
        const hitRect = document.createElementNS(SVG_NS, 'rect');
        hitRect.setAttribute('x', '0');
        hitRect.setAttribute('y', '0');
        hitRect.setAttribute('width', String(v.width));
        hitRect.setAttribute('height', String(v.height));
        hitRect.setAttribute('fill', 'transparent');
        hitRect.setAttribute('class', 'wan-hit-rect');
        g.appendChild(hitRect);
      }

      if (v.lines.length > 0) {
        const textGroup = createTextGroup(v.lines, v.width, v.height);
        g.appendChild(textGroup);
      }

      if (v.category === 'boundary') {
        boundaryElements.push(g);
      }

      viewportGroup.appendChild(g);
      elementMap.set(v.id, g);
    } else {
      const e = entry.item;
      const g = document.createElementNS(SVG_NS, 'g');
      g.setAttribute('class', `wan-element wan-edge cat-${e.category}`);
      g.setAttribute('data-id', e.id);
      g.setAttribute('data-kind', 'edge');
      g.setAttribute('data-category', e.category);
      g.setAttribute('data-region', e.region);

      // Wide transparent hit line for easy hovering/clicking
      const hitLine = document.createElementNS(SVG_NS, 'line');
      hitLine.setAttribute('x1', String(e.sourceX));
      hitLine.setAttribute('y1', String(e.sourceY));
      hitLine.setAttribute('x2', String(e.targetX));
      hitLine.setAttribute('y2', String(e.targetY));
      hitLine.setAttribute('stroke', 'transparent');
      hitLine.setAttribute('stroke-width', '14');
      hitLine.setAttribute('class', 'wan-edge-hit');
      g.appendChild(hitLine);

      // Visible optical/electrical line
      const line = document.createElementNS(SVG_NS, 'line');
      line.setAttribute('x1', String(e.sourceX));
      line.setAttribute('y1', String(e.sourceY));
      line.setAttribute('x2', String(e.targetX));
      line.setAttribute('y2', String(e.targetY));
      line.setAttribute('stroke', e.strokeColor);
      line.setAttribute('stroke-width', String(e.strokeWidth));
      line.setAttribute('stroke-linecap', 'round');
      line.setAttribute('class', 'wan-edge-line');
      if (e.dashed) {
        line.setAttribute('stroke-dasharray', '9,6');
      }
      g.appendChild(line);

      if (e.startArrow) {
        const startPoly = createArrowPolygon(
          e.sourceX,
          e.sourceY,
          e.targetX,
          e.targetY,
          e.strokeColor,
          e.strokeWidth
        );
        if (startPoly) g.appendChild(startPoly);
      }

      if (e.endArrow) {
        const endPoly = createArrowPolygon(
          e.targetX,
          e.targetY,
          e.sourceX,
          e.sourceY,
          e.strokeColor,
          e.strokeWidth
        );
        if (endPoly) g.appendChild(endPoly);
      }

      // Edge label centered on midpoint
      if (e.labelLines.length > 0) {
        const midX = (e.sourceX + e.targetX) / 2 + e.labelOffsetX;
        const midY = (e.sourceY + e.targetY) / 2 + e.labelOffsetY;

        const lblGroup = document.createElementNS(SVG_NS, 'g');
        lblGroup.setAttribute('class', 'wan-edge-label');
        const rotTransform =
          e.labelRotation !== 0
            ? `translate(${midX.toFixed(2)}, ${midY.toFixed(2)}) rotate(${e.labelRotation})`
            : `translate(${midX.toFixed(2)}, ${midY.toFixed(2)})`;
        lblGroup.setAttribute('transform', rotTransform);

        // Estimate label box dimensions for clean white background pill
        let maxW = 20;
        let totalH = 0;
        for (const l of e.labelLines) {
          const lineText = l.runs.map((r) => r.text).join('');
          const maxFs = Math.max(...l.runs.map((r) => r.fontSize), 12);
          const estW = lineText.length * maxFs * 0.52 + 10;
          if (estW > maxW) maxW = estW;
          totalH += maxFs * 1.18;
        }
        totalH += 4;

        if (e.labelBgColor && e.labelBgColor.toLowerCase() !== 'none') {
          const bgRect = document.createElementNS(SVG_NS, 'rect');
          bgRect.setAttribute('x', (-maxW / 2).toFixed(2));
          bgRect.setAttribute('y', (-totalH / 2).toFixed(2));
          bgRect.setAttribute('width', maxW.toFixed(2));
          bgRect.setAttribute('height', totalH.toFixed(2));
          bgRect.setAttribute('rx', '3');
          bgRect.setAttribute('fill', '#ffffff');
          bgRect.setAttribute('fill-opacity', '0.92');
          lblGroup.appendChild(bgRect);
        }

        const innerText = createTextGroup(e.labelLines, 0, 0);
        lblGroup.appendChild(innerText);

        g.appendChild(lblGroup);
        edgeLabelElements.push(lblGroup);
      }

      viewportGroup.appendChild(g);
      elementMap.set(e.id, g);
    }
  }

  svg.appendChild(viewportGroup);
  return { elementMap, boundaryElements, edgeLabelElements };
}

