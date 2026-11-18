import zipfile
import os

def create_xlsx(filepath, headers, rows):
    content_types = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>"""

    rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>"""

    wb_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>"""

    workbook = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="TrienKhaiThucTe" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>"""

    styles = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="2">
    <font><name val="Arial"/><sz val="11"/></font>
    <font><b/><name val="Arial"/><sz val="11"/><color rgb="FFFFFFFF"/></font>
  </fonts>
  <fills count="3">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF29348F"/></patternFill></fill>
  </fills>
  <borders count="1"><border><left/><right/><top/><bottom/></border></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="2">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/>
  </cellXfs>
</styleSheet>"""

    def col_letter(col_idx):
        return chr(ord("A") + col_idx)

    sheet_xml = ['<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
                 '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">',
                 '  <sheetData>']

    # Header row
    sheet_xml.append('    <row r="1">')
    for col_idx, h in enumerate(headers):
        ref = f"{col_letter(col_idx)}1"
        sheet_xml.append(f'      <c r="{ref}" t="inlineStr" s="1"><is><t>{h}</t></is></c>')
    sheet_xml.append('    </row>')

    # Data rows
    for r_idx, row in enumerate(rows, start=2):
        sheet_xml.append(f'    <row r="{r_idx}">')
        for col_idx, val in enumerate(row):
            ref = f"{col_letter(col_idx)}{r_idx}"
            val_escaped = str(val).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
            sheet_xml.append(f'      <c r="{ref}" t="inlineStr"><is><t>{val_escaped}</t></is></c>')
        sheet_xml.append('    </row>')

    sheet_xml.append('  </sheetData>')
    sheet_xml.append('</worksheet>')

    os.makedirs(os.path.dirname(os.path.abspath(filepath)), exist_ok=True)
    with zipfile.ZipFile(filepath, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("[Content_Types].xml", content_types)
        zf.writestr("_rels/.rels", rels)
        zf.writestr("xl/_rels/workbook.xml.rels", wb_rels)
        zf.writestr("xl/workbook.xml", workbook)
        zf.writestr("xl/styles.xml", styles)
        zf.writestr("xl/worksheets/sheet1.xml", "\n".join(sheet_xml))

if __name__ == "__main__":
    headers = ["time", "content", "status"]
    rows = [
        ["2026-11-18 17:30", "Hoàn thành kiểm tra sơ đồ mạng truyền dẫn WAN EVNGENCO2 và đồng bộ giao diện", "Hoàn thành"],
        ["2026-11-18 14:00", "Lắp đặt thiết bị MPLS-TP OT/IT tại các trạm miền Bắc và Trung Sơn", "Đang thực hiện"],
        ["2026-11-17 09:00", "Khảo sát hiện trường và đo kiểm suy hao tuyến cáp quang liên kết Thác Mơ", "Đang thực hiện"],
        ["2026-11-16 16:30", "Kiểm tra cấu hình cổng quang kết nối SDH/OTN Trung tâm điều hành A2", "Hoàn thành"],
        ["2026-11-15 08:30", "Khởi động dự án nâng cấp tuyến truyền dẫn WAN Cụm Quảng Trị", "Hoàn thành"],
    ]

    create_xlsx("baocao.xlsx", headers, rows)
    create_xlsx("assets/baocao.xlsx", headers, rows)
    create_xlsx("dist/baocao.xlsx", headers, rows)
    print("Created baocao.xlsx successfully!")

