#!/usr/bin/env node
/**
 * Regenerates pages/component-explorer.json from src/components.
 *
 * The page documents the library using the library: a Component Explorer holding
 * one Component Spec per component, each with Code Block children carrying the
 * real index.jsx, component.yml and mocks.json. Re-run after adding or changing
 * a component so the published index cannot drift from the source.
 *
 *   node scripts/build-component-explorer-page.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { parse } from 'yaml';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src/components');
const OUT = path.join(ROOT, 'pages/component-explorer.json');

// One 400 KB page can be rejected on push. --per-family emits one smaller page
// per family instead, which pushes reliably at the cost of a page per group.
const PER_FAMILY = process.argv.includes('--per-family');

const FAMILIES = {
  Primitives: ['section','grid-container','two-column','heading','text','image','spacer','badge','button','link-list','link-item'],
  Chrome: ['site-header','main-navigation','nav-item','mega-menu','sub-nav','announcement-bar','site-footer','social-links','search-form','breadcrumb','breadcrumb-item'],
  Sections: ['hero','page-banner','section-heading','card-grid','feature-card','feature-split','cta-banner','cta-tile','stat-card','logo-wall','logo-tile','testimonial-card','carousel','accordion','accordion-item','tabs','tab-panel','video-embed','newsletter-signup','contact-form','step-list','step-item','spec-list','spec-item','data-table'],
  Content: ['card','article-card','article-body','story-card','resource-card','person-card','event-card','product-card','location-card','news-feed','related-articles','pagination','filter-bar','filter-select'],
  Documentation: ['component-explorer','component-spec','code-block'],
};
const FAMILY_ORDER = Object.keys(FAMILIES);
const famOf = Object.fromEntries(Object.entries(FAMILIES).flatMap(([f, ms]) => ms.map(m => [m, f])));

const kindOf = (pv) =>
  pv.$ref ? 'image'
  : pv.enum ? `enum: ${pv.enum.join(', ')}`
  : pv.contentMediaType === 'text/html' ? 'rich text'
  : pv.format === 'uri-reference' ? 'url'
  : ({ integer: 'number', boolean: 'boolean', object: 'object' }[pv.type] || pv.type || 'string');

const escapeCell = (v) => String(v ?? '').replace(/\|/g, '/').replace(/\s*\n\s*/g, ' ');
const escapeHtml = (s) => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

// which sample pages and regions each component appears on
const usage = {};
for (const dir of ['pages', 'regions']) {
  const d = path.join(ROOT, dir);
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d).filter(n => n.endsWith('.json'))) {
    if (f === 'component-explorer.json') continue; // this page documents, it does not count as usage
    const doc = JSON.parse(fs.readFileSync(path.join(d, f), 'utf8'));
    for (const v of Object.values(doc.elements)) {
      (usage[v.type.replace('js.', '')] ??= new Set()).add(doc.title || f.replace(/\.json$/, ''));
    }
  }
}

const components = fs.readdirSync(SRC)
  .filter(n => fs.existsSync(path.join(SRC, n, 'component.yml')))
  .map(id => {
    const dir = path.join(SRC, id);
    const yml = fs.readFileSync(path.join(dir, 'component.yml'), 'utf8');
    const jsx = fs.readFileSync(path.join(dir, 'index.jsx'), 'utf8');
    const mocksRaw = fs.readFileSync(path.join(dir, 'mocks.json'), 'utf8');
    const d = parse(yml);
    const props = d.props?.properties ?? {};
    const req = new Set(d.required ?? []);
    const slots = d.slots && !Array.isArray(d.slots) ? Object.keys(d.slots) : [];

    const rows = [['Name', 'Type', 'Required', 'Example']].concat(
      Object.entries(props).map(([k, v]) => {
        const e = v.examples?.[0];
        const ex = e == null ? '' : (typeof e === 'object' ? JSON.stringify(e) : String(e));
        return [k, kindOf(v), req.has(k) ? 'yes' : '', ex.length > 90 ? `${ex.slice(0, 90)}…` : ex];
      }),
    );

    const caps = [
      slots.length && 'slots',
      Object.values(props).some(v => v.$ref) && 'image',
      jsx.includes('FormattedText') && 'rich text',
      jsx.includes('useState') && 'interactive',
      jsx.includes('JsonApiClient') && 'fetches data',
    ].filter(Boolean);

    return {
      id: d.machineName,
      name: d.name,
      family: famOf[d.machineName] ?? 'Other',
      description: `<p>${escapeHtml((d.description ?? '').split(/\s+/).join(' ').trim())}</p>`,
      propsTable: rows.map(r => r.map(escapeCell).join(' | ')).join('\n'),
      slotNames: slots.join('\n'),
      mockNames: (JSON.parse(mocksRaw).mocks ?? []).map(m => m.name ?? 'Untitled').join('\n'),
      usedOn: [...(usage[d.machineName] ?? [])].sort().join('\n'),
      capabilities: caps.join('\n'),
      src: { jsx, yml, mocks: mocksRaw },
    };
  })
  .sort((a, b) => {
    const fa = FAMILY_ORDER.indexOf(a.family), fb = FAMILY_ORDER.indexOf(b.family);
    return fa !== fb ? fa - fb : a.name.localeCompare(b.name);
  });

/* ---------- assemble ---------- */
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function buildPage({ file, title, pagePath, banner, intro, list }) {
  const els = {};
  const order = [];
  let n = 0;
  const uid = (t) => {
    n += 1;
    const h = crypto.createHash('sha1').update(`${file}/${t}/${n}`).digest('hex');
    return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20,32)}`;
  };
  const add = (type, props, slots, root = false) => {
    const k = uid(type);
    els[k] = { type: `js.${type}`, ...(props ? { props } : {}), ...(slots ? { slots } : {}) };
    if (root) order.push(k);
    return k;
  };

  add('page-banner', {
    eyebrow: 'Reference',
    title: banner,
    intro,
    background: 'light',
    align: 'left',
  }, null, true);

  const specIds = list.map(c => {
    const sources = [
      add('code-block', { code: c.src.jsx, language: 'jsx', filename: 'index.jsx', showLineNumbers: true, maxHeight: 'tall' }),
      add('code-block', { code: c.src.yml, language: 'yaml', filename: 'component.yml', showLineNumbers: true, maxHeight: 'tall' }),
      add('code-block', { code: c.src.mocks, language: 'json', filename: 'mocks.json', showLineNumbers: true, maxHeight: 'tall' }),
    ];
    return add('component-spec', {
      componentName: c.name,
      componentId: c.id,
      family: c.family,
      description: c.description,
      propsTable: c.propsTable,
      slotNames: c.slotNames,
      mockNames: c.mockNames,
      usedOn: c.usedOn,
      capabilities: c.capabilities,
      defaultOpen: false,
    }, { sources });
  });

  add('component-explorer', {
    searchPlaceholder: 'Search name, prop, slot or description',
    emptyMessage: 'Nothing matches those filters. Try a shorter term or clear the filters.',
    groupByFamily: true,
  }, { components: specIds }, true);

  // Canvas requires every parent to appear before its slot children.
  const elements = {};
  const seen = new Set();
  const emit = (k) => {
    if (seen.has(k)) return;
    seen.add(k);
    elements[k] = els[k];
    for (const ids of Object.values(els[k].slots ?? {})) {
      for (const i of ids) if (els[i]) emit(i);
    }
  };
  for (const k of order) emit(k);
  for (const [k, v] of Object.entries(els)) if (!(k in elements)) elements[k] = v;

  const out = path.join(ROOT, 'pages', file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify({
    title, path: pagePath,
    description: `Filterable index of ${list.length} components, with props, slots, mocks and full source. Generated from src/components.`,
    elements,
  }, null, 2) + '\n');
  console.log(`pages/${file} — ${list.length} components, ${Object.keys(elements).length} elements, ${Math.round(fs.statSync(out).size / 1024)} KB`);
}

if (PER_FAMILY) {
  for (const fam of FAMILY_ORDER) {
    const list = components.filter(c => c.family === fam);
    if (!list.length) continue;
    buildPage({
      file: `component-explorer-${slug(fam)}.json`,
      title: `Component Index — ${fam}`,
      pagePath: `/component-explorer/${slug(fam)}`,
      banner: `${fam} components`,
      intro: `<p>The ${list.length} ${fam.toLowerCase()} components in the shared library, with their props, slots, Workbench mocks and full source.</p>`,
      list,
    });
  }
} else {
  buildPage({
    file: 'component-explorer.json',
    title: 'Component Index',
    pagePath: '/component-explorer',
    banner: 'Component index',
    intro: `<p>All ${components.length} components in the shared library, with their props, slots, Workbench mocks and full source. Generated directly from <code>src/components</code>.</p>`,
    list: components,
  });
}
