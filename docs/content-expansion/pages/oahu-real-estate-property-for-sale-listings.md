# Oahu Real Estate Listings | Hawaii Military Realty

## Page identity

- Route: `oahu-real-estate/oahu-realestate.html`
- Key: `oahu-real-estate-property-for-sale-listings`
- Collection: `evergreenPages`
- Source of work product: `src/content-seo.js`

## Search intent and audience

This page is for buyers who are still comparing Oahu at the island level and need a practical way to move from broad search results into the right neighborhoods.

## Existing-content assessment

The current generated expansion is a starting point. Review it for generic passages, unsupported specifics, shallow local context, and overlap with other pages before writing. Preserve the route and data shape.

## Required coverage

- Deliver a durable topical resource with at least 900 substantive content words.
- Address Oahu-specific decisions, risks, comparisons, and next steps for this query.
- Provide page-specific introductions, sections, FAQs, CTA, and three intentional related links.
- Follow every shared rule in `../CONTEXT.md` and do not edit `src/content.js`.

## Research log

| URL | Publisher | Supported claim | Accessed |
|---|---|---|---|
| https://realproperty.honolulu.gov/media/w0raxxka/review-records_120224.pdf | City and County of Honolulu Real Property Assessment Division | Oahu parcel records can be searched by address or TMK and include assessment, tax, classification, land, and building-improvement information. | 2026-08-01 |
| https://www.honolulu.gov/dpp/home/faq/ | City and County of Honolulu Department of Planning and Permitting | A TMK identifies an Oahu parcel; DPP provides an address-based GIS path and permit guidance for property research. | 2026-08-01 |
| https://fhat.hawaii.gov/ | State of Hawaiʻi National Flood Insurance Program | The official Flood Hazard Assessment Tool provides address-level flood-hazard map research and related map layers. | 2026-08-01 |
| https://dod.hawaii.gov/hiema/tsunami-evacuation-zones/ | Hawaiʻi Emergency Management Agency | Official tsunami evacuation maps cover Oahu; evacuation boundaries are minimum guidelines and do not eliminate locally generated tsunami risk. | 2026-08-01 |
| https://cca.hawaii.gov/reb/files/2021/04/REC_Condo_Buyer_Checklist.pdf | Hawaiʻi Real Estate Commission, Department of Commerce and Consumer Affairs | Condominium buyers should review governing documents, budgets, reserves, insurance, minutes, assessments, litigation, and other association information. | 2026-08-01 |
| https://www.va.gov/housing-assistance/home-loans/home-buying-process/ | U.S. Department of Veterans Affairs | A VA appraisal is not the same as a home inspection. | 2026-08-01 |

Add authoritative sources during the iteration. Do not mark the page complete with an empty research log.

## Completion record

- Status: complete
- Build: passed
- Completed date: 2026-08-01
- Summary: Replaced the generic islandwide overview with a 1,500-plus-word buyer workflow covering route-based area selection, property-type and all-in-cost comparisons, parcel and permit research, condominium documents, hazard and insurance checks, remote touring, and offer preparation.
- Verification notes: Six authoritative primary sources recorded; 5 sections, 6 FAQs, and 3 intentional related links; `node scripts/validate-content-expansion.js` and `node scripts/build-content.js` passed; `build/oahu-real-estate/oahu-realestate.html` confirmed.
