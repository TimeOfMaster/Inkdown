// src/convert.ts

import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it';
import puppeteer from 'puppeteer';
import footnote from 'markdown-it-footnote';

export async function convert(markdownFile: string, cssFile?: string) {
  // Paths
  const mdPath = path.resolve(markdownFile);
  const cssPath = cssFile
    ? path.resolve(cssFile)
    : path.resolve(__dirname, '../template/style.css');
  const htmlOutPath = path.resolve(markdownFile.replace(/\.md$/, '.html'));
  const pdfOutPath = path.resolve(markdownFile.replace(/\.md$/, '.pdf'));

  // Convert Markdown to HTML
  const md = new MarkdownIt().use(footnote);
  const markdown = fs.readFileSync(mdPath, 'utf-8');
  const htmlContent = md.render(markdown);

  // Inject CSS
  const css = fs.readFileSync(cssPath, 'utf-8');
  const fullHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Markdown PDF</title>
    <style>${css}</style>
  </head>
  <body>
  ${htmlContent}
  </body>
  </html>
  `;

  // Save HTML
  fs.writeFileSync(htmlOutPath, fullHtml, 'utf-8');

  // Render to PDF using Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: pdfOutPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '2cm',
      bottom: '2cm',
      left: '2cm',
      right: '2cm'
    }
  });

  await browser.close();
  console.log(`✅ PDF generated: ${pdfOutPath}`);
}
