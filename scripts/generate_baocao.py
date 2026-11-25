import zipfile
import os
import sys
import json

def create_multi_sheet_xlsx(filepath, sheets_data):
    """
    Tạo file .xlsx đa sheet chuẩn OpenXML.
    sheets_data: list các dict:
      [
        {
          "name": "ge2pmb",
          "headers": ["time", "content", "status"],
          "rows": [["11/6/2026", "...", "Hoàn thành"], ...]
        },
        ...
      ]
    """
    content_types_entries = [
        """  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>""",
        """  <Default Extension="xml" ContentType="application/xml"/>""",
        """  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>""",
        """  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>"""
    ]
    wb_rels_entries = []
    wb_sheets_entries = []

    for idx, s in enumerate(sheets_data, start=1):
        content_types_entries.append(
            f"""  <Override PartName="/xl/worksheets/sheet{idx}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>"""
        )
        wb_rels_entries.append(
            f"""  <Relationship Id="rId{idx}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet{idx}.xml"/>"""
        )
        wb_sheets_entries.append(
            f"""    <sheet name="{s['name']}" sheetId="{idx}" r:id="rId{idx}"/>"""
        )

    styles_rid = len(sheets_data) + 1
    wb_rels_entries.append(
        f"""  <Relationship Id="rId{styles_rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>"""
    )

    content_types = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">\n'
        + '\n'.join(content_types_entries)
        + '\n</Types>'
    )

    rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>"""

    wb_rels = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n'
        + '\n'.join(wb_rels_entries)
        + '\n</Relationships>'
    )

    workbook = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">\n'
        '  <sheets>\n'
        + '\n'.join(wb_sheets_entries)
        + '\n  </sheets>\n</workbook>'
    )

    styles = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="2">
    <font><name val="Arial"/><sz val="11"/></font>
    <font><b/><name val="Arial"/><sz val="11"/><color rgb="FFFFFFFF"/></font>
  </fonts>
  <fills count="3">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF1E3A8A"/></fgColor></fill>
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
  <cellXfs count="3">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1">
      <alignment horizontal="center" vertical="center"/>
    </xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1">
      <alignment vertical="center"/>
    </xf>
  </cellXfs>
</styleSheet>"""

    def col_letter(col_idx):
        return chr(ord('A') + col_idx)

    sheets_xml = []
    for s in sheets_data:
        headers = s.get('headers', ['time', 'content', 'status'])
        rows = s.get('rows', [])
        sheet_xml = [
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
            '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">',
            '  <cols>',
            '    <col min="1" max="1" width="22" customWidth="1"/>',
            '    <col min="2" max="2" width="65" customWidth="1"/>',
            '    <col min="3" max="3" width="18" customWidth="1"/>',
            '  </cols>',
            '  <sheetData>',
            '    <row r="1" ht="26" customHeight="1">',
        ]
        for col_idx, h in enumerate(headers):
            ref = f'{col_letter(col_idx)}1'
            sheet_xml.append(f'      <c r="{ref}" t="inlineStr" s="1"><is><t>{h}</t></is></c>')
        sheet_xml.append('    </row>')

        for r_idx, row in enumerate(rows, start=2):
            sheet_xml.append(f'    <row r="{r_idx}" ht="22" customHeight="1">')
            for col_idx, val in enumerate(row):
                ref = f'{col_letter(col_idx)}{r_idx}'
                val_escaped = (
                    str(val if val is not None else '')
                    .replace('&', '&amp;')
                    .replace('<', '&lt;')
                    .replace('>', '&gt;')
                )
                sheet_xml.append(f'      <c r="{ref}" t="inlineStr" s="2"><is><t>{val_escaped}</t></is></c>')
            sheet_xml.append('    </row>')

        sheet_xml.append('  </sheetData>')
        sheet_xml.append('</worksheet>')
        sheets_xml.append('\n'.join(sheet_xml))

    os.makedirs(os.path.dirname(os.path.abspath(filepath)), exist_ok=True)
    with zipfile.ZipFile(filepath, 'w', zipfile.ZIP_DEFLATED) as zf:
        zf.writestr('[Content_Types].xml', content_types)
        zf.writestr('_rels/.rels', rels)
        zf.writestr('xl/_rels/workbook.xml.rels', wb_rels)
        zf.writestr('xl/workbook.xml', workbook)
        zf.writestr('xl/styles.xml', styles)
        for idx, s_xml in enumerate(sheets_xml, start=1):
            zf.writestr(f'xl/worksheets/sheet{idx}.xml', s_xml)


if __name__ == '__main__':
    headers = ['time', 'content', 'status']
    rows = []

    if len(sys.argv) > 1 and sys.argv[1] == '--json':
        raw = sys.argv[2] if len(sys.argv) > 2 else sys.stdin.read()
        try:
            items = json.loads(raw)
            if isinstance(items, list):
                rows = [[item.get('time', ''), item.get('content', ''), item.get('status', '')] for item in items]
        except Exception as e:
            print(f'Error parsing JSON: {e}', file=sys.stderr)
            sys.exit(1)
    else:
        # Đọc dữ liệu từ data/baocao.json nếu có
        try:
            with open('data/baocao.json', 'r', encoding='utf-8') as f:
                items = json.load(f)
                if isinstance(items, list):
                    rows = [[item.get('time', ''), item.get('content', ''), item.get('status', '')] for item in items]
        except Exception:
            pass

    # 1. Cấu hình các sheet cho file wan.xlsx (đổi từ baocao.xlsx)
    wan_sheets = [
        {'name': 'ge2pmb', 'headers': headers, 'rows': rows},
        {'name': 'thacmo', 'headers': headers, 'rows': []},
        {'name': 'avuong', 'headers': headers, 'rows': []},
        {'name': 'songbaha', 'headers': headers, 'rows': []},
        {'name': 'phalai', 'headers': headers, 'rows': []},
        {'name': 'haiphong', 'headers': headers, 'rows': []},
        {'name': 'trungson', 'headers': headers, 'rows': []},
    ]

    # 2. Cấu hình các sheet cho file attt.xlsx và rmcc.xlsx
    other_sheets = [
        {'name': 'thacmo', 'headers': headers, 'rows': []},
        {'name': 'avuong', 'headers': headers, 'rows': []},
        {'name': 'songbaha', 'headers': headers, 'rows': []},
        {'name': 'phalai', 'headers': headers, 'rows': []},
        {'name': 'haiphong', 'headers': headers, 'rows': []},
        {'name': 'trungson', 'headers': headers, 'rows': []},
    ]

    # Tạo file wan.xlsx ở các thư mục (đổi tên từ baocao.xlsx)
    for target in ['wan.xlsx', 'assets/wan.xlsx', 'dist/wan.xlsx']:
        create_multi_sheet_xlsx(target, wan_sheets)
    print(f'Created wan.xlsx with {len(wan_sheets)} sheets successfully!')

    # Tạo file attt.xlsx
    for target in ['attt.xlsx', 'assets/attt.xlsx', 'dist/attt.xlsx']:
        create_multi_sheet_xlsx(target, other_sheets)
    print(f'Created attt.xlsx with {len(other_sheets)} sheets successfully!')

    # Tạo file rmcc.xlsx
    for target in ['rmcc.xlsx', 'assets/rmcc.xlsx', 'dist/rmcc.xlsx']:
        create_multi_sheet_xlsx(target, other_sheets)
    print(f'Created rmcc.xlsx with {len(other_sheets)} sheets successfully!')
