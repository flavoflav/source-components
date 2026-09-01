# Component library catalog

Machine-readable index of every component in `src/components`. Each entry lists
what the component is for, its editable props and its slots. The same wording
lives in each component's `component.yml` under `description`, which is what
Canvas and Drupal read.

A rendered, filterable version of this catalog is published as a Canvas page at
`pages/component-explorer.json` — regenerate it with
`node scripts/build-component-explorer-page.mjs`.

**How this library is meant to be used**

- **Compose, do not fork.** Almost every page is `hero` + a few `card-grid` /
  `feature-split` bands + `cta-banner`. Reach for a new component only when
  nothing here fits.
- **Repeatable content goes in slots.** Parents own layout and the section
  heading; children own item content. There are no `card1Title` / `card2Title`
  prop groups anywhere.
- **One image is one object prop** (`{ src, alt, width, height }`), never
  separate `imageUrl` / `imageAlt` props, and it is rendered with a plain
  `<img>` tag.
- **Styling is neutral.** Stock Tailwind utilities plus the `primary-*` and
  `gray-*` scales defined in `src/global.css`. Rebrand by editing those scales,
  not the components.
- **Buttons are components, not props.** Sections expose an `actions` slot; put
  `button` components in it.

**64 components** across 5 families.

## Quick index

- **Primitives — layout and text** — `section`, `grid-container`, `two-column`,
  `heading`, `text`, `image`, `spacer`, `badge`, `button`, `link-list`,
  `link-item`
- **Site chrome — header, footer, navigation** — `site-header`,
  `main-navigation`, `nav-item`, `mega-menu`, `sub-nav`, `announcement-bar`,
  `site-footer`, `social-links`, `search-form`, `breadcrumb`, `breadcrumb-item`
- **Page sections — marketing bands** — `hero`, `page-banner`,
  `section-heading`, `card-grid`, `feature-card`, `feature-split`, `cta-banner`,
  `cta-tile`, `stat-card`, `logo-wall`, `logo-tile`, `testimonial-card`,
  `carousel`, `accordion`, `accordion-item`, `tabs`, `tab-panel`, `video-embed`,
  `newsletter-signup`, `contact-form`, `step-list`, `step-item`, `spec-list`,
  `spec-item`, `data-table`
- **Content — cards, listings and data** — `card`, `article-card`,
  `article-body`, `story-card`, `resource-card`, `person-card`, `event-card`,
  `product-card`, `location-card`, `news-feed`, `related-articles`,
  `pagination`, `filter-bar`, `filter-select`
- **Documentation — the library documenting itself** — `component-explorer`,
  `component-spec`, `code-block`

---

## Primitives — layout and text

### `section` — Section

Generic full-width page band. Wraps any child components in a background colour,
vertical padding and a centred max-width container. Use this as the outermost
wrapper for custom page bands instead of baking padding and background handling
into content components.

| Prop         | Type                                           | Required |
| ------------ | ---------------------------------------------- | -------- |
| `background` | enum(none, white, light, muted, dark, primary) |          |
| `padding`    | enum(none, small, medium, large)               |          |
| `width`      | enum(narrow, content, wide, full)              |          |

Slots: `content`

### `grid-container` — Grid Container

Responsive column grid that accepts any child components in its items slot. This
is the generic layout primitive behind every card grid, logo wall and feature
grid - reach for it whenever a design repeats blocks across columns and no
purpose-built grid component already exists.

| Prop          | Type                             | Required |
| ------------- | -------------------------------- | -------- |
| `columnCount` | enum(1, 2, 3, 4, 5, 6)           |          |
| `gap`         | enum(none, small, medium, large) |          |

Slots: `items`

### `two-column` — Two Column

Two side-by-side regions that stack on mobile, each accepting arbitrary child
components. Use this instead of building a two-column layout inside a content
component, so authors can swap what sits on either side.

| Prop              | Type                             | Required |
| ----------------- | -------------------------------- | -------- |
| `ratio`           | enum(even, wide_start, wide_end) |          |
| `verticalAlign`   | enum(start, center, stretch)     |          |
| `gap`             | enum(small, medium, large)       |          |
| `reverseOnMobile` | boolean                          |          |

Slots: `start`, `end`

### `heading` — Heading

Standalone heading with independent semantic level and visual size, so an author
can keep a correct document outline (h2) while choosing how big it looks. Use
for one-off titles; use Section Heading when you also need an eyebrow and intro
paragraph.

| Prop    | Type                                             | Required |
| ------- | ------------------------------------------------ | -------- |
| `text`  | string                                           | yes      |
| `level` | enum(h1, h2, h3, h4, h5, h6)                     |          |
| `size`  | enum(small, medium, large, extra_large, display) |          |
| `align` | enum(left, center, right)                        |          |

Slots: none

### `text` — Text

Rich text block for body copy authored in the WYSIWYG. Renders sanitised HTML
with sensible paragraph, list and link styling. Reach for this any time a design
needs a free-form paragraph rather than a fixed string prop.

| Prop      | Type                                    | Required |
| --------- | --------------------------------------- | -------- |
| `content` | rich text                               | yes      |
| `size`    | enum(small, medium, large, extra_large) |          |
| `align`   | enum(left, center, right)               |          |

Slots: none

### `image` — Image

Standalone responsive image with an optional caption, aspect-ratio crop and
corner radius. Use for editorial images placed directly on a page; components
that always include their own artwork should take an image prop instead.

| Prop      | Type                                          | Required |
| --------- | --------------------------------------------- | -------- |
| `image`   | image                                         | yes      |
| `caption` | string                                        |          |
| `ratio`   | enum(auto, square, landscape, wide, portrait) |          |
| `radius`  | enum(none, small, medium, full)               |          |

Slots: none

### `spacer` — Spacer

Empty vertical gap between components. Use sparingly, only where a design
genuinely needs extra breathing room that the surrounding Section padding cannot
provide.

| Prop     | Type                                                 | Required |
| -------- | ---------------------------------------------------- | -------- |
| `height` | enum(extra_small, small, medium, large, extra_large) |          |

Slots: none

### `badge` — Badge

Small pill label used for categories, tags, statuses and eyebrow labels. Compose
it into card and section slots instead of adding a "category" string prop to
every listing component.

| Prop    | Type                                  | Required |
| ------- | ------------------------------------- | -------- |
| `label` | string                                | yes      |
| `tone`  | enum(neutral, primary, dark, outline) |          |

Slots: none

### `button` — Button

A single call-to-action link styled as a button. Drop one or more into the
action slots of Hero, CTA Banner, Card and similar components rather than adding
ctaLabel/ctaUrl string props to every section component.

| Prop           | Type                                           | Required |
| -------------- | ---------------------------------------------- | -------- |
| `label`        | string                                         | yes      |
| `url`          | url                                            | yes      |
| `variant`      | enum(primary, secondary, outline, ghost, link) |          |
| `size`         | enum(small, medium, large)                     |          |
| `fullWidth`    | boolean                                        |          |
| `openInNewTab` | boolean                                        |          |

Slots: none

### `link-list` — Link List

Optionally titled list of links, stacked or inline. Used for footer columns,
in-page jump lists, sidebar navigation and quick links. Place Link Item
components in the items slot.

| Prop      | Type                  | Required |
| --------- | --------------------- | -------- |
| `heading` | string                |          |
| `layout`  | enum(stacked, inline) |          |

Slots: `items`

### `link-item` — Link Item

One entry inside a Link List, Main Navigation or Mega Menu column. Supports an
optional icon and one-line description, which is what turns a plain menu into a
rich navigation panel.

| Prop           | Type    | Required |
| -------------- | ------- | -------- |
| `label`        | string  | yes      |
| `url`          | url     | yes      |
| `description`  | string  |          |
| `icon`         | image   |          |
| `openInNewTab` | boolean |          |

Slots: none

---

## Site chrome — header, footer, navigation

### `site-header` — Site Header

Site chrome at the top of every page - logo, a navigation slot, an actions slot
for search and CTA buttons, and a built-in mobile menu toggle. Place this in the
header region rather than on individual pages. Put Main Navigation in the
navigation slot and Button or Search Form components in actions.

| Prop       | Type                           | Required |
| ---------- | ------------------------------ | -------- |
| `logo`     | image                          |          |
| `logoUrl`  | url                            |          |
| `siteName` | string                         |          |
| `variant`  | enum(light, dark, transparent) |          |
| `sticky`   | boolean                        |          |

Slots: `navigation`, `actions`

### `main-navigation` — Main Navigation

Navigation list that holds Nav Item components. Sits inside Site Header for the
primary menu, or stands alone for a sidebar or in-page menu. Nav Items carry
their own dropdown children, so this component only owns direction and the
accessible label.

| Prop     | Type                       | Required |
| -------- | -------------------------- | -------- |
| `label`  | string                     |          |
| `layout` | enum(horizontal, vertical) |          |

Slots: `items`

### `nav-item` — Nav Item

A single top-level menu entry. Leave the panel slot empty for a plain link, or
drop a Link List or Mega Menu into it to get a hover/click dropdown. This is how
multi-level navigation is modelled - there is no nested array of children props.

| Prop     | Type    | Required |
| -------- | ------- | -------- |
| `label`  | string  | yes      |
| `url`    | url     | yes      |
| `active` | boolean |          |

Slots: `panel`

### `mega-menu` — Mega Menu

Wide multi-column dropdown panel for large navigation. Drop it into the panel
slot of a Nav Item, fill sections with Link List components and optionally use
the feature slot for a promoted card or CTA.

| Prop          | Type          | Required |
| ------------- | ------------- | -------- |
| `columnCount` | enum(2, 3, 4) |          |

Slots: `sections`, `feature`

### `sub-nav` — Sub Nav

Sticky secondary navigation bar for a product or section of the site - product
name on the left, in-section links in the middle, a CTA on the right. Sits
directly under Site Header on product and solution pages.

| Prop           | Type              | Required |
| -------------- | ----------------- | -------- |
| `productLabel` | string            |          |
| `productUrl`   | url               |          |
| `variant`      | enum(light, dark) |          |
| `sticky`       | boolean           |          |

Slots: `items`, `actions`

### `announcement-bar` — Announcement Bar

Thin dismissible strip above the site header for launches, events and
time-limited promotions. Keep the message to one line; anything longer belongs
in a CTA Banner.

| Prop          | Type                       | Required |
| ------------- | -------------------------- | -------- |
| `message`     | string                     | yes      |
| `linkLabel`   | string                     |          |
| `linkUrl`     | url                        |          |
| `tone`        | enum(primary, dark, light) |          |
| `dismissible` | boolean                    |          |

Slots: none

### `site-footer` — Site Footer

Site chrome at the bottom of every page - brand block with tagline and social
icons on the left, several Link List columns on the right, and a legal row
underneath. Place this in the footer region, not on individual pages.

| Prop          | Type                     | Required |
| ------------- | ------------------------ | -------- |
| `logo`        | image                    |          |
| `logoUrl`     | url                      |          |
| `siteName`    | string                   |          |
| `tagline`     | string                   |          |
| `copyright`   | string                   |          |
| `columnCount` | enum(2, 3, 4, 5)         |          |
| `variant`     | enum(dark, light, white) |          |

Slots: `linkColumns`, `social`, `legal`

### `social-links` — Social Links

Row of social profile icons with built-in LinkedIn, X, YouTube, Facebook and
Instagram marks. Leave a URL empty to hide that network. Used in Site Footer and
contact pages - no image uploads needed.

| Prop           | Type                | Required |
| -------------- | ------------------- | -------- |
| `linkedinUrl`  | url                 |          |
| `xUrl`         | url                 |          |
| `youtubeUrl`   | url                 |          |
| `facebookUrl`  | url                 |          |
| `instagramUrl` | url                 |          |
| `size`         | enum(small, medium) |          |

Slots: none

### `search-form` — Search Form

Accessible search input that submits to a results page by GET. Use in Site
Header actions, on a search landing page, or above a listing. It does not filter
content on the client - pair it with Filter Bar for in-page filtering.

| Prop          | Type                       | Required |
| ------------- | -------------------------- | -------- |
| `action`      | url                        |          |
| `fieldName`   | string                     |          |
| `placeholder` | string                     |          |
| `label`       | string                     |          |
| `buttonLabel` | string                     |          |
| `size`        | enum(small, medium, large) |          |

Slots: none

### `breadcrumb` — Breadcrumb

Trail of ancestor links showing where the current page sits. Fill the items slot
with Breadcrumb Item components, marking the last one as current. Drop it into
the breadcrumb slot of Page Banner or place it directly above content.

| Prop    | Type   | Required |
| ------- | ------ | -------- |
| `label` | string |          |

Slots: `items`

### `breadcrumb-item` — Breadcrumb Item

One step in a Breadcrumb trail. Set Current on the final item so it renders as
plain text with aria-current instead of a link.

| Prop      | Type    | Required |
| --------- | ------- | -------- |
| `label`   | string  | yes      |
| `url`     | url     |          |
| `current` | boolean |          |

Slots: none

---

## Page sections — marketing bands

### `hero` — Hero

Top-of-page banner in three layouts - centered copy, split copy plus
image/video, or copy over a darkened background photo. Put Button components in
the actions slot rather than using CTA label and URL props. Use Page Banner for
short interior page titles instead of shrinking this one.

| Prop              | Type                              | Required |
| ----------------- | --------------------------------- | -------- |
| `layout`          | enum(centered, split, backdrop)   |          |
| `eyebrow`         | string                            |          |
| `title`           | string                            | yes      |
| `body`            | rich text                         |          |
| `image`           | image                             |          |
| `videoUrl`        | url                               |          |
| `backgroundImage` | image                             |          |
| `background`      | enum(white, light, dark, primary) |          |
| `height`          | enum(auto, medium, tall)          |          |

Slots: `actions`

### `page-banner` — Page Banner

Compact interior page header - page title, optional eyebrow, intro and
breadcrumb, with an optional background photograph. Use this on every page below
the homepage; reserve Hero for landing and campaign pages.

| Prop              | Type                              | Required |
| ----------------- | --------------------------------- | -------- |
| `eyebrow`         | string                            |          |
| `title`           | string                            | yes      |
| `intro`           | rich text                         |          |
| `backgroundImage` | image                             |          |
| `background`      | enum(white, light, dark, primary) |          |
| `align`           | enum(left, center)                |          |

Slots: `breadcrumb`

### `section-heading` — Section Heading

Eyebrow, title and intro paragraph used to open a page band. Pair it with Grid
Container or any content component instead of repeating headline/intro props on
every section component in the library.

| Prop           | Type                             | Required |
| -------------- | -------------------------------- | -------- |
| `eyebrow`      | string                           |          |
| `title`        | string                           | yes      |
| `intro`        | rich text                        |          |
| `align`        | enum(left, center)               |          |
| `size`         | enum(medium, large, extra_large) |          |
| `headingLevel` | enum(h1, h2, h3)                 |          |

Slots: none

### `card-grid` — Card Grid

The workhorse content band - optional eyebrow/title/intro above a responsive
grid of any card components, with an optional row of actions underneath. This
one component replaces the feature grid, capability grid, solutions grid,
resources grid, story grid and product grid patterns; put Card, Feature Card,
Stat Card, Article Card, Story Card, Resource Card, Person Card or CTA Tile
components into its items slot.

| Prop          | Type                                    | Required |
| ------------- | --------------------------------------- | -------- |
| `eyebrow`     | string                                  |          |
| `title`       | string                                  |          |
| `intro`       | rich text                               |          |
| `columnCount` | enum(2, 3, 4)                           |          |
| `align`       | enum(left, center)                      |          |
| `background`  | enum(none, white, light, dark, primary) |          |

Slots: `items`, `actions`

### `feature-card` — Feature Card

Icon, title and short body describing a single capability or benefit. Lighter
than Card - no cover image, designed to sit three or four across inside a Card
Grid.

| Prop        | Type                          | Required |
| ----------- | ----------------------------- | -------- |
| `icon`      | image                         |          |
| `title`     | string                        | yes      |
| `body`      | rich text                     |          |
| `url`       | url                           |          |
| `linkLabel` | string                        |          |
| `variant`   | enum(plain, bordered, filled) |          |
| `align`     | enum(left, center)            |          |

Slots: none

### `feature-split` — Feature Split

Copy on one side, image or embedded video on the other. Stack several of these
and flip Media Position between instances to build the classic alternating
feature story - that is why there is no separate alternating-features component
in this library.

| Prop            | Type                                    | Required |
| --------------- | --------------------------------------- | -------- |
| `eyebrow`       | string                                  |          |
| `title`         | string                                  | yes      |
| `body`          | rich text                               |          |
| `image`         | image                                   |          |
| `videoUrl`      | url                                     |          |
| `mediaPosition` | enum(start, end)                        |          |
| `background`    | enum(none, white, light, dark, primary) |          |

Slots: `actions`

### `cta-banner` — CTA Banner

Full-width conversion band - headline, supporting line and one or two buttons on
a coloured or photographic panel. This is the single component for every "book a
demo", "talk to us" and "start free" band; put Button components in the actions
slot.

| Prop              | Type                                | Required |
| ----------------- | ----------------------------------- | -------- |
| `title`           | string                              | yes      |
| `eyebrow`         | string                              |          |
| `body`            | rich text                           |          |
| `backgroundImage` | image                               |          |
| `background`      | enum(light, dark, primary, outline) |          |
| `layout`          | enum(centered, inline)              |          |

Slots: `actions`

### `cta-tile` — CTA Tile

Fully clickable promotional tile with an arrow affordance, optionally over a
photograph. Put two to four inside a Card Grid to build a "where to next" band
at the end of a page.

| Prop              | Type                                | Required |
| ----------------- | ----------------------------------- | -------- |
| `title`           | string                              | yes      |
| `body`            | rich text                           |          |
| `url`             | url                                 | yes      |
| `linkLabel`       | string                              |          |
| `icon`            | image                               |          |
| `backgroundImage` | image                               |          |
| `tone`            | enum(light, dark, primary, outline) |          |

Slots: none

### `stat-card` — Stat Card

One big number with a label and optional supporting line. Put three or four
inside a Card Grid to build a results, impact or proof-point band - that
combination replaces the separate stats-row and results components.

| Prop          | Type                | Required |
| ------------- | ------------------- | -------- |
| `value`       | string              | yes      |
| `prefix`      | string              |          |
| `suffix`      | string              |          |
| `label`       | string              |          |
| `description` | string              |          |
| `size`        | enum(medium, large) |          |
| `align`       | enum(left, center)  |          |
| `bordered`    | boolean             |          |

Slots: none

### `logo-wall` — Logo Wall

Social-proof band of customer or partner logos, optionally desaturated so they
read as one set. Fill the logos slot with Logo Tile components. Covers the
customer-logos, trust-logos and partner-strip patterns.

| Prop          | Type                           | Required |
| ------------- | ------------------------------ | -------- |
| `title`       | string                         |          |
| `columnCount` | enum(3, 4, 5, 6)               |          |
| `background`  | enum(none, white, light, dark) |          |
| `grayscale`   | boolean                        |          |

Slots: `logos`

### `logo-tile` — Logo Tile

A single logo, size-capped so it sits evenly beside others regardless of the
source file's dimensions. Optionally links to the customer or partner. Belongs
in the logos slot of Logo Wall.

| Prop     | Type                       | Required |
| -------- | -------------------------- | -------- |
| `logo`   | image                      | yes      |
| `url`    | url                        |          |
| `height` | enum(small, medium, large) |          |

Slots: none

### `testimonial-card` — Testimonial Card

A customer quote with attribution, optional headshot and company logo. Use one
on its own as a pull quote, several inside a Card Grid, or inside Testimonial
Carousel for a rotating set.

| Prop          | Type                                | Required |
| ------------- | ----------------------------------- | -------- |
| `quote`       | rich text                           | yes      |
| `authorName`  | string                              |          |
| `authorTitle` | string                              |          |
| `authorImage` | image                               |          |
| `companyLogo` | image                               |          |
| `variant`     | enum(plain, bordered, filled, dark) |          |
| `size`        | enum(medium, large)                 |          |

Slots: none

### `carousel` — Carousel

Horizontally sliding band that shows one to three items at a time with previous
and next controls. Put any card components in the slides slot - this single
component covers the testimonial carousel, story carousel, product carousel and
hero slider patterns.

| Prop            | Type                                    | Required |
| --------------- | --------------------------------------- | -------- |
| `title`         | string                                  |          |
| `intro`         | rich text                               |          |
| `slidesPerView` | enum(1, 2, 3)                           |          |
| `background`    | enum(none, white, light, dark, primary) |          |
| `showArrows`    | boolean                                 |          |

Slots: `slides`

### `accordion` — Accordion

Titled band of collapsible rows - the component behind every FAQ section, "what
is included" list and long-form disclosure block. Fill the items slot with
Accordion Item components. There is no separate FAQ component; this is it.

| Prop         | Type                           | Required |
| ------------ | ------------------------------ | -------- |
| `title`      | string                         |          |
| `intro`      | rich text                      |          |
| `background` | enum(none, white, light, dark) |          |
| `width`      | enum(narrow, wide)             |          |

Slots: `items`

### `accordion-item` — Accordion Item

One question-and-answer row inside an Accordion. The answer is rich text, so it
can hold paragraphs, lists and links. Set Default Open on at most one item per
accordion.

| Prop          | Type      | Required |
| ------------- | --------- | -------- |
| `question`    | string    | yes      |
| `answer`      | rich text | yes      |
| `defaultOpen` | boolean   |          |

Slots: none

### `tabs` — Tabs

Tabbed band that shows one panel at a time. Fill the panels slot with Tab Panel
components - each panel's Label prop becomes its tab button. Use for
by-industry, by-role or by-product content that would otherwise make a page very
long.

| Prop         | Type                           | Required |
| ------------ | ------------------------------ | -------- |
| `title`      | string                         |          |
| `intro`      | rich text                      |          |
| `background` | enum(none, white, light, dark) |          |
| `align`      | enum(left, center)             |          |

Slots: `panels`

### `tab-panel` — Tab Panel

One panel inside a Tabs component. The Label prop is the text on the tab button;
title, body and image are what shows when it is selected. Use the content slot
when a panel needs to hold other components rather than plain copy.

| Prop    | Type      | Required |
| ------- | --------- | -------- |
| `label` | string    | yes      |
| `title` | string    |          |
| `body`  | rich text |          |
| `image` | image     |          |

Slots: `content`, `actions`

### `video-embed` — Video Embed

Responsive 16:9 video frame for a YouTube or Vimeo embed URL, with an optional
poster image that defers loading the player until someone clicks play. Use the
embed URL (youtube.com/embed/ID), not the watch URL.

| Prop          | Type                        | Required |
| ------------- | --------------------------- | -------- |
| `videoUrl`    | url                         | yes      |
| `title`       | string                      |          |
| `caption`     | rich text                   |          |
| `posterImage` | image                       |          |
| `width`       | enum(narrow, content, wide) |          |

Slots: none

### `newsletter-signup` — Newsletter Signup

Email capture band - headline, supporting line and a single email field posting
to your list provider or a Canvas form endpoint. For anything needing more than
an email address, use Contact Form instead.

| Prop             | Type                       | Required |
| ---------------- | -------------------------- | -------- |
| `title`          | string                     | yes      |
| `body`           | rich text                  |          |
| `action`         | url                        |          |
| `emailFieldName` | string                     |          |
| `placeholder`    | string                     |          |
| `buttonLabel`    | string                     |          |
| `consentText`    | string                     |          |
| `background`     | enum(light, dark, primary) |          |
| `layout`         | enum(inline, stacked)      |          |

Slots: none

### `contact-form` — Contact Form

Standard enquiry form - name, work email, optional company and phone, plus a
message box - with an aside slot for office details, a map or trust logos. Wire
the Action prop to a Canvas form endpoint or your marketing automation handler.
For email-only capture use Newsletter Signup.

| Prop           | Type                           | Required |
| -------------- | ------------------------------ | -------- |
| `title`        | string                         | yes      |
| `intro`        | rich text                      |          |
| `action`       | url                            |          |
| `submitLabel`  | string                         |          |
| `messageLabel` | string                         |          |
| `showCompany`  | boolean                        |          |
| `showPhone`    | boolean                        |          |
| `consentText`  | string                         |          |
| `background`   | enum(none, white, light, dark) |          |

Slots: `aside`

### `step-list` — Step List

Ordered how-it-works or method band. Numbers its Step Item children
automatically, so authors never type "1." into a title. Covers process
explainers, onboarding flows and recipe-method style instructions.

| Prop         | Type                           | Required |
| ------------ | ------------------------------ | -------- |
| `title`      | string                         |          |
| `intro`      | rich text                      |          |
| `layout`     | enum(vertical, horizontal)     |          |
| `numbered`   | boolean                        |          |
| `background` | enum(none, white, light, dark) |          |

Slots: `steps`

### `step-item` — Step Item

One step inside a Step List. The number is supplied by the parent, so this
component only owns the step title, explanation and an optional illustration.

| Prop    | Type      | Required |
| ------- | --------- | -------- |
| `title` | string    | yes      |
| `body`  | rich text |          |
| `image` | image     |          |

Slots: none

### `spec-list` — Spec List

Label-and-value list for structured detail - technical specifications,
ingredients, event facts, pricing inclusions or entity metadata. Fill the items
slot with Spec Item components.

| Prop          | Type                           | Required |
| ------------- | ------------------------------ | -------- |
| `title`       | string                         |          |
| `columnCount` | enum(1, 2)                     |          |
| `variant`     | enum(plain, divided, bordered) |          |

Slots: `items`

### `spec-item` — Spec Item

One label-and-value row inside a Spec List. Keep the label short - it renders in
a fixed-width column so a set of these lines up cleanly.

| Prop    | Type   | Required |
| ------- | ------ | -------- |
| `label` | string | yes      |
| `value` | string | yes      |

Slots: none

### `data-table` — Data Table

Scrollable comparison or reference table. Authors type headers separated by
pipes and one row per line, also pipe separated - no HTML table markup and no
array-of-object props. Use for pricing comparisons, feature matrices,
conformance tables, directories and specification listings.

| Prop      | Type      | Required |
| --------- | --------- | -------- |
| `title`   | string    |          |
| `intro`   | rich text |          |
| `headers` | string    | yes      |
| `rows`    | string    | yes      |
| `caption` | string    |          |
| `striped` | boolean   |          |
| `compact` | boolean   |          |

Slots: none

---

## Content — cards, listings and data

### `card` — Card

General purpose content card - optional image, eyebrow, title, body and either a
link label or composed action buttons. This is the default card for grids; use
Article Card, Story Card, Resource Card, Person Card or Stat Card only when
their extra metadata is genuinely needed.

| Prop         | Type                                          | Required |
| ------------ | --------------------------------------------- | -------- |
| `image`      | image                                         |          |
| `eyebrow`    | string                                        |          |
| `title`      | string                                        | yes      |
| `body`       | rich text                                     |          |
| `url`        | url                                           |          |
| `linkLabel`  | string                                        |          |
| `variant`    | enum(plain, bordered, elevated, filled, dark) |          |
| `horizontal` | boolean                                       |          |

Slots: `actions`

### `article-card` — Article Card

Teaser for one article, blog post or news item - image, category, title, summary
and byline metadata. Put several in a Card Grid for a manually curated list, or
use News Feed when the list should come from Drupal automatically.

| Prop          | Type                            | Required |
| ------------- | ------------------------------- | -------- |
| `title`       | string                          | yes      |
| `url`         | url                             | yes      |
| `summary`     | string                          |          |
| `image`       | image                           |          |
| `category`    | string                          |          |
| `date`        | string                          |          |
| `author`      | string                          |          |
| `readingTime` | string                          |          |
| `variant`     | enum(plain, bordered, elevated) |          |
| `layout`      | enum(vertical, horizontal)      |          |

Slots: none

### `article-body` — Article Body

Full reading layout for one article, blog post, news item or case study - title,
standfirst, byline, hero image and rich body copy at a comfortable measure. Use
this as the main component in a content template for article-style content
types; the aside and footer slots take pull quotes, CTAs or Related Articles.

| Prop          | Type      | Required |
| ------------- | --------- | -------- |
| `title`       | string    | yes      |
| `standfirst`  | string    |          |
| `body`        | rich text |          |
| `heroImage`   | image     |          |
| `category`    | string    |          |
| `date`        | string    |          |
| `authorName`  | string    |          |
| `authorTitle` | string    |          |
| `authorImage` | image     |          |
| `readingTime` | string    |          |

Slots: `aside`, `footer`

### `story-card` — Story Card

Customer story teaser - logo or customer name, headline, summary and one
headline result figure. Use for case-study grids and customer-spotlight bands;
for a pure quote use Testimonial Card, for editorial content use Article Card.

| Prop           | Type                                  | Required |
| -------------- | ------------------------------------- | -------- |
| `customerName` | string                                |          |
| `logo`         | image                                 |          |
| `image`        | image                                 |          |
| `headline`     | string                                | yes      |
| `summary`      | rich text                             |          |
| `statValue`    | string                                |          |
| `statLabel`    | string                                |          |
| `url`          | url                                   | yes      |
| `linkLabel`    | string                                |          |
| `variant`      | enum(plain, bordered, elevated, dark) |          |

Slots: none

### `resource-card` — Resource Card

Downloadable asset teaser - report, whitepaper, datasheet or guide - with cover
thumbnail, format, file size and a gated flag. Put several in a Card Grid to
build a resource centre, or in Data Table for a dense document library.

| Prop           | Type                          | Required |
| -------------- | ----------------------------- | -------- |
| `title`        | string                        | yes      |
| `url`          | url                           | yes      |
| `summary`      | string                        |          |
| `resourceType` | string                        |          |
| `coverImage`   | image                         |          |
| `fileFormat`   | string                        |          |
| `fileSize`     | string                        |          |
| `gated`        | boolean                       |          |
| `linkLabel`    | string                        |          |
| `variant`      | enum(plain, bordered, filled) |          |

Slots: none

### `person-card` — Person Card

One person - photo, name, role, short bio and contact links. Use inside a Card
Grid for leadership, team, speaker, author or advisory board pages.

| Prop          | Type                  | Required |
| ------------- | --------------------- | -------- |
| `name`        | string                | yes      |
| `role`        | string                |          |
| `photo`       | image                 |          |
| `bio`         | rich text             |          |
| `email`       | string                |          |
| `linkedinUrl` | url                   |          |
| `url`         | url                   |          |
| `align`       | enum(left, center)    |          |
| `photoShape`  | enum(rounded, circle) |          |

Slots: none

### `event-card` — Event Card

One event, webinar or session - date badge, format, location and summary. With
no image it shows a coloured date chip, which is what makes a list of these
scannable. Use inside a Card Grid for an events listing.

| Prop        | Type                          | Required |
| ----------- | ----------------------------- | -------- |
| `title`     | string                        | yes      |
| `url`       | url                           | yes      |
| `startDate` | string                        |          |
| `endDate`   | string                        |          |
| `timeLabel` | string                        |          |
| `location`  | string                        |          |
| `format`    | string                        |          |
| `summary`   | string                        |          |
| `image`     | image                         |          |
| `ctaLabel`  | string                        |          |
| `variant`   | enum(plain, bordered, filled) |          |

Slots: none

### `product-card` — Product Card

Commerce or catalogue item - square image, name, price with optional strike-
through comparison price, and a promotional badge. Use inside Card Grid for a
product listing or inside Carousel for a featured row.

| Prop             | Type                            | Required |
| ---------------- | ------------------------------- | -------- |
| `name`           | string                          | yes      |
| `image`          | image                           |          |
| `price`          | string                          |          |
| `compareAtPrice` | string                          |          |
| `description`    | rich text                       |          |
| `badgeLabel`     | string                          |          |
| `url`            | url                             |          |
| `ctaLabel`       | string                          |          |
| `variant`        | enum(plain, bordered, elevated) |          |

Slots: none

### `location-card` — Location Card

Office, dealer, campus or store details - address, phone, email, opening hours
and a map link. Put several in a Card Grid to build an offices page or dealer
directory, or drop one into the aside slot of Contact Form.

| Prop           | Type                          | Required |
| -------------- | ----------------------------- | -------- |
| `name`         | string                        | yes      |
| `addressLines` | string                        |          |
| `phone`        | string                        |          |
| `email`        | string                        |          |
| `hours`        | string                        |          |
| `mapUrl`       | url                           |          |
| `image`        | image                         |          |
| `variant`      | enum(plain, bordered, filled) |          |

Slots: none

### `news-feed` — News Feed

Live listing of Drupal content pulled over JSON:API and rendered as Article
Cards - the automatic counterpart to hand-placing cards in a Card Grid. Point
Entity Type at any node bundle (node--article, node--news, node--case_study) and
adjust the image and summary field names to match that bundle. Requires JSON:API
to be enabled on the site; it shows a skeleton while loading and an explicit
empty state when nothing is returned.

| Prop           | Type                            | Required |
| -------------- | ------------------------------- | -------- |
| `title`        | string                          |          |
| `intro`        | rich text                       |          |
| `entityType`   | string                          |          |
| `imageField`   | string                          |          |
| `summaryField` | string                          |          |
| `sortField`    | string                          |          |
| `itemCount`    | integer                         |          |
| `columnCount`  | enum(1, 2, 3, 4)                |          |
| `cardVariant`  | enum(plain, bordered, elevated) |          |
| `background`   | enum(none, white, light, dark)  |          |
| `viewAllLabel` | string                          |          |
| `viewAllUrl`   | url                             |          |

Slots: none

### `related-articles` — Related Articles

"More like this" band for the bottom of an article page. Pulls recent content of
the same bundle over JSON:API and excludes the node currently being viewed, so
it is only meaningful inside a content template or on a node page. Renders
nothing when there is nothing else to show. For a listing that is not tied to
the current node, use News Feed.

| Prop          | Type          | Required |
| ------------- | ------------- | -------- |
| `title`       | string        |          |
| `entityType`  | string        |          |
| `imageField`  | string        |          |
| `itemCount`   | integer       |          |
| `columnCount` | enum(2, 3, 4) |          |

Slots: none

### `pagination` — Pagination

Page links for a long listing, with first/last always visible and an ellipsis in
between. Links are plain URLs with a query parameter, so it works with
server-rendered listings and with News Feed.

| Prop            | Type    | Required |
| --------------- | ------- | -------- |
| `currentPage`   | integer | yes      |
| `totalPages`    | integer | yes      |
| `baseUrl`       | url     |          |
| `pageParam`     | string  |          |
| `previousLabel` | string  |          |
| `nextLabel`     | string  |          |

Slots: none

### `filter-bar` — Filter Bar

Search-and-filter row above a listing. Submits as a GET form so the filtered
state lives in the URL and is shareable and cacheable. Put Filter Select
components in the filters slot - one per facet.

| Prop                | Type    | Required |
| ------------------- | ------- | -------- |
| `action`            | url     |          |
| `searchFieldName`   | string  |          |
| `searchPlaceholder` | string  |          |
| `showSearch`        | boolean |          |
| `submitLabel`       | string  |          |
| `resultCountLabel`  | string  |          |
| `sticky`            | boolean |          |

Slots: `filters`

### `filter-select` — Filter Select

One dropdown facet inside a Filter Bar. Enter the choices one per line in the
Options field - values are slugified automatically, so "Financial services"
submits as financial-services.

| Prop        | Type   | Required |
| ----------- | ------ | -------- |
| `label`     | string | yes      |
| `fieldName` | string | yes      |
| `options`   | string | yes      |
| `allLabel`  | string |          |

Slots: none

---

## Documentation — the library documenting itself

### `component-explorer` — Component Explorer

Filterable index of Component Spec children - live search plus family and
capability chips, with results grouped by family. The filter options are read
from the specs themselves rather than configured here, so the index never drifts
from what it lists. Use it to publish a living style guide of a component
library.

| Prop                | Type      | Required |
| ------------------- | --------- | -------- |
| `title`             | string    |          |
| `intro`             | rich text |          |
| `searchPlaceholder` | string    |          |
| `emptyMessage`      | string    |          |
| `groupByFamily`     | boolean   |          |

Slots: `components`

### `component-spec` — Component Spec

One entry in a Component Explorer - a collapsible card documenting a single
component's name, machine name, description, props, slots, mocks and source.
Props are entered as pipe-separated rows exactly like Data Table, and Code Block
children in the sources slot become the source tabs. The explorer reads this
component's props to filter and search, so keep Family and Capabilities filled
in.

| Prop            | Type      | Required |
| --------------- | --------- | -------- |
| `componentName` | string    | yes      |
| `componentId`   | string    | yes      |
| `family`        | string    |          |
| `description`   | rich text |          |
| `propsTable`    | string    |          |
| `slotNames`     | string    |          |
| `mockNames`     | string    |          |
| `usedOn`        | string    |          |
| `capabilities`  | string    |          |
| `defaultOpen`   | boolean   |          |

Slots: `sources`

### `code-block` — Code Block

Syntax-highlighted source listing with a filename caption, line numbers and a
copy button. Highlighting is done in the component with no external library, so
it works offline and inside Canvas. Use for documentation, developer guides and
the Component Spec source tabs.

| Prop              | Type                             | Required |
| ----------------- | -------------------------------- | -------- |
| `code`            | string                           | yes      |
| `language`        | enum(jsx, yaml, json, css, bash) |          |
| `filename`        | string                           |          |
| `showLineNumbers` | boolean                          |          |
| `maxHeight`       | enum(none, medium, tall)         |          |

Slots: none
