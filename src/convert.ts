// src/convert.ts

import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it';
import puppeteer from 'puppeteer';
import footnote from 'markdown-it-footnote';
import container from 'markdown-it-container';

export async function convert(markdownFile: string, cssFile?: string) {
  // Paths
  const mdPath = path.resolve(markdownFile);
  const cssPath = cssFile
    ? path.resolve(cssFile)
    : path.resolve(__dirname, '../template/style.css');
  const htmlOutPath = path.resolve(markdownFile.replace(/\.md$/, '.html'));
  const pdfOutPath = path.resolve(markdownFile.replace(/\.md$/, '.pdf'));

  // Convert Markdown to HTML
  const md = new MarkdownIt('commonmark').use(footnote).use(container, 'note').use(container, 'warning').use(container, 'info').use(container, 'tip');
  const markdown = fs.readFileSync(mdPath, 'utf-8');
  const htmlContent = md.render(markdown);

  const templateHtml = fs.readFileSync(
    path.resolve(__dirname, '../template/template.html'),
    'utf-8'
  );
  const css = fs.readFileSync(cssPath, 'utf-8');
  const styleHtml = `<style>${css}</style>`;
  const fullHtml = templateHtml
    .replace('{{style}}', styleHtml)
    .replace('{{content}}', htmlContent);

  // Save HTML
  fs.writeFileSync(htmlOutPath, fullHtml, 'utf-8');

  // Render to PDF using Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${htmlOutPath}`, { waitUntil: 'networkidle0' });

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
