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
    'src/data/wanElements.ts',
    'src/renderer/svgDiagram.ts',
    'src/ui/app.ts',
    'src/main.ts',
  ];

  const chunks: string[] = ['(function () {\n"use strict";\n'];
  for (const relPath of orderedFiles) {
    const fullPath = path.join(ROOT_DIR, relPath);
    const tsCode = fs.readFileSync(fullPath, 'utf-8');
    let jsCode = module.stripTypeScriptTypes(tsCode, { mode: 'strip' });
    // Remove ES module import/export keywords for standalone IIFE bundle
    jsCode = jsCode.replace(/^\s*import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '');
    jsCode = jsCode.replace(/^\s*export\s+(const|function|class)\s+/gm, '$1 ');
    jsCode = jsCode.replace(/^\s*export\s+\{[^}]*\};?\s*$/gm, '');
    chunks.push(`// --- ${relPath} ---\n${jsCode}\n`);
  }
  chunks.push('})();\n');

  fs.writeFileSync(path.join(DIST_DIR, 'bundle.js'), chunks.join('\n'), 'utf-8');
}

const total = transpileDir(SRC_DIR, DIST_DIR);
buildStandaloneBundle();
console.log(
  `Đã biên dịch thành công ${total} file TypeScript sang dist/ (bao gồm dist/bundle.js chạy trực tiếp).`
);
