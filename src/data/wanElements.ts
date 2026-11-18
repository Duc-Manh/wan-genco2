import type { WanVertex, WanEdge, WanStationInfo, CategoryMeta } from '../types/wan.ts';

export const DIAGRAM_BOUNDS = { minX: 80, minY: 80, width: 6080, height: 4080 } as const;

export const CATEGORY_META: CategoryMeta[] = [
  { id: 'evnict-managed', label: 'Thiết bị truyền dẫn hiện tại EVNICT quản lý', shortLabel: 'EVNICT quản lý', group: 'device', swatchFill: '#FFFFFF', swatchStroke: '#000000', swatchShape: 'rect' },
  { id: 'genco2-sdh', label: 'Thiết bị truyền dẫn của GENCO2', shortLabel: 'TB GENCO2', group: 'device', swatchFill: '#f59d56', swatchStroke: '#000000', swatchShape: 'rect' },
  { id: 'evnict-sdh', label: 'Thiết bị truyền dẫn của EVNICT', shortLabel: 'TB EVNICT', group: 'device', swatchFill: '#92cddc', swatchStroke: '#000000', swatchShape: 'rect' },
  { id: 'ptc-sdh', label: 'Thiết bị truyền dẫn PTCx', shortLabel: 'TB PTCx', group: 'device', swatchFill: '#ffff00', swatchStroke: '#000000', swatchShape: 'rect' },
  { id: 'cpc-sdh', label: 'Thiết bị truyền dẫn EVNCPC', shortLabel: 'TB EVNCPC', group: 'device', swatchFill: '#FFFFFF', swatchStroke: '#ee0000', swatchShape: 'rect' },
  { id: 'mpls-ot', label: 'Thiết bị MPLS-TP (OT) của GENCO2', shortLabel: 'MPLS-TP (OT)', group: 'device', swatchFill: '#FFFFFF', swatchStroke: '#ea700d', swatchShape: 'rect' },
  { id: 'mpls-it', label: 'Thiết bị MPLS-TP (IT) của GENCO2', shortLabel: 'MPLS-TP (IT)', group: 'device', swatchFill: '#FFFFFF', swatchStroke: '#00ff00', swatchShape: 'rect' },
  { id: 'otn-evnict', label: 'Thiết bị truyền dẫn OTN của EVNICT', shortLabel: 'OTN EVNICT', group: 'device', swatchFill: '#92cddc', swatchStroke: '#000000', swatchShape: 'octagon' },
  { id: 'otn-genco2', label: 'Thiết bị truyền dẫn OTN trang bị mới của GENCO2', shortLabel: 'OTN mới GENCO2', group: 'device', swatchFill: '#FFFFFF', swatchStroke: '#ea700d', swatchShape: 'octagon' },
  { id: 'cable-genco2', label: 'Cáp quang Genco2 vận hành', shortLabel: 'Cáp GENCO2', group: 'cable', swatchFill: 'none', swatchStroke: '#ea700d', swatchShape: 'line' },
  { id: 'cable-ptc', label: 'Cáp quang PTCx vận hành', shortLabel: 'Cáp PTCx', group: 'cable', swatchFill: 'none', swatchStroke: '#0070c0', swatchShape: 'line' },
  { id: 'cable-evnict', label: 'Cáp quang EVNICT vận hành', shortLabel: 'Cáp EVNICT', group: 'cable', swatchFill: 'none', swatchStroke: '#00b050', swatchShape: 'line' },
  { id: 'cable-cpc', label: 'Cáp quang EVNCPC vận hành', shortLabel: 'Cáp EVNCPC', group: 'cable', swatchFill: 'none', swatchStroke: '#ee0000', swatchShape: 'line' },
  { id: 'cable-npt', label: 'Cáp quang EVNNPT vận hành', shortLabel: 'Cáp EVNNPT', group: 'cable', swatchFill: 'none', swatchStroke: '#000000', swatchShape: 'line' },
  { id: 'cable-viettel', label: 'Cáp quang VIETTEL vận hành', shortLabel: 'Cáp VIETTEL', group: 'cable', swatchFill: 'none', swatchStroke: '#ff00ff', swatchShape: 'line' },
];

export const STATIONS: WanStationInfo[] = [
  {
    "id": "7",
    "name": "VP KHE SANH",
    "x": 900.0,
    "y": 2435.0,
    "width": 235.0,
    "height": 61.0,
    "region": "north-central",
    "type": "Office"
  },
  {
    "id": "8",
    "name": "NMTĐ QUẢNG TRỊ",
    "x": 746.0,
    "y": 2201.0,
    "width": 235.0,
    "height": 73.0,
    "region": "north-central",
    "type": "PowerPlant"
  },
  {
    "id": "9",
    "name": "500KV THẠNH MỸ",
    "x": 3020.0,
    "y": 2198.0,
    "width": 235.0,
    "height": 73.0,
    "region": "central",
    "type": "500kV"
  },
  {
    "id": "10",
    "name": "500KV PHÚ LÂM",
    "x": 2724.0,
    "y": 2968.0,
    "width": 125.0,
    "height": 73.0,
    "region": "south",
    "type": "500kV"
  },
  {
    "id": "11",
    "name": "A2",
    "x": 2563.0,
    "y": 3452.0,
    "width": 125.0,
    "height": 37.0,
    "region": "south",
    "type": "DispatchCenter"
  },
  {
    "id": "12",
    "name": "11 CỬA BẮC",
    "x": 2586.0,
    "y": 250.0,
    "width": 223.0,
    "height": 42.0,
    "region": "north",
    "type": "Office"
  },
  {
    "id": "13",
    "name": "NMNĐ PHẢ LẠI",
    "x": 4251.0,
    "y": 183.0,
    "width": 271.0,
    "height": 42.0,
    "region": "north",
    "type": "PowerPlant"
  },
  {
    "id": "14",
    "name": "NMTĐ TRUNG SƠN",
    "x": 1505.0,
    "y": 630.0,
    "width": 209.0,
    "height": 78.0,
    "region": "north",
    "type": "PowerPlant"
  },
  {
    "id": "15",
    "name": "500kV HÒA BÌNH",
    "x": 2137.0,
    "y": 600.0,
    "width": 123.0,
    "height": 105.0,
    "region": "north",
    "type": "500kV"
  },
  {
    "id": "16",
    "name": "500kV NHO QUAN",
    "x": 2939.0,
    "y": 1188.0,
    "width": 159.0,
    "height": 142.0,
    "region": "north",
    "type": "500kV"
  },
  {
    "id": "26",
    "name": "220KV ĐÔNG HÀ",
    "x": 768.0,
    "y": 1494.0,
    "width": 235.0,
    "height": 76.0,
    "region": "north-central",
    "type": "220kV"
  },
  {
    "id": "27",
    "name": "220KV LAO BẢO",
    "x": 791.0,
    "y": 1759.0,
    "width": 235.0,
    "height": 73.0,
    "region": "north-central",
    "type": "220kV"
  },
  {
    "id": "29",
    "name": "VP CÔNG TY TĐ QUẢNG TRỊ (ĐÔNG HÀ)",
    "x": 1666.0,
    "y": 1538.0,
    "width": 389.0,
    "height": 106.0,
    "region": "north-central",
    "type": "Office"
  },
  {
    "id": "38",
    "name": "CÔNG TY TĐ A VƯƠNG",
    "x": 3479.5,
    "y": 1280.5,
    "width": 235.0,
    "height": 61.0,
    "region": "central",
    "type": "Office"
  },
  {
    "id": "39",
    "name": "A3",
    "x": 2889.0,
    "y": 1613.0,
    "width": 235.0,
    "height": 73.0,
    "region": "central",
    "type": "DispatchCenter"
  },
  {
    "id": "42",
    "name": "CÔNG TY TĐ SÔNG BUNG",
    "x": 3490.0,
    "y": 1509.0,
    "width": 235.0,
    "height": 61.0,
    "region": "central",
    "type": "Office"
  },
  {
    "id": "53",
    "name": "NMTĐ SÔNG BUNG 2",
    "x": 1822.0,
    "y": 1840.0,
    "width": 235.0,
    "height": 100.0,
    "region": "central",
    "type": "PowerPlant"
  },
  {
    "id": "54",
    "name": "220KV PHƯỚC LONG",
    "x": 2187.0,
    "y": 2774.0,
    "width": 340.0,
    "height": 86.0,
    "region": "south",
    "type": "220kV"
  },
  {
    "id": "56",
    "name": "NMTĐ SÔNG BUNG 4",
    "x": 1813.0,
    "y": 2180.0,
    "width": 235.0,
    "height": 88.0,
    "region": "central",
    "type": "PowerPlant"
  },
  {
    "id": "59",
    "name": "NMĐ A VƯƠNG",
    "x": 1598.0,
    "y": 2400.0,
    "width": 235.0,
    "height": 85.0,
    "region": "central",
    "type": "PowerPlant"
  },
  {
    "id": "62",
    "name": "NMTĐ THÁC MƠ",
    "x": 1515.0,
    "y": 2770.0,
    "width": 235.0,
    "height": 61.0,
    "region": "south",
    "type": "PowerPlant"
  },
  {
    "id": "96",
    "name": "220KV THẠNH MỸ",
    "x": 2162.0,
    "y": 2590.0,
    "width": 235.0,
    "height": 73.0,
    "region": "central",
    "type": "220kV"
  },
  {
    "id": "100",
    "name": "110KV Phước Long",
    "x": 1857.0,
    "y": 2772.0,
    "width": 340.0,
    "height": 110.0,
    "region": "south",
    "type": "110kV"
  },
  {
    "id": "125",
    "name": "VP GENCO2 CẦN THƠ",
    "x": 3105.0,
    "y": 3238.0,
    "width": 235.0,
    "height": 72.0,
    "region": "south",
    "type": "Office"
  },
  {
    "id": "145",
    "name": "220KV Ô MÔN",
    "x": 3810.0,
    "y": 2955.0,
    "width": 235.0,
    "height": 63.0,
    "region": "south",
    "type": "220kV"
  },
  {
    "id": "147",
    "name": "500KV Ô MÔN",
    "x": 3355.0,
    "y": 2930.0,
    "width": 235.0,
    "height": 85.0,
    "region": "south",
    "type": "500kV"
  },
  {
    "id": "151",
    "name": "NMNĐ Ô MÔN",
    "x": 4250.0,
    "y": 3052.0,
    "width": 235.0,
    "height": 61.0,
    "region": "south",
    "type": "PowerPlant"
  },
  {
    "id": "153",
    "name": "VP CÔNG TY NĐ CẦN THƠ",
    "x": 3764.0,
    "y": 3648.0,
    "width": 235.0,
    "height": 61.0,
    "region": "south",
    "type": "Office"
  },
  {
    "id": "154",
    "name": "NMNĐ CẦN THƠ",
    "x": 3505.0,
    "y": 3656.0,
    "width": 235.0,
    "height": 61.0,
    "region": "south",
    "type": "PowerPlant"
  },
  {
    "id": "179",
    "name": "NMNĐ HẢI PHÒNG",
    "x": 4279.0,
    "y": 571.0,
    "width": 249.0,
    "height": 42.0,
    "region": "north",
    "type": "PowerPlant"
  },
  {
    "id": "186",
    "name": "220kV Thủy Nguyên",
    "x": 3869.0,
    "y": 658.0,
    "width": 180.0,
    "height": 49.0,
    "region": "north",
    "type": "220kV"
  },
  {
    "id": "195",
    "name": "220kV Vật Cách",
    "x": 3508.0,
    "y": 873.0,
    "width": 163.0,
    "height": 49.0,
    "region": "north",
    "type": "220kV"
  },
  {
    "id": "200",
    "name": "220KV BÌNH LONG",
    "x": 2331.0,
    "y": 3263.0,
    "width": 219.0,
    "height": 67.0,
    "region": "south",
    "type": "220kV"
  },
  {
    "id": "203",
    "name": "220kV BA LA",
    "x": 2529.0,
    "y": 954.0,
    "width": 255.0,
    "height": 36.0,
    "region": "north",
    "type": "220kV"
  },
  {
    "id": "205",
    "name": "VP CÔNG TY TĐ TRUNG SƠN TẠI HÀ NỘI",
    "x": 2110.0,
    "y": 436.0,
    "width": 235.0,
    "height": 61.0,
    "region": "north",
    "type": "Office"
  },
  {
    "id": "211",
    "name": "CÔNG TY TĐ SÔNG BA HẠ",
    "x": 4655.0,
    "y": 2338.0,
    "width": 235.0,
    "height": 61.0,
    "region": "south-central",
    "type": "Office"
  },
  {
    "id": "214",
    "name": "220KV TUY HÒA",
    "x": 4312.0,
    "y": 2212.0,
    "width": 235.0,
    "height": 73.0,
    "region": "south-central",
    "type": "220kV"
  },
  {
    "id": "219",
    "name": "NMTĐ SÔNG BA HẠ",
    "x": 4328.0,
    "y": 2829.0,
    "width": 235.0,
    "height": 81.0,
    "region": "south-central",
    "type": "PowerPlant"
  },
  {
    "id": "224",
    "name": "110KV K’BANG",
    "x": 3822.0,
    "y": 2737.0,
    "width": 235.0,
    "height": 73.0,
    "region": "south-central",
    "type": "110kV"
  },
  {
    "id": "265",
    "name": "NMTĐ KANAK",
    "x": 3350.0,
    "y": 2741.0,
    "width": 235.0,
    "height": 73.0,
    "region": "south-central",
    "type": "PowerPlant"
  },
  {
    "id": "325",
    "name": "110KV ĐÔNG HÀ",
    "x": 1296.0,
    "y": 1571.0,
    "width": 235.0,
    "height": 59.0,
    "region": "north-central",
    "type": "110kV"
  },
  {
    "id": "328",
    "name": "110KV NMTĐ QUẢNG TRỊ",
    "x": 1405.0,
    "y": 1953.0,
    "width": 239.0,
    "height": 137.0,
    "region": "north-central",
    "type": "110kV"
  },
  {
    "id": "334",
    "name": "220KV PHƯỚC AN",
    "x": 3974.0,
    "y": 1558.0,
    "width": 235.0,
    "height": 73.0,
    "region": "south-central",
    "type": "220kV"
  },
  {
    "id": "335",
    "name": "220KV QUY NHƠN",
    "x": 3876.0,
    "y": 1826.0,
    "width": 235.0,
    "height": 73.0,
    "region": "south-central",
    "type": "220kV"
  },
  {
    "id": "338",
    "name": "VP CÔNG TY TĐ AN KHÊ - KANAK",
    "x": 4404.0,
    "y": 1927.0,
    "width": 235.0,
    "height": 61.0,
    "region": "south-central",
    "type": "Office"
  },
  {
    "id": "344",
    "name": "NMTĐ AN KHÊ",
    "x": 4481.0,
    "y": 1473.0,
    "width": 235.0,
    "height": 73.0,
    "region": "south-central",
    "type": "PowerPlant"
  },
  {
    "id": "358",
    "name": "110KV NMTĐ QUẢNG TRỊ",
    "x": 768.0,
    "y": 1923.0,
    "width": 239.0,
    "height": 117.0,
    "region": "north-central",
    "type": "110kV"
  },
  {
    "id": "360",
    "name": "220KV Hải Dương 2",
    "x": 3522.0,
    "y": 250.0,
    "width": 264.0,
    "height": 110.0,
    "region": "north",
    "type": "220kV"
  },
  {
    "id": "365",
    "name": "220KV Đồng Hòa",
    "x": 3205.0,
    "y": 246.0,
    "width": 285.0,
    "height": 110.0,
    "region": "north",
    "type": "220kV"
  },
  {
    "id": "368",
    "name": "NMNĐ Hải Dương",
    "x": 3821.0,
    "y": 250.0,
    "width": 236.0,
    "height": 110.0,
    "region": "north",
    "type": "PowerPlant"
  }
];

export const VERTICES: WanVertex[] = [
  {
    "id": "2",
    "parentId": "1",
    "zOrder": 2,
    "x": 377.0,
    "y": 2629.0,
    "width": 957.0,
    "height": 957.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "3",
    "parentId": "1",
    "zOrder": 3,
    "x": 106.0,
    "y": 106.0,
    "width": 6019.0,
    "height": 4032.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "frame",
    "region": "north"
  },
  {
    "id": "4",
    "parentId": "1",
    "zOrder": 4,
    "x": 659.0,
    "y": 2713.0,
    "width": 443.0,
    "height": 36.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "left",
    "plainText": "THIẾT BỊ TRUYỀN DẪN HIỆN TẠI EVNICT QUẢN LÝ",
    "lines": [
      {
        "align": "left",
        "runs": [
          {
            "text": "THIẾT BỊ TRUYỀN DẪN HIỆN TẠI EVNICT QUẢN LÝ",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "5",
    "parentId": "1",
    "zOrder": 5,
    "x": 660.0,
    "y": 2769.0,
    "width": 425.0,
    "height": 36.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "left",
    "plainText": "THIẾT BỊ TRUYỀN DẪN CỦA GENCO2",
    "lines": [
      {
        "align": "left",
        "runs": [
          {
            "text": "THIẾT BỊ TRUYỀN DẪN CỦA GENCO2",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "6",
    "parentId": "1",
    "zOrder": 6,
    "x": 525.0,
    "y": 2656.0,
    "width": 191.0,
    "height": 36.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "GHI CHÚ",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GHI CHÚ",
            "color": "#000000",
            "fontSize": 22.58,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": true
          }
        ]
      }
    ],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "7",
    "parentId": "1",
    "zOrder": 7,
    "x": 900.0,
    "y": 2435.0,
    "width": 235.0,
    "height": 61.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s1",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "VP KHE SANH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "VP KHE SANH",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north-central"
  },
  {
    "id": "8",
    "parentId": "1",
    "zOrder": 8,
    "x": 746.0,
    "y": 2201.0,
    "width": 235.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s2",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "NMTĐ QUẢNG TRỊ",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "NMTĐ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "QUẢNG TRỊ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north-central"
  },
  {
    "id": "9",
    "parentId": "1",
    "zOrder": 11,
    "x": 3020.0,
    "y": 2198.0,
    "width": 235.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s2",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "500KV THẠNH MỸ",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "500KV",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "THẠNH MỸ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "central"
  },
  {
    "id": "10",
    "parentId": "1",
    "zOrder": 12,
    "x": 2724.0,
    "y": 2968.0,
    "width": 125.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s3",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "500KV PHÚ LÂM",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "500KV",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PHÚ LÂM",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south"
  },
  {
    "id": "11",
    "parentId": "1",
    "zOrder": 13,
    "x": 2563.0,
    "y": 3452.0,
    "width": 125.0,
    "height": 37.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s4",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "A2",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "A2",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south"
  },
  {
    "id": "12",
    "parentId": "1",
    "zOrder": 14,
    "x": 2586.0,
    "y": 250.0,
    "width": 223.0,
    "height": 42.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s5",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "11 CỬA BẮC",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "11 CỬA BẮC",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north"
  },
  {
    "id": "13",
    "parentId": "1",
    "zOrder": 15,
    "x": 4251.0,
    "y": 183.0,
    "width": 271.0,
    "height": 42.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s6",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "NMNĐ PHẢ LẠI",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "NMNĐ PHẢ LẠI",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north"
  },
  {
    "id": "14",
    "parentId": "1",
    "zOrder": 16,
    "x": 1505.0,
    "y": 630.0,
    "width": 209.0,
    "height": 78.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s7",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "NMTĐ TRUNG SƠN",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "NMTĐ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "TRUNG SƠN",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north"
  },
  {
    "id": "15",
    "parentId": "1",
    "zOrder": 17,
    "x": 2137.0,
    "y": 600.0,
    "width": 123.0,
    "height": 105.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s8",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "500kV HÒA BÌNH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "500kV",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "HÒA BÌNH",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north"
  },
  {
    "id": "16",
    "parentId": "1",
    "zOrder": 18,
    "x": 2939.0,
    "y": 1188.0,
    "width": 159.0,
    "height": 142.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s9",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "500kV NHO QUAN",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "500kV",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NHO QUAN",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north"
  },
  {
    "id": "17",
    "parentId": "1",
    "zOrder": 19,
    "x": 2468.0,
    "y": 301.0,
    "width": 464.0,
    "height": 381.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#6d61a0",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north"
  },
  {
    "id": "18",
    "parentId": "1",
    "zOrder": 20,
    "x": 4154.0,
    "y": 237.0,
    "width": 481.0,
    "height": 329.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north"
  },
  {
    "id": "19",
    "parentId": "1",
    "zOrder": 21,
    "x": 1350.0,
    "y": 730.0,
    "width": 465.0,
    "height": 322.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north"
  },
  {
    "id": "20",
    "parentId": "1",
    "zOrder": 22,
    "x": 1372.0,
    "y": 775.0,
    "width": 89.0,
    "height": 44.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "north"
  },
  {
    "id": "21",
    "parentId": "1",
    "zOrder": 23,
    "x": 1372.0,
    "y": 871.0,
    "width": 88.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "north"
  },
  {
    "id": "22",
    "parentId": "1",
    "zOrder": 24,
    "x": 1995.0,
    "y": 730.0,
    "width": 374.0,
    "height": 324.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#6d61a0",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north"
  },
  {
    "id": "23",
    "parentId": "1",
    "zOrder": 25,
    "x": 2666.0,
    "y": 1138.0,
    "width": 266.0,
    "height": 174.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#6d61a0",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north"
  },
  {
    "id": "24",
    "parentId": "1",
    "zOrder": 26,
    "x": 2824.0,
    "y": 1190.0,
    "width": 73.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#92cddc",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "DWDM BACKBONE",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "DWDM",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "BACKBONE",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-evnict",
    "region": "north"
  },
  {
    "id": "25",
    "parentId": "1",
    "zOrder": 27,
    "x": 982.0,
    "y": 1408.0,
    "width": 283.0,
    "height": 231.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north-central"
  },
  {
    "id": "26",
    "parentId": "1",
    "zOrder": 28,
    "x": 768.0,
    "y": 1494.0,
    "width": 235.0,
    "height": 76.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s11",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "220KV ĐÔNG HÀ",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "220KV",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "ĐÔNG HÀ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north-central"
  },
  {
    "id": "27",
    "parentId": "1",
    "zOrder": 29,
    "x": 791.0,
    "y": 1759.0,
    "width": 235.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s2",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "220KV LAO BẢO",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "220KV",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "LAO BẢO",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north-central"
  },
  {
    "id": "28",
    "parentId": "1",
    "zOrder": 30,
    "x": 1762.0,
    "y": 1628.0,
    "width": 153.0,
    "height": 108.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "central"
  },
  {
    "id": "29",
    "parentId": "1",
    "zOrder": 31,
    "x": 1666.0,
    "y": 1538.0,
    "width": 389.0,
    "height": 106.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s12",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "VP CÔNG TY TĐ QUẢNG TRỊ (ĐÔNG HÀ)",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "VP CÔNG TY TĐ QUẢNG TRỊ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "(ĐÔNG HÀ)",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north-central"
  },
  {
    "id": "30",
    "parentId": "1",
    "zOrder": 32,
    "x": 1809.0,
    "y": 1671.0,
    "width": 88.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "central"
  },
  {
    "id": "31",
    "parentId": "1",
    "zOrder": 33,
    "x": 955.0,
    "y": 2124.0,
    "width": 481.0,
    "height": 229.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north-central"
  },
  {
    "id": "32",
    "parentId": "1",
    "zOrder": 34,
    "x": 1160.0,
    "y": 2289.0,
    "width": 88.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "north-central"
  },
  {
    "id": "33",
    "parentId": "1",
    "zOrder": 35,
    "x": 1163.0,
    "y": 2199.0,
    "width": 89.0,
    "height": 44.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "north-central"
  },
  {
    "id": "34",
    "parentId": "1",
    "zOrder": 36,
    "x": 1106.0,
    "y": 2416.0,
    "width": 201.0,
    "height": 78.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north-central"
  },
  {
    "id": "35",
    "parentId": "1",
    "zOrder": 37,
    "x": 1160.0,
    "y": 2433.0,
    "width": 88.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "north-central"
  },
  {
    "id": "36",
    "parentId": "1",
    "zOrder": 38,
    "x": 3271.0,
    "y": 1258.0,
    "width": 222.0,
    "height": 106.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north"
  },
  {
    "id": "37",
    "parentId": "1",
    "zOrder": 39,
    "x": 3346.0,
    "y": 1289.0,
    "width": 88.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "central"
  },
  {
    "id": "38",
    "parentId": "1",
    "zOrder": 40,
    "x": 3479.5,
    "y": 1280.5,
    "width": 235.0,
    "height": 61.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s1",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "CÔNG TY TĐ A VƯƠNG",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "CÔNG TY TĐ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "A VƯƠNG",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "central"
  },
  {
    "id": "39",
    "parentId": "1",
    "zOrder": 41,
    "x": 2889.0,
    "y": 1613.0,
    "width": 235.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s2",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "A3",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "A3",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "central"
  },
  {
    "id": "40",
    "parentId": "1",
    "zOrder": 42,
    "x": 3263.0,
    "y": 1483.0,
    "width": 222.0,
    "height": 106.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "central"
  },
  {
    "id": "41",
    "parentId": "1",
    "zOrder": 43,
    "x": 3339.0,
    "y": 1514.0,
    "width": 88.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "central"
  },
  {
    "id": "42",
    "parentId": "1",
    "zOrder": 44,
    "x": 3490.0,
    "y": 1509.0,
    "width": 235.0,
    "height": 61.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s1",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "CÔNG TY TĐ SÔNG BUNG",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "CÔNG TY TĐ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "SÔNG BUNG",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "central"
  },
  {
    "id": "43",
    "parentId": "1",
    "zOrder": 45,
    "x": 2824.0,
    "y": 1796.0,
    "width": 73.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#92cddc",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "DWDM BACKBONE",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "DWDM",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "BACKBONE",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-evnict",
    "region": "central"
  },
  {
    "id": "44",
    "parentId": "1",
    "zOrder": 46,
    "x": 2940.0,
    "y": 1788.0,
    "width": 63.0,
    "height": 109.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#92cddc",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN RIBBON 9904X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "RIBBON",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "9904X",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-sdh",
    "region": "central"
  },
  {
    "id": "45",
    "parentId": "1",
    "zOrder": 47,
    "x": 2680.0,
    "y": 1679.0,
    "width": 588.0,
    "height": 330.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#6d61a0",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "central"
  },
  {
    "id": "46",
    "parentId": "1",
    "zOrder": 48,
    "x": 2824.0,
    "y": 2199.0,
    "width": 82.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#92cddc",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "DWDM BACKBONE Apollo 9624/CMR100M",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "DWDM",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "BACKBONE",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "Apollo",
            "color": "#ee0000",
            "fontSize": 12.7,
            "fontFamily": "Themed",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "9624/CMR100M",
            "color": "#ee0000",
            "fontSize": 12.7,
            "fontFamily": "Themed",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-evnict",
    "region": "central"
  },
  {
    "id": "47",
    "parentId": "1",
    "zOrder": 49,
    "x": 2676.0,
    "y": 2111.0,
    "width": 375.0,
    "height": 194.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#6d61a0",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "central"
  },
  {
    "id": "48",
    "parentId": "1",
    "zOrder": 50,
    "x": 2824.0,
    "y": 3060.0,
    "width": 73.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#92cddc",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "DWDM BACKBONE",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "DWDM",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "BACKBONE",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-evnict",
    "region": "south"
  },
  {
    "id": "49",
    "parentId": "1",
    "zOrder": 51,
    "x": 2741.0,
    "y": 3041.0,
    "width": 220.0,
    "height": 109.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#6d61a0",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "south"
  },
  {
    "id": "50",
    "parentId": "1",
    "zOrder": 52,
    "x": 2677.0,
    "y": 3297.0,
    "width": 346.0,
    "height": 371.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#6d61a0",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "south"
  },
  {
    "id": "51",
    "parentId": "1",
    "zOrder": 53,
    "x": 2696.0,
    "y": 3589.0,
    "width": 105.0,
    "height": 55.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP OT CORE NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP OT CORE",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "south"
  },
  {
    "id": "52",
    "parentId": "1",
    "zOrder": 54,
    "x": 2901.0,
    "y": 3585.0,
    "width": 99.0,
    "height": 59.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP IT CORE NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP IT CORE",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "south"
  },
  {
    "id": "53",
    "parentId": "1",
    "zOrder": 55,
    "x": 1822.0,
    "y": 1840.0,
    "width": 235.0,
    "height": 100.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s11",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "NMTĐ SÔNG BUNG 2",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "NMTĐ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "SÔNG BUNG 2",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "central"
  },
  {
    "id": "54",
    "parentId": "1",
    "zOrder": 56,
    "x": 2187.0,
    "y": 2774.0,
    "width": 340.0,
    "height": 86.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s13",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "220KV PHƯỚC LONG",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "220KV",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PHƯỚC LONG",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south"
  },
  {
    "id": "55",
    "parentId": "1",
    "zOrder": 57,
    "x": 2034.0,
    "y": 2168.0,
    "width": 288.0,
    "height": 247.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "central"
  },
  {
    "id": "56",
    "parentId": "1",
    "zOrder": 58,
    "x": 1813.0,
    "y": 2180.0,
    "width": 235.0,
    "height": 88.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s11",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "NMTĐ SÔNG BUNG 4",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "NMTĐ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "SÔNG BUNG 4",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "central"
  },
  {
    "id": "57",
    "parentId": "1",
    "zOrder": 59,
    "x": 2050.0,
    "y": 2182.0,
    "width": 91.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "central"
  },
  {
    "id": "58",
    "parentId": "1",
    "zOrder": 60,
    "x": 2051.0,
    "y": 2269.0,
    "width": 89.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "central"
  },
  {
    "id": "59",
    "parentId": "1",
    "zOrder": 61,
    "x": 1598.0,
    "y": 2400.0,
    "width": 235.0,
    "height": 85.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s11",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "NMĐ A VƯƠNG",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "NMĐ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "A VƯƠNG",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "central"
  },
  {
    "id": "60",
    "parentId": "1",
    "zOrder": 62,
    "x": 1444.0,
    "y": 2835.0,
    "width": 330.0,
    "height": 240.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "south"
  },
  {
    "id": "61",
    "parentId": "1",
    "zOrder": 63,
    "x": 1491.0,
    "y": 3014.0,
    "width": 88.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "south"
  },
  {
    "id": "62",
    "parentId": "1",
    "zOrder": 64,
    "x": 1515.0,
    "y": 2770.0,
    "width": 235.0,
    "height": 61.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s1",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "NMTĐ THÁC MƠ",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "NMTĐ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "THÁC MƠ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south"
  },
  {
    "id": "63",
    "parentId": "1",
    "zOrder": 65,
    "x": 3201.0,
    "y": 3453.0,
    "width": 101.0,
    "height": 101.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s14",
    "fillColor": "#FF00FF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 0.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 0.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "annotation",
    "region": "south"
  },
  {
    "id": "64",
    "parentId": "1",
    "zOrder": 120,
    "x": 521.0,
    "y": 2705.0,
    "width": 74.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "65",
    "parentId": "1",
    "zOrder": 121,
    "x": 522.0,
    "y": 2766.0,
    "width": 74.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#f59d56",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "66",
    "parentId": "1",
    "zOrder": 122,
    "x": 525.0,
    "y": 2827.0,
    "width": 74.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#92cddc",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "67",
    "parentId": "1",
    "zOrder": 123,
    "x": 520.0,
    "y": 3120.0,
    "width": 89.0,
    "height": 51.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#92cddc",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "68",
    "parentId": "1",
    "zOrder": 124,
    "x": 525.0,
    "y": 3190.0,
    "width": 87.0,
    "height": 51.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#d224c1",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#d224c1",
            "fontSize": 14.11,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "69",
    "parentId": "1",
    "zOrder": 125,
    "x": 519.0,
    "y": 3058.0,
    "width": 89.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP (IT)",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#00ff00",
            "fontSize": 14.11,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "(IT)",
            "color": "#00ff00",
            "fontSize": 14.11,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "70",
    "parentId": "1",
    "zOrder": 126,
    "x": 517.0,
    "y": 3001.0,
    "width": 91.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP (OT)",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "(OT)",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "71",
    "parentId": "1",
    "zOrder": 127,
    "x": 657.0,
    "y": 2836.0,
    "width": 419.0,
    "height": 36.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "left",
    "plainText": "THIẾT BỊ TRUYỀN DẪN CỦA EVNICT",
    "lines": [
      {
        "align": "left",
        "runs": [
          {
            "text": "THIẾT BỊ TRUYỀN DẪN CỦA EVNICT",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "72",
    "parentId": "1",
    "zOrder": 128,
    "x": 658.0,
    "y": 3008.0,
    "width": 419.0,
    "height": 36.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "left",
    "plainText": "THIẾT BỊ MPLS-TP (OT) CỦA GENCO2",
    "lines": [
      {
        "align": "left",
        "runs": [
          {
            "text": "THIẾT BỊ MPLS-TP (OT) CỦA GENCO2",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "73",
    "parentId": "1",
    "zOrder": 129,
    "x": 658.0,
    "y": 3065.0,
    "width": 402.0,
    "height": 36.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "left",
    "plainText": "THIẾT BỊ MPLS-TP (IT) CỦA GENCO2",
    "lines": [
      {
        "align": "left",
        "runs": [
          {
            "text": "THIẾT BỊ MPLS-TP (IT) CỦA GENCO2",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "74",
    "parentId": "1",
    "zOrder": 130,
    "x": 652.0,
    "y": 3127.0,
    "width": 416.0,
    "height": 36.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "left",
    "plainText": "THIẾT BỊ TRUYỀN DẪN OTN CỦA EVNICT",
    "lines": [
      {
        "align": "left",
        "runs": [
          {
            "text": "THIẾT BỊ TRUYỀN DẪN OTN CỦA EVNICT",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "75",
    "parentId": "1",
    "zOrder": 131,
    "x": 663.0,
    "y": 3198.0,
    "width": 531.0,
    "height": 36.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "left",
    "plainText": "THIẾT BỊ TRUYỀN DẪN OTN TRANG BỊ MỚI CỦA GENCO2",
    "lines": [
      {
        "align": "left",
        "runs": [
          {
            "text": "THIẾT BỊ TRUYỀN DẪN OTN TRANG BỊ MỚI CỦA GENCO2",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "76",
    "parentId": "1",
    "zOrder": 132,
    "x": 4437.0,
    "y": 290.0,
    "width": 98.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00b050",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-managed",
    "region": "north"
  },
  {
    "id": "77",
    "parentId": "1",
    "zOrder": 137,
    "x": 4445.0,
    "y": 395.0,
    "width": 101.0,
    "height": 43.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "north"
  },
  {
    "id": "78",
    "parentId": "1",
    "zOrder": 138,
    "x": 4374.0,
    "y": 489.0,
    "width": 105.0,
    "height": 43.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "north"
  },
  {
    "id": "79",
    "parentId": "1",
    "zOrder": 139,
    "x": 4505.0,
    "y": 489.0,
    "width": 105.0,
    "height": 43.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "north"
  },
  {
    "id": "80",
    "parentId": "1",
    "zOrder": 146,
    "x": 1725.0,
    "y": 800.0,
    "width": 70.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#d224c1",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "DWDM NOKIA 1830 PSS-8",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "DWDM",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA 1830",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "north"
  },
  {
    "id": "81",
    "parentId": "1",
    "zOrder": 147,
    "x": 4423.0,
    "y": 345.0,
    "width": 143.0,
    "height": 49.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "SPP220KV",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "SPP220KV",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "82",
    "parentId": "1",
    "zOrder": 148,
    "x": 4361.0,
    "y": 524.0,
    "width": 143.0,
    "height": 49.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "DÂY CHUYỀN 1",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "DÂY CHUYỀN 1",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "83",
    "parentId": "1",
    "zOrder": 149,
    "x": 4487.0,
    "y": 525.0,
    "width": 143.0,
    "height": 49.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "DÂY CHUYỀN 2",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "DÂY CHUYỀN 2",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "84",
    "parentId": "1",
    "zOrder": 150,
    "x": 4418.0,
    "y": 246.0,
    "width": 143.0,
    "height": 49.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "ILK",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "ILK",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "85",
    "parentId": "1",
    "zOrder": 153,
    "x": 908.0,
    "y": 3266.0,
    "width": 338.0,
    "height": 42.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s15",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "Cáp quang Genco2 vận hành",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "Cáp quang Genco2 vận hành",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "86",
    "parentId": "1",
    "zOrder": 156,
    "x": 897.0,
    "y": 3322.0,
    "width": 338.0,
    "height": 42.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s15",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "Cáp quang PTCx vận hành",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "Cáp quang PTCx vận hành",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "87",
    "parentId": "1",
    "zOrder": 159,
    "x": 908.0,
    "y": 3372.0,
    "width": 338.0,
    "height": 42.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s15",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "Cáp quang EVNICT vận hành",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "Cáp quang EVNICT vận hành",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "88",
    "parentId": "1",
    "zOrder": 162,
    "x": 911.0,
    "y": 3427.0,
    "width": 338.0,
    "height": 42.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s15",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "Cáp quang EVNCPC vận hành",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "Cáp quang EVNCPC vận hành",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "89",
    "parentId": "1",
    "zOrder": 165,
    "x": 909.0,
    "y": 3482.0,
    "width": 338.0,
    "height": 42.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s15",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "Cáp quang EVNNPT vận hành",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "Cáp quang EVNNPT vận hành",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "90",
    "parentId": "1",
    "zOrder": 166,
    "x": 527.0,
    "y": 2890.0,
    "width": 74.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#ffff00",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "91",
    "parentId": "1",
    "zOrder": 167,
    "x": 658.0,
    "y": 2898.0,
    "width": 419.0,
    "height": 36.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "left",
    "plainText": "THIẾT BỊ TRUYỀN DẪN PTCx",
    "lines": [
      {
        "align": "left",
        "runs": [
          {
            "text": "THIẾT BỊ TRUYỀN DẪN PTCx",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "92",
    "parentId": "1",
    "zOrder": 168,
    "x": 1031.0,
    "y": 1426.0,
    "width": 55.0,
    "height": 89.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#d224c1",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN NOKIA 1830 PSS-8X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "1830",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8X",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-managed",
    "region": "north-central"
  },
  {
    "id": "93",
    "parentId": "1",
    "zOrder": 169,
    "x": 1023.0,
    "y": 1547.0,
    "width": 73.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#d224c1",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "DWDM NOKIA 1830 PSS-8",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "DWDM",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA 1830",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "north-central"
  },
  {
    "id": "94",
    "parentId": "1",
    "zOrder": 170,
    "x": 1024.0,
    "y": 2256.0,
    "width": 55.0,
    "height": 77.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#d224c1",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN NOKIA 1830 PSS-8X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "1830",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8X",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-managed",
    "region": "north-central"
  },
  {
    "id": "95",
    "parentId": "1",
    "zOrder": 171,
    "x": 1016.0,
    "y": 2132.0,
    "width": 73.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#d224c1",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "DWDM NOKIA 1830 PSS-8",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "DWDM",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA 1830",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "north-central"
  },
  {
    "id": "96",
    "parentId": "1",
    "zOrder": 172,
    "x": 2162.0,
    "y": 2590.0,
    "width": 235.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s2",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "220KV THẠNH MỸ",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "220KV",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "THẠNH MỸ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "central"
  },
  {
    "id": "97",
    "parentId": "1",
    "zOrder": 173,
    "x": 528.0,
    "y": 2942.0,
    "width": 74.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "98",
    "parentId": "1",
    "zOrder": 174,
    "x": 656.0,
    "y": 2943.0,
    "width": 419.0,
    "height": 36.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "left",
    "plainText": "THIẾT BỊ TRUYỀN DẪN EVNCPC",
    "lines": [
      {
        "align": "left",
        "runs": [
          {
            "text": "THIẾT BỊ TRUYỀN DẪN EVNCPC",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "99",
    "parentId": "1",
    "zOrder": 175,
    "x": 1951.0,
    "y": 2858.0,
    "width": 164.0,
    "height": 109.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#6d61a0",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "south"
  },
  {
    "id": "100",
    "parentId": "1",
    "zOrder": 176,
    "x": 1857.0,
    "y": 2772.0,
    "width": 340.0,
    "height": 110.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s16",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "110KV Phước Long",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "110KV Phước Long",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south"
  },
  {
    "id": "101",
    "parentId": "1",
    "zOrder": 177,
    "x": 1972.0,
    "y": 2878.0,
    "width": 127.0,
    "height": 70.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "evnict-managed",
    "region": "south"
  },
  {
    "id": "102",
    "parentId": "1",
    "zOrder": 180,
    "x": 1988.0,
    "y": 2872.0,
    "width": 94.0,
    "height": 68.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s17",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "Đấu nhảy cáp quang",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "Đấu nhảy",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "cáp quang",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "south"
  },
  {
    "id": "103",
    "parentId": "1",
    "zOrder": 181,
    "x": 1689.0,
    "y": 2861.0,
    "width": 55.0,
    "height": 93.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#d224c1",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN NOKIA 1830 PSS-8X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "1830",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8X",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-managed",
    "region": "south"
  },
  {
    "id": "104",
    "parentId": "1",
    "zOrder": 184,
    "x": 1486.0,
    "y": 2877.0,
    "width": 91.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "south"
  },
  {
    "id": "105",
    "parentId": "1",
    "zOrder": 187,
    "x": 2807.0,
    "y": 3442.0,
    "width": 114.0,
    "height": 41.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#92cddc",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN NOKIA 1830 PSS-8X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "N",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          },
          {
            "text": "OKIA 1830 PSS-8X",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Themed",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-sdh",
    "region": "south"
  },
  {
    "id": "106",
    "parentId": "1",
    "zOrder": 188,
    "x": 2824.0,
    "y": 3317.0,
    "width": 73.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#92cddc",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "DWDM BACKBONE",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "DWDM",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "BACKBONE",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-evnict",
    "region": "south"
  },
  {
    "id": "107",
    "parentId": "1",
    "zOrder": 197,
    "x": 975.0,
    "y": 1751.0,
    "width": 164.0,
    "height": 101.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#6d61a0",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north-central"
  },
  {
    "id": "108",
    "parentId": "1",
    "zOrder": 198,
    "x": 996.0,
    "y": 1770.0,
    "width": 127.0,
    "height": 70.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "evnict-managed",
    "region": "north-central"
  },
  {
    "id": "109",
    "parentId": "1",
    "zOrder": 199,
    "x": 1000.0,
    "y": 1753.0,
    "width": 111.0,
    "height": 68.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s18",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "Đấu nhảy cáp quang",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "Đấu nhảy",
            "color": "#ee0000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "cáp",
            "color": "#ee0000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "quang",
            "color": "#ee0000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north-central"
  },
  {
    "id": "110",
    "parentId": "1",
    "zOrder": 200,
    "x": 1167.0,
    "y": 1430.0,
    "width": 59.0,
    "height": 82.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#92cddc",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN RIBBON 9904X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "RIBBON",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "9904X",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-sdh",
    "region": "north-central"
  },
  {
    "id": "111",
    "parentId": "1",
    "zOrder": 203,
    "x": 2107.0,
    "y": 2436.0,
    "width": 367.0,
    "height": 142.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#6d61a0",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "central"
  },
  {
    "id": "112",
    "parentId": "1",
    "zOrder": 208,
    "x": 2242.0,
    "y": 2202.0,
    "width": 55.0,
    "height": 79.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#d224c1",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN NOKIA 1830 PSS-8X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "1830",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8X",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-managed",
    "region": "central"
  },
  {
    "id": "113",
    "parentId": "1",
    "zOrder": 209,
    "x": 1540.0,
    "y": 2506.0,
    "width": 346.0,
    "height": 242.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north-central"
  },
  {
    "id": "114",
    "parentId": "1",
    "zOrder": 210,
    "x": 1584.0,
    "y": 2554.0,
    "width": 91.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "central"
  },
  {
    "id": "115",
    "parentId": "1",
    "zOrder": 211,
    "x": 1582.0,
    "y": 2677.0,
    "width": 89.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "south"
  },
  {
    "id": "116",
    "parentId": "1",
    "zOrder": 214,
    "x": 1790.0,
    "y": 2545.0,
    "width": 55.0,
    "height": 79.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#d224c1",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN NOKIA 1830 PSS-8X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "1830",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8X",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-managed",
    "region": "central"
  },
  {
    "id": "117",
    "parentId": "1",
    "zOrder": 215,
    "x": 2030.0,
    "y": 1699.0,
    "width": 330.0,
    "height": 315.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "central"
  },
  {
    "id": "118",
    "parentId": "1",
    "zOrder": 216,
    "x": 2085.0,
    "y": 1858.0,
    "width": 91.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "central"
  },
  {
    "id": "119",
    "parentId": "1",
    "zOrder": 217,
    "x": 2086.0,
    "y": 1945.0,
    "width": 89.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "central"
  },
  {
    "id": "120",
    "parentId": "1",
    "zOrder": 222,
    "x": 2242.0,
    "y": 1881.0,
    "width": 55.0,
    "height": 79.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#d224c1",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN NOKIA 1830 PSS-8X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "1830",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8X",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-managed",
    "region": "central"
  },
  {
    "id": "121",
    "parentId": "1",
    "zOrder": 227,
    "x": 3055.0,
    "y": 560.0,
    "width": 224.0,
    "height": 234.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "122",
    "parentId": "121",
    "zOrder": 228,
    "x": 3055.0,
    "y": 609.0,
    "width": 224.0,
    "height": 134.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s19",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "cloud",
    "region": "north"
  },
  {
    "id": "123",
    "parentId": "1",
    "zOrder": 229,
    "x": 3128.0,
    "y": 631.0,
    "width": 100.0,
    "height": 84.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s20",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN EVNICT",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "EVNICT",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "124",
    "parentId": "1",
    "zOrder": 230,
    "x": 3084.0,
    "y": 3320.0,
    "width": 256.0,
    "height": 199.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "south"
  },
  {
    "id": "125",
    "parentId": "1",
    "zOrder": 231,
    "x": 3105.0,
    "y": 3238.0,
    "width": 235.0,
    "height": 72.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s11",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "VP GENCO2 CẦN THƠ",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "VP GENCO2",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "CẦN THƠ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south"
  },
  {
    "id": "126",
    "parentId": "1",
    "zOrder": 232,
    "x": 3108.0,
    "y": 3365.0,
    "width": 88.0,
    "height": 119.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "annotation",
    "region": "south"
  },
  {
    "id": "127",
    "parentId": "126",
    "zOrder": 233,
    "x": 3148.0,
    "y": 3468.0,
    "width": 17.0,
    "height": 15.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s21",
    "fillColor": "#d9948e",
    "gradientColor": "#ca6962",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "south"
  },
  {
    "id": "128",
    "parentId": "126",
    "zOrder": 234,
    "x": 3108.0,
    "y": 3445.0,
    "width": 58.0,
    "height": 35.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s22",
    "fillColor": "#d9948e",
    "gradientColor": "#ca6962",
    "gradientDirection": "north",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "south"
  },
  {
    "id": "129",
    "parentId": "126",
    "zOrder": 235,
    "x": 3113.0,
    "y": 3448.0,
    "width": 47.0,
    "height": 29.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "south"
  },
  {
    "id": "130",
    "parentId": "129",
    "zOrder": 236,
    "x": 3113.0,
    "y": 3448.0,
    "width": 47.0,
    "height": 28.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s23",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "south"
  },
  {
    "id": "131",
    "parentId": "129",
    "zOrder": 237,
    "x": 3113.0,
    "y": 3449.0,
    "width": 47.0,
    "height": 27.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s24",
    "fillColor": "#969696",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 0.3,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "south"
  },
  {
    "id": "132",
    "parentId": "126",
    "zOrder": 238,
    "x": 3108.0,
    "y": 3457.0,
    "width": 40.0,
    "height": 26.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s25",
    "fillColor": "#d9948e",
    "gradientColor": "#ca6962",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "south"
  },
  {
    "id": "133",
    "parentId": "126",
    "zOrder": 239,
    "x": 3108.0,
    "y": 3445.0,
    "width": 58.0,
    "height": 38.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s26",
    "fillColor": "#d9958f",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "south"
  },
  {
    "id": "134",
    "parentId": "126",
    "zOrder": 240,
    "x": 3120.0,
    "y": 3365.0,
    "width": 76.0,
    "height": 101.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "south"
  },
  {
    "id": "135",
    "parentId": "134",
    "zOrder": 241,
    "x": 3120.0,
    "y": 3365.0,
    "width": 76.0,
    "height": 101.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s27",
    "fillColor": "#FF00FF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 0.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 0.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "south"
  },
  {
    "id": "136",
    "parentId": "134",
    "zOrder": 242,
    "x": 3176.0,
    "y": 3397.0,
    "width": 8.0,
    "height": 55.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s28",
    "fillColor": "#d9948e",
    "gradientColor": "#ca6962",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "south"
  },
  {
    "id": "137",
    "parentId": "134",
    "zOrder": 243,
    "x": 3120.0,
    "y": 3365.0,
    "width": 65.0,
    "height": 37.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s29",
    "fillColor": "#d9948e",
    "gradientColor": "#ca6962",
    "gradientDirection": "north",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "south"
  },
  {
    "id": "138",
    "parentId": "134",
    "zOrder": 244,
    "x": 3130.0,
    "y": 3434.0,
    "width": 66.0,
    "height": 32.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s30",
    "fillColor": "#d9948e",
    "gradientColor": "#ca6962",
    "gradientDirection": "north",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "south"
  },
  {
    "id": "139",
    "parentId": "134",
    "zOrder": 245,
    "x": 3120.0,
    "y": 3369.0,
    "width": 56.0,
    "height": 83.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s31",
    "fillColor": "#d9948e",
    "gradientColor": "#ca6962",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "south"
  },
  {
    "id": "140",
    "parentId": "134",
    "zOrder": 246,
    "x": 3120.0,
    "y": 3365.0,
    "width": 76.0,
    "height": 101.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s32",
    "fillColor": "#d9958f",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "south"
  },
  {
    "id": "141",
    "parentId": "134",
    "zOrder": 247,
    "x": 3125.0,
    "y": 3376.0,
    "width": 46.0,
    "height": 70.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s33",
    "fillColor": "#d9948e",
    "gradientColor": "#ca6962",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "south"
  },
  {
    "id": "142",
    "parentId": "134",
    "zOrder": 248,
    "x": 3139.0,
    "y": 3444.0,
    "width": 51.0,
    "height": 19.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s34",
    "fillColor": "#d9948e",
    "gradientColor": "#ca6962",
    "gradientDirection": "north",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "south"
  },
  {
    "id": "143",
    "parentId": "134",
    "zOrder": 249,
    "x": 3125.0,
    "y": 3376.0,
    "width": 46.0,
    "height": 70.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s35",
    "fillColor": "#FFFFFF",
    "gradientColor": "#c6d1e3",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "south"
  },
  {
    "id": "144",
    "parentId": "1",
    "zOrder": 250,
    "x": 3799.0,
    "y": 3031.0,
    "width": 248.0,
    "height": 281.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "south"
  },
  {
    "id": "145",
    "parentId": "1",
    "zOrder": 251,
    "x": 3810.0,
    "y": 2955.0,
    "width": 235.0,
    "height": 63.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s36",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "220KV Ô MÔN",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "220KV",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "Ô MÔN",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south"
  },
  {
    "id": "146",
    "parentId": "1",
    "zOrder": 252,
    "x": 3389.0,
    "y": 3017.0,
    "width": 185.0,
    "height": 247.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "south"
  },
  {
    "id": "147",
    "parentId": "1",
    "zOrder": 253,
    "x": 3355.0,
    "y": 2930.0,
    "width": 235.0,
    "height": 85.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s37",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "500KV Ô MÔN",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "500KV",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "Ô MÔN",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south"
  },
  {
    "id": "148",
    "parentId": "1",
    "zOrder": 254,
    "x": 3455.0,
    "y": 3057.0,
    "width": 74.0,
    "height": 79.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "HiT7070",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "HiT7070",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "south"
  },
  {
    "id": "149",
    "parentId": "1",
    "zOrder": 255,
    "x": 3823.0,
    "y": 3220.0,
    "width": 92.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "south"
  },
  {
    "id": "150",
    "parentId": "1",
    "zOrder": 256,
    "x": 3822.0,
    "y": 3164.0,
    "width": 92.0,
    "height": 44.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "south"
  },
  {
    "id": "151",
    "parentId": "1",
    "zOrder": 257,
    "x": 4250.0,
    "y": 3052.0,
    "width": 235.0,
    "height": 61.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s1",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "NMNĐ Ô MÔN",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "NMNĐ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "Ô MÔN",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south"
  },
  {
    "id": "152",
    "parentId": "1",
    "zOrder": 258,
    "x": 3798.0,
    "y": 3506.0,
    "width": 169.0,
    "height": 129.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "south"
  },
  {
    "id": "153",
    "parentId": "1",
    "zOrder": 259,
    "x": 3764.0,
    "y": 3648.0,
    "width": 235.0,
    "height": 61.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s1",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "VP CÔNG TY NĐ CẦN THƠ",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "VP CÔNG TY",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NĐ CẦN THƠ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south"
  },
  {
    "id": "154",
    "parentId": "1",
    "zOrder": 260,
    "x": 3505.0,
    "y": 3656.0,
    "width": 235.0,
    "height": 61.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s1",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "NMNĐ CẦN THƠ",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "NMNĐ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "CẦN THƠ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south"
  },
  {
    "id": "155",
    "parentId": "1",
    "zOrder": 261,
    "x": 3529.0,
    "y": 3459.0,
    "width": 190.0,
    "height": 180.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "south"
  },
  {
    "id": "156",
    "parentId": "1",
    "zOrder": 266,
    "x": 3221.0,
    "y": 3428.0,
    "width": 92.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "south"
  },
  {
    "id": "157",
    "parentId": "1",
    "zOrder": 267,
    "x": 3221.0,
    "y": 3362.0,
    "width": 92.0,
    "height": 44.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "south"
  },
  {
    "id": "158",
    "parentId": "1",
    "zOrder": 270,
    "x": 4320.0,
    "y": 3224.0,
    "width": 92.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "south"
  },
  {
    "id": "159",
    "parentId": "1",
    "zOrder": 271,
    "x": 4319.0,
    "y": 3157.0,
    "width": 92.0,
    "height": 44.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "south"
  },
  {
    "id": "160",
    "parentId": "1",
    "zOrder": 274,
    "x": 4271.0,
    "y": 3124.0,
    "width": 203.0,
    "height": 179.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "south"
  },
  {
    "id": "161",
    "parentId": "1",
    "zOrder": 277,
    "x": 3571.0,
    "y": 3562.0,
    "width": 92.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "south"
  },
  {
    "id": "162",
    "parentId": "1",
    "zOrder": 278,
    "x": 3571.0,
    "y": 3496.0,
    "width": 92.0,
    "height": 44.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "south"
  },
  {
    "id": "163",
    "parentId": "1",
    "zOrder": 281,
    "x": 3440.0,
    "y": 3168.0,
    "width": 94.0,
    "height": 82.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "evnict-managed",
    "region": "south"
  },
  {
    "id": "164",
    "parentId": "1",
    "zOrder": 282,
    "x": 3442.0,
    "y": 3162.0,
    "width": 87.0,
    "height": 68.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s38",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "Đấu nhảy cáp quang",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "Đấu nhảy",
            "color": "#ee0000",
            "fontSize": 16.93,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "cáp quang",
            "color": "#ee0000",
            "fontSize": 16.93,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "south"
  },
  {
    "id": "165",
    "parentId": "1",
    "zOrder": 285,
    "x": 1843.0,
    "y": 794.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "95 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "95 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "166",
    "parentId": "1",
    "zOrder": 286,
    "x": 1173.0,
    "y": 2373.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 90.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "6 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "6 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north-central"
  },
  {
    "id": "167",
    "parentId": "1",
    "zOrder": 287,
    "x": 1039.0,
    "y": 1677.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 90.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "70 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "70 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north-central"
  },
  {
    "id": "168",
    "parentId": "1",
    "zOrder": 288,
    "x": 1034.0,
    "y": 1875.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 90.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "5 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "5 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north-central"
  },
  {
    "id": "169",
    "parentId": "1",
    "zOrder": 291,
    "x": 3241.0,
    "y": 1623.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 310.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "4 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "4 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "central"
  },
  {
    "id": "170",
    "parentId": "1",
    "zOrder": 292,
    "x": 2238.0,
    "y": 2072.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 90.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "53 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "53 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "central"
  },
  {
    "id": "171",
    "parentId": "1",
    "zOrder": 293,
    "x": 2500.0,
    "y": 2209.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "33 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "33 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "central"
  },
  {
    "id": "172",
    "parentId": "1",
    "zOrder": 294,
    "x": 1949.0,
    "y": 2579.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 340.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "25 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "25 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "central"
  },
  {
    "id": "173",
    "parentId": "1",
    "zOrder": 295,
    "x": 2597.0,
    "y": 2364.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 340.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "21 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "21 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "central"
  },
  {
    "id": "174",
    "parentId": "1",
    "zOrder": 296,
    "x": 2137.0,
    "y": 2873.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "15 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "15 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "south"
  },
  {
    "id": "175",
    "parentId": "1",
    "zOrder": 297,
    "x": 1811.0,
    "y": 2869.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "15 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "15 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "south"
  },
  {
    "id": "176",
    "parentId": "1",
    "zOrder": 298,
    "x": 3312.0,
    "y": 3272.0,
    "width": 91.0,
    "height": 21.0,
    "rotation": 310.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "8 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "8 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "south"
  },
  {
    "id": "177",
    "parentId": "1",
    "zOrder": 299,
    "x": 4076.0,
    "y": 3200.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "1 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "1 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "south"
  },
  {
    "id": "178",
    "parentId": "1",
    "zOrder": 300,
    "x": 3413.0,
    "y": 723.0,
    "width": 353.0,
    "height": 144.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#6d61a0",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north"
  },
  {
    "id": "179",
    "parentId": "1",
    "zOrder": 303,
    "x": 4279.0,
    "y": 571.0,
    "width": 249.0,
    "height": 42.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s39",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "NMNĐ HẢI PHÒNG",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "NMNĐ HẢI PHÒNG",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north"
  },
  {
    "id": "180",
    "parentId": "1",
    "zOrder": 304,
    "x": 4157.0,
    "y": 612.0,
    "width": 479.0,
    "height": 299.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north"
  },
  {
    "id": "181",
    "parentId": "1",
    "zOrder": 305,
    "x": 4343.0,
    "y": 844.0,
    "width": 89.0,
    "height": 38.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00b050",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-managed",
    "region": "north"
  },
  {
    "id": "182",
    "parentId": "1",
    "zOrder": 306,
    "x": 4341.0,
    "y": 695.0,
    "width": 88.0,
    "height": 43.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "north"
  },
  {
    "id": "183",
    "parentId": "1",
    "zOrder": 307,
    "x": 4517.0,
    "y": 654.0,
    "width": 88.0,
    "height": 43.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "north"
  },
  {
    "id": "184",
    "parentId": "1",
    "zOrder": 308,
    "x": 4518.0,
    "y": 735.0,
    "width": 88.0,
    "height": 43.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "north"
  },
  {
    "id": "185",
    "parentId": "1",
    "zOrder": 313,
    "x": 4184.0,
    "y": 741.0,
    "width": 88.0,
    "height": 88.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "HiT7025",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "HiT7025",
            "color": "#002060",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "186",
    "parentId": "1",
    "zOrder": 322,
    "x": 3869.0,
    "y": 658.0,
    "width": 180.0,
    "height": 49.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "220kV Thủy Nguyên",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "220kV",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "Thủy Nguyên",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north"
  },
  {
    "id": "187",
    "parentId": "1",
    "zOrder": 323,
    "x": 3888.0,
    "y": 722.0,
    "width": 129.0,
    "height": 136.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north"
  },
  {
    "id": "188",
    "parentId": "1",
    "zOrder": 324,
    "x": 3689.0,
    "y": 763.0,
    "width": 60.0,
    "height": 60.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#ffff00",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "hiT7065",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "hiT7065",
            "color": "#ff0000",
            "fontSize": 11.29,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "north"
  },
  {
    "id": "189",
    "parentId": "1",
    "zOrder": 325,
    "x": 3692.0,
    "y": 766.0,
    "width": 53.0,
    "height": 53.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#ffff00",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "otn-genco2",
    "region": "north"
  },
  {
    "id": "190",
    "parentId": "1",
    "zOrder": 326,
    "x": 3689.0,
    "y": 763.0,
    "width": 60.0,
    "height": 60.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "HiT7025 PTC1",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "HiT7025",
            "color": "#ff0000",
            "fontSize": 11.29,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PTC1",
            "color": "#ff0000",
            "fontSize": 11.29,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "191",
    "parentId": "1",
    "zOrder": 327,
    "x": 4523.0,
    "y": 625.0,
    "width": 82.0,
    "height": 23.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "TTDK1",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "TTDK1",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "192",
    "parentId": "1",
    "zOrder": 328,
    "x": 4520.0,
    "y": 710.0,
    "width": 82.0,
    "height": 23.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "TTDK2",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "TTDK2",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "193",
    "parentId": "1",
    "zOrder": 329,
    "x": 4329.0,
    "y": 665.0,
    "width": 106.0,
    "height": 23.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "SPP220KV",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "SPP220KV",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "194",
    "parentId": "1",
    "zOrder": 330,
    "x": 4345.0,
    "y": 815.0,
    "width": 82.0,
    "height": 23.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "ILK",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "ILK",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "195",
    "parentId": "1",
    "zOrder": 331,
    "x": 3508.0,
    "y": 873.0,
    "width": 163.0,
    "height": 49.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "220kV Vật Cách",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "220kV Vật Cách",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north"
  },
  {
    "id": "196",
    "parentId": "1",
    "zOrder": 332,
    "x": 3925.0,
    "y": 763.0,
    "width": 60.0,
    "height": 60.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#ffff00",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "hiT7065",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "hiT7065",
            "color": "#ff0000",
            "fontSize": 11.29,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "north"
  },
  {
    "id": "197",
    "parentId": "1",
    "zOrder": 333,
    "x": 3928.0,
    "y": 766.0,
    "width": 53.0,
    "height": 53.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#ffff00",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "otn-genco2",
    "region": "north"
  },
  {
    "id": "198",
    "parentId": "1",
    "zOrder": 334,
    "x": 3925.0,
    "y": 763.0,
    "width": 60.0,
    "height": 60.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "HiT7025 PTC1",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "HiT7025",
            "color": "#ff0000",
            "fontSize": 11.29,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PTC1",
            "color": "#ff0000",
            "fontSize": 11.29,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "199",
    "parentId": "1",
    "zOrder": 335,
    "x": 2298.0,
    "y": 3090.0,
    "width": 300.0,
    "height": 144.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "south"
  },
  {
    "id": "200",
    "parentId": "1",
    "zOrder": 336,
    "x": 2331.0,
    "y": 3263.0,
    "width": 219.0,
    "height": 67.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s40",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "220KV BÌNH LONG",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "220KV",
            "color": "#ee0000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "BÌNH LONG",
            "color": "#ee0000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south"
  },
  {
    "id": "201",
    "parentId": "1",
    "zOrder": 353,
    "x": 2662.0,
    "y": 789.0,
    "width": 55.0,
    "height": 91.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#92cddc",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN Nokia 1830 PSS-8X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "Nokia ",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          },
          {
            "text": "1830 PSS-8X",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Themed",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-sdh",
    "region": "north"
  },
  {
    "id": "202",
    "parentId": "1",
    "zOrder": 354,
    "x": 2517.0,
    "y": 724.0,
    "width": 265.0,
    "height": 223.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#6d61a0",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north"
  },
  {
    "id": "203",
    "parentId": "1",
    "zOrder": 357,
    "x": 2529.0,
    "y": 954.0,
    "width": 255.0,
    "height": 36.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s41",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "220kV BA LA",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "220kV BA LA",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north"
  },
  {
    "id": "204",
    "parentId": "1",
    "zOrder": 360,
    "x": 2153.0,
    "y": 301.0,
    "width": 160.0,
    "height": 109.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#6d61a0",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north"
  },
  {
    "id": "205",
    "parentId": "1",
    "zOrder": 361,
    "x": 2110.0,
    "y": 436.0,
    "width": 235.0,
    "height": 61.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s1",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "VP CÔNG TY TĐ TRUNG SƠN TẠI HÀ NỘI",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "VP CÔNG TY",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "TĐ TRUNG SƠN",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "TẠI HÀ NỘI",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north"
  },
  {
    "id": "206",
    "parentId": "1",
    "zOrder": 362,
    "x": 3637.0,
    "y": 3065.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "9 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "9 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "south"
  },
  {
    "id": "207",
    "parentId": "1",
    "zOrder": 363,
    "x": 3953.0,
    "y": 3056.0,
    "width": 74.0,
    "height": 79.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "HiT7080",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "HiT7080",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "south"
  },
  {
    "id": "208",
    "parentId": "1",
    "zOrder": 376,
    "x": 3836.0,
    "y": 3559.0,
    "width": 92.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "south"
  },
  {
    "id": "209",
    "parentId": "1",
    "zOrder": 377,
    "x": 4681.0,
    "y": 2410.0,
    "width": 175.0,
    "height": 106.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "south-central"
  },
  {
    "id": "210",
    "parentId": "1",
    "zOrder": 378,
    "x": 4716.0,
    "y": 2441.0,
    "width": 88.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "south-central"
  },
  {
    "id": "211",
    "parentId": "1",
    "zOrder": 379,
    "x": 4655.0,
    "y": 2338.0,
    "width": 235.0,
    "height": 61.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s1",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "CÔNG TY TĐ SÔNG BA HẠ",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "CÔNG TY TĐ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "SÔNG BA HẠ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south-central"
  },
  {
    "id": "212",
    "parentId": "1",
    "zOrder": 380,
    "x": 3938.0,
    "y": 2054.0,
    "width": 89.0,
    "height": 74.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#0294ff",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN RIBBON 9904X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN RIBBON 9904X",
            "color": "#0294ff",
            "fontSize": 11.29,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "south-central"
  },
  {
    "id": "213",
    "parentId": "1",
    "zOrder": 381,
    "x": 3764.0,
    "y": 1891.0,
    "width": 434.0,
    "height": 409.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "south-central"
  },
  {
    "id": "214",
    "parentId": "1",
    "zOrder": 382,
    "x": 4312.0,
    "y": 2212.0,
    "width": 235.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s2",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "220KV TUY HÒA",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "220KV",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "TUY HÒA",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south-central"
  },
  {
    "id": "215",
    "parentId": "1",
    "zOrder": 383,
    "x": 4398.0,
    "y": 2319.0,
    "width": 66.0,
    "height": 52.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#0294ff",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN RIBBON 9904X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN RIBBON",
            "color": "#0294ff",
            "fontSize": 11.29,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "9904X",
            "color": "#0294ff",
            "fontSize": 11.29,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "south-central"
  },
  {
    "id": "216",
    "parentId": "1",
    "zOrder": 384,
    "x": 4335.0,
    "y": 2294.0,
    "width": 189.0,
    "height": 219.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "south-central"
  },
  {
    "id": "217",
    "parentId": "1",
    "zOrder": 385,
    "x": 4386.0,
    "y": 2436.0,
    "width": 85.0,
    "height": 51.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#d224c1",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN NOKIA 1830 PSS-8X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA 1830",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8X",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-managed",
    "region": "south-central"
  },
  {
    "id": "218",
    "parentId": "1",
    "zOrder": 386,
    "x": 4331.0,
    "y": 2659.0,
    "width": 333.0,
    "height": 157.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "south-central"
  },
  {
    "id": "219",
    "parentId": "1",
    "zOrder": 387,
    "x": 4328.0,
    "y": 2829.0,
    "width": 235.0,
    "height": 81.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s11",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "NMTĐ SÔNG BA HẠ",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "NMTĐ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "SÔNG BA HẠ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south-central"
  },
  {
    "id": "220",
    "parentId": "1",
    "zOrder": 388,
    "x": 4562.0,
    "y": 2679.0,
    "width": 91.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "south-central"
  },
  {
    "id": "221",
    "parentId": "1",
    "zOrder": 389,
    "x": 4564.0,
    "y": 2745.0,
    "width": 89.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "south-central"
  },
  {
    "id": "222",
    "parentId": "1",
    "zOrder": 390,
    "x": 4379.0,
    "y": 2707.0,
    "width": 85.0,
    "height": 51.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#d224c1",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN NOKIA 1830 PSS-8X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA 1830",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8X",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-managed",
    "region": "south-central"
  },
  {
    "id": "223",
    "parentId": "1",
    "zOrder": 391,
    "x": 3773.0,
    "y": 2493.0,
    "width": 329.0,
    "height": 245.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "south-central"
  },
  {
    "id": "224",
    "parentId": "1",
    "zOrder": 392,
    "x": 3822.0,
    "y": 2737.0,
    "width": 235.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s20",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "110KV K’BANG",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "110KV",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          },
          {
            "text": " K’BANG",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Themed",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south-central"
  },
  {
    "id": "225",
    "parentId": "1",
    "zOrder": 393,
    "x": 3297.0,
    "y": 2488.0,
    "width": 368.0,
    "height": 251.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "central"
  },
  {
    "id": "226",
    "parentId": "1",
    "zOrder": 394,
    "x": 3795.0,
    "y": 2548.0,
    "width": 91.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "south-central"
  },
  {
    "id": "227",
    "parentId": "1",
    "zOrder": 405,
    "x": 3961.0,
    "y": 2530.0,
    "width": 73.0,
    "height": 72.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "HiT 7025 - CPC",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "HiT 7025 -",
            "color": "#00ff00",
            "fontSize": 14.11,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "CPC",
            "color": "#00ff00",
            "fontSize": 14.11,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "south-central"
  },
  {
    "id": "228",
    "parentId": "1",
    "zOrder": 406,
    "x": 3964.0,
    "y": 2230.0,
    "width": 73.0,
    "height": 54.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "HiT 7025 - CPC",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "HiT 7025 -",
            "color": "#00ff00",
            "fontSize": 14.11,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "CPC",
            "color": "#00ff00",
            "fontSize": 14.11,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "south-central"
  },
  {
    "id": "229",
    "parentId": "1",
    "zOrder": 407,
    "x": 3925.0,
    "y": 2319.0,
    "width": 146.0,
    "height": 152.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "annotation",
    "region": "south-central"
  },
  {
    "id": "230",
    "parentId": "229",
    "zOrder": 408,
    "x": 3925.0,
    "y": 2351.0,
    "width": 146.0,
    "height": 87.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s19",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "cloud",
    "region": "south-central"
  },
  {
    "id": "231",
    "parentId": "1",
    "zOrder": 409,
    "x": 3957.0,
    "y": 2355.0,
    "width": 87.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s20",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "SDH CPC",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "SDH",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "CPC",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "cloud",
    "region": "south-central"
  },
  {
    "id": "232",
    "parentId": "1",
    "zOrder": 412,
    "x": 3495.0,
    "y": 2549.0,
    "width": 89.0,
    "height": 44.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "central"
  },
  {
    "id": "233",
    "parentId": "1",
    "zOrder": 413,
    "x": 4544.0,
    "y": 2424.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "18 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "18 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "south-central"
  },
  {
    "id": "234",
    "parentId": "1",
    "zOrder": 414,
    "x": 4362.0,
    "y": 2578.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 270.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "55 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "55 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "south-central"
  },
  {
    "id": "235",
    "parentId": "1",
    "zOrder": 415,
    "x": 3667.0,
    "y": 2541.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "5 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "5 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "south-central"
  },
  {
    "id": "236",
    "parentId": "1",
    "zOrder": 422,
    "x": 3309.0,
    "y": 2554.0,
    "width": 89.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "central"
  },
  {
    "id": "237",
    "parentId": "1",
    "zOrder": 423,
    "x": 2614.0,
    "y": 437.0,
    "width": 86.0,
    "height": 38.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP TJ1400 - HH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "TJ1400 - HH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "north"
  },
  {
    "id": "238",
    "parentId": "1",
    "zOrder": 425,
    "x": 2832.0,
    "y": 429.0,
    "width": 55.0,
    "height": 91.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#92cddc",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN Nokia 1830 PSS-8X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "Nokia ",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          },
          {
            "text": "1830 PSS-8X",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Themed",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-sdh",
    "region": "north"
  },
  {
    "id": "239",
    "parentId": "1",
    "zOrder": 426,
    "x": 2613.0,
    "y": 485.0,
    "width": 86.0,
    "height": 38.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP TJ1400 - HH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "TJ1400 - HH",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "north"
  },
  {
    "id": "240",
    "parentId": "1",
    "zOrder": 427,
    "x": 2600.0,
    "y": 570.0,
    "width": 126.0,
    "height": 62.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP CORE (0T) NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP CORE (0T)",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "north"
  },
  {
    "id": "241",
    "parentId": "1",
    "zOrder": 428,
    "x": 2592.0,
    "y": 326.0,
    "width": 131.0,
    "height": 59.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP CORE (IT) NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP CORE (IT)",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "north"
  },
  {
    "id": "242",
    "parentId": "1",
    "zOrder": 431,
    "x": 3554.0,
    "y": 739.0,
    "width": 86.0,
    "height": 38.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP TJ1400",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "TJ1400",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "north"
  },
  {
    "id": "243",
    "parentId": "1",
    "zOrder": 432,
    "x": 3552.0,
    "y": 806.0,
    "width": 86.0,
    "height": 38.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#0294ff",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP TJ1400",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0294ff",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "TJ1400",
            "color": "#0294ff",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-managed",
    "region": "north"
  },
  {
    "id": "244",
    "parentId": "1",
    "zOrder": 433,
    "x": 3442.0,
    "y": 750.0,
    "width": 55.0,
    "height": 91.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#0294ff",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN Nokia 1830 PSS-8X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#0294ff",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "Nokia",
            "color": "#0294ff",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "1830",
            "color": "#0294ff",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8X",
            "color": "#0294ff",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-managed",
    "region": "north"
  },
  {
    "id": "245",
    "parentId": "1",
    "zOrder": 436,
    "x": 2273.0,
    "y": 800.0,
    "width": 73.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": true,
    "stencilId": "s10",
    "fillColor": "#92cddc",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "DWDM NOKIA 1830 PSS-8",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "DWDM",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA 1830",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-evnict",
    "region": "north"
  },
  {
    "id": "246",
    "parentId": "1",
    "zOrder": 439,
    "x": 2536.0,
    "y": 801.0,
    "width": 73.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": true,
    "stencilId": "s10",
    "fillColor": "#92cddc",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "DWDM NOKIA 1830 PSS-8",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "DWDM",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA 1830",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-evnict",
    "region": "north"
  },
  {
    "id": "247",
    "parentId": "1",
    "zOrder": 440,
    "x": 2700.0,
    "y": 1193.0,
    "width": 67.0,
    "height": 67.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s42",
    "fillColor": "#f59d56",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "genco2-sdh",
    "region": "north"
  },
  {
    "id": "248",
    "parentId": "247",
    "zOrder": 441,
    "x": 2704.25,
    "y": 1200.56,
    "width": 59.44,
    "height": 50.95,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OSN 2500",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OSN",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "2500",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "249",
    "parentId": "1",
    "zOrder": 450,
    "x": 2153.0,
    "y": 969.0,
    "width": 59.0,
    "height": 59.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s43",
    "fillColor": "#f59d56",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "genco2-sdh",
    "region": "north"
  },
  {
    "id": "250",
    "parentId": "249",
    "zOrder": 451,
    "x": 2156.7,
    "y": 976.2,
    "width": 51.8,
    "height": 44.4,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OSN 2500",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OSN",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "2500",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "251",
    "parentId": "1",
    "zOrder": 452,
    "x": 2152.0,
    "y": 795.0,
    "width": 55.0,
    "height": 91.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#92cddc",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN Nokia 1830 PSS-8X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "Nokia ",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          },
          {
            "text": "1830 PSS-8X",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Themed",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-sdh",
    "region": "north"
  },
  {
    "id": "252",
    "parentId": "1",
    "zOrder": 453,
    "x": 1611.0,
    "y": 787.0,
    "width": 55.0,
    "height": 97.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#d224c1",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN NOKIA 1830 PSS-8X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "1830",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8X",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-managed",
    "region": "north"
  },
  {
    "id": "253",
    "parentId": "1",
    "zOrder": 454,
    "x": 1506.0,
    "y": 974.0,
    "width": 74.0,
    "height": 55.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#f59d56",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "HiT7025",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "HiT7025",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "north"
  },
  {
    "id": "254",
    "parentId": "1",
    "zOrder": 455,
    "x": 1613.0,
    "y": 973.0,
    "width": 55.0,
    "height": 55.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s44",
    "fillColor": "#f59d56",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "genco2-sdh",
    "region": "north"
  },
  {
    "id": "255",
    "parentId": "254",
    "zOrder": 456,
    "x": 1616.47,
    "y": 979.44,
    "width": 48.56,
    "height": 41.63,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OSN 3500",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OSN",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "3500",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "256",
    "parentId": "1",
    "zOrder": 457,
    "x": 4270.0,
    "y": 323.0,
    "width": 58.0,
    "height": 140.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#d224c1",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN NOKIA 1830 PSS-8X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#7030a0",
            "fontSize": 15.52,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA",
            "color": "#7030a0",
            "fontSize": 15.52,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "1830",
            "color": "#7030a0",
            "fontSize": 15.52,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8X",
            "color": "#7030a0",
            "fontSize": 15.52,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-managed",
    "region": "north"
  },
  {
    "id": "257",
    "parentId": "1",
    "zOrder": 458,
    "x": 4184.0,
    "y": 747.0,
    "width": 88.0,
    "height": 88.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "258",
    "parentId": "257",
    "zOrder": 459,
    "x": 4184.0,
    "y": 747.0,
    "width": 88.0,
    "height": 88.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#ffd965",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00b050",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "hiT7065",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "hiT7065",
            "color": "#ff0000",
            "fontSize": 11.29,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "north"
  },
  {
    "id": "259",
    "parentId": "257",
    "zOrder": 460,
    "x": 4188.0,
    "y": 752.0,
    "width": 78.0,
    "height": 78.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#f59d56",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "HiT 7025",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "HiT 7025",
            "color": "#000000",
            "fontSize": 19.76,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "north"
  },
  {
    "id": "260",
    "parentId": "1",
    "zOrder": 462,
    "x": 4042.0,
    "y": 690.0,
    "width": 102.0,
    "height": 36.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "Nâng STM1 lên STM4",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "Nâng STM1",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "lên STM4",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "261",
    "parentId": "1",
    "zOrder": 464,
    "x": 2493.0,
    "y": 3125.0,
    "width": 74.0,
    "height": 72.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "HiT7060 EVNICT",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "HiT7060",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "EVNICT",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "south"
  },
  {
    "id": "262",
    "parentId": "1",
    "zOrder": 465,
    "x": 2821.0,
    "y": 574.0,
    "width": 76.0,
    "height": 76.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#92cddc",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "DWDM BACKBONE",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "DWDM",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "BACKBONE",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-evnict",
    "region": "north"
  },
  {
    "id": "263",
    "parentId": "1",
    "zOrder": 466,
    "x": 3518.0,
    "y": 2671.0,
    "width": 55.0,
    "height": 55.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s42",
    "fillColor": "#f59d56",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "genco2-sdh",
    "region": "south-central"
  },
  {
    "id": "264",
    "parentId": "263",
    "zOrder": 467,
    "x": 3521.44,
    "y": 2677.85,
    "width": 48.15,
    "height": 41.27,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "Loop 9150s",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "Loop",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "9150s",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "south-central"
  },
  {
    "id": "265",
    "parentId": "1",
    "zOrder": 474,
    "x": 3350.0,
    "y": 2741.0,
    "width": 235.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s20",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "NMTĐ KANAK",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "NMTĐ KANAK",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south-central"
  },
  {
    "id": "266",
    "parentId": "1",
    "zOrder": 475,
    "x": 3842.0,
    "y": 2669.0,
    "width": 55.0,
    "height": 55.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s42",
    "fillColor": "#f59d56",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "genco2-sdh",
    "region": "south-central"
  },
  {
    "id": "267",
    "parentId": "266",
    "zOrder": 476,
    "x": 3845.44,
    "y": 2675.85,
    "width": 48.15,
    "height": 41.27,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "Loop 9150s",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "Loop",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "9150s",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "south-central"
  },
  {
    "id": "268",
    "parentId": "1",
    "zOrder": 479,
    "x": 2226.0,
    "y": 319.0,
    "width": 333.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "KÊNH LEASED LINE (VIETTEL) - WAN EVN",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "KÊNH LEASED LINE",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "(VIETTEL) - WAN EVN",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "269",
    "parentId": "1",
    "zOrder": 482,
    "x": 4167.0,
    "y": 362.0,
    "width": 69.0,
    "height": 64.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#d224c1",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "DWDM NOKIA 1830 PSS-8",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "DWDM",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA 1830",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "north"
  },
  {
    "id": "270",
    "parentId": "1",
    "zOrder": 489,
    "x": 3843.0,
    "y": 2166.0,
    "width": 86.0,
    "height": 38.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT 1250",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT 1250",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "south-central"
  },
  {
    "id": "271",
    "parentId": "1",
    "zOrder": 494,
    "x": 2342.0,
    "y": 2453.0,
    "width": 83.0,
    "height": 80.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "HiT7025",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "HiT7025",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "central"
  },
  {
    "id": "272",
    "parentId": "1",
    "zOrder": 495,
    "x": 2928.0,
    "y": 2222.0,
    "width": 73.0,
    "height": 71.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "HiT7060",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "HiT7060",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "central"
  },
  {
    "id": "273",
    "parentId": "1",
    "zOrder": 496,
    "x": 1806.0,
    "y": 2667.0,
    "width": 63.0,
    "height": 61.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "HiT7025 HH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "HiT7025",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "HH",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "south"
  },
  {
    "id": "274",
    "parentId": "1",
    "zOrder": 499,
    "x": 4049.0,
    "y": 814.0,
    "width": 75.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "14 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "14 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "275",
    "parentId": "1",
    "zOrder": 500,
    "x": 3799.0,
    "y": 810.0,
    "width": 75.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "9 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "9 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "276",
    "parentId": "1",
    "zOrder": 503,
    "x": 904.0,
    "y": 3536.0,
    "width": 338.0,
    "height": 42.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s15",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "Cáp quang VIETTEL vận hành",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "Cáp quang VIETTEL vận hành",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "legend",
    "region": "legend"
  },
  {
    "id": "277",
    "parentId": "1",
    "zOrder": 504,
    "x": 3633.0,
    "y": 3197.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "9 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "9 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "south"
  },
  {
    "id": "278",
    "parentId": "1",
    "zOrder": 505,
    "x": 3126.0,
    "y": 1923.0,
    "width": 126.0,
    "height": 54.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP CORE (0T) NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP CORE (0T)",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "central"
  },
  {
    "id": "279",
    "parentId": "1",
    "zOrder": 506,
    "x": 3118.0,
    "y": 1694.0,
    "width": 131.0,
    "height": 53.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP CORE (IT) NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP CORE (IT)",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "central"
  },
  {
    "id": "280",
    "parentId": "1",
    "zOrder": 511,
    "x": 2894.0,
    "y": 1920.0,
    "width": 63.0,
    "height": 61.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "HiT 7065",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "HiT 7065",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "central"
  },
  {
    "id": "281",
    "parentId": "1",
    "zOrder": 512,
    "x": 2750.0,
    "y": 2584.0,
    "width": 224.0,
    "height": 234.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "annotation",
    "region": "central"
  },
  {
    "id": "282",
    "parentId": "281",
    "zOrder": 513,
    "x": 2750.0,
    "y": 2584.0,
    "width": 224.0,
    "height": 234.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "central"
  },
  {
    "id": "283",
    "parentId": "282",
    "zOrder": 514,
    "x": 2750.0,
    "y": 2633.0,
    "width": 224.0,
    "height": 134.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s19",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "cloud",
    "region": "south"
  },
  {
    "id": "284",
    "parentId": "281",
    "zOrder": 515,
    "x": 2801.0,
    "y": 2655.0,
    "width": 137.0,
    "height": 84.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s20",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "Mạng truyền dẫn EVNICT",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "Mạng",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "truyền dẫn",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "EVNICT",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "cloud",
    "region": "south"
  },
  {
    "id": "285",
    "parentId": "1",
    "zOrder": 516,
    "x": 2260.0,
    "y": 3040.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "30 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "30 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "south"
  },
  {
    "id": "286",
    "parentId": "1",
    "zOrder": 517,
    "x": 2273.0,
    "y": 2858.0,
    "width": 164.0,
    "height": 109.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#6d61a0",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "south"
  },
  {
    "id": "287",
    "parentId": "1",
    "zOrder": 518,
    "x": 2293.0,
    "y": 2878.0,
    "width": 127.0,
    "height": 70.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "evnict-managed",
    "region": "south"
  },
  {
    "id": "288",
    "parentId": "1",
    "zOrder": 519,
    "x": 2309.0,
    "y": 2872.0,
    "width": 94.0,
    "height": 68.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s17",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "Đấu nhảy cáp quang",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "Đấu nhảy",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "cáp quang",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "south"
  },
  {
    "id": "289",
    "parentId": "1",
    "zOrder": 524,
    "x": 2768.05,
    "y": 2026.78,
    "width": 293.44,
    "height": 109.0,
    "rotation": 268.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "annotation",
    "region": "central"
  },
  {
    "id": "290",
    "parentId": "289",
    "zOrder": 525,
    "x": 2797.95,
    "y": 2050.78,
    "width": 293.44,
    "height": 109.0,
    "rotation": 268.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "central"
  },
  {
    "id": "291",
    "parentId": "290",
    "zOrder": 526,
    "x": 2797.95,
    "y": 2074.78,
    "width": 293.44,
    "height": 62.0,
    "rotation": 268.0,
    "flipH": false,
    "stencilId": "s19",
    "fillColor": "#eeeaf2",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "cloud",
    "region": "central"
  },
  {
    "id": "292",
    "parentId": "290",
    "zOrder": 527,
    "x": 2879.39,
    "y": 2065.28,
    "width": 130.55,
    "height": 56.0,
    "rotation": 268.0,
    "flipH": false,
    "stencilId": "s20",
    "fillColor": "#eeeaf2",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "SDH EVNICT",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "SDH",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "EVNICT",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "cloud",
    "region": "central"
  },
  {
    "id": "293",
    "parentId": "1",
    "zOrder": 528,
    "x": 2708.0,
    "y": 3351.0,
    "width": 63.0,
    "height": 61.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "HiT 7065",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "HiT 7065",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "south"
  },
  {
    "id": "294",
    "parentId": "1",
    "zOrder": 531,
    "x": 2127.0,
    "y": 2469.0,
    "width": 97.0,
    "height": 49.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ee0000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "Switch Layer 2",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "Switch Layer 2",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-managed",
    "region": "central"
  },
  {
    "id": "295",
    "parentId": "1",
    "zOrder": 536,
    "x": 2314.0,
    "y": 3139.0,
    "width": 100.0,
    "height": 50.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ee0000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "Switch Layer 2",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "Switch Layer 2",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-managed",
    "region": "south"
  },
  {
    "id": "296",
    "parentId": "1",
    "zOrder": 537,
    "x": 2517.0,
    "y": 3209.0,
    "width": 238.0,
    "height": 142.0,
    "rotation": 46.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "annotation",
    "region": "south"
  },
  {
    "id": "297",
    "parentId": "296",
    "zOrder": 538,
    "x": 2517.0,
    "y": 3209.0,
    "width": 238.0,
    "height": 142.0,
    "rotation": 46.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "south"
  },
  {
    "id": "298",
    "parentId": "297",
    "zOrder": 539,
    "x": 2517.0,
    "y": 3239.0,
    "width": 238.0,
    "height": 81.0,
    "rotation": 46.0,
    "flipH": false,
    "stencilId": "s19",
    "fillColor": "#eeeaf2",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "cloud",
    "region": "south"
  },
  {
    "id": "299",
    "parentId": "296",
    "zOrder": 540,
    "x": 2592.0,
    "y": 3260.0,
    "width": 106.0,
    "height": 51.0,
    "rotation": 46.0,
    "flipH": false,
    "stencilId": "s20",
    "fillColor": "#eeeaf2",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "SDH EVNICT",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "SDH",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "EVNICT",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "cloud",
    "region": "south"
  },
  {
    "id": "300",
    "parentId": "1",
    "zOrder": 541,
    "x": 2496.0,
    "y": 337.0,
    "width": 56.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "301",
    "parentId": "300",
    "zOrder": 542,
    "x": 2496.0,
    "y": 337.0,
    "width": 56.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s45",
    "fillColor": "#FF00FF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 0.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 0.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "north"
  },
  {
    "id": "302",
    "parentId": "300",
    "zOrder": 543,
    "x": 2496.0,
    "y": 337.0,
    "width": 56.0,
    "height": 23.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s46",
    "fillColor": "#ffffff",
    "gradientColor": "#ffffff",
    "gradientDirection": "north",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "north"
  },
  {
    "id": "303",
    "parentId": "300",
    "zOrder": 544,
    "x": 2524.0,
    "y": 341.0,
    "width": 19.0,
    "height": 7.0,
    "rotation": 0.0,
    "flipH": true,
    "stencilId": "s47",
    "fillColor": "#FF0000",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "north"
  },
  {
    "id": "304",
    "parentId": "300",
    "zOrder": 545,
    "x": 2503.0,
    "y": 340.0,
    "width": 20.0,
    "height": 8.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s48",
    "fillColor": "#FF0000",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "north"
  },
  {
    "id": "305",
    "parentId": "300",
    "zOrder": 546,
    "x": 2524.0,
    "y": 348.0,
    "width": 20.0,
    "height": 8.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s49",
    "fillColor": "#FF0000",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "north"
  },
  {
    "id": "306",
    "parentId": "300",
    "zOrder": 547,
    "x": 2504.0,
    "y": 348.0,
    "width": 19.0,
    "height": 7.0,
    "rotation": 180.0,
    "flipH": true,
    "stencilId": "s47",
    "fillColor": "#FF0000",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "north"
  },
  {
    "id": "307",
    "parentId": "300",
    "zOrder": 548,
    "x": 2496.0,
    "y": 348.0,
    "width": 56.0,
    "height": 27.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s50",
    "fillColor": "#c0c0c0",
    "gradientColor": "#c0c0c0",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "north"
  },
  {
    "id": "308",
    "parentId": "300",
    "zOrder": 549,
    "x": 2496.0,
    "y": 337.0,
    "width": 56.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s51",
    "fillColor": "#000000",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "north"
  },
  {
    "id": "309",
    "parentId": "1",
    "zOrder": 550,
    "x": 2206.0,
    "y": 336.0,
    "width": 56.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "310",
    "parentId": "309",
    "zOrder": 551,
    "x": 2206.0,
    "y": 336.0,
    "width": 56.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s45",
    "fillColor": "#FF00FF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 0.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 0.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "north"
  },
  {
    "id": "311",
    "parentId": "309",
    "zOrder": 552,
    "x": 2206.0,
    "y": 336.0,
    "width": 56.0,
    "height": 23.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s46",
    "fillColor": "#ffffff",
    "gradientColor": "#ffffff",
    "gradientDirection": "north",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "north"
  },
  {
    "id": "312",
    "parentId": "309",
    "zOrder": 553,
    "x": 2234.0,
    "y": 340.0,
    "width": 19.0,
    "height": 7.0,
    "rotation": 0.0,
    "flipH": true,
    "stencilId": "s47",
    "fillColor": "#FF0000",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "north"
  },
  {
    "id": "313",
    "parentId": "309",
    "zOrder": 554,
    "x": 2213.0,
    "y": 339.0,
    "width": 20.0,
    "height": 8.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s48",
    "fillColor": "#FF0000",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "north"
  },
  {
    "id": "314",
    "parentId": "309",
    "zOrder": 555,
    "x": 2234.0,
    "y": 347.0,
    "width": 20.0,
    "height": 8.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s49",
    "fillColor": "#FF0000",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "north"
  },
  {
    "id": "315",
    "parentId": "309",
    "zOrder": 556,
    "x": 2214.0,
    "y": 347.0,
    "width": 19.0,
    "height": 7.0,
    "rotation": 180.0,
    "flipH": true,
    "stencilId": "s47",
    "fillColor": "#FF0000",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "north"
  },
  {
    "id": "316",
    "parentId": "309",
    "zOrder": 557,
    "x": 2206.0,
    "y": 347.0,
    "width": 56.0,
    "height": 27.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s50",
    "fillColor": "#c0c0c0",
    "gradientColor": "#c0c0c0",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "north"
  },
  {
    "id": "317",
    "parentId": "309",
    "zOrder": 558,
    "x": 2206.0,
    "y": 336.0,
    "width": 56.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s51",
    "fillColor": "#000000",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "icon",
    "region": "north"
  },
  {
    "id": "318",
    "parentId": "1",
    "zOrder": 559,
    "x": 1375.0,
    "y": 974.0,
    "width": 88.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "north"
  },
  {
    "id": "319",
    "parentId": "1",
    "zOrder": 562,
    "x": 1324.0,
    "y": 2184.0,
    "width": 83.0,
    "height": 80.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "HiT7025",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "HiT7025",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "north-central"
  },
  {
    "id": "320",
    "parentId": "1",
    "zOrder": 567,
    "x": 1305.0,
    "y": 1753.0,
    "width": 146.0,
    "height": 152.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "annotation",
    "region": "north-central"
  },
  {
    "id": "321",
    "parentId": "320",
    "zOrder": 568,
    "x": 1305.0,
    "y": 1785.0,
    "width": 146.0,
    "height": 87.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s19",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "cloud",
    "region": "north-central"
  },
  {
    "id": "322",
    "parentId": "1",
    "zOrder": 569,
    "x": 1337.0,
    "y": 1789.0,
    "width": 87.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s20",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "SDH CPC",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "SDH",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "CPC",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "cloud",
    "region": "north-central"
  },
  {
    "id": "323",
    "parentId": "1",
    "zOrder": 570,
    "x": 1344.0,
    "y": 1651.0,
    "width": 73.0,
    "height": 76.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "HiT 7070 - CPC",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "HiT 7070 -",
            "color": "#00ff00",
            "fontSize": 14.11,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "CPC",
            "color": "#00ff00",
            "fontSize": 14.11,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "north-central"
  },
  {
    "id": "324",
    "parentId": "1",
    "zOrder": 571,
    "x": 1303.0,
    "y": 1631.0,
    "width": 246.0,
    "height": 118.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north-central"
  },
  {
    "id": "325",
    "parentId": "1",
    "zOrder": 572,
    "x": 1296.0,
    "y": 1571.0,
    "width": 235.0,
    "height": 59.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s11",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "110KV ĐÔNG HÀ",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "110KV",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "ĐÔNG HÀ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north-central"
  },
  {
    "id": "326",
    "parentId": "1",
    "zOrder": 573,
    "x": 1346.0,
    "y": 1936.0,
    "width": 73.0,
    "height": 76.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "HiT 7030 - CPC",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "HiT 7030 -",
            "color": "#00ff00",
            "fontSize": 14.11,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "CPC",
            "color": "#00ff00",
            "fontSize": 14.11,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "north-central"
  },
  {
    "id": "327",
    "parentId": "1",
    "zOrder": 574,
    "x": 1305.0,
    "y": 1916.0,
    "width": 146.0,
    "height": 118.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north-central"
  },
  {
    "id": "328",
    "parentId": "1",
    "zOrder": 575,
    "x": 1405.0,
    "y": 1953.0,
    "width": 239.0,
    "height": 137.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s52",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "110KV NMTĐ QUẢNG TRỊ",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "110KV",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NMTĐ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "QUẢNG TRỊ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north-central"
  },
  {
    "id": "329",
    "parentId": "1",
    "zOrder": 576,
    "x": 2020.0,
    "y": 796.0,
    "width": 70.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#d224c1",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "DWDM NOKIA 1830 PSS-8",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "DWDM",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA 1830",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "north"
  },
  {
    "id": "330",
    "parentId": "1",
    "zOrder": 577,
    "x": 1574.0,
    "y": 1659.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "5 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "5 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north-central"
  },
  {
    "id": "331",
    "parentId": "1",
    "zOrder": 584,
    "x": 1467.0,
    "y": 1672.0,
    "width": 72.0,
    "height": 36.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ee0000",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "O/E",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "O/E",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-managed",
    "region": "north-central"
  },
  {
    "id": "332",
    "parentId": "1",
    "zOrder": 587,
    "x": 1391.0,
    "y": 1663.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "FE",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "FE",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north-central"
  },
  {
    "id": "333",
    "parentId": "1",
    "zOrder": 590,
    "x": 2488.0,
    "y": 1962.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 45.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "~ 45 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "~ 45 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "central"
  },
  {
    "id": "334",
    "parentId": "1",
    "zOrder": 591,
    "x": 3974.0,
    "y": 1558.0,
    "width": 235.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s2",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "220KV PHƯỚC AN",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "220KV PHƯỚC AN",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south-central"
  },
  {
    "id": "335",
    "parentId": "1",
    "zOrder": 592,
    "x": 3876.0,
    "y": 1826.0,
    "width": 235.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s2",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "220KV QUY NHƠN",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "220KV",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "QUY NHƠN",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south-central"
  },
  {
    "id": "336",
    "parentId": "1",
    "zOrder": 593,
    "x": 4447.0,
    "y": 2003.0,
    "width": 159.0,
    "height": 76.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "south-central"
  },
  {
    "id": "337",
    "parentId": "1",
    "zOrder": 594,
    "x": 4485.0,
    "y": 2019.0,
    "width": 88.0,
    "height": 34.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "south-central"
  },
  {
    "id": "338",
    "parentId": "1",
    "zOrder": 595,
    "x": 4404.0,
    "y": 1927.0,
    "width": 235.0,
    "height": 61.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s1",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "VP CÔNG TY TĐ AN KHÊ - KANAK",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "VP CÔNG TY TĐ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "AN KHÊ - KANAK",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south-central"
  },
  {
    "id": "339",
    "parentId": "1",
    "zOrder": 598,
    "x": 4260.0,
    "y": 2008.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "12 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "12 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "south-central"
  },
  {
    "id": "340",
    "parentId": "1",
    "zOrder": 599,
    "x": 3990.0,
    "y": 1771.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 270.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "6 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "6 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "south-central"
  },
  {
    "id": "341",
    "parentId": "1",
    "zOrder": 600,
    "x": 4397.0,
    "y": 1554.0,
    "width": 412.0,
    "height": 260.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#2812ef",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "south-central"
  },
  {
    "id": "342",
    "parentId": "1",
    "zOrder": 601,
    "x": 4708.0,
    "y": 1743.0,
    "width": 86.0,
    "height": 39.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#00ff00",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1022BH",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1022BH",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-it",
    "region": "south-central"
  },
  {
    "id": "343",
    "parentId": "1",
    "zOrder": 602,
    "x": 4704.0,
    "y": 1622.0,
    "width": 89.0,
    "height": 44.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "MPLS-TP NPT-1050",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "MPLS-TP",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NPT-1050",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "mpls-ot",
    "region": "south-central"
  },
  {
    "id": "344",
    "parentId": "1",
    "zOrder": 603,
    "x": 4481.0,
    "y": 1473.0,
    "width": 235.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s2",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "NMTĐ AN KHÊ",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "NMTĐ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "AN KHÊ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "south-central"
  },
  {
    "id": "345",
    "parentId": "1",
    "zOrder": 604,
    "x": 4442.0,
    "y": 1660.0,
    "width": 73.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#d224c1",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "DWDM NOKIA 1830 PSS-8",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "DWDM",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA 1830",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "south-central"
  },
  {
    "id": "346",
    "parentId": "1",
    "zOrder": 611,
    "x": 4569.0,
    "y": 1651.0,
    "width": 55.0,
    "height": 89.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#d224c1",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN NOKIA 1830 PSS-8X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "1830",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8X",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-managed",
    "region": "south-central"
  },
  {
    "id": "347",
    "parentId": "1",
    "zOrder": 614,
    "x": 4241.0,
    "y": 1649.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "50 km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "50 km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "south-central"
  },
  {
    "id": "348",
    "parentId": "1",
    "zOrder": 615,
    "x": 4071.0,
    "y": 1921.0,
    "width": 73.0,
    "height": 73.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s10",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#d224c1",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "DWDM NOKIA 1830 PSS-8",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "DWDM",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA 1830",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "otn-genco2",
    "region": "south-central"
  },
  {
    "id": "349",
    "parentId": "1",
    "zOrder": 618,
    "x": 3937.0,
    "y": 1928.0,
    "width": 85.0,
    "height": 51.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#d224c1",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN NOKIA 1830 PSS-8X",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NOKIA 1830",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "PSS-8X",
            "color": "#7030a0",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-managed",
    "region": "south-central"
  },
  {
    "id": "350",
    "parentId": "1",
    "zOrder": 619,
    "x": 3784.0,
    "y": 1933.0,
    "width": 73.0,
    "height": 49.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s53",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "SMA 16",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "SMA",
            "color": "#000000",
            "fontSize": 19.76,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "16",
            "color": "#000000",
            "fontSize": 19.76,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "category": "evnict-managed",
    "region": "south-central"
  },
  {
    "id": "351",
    "parentId": "1",
    "zOrder": 626,
    "x": 4010.0,
    "y": 1631.0,
    "width": 164.0,
    "height": 109.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#6d61a0",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "south-central"
  },
  {
    "id": "352",
    "parentId": "1",
    "zOrder": 627,
    "x": 4031.0,
    "y": 1650.0,
    "width": 127.0,
    "height": 70.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "evnict-managed",
    "region": "south-central"
  },
  {
    "id": "353",
    "parentId": "1",
    "zOrder": 628,
    "x": 4047.0,
    "y": 1645.0,
    "width": 94.0,
    "height": 68.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s17",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "Đấu nhảy cáp quang",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "Đấu nhảy",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "cáp quang",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "south-central"
  },
  {
    "id": "354",
    "parentId": "1",
    "zOrder": 631,
    "x": 969.0,
    "y": 1927.0,
    "width": 164.0,
    "height": 101.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#6d61a0",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north-central"
  },
  {
    "id": "355",
    "parentId": "1",
    "zOrder": 632,
    "x": 989.0,
    "y": 1946.0,
    "width": 127.0,
    "height": 70.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#FFFFFF",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "evnict-managed",
    "region": "north-central"
  },
  {
    "id": "356",
    "parentId": "1",
    "zOrder": 633,
    "x": 993.0,
    "y": 1929.0,
    "width": 111.0,
    "height": 68.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s18",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "Đấu nhảy cáp quang",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "Đấu nhảy",
            "color": "#ee0000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "cáp",
            "color": "#ee0000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "quang",
            "color": "#ee0000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north-central"
  },
  {
    "id": "357",
    "parentId": "1",
    "zOrder": 636,
    "x": 1030.0,
    "y": 2062.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 90.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "1 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "1 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north-central"
  },
  {
    "id": "358",
    "parentId": "1",
    "zOrder": 637,
    "x": 768.0,
    "y": 1923.0,
    "width": 239.0,
    "height": 117.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s52",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "110KV NMTĐ QUẢNG TRỊ",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "110KV",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "NMTĐ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "QUẢNG TRỊ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north-central"
  },
  {
    "id": "359",
    "parentId": "1",
    "zOrder": 639,
    "x": 3574.0,
    "y": 342.0,
    "width": 153.0,
    "height": 100.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#6d61a0",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north"
  },
  {
    "id": "360",
    "parentId": "1",
    "zOrder": 640,
    "x": 3522.0,
    "y": 250.0,
    "width": 264.0,
    "height": 110.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s54",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "220KV Hải Dương 2",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "220KV",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "Hải Dương 2",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north"
  },
  {
    "id": "361",
    "parentId": "1",
    "zOrder": 641,
    "x": 4043.0,
    "y": 348.0,
    "width": 75.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "26 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "26 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "362",
    "parentId": "1",
    "zOrder": 642,
    "x": 3595.0,
    "y": 360.0,
    "width": 110.0,
    "height": 61.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#7d7d7d",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "Đấu nhảy Cáp quang",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "Đấu nhảy",
            "color": "#ee0000",
            "fontSize": 16.93,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "Cáp quang",
            "color": "#ee0000",
            "fontSize": 16.93,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "363",
    "parentId": "1",
    "zOrder": 643,
    "x": 3259.0,
    "y": 353.0,
    "width": 150.0,
    "height": 96.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#6d61a0",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north"
  },
  {
    "id": "364",
    "parentId": "1",
    "zOrder": 644,
    "x": 3280.0,
    "y": 379.0,
    "width": 110.0,
    "height": 38.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#7d7d7d",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#0294ff",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "OTN Nokia 1830 ONE-H",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTN",
            "color": "#0294ff",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "Nokia 1830 ONE-H",
            "color": "#0294ff",
            "fontSize": 12.7,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "365",
    "parentId": "1",
    "zOrder": 645,
    "x": 3205.0,
    "y": 246.0,
    "width": 285.0,
    "height": 110.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s55",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "220KV Đồng Hòa",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "220KV",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "Đồng Hòa",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north"
  },
  {
    "id": "366",
    "parentId": "1",
    "zOrder": 647,
    "x": 3449.0,
    "y": 353.0,
    "width": 83.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "30 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "30 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "367",
    "parentId": "1",
    "zOrder": 650,
    "x": 3859.0,
    "y": 342.0,
    "width": 153.0,
    "height": 100.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#6d61a0",
    "strokeWidth": 2.0,
    "strokeOpacity": 1.0,
    "dashed": true,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "boundary",
    "region": "north"
  },
  {
    "id": "368",
    "parentId": "1",
    "zOrder": 651,
    "x": 3821.0,
    "y": 250.0,
    "width": 236.0,
    "height": 110.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s56",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#ffffff",
    "strokeWidth": 0.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "NMNĐ Hải Dương",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "NMNĐ",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "Hải Dương",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "station",
    "region": "north"
  },
  {
    "id": "369",
    "parentId": "1",
    "zOrder": 652,
    "x": 3880.0,
    "y": 360.0,
    "width": 110.0,
    "height": 61.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#7d7d7d",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "Đấu nhảy Cáp quang",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "Đấu nhảy",
            "color": "#ee0000",
            "fontSize": 16.93,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "Cáp quang",
            "color": "#ee0000",
            "fontSize": 16.93,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "370",
    "parentId": "1",
    "zOrder": 654,
    "x": 3762.0,
    "y": 347.0,
    "width": 75.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "13 Km",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "13 Km",
            "color": "#000000",
            "fontSize": 21.17,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "north"
  },
  {
    "id": "371",
    "parentId": "1",
    "zOrder": 655,
    "x": 2189.0,
    "y": 2318.0,
    "width": 111.0,
    "height": 76.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#9dbb61",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 3.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "SDH Huawei 1800V Pro",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "SDH",
            "color": "#000000",
            "fontSize": 19.76,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "Huawei",
            "color": "#000000",
            "fontSize": 19.76,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "1800V Pro",
            "color": "#000000",
            "fontSize": 19.76,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "central"
  },
  {
    "id": "372",
    "parentId": "1",
    "zOrder": 660,
    "x": 2169.0,
    "y": 2291.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "STM-1/4",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "STM-1/4",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "central"
  },
  {
    "id": "373",
    "parentId": "1",
    "zOrder": 661,
    "x": 2249.0,
    "y": 2291.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "STM-1",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "STM-1",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "central"
  },
  {
    "id": "374",
    "parentId": "1",
    "zOrder": 662,
    "x": 2199.0,
    "y": 1753.0,
    "width": 111.0,
    "height": 76.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#9dbb61",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 3.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "SDH Huawei 1800V Pro",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "SDH",
            "color": "#000000",
            "fontSize": 19.76,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "Huawei",
            "color": "#000000",
            "fontSize": 19.76,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "1800V Pro",
            "color": "#000000",
            "fontSize": 19.76,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "central"
  },
  {
    "id": "375",
    "parentId": "1",
    "zOrder": 665,
    "x": 2254.0,
    "y": 1844.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "STM-1/4",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "STM-1/4",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "central"
  },
  {
    "id": "376",
    "parentId": "1",
    "zOrder": 666,
    "x": 2708.0,
    "y": 2127.0,
    "width": 111.0,
    "height": 76.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "#9dbb61",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 3.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "SDH Huawei 1800V Pro",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "SDH",
            "color": "#000000",
            "fontSize": 19.76,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "Huawei",
            "color": "#000000",
            "fontSize": 19.76,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "1800V Pro",
            "color": "#000000",
            "fontSize": 19.76,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "central"
  },
  {
    "id": "377",
    "parentId": "1",
    "zOrder": 669,
    "x": 2842.0,
    "y": 2194.0,
    "width": 101.0,
    "height": 21.0,
    "rotation": 35.0,
    "flipH": false,
    "stencilId": "s0",
    "fillColor": "none",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "none",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "STM-1",
    "lines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "STM-1",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "category": "annotation",
    "region": "central"
  },
  {
    "id": "670",
    "parentId": "1",
    "zOrder": 670,
    "x": 0.0,
    "y": 0.0,
    "width": 0.0,
    "height": 0.0,
    "rotation": 0.0,
    "flipH": false,
    "stencilId": null,
    "fillColor": "#ffffff",
    "gradientColor": "none",
    "gradientDirection": "south",
    "fillOpacity": 1.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "strokeOpacity": 1.0,
    "dashed": false,
    "align": "center",
    "plainText": "",
    "lines": [],
    "category": "evnict-managed",
    "region": "north"
  }
];

export const EDGES: WanEdge[] = [
  {
    "id": "378",
    "zOrder": 9,
    "sourceX": 1464.0,
    "sourceY": 892.0,
    "targetX": 1609.0,
    "targetY": 848.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Electric",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Electric",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 343.21,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "north"
  },
  {
    "id": "380",
    "zOrder": 66,
    "sourceX": 2724.0,
    "sourceY": 601.0,
    "targetX": 2834.0,
    "targetY": 498.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "4xGE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "4x",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          },
          {
            "text": "GE Optical",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 316.94,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "north"
  },
  {
    "id": "382",
    "zOrder": 68,
    "sourceX": 2721.0,
    "sourceY": 354.0,
    "targetX": 2836.0,
    "targetY": 448.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "4xGE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "4x",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          },
          {
            "text": "GE Optical",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 39.12,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "north"
  },
  {
    "id": "384",
    "zOrder": 70,
    "sourceX": 2859.0,
    "sourceY": 498.0,
    "targetX": 2859.0,
    "targetY": 575.0,
    "strokeColor": "#92d050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 270.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "north"
  },
  {
    "id": "386",
    "zOrder": 72,
    "sourceX": 2859.0,
    "sourceY": 650.0,
    "targetX": 2859.0,
    "targetY": 1189.0,
    "strokeColor": "#92d050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "BACKBONE EVN",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "BACKBONE",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "EVN",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.05,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "north"
  },
  {
    "id": "388",
    "zOrder": 74,
    "sourceX": 1791.0,
    "sourceY": 834.0,
    "targetX": 2019.0,
    "targetY": 834.0,
    "strokeColor": "#0000ff",
    "strokeWidth": 4.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "OTU2 - OPGW PTC1",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTU2 - OPGW PTC1",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "north"
  },
  {
    "id": "390",
    "zOrder": 76,
    "sourceX": 1468.0,
    "sourceY": 798.0,
    "targetX": 1610.0,
    "targetY": 812.0,
    "strokeColor": "#c00000",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 5.78,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-cpc",
    "region": "north"
  },
  {
    "id": "392",
    "zOrder": 78,
    "sourceX": 2861.0,
    "sourceY": 1264.0,
    "targetX": 2861.0,
    "targetY": 1794.0,
    "strokeColor": "#92d050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "BACKBONE EVN",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "BACKBONE",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "EVN",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.62,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "central"
  },
  {
    "id": "394",
    "zOrder": 80,
    "sourceX": 3385.0,
    "sourceY": 1513.0,
    "targetX": 3385.0,
    "targetY": 1328.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "FO",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "FO",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.0,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "central"
  },
  {
    "id": "396",
    "zOrder": 82,
    "sourceX": 3250.0,
    "sourceY": 1723.0,
    "targetX": 3381.0,
    "targetY": 1554.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE - GENCO2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE - GENCO2",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 307.98,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "central"
  },
  {
    "id": "398",
    "zOrder": 84,
    "sourceX": 1227.0,
    "sourceY": 1472.0,
    "targetX": 2854.0,
    "targetY": 1472.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": true,
    "labelPlainText": "EVNICT",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "EVNICT",
            "color": "#ee0000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.57,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "central"
  },
  {
    "id": "400",
    "zOrder": 86,
    "sourceX": 1060.0,
    "sourceY": 1620.0,
    "targetX": 1060.0,
    "targetY": 1750.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "OTU2 – PTC2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTU2 – PTC2",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "north-central"
  },
  {
    "id": "402",
    "zOrder": 88,
    "sourceX": 1080.0,
    "sourceY": 2281.0,
    "targetX": 1161.0,
    "targetY": 2222.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 323.67,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "north-central"
  },
  {
    "id": "404",
    "zOrder": 90,
    "sourceX": 1081.0,
    "sourceY": 2289.0,
    "targetX": 1158.0,
    "targetY": 2318.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Electric",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Electric",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 21.14,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "north-central"
  },
  {
    "id": "406",
    "zOrder": 92,
    "sourceX": 1204.0,
    "sourceY": 2331.0,
    "targetX": 1204.0,
    "targetY": 2433.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.0,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "north-central"
  },
  {
    "id": "408",
    "zOrder": 94,
    "sourceX": 2860.0,
    "sourceY": 1868.0,
    "targetX": 2860.0,
    "targetY": 2199.0,
    "strokeColor": "#92d050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "BACKBONE EVN",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "BACKBONE",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "EVN",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.62,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "central"
  },
  {
    "id": "410",
    "zOrder": 96,
    "sourceX": 2860.0,
    "sourceY": 2273.0,
    "targetX": 2860.0,
    "targetY": 2633.0,
    "strokeColor": "#92d050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "BACKBONE EVN",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "BACKBONE",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "EVN",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.62,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "central"
  },
  {
    "id": "412",
    "zOrder": 98,
    "sourceX": 2300.0,
    "sourceY": 2246.0,
    "targetX": 2821.0,
    "targetY": 2246.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "OTU2 – OPGW PTC2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTU2 – OPGW PTC2",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "central"
  },
  {
    "id": "414",
    "zOrder": 100,
    "sourceX": 2269.0,
    "sourceY": 1963.0,
    "targetX": 2269.0,
    "targetY": 2201.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "OTU2 – OPGW PTC2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTU2 – OPGW PTC2",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "central"
  },
  {
    "id": "416",
    "zOrder": 102,
    "sourceX": 2144.0,
    "sourceY": 2203.0,
    "targetX": 2239.0,
    "targetY": 2217.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "2x GE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "2x GE Optical",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 8.72,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "central"
  },
  {
    "id": "418",
    "zOrder": 104,
    "sourceX": 2140.0,
    "sourceY": 2288.0,
    "targetX": 2239.0,
    "targetY": 2269.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Electric",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Electric",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 348.86,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "central"
  },
  {
    "id": "420",
    "zOrder": 106,
    "sourceX": 2863.0,
    "sourceY": 2738.0,
    "targetX": 2863.0,
    "targetY": 3059.0,
    "strokeColor": "#92d050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "BACKBONE EVN",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "BACKBONE",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "EVN",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.62,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "south"
  },
  {
    "id": "422",
    "zOrder": 108,
    "sourceX": 2862.0,
    "sourceY": 3135.0,
    "targetX": 2862.0,
    "targetY": 3321.0,
    "strokeColor": "#92d050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "BACKBONE EVN",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "BACKBONE",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "EVN",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.62,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "south"
  },
  {
    "id": "424",
    "zOrder": 110,
    "sourceX": 2098.0,
    "sourceY": 2909.0,
    "targetX": 2291.0,
    "targetY": 2909.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE - ĐL Đồng Nai – SPC",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE - ĐL Đồng Nai – SPC",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south"
  },
  {
    "id": "426",
    "zOrder": 112,
    "sourceX": 2870.0,
    "sourceY": 3484.0,
    "targetX": 2951.0,
    "targetY": 3583.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "4xGE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "4x",
            "color": "#0070c0",
            "fontSize": 11.29,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          },
          {
            "text": "GE Optical",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 50.7,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "south"
  },
  {
    "id": "428",
    "zOrder": 114,
    "sourceX": 2748.0,
    "sourceY": 3589.0,
    "targetX": 2847.0,
    "targetY": 3486.0,
    "strokeColor": "#c00000",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "4xGE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "4xGE Optical",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 313.85,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-cpc",
    "region": "south"
  },
  {
    "id": "430",
    "zOrder": 116,
    "sourceX": 2859.0,
    "sourceY": 2096.0,
    "targetX": 3970.0,
    "targetY": 2096.0,
    "strokeColor": "#00b050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": true,
    "endArrow": false,
    "labelPlainText": "EVNICT",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "EVNICT",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.57,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "central"
  },
  {
    "id": "432",
    "zOrder": 118,
    "sourceX": 2895.0,
    "sourceY": 3099.0,
    "targetX": 3458.0,
    "targetY": 3099.0,
    "strokeColor": "#00b050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "EVNICT",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "EVNICT",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.57,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "south"
  },
  {
    "id": "434",
    "zOrder": 133,
    "sourceX": 4329.0,
    "sourceY": 393.0,
    "targetX": 4444.0,
    "targetY": 418.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 12.53,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "north"
  },
  {
    "id": "436",
    "zOrder": 135,
    "sourceX": 4329.0,
    "sourceY": 376.0,
    "targetX": 4436.0,
    "targetY": 312.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Electric",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Electric",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 329.28,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "north"
  },
  {
    "id": "438",
    "zOrder": 140,
    "sourceX": 4445.0,
    "sourceY": 440.0,
    "targetX": 4425.0,
    "targetY": 489.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "FO",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "FO",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 293.3,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "north"
  },
  {
    "id": "440",
    "zOrder": 142,
    "sourceX": 4547.0,
    "sourceY": 439.0,
    "targetX": 4567.0,
    "targetY": 489.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "FO",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "FO",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 68.38,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "north"
  },
  {
    "id": "442",
    "zOrder": 144,
    "sourceX": 2886.0,
    "sourceY": 480.0,
    "targetX": 3112.0,
    "targetY": 638.0,
    "strokeColor": "#00b050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "OTU2 - EVNICT",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTU2 - EVNICT",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 34.79,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "north"
  },
  {
    "id": "444",
    "zOrder": 151,
    "sourceX": 508.0,
    "sourceY": 3288.0,
    "targetX": 866.0,
    "targetY": 3288.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GENCO2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GENCO2",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 359.95,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-legend",
    "region": "legend"
  },
  {
    "id": "446",
    "zOrder": 154,
    "sourceX": 510.0,
    "sourceY": 3344.0,
    "targetX": 868.0,
    "targetY": 3344.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "PTCx",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "PTCx",
            "color": "#0070c0",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 359.95,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-legend",
    "region": "legend"
  },
  {
    "id": "448",
    "zOrder": 157,
    "sourceX": 508.0,
    "sourceY": 3395.0,
    "targetX": 866.0,
    "targetY": 3395.0,
    "strokeColor": "#00b050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "EVNICT",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "EVNICT",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 359.95,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-legend",
    "region": "legend"
  },
  {
    "id": "450",
    "zOrder": 160,
    "sourceX": 501.0,
    "sourceY": 3450.0,
    "targetX": 859.0,
    "targetY": 3450.0,
    "strokeColor": "#ee0000",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "EVNCPC",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "EVNCPC",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 359.95,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-legend",
    "region": "legend"
  },
  {
    "id": "452",
    "zOrder": 163,
    "sourceX": 503.0,
    "sourceY": 3509.0,
    "targetX": 861.0,
    "targetY": 3509.0,
    "strokeColor": "#000000",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "EVNNPT",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "EVNNPT",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 359.95,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-legend",
    "region": "legend"
  },
  {
    "id": "454",
    "zOrder": 178,
    "sourceX": 1745.0,
    "sourceY": 2904.0,
    "targetX": 1973.0,
    "targetY": 2904.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE - ĐL Đồng Nai – SPC",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE - ĐL Đồng Nai – SPC",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south"
  },
  {
    "id": "456",
    "zOrder": 182,
    "sourceX": 1532.0,
    "sourceY": 3014.0,
    "targetX": 1532.0,
    "targetY": 2919.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Electric",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Electric",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.0,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "south"
  },
  {
    "id": "458",
    "zOrder": 185,
    "sourceX": 1580.0,
    "sourceY": 2900.0,
    "targetX": 1689.0,
    "targetY": 2900.0,
    "strokeColor": "#ff00ff",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-viettel",
    "region": "south"
  },
  {
    "id": "460",
    "zOrder": 189,
    "sourceX": 1052.0,
    "sourceY": 2205.0,
    "targetX": 1052.0,
    "targetY": 2255.0,
    "strokeColor": "#92d050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 1.27,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "north-central"
  },
  {
    "id": "462",
    "zOrder": 191,
    "sourceX": 2895.0,
    "sourceY": 1837.0,
    "targetX": 2940.0,
    "targetY": 1837.0,
    "strokeColor": "#92d050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 0.57,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "central"
  },
  {
    "id": "464",
    "zOrder": 193,
    "sourceX": 1670.0,
    "sourceY": 837.0,
    "targetX": 1722.0,
    "targetY": 837.0,
    "strokeColor": "#92d050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 0.57,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "north"
  },
  {
    "id": "466",
    "zOrder": 195,
    "sourceX": 2861.0,
    "sourceY": 3391.0,
    "targetX": 2861.0,
    "targetY": 3442.0,
    "strokeColor": "#92d050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 0.13,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "south"
  },
  {
    "id": "468",
    "zOrder": 201,
    "sourceX": 1086.0,
    "sourceY": 1472.0,
    "targetX": 1168.0,
    "targetY": 1472.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "2xGE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "2x",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          },
          {
            "text": "GE Optical",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "north-central"
  },
  {
    "id": "470",
    "zOrder": 204,
    "sourceX": 1846.0,
    "sourceY": 2584.0,
    "targetX": 2125.0,
    "targetY": 2495.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE – OPGW PTC2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE – OPGW PTC2",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 342.4,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "central"
  },
  {
    "id": "472",
    "zOrder": 206,
    "sourceX": 2430.0,
    "sourceY": 2485.0,
    "targetX": 2938.0,
    "targetY": 2283.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "STM-4 – OPGW PTC2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "STM-4 – OPGW PTC2",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 338.38,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "central"
  },
  {
    "id": "474",
    "zOrder": 212,
    "sourceX": 1675.0,
    "sourceY": 2579.0,
    "targetX": 1790.0,
    "targetY": 2579.0,
    "strokeColor": "#ff00ff",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-viettel",
    "region": "central"
  },
  {
    "id": "476",
    "zOrder": 218,
    "sourceX": 2178.0,
    "sourceY": 1875.0,
    "targetX": 2239.0,
    "targetY": 1896.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 19.29,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "central"
  },
  {
    "id": "478",
    "zOrder": 220,
    "sourceX": 2176.0,
    "sourceY": 1969.0,
    "targetX": 2239.0,
    "targetY": 1948.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "2xGE Electric",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "2x",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          },
          {
            "text": "GE Electric",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 341.57,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "central"
  },
  {
    "id": "480",
    "zOrder": 223,
    "sourceX": 3234.0,
    "sourceY": 717.0,
    "targetX": 3439.0,
    "targetY": 794.0,
    "strokeColor": "#00b050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "OTU2 - EVNICT",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTU2 - EVNICT",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 20.65,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "north"
  },
  {
    "id": "482",
    "zOrder": 225,
    "sourceX": 2087.0,
    "sourceY": 838.0,
    "targetX": 2153.0,
    "targetY": 838.0,
    "strokeColor": "#92d050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "OTU-2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTU-2",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 359.86,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "north"
  },
  {
    "id": "484",
    "zOrder": 262,
    "sourceX": 3916.0,
    "sourceY": 3170.0,
    "targetX": 3983.0,
    "targetY": 3151.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 343.7,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south"
  },
  {
    "id": "486",
    "zOrder": 264,
    "sourceX": 3918.0,
    "sourceY": 3232.0,
    "targetX": 3999.0,
    "targetY": 3205.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 341.53,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "south"
  },
  {
    "id": "488",
    "zOrder": 268,
    "sourceX": 3315.0,
    "sourceY": 3388.0,
    "targetX": 3440.0,
    "targetY": 3221.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical - GENCO2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          },
          {
            "text": " - GENCO2",
            "color": "#7030a0",
            "fontSize": 16.93,
            "fontFamily": "Themed",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 306.93,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": -29.5,
    "labelOffsetY": 10.0,
    "category": "cable-genco2",
    "region": "south"
  },
  {
    "id": "490",
    "zOrder": 272,
    "sourceX": 3917.0,
    "sourceY": 3179.0,
    "targetX": 4321.0,
    "targetY": 3179.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical  – GENCO2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          },
          {
            "text": " ",
            "color": "#7030a0",
            "fontSize": 16.93,
            "fontFamily": "Themed",
            "bold": false,
            "underline": false
          },
          {
            "text": " – GENCO2",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south"
  },
  {
    "id": "492",
    "zOrder": 275,
    "sourceX": 3917.0,
    "sourceY": 3242.0,
    "targetX": 4321.0,
    "targetY": 3242.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical – GENCO2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical – GENCO2",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south"
  },
  {
    "id": "494",
    "zOrder": 279,
    "sourceX": 3619.0,
    "sourceY": 3494.0,
    "targetX": 3822.0,
    "targetY": 3191.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical - GENCO2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical",
            "color": "#ff0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          },
          {
            "text": " - GENCO2",
            "color": "#ff0000",
            "fontSize": 16.93,
            "fontFamily": "Themed",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 303.83,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south"
  },
  {
    "id": "496",
    "zOrder": 283,
    "sourceX": 3315.0,
    "sourceY": 3446.0,
    "targetX": 3464.0,
    "targetY": 3253.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical - GENCO2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical - GENCO2",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 307.64,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south"
  },
  {
    "id": "498",
    "zOrder": 289,
    "sourceX": 1054.0,
    "sourceY": 1853.0,
    "targetX": 1054.0,
    "targetY": 1946.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "OTU2 – GENCO2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTU2 – GENCO2",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "north-central"
  },
  {
    "id": "500",
    "zOrder": 301,
    "sourceX": 3497.0,
    "sourceY": 782.0,
    "targetX": 3555.0,
    "targetY": 758.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE -O",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE -O",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 337.95,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "north"
  },
  {
    "id": "502",
    "zOrder": 309,
    "sourceX": 4429.0,
    "sourceY": 695.0,
    "targetX": 4516.0,
    "targetY": 678.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 1.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "FO",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "FO",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 2.59,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "north"
  },
  {
    "id": "504",
    "zOrder": 311,
    "sourceX": 4429.0,
    "sourceY": 738.0,
    "targetX": 4517.0,
    "targetY": 755.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 1.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "FO",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "FO",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 356.84,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "north"
  },
  {
    "id": "506",
    "zOrder": 314,
    "sourceX": 4274.0,
    "sourceY": 772.0,
    "targetX": 4341.0,
    "targetY": 718.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "FE-Electric",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "FE-Electric",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 320.81,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "north"
  },
  {
    "id": "508",
    "zOrder": 316,
    "sourceX": 4272.0,
    "sourceY": 807.0,
    "targetX": 4342.0,
    "targetY": 859.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "FE-Electric",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "FE-",
            "color": "#0070c0",
            "fontSize": 11.29,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          },
          {
            "text": "Electric",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 36.59,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "north"
  },
  {
    "id": "510",
    "zOrder": 318,
    "sourceX": 3748.0,
    "sourceY": 792.0,
    "targetX": 3930.0,
    "targetY": 793.0,
    "strokeColor": "#0000ff",
    "strokeWidth": 4.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "STM4 OPGW PTC1",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "STM4",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "OPGW PTC1",
            "color": "#000000",
            "fontSize": 12.7,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.31,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "north"
  },
  {
    "id": "512",
    "zOrder": 320,
    "sourceX": 3986.0,
    "sourceY": 793.0,
    "targetX": 4183.0,
    "targetY": 792.0,
    "strokeColor": "#ff00ff",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "STM4 OPGW VIETTEL",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "STM4",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": false,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "OPGW VIETTEL",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 359.68,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-viettel",
    "region": "north"
  },
  {
    "id": "514",
    "zOrder": 337,
    "sourceX": 2357.0,
    "sourceY": 2949.0,
    "targetX": 2357.0,
    "targetY": 3140.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE – OPGW PTC4",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE – OPGW PTC4",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "south"
  },
  {
    "id": "516",
    "zOrder": 339,
    "sourceX": 1075.0,
    "sourceY": 1517.0,
    "targetX": 1074.0,
    "targetY": 1540.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 270.5,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "north-central"
  },
  {
    "id": "518",
    "zOrder": 341,
    "sourceX": 3637.0,
    "sourceY": 825.0,
    "targetX": 3691.0,
    "targetY": 805.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "FE",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "FE",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 339.86,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "north"
  },
  {
    "id": "520",
    "zOrder": 343,
    "sourceX": 3638.0,
    "sourceY": 758.0,
    "targetX": 3689.0,
    "targetY": 782.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "FE",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "FE",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 25.67,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "north"
  },
  {
    "id": "522",
    "zOrder": 345,
    "sourceX": 2655.0,
    "sourceY": 388.0,
    "targetX": 2655.0,
    "targetY": 436.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE-O",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE-O",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.0,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "north"
  },
  {
    "id": "524",
    "zOrder": 347,
    "sourceX": 2656.0,
    "sourceY": 570.0,
    "targetX": 2656.0,
    "targetY": 523.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE-0",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE-0",
            "color": "#ea700d",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.81,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "north"
  },
  {
    "id": "526",
    "zOrder": 349,
    "sourceX": 2699.0,
    "sourceY": 505.0,
    "targetX": 2832.0,
    "targetY": 473.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 346.25,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "north"
  },
  {
    "id": "528",
    "zOrder": 351,
    "sourceX": 2690.0,
    "sourceY": 792.0,
    "targetX": 2834.0,
    "targetY": 517.0,
    "strokeColor": "#00b050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "OTU2 - EVNICT",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTU2 - EVNICT",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 297.62,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "north"
  },
  {
    "id": "530",
    "zOrder": 355,
    "sourceX": 2346.0,
    "sourceY": 839.0,
    "targetX": 2537.0,
    "targetY": 839.0,
    "strokeColor": "#00b050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "OTU2 - EVNICT",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTU2 - EVNICT",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 359.94,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "north"
  },
  {
    "id": "532",
    "zOrder": 358,
    "sourceX": 2266.0,
    "sourceY": 354.0,
    "targetX": 2498.0,
    "targetY": 354.0,
    "strokeColor": "#ff00ff",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 0.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-viettel",
    "region": "north"
  },
  {
    "id": "534",
    "zOrder": 364,
    "sourceX": 3537.0,
    "sourceY": 3179.0,
    "targetX": 3822.0,
    "targetY": 3179.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical – GENCO2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical – GENCO2",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.57,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south"
  },
  {
    "id": "536",
    "zOrder": 366,
    "sourceX": 3538.0,
    "sourceY": 3237.0,
    "targetX": 3823.0,
    "targetY": 3237.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical – GENCO2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical – GENCO2",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.57,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south"
  },
  {
    "id": "538",
    "zOrder": 368,
    "sourceX": 3530.0,
    "sourceY": 3102.0,
    "targetX": 3952.0,
    "targetY": 3102.0,
    "strokeColor": "#00b050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "EVNICT",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "EVNICT",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.57,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "south"
  },
  {
    "id": "540",
    "zOrder": 370,
    "sourceX": 3998.0,
    "sourceY": 3207.0,
    "targetX": 3998.0,
    "targetY": 3136.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 270.0,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "south"
  },
  {
    "id": "542",
    "zOrder": 372,
    "sourceX": 3984.0,
    "sourceY": 3150.0,
    "targetX": 3984.0,
    "targetY": 3136.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 270.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south"
  },
  {
    "id": "544",
    "zOrder": 374,
    "sourceX": 3877.0,
    "sourceY": 3260.0,
    "targetX": 3877.0,
    "targetY": 3561.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical – GENCO2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical – GENCO2",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south"
  },
  {
    "id": "546",
    "zOrder": 395,
    "sourceX": 4432.0,
    "sourceY": 2708.0,
    "targetX": 4430.0,
    "targetY": 2486.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "OTU2-OGPW",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTU2-OGPW",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 269.36,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south-central"
  },
  {
    "id": "548",
    "zOrder": 397,
    "sourceX": 4473.0,
    "sourceY": 2459.0,
    "targetX": 4718.0,
    "targetY": 2459.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE - ADSS GENCO2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE - ADSS GENCO2",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south-central"
  },
  {
    "id": "550",
    "zOrder": 399,
    "sourceX": 4467.0,
    "sourceY": 2717.0,
    "targetX": 4560.0,
    "targetY": 2698.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 348.37,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south-central"
  },
  {
    "id": "552",
    "zOrder": 401,
    "sourceX": 4463.0,
    "sourceY": 2745.0,
    "targetX": 4561.0,
    "targetY": 2766.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "2xGE Electric",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "2xGE Electric",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 12.05,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "south-central"
  },
  {
    "id": "554",
    "zOrder": 403,
    "sourceX": 4000.0,
    "sourceY": 2283.0,
    "targetX": 4000.0,
    "targetY": 2540.0,
    "strokeColor": "#ee0000",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 270.05,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-cpc",
    "region": "south-central"
  },
  {
    "id": "556",
    "zOrder": 410,
    "sourceX": 3587.0,
    "sourceY": 2573.0,
    "targetX": 3794.0,
    "targetY": 2573.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical - ADSS – CPC",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical ",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          },
          {
            "text": "- ADSS – CPC",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.57,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south-central"
  },
  {
    "id": "558",
    "zOrder": 416,
    "sourceX": 4430.0,
    "sourceY": 2432.0,
    "targetX": 4430.0,
    "targetY": 2371.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "2xGE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "2xGE Optical",
            "color": "#002060",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south-central"
  },
  {
    "id": "560",
    "zOrder": 418,
    "sourceX": 4026.0,
    "sourceY": 2102.0,
    "targetX": 4398.0,
    "targetY": 2344.0,
    "strokeColor": "#00b050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": true,
    "endArrow": false,
    "labelPlainText": "EVNICT",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "EVNICT",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 66.7,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "south-central"
  },
  {
    "id": "562",
    "zOrder": 420,
    "sourceX": 3403.0,
    "sourceY": 2575.0,
    "targetX": 3493.0,
    "targetY": 2574.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Electric",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Electric",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 358.99,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "central"
  },
  {
    "id": "564",
    "zOrder": 424,
    "sourceX": 2702.0,
    "sourceY": 454.0,
    "targetX": 2830.0,
    "targetY": 454.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "north"
  },
  {
    "id": "565",
    "zOrder": 429,
    "sourceX": 3497.0,
    "sourceY": 803.0,
    "targetX": 3556.0,
    "targetY": 827.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE-0",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE-0",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 23.11,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "north"
  },
  {
    "id": "567",
    "zOrder": 434,
    "sourceX": 2207.0,
    "sourceY": 838.0,
    "targetX": 2272.0,
    "targetY": 838.0,
    "strokeColor": "#92d050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "OTU-2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTU-2",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "north"
  },
  {
    "id": "569",
    "zOrder": 437,
    "sourceX": 2609.0,
    "sourceY": 839.0,
    "targetX": 2661.0,
    "targetY": 838.0,
    "strokeColor": "#92d050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "OTU-2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTU-2",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 359.78,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "north"
  },
  {
    "id": "571",
    "zOrder": 442,
    "sourceX": 1613.0,
    "sourceY": 1001.0,
    "targetX": 1540.0,
    "targetY": 1001.0,
    "strokeColor": "#00b0f0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 359.69,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "north"
  },
  {
    "id": "573",
    "zOrder": 444,
    "sourceX": 1671.0,
    "sourceY": 1007.0,
    "targetX": 2696.0,
    "targetY": 1227.0,
    "strokeColor": "#00b0f0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "HH – OPGW PTC1",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "HH – OPGW PTC1",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 12.1,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "north"
  },
  {
    "id": "575",
    "zOrder": 446,
    "sourceX": 2179.0,
    "sourceY": 971.0,
    "targetX": 2179.0,
    "targetY": 885.0,
    "strokeColor": "#ee0000",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "STM-4",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "STM-4",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-cpc",
    "region": "north"
  },
  {
    "id": "577",
    "zOrder": 448,
    "sourceX": 1639.0,
    "sourceY": 971.0,
    "targetX": 1639.0,
    "targetY": 884.0,
    "strokeColor": "#ee0000",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "STM-4",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "STM-4",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-cpc",
    "region": "north"
  },
  {
    "id": "579",
    "zOrder": 461,
    "sourceX": 3990.0,
    "sourceY": 789.0,
    "targetX": 4062.0,
    "targetY": 727.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 0.0,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-npt",
    "region": "north"
  },
  {
    "id": "580",
    "zOrder": 463,
    "sourceX": 4180.0,
    "sourceY": 787.0,
    "targetX": 4125.0,
    "targetY": 727.0,
    "strokeColor": "#000000",
    "strokeWidth": 1.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 0.0,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-npt",
    "region": "north"
  },
  {
    "id": "581",
    "zOrder": 468,
    "sourceX": 3542.0,
    "sourceY": 2670.0,
    "targetX": 3542.0,
    "targetY": 2594.0,
    "strokeColor": "#7030a0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "STM-1",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "STM-1",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.57,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-viettel",
    "region": "south-central"
  },
  {
    "id": "583",
    "zOrder": 470,
    "sourceX": 3441.0,
    "sourceY": 2697.0,
    "targetX": 3519.0,
    "targetY": 2697.0,
    "strokeColor": "#00b0f0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "4xE1",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "4xE1",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.57,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "south-central"
  },
  {
    "id": "585",
    "zOrder": 472,
    "sourceX": 3441.0,
    "sourceY": 2711.0,
    "targetX": 3520.0,
    "targetY": 2711.0,
    "strokeColor": "#00b0f0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "4xE1",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "4xE1",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.57,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "south-central"
  },
  {
    "id": "587",
    "zOrder": 477,
    "sourceX": 3866.0,
    "sourceY": 2668.0,
    "targetX": 3866.0,
    "targetY": 2589.0,
    "strokeColor": "#7030a0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "STM-1",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "STM-1",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.57,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-viettel",
    "region": "south-central"
  },
  {
    "id": "589",
    "zOrder": 480,
    "sourceX": 1059.0,
    "sourceY": 1518.0,
    "targetX": 1059.0,
    "targetY": 1546.0,
    "strokeColor": "#92d050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 0.57,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "north-central"
  },
  {
    "id": "591",
    "zOrder": 483,
    "sourceX": 4269.0,
    "sourceY": 395.0,
    "targetX": 4240.0,
    "targetY": 395.0,
    "strokeColor": "#92d050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 0.57,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "north"
  },
  {
    "id": "593",
    "zOrder": 485,
    "sourceX": 3889.0,
    "sourceY": 2572.0,
    "targetX": 3962.0,
    "targetY": 2571.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "FE",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "FE",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 359.34,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "south-central"
  },
  {
    "id": "595",
    "zOrder": 487,
    "sourceX": 3883.0,
    "sourceY": 2165.0,
    "targetX": 3949.0,
    "targetY": 2118.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 324.49,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south-central"
  },
  {
    "id": "597",
    "zOrder": 490,
    "sourceX": 3880.0,
    "sourceY": 2205.0,
    "targetX": 3963.0,
    "targetY": 2256.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "FE",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "FE",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 31.82,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south-central"
  },
  {
    "id": "599",
    "zOrder": 492,
    "sourceX": 3887.0,
    "sourceY": 2674.0,
    "targetX": 3973.0,
    "targetY": 2593.0,
    "strokeColor": "#00b0f0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "8xE1",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "8xE1",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 273.85,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "south-central"
  },
  {
    "id": "601",
    "zOrder": 497,
    "sourceX": 1868.0,
    "sourceY": 2699.0,
    "targetX": 2343.0,
    "targetY": 2513.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "STM-1 – OPGW PTC2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "STM-1 – OPGW PTC2",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 338.66,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "central"
  },
  {
    "id": "603",
    "zOrder": 501,
    "sourceX": 501.0,
    "sourceY": 3559.0,
    "targetX": 859.0,
    "targetY": 3558.0,
    "strokeColor": "#ff00ff",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "VIETTEL",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "VIETTEL",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 359.95,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-legend",
    "region": "legend"
  },
  {
    "id": "605",
    "zOrder": 507,
    "sourceX": 3004.0,
    "sourceY": 1857.0,
    "targetX": 3124.0,
    "targetY": 1942.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "nxGE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "nxGE Optical",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 35.02,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "central"
  },
  {
    "id": "607",
    "zOrder": 509,
    "sourceX": 3002.0,
    "sourceY": 1800.0,
    "targetX": 3114.0,
    "targetY": 1728.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "nxGE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "nx",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          },
          {
            "text": "GE Optical",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 327.23,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "central"
  },
  {
    "id": "609",
    "zOrder": 520,
    "sourceX": 1626.0,
    "sourceY": 2676.0,
    "targetX": 1626.0,
    "targetY": 2593.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Electric",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Electric",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.0,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "south"
  },
  {
    "id": "611",
    "zOrder": 522,
    "sourceX": 2955.0,
    "sourceY": 1954.0,
    "targetX": 3124.0,
    "targetY": 1954.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE/FE Electric",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE/FE Electric",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "central"
  },
  {
    "id": "613",
    "zOrder": 529,
    "sourceX": 2738.0,
    "sourceY": 3412.0,
    "targetX": 2738.0,
    "targetY": 3589.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE/FE Electric",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE/FE Electric",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.0,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "south"
  },
  {
    "id": "615",
    "zOrder": 532,
    "sourceX": 2225.0,
    "sourceY": 2492.0,
    "targetX": 2341.0,
    "targetY": 2492.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "FE Electric",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "FE Electric",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "central"
  },
  {
    "id": "617",
    "zOrder": 534,
    "sourceX": 2413.0,
    "sourceY": 3167.0,
    "targetX": 2492.0,
    "targetY": 3166.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "FE Electric",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "FE Electric",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 359.44,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "south"
  },
  {
    "id": "619",
    "zOrder": 560,
    "sourceX": 1418.0,
    "sourceY": 975.0,
    "targetX": 1418.0,
    "targetY": 909.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.0,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "north"
  },
  {
    "id": "621",
    "zOrder": 563,
    "sourceX": 1247.0,
    "sourceY": 2308.0,
    "targetX": 1333.0,
    "targetY": 2249.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "FE Electric",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "FE Electric",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 325.7,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "north-central"
  },
  {
    "id": "623",
    "zOrder": 565,
    "sourceX": 1382.0,
    "sourceY": 1714.0,
    "targetX": 1382.0,
    "targetY": 1936.0,
    "strokeColor": "#ee0000",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 270.05,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-cpc",
    "region": "north-central"
  },
  {
    "id": "625",
    "zOrder": 578,
    "sourceX": 3666.0,
    "sourceY": 3582.0,
    "targetX": 3861.0,
    "targetY": 3261.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical - GENCO2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical",
            "color": "#ff0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          },
          {
            "text": " - GENCO2",
            "color": "#ff0000",
            "fontSize": 16.93,
            "fontFamily": "Themed",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 301.4,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south"
  },
  {
    "id": "627",
    "zOrder": 580,
    "sourceX": 1540.0,
    "sourceY": 1689.0,
    "targetX": 1810.0,
    "targetY": 1689.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GENCO2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GENCO2",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "north-central"
  },
  {
    "id": "629",
    "zOrder": 582,
    "sourceX": 1376.0,
    "sourceY": 2184.0,
    "targetX": 1376.0,
    "targetY": 2013.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GENCO2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GENCO2",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "north-central"
  },
  {
    "id": "631",
    "zOrder": 585,
    "sourceX": 1419.0,
    "sourceY": 1689.0,
    "targetX": 1466.0,
    "targetY": 1689.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 0.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "north-central"
  },
  {
    "id": "633",
    "zOrder": 588,
    "sourceX": 2313.0,
    "sourceY": 1791.0,
    "targetX": 2706.0,
    "targetY": 2164.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "STM -1/4 – Hiện hữu",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "STM -1/4 – Hiện hữu",
            "color": "#000000",
            "fontSize": 25.4,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 43.55,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "central"
  },
  {
    "id": "635",
    "zOrder": 596,
    "sourceX": 4007.0,
    "sourceY": 2038.0,
    "targetX": 4484.0,
    "targetY": 2038.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical - ADSS GENCO2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical - ADSS GENCO2",
            "color": "#7030a0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south-central"
  },
  {
    "id": "637",
    "zOrder": 605,
    "sourceX": 4516.0,
    "sourceY": 1691.0,
    "targetX": 4567.0,
    "targetY": 1691.0,
    "strokeColor": "#92d050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 0.57,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "south-central"
  },
  {
    "id": "639",
    "zOrder": 607,
    "sourceX": 4627.0,
    "sourceY": 1689.0,
    "targetX": 4702.0,
    "targetY": 1641.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "GE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "GE Optical",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 327.6,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south-central"
  },
  {
    "id": "641",
    "zOrder": 609,
    "sourceX": 4625.0,
    "sourceY": 1699.0,
    "targetX": 4706.0,
    "targetY": 1764.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "2xGE Electric",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "2xGE Electric",
            "color": "#0070c0",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 38.97,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "south-central"
  },
  {
    "id": "643",
    "zOrder": 612,
    "sourceX": 4151.0,
    "sourceY": 1689.0,
    "targetX": 4443.0,
    "targetY": 1689.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "OTU2-OGPW - PTC3",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTU2-OGPW - PTC3",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south-central"
  },
  {
    "id": "645",
    "zOrder": 616,
    "sourceX": 4023.0,
    "sourceY": 1958.0,
    "targetX": 4072.0,
    "targetY": 1958.0,
    "strokeColor": "#92d050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 0.57,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "south-central"
  },
  {
    "id": "647",
    "zOrder": 620,
    "sourceX": 3855.0,
    "sourceY": 1956.0,
    "targetX": 3937.0,
    "targetY": 1956.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "STM1",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "STM1",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south-central"
  },
  {
    "id": "649",
    "zOrder": 622,
    "sourceX": 3985.0,
    "sourceY": 2052.0,
    "targetX": 3985.0,
    "targetY": 1979.0,
    "strokeColor": "#92d050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "2xGE Optical",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "2xGE Optical",
            "color": "#002060",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.93,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "south-central"
  },
  {
    "id": "651",
    "zOrder": 624,
    "sourceX": 4112.0,
    "sourceY": 1919.0,
    "targetX": 4112.0,
    "targetY": 1724.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "OTU2-OGPW - PTC3",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTU2-OGPW - PTC3",
            "color": "#000000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south-central"
  },
  {
    "id": "653",
    "zOrder": 629,
    "sourceX": 4008.0,
    "sourceY": 2037.0,
    "targetX": 4008.0,
    "targetY": 1981.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 270.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "south-central"
  },
  {
    "id": "655",
    "zOrder": 634,
    "sourceX": 1052.0,
    "sourceY": 2029.0,
    "targetX": 1052.0,
    "targetY": 2130.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "OTU2 – GENCO2",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTU2 – GENCO2",
            "color": "#ee0000",
            "fontSize": 14.11,
            "fontFamily": "Calibri",
            "bold": true,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 270.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "north-central"
  },
  {
    "id": "657",
    "zOrder": 638,
    "sourceX": 3992.0,
    "sourceY": 393.0,
    "targetX": 4166.0,
    "targetY": 393.0,
    "strokeColor": "#ff00ff",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "OTU2 OPGW PTC1",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTU2",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": false,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "OPGW PTC1",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-viettel",
    "region": "north"
  },
  {
    "id": "658",
    "zOrder": 646,
    "sourceX": 3387.0,
    "sourceY": 400.0,
    "targetX": 3597.0,
    "targetY": 400.0,
    "strokeColor": "#ff00ff",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "OTU2 OPGW PTC1",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTU2",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": false,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "OPGW PTC1",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-viettel",
    "region": "north"
  },
  {
    "id": "659",
    "zOrder": 648,
    "sourceX": 3338.0,
    "sourceY": 416.0,
    "targetX": 3226.0,
    "targetY": 626.0,
    "strokeColor": "#00b050",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "OTU2-EVNICT",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTU2-EVNICT",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 56.13,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-evnict",
    "region": "north"
  },
  {
    "id": "661",
    "zOrder": 653,
    "sourceX": 3706.0,
    "sourceY": 393.0,
    "targetX": 3882.0,
    "targetY": 393.0,
    "strokeColor": "#ff00ff",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "OTU2 OPGW PTC1",
    "labelLines": [
      {
        "align": "center",
        "runs": [
          {
            "text": "OTU2",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": false,
            "underline": false
          }
        ]
      },
      {
        "align": "center",
        "runs": [
          {
            "text": "OPGW PTC1",
            "color": "#000000",
            "fontSize": 16.93,
            "fontFamily": "Times New Roman",
            "bold": false,
            "underline": false
          }
        ]
      }
    ],
    "labelRotation": 0.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-viettel",
    "region": "north"
  },
  {
    "id": "662",
    "zOrder": 656,
    "sourceX": 2250.0,
    "sourceY": 2317.0,
    "targetX": 2250.0,
    "targetY": 2283.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 270.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "central"
  },
  {
    "id": "664",
    "zOrder": 658,
    "sourceX": 2277.0,
    "sourceY": 2315.0,
    "targetX": 2277.0,
    "targetY": 2282.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 270.0,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "central"
  },
  {
    "id": "666",
    "zOrder": 663,
    "sourceX": 2272.0,
    "sourceY": 1880.0,
    "targetX": 2272.0,
    "targetY": 1832.0,
    "strokeColor": "#0070c0",
    "strokeWidth": 3.0,
    "dashed": false,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 270.0,
    "labelBgColor": "#FFFFFF",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-ptc",
    "region": "central"
  },
  {
    "id": "668",
    "zOrder": 667,
    "sourceX": 2819.0,
    "sourceY": 2151.0,
    "targetX": 2938.0,
    "targetY": 2230.0,
    "strokeColor": "#ea700d",
    "strokeWidth": 3.0,
    "dashed": true,
    "startArrow": false,
    "endArrow": false,
    "labelPlainText": "",
    "labelLines": [],
    "labelRotation": 33.83,
    "labelBgColor": "#ffffff",
    "labelOffsetX": 0.0,
    "labelOffsetY": 0.0,
    "category": "cable-genco2",
    "region": "central"
  }
];
