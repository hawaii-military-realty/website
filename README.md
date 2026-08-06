# Hawaii Military Realty, Inc.

Static site for Hawaii Military Realty.

## Generated Content

All public pages are generated from source content and templates into `build/`.

```bash
node scripts/build-content.js
```

Use `src/content.js` for general site content, including header and footer links, core pages, team details, and agent profiles. Use `src/content-seo.js` for the legacy/SEO page definitions and the logic that builds and interlinks them. Use `src/templates/` for page structure, markup, classes, SVGs, and reusable partials. Generated publish files include:

- `build/index.html`
- `build/about.html`
- `build/team.html`
- `build/agents/*.html`
- the 19 evergreen pages listed under [Evergreen Pages](#evergreen-pages)
- the 18 property pages listed under [Property Pages](#property-pages)

`src/` is the source tree. `build/` is ignored by git and is what GitHub Pages publishes.

## Preview

```bash
./preview.sh
```

The preview script rebuilds `build/` and serves it locally with an extensionless rewrite layer, so routes like `/about` and `/category/va-loan-information` resolve to `about.html` and `category/va-loan-information.html` during development.

## Content Expansion Harness

The Ralph loop expands only the 19 evergreen and 18 property pages owned by `src/content-seo.js`. It explicitly excludes `src/content.js` and all top-header pages.

```bash
./scripts/ralph-content.sh --dry-run
./scripts/ralph-content.sh
```

Use `--max-iterations N` to cap an unattended run. The queue, shared rules, and individual page briefs live in `docs/content-expansion/`. Validate the harness with `node scripts/validate-content-expansion.js` and test its inventory guards with `node scripts/test-content-expansion-harness.js`.

## Legacy URL Inventory

The report-derived public URLs below are preserved as extensionless pages on [hawaiimilitaryrealty.com](https://hawaiimilitaryrealty.com). The generated files in `build/` use the same paths with `.html`.

### Core Pages

- [Hawaii Real Estate and Military Homes presented by David Kucic](https://hawaiimilitaryrealty.com)
- [Who Are David and Tonya?](https://hawaiimilitaryrealty.com/about)

### Evergreen SEO Backfill Pages

- [Ewa Beach Real Estate Hawaii Listings](https://hawaiimilitaryrealty.com/ewa-beach-real-estate)
- [Our Cooperating Broker Commissions](https://hawaiimilitaryrealty.com/our-cooperating-broker-commissions)
- [Hawaii VA Homebuying Video](https://hawaiimilitaryrealty.com/buyers/hawaii-va-homebuying-video)
- [New Home Construction](https://hawaiimilitaryrealty.com/new-home-constructionewa-beach)
- [Oahu Real Estate Property for Sale Listings | Real Estate Oahu](https://hawaiimilitaryrealty.com/oahu-real-estate/oahu-realestate)
- [Hawaii Military Lodging](https://hawaiimilitaryrealty.com/military-real-estate-hawaii/hawaii-military-lodging)
- [VA Loan Information](https://hawaiimilitaryrealty.com/category/va-loan-information)
- [Mortgage Calculator](https://hawaiimilitaryrealty.com/buyers/mortgage-calculator)
- [Hawaii Bases and Barracks](https://hawaiimilitaryrealty.com/military-real-estate-hawaii/hawaii-bases-and-barracks)
- [Hawaii Golf Courses](https://hawaiimilitaryrealty.com/resources/hawaii-golf-courses)
- [Mililani Real Estate](https://hawaiimilitaryrealty.com/category/mililani-real-estate)
- [VA Home Buying in Hawaii](https://hawaiimilitaryrealty.com/category/va-home-buying-in-hawaii)
- [Ewa Beach Real Estate](https://hawaiimilitaryrealty.com/category/ewa-beach-real-estate)
- [Opportune Lift Program (OPLIFT)](https://hawaiimilitaryrealty.com/military-real-estate-hawaii/oplift)
- [The Right Down Payment on Hawaii Home](https://hawaiimilitaryrealty.com/buyers/are-you-making-the-right-down-payment)
- [Hawaii Real Estate News](https://hawaiimilitaryrealty.com/resources/hawaii-real-estate-news)
- [Hawaii Military Realty, Inc.](https://hawaiimilitaryrealty.com/uncategorized/hawaii-military-realty-inc)
- [Kapolei Real Estate Listings and Information](https://hawaiimilitaryrealty.com/kapolei-real-estate-2/kapolei-real-estate)
- [Hawaii Commissaries](https://hawaiimilitaryrealty.com/military-real-estate-hawaii/hawaii-commissaries)

### Property and Rental SEO Backfill Pages

- [POOL Home for Sale in Ka Makana at Hoakalei in Ewa Beach, Hawaii](https://hawaiimilitaryrealty.com/featured/pool-home-for-sale-in-ka-makana-at-hoakalei-in-ewa-beach-hawaii)
- [3 Bedroom Townhouse in Makakilo](https://hawaiimilitaryrealty.com/oahu-available-rental-properties/3-bedroom-townhouse-in-makakilo)
- [3 Bedroom, 2.5 Bathroom Townhouse in Ewa Beach (Ocean Pointe)](https://hawaiimilitaryrealty.com/oahu-available-rental-properties/3-bedroom-2-5-bathroom-townhouse-in-ewa-beach-ocean-pointe)
- [2 Bedroom, 1.5 Bath Condo in Ewa Beach](https://hawaiimilitaryrealty.com/oahu-available-rental-properties/2-bedroom-1-5-bath-condo-in-ewa-beach)
- [3 Bedroom, 2 Bathroom Townhouse in Mililani Mauka](https://hawaiimilitaryrealty.com/oahu-available-rental-properties/3-bedroom-2-bathroom-townhouse-in-mililani-mauka)
- [$3,000, 4 BR, 3 BA Single Family Home in Kapolei](https://hawaiimilitaryrealty.com/oahu-available-rental-properties/4-br-3-ba-rental-in-kapolei)
- [3 BR, 1.5 Bath with Ocean Views](https://hawaiimilitaryrealty.com/oahu-available-rental-properties/3-br-1-5-bath-with-ocean-views)
- [2 BR, 2 BA with 2 Car Garage in Ewa Beach](https://hawaiimilitaryrealty.com/oahu-available-rental-properties/2-br-2-ba-with-2-car-garage-in-ewa-beach)
- [4 Bedroom, 3 Bathroom Single Family Home in Ewa Beach](https://hawaiimilitaryrealty.com/oahu-available-rental-properties/4-bedroom-3-bathroom-single-family-home-in-ewa-beach)
- [3 Bedroom, 2.5 Bathroom in Ocean Pointe](https://hawaiimilitaryrealty.com/oahu-available-rental-properties/3-bedroom-2-5-bathroom-in-ocean-pointe)
- [For Rent: 3 BR, 2 Bath Condominium in Mililani, Hawaii](https://hawaiimilitaryrealty.com/oahu-available-rental-properties/for-rent-2-br-2-ba-condominium-in-mililani-hawaii)
- [3 Bedroom, 2.5 Bath Townhouse at Fairways Edge](https://hawaiimilitaryrealty.com/oahu-available-rental-properties/3-bedroom-2-5-bath-townhouse-at-fairways-edge)
- [4 Bedroom Rental in Ewa Beach, Hawaii](https://hawaiimilitaryrealty.com/oahu-available-rental-properties/4-bedroom-2-5-bathrooms-1538-sf-in-ewa-beach-2500-per-month)
- [For Rent: 5 Bedroom Executive Home with 3 Car Garage in Ocean Pointe](https://hawaiimilitaryrealty.com/oahu-available-rental-properties/for-rent-5-bedroom-executive-home-with-3-car-garage-in-ocean-pointe)
- [For Rent: 2 BR, 2 Bath Condominium in Mililani Mauka](https://hawaiimilitaryrealty.com/oahu-available-rental-properties/for-rent-2-br-2-bath-condominium-in-mililani-mauka)
- [4 Bedroom, 3 Bath Single Family Home, 2,060 SF](https://hawaiimilitaryrealty.com/oahu-available-rental-properties/4-bedroom-3-bath-single-family-home-2060-sf)
- [2 Bedroom, 2 Bathroom Condo in Mililani](https://hawaiimilitaryrealty.com/oahu-available-rental-properties/2-bedroom-2-bathroom-condo-in-mililani)
- [2 Bedroom, 1.5 Bath Condo in Ewa Beach, $1,500 Per Month](https://hawaiimilitaryrealty.com/oahu-available-rental-properties/2-bedroom-1-5-bath-condo-in-ewa-beach-1500-per-month)
