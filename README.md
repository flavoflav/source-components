# Drupal Source components

A neutral, AI-ready component library for **Drupal Canvas / Acquia Source**. 65
components, each with its React implementation, Canvas metadata and Workbench
mocks — installable into any Nebula project with one command.

## Install

From inside a fresh Nebula project:

```bash
npx --allow-git=all github:flavoflav/source-components
```

That copies all 65 components into the project's configured component directory
and merges the theme tokens into its global CSS. Then:

```bash
npm run dev
```

Every component appears in Workbench with its preview states, ready to compose
into pages.

`--allow-git=all` is required on npm 12 and later, which refuses to fetch
git-hosted packages unless you opt in. On npm 11 and earlier you can drop it.

This package is not published to the npm registry, so
`npx drupal-source-components` will not resolve it. Install from the repository,
or from a local checkout:

```bash
npx /path/to/source-components   # from inside the target project
```

### If the install exits without printing anything

npm reports a failed git-dependency install as a bare exit code with no message.
Re-run it as `npm install --allow-git=all github:flavoflav/source-components` to
see the real error.

The common cause is an `allow-scripts` entry in your user `~/.npmrc`. npm
prepares a git dependency by spawning a child install that inherits it and then
rejects it:

```
npm error code EALLOWSCRIPTS
npm error --allow-scripts is not allowed in project-scoped installs.
```

Move that entry into the `allowScripts` field of the individual project's
`package.json` and the install proceeds.

### Options

| Flag             | Effect                                                     |
| ---------------- | ---------------------------------------------------------- |
| `--target <dir>` | Install into another directory instead of the current one  |
| `--only a,b,c`   | Install just these components                              |
| `--force`        | Replace components that already exist (skipped by default) |
| `--no-theme`     | Leave the target's global CSS alone                        |
| `--dry-run`      | Report what would change, write nothing                    |

Existing components are never overwritten without `--force`, and the theme block
is written between markers so re-running updates it in place rather than
appending a second copy.

## What you get

| Family        | Components                                                                                                                                                                                                                                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Primitives    | section, grid-container, two-column, heading, text, image, spacer, badge, button, link-list, link-item                                                                                                                                                                                                          |
| Site chrome   | site-header, main-navigation, nav-item, mega-menu, sub-nav, announcement-bar, site-footer, social-links, search-form, breadcrumb, breadcrumb-item                                                                                                                                                               |
| Page sections | hero, page-banner, section-heading, card-grid, feature-card, feature-split, cta-banner, cta-tile, stat-card, logo-wall, logo-tile, testimonial-card, carousel, accordion, accordion-item, tabs, tab-panel, video-embed, newsletter-signup, contact-form, step-list, step-item, spec-list, spec-item, data-table |
| Content       | card, article-card, article-body, story-card, resource-card, person-card, event-card, product-card, location-card, news-feed, related-articles, pagination, filter-bar, filter-select                                                                                                                           |
| Documentation | component-explorer, component-spec, code-block                                                                                                                                                                                                                                                                  |

Full reference:
**[src/components/COMPONENTS.md](src/components/COMPONENTS.md)**. Where they
came from: **[src/components/PROVENANCE.md](src/components/PROVENANCE.md)**.

## Conventions

| Rule                                                                | Why                                                                                                   |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Repeatable content is a parent **slot** plus a child component      | Editors decide how many items appear; children stay reusable                                          |
| One image is one **object prop** using the Canvas image schema      | Matches the Drupal media picker (`examples` before `$ref`)                                            |
| Images render with a plain `<img>`                                  | The Canvas `<Image>` helper needs an `alternateWidths` parameter that media-library URLs do not carry |
| Buttons go in an `actions` slot                                     | Sections carry no `ctaLabel` / `ctaUrl` props                                                         |
| `variant` / `background` / `align` enums, not per-text colour props | Short editor forms, consistent type scale                                                             |
| Folder name === `machineName`, no project prefix                    | Portable between projects                                                                             |
| `description` in every `component.yml`                              | What Canvas, Drupal and coding agents read to pick the right component                                |

## Theming

Every colour routes through four token ramps in `src/global.css` — `white`,
`black`, `gray-*` and `primary-*` — so the whole library re-themes from one
block without touching a component.

The ramps are named by **role**, not literal colour: `--color-white` is the page
surface and `--color-black` is maximum-contrast ink. That is what lets
`bg-gray-900 text-white` stay a correct contrast band in both themes.

It ships **dark by default**. A light palette is defined under
`:root[data-theme='light']`, so a consumer who wants light can opt in by setting
the attribute on the document:

```html
<html data-theme="light"></html>
```

Nothing toggles this at runtime — the site this library documents is dark.

To rebrand, edit the two ramps. No component file needs changing.

## Components that need a live Drupal

`news-feed` and `related-articles` fetch over JSON:API with SWR. Without a
connected site they render a loading skeleton and then an explicit empty state —
expected, not a bug. Everything else previews offline.

## Developing the library

This repo is itself a Canvas workspace, so `npm run dev` previews the components
here too.

```bash
npm install
npm run hooks          # one-time: install the Husky pre-commit hooks
npm run dev            # Workbench
npm run code:fix       # prettier + eslint
npx canvas validate    # check components against the Canvas contract
```

The hooks are a manual step rather than a `prepare` script, because npm runs
`prepare` when this repository is installed as a git dependency — which broke
the `npx` install for consumers.

`scripts/build-component-explorer-page.mjs` regenerates a Canvas page that
documents the library using the library — a filterable index of every component
with its props, slots and full source.
