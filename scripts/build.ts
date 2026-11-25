import fs from 'node:fs';
import path from 'node:path';
import module from 'node:module';

const ROOT_DIR = process.cwd();
const SRC_DIR = path.join(ROOT_DIR, 'src');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

function transpileDir(srcDir: string, outDir: string): number {
  fs.mkdirSync(outDir, { recursive: true });
  let count = 0;

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    if (entry.isDirectory()) {
      count += transpileDir(srcPath, path.join(outDir, entry.name));
    } else if (entry.isFile() && entry.name.endsWith('.ts')) {
      const tsCode = fs.readFileSync(srcPath, 'utf-8');
      let jsCode = module.stripTypeScriptTypes(tsCode, { mode: 'strip' });
      jsCode = jsCode.replace(
        /(from\s+['"]\.[^'"]+?)\.ts(['"])/g,
        '$1.js$2'
      );
      const outName = entry.name.replace(/\.ts$/, '.js');
      fs.writeFileSync(path.join(outDir, outName), jsCode, 'utf-8');
      count++;
    }
  }
  return count;
}

function buildStandaloneBundle(): void {
  const orderedFiles = [
    'src/types/wan.ts',
    'src/data/stencils.ts',
    'src/data/ganttData.ts',
    'src/data/bangthongData.ts',
    'src/data/baocaoData.ts',
    'src/data/wanVertices1.ts',
    'src/data/wanVertices2.ts',
    'src/data/wanEdges.ts',
    'src/data/wanElements.ts',
    'src/renderer/svgDiagram.ts',
    'src/ui/ganttModal.ts',
    'src/ui/bangthongModal.ts',
    'src/ui/authWidget.ts',
    'src/ui/wanReport.ts',
    'src/ui/atttReport.ts',
    'src/ui/rmccReport.ts',
    'src/ui/app.ts',
    'src/ui/loginView.ts',
    'src/main.ts',
  ];

  const chunks: string[] = ['(function () {\n"use strict";\n'];
  for (const relPath of orderedFiles) {
    const fullPath = path.join(ROOT_DIR, relPath);
    const tsCode = fs.readFileSync(fullPath, 'utf-8');
    let jsCode = module.stripTypeScriptTypes(tsCode, { mode: 'strip' });
    jsCode = jsCode.replace(/^\s*import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '');
    jsCode = jsCode.replace(/^\s*export\s+(async\s+function|const|function|class|let|var)\s+/gm, '$1 ');
    jsCode = jsCode.replace(/^\s*export\s+\{[^}]*\};?\s*$/gm, '');
    chunks.push(`// --- ${relPath} ---\n${jsCode}\n`);
  }
  chunks.push('})();\n');

  fs.writeFileSync(path.join(DIST_DIR, 'bundle.js'), chunks.join('\n'), 'utf-8');
}

const total = transpileDir(SRC_DIR, DIST_DIR);
buildStandaloneBundle();

// Ensure assets and root files are synced to dist
if (fs.existsSync(path.join(ROOT_DIR, 'data'))) {
  fs.cpSync(path.join(ROOT_DIR, 'data'), path.join(DIST_DIR, 'data'), { recursive: true });
}
if (fs.existsSync(path.join(ROOT_DIR, 'assets'))) {
  fs.cpSync(path.join(ROOT_DIR, 'assets'), path.join(DIST_DIR, 'assets'), { recursive: true });
}
for (const xlsxName of ['wan.xlsx', 'attt.xlsx', 'rmcc.xlsx', 'baocao.xlsx', 'infor.xlsx', 'bangthong.xlsx']) {
  if (fs.existsSync(path.join(ROOT_DIR, xlsxName))) {
    fs.copyFileSync(path.join(ROOT_DIR, xlsxName), path.join(DIST_DIR, xlsxName));
  }
}
if (fs.existsSync(path.join(ROOT_DIR, 'favicon.ico'))) {
  fs.copyFileSync(path.join(ROOT_DIR, 'favicon.ico'), path.join(DIST_DIR, 'favicon.ico'));
}

console.log(
  `Đã biên dịch thành công ${total} file TypeScript sang dist/.`
);
