# Hawaii Military Realty, Inc.

Static site for Hawaii Military Realty.

## Generated Content

All public pages are generated from source content and templates into `build/`.

```bash
node scripts/build-content.js
```

Use `src/content.js` for plain text content only. Use `src/templates/` for page structure, markup, classes, SVGs, and reusable partials. Generated publish files include:

- `build/index.html`
- `build/about.html`
- `build/team.html`
- `build/agents/*.html`

`src/` is the source tree. `build/` is ignored by git and is what GitHub Pages publishes.

## Preview

```bash
./preview.sh
```

The preview script rebuilds `build/` and serves it locally with an extensionless rewrite layer, so routes like `/about` and `/category/va-loan-information` resolve to `about.html` and `category/va-loan-information.html` during development.

## Legacy URL Inventory

The routes below are the report-derived public URLs this project now preserves 1:1 without the root domain. GitHub Pages publishes them as extensionless routes, while the generated files in `build/` use the same paths with `.html`.

### Evergreen Pages

- `Hawaii Real Estate and Military Homes presented by David Kucic` -> `/`
- `Who Are David and Tonya?` -> `/about`
- `Ewa Beach Real Estate Hawaii Listings` -> `/ewa-beach-real-estate`
- `Our Cooperating Broker Commissions` -> `/our-cooperating-broker-commissions`
- `Hawaii VA Homebuying Video` -> `/buyers/hawaii-va-homebuying-video`
- `New Home Construction` -> `/new-home-constructionewa-beach`
- `Oahu Real Estate Property for Sale Listings | Real Estate Oahu` -> `/oahu-real-estate/oahu-realestate`
- `Hawaii Military Lodging` -> `/military-real-estate-hawaii/hawaii-military-lodging`
- `VA Loan Information` -> `/category/va-loan-information`
- `Mortgage Calculator` -> `/buyers/mortgage-calculator`
- `Hawaii Bases and Barracks` -> `/military-real-estate-hawaii/hawaii-bases-and-barracks`
- `Hawaii Golf Courses` -> `/resources/hawaii-golf-courses`
- `Mililani Real Estate` -> `/category/mililani-real-estate`
- `VA Home Buying in Hawaii` -> `/category/va-home-buying-in-hawaii`
- `Ewa Beach Real Estate` -> `/category/ewa-beach-real-estate`
- `Opportune Lift Program (OPLIFT)` -> `/military-real-estate-hawaii/oplift`
- `The Right Down Payment on Hawaii Home` -> `/buyers/are-you-making-the-right-down-payment`
- `Hawaii Real Estate News` -> `/resources/hawaii-real-estate-news`
- `Hawaii Military Realty, Inc.` -> `/uncategorized/hawaii-military-realty-inc`
- `Kapolei Real Estate Listings and Information` -> `/kapolei-real-estate-2/kapolei-real-estate`
- `Hawaii Commissaries` -> `/military-real-estate-hawaii/hawaii-commissaries`

### Property Pages

- `POOL Home for Sale in Ka Makana at Hoakalei in Ewa Beach, Hawaii` -> `/featured/pool-home-for-sale-in-ka-makana-at-hoakalei-in-ewa-beach-hawaii`
- `3 Bedroom Townhouse in Makakilo` -> `/oahu-available-rental-properties/3-bedroom-townhouse-in-makakilo`
- `3 Bedroom, 2.5 Bathroom Townhouse in Ewa Beach (Ocean Pointe)` -> `/oahu-available-rental-properties/3-bedroom-2-5-bathroom-townhouse-in-ewa-beach-ocean-pointe`
- `2 Bedroom, 1.5 Bath Condo in Ewa Beach` -> `/oahu-available-rental-properties/2-bedroom-1-5-bath-condo-in-ewa-beach`
- `3 Bedroom, 2 Bathroom Townhouse in Mililani Mauka` -> `/oahu-available-rental-properties/3-bedroom-2-bathroom-townhouse-in-mililani-mauka`
- `$3,000, 4 BR, 3 BA Single Family Home in Kapolei` -> `/oahu-available-rental-properties/4-br-3-ba-rental-in-kapolei`
- `3 BR, 1.5 Bath with Ocean Views` -> `/oahu-available-rental-properties/3-br-1-5-bath-with-ocean-views`
- `2 BR, 2 BA with 2 Car Garage in Ewa Beach` -> `/oahu-available-rental-properties/2-br-2-ba-with-2-car-garage-in-ewa-beach`
- `4 Bedroom, 3 Bathroom Single Family Home in Ewa Beach` -> `/oahu-available-rental-properties/4-bedroom-3-bathroom-single-family-home-in-ewa-beach`
- `3 Bedroom, 2.5 Bathroom in Ocean Pointe` -> `/oahu-available-rental-properties/3-bedroom-2-5-bathroom-in-ocean-pointe`
- `For Rent: 3 BR, 2 Bath Condominium in Mililani, Hawaii` -> `/oahu-available-rental-properties/for-rent-2-br-2-ba-condominium-in-mililani-hawaii`
- `3 Bedroom, 2.5 Bath Townhouse at Fairways Edge` -> `/oahu-available-rental-properties/3-bedroom-2-5-bath-townhouse-at-fairways-edge`
- `4 Bedroom Rental in Ewa Beach, Hawaii` -> `/oahu-available-rental-properties/4-bedroom-2-5-bathrooms-1538-sf-in-ewa-beach-2500-per-month`
- `For Rent: 5 Bedroom Executive Home with 3 Car Garage in Ocean Pointe` -> `/oahu-available-rental-properties/for-rent-5-bedroom-executive-home-with-3-car-garage-in-ocean-pointe`
- `For Rent: 2 BR, 2 Bath Condominium in Mililani Mauka` -> `/oahu-available-rental-properties/for-rent-2-br-2-bath-condominium-in-mililani-mauka`
- `4 Bedroom, 3 Bath Single Family Home, 2,060 SF` -> `/oahu-available-rental-properties/4-bedroom-3-bath-single-family-home-2060-sf`
- `2 Bedroom, 2 Bathroom Condo in Mililani` -> `/oahu-available-rental-properties/2-bedroom-2-bathroom-condo-in-mililani`
- `2 Bedroom, 1.5 Bath Condo in Ewa Beach, $1,500 Per Month` -> `/oahu-available-rental-properties/2-bedroom-1-5-bath-condo-in-ewa-beach-1500-per-month`
