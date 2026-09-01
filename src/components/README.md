# Shared Canvas component library

A neutral, AI-ready starter set of Drupal Canvas components, consolidated from
every project in this workspace. Copy this folder into a new Nebula or Acquia
Source workspace and you have a working component library on day one.

- **[COMPONENTS.md](COMPONENTS.md)** — the catalog. Start here, and point agents
  here.
- **[PROVENANCE.md](PROVENANCE.md)** — what was merged, from where, and what was
  dropped.

## Running it

```bash
npm install
npm run dev
```

Workbench lists every component with its mock states. Each component folder
holds `index.jsx`, `component.yml` and `mocks.json`.

### Sample pages

`pages/` holds worked examples and `regions/` holds a shared header and footer
that render on all of them. They exist to show the same 64 components carrying
very different visual and editorial registers.

| Page                         | Path                          | What it demonstrates                                                                                          |
| ---------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `home`                       | `/`                           | SaaS homepage: split hero, proof, capabilities, stories, live blog feed                                       |
| `platform`                   | `/platform`                   | Product page: sticky sub-nav, backdrop hero, tabbed use cases, pricing table, FAQ                             |
| `solutions-healthcare`       | `/solutions/healthcare`       | Industry page: photographic banner with breadcrumb, problem framing, story carousel                           |
| `blog`                       | `/blog`                       | Listing: sticky filter bar, featured pair, latest grid, pagination, newsletter                                |
| `blog-post`                  | `/blog/...`                   | Article: full reading layout with a pull quote in `aside` and a CTA in `footer`                               |
| `about`                      | `/about`                      | Corporate: dark banner, editorial two-column, values, leadership, offices                                     |
| `events`                     | `/events`                     | Events listing with date-chip cards and format/region facets                                                  |
| `resources`                  | `/resources`                  | Resource centre: three-facet filter, gated downloads, standards table                                         |
| `contact`                    | `/contact`                    | Form with a composed aside of location, routing links and social                                              |
| `shop`                       | `/shop`                       | Commerce: announcement bar, product carousel, faceted grid, shipping specs                                    |
| `fintech`                    | `/pay`                        | Regulated fintech: dark sub-nav, volume stats, pricing and licence tables, security specs, regulatory FAQ     |
| `nonprofit`                  | `/nonprofit`                  | Charity: matched-giving bar, mission hero, impact stats, community voices, published accounts                 |
| `multi-brand`                | `/group`                      | House of brands: brand logo wall, portfolio built from tabs holding nested grids of brand cards               |
| `component-explorer`         | `/component-explorer`         | The library documenting itself: filterable index of all 64 components with their props, slots and full source |
| `component-library-showcase` | `/component-library-showcase` | Most of the library on one page as a reference                                                                |

The fintech, non-profit and multi-brand pages are the useful stress tests: none
of them needed a new component, and none share a visual register with the
others.

`multi-brand` also shows the deepest nesting in the set — `tabs` → `tab-panel` →
its `content` slot → `grid-container` → `card` — which is the pattern to copy
when a section needs to hold arbitrary composed content rather than a fixed
list.

## Conventions every component follows

| Rule                                                                                        | Why                                                                                     |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Repeatable content is a parent **slot** plus a child component                              | Editors decide how many items appear; children stay independently reusable              |
| One image is one **object prop** with `$ref: json-schema-definitions://canvas.module/image` | Matches the Drupal media picker; `examples` comes before `$ref` in the YAML             |
| Images render with a plain `<img>`, not the Canvas `<Image>` helper                         | `<Image>` needs an `alternateWidths` URL parameter that media-library URLs do not carry |
| Buttons go in an `actions` slot                                                             | Sections do not carry `ctaLabel` / `ctaUrl` string props                                |
| `variant`, `background` and `align` enums instead of per-text colour/size props             | Keeps the editor form short and the type scale consistent                               |
| Folder name === `machineName`, no project prefix                                            | Portable between projects                                                               |
| `description` in every `component.yml`                                                      | This is what Canvas, Drupal and coding agents read to pick the right component          |
| Stock Tailwind plus `primary-*` / `gray-*` from `src/global.css`                            | Rebrand by editing the token scales, not the components                                 |

## Rebranding

Everything colour-related routes through the two scales in `src/global.css`:

```css
@theme {
  --color-primary-500: var(
    --color-blue-500
  ); /* point these at the brand palette */
  --color-gray-500: var(--color-slate-500);
}
```

Change those and the whole library follows. No component file needs editing.

## Components that need a live Drupal

`news-feed` and `related-articles` fetch over JSON:API with SWR. In Workbench
without a connected site they render a loading skeleton and then an explicit
empty state — that is expected, not a bug. Everything else is fully static and
previews offline.

## The component index page

`pages/component-explorer.json` is the library documenting itself: a
`component-explorer` holding one `component-spec` per component, each with
`code-block` children carrying the real `index.jsx`, `component.yml` and
`mocks.json`. Search, family chips and capability chips all filter client side.

Regenerate it after adding or changing a component, so the published index
cannot drift from the source:

```bash
node scripts/build-component-explorer-page.mjs
```

The single page is about 394 KB. If a push is rejected for size, generate one
smaller page per family instead — five pages, none larger than about 156 KB:

```bash
node scripts/build-component-explorer-page.mjs --per-family
```

There is also a standalone HTML version of the same index at
`docs/component-explorer.html` (built by `scripts/build-component-explorer.mjs`)
for reading outside Canvas. It is a convenience copy; the Canvas page is the one
that ships.

## Adding to this library

Follow the same contract. Before creating a new component, check whether an
existing one plus a variant or a slot already covers the case — the whole point
of this consolidation was that 524 components were doing the work of 61.
