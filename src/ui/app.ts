import type {
  WanVertex,
  WanEdge,
  WanStationInfo,
  RegionId,
  ViewportState,
} from '../types/wan.ts';
import {
  DIAGRAM_BOUNDS,
  CATEGORY_META,
  STATIONS,
  VERTICES,
  EDGES,
} from '../data/wanElements.ts';
import { buildDiagramSvg } from '../renderer/svgDiagram.ts';

interface RegionPreset {
  id: RegionId;
  label: string;
  bounds: { x: number; y: number; w: number; h: number };
}

const REGION_PRESETS: RegionPreset[] = [
  {
    id: 'all',
    label: 'Toàn mạng',
    bounds: { x: 100, y: 100, w: 6020, h: 4040 },
  },
  {
    id: 'north',
    label: 'Miền Bắc & Trung Sơn',
    bounds: { x: 1300, y: 150, w: 3450, h: 1220 },
  },
  {
    id: 'north-central',
    label: 'Cụm Quảng Trị',
    bounds: { x: 700, y: 1380, w: 1450, h: 1200 },
  },
  {
    id: 'central',
    label: 'Quảng Nam - Đà Nẵng (A3)',
    bounds: { x: 1550, y: 1220, w: 2200, h: 1450 },
  },
  {
    id: 'south-central',
    label: 'An Khê - Sông Ba Hạ',
    bounds: { x: 3300, y: 1420, w: 1650, h: 1500 },
  },
  {
    id: 'south',
    label: 'Miền Nam & Cần Thơ (A2)',
    bounds: { x: 1450, y: 2550, w: 3100, h: 1300 },
  },
  {
    id: 'legend',
    label: 'Bảng Ghi Chú',
    bounds: { x: 350, y: 2600, w: 1020, h: 1020 },
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  'evnict-managed': 'Thiết bị truyền dẫn hiện tại EVNICT quản lý',
  'genco2-sdh': 'Thiết bị truyền dẫn của GENCO2',
  'evnict-sdh': 'Thiết bị truyền dẫn của EVNICT',
  'ptc-sdh': 'Thiết bị truyền dẫn PTCx',
  'cpc-sdh': 'Thiết bị truyền dẫn EVNCPC',
  'mpls-ot': 'Thiết bị MPLS-TP (OT) của GENCO2',
  'mpls-it': 'Thiết bị MPLS-TP (IT) của GENCO2',
  'otn-evnict': 'Thiết bị truyền dẫn OTN của EVNICT',
  'otn-genco2': 'Thiết bị truyền dẫn OTN trang bị mới của GENCO2',
  station: 'Trạm biến áp / Nhà máy điện / Văn phòng',
  boundary: 'Khung ranh giới trạm',
  cloud: 'Mạng truyền dẫn (Cloud)',
  icon: 'Biểu tượng thiết bị / Trạm',
  annotation: 'Nhãn thông tin / Khoảng cách cáp',
  legend: 'Mục bảng GHI CHÚ',
  frame: 'Khung bản vẽ',
  'cable-genco2': 'Cáp quang Genco2 vận hành',
  'cable-ptc': 'Cáp quang PTCx vận hành',
  'cable-evnict': 'Cáp quang EVNICT vận hành',
  'cable-cpc': 'Cáp quang EVNCPC vận hành',
  'cable-npt': 'Cáp quang EVNNPT vận hành',
  'cable-viettel': 'Cáp quang VIETTEL vận hành',
  'cable-legend': 'Mẫu cáp trong bảng GHI CHÚ',
};

const REGION_LABELS: Record<RegionId, string> = {
  all: 'Toàn mạng',
  north: 'Miền Bắc & Bắc Trung Bộ',
  'north-central': 'Bắc Trung Bộ (Cụm Quảng Trị)',
  central: 'Trung Trung Bộ (Quảng Nam - Đà Nẵng)',
  'south-central': 'Nam Trung Bộ & Tây Nguyên',
  south: 'Miền Nam & ĐBSCL',
  legend: 'Bảng Ghi Chú',
};

export class WanApp {
  private container: HTMLElement;
  private vertices: WanVertex[];
  private edges: WanEdge[];
  private vertexMap = new Map<string, WanVertex>();
  private edgeMap = new Map<string, WanEdge>();
  private svgElement!: SVGSVGElement;
  private viewportGroup!: SVGGElement;
  private canvasWrapper!: HTMLElement;
  private minimapSvg!: SVGSVGElement;
  private minimapRect!: SVGRectElement;
  private tooltipEl!: HTMLElement;

  private elementDomMap = new Map<string, SVGGElement>();
  private boundaryElements: SVGGElement[] = [];
  private edgeLabelElements: SVGGElement[] = [];

  private viewport: ViewportState = { x: 0, y: 0, scale: 0.22 };
  private isPanning = false;
  private panStartX = 0;
  private panStartY = 0;
  private pointerDownX = 0;
  private pointerDownY = 0;

  private activeSidebarTab: 'legend' | 'stations' | 'stats' = 'legend';
  private sidebarCollapsed = false;
  private activeRegion: RegionId = 'all';
  private stationTypeFilter: string = 'ALL';
  private stationSearchQuery: string = '';
  private globalSearchQuery: string = '';

  private isolatedCategory: string | null = null;
  private hiddenCategories = new Set<string>();
  private showGrid = true;
  private showBoundaries = true;
  private showEdgeLabels = true;
  private showMinimap = true;

  private selectedId: string | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    // Clone data so live edits can be reset if desired
    this.vertices = structuredClone(VERTICES);
    this.edges = structuredClone(EDGES);
    this.rebuildLookupMaps();
  }

  private rebuildLookupMaps(): void {
    this.vertexMap.clear();
    this.edgeMap.clear();
    for (const v of this.vertices) this.vertexMap.set(v.id, v);
    for (const e of this.edges) this.edgeMap.set(e.id, e);
  }

  public mount(): void {
    this.renderShell();
    this.initDiagramSvg();
    this.initMinimap();
    this.bindEvents();
    this.renderSidebarContent();
    this.renderInspector();

    requestAnimationFrame(() => {
      this.zoomToBounds(REGION_PRESETS[0].bounds, false);
    });
  }

  private renderShell(): void {
    this.container.innerHTML = `
      <div class="wan-layout">
        <!-- Top Header Bar -->
        <header class="wan-header">
          <div class="wan-brand">
            <button id="btn-toggle-sidebar" class="wan-icon-btn" title="Đóng/Mở bảng điều khiển bên trái">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <line x1="9" y1="3" x2="9" y2="21"/>
              </svg>
            </button>
            <div class="wan-brand-badge">EVN / GENCO2</div>
            <div class="wan-brand-titles">
              <h1>SƠ ĐỒ MẠNG TRUYỀN DẪN VIỄN THÔNG EVNGENCO2</h1>
              <span class="wan-subtitle">Bản vẽ kỹ thuật số hóa tương tác TypeScript • ${STATIONS.length} Trạm &amp; Nhà máy • ${this.vertices.length} Phần tử • ${this.edges.length} Tuyến kết nối</span>
            </div>
          </div>

          <!-- Search Box -->
          <div class="wan-search-box">
            <svg class="wan-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              id="wan-global-search"
              type="text"
              placeholder="Tìm trạm (500kV Hòa Bình, A2, Phả Lại...) hoặc thiết bị (NPT-1050, RIBBON 9904X)..."
              autocomplete="off"
            />
            <button id="btn-clear-search" class="wan-search-clear hidden" title="Xóa tìm kiếm">&times;</button>
            <div id="wan-search-dropdown" class="wan-search-dropdown hidden"></div>
          </div>

          <!-- Toolbar Actions -->
          <div class="wan-toolbar">
            <div class="wan-btn-group">
              <button id="btn-zoom-out" class="wan-tool-btn" title="Thu nhỏ (-)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <span id="wan-zoom-label" class="wan-zoom-readout">22%</span>
              <button id="btn-zoom-in" class="wan-tool-btn" title="Phóng to (+)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <button id="btn-zoom-fit" class="wan-tool-btn" title="Vừa màn hình (F)">Vừa khung</button>
              <button id="btn-zoom-100" class="wan-tool-btn" title="Tỷ lệ thực 100% (0)">100%</button>
            </div>

            <div class="wan-btn-group">
              <button id="btn-toggle-grid" class="wan-tool-btn active" title="Bật/Tắt lưới kỹ thuật">Lưới</button>
              <button id="btn-toggle-boundaries" class="wan-tool-btn active" title="Bật/Tắt khung nét đứt ranh giới trạm">Ranh giới</button>
              <button id="btn-toggle-labels" class="wan-tool-btn active" title="Bật/Tắt nhãn thông số trên tuyến cáp">Nhãn cáp</button>
            </div>

            <div class="wan-btn-group">
              <button id="btn-export-svg" class="wan-tool-btn wan-btn-primary" title="Tải xuống file vector SVG">Xuất SVG</button>
              <button id="btn-export-png" class="wan-tool-btn" title="Tải xuống ảnh PNG độ phân giải cao">Xuất PNG</button>
            </div>
          </div>
        </header>

        <!-- Region Quick-Jump Bar -->
        <nav class="wan-region-bar" id="wan-region-bar">
          <span class="wan-region-title">Khu vực:</span>
          ${REGION_PRESETS.map(
      (r) => `
            <button class="wan-region-pill ${r.id === 'all' ? 'active' : ''}" data-region="${r.id}">
              ${r.label}
            </button>
          `
    ).join('')}
          <div class="wan-region-spacer"></div>
          <span class="wan-hint-text">Cuộn chuột để Phóng to/Thu nhỏ • Kéo chuột để Di chuyển • Nhấn vào Thiết bị/Tuyến cáp để xem &amp; sửa</span>
        </nav>

        <!-- Main Workspace Body -->
        <div class="wan-workspace">
          <!-- Left Sidebar -->
          <aside class="wan-sidebar" id="wan-sidebar">
            <div class="wan-sidebar-tabs">
              <button class="wan-tab-btn active" data-tab="legend">Ghi chú &amp; Lọc</button>
              <button class="wan-tab-btn" data-tab="stations">Trạm (${STATIONS.length})</button>
              <button class="wan-tab-btn" data-tab="stats">Thống kê</button>
            </div>
            <div class="wan-sidebar-body" id="wan-sidebar-body"></div>
          </aside>

          <!-- Interactive SVG Canvas -->
          <main class="wan-canvas-wrapper" id="wan-canvas-wrapper">
            <svg id="wan-diagram-svg" class="wan-diagram-svg" xmlns="http://www.w3.org/2000/svg"></svg>

            <!-- Hover Tooltip -->
            <div id="wan-tooltip" class="wan-tooltip hidden"></div>

            <!-- Floating Minimap -->
            <div id="wan-minimap-card" class="wan-minimap-card">
              <div class="wan-minimap-header">
                <span>Bản đồ thu nhỏ (6125 &times; 4138)</span>
                <button id="btn-close-minimap" class="wan-minimap-toggle" title="Ẩn bản đồ thu nhỏ">&ndash;</button>
              </div>
              <svg id="wan-minimap-svg" class="wan-minimap-svg" viewBox="80 80 6080 4080"></svg>
            </div>
          </main>

          <!-- Right Inspector Panel -->
          <aside class="wan-inspector hidden" id="wan-inspector"></aside>
        </div>
      </div>
    `;

    this.svgElement = this.container.querySelector('#wan-diagram-svg') as SVGSVGElement;
    this.canvasWrapper = this.container.querySelector('#wan-canvas-wrapper') as HTMLElement;
    this.minimapSvg = this.container.querySelector('#wan-minimap-svg') as SVGSVGElement;
    this.tooltipEl = this.container.querySelector('#wan-tooltip') as HTMLElement;
  }

  private initDiagramSvg(): void {
    const built = buildDiagramSvg(this.svgElement, this.vertices, this.edges);
    this.elementDomMap = built.elementMap;
    this.boundaryElements = built.boundaryElements;
    this.edgeLabelElements = built.edgeLabelElements;
    this.viewportGroup = this.svgElement.querySelector('#wan-viewport') as SVGGElement;
    this.applyVisualState();
  }

  private initMinimap(): void {
    const ns = 'http://www.w3.org/2000/svg';
    this.minimapSvg.innerHTML = '';

    const bg = document.createElementNS(ns, 'rect');
    bg.setAttribute('x', '106');
    bg.setAttribute('y', '106');
    bg.setAttribute('width', '6019');
    bg.setAttribute('height', '4032');
    bg.setAttribute('fill', '#ffffff');
    bg.setAttribute('stroke', '#94a3b8');
    bg.setAttribute('stroke-width', '20');
    this.minimapSvg.appendChild(bg);

    // Draw edges in minimap
    for (const e of this.edges) {
      const line = document.createElementNS(ns, 'line');
      line.setAttribute('x1', String(e.sourceX));
      line.setAttribute('y1', String(e.sourceY));
      line.setAttribute('x2', String(e.targetX));
      line.setAttribute('y2', String(e.targetY));
      line.setAttribute('stroke', e.strokeColor);
      line.setAttribute('stroke-width', '18');
      line.setAttribute('stroke-opacity', '0.75');
      this.minimapSvg.appendChild(line);
    }

    // Draw boundary boxes & nodes in minimap
    for (const v of this.vertices) {
      if (v.category === 'frame') continue;
      if (v.category === 'boundary' || v.id === '2') {
        const r = document.createElementNS(ns, 'rect');
        r.setAttribute('x', String(v.x));
        r.setAttribute('y', String(v.y));
        r.setAttribute('width', String(v.width));
        r.setAttribute('height', String(v.height));
        r.setAttribute('fill', 'rgba(241, 245, 249, 0.5)');
        r.setAttribute('stroke', v.strokeColor !== 'none' ? v.strokeColor : '#64748b');
        r.setAttribute('stroke-width', '14');
        this.minimapSvg.appendChild(r);
      } else if (v.fillColor !== 'none' && v.fillOpacity > 0 && v.width > 20) {
        const r = document.createElementNS(ns, 'rect');
        r.setAttribute('x', String(v.x));
        r.setAttribute('y', String(v.y));
        r.setAttribute('width', String(v.width));
        r.setAttribute('height', String(v.height));
        r.setAttribute(
          'fill',
          v.fillColor.toLowerCase() === '#ffffff' ? v.strokeColor : v.fillColor
        );
        this.minimapSvg.appendChild(r);
      }
    }

    const vpRect = document.createElementNS(ns, 'rect');
    vpRect.setAttribute('fill', 'rgba(37, 99, 235, 0.15)');
    vpRect.setAttribute('stroke', '#2563eb');
    vpRect.setAttribute('stroke-width', '36');
    vpRect.setAttribute('rx', '20');
    this.minimapSvg.appendChild(vpRect);
    this.minimapRect = vpRect;
  }

  private bindEvents(): void {
    // Sidebar toggle
    const btnSidebar = this.container.querySelector('#btn-toggle-sidebar');
    btnSidebar?.addEventListener('click', () => {
      this.sidebarCollapsed = !this.sidebarCollapsed;
      const sb = this.container.querySelector('#wan-sidebar');
      sb?.classList.toggle('collapsed', this.sidebarCollapsed);
    });

    // Sidebar tabs
    const tabBtns = this.container.querySelectorAll('.wan-tab-btn');
    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = (btn as HTMLElement).dataset.tab as 'legend' | 'stations' | 'stats';
        this.activeSidebarTab = tab;
        tabBtns.forEach((b) => b.classList.toggle('active', b === btn));
        this.renderSidebarContent();
      });
    });

    // Region bar pills
    const regionBtns = this.container.querySelectorAll('.wan-region-pill');
    regionBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const regId = (btn as HTMLElement).dataset.region as RegionId;
        this.activeRegion = regId;
        regionBtns.forEach((b) => b.classList.toggle('active', b === btn));
        const preset = REGION_PRESETS.find((r) => r.id === regId);
        if (preset) {
          this.zoomToBounds(preset.bounds, true);
        }
        if (this.activeSidebarTab === 'stations') {
          this.renderSidebarContent();
        }
      });
    });

    // Zoom & View buttons
    this.container.querySelector('#btn-zoom-in')?.addEventListener('click', () => {
      this.zoomByFactor(1.25);
    });
    this.container.querySelector('#btn-zoom-out')?.addEventListener('click', () => {
      this.zoomByFactor(0.8);
    });
    this.container.querySelector('#btn-zoom-fit')?.addEventListener('click', () => {
      this.zoomToBounds(REGION_PRESETS[0].bounds, true);
    });
    this.container.querySelector('#btn-zoom-100')?.addEventListener('click', () => {
      const rect = this.canvasWrapper.getBoundingClientRect();
      const centerDiagX = (rect.width / 2 - this.viewport.x) / this.viewport.scale;
      const centerDiagY = (rect.height / 2 - this.viewport.y) / this.viewport.scale;
      this.animateViewport({
        scale: 1,
        x: rect.width / 2 - centerDiagX,
        y: rect.height / 2 - centerDiagY,
      });
    });

    const btnGrid = this.container.querySelector('#btn-toggle-grid');
    btnGrid?.addEventListener('click', () => {
      this.showGrid = !this.showGrid;
      btnGrid.classList.toggle('active', this.showGrid);
      this.applyVisualState();
    });

    const btnBoundaries = this.container.querySelector('#btn-toggle-boundaries');
    btnBoundaries?.addEventListener('click', () => {
      this.showBoundaries = !this.showBoundaries;
      btnBoundaries.classList.toggle('active', this.showBoundaries);
      this.applyVisualState();
    });

    const btnLabels = this.container.querySelector('#btn-toggle-labels');
    btnLabels?.addEventListener('click', () => {
      this.showEdgeLabels = !this.showEdgeLabels;
      btnLabels.classList.toggle('active', this.showEdgeLabels);
      this.applyVisualState();
    });

    this.container.querySelector('#btn-export-svg')?.addEventListener('click', () => {
      this.exportSvg();
    });
    this.container.querySelector('#btn-export-png')?.addEventListener('click', () => {
      this.exportPng();
    });

    // Global search input
    const searchInput = this.container.querySelector('#wan-global-search') as HTMLInputElement;
    const clearSearchBtn = this.container.querySelector('#btn-clear-search') as HTMLElement;
    const dropdown = this.container.querySelector('#wan-search-dropdown') as HTMLElement;

    searchInput.addEventListener('input', () => {
      this.globalSearchQuery = searchInput.value.trim();
      clearSearchBtn.classList.toggle('hidden', !this.globalSearchQuery);
      this.renderSearchDropdown(dropdown, this.globalSearchQuery);
      this.applyVisualState();
    });

    searchInput.addEventListener('focus', () => {
      if (this.globalSearchQuery) {
        this.renderSearchDropdown(dropdown, this.globalSearchQuery);
      }
    });

    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      this.globalSearchQuery = '';
      clearSearchBtn.classList.add('hidden');
      dropdown.classList.add('hidden');
      this.applyVisualState();
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.parentElement?.contains(e.target as Node)) {
        dropdown.classList.add('hidden');
      }
    });

    // Canvas Mouse Pan & Wheel Zoom
    this.canvasWrapper.addEventListener(
      'wheel',
      (e: WheelEvent) => {
        e.preventDefault();
        const rect = this.canvasWrapper.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const delta = -e.deltaY;
        const factor = Math.pow(1.0015, delta);
        const newScale = Math.min(3.5, Math.max(0.08, this.viewport.scale * factor));

        const diagX = (mouseX - this.viewport.x) / this.viewport.scale;
        const diagY = (mouseY - this.viewport.y) / this.viewport.scale;

        this.viewport.scale = newScale;
        this.viewport.x = mouseX - diagX * newScale;
        this.viewport.y = mouseY - diagY * newScale;
        this.updateViewportTransform();
      },
      { passive: false }
    );

    this.canvasWrapper.addEventListener('pointerdown', (e: PointerEvent) => {
      if (e.button !== 0) return;
      if ((e.target as HTMLElement).closest('#wan-minimap-card')) return;
      this.isPanning = true;
      this.panStartX = e.clientX - this.viewport.x;
      this.panStartY = e.clientY - this.viewport.y;
      this.pointerDownX = e.clientX;
      this.pointerDownY = e.clientY;
      this.canvasWrapper.classList.add('grabbing');
    });

    window.addEventListener('pointermove', (e: PointerEvent) => {
      if (this.isPanning) {
        this.viewport.x = e.clientX - this.panStartX;
        this.viewport.y = e.clientY - this.panStartY;
        this.updateViewportTransform();
        this.tooltipEl.classList.add('hidden');
        return;
      }

      // Check hover over SVG element
      const targetEl = (e.target as Element | null)?.closest?.('.wan-element') as SVGGElement | null;
      if (targetEl && this.canvasWrapper.contains(targetEl)) {
        const id = targetEl.dataset.id || '';
        this.showTooltip(id, e.clientX, e.clientY);
      } else {
        this.tooltipEl.classList.add('hidden');
      }
    });

    window.addEventListener('pointerup', (e: PointerEvent) => {
      if (!this.isPanning) return;
      this.isPanning = false;
      this.canvasWrapper.classList.remove('grabbing');

      const movedDist = Math.hypot(e.clientX - this.pointerDownX, e.clientY - this.pointerDownY);
      if (movedDist < 5) {
        const targetEl = (e.target as Element | null)?.closest?.('.wan-element') as SVGGElement | null;
        if (targetEl) {
          const id = targetEl.dataset.id || null;
          this.selectElement(id);
        } else if ((e.target as Element | null)?.closest?.('#wan-diagram-svg')) {
          this.selectElement(null);
        }
      }
    });

    // Double click to zoom in on clicked element
    this.canvasWrapper.addEventListener('dblclick', (e: MouseEvent) => {
      const targetEl = (e.target as Element | null)?.closest?.('.wan-element') as SVGGElement | null;
      if (targetEl && targetEl.dataset.id) {
        this.focusOnElement(targetEl.dataset.id);
      }
    });

    // Minimap click/drag navigation
    let minimapDragging = false;
    const jumpFromMinimap = (e: PointerEvent) => {
      const rect = this.minimapSvg.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      const diagX = DIAGRAM_BOUNDS.minX + relX * DIAGRAM_BOUNDS.width;
      const diagY = DIAGRAM_BOUNDS.minY + relY * DIAGRAM_BOUNDS.height;

      const wrapRect = this.canvasWrapper.getBoundingClientRect();
      this.viewport.x = wrapRect.width / 2 - diagX * this.viewport.scale;
      this.viewport.y = wrapRect.height / 2 - diagY * this.viewport.scale;
      this.updateViewportTransform();
    };

    this.minimapSvg.addEventListener('pointerdown', (e: PointerEvent) => {
      e.stopPropagation();
      minimapDragging = true;
      jumpFromMinimap(e);
    });
    window.addEventListener('pointermove', (e: PointerEvent) => {
      if (minimapDragging) jumpFromMinimap(e);
    });
    window.addEventListener('pointerup', () => {
      minimapDragging = false;
    });

    const btnMinimap = this.container.querySelector('#btn-close-minimap');
    btnMinimap?.addEventListener('click', () => {
      this.showMinimap = !this.showMinimap;
      this.minimapSvg.classList.toggle('hidden', !this.showMinimap);
      btnMinimap.textContent = this.showMinimap ? '–' : '+';
    });

    // Keyboard shortcuts
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement
      ) {
        if (e.key === 'Escape') {
          (document.activeElement as HTMLElement).blur();
        }
        return;
      }
      if (e.key === '=' || e.key === '+') {
        this.zoomByFactor(1.2);
      } else if (e.key === '-') {
        this.zoomByFactor(0.82);
      } else if (e.key === 'f' || e.key === 'F') {
        this.zoomToBounds(REGION_PRESETS[0].bounds, true);
      } else if (e.key === '0') {
        const rect = this.canvasWrapper.getBoundingClientRect();
        this.animateViewport({
          scale: 1,
          x: rect.width / 2 - 2800,
          y: rect.height / 2 - 1800,
        });
      } else if (e.key === 'Escape') {
        this.selectElement(null);
        this.isolatedCategory = null;
        this.applyVisualState();
        this.renderSidebarContent();
      }
    });
  }

  private renderSearchDropdown(dropdown: HTMLElement, query: string): void {
    if (!query) {
      dropdown.classList.add('hidden');
      return;
    }

    const q = query.toLowerCase();
    const matches: { id: string; title: string; subtitle: string; badge: string; color: string }[] = [];

    for (const s of STATIONS) {
      if (s.name.toLowerCase().includes(q)) {
        matches.push({
          id: s.id,
          title: s.name,
          subtitle: `${REGION_LABELS[s.region]} • Tọa độ (${Math.round(s.x)}, ${Math.round(s.y)})`,
          badge: s.type,
          color: '#1d4ed8',
        });
      }
    }

    for (const v of this.vertices) {
      if (v.category === 'station' || v.category === 'legend' || !v.plainText) continue;
      if (v.plainText.toLowerCase().includes(q)) {
        matches.push({
          id: v.id,
          title: v.plainText,
          subtitle: `${CATEGORY_LABELS[v.category] || v.category} • (${Math.round(v.x)}, ${Math.round(v.y)})`,
          badge: 'Thiết bị',
          color: v.strokeColor !== 'none' && v.strokeColor !== '#000000' ? v.strokeColor : '#0f766e',
        });
      }
    }

    for (const e of this.edges) {
      if (!e.labelPlainText) continue;
      if (e.labelPlainText.toLowerCase().includes(q)) {
        matches.push({
          id: e.id,
          title: e.labelPlainText,
          subtitle: `${CATEGORY_LABELS[e.category] || e.category}`,
          badge: 'Tuyến cáp',
          color: e.strokeColor,
        });
      }
    }

    const topMatches = matches.slice(0, 14);
    if (topMatches.length === 0) {
      dropdown.innerHTML = `<div class="wan-search-empty">Không tìm thấy trạm hoặc thiết bị khớp với "${query}"</div>`;
      dropdown.classList.remove('hidden');
      return;
    }

    dropdown.innerHTML = topMatches
      .map(
        (m) => `
      <div class="wan-search-item" data-id="${m.id}">
        <span class="wan-search-badge" style="background:${m.color}18;color:${m.color};border:1px solid ${m.color}44">${m.badge}</span>
        <div class="wan-search-item-main">
          <div class="wan-search-item-title">${m.title}</div>
          <div class="wan-search-item-sub">${m.subtitle}</div>
        </div>
      </div>
    `
      )
      .join('');
    dropdown.classList.remove('hidden');

    dropdown.querySelectorAll('.wan-search-item').forEach((item) => {
      item.addEventListener('click', () => {
        const id = (item as HTMLElement).dataset.id || '';
        dropdown.classList.add('hidden');
        this.selectElement(id);
        this.focusOnElement(id);
      });
    });
  }

  private renderSidebarContent(): void {
    const body = this.container.querySelector('#wan-sidebar-body') as HTMLElement;
    if (!body) return;

    if (this.activeSidebarTab === 'legend') {
      const counts = new Map<string, number>();
      for (const v of this.vertices) {
        counts.set(v.category, (counts.get(v.category) || 0) + 1);
      }
      for (const e of this.edges) {
        counts.set(e.category, (counts.get(e.category) || 0) + 1);
      }

      const deviceMetas = CATEGORY_META.filter((m) => m.group === 'device');
      const cableMetas = CATEGORY_META.filter((m) => m.group === 'cable');

      body.innerHTML = `
        <div class="wan-legend-section">
          <div class="wan-section-header">
            <span>GHI CHÚ THIẾT BỊ TRUYỀN DẪN</span>
            ${this.isolatedCategory
          ? `<button id="btn-reset-isolate" class="wan-link-btn">Hiện tất cả</button>`
          : ''
        }
          </div>
          <p class="wan-section-desc">Nhấn vào từng loại thiết bị hoặc tuyến cáp để làm nổi bật (lọc) trên sơ đồ:</p>
          <div class="wan-legend-list">
            ${deviceMetas
          .map((m) => {
            const count = counts.get(m.id) || 0;
            const isIsolated = this.isolatedCategory === m.id;
            const isDimmed = this.isolatedCategory !== null && !isIsolated;
            return `
                  <div class="wan-legend-row ${isIsolated ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}" data-cat="${m.id}">
                    <span class="wan-swatch wan-swatch-${m.swatchShape}" style="background:${m.swatchFill};border-color:${m.swatchStroke}">
                      ${m.id === 'otn-evnict' || m.id === 'otn-genco2' ? 'OTN' : ''}
                    </span>
                    <span class="wan-legend-label">${m.label}</span>
                    <span class="wan-legend-count">${count}</span>
                  </div>
                `;
          })
          .join('')}
          </div>
        </div>

        <div class="wan-legend-section">
          <div class="wan-section-header">
            <span>ĐƠN VỊ VẬN HÀNH CÁP QUANG</span>
          </div>
          <div class="wan-legend-list">
            ${cableMetas
          .map((m) => {
            const count = counts.get(m.id) || 0;
            const isIsolated = this.isolatedCategory === m.id;
            const isDimmed = this.isolatedCategory !== null && !isIsolated;
            return `
                  <div class="wan-legend-row ${isIsolated ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}" data-cat="${m.id}">
                    <span class="wan-swatch-line" style="background:${m.swatchStroke}"></span>
                    <span class="wan-legend-label">${m.label}</span>
                    <span class="wan-legend-count">${count}</span>
                  </div>
                `;
          })
          .join('')}
          </div>
        </div>
      `;

      body.querySelector('#btn-reset-isolate')?.addEventListener('click', () => {
        this.isolatedCategory = null;
        this.applyVisualState();
        this.renderSidebarContent();
      });

      body.querySelectorAll('.wan-legend-row').forEach((row) => {
        row.addEventListener('click', () => {
          const cat = (row as HTMLElement).dataset.cat || '';
          this.isolatedCategory = this.isolatedCategory === cat ? null : cat;
          this.applyVisualState();
          this.renderSidebarContent();
        });
      });
    } else if (this.activeSidebarTab === 'stations') {
      const filteredStations = STATIONS.filter((s) => {
        if (this.activeRegion !== 'all' && this.activeRegion !== 'legend' && s.region !== this.activeRegion) {
          return false;
        }
        if (this.stationTypeFilter !== 'ALL' && s.type !== this.stationTypeFilter) {
          return false;
        }
        if (
          this.stationSearchQuery &&
          !s.name.toLowerCase().includes(this.stationSearchQuery.toLowerCase())
        ) {
          return false;
        }
        return true;
      });

      body.innerHTML = `
        <div class="wan-station-filters">
          <input
            id="wan-station-filter-input"
            type="text"
            class="wan-sidebar-input"
            placeholder="Lọc nhanh tên trạm / nhà máy..."
            value="${this.stationSearchQuery}"
          />
          <div class="wan-type-chips">
            ${[
          ['ALL', 'Tất cả'],
          ['500kV', '500kV'],
          ['220kV', '220kV'],
          ['110kV', '110kV'],
          ['PowerPlant', 'Nhà máy điện'],
          ['DispatchCenter', 'A2 / A3'],
          ['Office', 'Văn phòng'],
        ]
          .map(
            ([val, lbl]) => `
              <button class="wan-chip ${this.stationTypeFilter === val ? 'active' : ''}" data-type="${val}">
                ${lbl}
              </button>
            `
          )
          .join('')}
          </div>
        </div>
        <div class="wan-station-list">
          ${filteredStations
          .map(
            (s) => `
            <div class="wan-station-card ${this.selectedId === s.id ? 'selected' : ''}" data-id="${s.id}">
              <div class="wan-station-card-top">
                <span class="wan-station-name">${s.name}</span>
                <span class="wan-station-badge type-${s.type}">${s.type === 'PowerPlant' ? 'NMĐ' : s.type === 'DispatchCenter' ? 'ĐĐ' : s.type === 'Office' ? 'VP' : s.type}</span>
              </div>
              <div class="wan-station-meta">
                <span>${REGION_LABELS[s.region]}</span>
                <span>(${Math.round(s.x)}, ${Math.round(s.y)})</span>
              </div>
            </div>
          `
          )
          .join('')}
        </div>
      `;

      const input = body.querySelector('#wan-station-filter-input') as HTMLInputElement;
      input?.addEventListener('input', () => {
        this.stationSearchQuery = input.value;
        const pos = input.selectionStart || 0;
        this.renderSidebarContent();
        const newInput = body.querySelector('#wan-station-filter-input') as HTMLInputElement;
        if (newInput) {
          newInput.focus();
          newInput.setSelectionRange(pos, pos);
        }
      });

      body.querySelectorAll('.wan-chip').forEach((chip) => {
        chip.addEventListener('click', () => {
          this.stationTypeFilter = (chip as HTMLElement).dataset.type || 'ALL';
          this.renderSidebarContent();
        });
      });

      body.querySelectorAll('.wan-station-card').forEach((card) => {
        card.addEventListener('click', () => {
          const id = (card as HTMLElement).dataset.id || '';
          this.selectElement(id);
          this.focusOnElement(id);
        });
      });
    } else {
      // Statistics tab
      const mplsOtCount = this.vertices.filter((v) => v.category === 'mpls-ot').length;
      const mplsItCount = this.vertices.filter((v) => v.category === 'mpls-it').length;
      const otnEvnCount = this.vertices.filter((v) => v.category === 'otn-evnict').length;
      const otnGencoCount = this.vertices.filter((v) => v.category === 'otn-genco2').length;
      const gencoSdhCount = this.vertices.filter((v) => v.category === 'genco2-sdh').length;
      const evnSdhCount = this.vertices.filter(
        (v) => v.category === 'evnict-sdh' || v.category === 'evnict-managed'
      ).length;

      body.innerHTML = `
        <div class="wan-stats-grid">
          <div class="wan-stat-card">
            <div class="wan-stat-val">${STATIONS.length}</div>
            <div class="wan-stat-lbl">Trạm / Nhà máy / VP</div>
          </div>
          <div class="wan-stat-card">
            <div class="wan-stat-val">${this.edges.length}</div>
            <div class="wan-stat-lbl">Tuyến truyền dẫn</div>
          </div>
          <div class="wan-stat-card">
            <div class="wan-stat-val" style="color:#ea700d">${mplsOtCount}</div>
            <div class="wan-stat-lbl">MPLS-TP (OT)</div>
          </div>
          <div class="wan-stat-card">
            <div class="wan-stat-val" style="color:#16a34a">${mplsItCount}</div>
            <div class="wan-stat-lbl">MPLS-TP (IT)</div>
          </div>
          <div class="wan-stat-card">
            <div class="wan-stat-val" style="color:#0284c7">${otnEvnCount}</div>
            <div class="wan-stat-lbl">OTN / DWDM EVNICT</div>
          </div>
          <div class="wan-stat-card">
            <div class="wan-stat-val" style="color:#ea580c">${otnGencoCount}</div>
            <div class="wan-stat-lbl">OTN mới GENCO2</div>
          </div>
          <div class="wan-stat-card">
            <div class="wan-stat-val">${gencoSdhCount}</div>
            <div class="wan-stat-lbl">TB Truyền dẫn GENCO2</div>
          </div>
          <div class="wan-stat-card">
            <div class="wan-stat-val">${evnSdhCount}</div>
            <div class="wan-stat-lbl">TB Truyền dẫn EVNICT</div>
          </div>
        </div>

        <div class="wan-legend-section">
          <div class="wan-section-header">
            <span>PHÂN BỐ TRẠM THEO KHU VỰC</span>
          </div>
          <div class="wan-region-stat-list">
            ${(['north', 'north-central', 'central', 'south-central', 'south'] as RegionId[])
          .map((rId) => {
            const count = STATIONS.filter((s) => s.region === rId).length;
            return `
                  <div class="wan-region-stat-row" data-region="${rId}">
                    <span>${REGION_LABELS[rId]}</span>
                    <strong>${count} trạm</strong>
                  </div>
                `;
          })
          .join('')}
          </div>
        </div>
      `;

      body.querySelectorAll('.wan-region-stat-row').forEach((row) => {
        row.addEventListener('click', () => {
          const rId = (row as HTMLElement).dataset.region as RegionId;
          const preset = REGION_PRESETS.find((r) => r.id === rId);
          if (preset) this.zoomToBounds(preset.bounds, true);
        });
      });
    }
  }

  private applyVisualState(): void {
    // 1. Grid
    const gridEl = this.svgElement.querySelector('#wan-grid-overlay') as SVGElement | null;
    if (gridEl) {
      gridEl.style.display = this.showGrid ? 'block' : 'none';
    }

    // 2. Boundaries
    for (const b of this.boundaryElements) {
      b.style.display = this.showBoundaries ? 'block' : 'none';
    }

    // 3. Edge labels
    for (const lbl of this.edgeLabelElements) {
      lbl.style.display = this.showEdgeLabels ? 'block' : 'none';
    }

    // 4. Category isolation, search query, and selection
    const q = this.globalSearchQuery.toLowerCase();

    for (const [id, domEl] of this.elementDomMap.entries()) {
      const v = this.vertexMap.get(id);
      const e = this.edgeMap.get(id);
      const cat = v ? v.category : e ? e.category : '';
      const text = (v ? v.plainText : e ? e.labelPlainText : '').toLowerCase();

      const isSelected = this.selectedId === id;
      domEl.classList.toggle('is-selected', isSelected);

      let isDimmed = false;
      let isHighlighted = false;

      if (this.isolatedCategory) {
        if (cat === this.isolatedCategory) {
          isHighlighted = true;
        } else if (cat !== 'frame' && cat !== 'station' && cat !== 'boundary') {
          isDimmed = true;
        }
      }

      if (q) {
        if (text && text.includes(q)) {
          isHighlighted = true;
          isDimmed = false;
        } else if (cat !== 'frame' && cat !== 'boundary') {
          isDimmed = true;
        }
      }

      domEl.classList.toggle('is-dimmed', isDimmed && !isSelected);
      domEl.classList.toggle('is-highlighted', isHighlighted);
    }
  }

  private selectElement(id: string | null): void {
    this.selectedId = id;
    this.applyVisualState();
    this.renderInspector();
    if (this.activeSidebarTab === 'stations') {
      this.renderSidebarContent();
    }
  }

  private renderInspector(): void {
    const inspector = this.container.querySelector('#wan-inspector') as HTMLElement;
    if (!inspector) return;

    if (!this.selectedId) {
      inspector.classList.add('hidden');
      return;
    }

    const v = this.vertexMap.get(this.selectedId);
    const e = this.edgeMap.get(this.selectedId);
    if (!v && !e) {
      inspector.classList.add('hidden');
      return;
    }

    inspector.classList.remove('hidden');

    if (v) {
      // Find nearby elements within 280px
      const cx = v.x + v.width / 2;
      const cy = v.y + v.height / 2;
      const nearby = this.vertices
        .filter(
          (other) =>
            other.id !== v.id &&
            other.plainText &&
            other.category !== 'legend' &&
            Math.hypot(other.x + other.width / 2 - cx, other.y + other.height / 2 - cy) < 280
        )
        .slice(0, 8);

      inspector.innerHTML = `
        <div class="wan-inspector-header">
          <div>
            <span class="wan-inspector-kicker">PHẦN TỬ NÚT / THIẾT BỊ #${v.id}</span>
            <h3>${v.plainText || CATEGORY_LABELS[v.category] || 'Khối hình học'}</h3>
          </div>
          <button id="btn-close-inspector" class="wan-icon-btn" title="Đóng (Esc)">&times;</button>
        </div>

        <div class="wan-inspector-body">
          <div class="wan-prop-group">
            <div class="wan-prop-row">
              <span>Phân loại:</span>
              <strong>${CATEGORY_LABELS[v.category] || v.category}</strong>
            </div>
            <div class="wan-prop-row">
              <span>Khu vực:</span>
              <strong>${REGION_LABELS[v.region]}</strong>
            </div>
            <div class="wan-prop-row">
              <span>Tọa độ (X, Y):</span>
              <strong>${v.x} , ${v.y} px</strong>
            </div>
            <div class="wan-prop-row">
              <span>Kích thước (W &times; H):</span>
              <strong>${v.width} &times; ${v.height} px</strong>
            </div>
          </div>

          <div class="wan-edit-section">
            <h4>Chỉnh sửa trực tiếp (Live Edit)</h4>
            <label class="wan-field">
              <span>Nhãn hiển thị</span>
              <input id="edit-v-text" type="text" value="${v.plainText.replace(/"/g, '&quot;')}" />
            </label>
            <div class="wan-field-row">
              <label class="wan-field">
                <span>Màu nền</span>
                <input id="edit-v-fill" type="color" value="${v.fillColor.startsWith('#') && v.fillColor.length === 7 ? v.fillColor : '#ffffff'}" />
              </label>
              <label class="wan-field">
                <span>Màu viền</span>
                <input id="edit-v-stroke" type="color" value="${v.strokeColor.startsWith('#') && v.strokeColor.length === 7 ? v.strokeColor : '#000000'}" />
              </label>
            </div>
            <div class="wan-field-row">
              <label class="wan-field">
                <span>Tọa độ X</span>
                <input id="edit-v-x" type="number" value="${v.x}" />
              </label>
              <label class="wan-field">
                <span>Tọa độ Y</span>
                <input id="edit-v-y" type="number" value="${v.y}" />
              </label>
            </div>
            <div class="wan-inspector-actions">
              <button id="btn-focus-selected" class="wan-tool-btn wan-btn-primary">Phóng tới phần tử</button>
              <button id="btn-apply-edit" class="wan-tool-btn">Cập nhật</button>
            </div>
          </div>

          ${nearby.length > 0
          ? `
            <div class="wan-nearby-section">
              <h4>Thiết bị / Trạm lân cận (${nearby.length})</h4>
              <div class="wan-nearby-list">
                ${nearby
            .map(
              (n) => `
                  <button class="wan-nearby-item" data-id="${n.id}">
                    <span>${n.plainText}</span>
                    <small>${CATEGORY_LABELS[n.category] || n.category}</small>
                  </button>
                `
            )
            .join('')}
              </div>
            </div>
          `
          : ''
        }
        </div>
      `;

      inspector.querySelector('#btn-close-inspector')?.addEventListener('click', () => {
        this.selectElement(null);
      });
      inspector.querySelector('#btn-focus-selected')?.addEventListener('click', () => {
        this.focusOnElement(v.id);
      });
      inspector.querySelector('#btn-apply-edit')?.addEventListener('click', () => {
        const newText = (inspector.querySelector('#edit-v-text') as HTMLInputElement).value.trim();
        const newFill = (inspector.querySelector('#edit-v-fill') as HTMLInputElement).value;
        const newStroke = (inspector.querySelector('#edit-v-stroke') as HTMLInputElement).value;
        const newX = Number((inspector.querySelector('#edit-v-x') as HTMLInputElement).value);
        const newY = Number((inspector.querySelector('#edit-v-y') as HTMLInputElement).value);

        v.plainText = newText;
        if (v.lines.length > 0 && v.lines[0].runs.length > 0) {
          const baseRun = v.lines[0].runs[0];
          v.lines = [{ align: v.align, runs: [{ ...baseRun, text: newText }] }];
        } else if (newText) {
          v.lines = [
            {
              align: 'center',
              runs: [
                {
                  text: newText,
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Calibri',
                  bold: true,
                  underline: false,
                },
              ],
            },
          ];
        }
        if (v.fillColor !== 'none') v.fillColor = newFill;
        if (v.strokeColor !== 'none') v.strokeColor = newStroke;
        v.x = newX;
        v.y = newY;

        this.initDiagramSvg();
        this.updateViewportTransform();
        this.renderInspector();
      });

      inspector.querySelectorAll('.wan-nearby-item').forEach((btn) => {
        btn.addEventListener('click', () => {
          const targetId = (btn as HTMLElement).dataset.id || '';
          this.selectElement(targetId);
          this.focusOnElement(targetId);
        });
      });
    } else if (e) {
      const lengthPx = Math.round(Math.hypot(e.targetX - e.sourceX, e.targetY - e.sourceY));
      inspector.innerHTML = `
        <div class="wan-inspector-header">
          <div>
            <span class="wan-inspector-kicker">TUYẾN KẾT NỐI TRUYỀN DẪN #${e.id}</span>
            <h3>${e.labelPlainText || CATEGORY_LABELS[e.category]}</h3>
          </div>
          <button id="btn-close-inspector" class="wan-icon-btn" title="Đóng (Esc)">&times;</button>
        </div>

        <div class="wan-inspector-body">
          <div class="wan-prop-group">
            <div class="wan-prop-row">
              <span>Đơn vị vận hành:</span>
              <strong>${CATEGORY_LABELS[e.category] || e.category}</strong>
            </div>
            <div class="wan-prop-row">
              <span>Khu vực:</span>
              <strong>${REGION_LABELS[e.region]}</strong>
            </div>
            <div class="wan-prop-row">
              <span>Điểm đầu:</span>
              <strong>(${e.sourceX}, ${e.sourceY})</strong>
            </div>
            <div class="wan-prop-row">
              <span>Điểm cuối:</span>
              <strong>(${e.targetX}, ${e.targetY})</strong>
            </div>
            <div class="wan-prop-row">
              <span>Độ dài trên bản vẽ:</span>
              <strong>${lengthPx} px</strong>
            </div>
          </div>

          <div class="wan-edit-section">
            <h4>Chỉnh sửa tuyến kết nối</h4>
            <label class="wan-field">
              <span>Nhãn dung lượng / Tuyến cáp</span>
              <input id="edit-e-text" type="text" value="${e.labelPlainText.replace(/"/g, '&quot;')}" />
            </label>
            <div class="wan-field-row">
              <label class="wan-field">
                <span>Màu tuyến cáp</span>
                <input id="edit-e-color" type="color" value="${e.strokeColor.startsWith('#') && e.strokeColor.length === 7 ? e.strokeColor : '#0070c0'}" />
              </label>
              <label class="wan-field">
                <span>Độ dày nét (px)</span>
                <input id="edit-e-width" type="number" min="1" max="10" value="${e.strokeWidth}" />
              </label>
            </div>
            <div class="wan-inspector-actions">
              <button id="btn-focus-selected" class="wan-tool-btn wan-btn-primary">Phóng tới tuyến cáp</button>
              <button id="btn-apply-edge-edit" class="wan-tool-btn">Cập nhật</button>
            </div>
          </div>
        </div>
      `;

      inspector.querySelector('#btn-close-inspector')?.addEventListener('click', () => {
        this.selectElement(null);
      });
      inspector.querySelector('#btn-focus-selected')?.addEventListener('click', () => {
        this.focusOnElement(e.id);
      });
      inspector.querySelector('#btn-apply-edge-edit')?.addEventListener('click', () => {
        const newText = (inspector.querySelector('#edit-e-text') as HTMLInputElement).value.trim();
        const newColor = (inspector.querySelector('#edit-e-color') as HTMLInputElement).value;
        const newW = Number((inspector.querySelector('#edit-e-width') as HTMLInputElement).value);

        e.labelPlainText = newText;
        e.strokeColor = newColor;
        e.strokeWidth = newW;
        if (e.labelLines.length > 0 && e.labelLines[0].runs.length > 0) {
          const baseRun = e.labelLines[0].runs[0];
          e.labelLines = [{ align: 'center', runs: [{ ...baseRun, text: newText }] }];
        } else if (newText) {
          e.labelLines = [
            {
              align: 'center',
              runs: [
                {
                  text: newText,
                  color: newColor,
                  fontSize: 14.11,
                  fontFamily: 'Calibri',
                  bold: true,
                  underline: false,
                },
              ],
            },
          ];
        }

        this.initDiagramSvg();
        this.updateViewportTransform();
        this.renderInspector();
      });
    }
  }

  private showTooltip(id: string, clientX: number, clientY: number): void {
    const v = this.vertexMap.get(id);
    const e = this.edgeMap.get(id);
    if (!v && !e) {
      this.tooltipEl.classList.add('hidden');
      return;
    }

    if (v && (v.category === 'frame' || (!v.plainText && v.category === 'boundary'))) {
      this.tooltipEl.classList.add('hidden');
      return;
    }

    const title = v
      ? v.plainText || CATEGORY_LABELS[v.category]
      : e?.labelPlainText || CATEGORY_LABELS[e?.category || ''];
    const subtitle = v
      ? `${CATEGORY_LABELS[v.category]} • ${REGION_LABELS[v.region]}`
      : `${CATEGORY_LABELS[e?.category || '']} • ${REGION_LABELS[e?.region || 'all']}`;

    this.tooltipEl.innerHTML = `
      <div class="wan-tooltip-title">${title}</div>
      <div class="wan-tooltip-sub">${subtitle}</div>
    `;
    this.tooltipEl.classList.remove('hidden');

    const wrapRect = this.canvasWrapper.getBoundingClientRect();
    const left = Math.min(wrapRect.width - 260, clientX - wrapRect.left + 14);
    const top = Math.max(12, clientY - wrapRect.top - 48);
    this.tooltipEl.style.left = `${left}px`;
    this.tooltipEl.style.top = `${top}px`;
  }

  private focusOnElement(id: string): void {
    const v = this.vertexMap.get(id);
    const e = this.edgeMap.get(id);
    if (v) {
      const pad = v.category === 'station' ? 420 : 280;
      this.zoomToBounds(
        {
          x: v.x - pad,
          y: v.y - pad,
          w: v.width + pad * 2,
          h: v.height + pad * 2,
        },
        true
      );
    } else if (e) {
      const minX = Math.min(e.sourceX, e.targetX);
      const minY = Math.min(e.sourceY, e.targetY);
      const w = Math.max(200, Math.abs(e.targetX - e.sourceX));
      const h = Math.max(200, Math.abs(e.targetY - e.sourceY));
      this.zoomToBounds(
        {
          x: minX - 220,
          y: minY - 220,
          w: w + 440,
          h: h + 440,
        },
        true
      );
    }
  }

  private zoomByFactor(factor: number): void {
    const rect = this.canvasWrapper.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const newScale = Math.min(3.5, Math.max(0.08, this.viewport.scale * factor));
    const diagX = (cx - this.viewport.x) / this.viewport.scale;
    const diagY = (cy - this.viewport.y) / this.viewport.scale;

    this.animateViewport({
      scale: newScale,
      x: cx - diagX * newScale,
      y: cy - diagY * newScale,
    });
  }

  private zoomToBounds(
    bounds: { x: number; y: number; w: number; h: number },
    animate: boolean
  ): void {
    const rect = this.canvasWrapper.getBoundingClientRect();
    const availW = Math.max(300, rect.width - 48);
    const availH = Math.max(240, rect.height - 48);

    const scaleX = availW / bounds.w;
    const scaleY = availH / bounds.h;
    const targetScale = Math.min(1.6, Math.max(0.09, Math.min(scaleX, scaleY)));

    const centerX = bounds.x + bounds.w / 2;
    const centerY = bounds.y + bounds.h / 2;
    const targetX = rect.width / 2 - centerX * targetScale;
    const targetY = rect.height / 2 - centerY * targetScale;

    if (animate) {
      this.animateViewport({ x: targetX, y: targetY, scale: targetScale });
    } else {
      this.viewport = { x: targetX, y: targetY, scale: targetScale };
      this.updateViewportTransform();
    }
  }

  private animateViewport(target: ViewportState): void {
    const start = { ...this.viewport };
    const duration = 280;
    const startTime = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      this.viewport.x = start.x + (target.x - start.x) * ease;
      this.viewport.y = start.y + (target.y - start.y) * ease;
      this.viewport.scale = start.scale + (target.scale - start.scale) * ease;
      this.updateViewportTransform();
      if (t < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  private updateViewportTransform(): void {
    if (!this.viewportGroup) return;
    const { x, y, scale } = this.viewport;
    this.viewportGroup.setAttribute(
      'transform',
      `translate(${x.toFixed(2)}, ${y.toFixed(2)}) scale(${scale.toFixed(4)})`
    );

    const zoomReadout = this.container.querySelector('#wan-zoom-label');
    if (zoomReadout) {
      zoomReadout.textContent = `${Math.round(scale * 100)}%`;
    }

    // Update minimap indicator rectangle
    if (this.minimapRect && this.canvasWrapper) {
      const wrapRect = this.canvasWrapper.getBoundingClientRect();
      const viewX = -x / scale;
      const viewY = -y / scale;
      const viewW = wrapRect.width / scale;
      const viewH = wrapRect.height / scale;

      this.minimapRect.setAttribute('x', viewX.toFixed(0));
      this.minimapRect.setAttribute('y', viewY.toFixed(0));
      this.minimapRect.setAttribute('width', Math.max(120, viewW).toFixed(0));
      this.minimapRect.setAttribute('height', Math.max(90, viewH).toFixed(0));
    }
  }

  private exportSvg(): void {
    const cloneSvg = this.svgElement.cloneNode(true) as SVGSVGElement;
    cloneSvg.setAttribute('viewBox', '60 60 6110 4120');
    cloneSvg.setAttribute('width', '6110');
    cloneSvg.setAttribute('height', '4120');
    const vp = cloneSvg.querySelector('#wan-viewport');
    vp?.removeAttribute('transform');

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(cloneSvg);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'so-do-wan-genco2-evnict.svg';
    a.click();
    URL.revokeObjectURL(url);
  }

  private exportPng(): void {
    const cloneSvg = this.svgElement.cloneNode(true) as SVGSVGElement;
    cloneSvg.setAttribute('viewBox', '60 60 6110 4120');
    cloneSvg.setAttribute('width', '3055');
    cloneSvg.setAttribute('height', '2060');
    const vp = cloneSvg.querySelector('#wan-viewport');
    vp?.removeAttribute('transform');

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(cloneSvg);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 3055;
      canvas.height = 2060;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((pngBlob) => {
          if (!pngBlob) return;
          const pngUrl = URL.createObjectURL(pngBlob);
          const a = document.createElement('a');
          a.href = pngUrl;
          a.download = 'so-do-wan-genco2-evnict.png';
          a.click();
          URL.revokeObjectURL(pngUrl);
        }, 'image/png');
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }
}

