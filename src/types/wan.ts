export type DeviceCategory =
  | 'evnict-managed' // Thiết bị truyền dẫn hiện tại EVNICT quản lý
  | 'genco2-sdh'     // Thiết bị truyền dẫn của GENCO2 (#f59d56)
  | 'evnict-sdh'     // Thiết bị truyền dẫn của EVNICT (#92cddc)
  | 'ptc-sdh'        // Thiết bị truyền dẫn PTCx (#ffff00 / #ffd965)
  | 'cpc-sdh'        // Thiết bị truyền dẫn EVNCPC
  | 'mpls-ot'        // Thiết bị MPLS-TP (OT) của GENCO2 (viền cam #ea700d)
  | 'mpls-it'        // Thiết bị MPLS-TP (IT) của GENCO2 (viền xanh lá #00ff00)
  | 'otn-evnict'     // Thiết bị truyền dẫn OTN của EVNICT (Octagon #92cddc)
  | 'otn-genco2'     // Thiết bị truyền dẫn OTN trang bị mới của GENCO2 (Octagon trắng viền cam)
  | 'station'        // Tên Trạm / Nhà máy / Văn phòng
  | 'boundary'       // Khung ranh giới trạm (nét đứt)
  | 'cloud'          // Đám mây mạng truyền dẫn
  | 'icon'           // Biểu tượng thiết bị / tòa nhà
  | 'annotation'     // Khoảng cách / Ghi chú phụ
  | 'legend'         // Phần tử trong bảng GHI CHÚ
  | 'frame';         // Khung viền bản vẽ

export type CableCategory =
  | 'cable-genco2'   // Cáp quang Genco2 vận hành (#ea700d)
  | 'cable-ptc'      // Cáp quang PTCx vận hành (#0070c0)
  | 'cable-evnict'   // Cáp quang EVNICT vận hành (#00b050)
  | 'cable-cpc'      // Cáp quang EVNCPC vận hành (#ee0000)
  | 'cable-npt'      // Cáp quang EVNNPT vận hành (#000000)
  | 'cable-viettel'  // Cáp quang VIETTEL vận hành (#ff00ff / #7030a0)
  | 'cable-legend';  // Đường mẫu trong bảng GHI CHÚ

export type RegionId =
  | 'all'
  | 'north'
  | 'north-central'
  | 'central'
  | 'south-central'
  | 'south'
  | 'legend';

export interface StencilMoveCmd {
  t: 'M';
  x: number;
  y: number;
}

export interface StencilLineCmd {
  t: 'L';
  x: number;
  y: number;
}

export interface StencilCurveCmd {
  t: 'C';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
}

export interface StencilArcCmd {
  t: 'A';
  rx: number;
  ry: number;
  rot: number;
  large: number;
  sweep: number;
  x: number;
  y: number;
}

export type StencilCmd =
  | StencilMoveCmd
  | StencilLineCmd
  | StencilCurveCmd
  | StencilArcCmd;

export interface WanStencil {
  id: string;
  mode: 'fillstroke' | 'stroke';
  cmds: StencilCmd[];
}

export interface WanTextRun {
  text: string;
  color: string;
  fontSize: number;
  fontFamily: string;
  bold: boolean;
  underline: boolean;
}

export interface WanTextLine {
  align: 'center' | 'left';
  runs: WanTextRun[];
}

export interface WanVertex {
  id: string;
  parentId: string;
  zOrder: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  flipH: boolean;
  stencilId: string | null;
  fillColor: string;
  gradientColor: string;
  gradientDirection: string;
  fillOpacity: number;
  strokeColor: string;
  strokeWidth: number;
  strokeOpacity: number;
  dashed: boolean;
  align: 'center' | 'left';
  plainText: string;
  lines: WanTextLine[];
  category: DeviceCategory;
  region: RegionId;
  parameter?: string;
}

export interface WanEdge {
  id: string;
  zOrder: number;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  strokeColor: string;
  strokeWidth: number;
  dashed: boolean;
  startArrow: boolean;
  endArrow: boolean;
  labelPlainText: string;
  labelLines: WanTextLine[];
  labelRotation: number;
  labelBgColor: string;
  labelOffsetX: number;
  labelOffsetY: number;
  category: CableCategory;
  region: RegionId;
  parameter?: string;
}

export interface WanStationInfo {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  region: RegionId;
  type: '500kV' | '220kV' | '110kV' | 'PowerPlant' | 'Office' | 'DispatchCenter';
}

export interface CategoryMeta {
  id: DeviceCategory | CableCategory;
  label: string;
  shortLabel: string;
  group: 'device' | 'cable';
  swatchFill: string;
  swatchStroke: string;
  swatchShape: 'rect' | 'octagon' | 'line';
}

export interface ViewportState {
  x: number;
  y: number;
  scale: number;
}

