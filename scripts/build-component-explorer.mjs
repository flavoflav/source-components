#!/usr/bin/env node
/**
 * Regenerates docs/component-explorer.html from src/components.
 * Run after adding or changing a component:  node scripts/build-component-explorer.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src/components');
const OUT = path.join(ROOT, 'docs/component-explorer.html');
const TPL = path.join(ROOT, 'docs/_explorer');

const FAMILIES = {
  Primitives: ['section','grid-container','two-column','heading','text','image','spacer','badge','button','link-list','link-item'],
  Chrome: ['site-header','main-navigation','nav-item','mega-menu','sub-nav','announcement-bar','site-footer','social-links','search-form','breadcrumb','breadcrumb-item'],
  Sections: ['hero','page-banner','section-heading','card-grid','feature-card','feature-split','cta-banner','cta-tile','stat-card','logo-wall','logo-tile','testimonial-card','carousel','accordion','accordion-item','tabs','tab-panel','video-embed','newsletter-signup','contact-form','step-list','step-item','spec-list','spec-item','data-table'],
  Content: ['card','article-card','article-body','story-card','resource-card','person-card','event-card','product-card','location-card','news-feed','related-articles','pagination','filter-bar','filter-select'],
};
const famOf = Object.fromEntries(Object.entries(FAMILIES).flatMap(([f, ms]) => ms.map(m => [m, f])));

const kind = (pv) =>
  pv.$ref ? 'image'
  : pv.enum ? 'enum'
  : pv.contentMediaType === 'text/html' ? 'rich text'
  : pv.format === 'uri-reference' ? 'url'
  : ({ integer: 'number', boolean: 'boolean', object: 'object' }[pv.type] || pv.type || 'string');

// which sample pages and regions each component appears on
const usage = {};
for (const dir of ['pages', 'regions']) {
  const d = path.join(ROOT, dir);
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d).filter(f => f.endsWith('.json'))) {
    const doc = JSON.parse(fs.readFileSync(path.join(d, f), 'utf8'));
    const label = doc.title || f.replace(/\.json$/, '');
    for (const v of Object.values(doc.elements)) {
      const id = v.type.replace('js.', '');
      (usage[id] ??= new Set()).add(label);
    }
  }
}

const items = fs.readdirSync(SRC)
  .filter(n => fs.existsSync(path.join(SRC, n, 'component.yml')))
  .sort()
  .map(id => {
    const dir = path.join(SRC, id);
    const yml = fs.readFileSync(path.join(dir, 'component.yml'), 'utf8');
    const jsx = fs.readFileSync(path.join(dir, 'index.jsx'), 'utf8');
    const mocksRaw = fs.readFileSync(path.join(dir, 'mocks.json'), 'utf8');
    const d = parse(yml);
    const props = d.props?.properties ?? {};
    const req = new Set(d.required ?? []);
    const slots = d.slots && !Array.isArray(d.slots) ? Object.keys(d.slots) : [];
    return {
      id: d.machineName,
      name: d.name,
      family: famOf[d.machineName] ?? 'Other',
      description: (d.description ?? '').split(/\s+/).join(' ').trim(),
      props: Object.entries(props).map(([k, v]) => ({
        name: k, kind: kind(v), required: req.has(k),
        enum: (v.enum ?? []).map(String),
        example: (() => {
          const e = v.examples?.[0];
          return e == null ? '' : (typeof e === 'object' ? JSON.stringify(e) : String(e));
        })(),
      })),
      slots,
      mocks: (JSON.parse(mocksRaw).mocks ?? []).map(m => m.name ?? 'Untitled'),
      flags: {
        slots: slots.length > 0,
        image: Object.values(props).some(v => v.$ref),
        data: jsx.includes('JsonApiClient'),
        state: jsx.includes('useState'),
        richtext: jsx.includes('FormattedText'),
      },
      usedOn: [...(usage[d.machineName] ?? [])].sort(),
      src: { jsx, yml, mocks: mocksRaw },
      lines: jsx.split('\n').length,
    };
  });

const payload = JSON.stringify(items).replaceAll('<', '\\u003c');
const html =
  fs.readFileSync(path.join(TPL, 'head.html'), 'utf8') + '\n' +
  fs.readFileSync(path.join(TPL, 'body.html'), 'utf8') + '\n' +
  `<script id="component-data" type="application/json">${payload}</script>\n` +
  '<script>\n' + fs.readFileSync(path.join(TPL, 'app.js'), 'utf8') + '\n</script>\n';

fs.writeFileSync(OUT, html);
console.log(`docs/component-explorer.html — ${items.length} components, ${Math.round(html.length / 1024)} KB`);
