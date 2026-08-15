import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

const PALETTE = ['#AF2E1B', '#CC6324', '#3B4B59', '#BFA07A', '#D9C3B0'];

test('the canonical Blue Bridge palette drives the BSL surface', async () => {
  const css = await read('style.css');
  for (const colour of PALETTE) assert.match(css, new RegExp(colour, 'i'));
  assert.match(css, /--ink:\s*var\(--palette-slate\)/);
  assert.match(css, /--deep:\s*var\(--palette-slate\)/);
  assert.match(css, /\.primaryAction\s*\{[^}]*background:\s*var\(--palette-red\)/s);
  assert.match(css, /\.btn\.warn\s*\{[^}]*background:\s*var\(--palette-orange\)[^}]*color:\s*#111/s);
  assert.match(css, /@media print[\s\S]*border-bottom:\s*1\.2pt solid #3B4B59/i);
});

test('the palette release advances the complete offline shell together', async () => {
  const [html, worker] = await Promise.all([read('index.html'), read('service-worker.js')]);
  assert.match(html, /theme-color" content="#3B4B59"/i);
  for (const asset of ['style.css', 'course.js', 'knowledge.js', 'app.js']) {
    assert.match(html, new RegExp(`${asset.replace('.', '\\.') }\\?v=12`));
    assert.match(worker, new RegExp(`${asset.replace('.', '\\.') }\\?v=12`));
  }
  assert.match(worker, /bsl-classroom-readiness-v12/);
  assert.doesNotMatch(html + worker, /\?v=11|readiness-v11/);
});

test('key text pairs retain WCAG AA contrast', () => {
  const luminance = (hex) => {
    const channels = hex.match(/[0-9a-f]{2}/gi).map((value) => Number.parseInt(value, 16) / 255);
    const [r, g, b] = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const contrast = (a, b) => {
    const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (lighter + 0.05) / (darker + 0.05);
  };
  assert.ok(contrast('FFFFFF', 'AF2E1B') >= 4.5);
  assert.ok(contrast('FFFFFF', '3B4B59') >= 4.5);
  assert.ok(contrast('111111', 'CC6324') >= 4.5);
  assert.ok(contrast('3B4B59', 'D9C3B0') >= 4.5);
});
