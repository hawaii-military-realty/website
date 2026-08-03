# Content Expansion Context

## Goal and scope

Turn the 37 established SEO URLs exported by `CONTENT.evergreenPages` and `CONTENT.propertyPages` in `src/content-seo.js` into useful, original, decision-grade resources. Preserve every route and the existing data interfaces.

The runtime collections are the only allowlist. Do not derive scope from the project report alone.

## Hard exclusions

Never edit `src/content.js` or create tasks for content owned by it. In particular, ignore every home-page top-header destination: `index.html`, `about.html`, `services.html`, `team.html`, `testimonials.html`, and `contact.html`. Also ignore the core featured listing, team and agent pages, navigation, footer, shared content, and other core-page definitions.

Excluded pages may be internal-link destinations. Their content must not be changed by this loop.

## Audience and voice

- Write for the specific searcher named in the page brief, not for a generic real-estate audience.
- Use direct, calm, practical language consistent with a veteran-owned Oahu brokerage.
- Explain tradeoffs and next decisions. Avoid hype, keyword stuffing, filler, and unsupported superlatives.
- Treat each property page as the beginning of a current search. Confirm availability without labeling the page by age or status; if that home is not currently offered, shift naturally to similar options that can fit the reader's orders or move timeline and comfortable budget.
- Do not provide legal, tax, lending, or military-benefit advice. Attribute consequential rules to an authoritative source and direct readers to the appropriate professional or agency.

## Research rules

- Use current primary sources whenever a claim can change: official military installations and programs, VA guidance, government housing data, county/state resources, and official community or association sources.
- Record publisher, direct URL, supported claim, and access date in the page brief before marking it complete.
- Prefer durable facts. If only secondary evidence is available, qualify the claim and record why it was used.
- Research citations are an audit trail in the brief; add a consumer-facing link only when it genuinely helps the reader.
- Never invent listing details, prices, amenities, school claims, commute times, program eligibility, or market statistics.

## Content and SEO standard

- Evergreen pages target at least 900 substantive content words; property pages target at least 650.
- Never label a property page by its age or imply that it is merely a preserved listing. Avoid language that foregrounds when the page was created. Describe the desired home and current search instead.
- Each page needs a useful description, focused hero introduction, at least three intro paragraphs, an audience-specific sidebar, at least four substantial sections, at least four FAQs, a relevant CTA, and three intentional related links.
- Make headings and paragraphs unique to the route. Shared facts may recur, but do not reuse whole paragraphs between completed pages.
- Preserve page keys, paths, canonical behavior, collection membership, and the schema consumed by `scripts/build-content.js`.
- Internal links should move readers to the next useful decision. Core pages may be linked but never edited.

## Prioritization

After completing one page, rank every remaining task again. Favor, in order: commercial/search value, severe content weakness, ability to support other pages through internal links, factual risk that merits early correction, then effort. Use unique contiguous priorities; completed rows remain in the table below all incomplete rows.

## Completion gate

A page is complete only when:

1. Its brief requirements and search intent are covered.
2. Factual claims have traceable authoritative research in the brief.
3. It meets the structural and word-count requirements without duplicate filler.
4. Related links and CTA match the reader's next action.
5. `node scripts/validate-content-expansion.js` passes after the row is marked complete.
6. `node scripts/build-content.js` succeeds and the selected output exists in `build/`.
7. The diff changes no `src/content.js` content and contains no unrelated work.

## Iteration protocol

Select one highest-priority incomplete row, read this context and its linked brief, complete and verify only that page, update the brief and queue, reprioritize remaining work, and create one commit. Never begin a second page in the same iteration. If blocked, leave it incomplete and do not commit partial copy.
