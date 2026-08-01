# Mortgage Calculator | Hawaii Military Realty

## Page identity

- Route: `buyers/mortgage-calculator.html`
- Key: `mortgage-calculator`
- Collection: `evergreenPages`
- Source of work product: `src/content-seo.js`

## Search intent and audience

This page is for buyers who want rough payment context before they get attached to a listing or commit to a specific price range.

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
| https://www.consumerfinance.gov/owning-a-home/loan-estimate/ | Consumer Financial Protection Bureau | A Loan Estimate identifies principal and interest, estimated total monthly payment, taxes, insurance, assessments, closing costs, and estimated cash to close; lender credits may trade lower upfront cost for a higher rate. | 2026-08-01 |
| https://www.consumerfinance.gov/ask-cfpb/on-a-mortgage-whats-the-difference-between-my-principal-and-interest-payment-and-my-total-monthly-payment-en-1941/ | Consumer Financial Protection Bureau | Total monthly payment commonly includes taxes, homeowners insurance, and possibly mortgage insurance in addition to principal and interest; costs not escrowed must still be budgeted and paid directly. | 2026-08-01 |
| https://realproperty.honolulu.gov/media/a0onfffn/information-guide-rev-2026-06-26-85x14-v2.pdf | City and County of Honolulu Real Property Assessment Division | Honolulu real property tax is calculated from net taxable value and the applicable property classification and rate; exemptions affect net taxable value and the tax year runs July 1 through June 30. | 2026-08-01 |
| https://www.fema.gov/sites/default/files/documents/fema_flood-insurance_realtors-clients-before-closing_2016.pdf | Federal Emergency Management Agency | Buyers can check an address in FEMA's Map Service Center; federally regulated or insured lenders require flood insurance for buildings in mapped high-risk A or V zones. | 2026-08-01 |
| https://www.va.gov/housing-assistance/home-loans/funding-fee-and-closing-costs/ | U.S. Department of Veterans Affairs | VA loans do not require monthly mortgage insurance; the funding fee is generally a one-time charge unless exempt, may be paid or financed, varies by stated factors, and is the only purchase-loan closing charge VA permits to be financed. | 2026-08-01 |

Add authoritative sources during the iteration. Do not mark the page complete with an empty research log.

## Completion record

- Status: complete
- Build: passed
- Completed date: 2026-08-01
- Summary: Replaced the generic calculator expansion with an original Oahu payment-planning guide covering calculation inputs, Honolulu property tax, property-specific insurance and flood review, association costs, cash to close, VA funding-fee treatment, scenario comparison, and search decisions.
- Verification notes: Exceeds the 900-word evergreen minimum with three introductory paragraphs, an audience-specific sidebar, five substantive sections, six FAQs, a page-specific CTA, and three intentional related links. `node scripts/validate-content-expansion.js` and `node scripts/build-content.js` passed; `build/buyers/mortgage-calculator.html` exists.
