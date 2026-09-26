// Sanity checks on the built site. Run after `npm run build`:  npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = process.env.DIST ?? join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const SITE = new URL(readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8').match(/<loc>(https?:\/\/[^/<]+)/)[1]);

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : [join(dir, f)]));
const pages = walk(DIST)
  .filter((f) => f.endsWith('.html'))
  .map((f) => {
    const rel = f.slice(DIST.length).replaceAll('\\', '/');
    const url = rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
    return { url, file: f, html: readFileSync(f, 'utf8') };
  });
const byUrl = new Map(pages.map((p) => [p.url, p]));
const indexable = pages.filter((p) => !/<meta name="robots" content="noindex/.test(p.html));
const tag = (html, re) => html.match(re)?.[1];

test('built at least the expected pages', () => {
  assert.ok(indexable.length >= 10, `only ${indexable.length} indexable pages`);
});

test('every page: lang, single h1, unique title, sane description', () => {
  const titles = new Set();
  for (const p of pages) {
    assert.match(p.html, /<html lang="(es|en)"/, p.url);
    assert.equal((p.html.match(/<h1[\s>]/g) ?? []).length, 1, `${p.url}: h1 count`);
    const title = tag(p.html, /<title>([^<]+)<\/title>/);
    assert.ok(title, `${p.url}: title`);
    // The two home titles are intentionally identical across locales.
    const key = tag(p.html, /<html lang="(\w+)"/) + '|' + title;
    if (!p.url.endsWith('404.html')) {
      assert.ok(!titles.has(key), `${p.url}: duplicate title within a locale`);
      titles.add(key);
    }
    const d = tag(p.html, /<meta name="description" content="([^"]*)"/);
    assert.ok(d && d.length >= 50 && d.length <= 200, `${p.url}: description length ${d?.length}`);
  }
});

test('canonical is absolute, self-referencing, and hreflang alternates are reciprocal', () => {
  for (const p of indexable) {
    const canon = tag(p.html, /<link rel="canonical" href="([^"]+)"/);
    assert.equal(canon, new URL(p.url, SITE).href, `${p.url}: canonical`);
    const alts = Object.fromEntries(
      [...p.html.matchAll(/<link rel="alternate" hreflang="([\w-]+)" href="([^"]+)"/g)].map((m) => [
        m[1],
        new URL(m[2]).pathname,
      ]),
    );
    assert.ok(alts.es && alts.en && alts['x-default'], `${p.url}: hreflang set`);
    for (const lang of ['es', 'en']) {
      const other = byUrl.get(alts[lang]);
      assert.ok(other, `${p.url}: ${lang} alternate ${alts[lang]} missing from dist`);
      const back = new URL(tag(other.html, new RegExp(`hreflang="${lang}" href="([^"]+)"`)), SITE).pathname;
      assert.equal(back, alts[lang], `${p.url}: ${lang} alternate is not self-consistent`);
    }
  }
});

test('sitemap lists exactly the indexable pages', () => {
  const locs = [...readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname)
    .sort();
  assert.deepEqual(locs, indexable.map((p) => p.url).sort());
});

test('JSON-LD parses on every page', () => {
  for (const p of pages)
    for (const m of p.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))
      assert.doesNotThrow(() => JSON.parse(m[1]), p.url);
});

test('images have alt, width and height', () => {
  for (const p of pages)
    for (const [img] of p.html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(img, /\salt="/, `${p.url}: ${img.slice(0, 80)} missing alt`);
      assert.match(img, /\swidth="\d+"/, `${p.url}: missing width`);
      assert.match(img, /\sheight="\d+"/, `${p.url}: missing height`);
    }
});

test('external target=_blank links carry rel=noopener', () => {
  for (const p of pages)
    for (const [a] of p.html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g))
      assert.match(a, /rel="[^"]*noopener/, `${p.url}: ${a.slice(0, 90)}`);
});

test('internal links and #fragments resolve', () => {
  for (const p of pages)
    for (const m of p.html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
      const href = m[1].replaceAll('&amp;', '&');
      if (/^(https?:|mailto:|tel:)/.test(href)) continue;
      const u = new URL(href, new URL(p.url, SITE));
      const target = byUrl.get(u.pathname);
      if (target) {
        if (u.hash) assert.ok(target.html.includes(`id="${decodeURIComponent(u.hash.slice(1))}"`), `${p.url}: ${href} -> no such id`);
      } else assert.ok(existsSync(join(DIST, u.pathname)), `${p.url}: broken link ${href}`);
    }
});

// The CSS minifier folds `animation-timeline` into the `animation` shorthand
// when the declaration set is complete, and Chrome rejects that shorthand: the
// scroll animations then vanish from production while still working in `dev`.
test('scroll-driven animations survive CSS minification', () => {
  const css = walk(DIST)
    .filter((f) => f.endsWith('.css') || f.endsWith('.html'))
    .map((f) => readFileSync(f, 'utf8'))
    .join('\n');
  assert.match(css, /animation-name:reveal-scroll/, 'reveal-scroll must use longhands');
  assert.match(css, /animation-name:scroll-progress/, 'scroll-progress must use longhands');
  assert.doesNotMatch(css, /animation:[^;}]*\b(view|scroll)\(/, 'animation shorthand with view()/scroll() is dropped by Chrome');
});
