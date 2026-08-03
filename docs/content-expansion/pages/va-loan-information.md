# VA Loan Information | Hawaii Military Realty

## Page identity

- Route: `category/va-loan-information.html`
- Key: `va-loan-information`
- Collection: `evergreenPages`
- Source of work product: `src/content-seo.js`

## Search intent and audience

This page is for active duty members, veterans, and military families who need practical VA buying context on the real estate side of the transaction.

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
| https://www.va.gov/housing-assistance/home-loans/eligibility/ | U.S. Department of Veterans Affairs | A COE verifies qualifying service; VA-backed financing also requires VA and lender credit, income, and occupancy requirements. | 2026-08-01 |
| https://www.va.gov/housing-assistance/home-loans/loan-types/purchase-loan/ | U.S. Department of Veterans Affairs | Purchase-loan eligibility includes a COE, VA and lender standards, and intended occupancy; potential benefits include no down payment when price does not exceed appraised value and no monthly PMI/MIP. | 2026-08-01 |
| https://www.va.gov/housing-assistance/home-loans/loan-limits/ | U.S. Department of Veterans Affairs | Full entitlement has no county loan limit but lender approval and appraised value still constrain the loan; county limits affect remaining entitlement calculations when entitlement is not fully available. | 2026-08-01 |
| https://www.va.gov/housing-assistance/home-loans/funding-fee-and-closing-costs/ | U.S. Department of Veterans Affairs | Funding-fee applicability, exemptions, financing options, fee factors, negotiable closing costs, and the rule that other purchase closing costs cannot be financed into the VA loan. | 2026-08-01 |
| https://www.benefits.va.gov/HOMELOANS/purchaseco_buy_process.asp | Veterans Benefits Administration | VA appraisal checks value and minimum property requirements but is not a home inspection; VA recommends inspection and outlines options when value is insufficient. | 2026-08-01 |
| https://www.benefits.va.gov/HOMELOANS/purchaseco_eligibility.asp | Veterans Benefits Administration | A VA loan may purchase a condominium unit in a VA-approved project, subject to borrower and occupancy requirements. | 2026-08-01 |

Add authoritative sources during the iteration. Do not mark the page complete with an empty research log.

## Completion record

- Status: complete
- Build: passed
- Completed date: 2026-08-01
- Summary: Replaced the generic generated copy with an original Oahu VA buyer guide covering COE and entitlement, lender approval, total monthly cost, funding fee and closing cash, condo screening, appraisal versus inspection, offer strategy, and PCS-aware checklists.
- Verification notes: `node scripts/validate-content-expansion.js` passed; `node scripts/build-content.js` passed; confirmed `build/category/va-loan-information.html` exists; final diff limited to this page's SEO definition, brief, and queue record.
