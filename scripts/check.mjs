import { readFile, access, readdir, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
const root = resolve('dist');
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(resolve(dir, entry.name)) : resolve(dir, entry.name)))).flat();
}
const files = await walk(root);
const pages = files.filter(path => path.endsWith('.html'));
const portfolioJs = await readFile('dist/app.js', 'utf8');
let anchors = 0, resources = 0;
async function targetPath(pathname) {
  let path = resolve(root, '.' + decodeURIComponent(pathname));
  if ((await stat(path)).isDirectory()) path = resolve(path, 'index.html');
  await access(path);
  return path;
}
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  if (new Set(ids).size !== ids.length) throw new Error(`Duplicate IDs in ${page}`);
  for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (value.startsWith('#')) {
      if (value.length > 1 && !ids.includes(value.slice(1))) throw new Error(`Missing anchor ${value} in ${page}`);
      anchors++; continue;
    }
    if (!value.startsWith('/')) continue;
    const url = new URL(value, 'http://local');
    const target = await targetPath(url.pathname);
    if (url.hash && extname(target) === '.html') {
      const targetHtml = await readFile(target, 'utf8');
      if (!targetHtml.includes(`id="${url.hash.slice(1)}"`)) throw new Error(`Missing target: ${value}`);
      anchors++;
    }
    resources++;
  }
  for (const [, id] of html.matchAll(/data-project="([^"]+)"/g)) if (!portfolioJs.includes(`  ${id}: {`)) throw new Error(`Missing project story: ${id}`);
}
for (const path of files.filter(path => /\.(css|js)$/.test(path))) {
  const text = await readFile(path, 'utf8');
  for (const [, asset] of text.matchAll(/["'(](\/assets\/[^"')]+)["')]/g)) { await access(resolve(root, '.' + asset)); resources++; }
}
const css = await readFile('dist/styles.css', 'utf8');
if (!css.includes('prefers-reduced-motion')) throw new Error('Reduced motion support missing');
console.log(`Checked ${pages.length} pages, ${anchors} internal anchors, ${resources} local references, and all project stories.`);
