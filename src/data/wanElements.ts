import type { WanVertex, WanEdge, WanStationInfo, CategoryMeta, WanTextLine, DeviceCategory, CableCategory, RegionId } from "../types/wan.ts";
import { RAW_VERTICES_1 } from "./wanVertices1.ts";
import { RAW_VERTICES_2 } from "./wanVertices2.ts";
import { RAW_EDGES } from "./wanEdges.ts";

export const DIAGRAM_BOUNDS = { minX: 80, minY: 80, width: 6080, height: 4080 } as const;

export const CATEGORY_META: CategoryMeta[] = [
  { id: "evnict-managed", label: "Thiết bị truyền dẫn hiện tại EVNICT quản lý", shortLabel: "EVNICT quản lý", group: "device", swatchFill: "#FFFFFF", swatchStroke: "#000000", swatchShape: "rect" },
  { id: "genco2-sdh", label: "Thiết bị truyền dẫn của GENCO2", shortLabel: "TB GENCO2", group: "device", swatchFill: "#f59d56", swatchStroke: "#000000", swatchShape: "rect" },
  { id: "evnict-sdh", label: "Thiết bị truyền dẫn của EVNICT", shortLabel: "TB EVNICT", group: "device", swatchFill: "#92cddc", swatchStroke: "#000000", swatchShape: "rect" },
  { id: "ptc-sdh", label: "Thiết bị truyền dẫn PTCx", shortLabel: "TB PTCx", group: "device", swatchFill: "#ffff00", swatchStroke: "#000000", swatchShape: "rect" },
  { id: "cpc-sdh", label: "Thiết bị truyền dẫn EVNCPC", shortLabel: "TB EVNCPC", group: "device", swatchFill: "#FFFFFF", swatchStroke: "#ee0000", swatchShape: "rect" },
  { id: "mpls-ot", label: "Thiết bị MPLS-TP (OT) của GENCO2", shortLabel: "MPLS-TP (OT)", group: "device", swatchFill: "#FFFFFF", swatchStroke: "#ea700d", swatchShape: "rect" },
  { id: "mpls-it", label: "Thiết bị MPLS-TP (IT) của GENCO2", shortLabel: "MPLS-TP (IT)", group: "device", swatchFill: "#FFFFFF", swatchStroke: "#00ff00", swatchShape: "rect" },
  { id: "otn-evnict", label: "Thiết bị truyền dẫn OTN của EVNICT", shortLabel: "OTN EVNICT", group: "device", swatchFill: "#92cddc", swatchStroke: "#000000", swatchShape: "octagon" },
  { id: "otn-genco2", label: "Thiết bị truyền dẫn OTN trang bị mới của GENCO2", shortLabel: "OTN mới GENCO2", group: "device", swatchFill: "#FFFFFF", swatchStroke: "#ea700d", swatchShape: "octagon" },
  { id: "cable-genco2", label: "Cáp quang Genco2 vận hành", shortLabel: "Cáp GENCO2", group: "cable", swatchFill: "none", swatchStroke: "#ea700d", swatchShape: "line" },
  { id: "cable-ptc", label: "Cáp quang PTCx vận hành", shortLabel: "Cáp PTCx", group: "cable", swatchFill: "none", swatchStroke: "#0070c0", swatchShape: "line" },
  { id: "cable-evnict", label: "Cáp quang EVNICT vận hành", shortLabel: "Cáp EVNICT", group: "cable", swatchFill: "none", swatchStroke: "#00b050", swatchShape: "line" },
  { id: "cable-cpc", label: "Cáp quang EVNCPC vận hành", shortLabel: "Cáp EVNCPC", group: "cable", swatchFill: "none", swatchStroke: "#ee0000", swatchShape: "line" },
  { id: "cable-npt", label: "Cáp quang EVNNPT vận hành", shortLabel: "Cáp EVNNPT", group: "cable", swatchFill: "none", swatchStroke: "#000000", swatchShape: "line" },
  { id: "cable-viettel", label: "Cáp quang VIETTEL vận hành", shortLabel: "Cáp VIETTEL", group: "cable", swatchFill: "none", swatchStroke: "#ff00ff", swatchShape: "line" },
];

export const STATIONS: WanStationInfo[] = [{ "id": "7", "name": "VP KHE SANH", "x": 900.0, "y": 2435.0, "width": 235.0, "height": 61.0, "region": "north-central", "type": "Office" }, { "id": "8", "name": "NMTĐ QUẢNG TRỊ", "x": 746.0, "y": 2201.0, "width": 235.0, "height": 73.0, "region": "north-central", "type": "PowerPlant" }, { "id": "9", "name": "500KV THẠNH MỸ", "x": 3020.0, "y": 2198.0, "width": 235.0, "height": 73.0, "region": "central", "type": "500kV" }, { "id": "10", "name": "500KV PHÚ LÂM", "x": 2724.0, "y": 2968.0, "width": 125.0, "height": 73.0, "region": "south", "type": "500kV" }, { "id": "11", "name": "A2", "x": 2563.0, "y": 3452.0, "width": 125.0, "height": 37.0, "region": "south", "type": "DispatchCenter" }, { "id": "12", "name": "11 CỬA BẮC", "x": 2586.0, "y": 250.0, "width": 223.0, "height": 42.0, "region": "north", "type": "Office" }, { "id": "13", "name": "NMNĐ PHẢ LẠI", "x": 4251.0, "y": 183.0, "width": 271.0, "height": 42.0, "region": "north", "type": "PowerPlant" }, { "id": "14", "name": "NMTĐ TRUNG SƠN", "x": 1505.0, "y": 630.0, "width": 209.0, "height": 78.0, "region": "north", "type": "PowerPlant" }, { "id": "15", "name": "500kV HÒA BÌNH", "x": 2137.0, "y": 600.0, "width": 123.0, "height": 105.0, "region": "north", "type": "500kV" }, { "id": "16", "name": "500kV NHO QUAN", "x": 2939.0, "y": 1188.0, "width": 159.0, "height": 142.0, "region": "north", "type": "500kV" }, { "id": "26", "name": "220KV ĐÔNG HÀ", "x": 768.0, "y": 1494.0, "width": 235.0, "height": 76.0, "region": "north-central", "type": "220kV" }, { "id": "27", "name": "220KV LAO BẢO", "x": 791.0, "y": 1759.0, "width": 235.0, "height": 73.0, "region": "north-central", "type": "220kV" }, { "id": "29", "name": "VP CÔNG TY TĐ QUẢNG TRỊ (ĐÔNG HÀ)", "x": 1666.0, "y": 1538.0, "width": 389.0, "height": 106.0, "region": "north-central", "type": "Office" }, { "id": "38", "name": "CÔNG TY TĐ A VƯƠNG", "x": 3479.5, "y": 1280.5, "width": 235.0, "height": 61.0, "region": "central", "type": "Office" }, { "id": "39", "name": "A3", "x": 2889.0, "y": 1613.0, "width": 235.0, "height": 73.0, "region": "central", "type": "DispatchCenter" }, { "id": "42", "name": "CÔNG TY TĐ SÔNG BUNG", "x": 3490.0, "y": 1509.0, "width": 235.0, "height": 61.0, "region": "central", "type": "Office" }, { "id": "53", "name": "NMTĐ SÔNG BUNG 2", "x": 1822.0, "y": 1840.0, "width": 235.0, "height": 100.0, "region": "central", "type": "PowerPlant" }, { "id": "54", "name": "220KV PHƯỚC LONG", "x": 2187.0, "y": 2774.0, "width": 340.0, "height": 86.0, "region": "south", "type": "220kV" }, { "id": "56", "name": "NMTĐ SÔNG BUNG 4", "x": 1813.0, "y": 2180.0, "width": 235.0, "height": 88.0, "region": "central", "type": "PowerPlant" }, { "id": "59", "name": "NMTĐ A VƯƠNG", "x": 1598.0, "y": 2400.0, "width": 235.0, "height": 85.0, "region": "central", "type": "PowerPlant" }, { "id": "62", "name": "NMTĐ THÁC MƠ", "x": 1515.0, "y": 2770.0, "width": 235.0, "height": 61.0, "region": "south", "type": "PowerPlant" }, { "id": "96", "name": "220KV THẠNH MỸ", "x": 2162.0, "y": 2590.0, "width": 235.0, "height": 73.0, "region": "central", "type": "220kV" }, { "id": "100", "name": "110KV Phước Long", "x": 1857.0, "y": 2772.0, "width": 340.0, "height": 110.0, "region": "south", "type": "110kV" }, { "id": "125", "name": "VP GENCO2 CẦN THƠ", "x": 3105.0, "y": 3238.0, "width": 235.0, "height": 72.0, "region": "south", "type": "Office" }, { "id": "145", "name": "220KV Ô MÔN", "x": 3810.0, "y": 2955.0, "width": 235.0, "height": 63.0, "region": "south", "type": "220kV" }, { "id": "147", "name": "500KV Ô MÔN", "x": 3355.0, "y": 2930.0, "width": 235.0, "height": 85.0, "region": "south", "type": "500kV" }, { "id": "151", "name": "NMNĐ Ô MÔN", "x": 4250.0, "y": 3052.0, "width": 235.0, "height": 61.0, "region": "south", "type": "PowerPlant" }, { "id": "153", "name": "VP CÔNG TY NĐ CẦN THƠ", "x": 3764.0, "y": 3648.0, "width": 235.0, "height": 61.0, "region": "south", "type": "Office" }, { "id": "154", "name": "NMNĐ CẦN THƠ", "x": 3505.0, "y": 3656.0, "width": 235.0, "height": 61.0, "region": "south", "type": "PowerPlant" }, { "id": "179", "name": "NMNĐ HẢI PHÒNG", "x": 4279.0, "y": 571.0, "width": 249.0, "height": 42.0, "region": "north", "type": "PowerPlant" }, { "id": "186", "name": "220kV Thủy Nguyên", "x": 3869.0, "y": 658.0, "width": 180.0, "height": 49.0, "region": "north", "type": "220kV" }, { "id": "195", "name": "220kV Vật Cách", "x": 3508.0, "y": 873.0, "width": 163.0, "height": 49.0, "region": "north", "type": "220kV" }, { "id": "200", "name": "220KV BÌNH LONG", "x": 2331.0, "y": 3263.0, "width": 219.0, "height": 67.0, "region": "south", "type": "220kV" }, { "id": "203", "name": "220kV BA LA", "x": 2529.0, "y": 954.0, "width": 255.0, "height": 36.0, "region": "north", "type": "220kV" }, { "id": "205", "name": "VP CÔNG TY TĐ TRUNG SƠN TẠI HÀ NỘI", "x": 2110.0, "y": 436.0, "width": 235.0, "height": 61.0, "region": "north", "type": "Office" }, { "id": "211", "name": "CÔNG TY TĐ SÔNG BA HẠ", "x": 4655.0, "y": 2338.0, "width": 235.0, "height": 61.0, "region": "south-central", "type": "Office" }, { "id": "214", "name": "220KV TUY HÒA", "x": 4312.0, "y": 2212.0, "width": 235.0, "height": 73.0, "region": "south-central", "type": "220kV" }, { "id": "219", "name": "NMTĐ SÔNG BA HẠ", "x": 4328.0, "y": 2829.0, "width": 235.0, "height": 81.0, "region": "south-central", "type": "PowerPlant" }, { "id": "224", "name": "110KV K’BANG", "x": 3822.0, "y": 2737.0, "width": 235.0, "height": 73.0, "region": "south-central", "type": "110kV" }, { "id": "265", "name": "NMTĐ KANAK", "x": 3350.0, "y": 2741.0, "width": 235.0, "height": 73.0, "region": "south-central", "type": "PowerPlant" }, { "id": "325", "name": "110KV ĐÔNG HÀ", "x": 1296.0, "y": 1571.0, "width": 235.0, "height": 59.0, "region": "north-central", "type": "110kV" }, { "id": "328", "name": "110KV NMTĐ QUẢNG TRỊ", "x": 1405.0, "y": 1953.0, "width": 239.0, "height": 137.0, "region": "north-central", "type": "110kV" }, { "id": "334", "name": "220KV PHƯỚC AN", "x": 3974.0, "y": 1558.0, "width": 235.0, "height": 73.0, "region": "south-central", "type": "220kV" }, { "id": "335", "name": "220KV QUY NHƠN", "x": 3876.0, "y": 1826.0, "width": 235.0, "height": 73.0, "region": "south-central", "type": "220kV" }, { "id": "338", "name": "VP CÔNG TY TĐ AN KHÊ - KANAK", "x": 4404.0, "y": 1927.0, "width": 235.0, "height": 61.0, "region": "south-central", "type": "Office" }, { "id": "344", "name": "NMTĐ AN KHÊ", "x": 4481.0, "y": 1473.0, "width": 235.0, "height": 73.0, "region": "south-central", "type": "PowerPlant" }, { "id": "358", "name": "110KV NMTĐ QUẢNG TRỊ", "x": 768.0, "y": 1923.0, "width": 239.0, "height": 117.0, "region": "north-central", "type": "110kV" }, { "id": "360", "name": "220KV Hải Dương 2", "x": 3522.0, "y": 250.0, "width": 264.0, "height": 110.0, "region": "north", "type": "220kV" }, { "id": "365", "name": "220KV Đồng Hòa", "x": 3205.0, "y": 246.0, "width": 285.0, "height": 110.0, "region": "north", "type": "220kV" }, { "id": "368", "name": "NMNĐ Hải Dương", "x": 3821.0, "y": 250.0, "width": 236.0, "height": 110.0, "region": "north", "type": "PowerPlant" }];

function decodeLines(raw: any[]): { lines: WanTextLine[]; plain: string } {
  const lines: WanTextLine[] = raw.map(([alignCode, runs]: [number, any[]]) => ({
    align: alignCode === 1 ? "left" : "center",
    runs: runs.map((r: any[]) => ({
      text: r[0],
      fontSize: r[1],
      color: r[2] ?? "#000000",
      bold: r[3] !== undefined ? r[3] === 1 : true,
      fontFamily: r[4] === 1 ? "Times New Roman" : "Calibri",
      underline: r[5] === 1,
    })),
  }));
  const plain = lines.map((l) => l.runs.map((r) => r.text).join("")).join(" ").trim();
  return { lines, plain };
}

export const VERTICES: WanVertex[] = [...RAW_VERTICES_1, ...RAW_VERTICES_2].map((r): WanVertex => {
  const { lines, plain } = decodeLines(r[8]);
  const o = r[9] || {};
  return {
    id: r[0],
    parentId: o.p ?? "1",
    zOrder: r[1],
    x: r[2],
    y: r[3],
    width: r[4],
    height: r[5],
    rotation: o.rot ?? 0,
    flipH: o.fh === 1,
    stencilId: o.s ?? null,
    fillColor: o.fc ?? "#ffffff",
    gradientColor: o.gc ?? "none",
    gradientDirection: o.gd ?? "south",
    fillOpacity: o.fo ?? 1,
    strokeColor: o.sc ?? "#000000",
    strokeWidth: o.sw ?? 1,
    strokeOpacity: o.so ?? 1,
    dashed: o.d === 1,
    align: o.a === 1 ? "left" : "center",
    plainText: plain,
    lines,
    category: r[6] as DeviceCategory,
    region: r[7] as RegionId,
  };
});

export const EDGES: WanEdge[] = RAW_EDGES.map((r): WanEdge => {
  const { lines, plain } = decodeLines(r[10]);
  const o = r[11] || {};
  return {
    id: r[0],
    zOrder: r[1],
    sourceX: r[2],
    sourceY: r[3],
    targetX: r[4],
    targetY: r[5],
    strokeColor: r[6],
    strokeWidth: r[7],
    dashed: o.d === 1,
    startArrow: o.sa === 1,
    endArrow: o.ea === 1,
    labelPlainText: plain,
    labelLines: lines,
    labelRotation: o.rot ?? 0,
    labelBgColor: o.bg ?? "#ffffff",
    labelOffsetX: o.ox ?? 0,
    labelOffsetY: o.oy ?? 0,
    category: r[8] as CableCategory,
    region: r[9] as RegionId,
  };
});
