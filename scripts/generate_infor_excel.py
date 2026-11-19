import zipfile
import os
import sys
import json

def get_col_letter(col_idx):
    res = ""
    col_idx += 1
    while col_idx > 0:
        col_idx, remainder = divmod(col_idx - 1, 26)
        res = chr(65 + remainder) + res
    return res

def create_multi_sheet_xlsx(filepath, sheets_data):
    """
    sheets_data = [
        {"name": "TatCaPhanTu", "headers": [...], "rows": [[...], ...], "widths": [...]},
        ...
    ]
    """
    sheet_count = len(sheets_data)

    content_types_entries = [
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>',
        '<Default Extension="xml" ContentType="application/xml"/>',
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>',
        '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>',
    ]
    for i in range(1, sheet_count + 1):
        content_types_entries.append(
            f'<Override PartName="/xl/worksheets/sheet{i}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        )
    content_types = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">\n  ' + '\n  '.join(content_types_entries) + '\n</Types>'

    rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>"""

    wb_rel_entries = []
    for i in range(1, sheet_count + 1):
        wb_rel_entries.append(
            f'<Relationship Id="rId{i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet{i}.xml"/>'
        )
    wb_rel_entries.append(
        f'<Relationship Id="rId{sheet_count + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'
    )
    wb_rels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n  ' + '\n  '.join(wb_rel_entries) + '\n</Relationships>'

    sheets_entries = []
    for i, s in enumerate(sheets_data, start=1):
        sheets_entries.append(
            f'<sheet name="{s["name"]}" sheetId="{i}" r:id="rId{i}"/>'
        )
    workbook = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">\n  <sheets>\n    ' + '\n    '.join(sheets_entries) + '\n  </sheets>\n</workbook>'

    styles = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="3">
    <font><name val="Segoe UI"/><sz val="10"/></font>
    <font><b/><name val="Segoe UI"/><sz val="10.5"/><color rgb="FFFFFFFF"/></font>
    <font><b/><name val="Segoe UI"/><sz val="10"/><color rgb="FF0F172A"/></font>
  </fonts>
  <fills count="4">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF1E3A8A"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFF8FAFC"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/></border>
    <border>
      <left style="thin"><color rgb="FFCBD5E1"/></left>
      <right style="thin"><color rgb="FFCBD5E1"/></right>
      <top style="thin"><color rgb="FFCBD5E1"/></top>
      <bottom style="thin"><color rgb="FFCBD5E1"/></bottom>
    </border>
  </borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="4">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"/>
    <xf numFmtId="0" fontId="0" fillId="3" borderId="1" xfId="0" applyBorder="1" applyFill="1"/>
    <xf numFmtId="0" fontId="2" fillId="0" borderId="1" xfId="0" applyFont="1" applyBorder="1"/>
  </cellXfs>
</styleSheet>"""

    sheet_xml_list = []
    for s_idx, s in enumerate(sheets_data, start=1):
        headers = s["headers"]
        rows = s["rows"]
        widths = s.get("widths", [])

        sheet_xml = ['<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
                     '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">']

        if widths:
            sheet_xml.append('  <cols>')
            for col_i, w in enumerate(widths, start=1):
                sheet_xml.append(f'    <col min="{col_i}" max="{col_i}" width="{w}" customWidth="1"/>')
            sheet_xml.append('  </cols>')

        sheet_xml.append('  <sheetData>')

        # Header row (s="1" is blue header, white bold text)
        sheet_xml.append('    <row r="1" ht="28" customHeight="1">')
        for col_idx, h in enumerate(headers):
            ref = f"{get_col_letter(col_idx)}1"
            h_esc = str(h).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
            sheet_xml.append(f'      <c r="{ref}" t="inlineStr" s="1"><is><t>{h_esc}</t></is></c>')
        sheet_xml.append('    </row>')

        # Data rows
        for r_idx, row in enumerate(rows, start=2):
            style_idx = 2 if r_idx % 2 == 1 else 0
            sheet_xml.append(f'    <row r="{r_idx}" ht="20" customHeight="1">')
            for col_idx, val in enumerate(row):
                ref = f"{get_col_letter(col_idx)}{r_idx}"
                val_escaped = str(val if val is not None else "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
                sheet_xml.append(f'      <c r="{ref}" t="inlineStr" s="{style_idx}"><is><t>{val_escaped}</t></is></c>')
            sheet_xml.append('    </row>')

        sheet_xml.append('  </sheetData>')
        sheet_xml.append('</worksheet>')
        sheet_xml_list.append("\n".join(sheet_xml))

    os.makedirs(os.path.dirname(os.path.abspath(filepath)), exist_ok=True)
    with zipfile.ZipFile(filepath, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("[Content_Types].xml", content_types)
        zf.writestr("_rels/.rels", rels)
        zf.writestr("xl/_rels/workbook.xml.rels", wb_rels)
        zf.writestr("xl/workbook.xml", workbook)
        zf.writestr("xl/styles.xml", styles)
        for i, s_xml in enumerate(sheet_xml_list, start=1):
            zf.writestr(f"xl/worksheets/sheet{i}.xml", s_xml)

if __name__ == "__main__":
    json_path = "/tmp/infor_data.json"
    if not os.path.exists(json_path):
        print(f"Error: {json_path} does not exist", file=sys.stderr)
        sys.exit(1)

    with open(json_path, "r", encoding="utf-8") as f:
        all_items = json.load(f)

    headers = [
        "STT",
        "ID_PhanTu",
        "Loai_PhanTu",
        "TieuDe_KhungThongTin",
        "DongPhu_KhungThongTin",
        "Ma_PhanLoai",
        "Ten_PhanLoai",
        "Ma_KhuVuc",
        "Ten_KhuVuc",
        "Tram_TrucThuoc",
        "ToaDo_X1",
        "ToaDo_Y1",
        "ToaDo_X2_Hoac_Rong",
        "ToaDo_Y2_Hoac_Cao",
        "Mau_Vien_Hoac_MauCap",
        "DoDay_Net",
        "Mau_Nen",
        "Kieu_Net",
        "HinhDang",
        "Co_KhungThongTin",
        "GhiChu_QuanTri"
    ]

    widths = [
        6,   # STT
        12,  # ID_PhanTu
        22,  # Loai_PhanTu
        28,  # TieuDe_KhungThongTin
        42,  # DongPhu_KhungThongTin
        16,  # Ma_PhanLoai
        36,  # Ten_PhanLoai
        14,  # Ma_KhuVuc
        28,  # Ten_KhuVuc
        30,  # Tram_TrucThuoc
        12,  # ToaDo_X1
        12,  # ToaDo_Y1
        16,  # ToaDo_X2_Hoac_Rong
        16,  # ToaDo_Y2_Hoac_Cao
        18,  # Mau_Vien_Hoac_MauCap
        12,  # DoDay_Net
        14,  # Mau_Nen
        18,  # Kieu_Net
        20,  # HinhDang
        16,  # Co_KhungThongTin
        25   # GhiChu_QuanTri
    ]

    def item_to_row(item, idx):
        return [
            idx,
            item["id"],
            item["type"],
            item["title"],
            item["subtitle"],
            item["categoryCode"],
            item["categoryName"],
            item["regionCode"],
            item["regionName"],
            item["station"],
            item["x1"],
            item["y1"],
            item["x2_or_w"],
            item["y2_or_h"],
            item["strokeColor"],
            item["strokeWidth"],
            item["fillColor"],
            item["lineStyle"],
            item["shape"],
            item["hasTooltip"],
            item["notes"]
        ]

    rows_all = [item_to_row(it, i) for i, it in enumerate(all_items, start=1)]
    
    vertices_items = [it for it in all_items if it["type"].startswith("Thiết bị")]
    rows_vertices = [item_to_row(it, i) for i, it in enumerate(vertices_items, start=1)]
    
    edges_items = [it for it in all_items if it["type"].startswith("Tuyến cáp")]
    rows_edges = [item_to_row(it, i) for i, it in enumerate(edges_items, start=1)]

    sheets = [
        {
            "name": "TatCaPhanTu",
            "headers": headers,
            "rows": rows_all,
            "widths": widths
        },
        {
            "name": "ThietBi_Nut",
            "headers": headers,
            "rows": rows_vertices,
            "widths": widths
        },
        {
            "name": "TuyenCap_KetNoi",
            "headers": headers,
            "rows": rows_edges,
            "widths": widths
        }
    ]

    output_files = [
        "infor.xlsx",
        "dist/infor.xlsx",
        "assets/infor.xlsx",
        "dist/assets/infor.xlsx"
    ]

    for out in output_files:
        create_multi_sheet_xlsx(out, sheets)
        print(f"Created {out} successfully ({len(rows_all)} rows, 3 sheets)!")
