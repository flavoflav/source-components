# Where these components came from

This library was consolidated from every `src/components` folder under
`~/partner-workshop`. **524 component folders across 13 projects** were reviewed
and collapsed to **61 archetypes**.

None of the original files were copied verbatim. Each source project defined its
own Tailwind theme tokens in its own `src/global.css` (`bg-hero-gradient`,
`rounded-card`, `text-red-nutella`, `bg-acquia-deep`, `font-display`,
`text-bega-ink`, …), so copying the JSX across would have produced components
that silently lost their styling. Each archetype here was rewritten against
stock Tailwind plus the `primary-*` / `gray-*` scales already defined in this
repo's `src/global.css`.

## Source projects

| Project          | Components reviewed | Main contribution to the library                                                                                              |
| ---------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `acquia2`        | 316                 | Marketing bands: hero, feature grid, alternating features, demo CTA, customer logos, sub-nav, results, FAQ, mega menu         |
| `starrez`        | 31                  | Site navigation, tabbed solutions, story/testimonial carousels, stat chips, resource and info cards                           |
| `marin-college`  | 27                  | Events list and tabs, news feed, pagination, link lists, alumni/story cards, two-column layout                                |
| `unifec-ceh`     | 25                  | The Nebula example primitives: accordion, breadcrumb, button, card, grid/section containers, tabs, stat callout               |
| `gipsstandards`  | 25                  | Document libraries, directories, Q&A database, CTA tiles, stat boxes, icon link lists, video embed                            |
| `nutella`        | 23                  | Product and collection cards, recipe method/ingredients (generalised to step list and spec list), promo bar, floating actions |
| `peleton`        | 15                  | Blog post layout and cards, quote carousel, feature split, stats row, solution grid                                           |
| `airstream`      | 14                  | Product carousel, image grid and cards, newsletter, social links, spacer, content section                                     |
| `acquiademo10`   | 12                  | Article card and grid, site header/footer, announcement bar, ad banner, podcast and video playlist                            |
| `testy`          | 10                  | Dealer locator and cards (generalised to location card), class cards, CTA banner pair, brand statement                        |
| `deepseek`       | 9                   | News listing and article, CTA card, transparency/harness sections                                                             |
| `bega`           | 9                   | Hero tiles, home listings, icon grid, page banner, social band, rich text                                                     |
| `source-support` | 8                   | Site header, contact card, FAQ and enablement page patterns, release notes                                                    |

Excluded: `my-drupal11-site/web/modules/contrib/**` (Drupal core and contrib
module source, not project components) and git worktree copies under
`.claude/worktrees/`.

## How 524 became 61

The largest single reduction came from `acquia2`, where the same handful of
section archetypes had been generated once per page — 32 `demo-cta` variants, 20
`feature-grid`, 15 `alternating-features`, 13 `customer-logos`, 11 `sub-nav`.
Those page-scoped copies differed only in copy and in per-text
colour/size/alignment knobs, so they collapse to one component each with a small
variant enum.

Three structural changes were applied while merging, following the Canvas
component rules:

1. **Numbered prop groups became slots.** `feature1Badge … feature5Badge`,
   `card1Title … card3Title`, `logo1Image … logo6Image`, `q1/a1 … q5/a5` are all
   replaced by a parent with an items slot plus a child component, so an author
   is no longer capped at the number the original developer happened to
   hard-code.
2. **Per-text styling knobs were dropped.** Props like `headlineColor`,
   `headlineSize`, `headlineAlign`, `featureBodyColor`, `ctaLabelSize` — often
   15+ per component — collapsed into a single `variant` / `background` /
   `align` set. Typography is the library's job, not the editor's.
3. **Project prefixes were removed.** `acquia-source-hero`, `golf-article-card`
   and `sr-hero` became `hero` and `article-card`. Nothing in this library is
   named after the project it came from.

## Components that were deliberately not carried over

| Pattern in source                                                                                                                           | Why it is not here                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `alternating-features` (15 copies)                                                                                                          | `feature-split` with `mediaPosition` flipped between instances does the same thing and stays reusable |
| `feature-grid`, `solutions-grid`, `resources-grid`, `story-grid`, `product-grid`, `stat-box-grid`, `capability-cards`, `key-features-cards` | All the same titled-band-plus-grid shape; `card-grid` covers them with the right child card           |
| `testimonial-carousel`, `story-carousel`, `product-carousel`, `hero-slider`                                                                 | One `carousel` with a `slidesPerView` prop and a slides slot                                          |
| `faq-accordion`, `faq-item`, `accordion-section`, `qanda-database`                                                                          | `accordion` + `accordion-item`                                                                        |
| `stats-row`, `statistics-callouts`, `results`                                                                                               | `card-grid` + `stat-card`                                                                             |
| Whole-page components (`homepage`, `industry_page`, `solution_page`, `enablement_page`, `faq_page`)                                         | Pages belong in `pages/`, not in `src/components`; they are compositions, not components              |
| `sign-in`, `protected-content`, `harness`, `dist`, `text` stubs                                                                             | Project-specific plumbing with no reuse value                                                         |
