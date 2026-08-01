# Hawaii Military Realty — Static Site

Mostly hand-coded CSS, JS, assets, plain-text content, and build templates. All public HTML pages are generated into `../build/` before publishing so copy stays DRY and page rendering does minimal browser-side work.

## Build step

Edit general site copy in **`content.js`** and legacy/SEO page copy in **`content-seo.js`**, then render the publish directory:

```bash
../build.sh
```

The build renders:

- `../build/index.html`
- `../build/about.html`
- `../build/team.html`
- `../build/agents/*.html`

Generated markup includes a comment near the top of generated pages. Do not edit generated files in `../build/` directly; update `content.js`, `content-seo.js`, or `templates/` and rebuild.

The `../build/` directory is ignored by git. GitHub Pages builds it in the workflow and publishes that directory.

## Content and templates

- **`content.js`** contains general site data: header and footer links, core page copy, agent data, contact details, nav labels, and CTA copy.
- **`content-seo.js`** contains legacy/SEO page definitions, expansion data, page-building helpers, and related-page linking logic.
- **`templates/`** contains HTML structure, classes, layout, partials, and SVG icon markup.
- **`js/site.js`** contains browser interactions only: mobile menu behavior and reveal-on-scroll.

Do not put HTML strings in `content.js`. If copy needs separate paragraphs, use arrays of plain text strings and let the build templates render the markup.

Agent ordering is controlled by the optional `sort` value in `content.js`. Agents with a numeric `sort` appear first by number; agents without a sort value appear after them alphabetically.

The About page's featured profile comes from the agent with `featured: true`.

## File layout

```text
robots.txt
content.js
content-seo.js
assets/
  *.jpg
css/styles.css
js/site.js
templates/
  layouts/
  pages/
  partials/
  icons/
```

All `.html` pages are generated into `../build/`.

## Editing global things

Open **`content.js`**:

- **`site`** — brand, phone, email, address, nav, social links, footer, and default CTA text
- **`pages`** — home, services, testimonials, contact, featured listing, and 404 copy
- **`team`**, **`about`**, and **`agents`** — team page and profile copy

Open **`templates/`** to change page structure, classes, layout, or repeated markup.

## Editing colors / design tokens

Open **`css/styles.css`** — `:root` block at the top. The active palette is Command Gold, Tactical Black, Mission Gray, Military Olive, Warm Sand, and Light Khaki.

## Performance

- No frameworks, no bundlers
- Public HTML is build-rendered from templates
- Single shared interaction script for menu and reveal effects
- Images are lazy-loaded where appropriate

## Adding a new page

1. Add core page data to `content.js`, or legacy/SEO page data to `content-seo.js`
2. Add or update the page template in `templates/pages/`
3. Add reusable markup in `templates/partials/` if needed
4. Add the nav link in `content.js` if the page belongs in the menu
5. Run `../build.sh`
6. Preview with `../preview.sh`

## Adding a new agent

1. Add the agent object to `content.js`
2. Add the profile image to `assets/`
3. Set `sort` only if the agent should appear before alphabetically sorted agents
4. Run `../build.sh`
5. Preview with `../preview.sh`
