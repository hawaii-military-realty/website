const CONTENT = require("./content.js");

function slugifyPageTitle(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\$/g, " dollar ")
    .replace(/&/g, " and ")
    .replace(/\|/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildSeoTitle(label) {
  const suffix = " | Hawaii Military Realty";

  return label.length <= 55 ? label + suffix : label;
}

function buildCanonical(path) {
  return "/" + String(path || "").replace(/\\/g, "/").replace(/^\/+/, "");
}

function uniqueKeywords(items) {
  const seen = Object.create(null);

  return (items || [])
    .reduce(function (all, item) {
      if (Array.isArray(item)) return all.concat(item);
      all.push(item);
      return all;
    }, [])
    .map(function (item) {
      return String(item || "").trim();
    })
    .filter(function (item) {
      return item.length > 0;
    })
    .filter(function (item) {
      const key = item.toLowerCase();
      if (seen[key]) return false;
      seen[key] = true;
      return true;
    });
}

function buildPageCta(title, subtitle) {
  return {
    title: title,
    subtitle: subtitle,
    note: "Call (808) 218-9338 for direct Oahu guidance.",
  };
}

function sentenceList(items) {
  const filtered = (items || []).filter(Boolean);

  if (!filtered.length) return "";
  if (filtered.length === 1) return filtered[0];
  if (filtered.length === 2) return filtered.join(" and ");

  return filtered.slice(0, -1).join(", ") + ", and " + filtered[filtered.length - 1];
}

function applyPageExpansion(page, expansion) {
  if (!expansion) return page;

  return {
    ...page,
    title: expansion.title || page.title,
    description: expansion.description || page.description,
    keywords: uniqueKeywords([page.keywords || [], expansion.keywords || []]),
    hero: {
      ...page.hero,
      eyebrow: expansion.heroEyebrow || page.hero.eyebrow,
      intro: expansion.heroIntro || page.hero.intro,
    },
    introEyebrow: expansion.introEyebrow || page.introEyebrow,
    introHeading: expansion.introHeading || page.introHeading,
    introLead: expansion.introLead || page.introLead,
    intro: expansion.intro || page.intro,
    sidebar: {
      ...page.sidebar,
      ...(expansion.sidebar || {}),
      paragraphs:
        expansion.sidebar && expansion.sidebar.paragraphs
          ? expansion.sidebar.paragraphs
          : page.sidebar.paragraphs,
      pills: uniqueKeywords([
        page.sidebar.pills || [],
        expansion.sidebar && expansion.sidebar.pills
          ? expansion.sidebar.pills
          : [],
      ]),
    },
    sections: expansion.sections || page.sections,
    faq: expansion.faq || page.faq,
    cta: expansion.cta || page.cta,
  };
}

function buildEvergreenExpansion(config) {
  return {
    description: config.description,
    keywords: config.keywords,
    heroEyebrow: config.eyebrow || "Oahu Guidance",
    heroIntro: config.heroIntro,
    introEyebrow: config.introEyebrow || "Search Intent",
    introHeading: config.introHeading || `${config.topic} guidance for ${config.audienceShort}`,
    introLead: config.introLead,
    intro: [
      `If you are on this page, you are probably ${config.intent}. The goal is to help you make a better Oahu real estate decision before you spend time on the wrong area, property type, budget range, or timeline.`,
      config.localContext,
      `Use this guide to focus on ${sentenceList(config.decisionFactors)}. Those details are what turn a broad search into a practical next step for buying, renting, selling, or relocating on Oahu.`,
    ],
    sidebar: {
      eyebrow: config.sidebarEyebrow || "Audience Fit",
      heading: config.sidebarHeading || "Who this helps most",
      paragraphs: [
        config.segment,
        config.sidebarNote,
      ],
      pills: config.pills,
    },
    sections: [
      {
        title: "Why this search matters",
        pills: uniqueKeywords([config.topic, "Search Intent", "Oahu Real Estate"]),
        paragraphs: [
          config.whyItMatters,
          `A strong answer to this search has to do more than repeat the topic. It needs to help you judge fit, timing, risk, and next steps in a market where commute, inventory, financing, and household routine can change the decision quickly.`,
        ],
      },
      {
        title: "Oahu context to consider",
        pills: uniqueKeywords(config.contextPills || ["Oahu", "Commute", "Budget", "Daily Routine"]),
        paragraphs: [
          config.oahuContext,
          `That local context is especially important for military families, remote buyers, and renters arriving under pressure. A home or rental can look right online and still be wrong once drive time, base access, association fees, school routine, and move-in timing are part of the picture.`,
        ],
      },
      {
        title: "What to compare before you act",
        pills: uniqueKeywords(config.decisionFactors),
        paragraphs: [
          `Before you move forward, compare ${sentenceList(config.decisionFactors)}. These are the practical details that usually separate a useful option from one that only looked good in search results.`,
          config.compareGuidance,
        ],
      },
      {
        title: "How to turn research into a plan",
        pills: uniqueKeywords(["Next Steps", "Local Guidance", "Decision Support"]),
        paragraphs: [
          config.nextStep,
          `The right next step depends on your timeline. Someone researching months ahead needs a clearer map of areas and costs. Someone already on orders may need fast screening, remote tours, and a short list that is realistic from the start.`,
        ],
      },
    ],
    faq: {
      eyebrow: "Common Questions",
      heading: `${config.topic} FAQs`,
      intro: `These questions reflect what ${config.audienceShort} usually need to answer before moving from research into action.`,
      items: [
        {
          question: config.faq1Question || `Who is this ${config.topic.toLowerCase()} page for?`,
          answer: config.faq1Answer || config.segment,
        },
        {
          question: "What should I pay attention to first?",
          answer: `Start with ${sentenceList(config.decisionFactors)}. Those factors usually determine whether the topic actually fits your move, purchase, rental search, or sale plan.`,
        },
        {
          question: "How does this connect to Hawaii Military Realty?",
          answer: "The page is meant to connect the search topic with practical Oahu real estate guidance, including area fit, military relocation realities, VA-aware purchase planning, rental timing, and next-step conversations.",
        },
        {
          question: "What should I do if I am already in motion?",
          answer: config.alreadyMovingAnswer || "If your move is active, focus on the decisions that affect timing first: where you need to be, when you need keys, what monthly cost works, and which tradeoffs are acceptable.",
        },
      ],
    },
    cta: buildPageCta(config.ctaTitle, config.ctaText),
  };
}

function buildPropertyExpansion(config) {
  return {
    description: config.description,
    keywords: config.keywords,
    heroEyebrow: config.status || "Property Guide",
    heroIntro: config.heroIntro,
    introEyebrow: "Property Search Intent",
    introHeading: config.introHeading,
    introLead: config.introLead,
    intro: [
      config.segment,
      config.localContext,
      `If the original property is no longer available, this page should still help you understand what similar inventory may offer today and what to confirm before you spend time on a showing, application, or offer.`,
    ],
    sidebar: {
      eyebrow: "Best Fit",
      heading: config.sidebarHeading || "Who should compare this",
      paragraphs: [
        config.bestFit,
        config.sidebarNote,
      ],
      pills: config.pills,
    },
    sections: [
      {
        title: "Why this property profile gets searched",
        pills: uniqueKeywords(config.intentPills || ["Property Type", "Location", "Move Timing"]),
        paragraphs: [
          config.whySearched,
          `The title tells us something about the searcher: they are already filtering by space, area, price, lifestyle feature, or household need. That makes the content useful when it answers the practical questions behind that filter instead of only restating the headline.`,
        ],
      },
      {
        title: "Neighborhood and commute context",
        pills: uniqueKeywords(config.contextPills || ["Neighborhood", "Commute", "Routine"]),
        paragraphs: [
          config.neighborhoodContext,
          "For Oahu renters and buyers, location is not just a map pin. It affects H-1 timing, base access, school drop-offs, weekend errands, heat, parking, and how realistic the home feels after move-in.",
        ],
      },
      {
        title: "What similar homes should be compared against",
        pills: uniqueKeywords(config.comparePills || ["Budget", "Layout", "Parking", "Availability"]),
        paragraphs: [
          `Compare similar options by looking at ${sentenceList(config.compareFactors)}. A property can be attractive and still be the wrong fit if one of those items is off.`,
          config.compareGuidance,
        ],
      },
      {
        title: "How to use this page now",
        pills: uniqueKeywords(["Current Availability", "Comparable Homes", "Next Steps"]),
        paragraphs: [
          config.currentUse,
          "The strongest next step is to confirm whether the exact property, a similar rental, or a comparable home is available now, then compare that option against your timeline and the daily routine you need on island.",
        ],
      },
    ],
    faq: {
      eyebrow: "Common Questions",
      heading: `${config.topic} FAQs`,
      intro: "These are the questions people usually need answered before they treat a property page as a serious lead.",
      items: [
        {
          question: "Is the original property still available?",
          answer: "Availability should always be confirmed directly. If the original property is no longer active, this page can still help you compare similar homes, rentals, or neighborhood options.",
        },
        {
          question: "Who is this property type best suited for?",
          answer: config.bestFit,
        },
        {
          question: "What should I confirm before scheduling a showing?",
          answer: `Confirm ${sentenceList(config.compareFactors)}, current status, move-in timing, and any restrictions or costs that would affect your decision.`,
        },
        {
          question: "Why include neighborhood guidance on a property page?",
          answer: "Because Oahu property decisions are rarely about the home alone. Commute, base access, parking, household routine, and surrounding services can change whether the property works after move-in.",
        },
      ],
    },
    cta: buildPageCta(config.ctaTitle, config.ctaText),
  };
}

function propertyAudienceLine(status, community, propertyType) {
  if (status === "For Rent") {
    return `If you are comparing rentals in ${community}, use this page to decide whether this ${propertyType.toLowerCase()} fits your timeline, monthly budget, commute, and move-in needs before you schedule a showing or submit an application.`;
  }

  return `If you are researching homes in ${community}, use this page to decide whether this ${propertyType.toLowerCase()} deserves a closer look before you invest time in tours, financing steps, or an offer strategy.`;
}

function detectPropertySeoArea(title, community) {
  const areas = [
    "Ka Makana at Hoakalei",
    "Ocean Pointe",
    "Mililani Mauka",
    "Fairways Edge",
    "Makakilo",
    "Kapolei",
    "Ewa Beach",
    "Mililani",
  ];

  return (
    areas.find(function (area) {
      return title.toLowerCase().indexOf(area.toLowerCase()) !== -1;
    }) || community
  );
}

function buildPropertySeoTitle(label, propertyType, community, status) {
  const seoArea = detectPropertySeoArea(label, community);
  const beds = extractNumberValue(label, /(\d+)\s*(?:BR|Bedroom|Bedrooms)/i);
  const shortType =
    propertyType === "Single Family Home" ? "Home" : propertyType;
  let core = beds
    ? `${beds}-Bedroom ${shortType} in ${seoArea}`
    : `${shortType} in ${seoArea}`;

  if (/pool home/i.test(label)) {
    core = `Pool Home in ${seoArea}`;
  }

  if (status === "For Rent") {
    core = `For Rent: ${core}`;
  }

  return buildSeoTitle(core);
}

function createCommunityPage(def) {
  const path = def.path || `evergreen/${def.slug}.html`;
  const listingsLanguage = def.listingsFocused
    ? `current ${def.area} listings, search strategy, and what to confirm before scheduling tours`
    : `${def.area} neighborhoods, price positioning, and how the area fits different buyers`;
  const searchIntentLine = def.listingsFocused
    ? `If you searched for ${def.area} listings, you are probably trying to narrow real options quickly, compare price ranges, and decide whether it is worth setting up tours now or continuing to watch the market.`
    : `If you searched for ${def.area} real estate, you are probably trying to figure out whether the area fits your budget, commute, family routine, and long-term plan before you get too far into the home search.`;

  return {
    key: def.slug,
    path: path,
    title: buildSeoTitle(def.seoTitle || def.label),
    description: `Explore ${def.area} real estate, ${listingsLanguage}, and practical Oahu guidance for buyers, military families, and people planning a move.`,
    canonical: buildCanonical(path),
    keywords: uniqueKeywords([
      def.label,
      `${def.area} real estate`,
      `${def.area} homes for sale`,
      `${def.area} Hawaii listings`,
      "Oahu real estate",
      "Hawaii Military Realty",
      "military relocation Hawaii",
    ]),
    hero: {
      image: def.image || "diamond-head-neighborhood.jpg",
      imageAlt: `${def.area} real estate and neighborhood context on Oahu`,
      eyebrow: def.heroEyebrow || "Community Guide",
      heading: def.label,
      intro: `${searchIntentLine} This page is built to help you sort through that decision with local context instead of generic market talk.`,
    },
    introEyebrow: "Area Overview",
    introHeading: `${def.area} real estate context`,
    introLead: `Before you commit to tours, financing steps, or a move timeline, it helps to understand how ${def.area} fits the way you actually plan to live on Oahu.`,
    intro: [
      `${def.area} attracts a mix of local buyers, military families moving on orders, and people researching ahead of a relocation who want to understand the tradeoffs before they go all-in on one part of Oahu. Some are looking for more space. Some are trying to stay closer to a duty station. Others are balancing price against maintenance fees, commute time, school options, or how quickly they may need to move.`,
      `That is why this page is written as a decision-making guide, not just a collection of keywords. It is meant to help you understand what people usually compare in ${def.area}, how the area may fit different types of households, and what you should pay attention to before you start requesting tours or narrowing a shortlist.`,
    ],
    sidebar: {
      eyebrow: "Key Topics",
      heading: `Questions to answer first`,
      paragraphs: [
        `Start here if you are trying to figure out whether ${def.area} fits your goals, your budget, and the pace of your move.`,
        `As you read, focus on inventory type, commute realities, monthly ownership costs, and whether this part of Oahu lines up with the lifestyle you want once the move is over.`,
      ],
      pills: uniqueKeywords([
        def.area,
        "Oahu",
        "Buyers",
        "Sellers",
        def.listingsFocused ? "Listings" : "Neighborhood Guide",
        "Military Families",
      ]),
    },
    sections: [
      {
        title: `What buyers should know about ${def.area}`,
        pills: uniqueKeywords([def.area, "Homes", "Condos", "Townhomes"]),
        paragraphs: [
          `${def.area} can appeal to several buyer profiles at once, which is why a simple list of homes is rarely enough. One household may care most about getting more interior space. Another may be trying to stay within a payment target. A military family may be focused on how the area affects morning traffic, school routine, or how manageable life will feel after a PCS move.`,
          `As you evaluate homes here, pay attention to the differences between single-family homes, townhomes, and condos. The right fit is not always the largest home. It is the option that works with your daily routine, your monthly carrying costs, and how long you expect to stay on island.`,
        ],
      },
      {
        title: "Commute, routine, and neighborhood fit",
        pills: uniqueKeywords(["Commute", "Schools", "Daily Routine", "Base Access"]),
        paragraphs: [
          `For many Oahu households, the biggest surprise is that a home can look right on paper and still feel wrong once commute timing and daily routine are factored in. That matters even more for active duty families who are trying to stay flexible around orders, formation times, school logistics, or a spouse's work schedule.`,
          `As you think through ${def.area}, ask yourself what a normal weekday would actually look like. The right neighborhood is not just where you can buy. It is where you can function well once the excitement of the move wears off.`,
        ],
      },
      {
        title: `How to evaluate ${def.area} listings`,
        pills: uniqueKeywords(["Showings", "Offer Strategy", "Due Diligence", "Remote Tours"]),
        paragraphs: [
          `Once a listing catches your attention, slow the process down enough to compare the details that affect life after closing. In Hawaii that often means maintenance fees, parking, renovation quality, layout efficiency, insurance exposure, and how the full monthly cost feels after taxes and association charges are included.`,
          `If you are shopping remotely or under a tight timeline, build a short checklist before you request a tour. That helps you compare homes in ${def.area} consistently and keeps you from chasing properties that look good online but do not match your actual move plan.`,
        ],
      },
    ],
    faq: {
      eyebrow: "Common Questions",
      heading: `${def.area} real estate FAQs`,
      intro: `These are the kinds of questions people often ask when they are deciding whether to focus their search on ${def.area}.`,
      items: [
        {
          question: `Is ${def.area} a good fit for military families moving to Oahu?`,
          answer: `${def.area} is often part of the conversation for military families because buyers are balancing home value, commute, schools, and everyday convenience. The most useful way to compare it is by weighing those tradeoffs against your assignment, household routine, and budget.`,
        },
        {
          question: `Should this page focus only on listings?`,
          answer: `No. Most visitors need more than a list of homes. A stronger page explains the community, the buying process, and what makes one area feel different from another before you commit time to tours.`,
        },
        {
          question: `What would make this page more useful?`,
          answer: `Current property examples, neighborhood photos, recent market observations, related links, and a clearer next step would make the page more credible and more useful.`,
        },
      ],
    },
    cta: buildPageCta(
      `Discuss ${def.area} real estate`,
      `Call or text for local context, current listings, and practical Oahu guidance before you make a move.`,
    ),
  };
}

function createBrandPage(def) {
  const path = def.path || `evergreen/${def.slug}.html`;

  return {
    key: def.slug,
    path: path,
    title: buildSeoTitle(def.seoTitle || def.label),
    description: `${def.label} with leadership background, service approach, and Oahu real estate guidance for buyers, sellers, renters, and military families.`,
    canonical: buildCanonical(path),
    keywords: uniqueKeywords([
      def.label,
      "David Kucic",
      "Tonya Kucic",
      "Hawaii Military Realty",
      "Oahu real estate",
      "military real estate Hawaii",
    ]),
    hero: {
      image: def.image || "hero-bg-about.jpg",
      imageAlt: `${def.label} page for Hawaii Military Realty`,
      eyebrow: def.heroEyebrow || "Company Profile",
      heading: def.label,
      intro: `If you searched this name directly, you are probably trying to decide whether this is the right team to trust with a Hawaii move, a purchase, a sale, or a rental decision. This page is here to help you make that call faster.`,
    },
    introEyebrow: "Brand Story",
    introHeading: def.introHeading || "How to judge the fit",
    introLead: "When people search a person or company by name, they usually want clarity on experience, values, communication style, and whether the business understands their situation.",
    intro: [
      `People who land on a branded page are usually deeper into their decision than someone browsing broad market content. They may already be on orders. They may already be touring. They may be comparing agents before trusting someone with a long-distance move or a property they cannot afford to mishandle. At that point, the content needs to answer the questions that matter before a first call even happens.`,
      `Use this page to understand who David, Tonya, or Hawaii Military Realty are, how they approach service, and whether their mix of Oahu knowledge, military familiarity, and direct communication style fits what you need right now.`,
    ],
    sidebar: {
      eyebrow: "What To Look For",
      heading: "What most visitors want to know",
      paragraphs: [
        "Start with experience, local credibility, military background, and the type of clients the team serves best.",
        "Then decide whether the next step should be a call, a community search, a property conversation, or a relocation planning discussion.",
      ],
      pills: uniqueKeywords([
        "Team Background",
        "Leadership",
        "Oahu",
        "Military Clients",
        "Buyers",
        "Sellers",
      ]),
    },
    sections: [
      {
        title: "Leadership and local credibility",
        pills: uniqueKeywords(["Veteran Owned", "Native Hawaiian Owned", "Oahu Focus"]),
        paragraphs: [
          `You should be able to judge whether the team is a match without guessing through marketing language. In this case, the most relevant signals are local Oahu focus, veteran-owned management, Native Hawaiian roots, and a communication style built around direct answers instead of vague reassurance.`,
          `If you are moving on orders or trying to make a fast decision from off island, that background matters. It tells you whether the people guiding you are likely to understand the pace, pressure, and practical tradeoffs that come with a Hawaii move.`,
        ],
      },
      {
        title: "Who the company serves",
        pills: uniqueKeywords(["PCS Moves", "VA Buyers", "Property Owners", "Renters"]),
        paragraphs: [
          `This team is most relevant to people who need practical Oahu guidance, whether that means a VA-financed purchase, a sale tied to changing orders, a rental search under time pressure, or property support after leaving island. Civilian buyers and sellers can benefit from the same direct communication style, but military families will usually recognize the fit especially quickly.`,
          `If that sounds like your situation, use this page to decide whether to keep digging into area guides and listings or move straight into a conversation with the team.`,
        ],
      },
      {
        title: "What to read next",
        pills: uniqueKeywords(["Client Fit", "Biographies", "Area Guides", "Next Steps"]),
        paragraphs: [
          `If you are on this page, you probably do not need a generic lecture on the Hawaii market. You need proof that the people behind the name understand the type of move or transaction you are facing and can help you make fewer costly mistakes.`,
          `The best next step is usually a biography, a community page, VA information, or a direct contact option that helps you confirm fit and keep moving.`,
        ],
      },
    ],
    faq: {
      eyebrow: "Common Questions",
      heading: "Branded page FAQs",
      intro: "These FAQs are meant to answer the kinds of questions people often have before they decide to reach out.",
      items: [
        {
          question: "Why use a dedicated page instead of starting on the homepage?",
          answer: "A dedicated page gives you the direct background you were searching for and leaves more room to cover biographies, service philosophy, awards, and contact reasons without making you dig through broader site navigation first.",
        },
        {
          question: "What details would make this page more useful?",
          answer: "Professional photos, biographies, awards, testimonials, and stronger links to community, VA, and service pages would make it easier to judge fit quickly.",
        },
        {
          question: "Can this page help me decide whether to reach out?",
          answer: "Yes. People who search a person or company by name are usually already evaluating fit, so a clear branded page can help you decide whether a direct conversation makes sense.",
        },
      ],
    },
    cta: buildPageCta(
      "Talk with Hawaii Military Realty",
      "If the team sounds like the right fit for your move or transaction, use the next step to get specific about timing, area, and goals.",
    ),
  };
}

function createBrokeragePage(def) {
  const path = def.path || `evergreen/${def.slug}.html`;

  return {
    key: def.slug,
    path: path,
    title: buildSeoTitle(def.seoTitle || def.label),
    description: `${def.label} with clear expectations for clients, cooperating brokers, and anyone trying to understand how representation and compensation are handled in Hawaii real estate.`,
    canonical: buildCanonical(path),
    keywords: uniqueKeywords([
      def.label,
      "cooperating broker commissions Hawaii",
      "Hawaii brokerage commissions",
      "Hawaii Military Realty",
      "Oahu real estate",
    ]),
    hero: {
      image: "cta-veteran-service.jpg",
      imageAlt: `${def.label} page for Hawaii Military Realty`,
      eyebrow: "Brokerage Information",
      heading: def.label,
      intro: "If you landed here, you are probably trying to understand how commissions, representation, and professional expectations are handled before you move forward with a property conversation.",
    },
    introEyebrow: "Commission Overview",
    introHeading: "Why this page matters",
    introLead: "This topic matters most when you are trying to move forward without confusion, surprises, or mixed expectations.",
    intro: [
      "Most visitors who look for commission information are not browsing casually. They are usually getting closer to a showing, an offer, a referral, or a conversation about representation. That means they want the basics explained plainly and professionally.",
      "Use this page to understand that compensation can vary by property and agreement, that final terms need to be verified through the correct listing and contract channels, and that the larger point is clarity before you commit time or money.",
    ],
    sidebar: {
      eyebrow: "Use Cases",
      heading: "What you should leave understanding",
      paragraphs: [
        "Where compensation details should be confirmed, how representation works, and what professional coordination should look like.",
        "If you are a client, the goal is clarity. If you are a cooperating broker, the goal is aligned expectations before things move forward.",
      ],
      pills: uniqueKeywords(["Transparency", "Brokerage", "Compensation", "Professional Standards"]),
    },
    sections: [
      {
        title: "Transparency first",
        pills: uniqueKeywords(["Clear Terms", "Verification", "Professional Coordination"]),
        paragraphs: [
          "The most important takeaway is that compensation is not one-size-fits-all. It has to be verified through the actual listing details and transaction documents tied to the property you care about.",
          "For clients, that means fewer assumptions. For cooperating professionals, it means fewer misunderstandings. For everyone involved, it creates a cleaner path forward.",
        ],
      },
      {
        title: "How this supports client trust",
        pills: uniqueKeywords(["Client Advocacy", "Representation", "Expectations"]),
        paragraphs: [
          "Compensation language can feel technical, especially if you are a first-time buyer, a military family under time pressure, or a seller who has not gone through a transaction in a while. Clear language reduces friction and helps you focus on the actual decision in front of you.",
          "It also signals that the brokerage is willing to address the business side directly instead of acting like the subject should stay vague until later.",
        ],
      },
      {
        title: "What to verify before relying on details",
        pills: uniqueKeywords(["Approved Language", "Accuracy", "Disclosure Review"]),
        paragraphs: [
          "Before you rely on any commission details as final guidance, they should reflect approved brokerage language and avoid overgeneralizing how every property or agreement will work.",
          "The structure here is meant to make those final clarifications easy to add while keeping the page useful to visitors who need the broad explanation now.",
        ],
      },
    ],
    faq: {
      eyebrow: "Common Questions",
      heading: "Commission page FAQs",
      intro: "These are the practical questions people often ask before they move forward with representation or a property-specific conversation.",
      items: [
        {
          question: "Can one page state the commission for every property?",
          answer: "No. Compensation can vary, so the explanation here should help you understand the process while directing you to verify terms through the appropriate listing and transaction documents.",
        },
        {
          question: "Why does commission clarity matter so early?",
          answer: "Because clarity builds trust. A direct explanation helps clients and cooperating professionals understand expectations before time, money, or leverage is already tied up in the deal.",
        },
        {
          question: "What should I verify for a specific property?",
          answer: "Verify the property-specific compensation details, representation terms, and any related disclosures through the listing and transaction documents tied to that deal.",
        },
      ],
    },
    cta: buildPageCta(
      "Discuss representation and expectations",
      "If you want clarity before a showing, offer, or referral conversation, the next step should be a direct discussion tied to your situation.",
    ),
  };
}

function createVideoPage(def) {
  const path = def.path || `evergreen/${def.slug}.html`;

  return {
    key: def.slug,
    path: path,
    title: buildSeoTitle(def.seoTitle || def.label),
    description: `Hawaii VA homebuying video page with supporting guidance for military and veteran buyers who want to understand the process before they move or start touring homes.`,
    canonical: buildCanonical(path),
    keywords: uniqueKeywords([
      def.label,
      "Hawaii VA homebuying",
      "VA home buying Hawaii video",
      "military home buying Oahu",
      "Hawaii Military Realty",
    ]),
    hero: {
      image: "hero-pcs-planning.jpg",
      imageAlt: "Hawaii VA homebuying page for military and veteran buyers",
      eyebrow: "Video Resource",
      heading: def.label,
      intro: "If you searched for a Hawaii VA homebuying video, you are probably trying to get oriented quickly before you talk with a lender, start tours, or make decisions from off island.",
    },
    introEyebrow: "Video Summary",
    introHeading: "Use the video with context",
    introLead: "Some visitors will watch the full video. Others will scan first. Both groups need enough context to understand what matters in Hawaii.",
    intro: [
      "A useful video resource should tell you what it covers, who it is most helpful for, and what you should understand before you jump into the next step. That matters even more if you are trying to make sense of the process under PCS timelines or while researching from another time zone.",
      "For Hawaii VA buyers, the questions are usually not just about loan basics. They are about timing, neighborhood fit, monthly payment reality, and how to avoid getting behind before the search even feels real.",
    ],
    sidebar: {
      eyebrow: "How To Use It",
      heading: "How to use this resource",
      paragraphs: [
        "Watch the video for the overview, then use the written sections to slow down and connect the advice to your actual move, budget, and timing.",
        "If you are still early in research, the related pages should help you keep moving without guessing what to read next.",
      ],
      pills: uniqueKeywords(["VA Buyers", "Video", "PCS Planning", "Oahu Guidance"]),
    },
    sections: [
      {
        title: "What the video should explain clearly",
        pills: uniqueKeywords(["Eligibility Context", "Process Overview", "Timeline"]),
        paragraphs: [
          "The video should help you understand where the real estate side of the process begins, what to do before you get emotionally attached to a home, and how your timeline affects the kind of search strategy that makes sense.",
          "That written summary matters because some buyers need to confirm the basics quickly before they commit twenty minutes to the full resource.",
        ],
      },
      {
        title: "Why Hawaii needs local context",
        pills: uniqueKeywords(["Oahu Market", "Commute", "Inventory", "Military Moves"]),
        paragraphs: [
          "Buying on Oahu comes with local realities that generic national VA videos often skip. Commute times, inventory mix, association fees, and the pressure of military timelines all change how you should plan.",
          "That local context is what turns a general explainer into a useful Hawaii resource for someone who is actually preparing to move.",
        ],
      },
      {
        title: "What to do after you watch",
        pills: uniqueKeywords(["Next Steps", "Related Guides", "Follow-Up"]),
        paragraphs: [
          "After you finish the video, the next question should be obvious. For some people that will be reviewing neighborhoods. For others it will be estimating payment ranges, talking through timing, or asking for a list of homes that actually fit the mission.",
          "The next step should feel clear instead of leaving you with general information and no plan.",
        ],
      },
    ],
    faq: {
      eyebrow: "Common Questions",
      heading: "Video page FAQs",
      intro: "These FAQs are for visitors who want a quick answer before deciding whether to watch the full video.",
      items: [
        {
          question: "Should this video resource include written content too?",
          answer: "Yes. Written content helps users scan the topic quickly and gives search engines more context than a title and video embed alone.",
        },
        {
          question: "Does this page replace lender guidance?",
          answer: "No. It should explain the real estate side of Hawaii VA homebuying while directing financing questions to an appropriate VA loan professional.",
        },
        {
          question: "What else would make this resource stronger?",
          answer: "A stronger summary, a transcript excerpt, related links, and a clear contact option would make it easier to move from the overview into a real plan.",
        },
      ],
    },
    cta: buildPageCta(
      "Review VA homebuying steps",
      "If the video clarified the basics, the next step is to apply that information to your actual move timeline and search area.",
    ),
  };
}

function createConstructionPage(def) {
  const path = def.path || `evergreen/${def.slug}.html`;

  return {
    key: def.slug,
    path: path,
    title: buildSeoTitle(def.seoTitle || def.label),
    description: `Hawaii new home construction guide for buyers comparing builders, communities, pricing tradeoffs, and Oahu move timelines.`,
    canonical: buildCanonical(path),
    keywords: uniqueKeywords([
      def.label,
      "new home construction Hawaii",
      "Oahu new construction",
      "new homes Oahu",
      "Hawaii Military Realty",
    ]),
    hero: {
      image: "featured-home.jpg",
      imageAlt: "New home construction guidance for Hawaii buyers",
      eyebrow: "Buyer Guide",
      heading: def.label,
      intro: "If you are looking at new construction in Hawaii, you are probably trying to decide whether a brand-new home will make your move easier, your maintenance outlook simpler, or your budget harder to manage once upgrades are added.",
    },
    introEyebrow: "New Construction",
    introHeading: "Why buyers search this topic",
    introLead: "New construction can solve some problems, but it creates its own questions around upgrades, timing, and location fit.",
    intro: [
      "Most buyers start here because they like the idea of modern layouts, less immediate repair risk, and the feeling of moving into something fresh. But the real questions come quickly: how much the base price will grow after upgrades, whether the delivery date lines up with orders or a lease end, and whether the community itself is in the right part of Oahu.",
      "Use this page to think through those questions before you fall in love with a model home that does not match your timing, commute, or full monthly cost.",
    ],
    sidebar: {
      eyebrow: "What to Cover",
      heading: "What to evaluate carefully",
      paragraphs: [
        "Focus on total cost, delivery timing, location, and how much decision-making still sits in front of you after the first visit.",
        "A new build can be the right move, but only if the numbers and the timeline still work once the shiny parts stop doing all the talking.",
      ],
      pills: uniqueKeywords(["Builders", "Communities", "Timelines", "Buyer Guidance"]),
    },
    sections: [
      {
        title: "Questions buyers should ask",
        pills: uniqueKeywords(["Lot Premiums", "Upgrades", "Warranties", "Closing Timeline"]),
        paragraphs: [
          "New construction can feel simpler than resale, but the details often decide whether it still works after upgrades, lot premiums, timeline changes, and association costs are added in. The earlier you build that checklist, the less likely you are to make a rushed decision in a sales office.",
          "Ask what is included, what is extra, what happens if delivery timing shifts, and what the area will feel like day to day once you actually live there.",
        ],
      },
      {
        title: "Why local context still matters",
        pills: uniqueKeywords(["Commute", "Schools", "Inventory Mix", "Resale"]),
        paragraphs: [
          "A brand-new home still has to work inside the larger Oahu reality. Commute patterns, school access, neighborhood development pace, and nearby resale competition all affect whether a new build feels like a smart long-term fit.",
          "That is especially important if you are moving on orders and do not have time to recover from a bad location choice after you arrive.",
        ],
      },
      {
        title: "How this page can evolve",
        pills: uniqueKeywords(["Community Pages", "Featured Listings", "Builder Updates"]),
        paragraphs: [
          "As your search becomes more specific, the next useful step is usually community guides, builder notes, and side-by-side comparisons with resale options nearby.",
          "That way you can keep moving from broad research into a focused decision instead of starting over every time a new project catches your eye.",
        ],
      },
    ],
    faq: {
      eyebrow: "Common Questions",
      heading: "New construction FAQs",
      intro: "These are the practical questions buyers often ask before they commit time to a builder or community visit.",
      items: [
        {
          question: "Is new construction always easier than resale?",
          answer: "Not always. It may reduce some repair concerns, but buyers still need to evaluate upgrades, contract timelines, association costs, and the long-term fit of the location.",
        },
        {
          question: "Should this page focus on one builder or many?",
          answer: "It can start broad, then later add sections or links for specific builders and neighborhoods once those details are available.",
        },
        {
          question: "What details would make this page more useful?",
          answer: "Builder-specific information, community maps, recent photos, and stronger links to related communities would make the page much more useful without changing its structure.",
        },
      ],
    },
    cta: buildPageCta(
      "Compare new construction options",
      "Use this page to get clear on the questions first, then compare projects and communities with a better filter.",
    ),
  };
}

function createMilitaryResourcePage(def) {
  const path = def.path || `evergreen/${def.slug}.html`;

  return {
    key: def.slug,
    path: path,
    title: buildSeoTitle(def.seoTitle || def.label),
    description: `${def.label} with military relocation context, Oahu planning tips, and practical guidance for service members and families moving on orders.`,
    canonical: buildCanonical(path),
    keywords: uniqueKeywords([
      def.label,
      def.keyword,
      "military relocation Hawaii",
      "Oahu military resources",
      "Hawaii Military Realty",
    ]),
    hero: {
      image: def.image || "hero-military-family.jpg",
      imageAlt: `${def.label} resource page for Hawaii military moves`,
      eyebrow: "Military Resource",
      heading: def.label,
      intro: `If you searched for ${def.keyword.toLowerCase()}, there is a good chance you are already in motion, preparing for orders, or trying to make the first few weeks of a Hawaii move less chaotic.`,
    },
    introEyebrow: "Resource Overview",
    introHeading: `${def.subject} on Oahu`,
    introLead: "Use this resource to make one part of the move easier right now, not just to read about the topic in abstract terms.",
    intro: [
      `People who search for ${def.label.toLowerCase()} are usually trying to solve an immediate planning problem. They may be coordinating arrival dates, figuring out where to stay, comparing base-adjacent options, or trying to reduce uncertainty before family members arrive on island.`,
      `That means the page needs to help you orient quickly, understand where this topic fits into the larger move, and point you toward the next useful step instead of leaving you with scattered facts.`,
    ],
    sidebar: {
      eyebrow: "Move Planning",
      heading: "How to use this page",
      paragraphs: [
        "Use the page to reduce uncertainty around this one part of the move, then connect it to housing, base access, and arrival planning.",
        "If you are moving quickly, look for the details that help you act, not just the details that explain the topic broadly.",
      ],
      pills: uniqueKeywords([
        def.subject,
        "PCS",
        "Military Families",
        "Oahu",
        "Planning",
      ]),
    },
    sections: [
      {
        title: "What visitors need first",
        pills: uniqueKeywords(["Location", "Eligibility", "Practical Steps", "Timing"]),
        paragraphs: [
          `The first thing you need is a quick understanding of what ${def.subject.toLowerCase()} means in a Hawaii context, who it helps, and which details you should verify before you build the rest of your plan around it.`,
          "That speed matters because military moves rarely give you unlimited time to sort through vague information.",
        ],
      },
      {
        title: "How this fits the relocation journey",
        pills: uniqueKeywords(["Orders", "Housing", "Arrival Planning", "Support Resources"]),
        paragraphs: [
          "Most military resource searches are tied to a larger chain of decisions. Lodging affects arrival stress. Bases and barracks affect commute planning. Commissaries and support programs affect what the first month on island feels like while you are still getting settled.",
          "That is why it helps to read this resource as part of the bigger relocation picture, not as an isolated fact sheet.",
        ],
      },
      {
        title: "Why long-form supporting copy matters",
        pills: uniqueKeywords(["Move Planning", "Housing Context", "Next Steps", "Local Guidance"]),
        paragraphs: [
          "Even when you mainly need quick facts, the longer explanation matters because it helps connect this topic to housing decisions, travel timing, family planning, and what to do next.",
          "That makes the page more useful for someone under real time pressure instead of only useful to someone casually researching months ahead.",
        ],
      },
    ],
    faq: {
      eyebrow: "Common Questions",
      heading: `${def.subject} FAQs`,
      intro: "These FAQs focus on the practical questions people often have when they are trying to use this information during a move.",
      items: [
        {
          question: `Why should this site have a page about ${def.subject.toLowerCase()}?`,
          answer: `Because people moving to or within Oahu often search this topic alongside housing questions. A dedicated page helps them plan more effectively and keeps those searches on-site instead of forcing them back to a broad homepage.`,
        },
        {
          question: "Should official references still be included later?",
          answer: "Yes. Official or primary references are still important where appropriate, especially when paired with the practical local context official pages often do not provide.",
        },
        {
          question: "What should be updated before this page is considered complete?",
          answer: "Add location-specific facts, maps, contact details where appropriate, and stronger cross-links to related housing and relocation resources.",
        },
      ],
    },
    cta: buildPageCta(
      `Plan around ${def.subject.toLowerCase()}`,
      "Use this resource to get one piece of the move clearer, then connect it to housing and relocation decisions that still need answers.",
    ),
  };
}

function createVaPage(def) {
  const path = def.path || `evergreen/${def.slug}.html`;

  return {
    key: def.slug,
    path: path,
    title: buildSeoTitle(def.seoTitle || def.label),
    description: `${def.label} with Hawaii-specific VA homebuying context, buyer education, and practical guidance for military and veteran households planning a move.`,
    canonical: buildCanonical(path),
    keywords: uniqueKeywords([
      def.label,
      "VA loan Hawaii",
      "VA home buying Hawaii",
      "Oahu VA buyers",
      "Hawaii Military Realty",
    ]),
    hero: {
      image: def.image || "cta-veteran-service.jpg",
      imageAlt: `${def.label} page for Hawaii VA buyers`,
      eyebrow: "VA Resource",
      heading: def.label,
      intro: `If you searched for ${def.label.toLowerCase()}, you are probably trying to understand what this means for your move, your budget, and how quickly you can realistically start looking at homes in Hawaii.`,
    },
    introEyebrow: "VA Homebuying Context",
    introHeading: def.introHeading || "Why this topic matters",
    introLead: "Most Hawaii VA buyers need two things at once: clear process guidance and a realistic view of how the Oahu market affects the plan.",
    intro: [
      "Generic national VA content often misses the parts that actually create stress in a Hawaii move. Buyers are not only thinking about eligibility or loan structure. They are trying to understand how soon to talk with a lender, what monthly costs may really look like, how association fees affect the picture, and how to stay realistic while inventory is moving.",
      `Use this page to connect ${def.label.toLowerCase()} to the actual decisions in front of you so you can prepare better, ask smarter questions, and avoid getting surprised later in the search.`,
    ],
    sidebar: {
      eyebrow: "Important Notes",
      heading: "What to focus on first",
      paragraphs: [
        "Use the page to understand the real estate side of the decision and what questions you should take into your next conversation.",
        "For financing specifics, keep a qualified VA loan professional in the loop while you use these Hawaii-focused pages to sharpen the move strategy.",
      ],
      pills: uniqueKeywords(["VA Buyers", "Oahu", "PCS", "Home Search", "Preparation"]),
    },
    sections: [
      {
        title: "What buyers are actually trying to solve",
        pills: uniqueKeywords(["Budget", "Timeline", "Expectations", "Offer Readiness"]),
        paragraphs: [
          "Most VA-oriented searches are really about confidence. You want to know whether you are preparing correctly, whether your timeline is realistic, and whether you are about to waste energy on homes that do not fit the bigger picture.",
          "That is why this topic is most useful when it helps you connect the guidance to your real move plan instead of repeating generic financing language you can find anywhere.",
        ],
      },
      {
        title: "Why Hawaii context changes the conversation",
        pills: uniqueKeywords(["Association Fees", "Commute", "Inventory", "Island Tradeoffs"]),
        paragraphs: [
          "In Hawaii, even buyers who understand the financing side still have to wrestle with association fees, commute realities, inventory mix, and neighborhood tradeoffs that can change whether a home feels affordable or practical.",
          "That local context is what helps turn a broad VA question into a decision you can actually act on.",
        ],
      },
      {
        title: "What helps you act on this topic",
        pills: uniqueKeywords(["Checklist", "Next Steps", "Trusted Referrals", "Local Examples"]),
        paragraphs: [
          "Local examples, a clearer checklist, and direct links into area guides, listings, and relocation resources make it easier to keep moving without losing momentum.",
          "That way the page helps you do more than learn. It helps you decide what to do next.",
        ],
      },
    ],
    faq: {
      eyebrow: "Common Questions",
      heading: "VA resource FAQs",
      intro: "These are the questions many military and veteran buyers ask while trying to move from research into action.",
      items: [
        {
          question: "Does this page replace advice from a lender?",
          answer: "No. It should explain the real estate and planning side of a Hawaii purchase while encouraging buyers to confirm financing details with a qualified VA loan professional.",
        },
        {
          question: "Why not keep all VA topics on one page?",
          answer: "Separate pages can match different search intents more effectively. Buyers searching general VA loan information are not always asking the same questions as buyers searching down payment strategy or Hawaii-specific guidance.",
        },
        {
          question: "What would make this guidance more useful?",
          answer: "Local examples, stronger links to related topics, a clearer next step, and more detailed step-by-step guidance would make it easier to apply this topic to a real Hawaii move.",
        },
      ],
    },
    cta: buildPageCta(
      "Talk through your Hawaii VA path",
      "If this topic matches the question you are trying to solve, the next step is to apply it to your timing, target area, and budget.",
    ),
  };
}

function createToolPage(def) {
  const path = def.path || `evergreen/${def.slug}.html`;

  return {
    key: def.slug,
    path: path,
    title: buildSeoTitle(def.seoTitle || def.label),
    description: `Mortgage calculator page with buyer education, payment-planning context, and Hawaii-specific guidance for comparing homes before you move forward.`,
    canonical: buildCanonical(path),
    keywords: uniqueKeywords([
      def.label,
      "mortgage calculator Hawaii",
      "Hawaii home payment calculator",
      "Oahu mortgage calculator",
      "Hawaii Military Realty",
    ]),
    hero: {
      image: "hero-pcs-planning.jpg",
      imageAlt: "Mortgage calculator guidance for Hawaii buyers",
      eyebrow: "Planning Tool",
      heading: def.label,
      intro: "If you are looking for a mortgage calculator, you are probably trying to answer a very practical question: what price range still feels realistic once taxes, insurance, fees, and the rest of Hawaii ownership costs are part of the monthly picture.",
    },
    introEyebrow: "Budget Planning",
    introHeading: "Use the numbers with context",
    introLead: "A calculator is only useful if it helps you make better decisions about budget, neighborhood, and timing.",
    intro: [
      "Most buyers use a calculator because they want to compare scenarios before they get too attached to a listing. On Oahu that often means looking beyond principal and interest to include taxes, insurance, association fees, and the full monthly number that will actually shape daily life.",
      "Use the numbers here as a filter, not as trivia. The point is to narrow your search more intelligently before you spend time on neighborhoods or homes that may not fit the real payment range.",
    ],
    sidebar: {
      eyebrow: "Planning Steps",
      heading: "How to use the numbers",
      paragraphs: [
        "Use rough payment estimates to pressure-test your search before you get emotionally tied to a home.",
        "Then connect the numbers to area guides, VA pages, and real listings so the budget work leads somewhere useful.",
      ],
      pills: uniqueKeywords(["Payments", "Budgeting", "VA Buyers", "Planning"]),
    },
    sections: [
      {
        title: "What the calculator should help answer",
        pills: uniqueKeywords(["Monthly Payment", "Affordability", "Comparison", "Scenario Planning"]),
        paragraphs: [
          "The most useful question is not just what payment you can qualify for, but what payment still feels workable once the move is over and normal life begins. That is where scenario planning becomes valuable.",
          "A good calculator page helps you compare price points, down payment options, and fee structures so you can see what actually changes the monthly picture in Hawaii.",
        ],
      },
      {
        title: "Why guidance matters more than raw numbers",
        pills: uniqueKeywords(["Decision Support", "Real Estate Context", "Buyer Readiness"]),
        paragraphs: [
          "Numbers alone do not tell you which area, property type, or buying strategy makes sense. The same payment may feel very different depending on commute, association fees, property condition, and how long you expect to stay.",
          "That is why the calculator works best as part of a larger decision, not as the only decision-maker.",
        ],
      },
      {
        title: "What to do with the estimate",
        pills: uniqueKeywords(["Payment Range", "Area Comparison", "Related Guides"]),
        paragraphs: [
          "Once you have a rough payment target, the next move should be obvious: compare neighborhoods, review listings, or ask direct questions about what the numbers mean in a Hawaii search.",
          "That makes this page useful not because it exists, but because it helps you move from rough math into a smarter plan.",
        ],
      },
    ],
    faq: {
      eyebrow: "Common Questions",
      heading: "Mortgage calculator FAQs",
      intro: "These are the common questions people ask when they are trying to turn a rough payment estimate into a better search strategy.",
      items: [
        {
          question: "Can I still use this page before the calculator is embedded?",
          answer: "Yes. The planning guidance is still useful for thinking through payment range, ownership costs, and what to compare next.",
        },
        {
          question: "Why keep so much written copy on a calculator page?",
          answer: "Because buyers need context to use the calculator intelligently, especially in Hawaii where taxes, insurance, and fees can change the monthly picture fast.",
        },
        {
          question: "What would make this tool more useful?",
          answer: "An interactive calculator, a short how-to section, and related links into neighborhoods or listings would make it easier to move from estimates into action.",
        },
      ],
    },
    cta: buildPageCta(
      "Talk through the payment picture",
      "Use the estimate to narrow the search, then talk through what that number means for neighborhoods, property types, and timing.",
    ),
  };
}

function createLifestylePage(def) {
  const path = def.path || `evergreen/${def.slug}.html`;

  return {
    key: def.slug,
    path: path,
    title: buildSeoTitle(def.seoTitle || def.label),
    description: `${def.label} with local context, community connections, and relocation-friendly insight for people comparing how life on Oahu may fit them.`,
    canonical: buildCanonical(path),
    keywords: uniqueKeywords([
      def.label,
      "Hawaii golf courses",
      "Oahu golf lifestyle",
      "Oahu neighborhoods",
      "Hawaii Military Realty",
    ]),
    hero: {
      image: "hero-hawaii.jpg",
      imageAlt: `${def.label} lifestyle page for Oahu visitors and residents`,
      eyebrow: "Oahu Lifestyle",
      heading: def.label,
      intro: "If you searched for this topic, you are probably trying to picture what life on Oahu might actually feel like, not just what homes cost on paper.",
    },
    introEyebrow: "Lifestyle Context",
    introHeading: "How lifestyle affects where you live",
    introLead: "Lifestyle pages matter when they help you connect a hobby, routine, or interest to the neighborhoods you may actually consider living in.",
    intro: [
      "Not every relocation decision starts with square footage or price. Sometimes people begin with lifestyle: where they can play, unwind, entertain family, or feel like the move will actually be worth it once work hours are over.",
      "That is why a page like this can be useful to someone researching Hawaii from a distance. It helps connect recreation and daily life to the communities that may end up on the short list.",
    ],
    sidebar: {
      eyebrow: "Use This Topic",
      heading: "How to use this page",
      paragraphs: [
        "Use the lifestyle topic as a bridge into community research, not as a stand-alone curiosity.",
        "If an area supports the way you want to live, it is worth comparing against commute and budget next.",
      ],
      pills: uniqueKeywords(["Lifestyle", "Neighborhoods", "Relocation", "Oahu"]),
    },
    sections: [
      {
        title: "How lifestyle research helps narrow neighborhoods",
        pills: uniqueKeywords(["Lifestyle Fit", "Local Context", "Community Links"]),
        paragraphs: [
          "People moving to Oahu often search for more than homes because they are trying to picture the whole life change, not just the transaction. They want to know where they might spend weekends, how far amenities are from home, and which communities feel aligned with their interests.",
          "That makes a lifestyle page useful when it helps answer those questions and then points naturally into neighborhoods and housing decisions.",
        ],
      },
      {
        title: "Why local context matters",
        pills: uniqueKeywords(["Drive Times", "Weather", "Community Fit", "Amenities"]),
        paragraphs: [
          "A golf page or any other lifestyle page becomes much more useful when it connects recreation to real Oahu choices like drive times, west side versus central tradeoffs, and which residential areas are actually nearby.",
          "That local context is what helps you turn a general interest into a better relocation filter.",
        ],
      },
      {
        title: "What would make this page more useful",
        pills: uniqueKeywords(["Maps", "Local Recommendations", "Community Links"]),
        paragraphs: [
          "The strongest version of this page will include original local summaries, nearby community links, and a clear next click for someone who wants to turn lifestyle research into housing research.",
          "That way the page helps you move from curiosity into a more focused Oahu search.",
        ],
      },
    ],
    faq: {
      eyebrow: "Common Questions",
      heading: "Lifestyle page FAQs",
      intro: "These questions are the kind of things people often ask while trying to connect lifestyle and location.",
      items: [
        {
          question: "Why include a golf page on a real estate website?",
          answer: "Because lifestyle and location are part of how people choose where to live. A useful local page can help connect recreation with neighborhood decisions.",
        },
        {
          question: "Should this page link back to real estate pages?",
          answer: "Yes. Lifestyle pages are more effective when they connect visitors to nearby communities, relocation guides, and direct housing conversations.",
        },
        {
          question: "What would make this page more useful?",
          answer: "Local course summaries, nearby community connections, and original insights would make it easier to turn this lifestyle research into a housing decision.",
        },
      ],
    },
    cta: buildPageCta(
      "Connect lifestyle with location",
      "If this part of Oahu life matters to you, use it to narrow which neighborhoods deserve a closer look.",
    ),
  };
}

function createNewsPage(def) {
  const path = def.path || `evergreen/${def.slug}.html`;

  return {
    key: def.slug,
    path: path,
    title: buildSeoTitle(def.seoTitle || def.label),
    description: `Hawaii real estate news page with market context, Oahu housing insight, and guidance for buyers, sellers, and relocating families tracking what may affect their next move.`,
    canonical: buildCanonical(path),
    keywords: uniqueKeywords([
      def.label,
      "Hawaii real estate news",
      "Oahu housing market news",
      "Hawaii real estate updates",
      "Hawaii Military Realty",
    ]),
    hero: {
      image: "hero-bg-services.jpg",
      imageAlt: "Hawaii real estate news and market updates page",
      eyebrow: "Market Updates",
      heading: def.label,
      intro: "If you searched for Hawaii real estate news, you are probably trying to answer one immediate question: what is happening in the market right now that could affect my timing, my budget, or my next move.",
    },
    introEyebrow: "Market Context",
    introHeading: "How to use market updates well",
    introLead: "Market updates are most useful when they help you interpret change, not just notice that change exists.",
    intro: [
      "People who read housing news are usually trying to make a decision, not follow the market as a hobby. They want to know whether prices feel softer or firmer, whether inventory is changing, and whether waiting or acting now seems smarter for their situation.",
      "Use this page to read updates through an Oahu lens and then connect what you learn to area guides, financing questions, and property search decisions.",
    ],
    sidebar: {
      eyebrow: "How To Use It",
      heading: "How this should help you",
      paragraphs: [
        "Use updates here to understand what changed, why it matters, and which next step should help you act on it.",
        "The goal is not news for news sake. The goal is clearer decisions for buyers, sellers, and relocating families.",
      ],
      pills: uniqueKeywords(["Market Updates", "Oahu", "Housing Trends", "Decision Making"]),
    },
    sections: [
      {
        title: "What readers are looking for",
        pills: uniqueKeywords(["Price Trends", "Inventory", "Buyer Signals", "Seller Signals"]),
        paragraphs: [
          "Most readers want a quick market pulse they can actually use. They want to know whether inventory is opening up, whether competition still feels sharp, and what that might mean if they are planning to buy, rent, or sell in the near term.",
          "A good news page answers those motivations directly and then guides you into more specific resources instead of leaving you with broad headlines only.",
        ],
      },
      {
        title: "How updates connect to real decisions",
        pills: uniqueKeywords(["Neighborhoods", "VA Guidance", "Relocation", "Next Steps"]),
        paragraphs: [
          "This works best when it helps you connect fresh information to stable decisions. That means linking market commentary back to neighborhood pages, VA resources, relocation guidance, and the kinds of homes people are actually comparing.",
          "That structure keeps the page useful even when you are just beginning to research and do not yet know which specific area or property type will be the right fit.",
        ],
      },
      {
        title: "What makes updates easier to scan",
        pills: uniqueKeywords(["Article Cards", "Publish Dates", "Featured Topics"]),
        paragraphs: [
          "The best version of this page makes it easy to scan what is new, what changed, and which update is worth your time based on where you are in the buying, selling, or relocation process.",
          "That helps visitors move quickly without feeling buried in commentary that does not apply to them.",
        ],
      },
    ],
    faq: {
      eyebrow: "Common Questions",
      heading: "News page FAQs",
      intro: "These FAQs reflect the kinds of questions people often have when they are trying to use market news to make a decision.",
      items: [
        {
          question: "Can this page still help before updates become frequent?",
          answer: "Yes. Context on how to read market changes is still useful before the update cadence gets busier, especially if you are trying to time a move or purchase.",
        },
        {
          question: "Should older posts still link to evergreen pages?",
          answer: "Yes. News content is more useful when it connects readers to durable resources that help them act on what they just learned.",
        },
        {
          question: "What would make the updates easier to use?",
          answer: "Article previews, publish dates, related links, and a consistent update rhythm would make the section easier to scan and easier to trust.",
        },
      ],
    },
    cta: buildPageCta(
      "Connect market updates to next steps",
      "Once the market picture is clearer, move into the neighborhood, budget, or timing question that matters most to your situation.",
    ),
  };
}

function buildEvergreenPage(def) {
  if (def.kind === "community") return createCommunityPage(def);
  if (def.kind === "brand") return createBrandPage(def);
  if (def.kind === "brokerage") return createBrokeragePage(def);
  if (def.kind === "video") return createVideoPage(def);
  if (def.kind === "construction") return createConstructionPage(def);
  if (def.kind === "military") return createMilitaryResourcePage(def);
  if (def.kind === "va") return createVaPage(def);
  if (def.kind === "tool") return createToolPage(def);
  if (def.kind === "lifestyle") return createLifestylePage(def);
  if (def.kind === "news") return createNewsPage(def);

  throw new Error(`Unsupported evergreen page kind: ${def.kind}`);
}

function detectPropertyCommunity(title) {
  const communities = [
    "Ka Makana at Hoakalei",
    "Ocean Pointe",
    "Mililani Mauka",
    "Mililani",
    "Makakilo",
    "Kapolei",
    "Ewa Beach",
  ];

  return (
    communities.find(function (name) {
      return title.toLowerCase().indexOf(name.toLowerCase()) !== -1;
    }) || "Oahu"
  );
}

function detectPropertyType(title) {
  const tests = [
    { label: "Executive Home", pattern: /executive home/i },
    { label: "Single Family Home", pattern: /single family home|single family/i },
    { label: "Townhouse", pattern: /townhouse/i },
    { label: "Condominium", pattern: /condominium/i },
    { label: "Condo", pattern: /condo/i },
    { label: "Pool Home", pattern: /pool home/i },
    { label: "Home", pattern: /home/i },
  ];

  const match = tests.find(function (item) {
    return item.pattern.test(title);
  });

  return match ? match.label : "Property";
}

function extractNumberValue(title, pattern) {
  const match = title.match(pattern);
  return match ? match[1] : "";
}

function createPropertyPage(def) {
  const propertyDef =
    typeof def === "string"
      ? {
        label: def,
      }
      : def;
  const label = propertyDef.label;
  const path =
    propertyDef.path || `properties/${slugifyPageTitle(label)}.html`;
  const pageKey = propertyDef.slug || slugifyPageTitle(label);
  const community = propertyDef.community || detectPropertyCommunity(label);
  const propertyType = propertyDef.propertyType || detectPropertyType(label);
  const beds = extractNumberValue(label, /(\d+)\s*(?:BR|Bedroom|Bedrooms)/i);
  const baths = extractNumberValue(
    label,
    /(\d+(?:\.\d+)?)\s*(?:BA|Bath|Baths|Bathroom|Bathrooms)/i,
  );
  const price = extractNumberValue(label, /(\$[\d,]+(?:\s*Per Month)?)/i);
  const status =
    propertyDef.status ||
    (/for rent|rental|per month/i.test(label) ? "For Rent" : "For Sale");
  const featurePills = uniqueKeywords([
    beds ? `${beds} Bedrooms` : "",
    baths ? `${baths} Bathrooms` : "",
    price || "",
    propertyType,
    community,
    status,
  ]);

  return {
    key: pageKey,
    path: path,
    title: buildPropertySeoTitle(label, propertyType, community, status),
    description: `${label} with property context, ${community} neighborhood insight, and practical guidance for buyers or renters comparing their next move on Oahu.`,
    canonical: buildCanonical(path),
    keywords: uniqueKeywords([
      label,
      `${community} ${propertyType}`,
      `${community} homes`,
      `${community} real estate`,
      status === "For Rent" ? `${community} rentals` : `${community} homes for sale`,
      "Oahu property page",
      "Hawaii Military Realty",
    ]),
    hero: {
      image: "featured-home.jpg",
      imageAlt: `${label} property page for ${community}, Hawaii`,
      eyebrow: status,
      heading: label,
      intro: propertyAudienceLine(status, community, propertyType),
    },
    introEyebrow: "Property Overview",
    introHeading: `${community} ${propertyType.toLowerCase()} context`,
    introLead:
      status === "For Rent"
        ? "Use this page to judge rental fit quickly, especially if your move timeline is already tight."
        : "Use this page to judge fit clearly before you spend time, money, or emotional energy chasing the wrong home.",
    intro: [
      status === "For Rent"
        ? `Rental searches usually become real fast. You may be balancing orders, a lease expiration, school timing, pets, commute needs, or the pressure of finding something livable before you land. Use this page to decide whether ${label.toLowerCase()} is worth serious attention or whether it is better to keep scanning other options.`
        : `Home searches can get expensive in time and attention if every interesting listing gets treated like a finalist. Use this page to slow down just enough to ask the right questions about ${label.toLowerCase()} before you commit to showings, lender updates, or an offer strategy.`,
      `As stronger property details become available, this page can carry the specifics that matter most in ${community}: price, square footage, condition, association or maintenance costs where relevant, showing details, and the feature callouts that genuinely affect whether the property fits your plan.`,
    ],
    sidebar: {
      eyebrow: "Property Snapshot",
      heading:
        status === "For Rent"
          ? "What renters usually compare"
          : "What buyers usually compare",
      paragraphs: [
        status === "For Rent"
          ? `Focus first on availability, monthly cost, parking, location, pet or household needs, and how quickly you would need to act if this ${propertyType.toLowerCase()} matches your move timeline.`
          : `Focus first on the real monthly picture, property condition, location fit, and whether this ${propertyType.toLowerCase()} still makes sense once emotion is removed from the decision.`,
        `The neighborhood context matters too, because the home has to work inside ${community}, not just inside the photos.`,
      ],
      pills: featurePills,
    },
    sections: [
      {
        title: "What you should be able to tell quickly",
        pills: uniqueKeywords(["Photos", "Layout", "Condition", "Availability"]),
        paragraphs: [
          `A useful property page makes the basics obvious: what type of home this is, who it may fit, and what details deserve attention before you take the next step. For ${label.toLowerCase()}, that means clarifying the bedroom and bathroom count, the sale or rental status, and the practical strengths that may matter more than marketing language.`,
          status === "For Rent"
            ? "That clarity helps renters move quickly without making rushed decisions. If the page answers the right questions early, you can tell whether it deserves a showing request or whether it should stay off the shortlist."
            : "That clarity helps buyers protect their time. If the page answers the right questions early, you can tell whether the property deserves a tour or whether it only looked good at first glance.",
        ],
      },
      {
        title: `${community} location context`,
        pills: uniqueKeywords(["Neighborhood Fit", "Commute", "Schools", "Daily Routine"]),
        paragraphs: [
          `A property can look right until the area changes the equation. People considering homes in ${community} are often comparing commute routes, neighborhood feel, school routine, convenience, and whether the location fits military or civilian life on Oahu.`,
          status === "For Rent"
            ? "That matters for renters because a short lease or quick move does not make a bad location less frustrating. The home still has to support the way you will live once you move in."
            : "That matters for buyers because the long-term fit of the area can shape value, stress level, and quality of life just as much as the house itself.",
        ],
      },
      {
        title: "What details matter before you move forward",
        pills: uniqueKeywords(["Address", "Price", "Media", "Tour Request"]),
        paragraphs: [
          status === "For Rent"
            ? "For a rental, the next steps need to be simple: confirm availability, show the real monthly terms, clarify any move-in timing issues, and make it easy to request details without guessing."
            : "For a sale, the next steps need to be simple: confirm current pricing, show the strongest media, clarify any ownership costs that affect the monthly picture, and make the tour process straightforward.",
          "That kind of clarity helps the page serve someone who is actively narrowing choices instead of simply browsing headlines.",
        ],
      },
    ],
    faq: {
      eyebrow: "Common Questions",
      heading: "Property page FAQs",
      intro:
        status === "For Rent"
          ? "These are the practical questions renters often ask while trying to narrow options quickly."
          : "These are the practical questions buyers often ask while deciding whether a specific home deserves the next step.",
      items: [
        {
          question: "Can this page support full listing details?",
          answer: "Yes. The structure already supports address information, updated pricing, media, and showing details without changing the layout or metadata.",
        },
        {
          question: "Why include neighborhood content with a property?",
          answer: "Because visitors are evaluating more than the home itself. They are also deciding whether the surrounding area fits their commute, routine, and long-term goals.",
        },
        {
          question: "What should be confirmed before moving forward?",
          answer: "Confirm price, status, availability, address, square footage, association costs if relevant, and the exact instructions for tours, applications, or offers.",
        },
      ],
    },
    cta: buildPageCta(
      status === "For Rent"
        ? "Ask about this rental opportunity"
        : "Ask about this home",
      status === "For Rent"
        ? `If this rental looks like it could work, use the next step to confirm timing, terms, and whether it fits the move you are managing in ${community}.`
        : `If this home still looks like a fit after the basics are clear, use the next step to talk through price, neighborhood fit, and how to move forward in ${community}.`,
    ),
  };
}

const EVERGREEN_PAGE_DEFS = [
  {
    label: "Ewa Beach Real Estate Hawaii Listings",
    slug: "ewa-beach-real-estate-hawaii-listings",
    path: "ewa-beach-real-estate.html",
    kind: "community",
    seoTitle: "Ewa Beach Real Estate Listings",
    area: "Ewa Beach",
    listingsFocused: true,
    image: "hero-hawaii.jpg",
  },
  {
    label: "Our Cooperating Broker Commissions",
    slug: "our-cooperating-broker-commissions",
    path: "our-cooperating-broker-commissions.html",
    kind: "brokerage",
  },
  {
    label: "Hawaii VA Homebuying Video",
    slug: "hawaii-va-homebuying-video",
    path: "buyers/hawaii-va-homebuying-video.html",
    kind: "video",
  },
  {
    label: "New Home Construction",
    slug: "new-home-construction",
    path: "new-home-constructionewa-beach.html",
    kind: "construction",
  },
  {
    label: "Oahu Real Estate Property for Sale Listings | Real Estate Oahu",
    slug: "oahu-real-estate-property-for-sale-listings",
    path: "oahu-real-estate/oahu-realestate.html",
    kind: "community",
    seoTitle: "Oahu Real Estate Listings",
    area: "Oahu",
    listingsFocused: true,
    image: "diamond-head-neighborhood.jpg",
  },
  {
    label: "Hawaii Military Lodging",
    slug: "hawaii-military-lodging",
    path: "military-real-estate-hawaii/hawaii-military-lodging.html",
    kind: "military",
    keyword: "Hawaii military lodging",
    subject: "Military Lodging",
  },
  {
    label: "VA Loan Information",
    slug: "va-loan-information",
    path: "category/va-loan-information.html",
    kind: "va",
  },
  {
    label: "Mortgage Calculator",
    slug: "mortgage-calculator",
    path: "buyers/mortgage-calculator.html",
    kind: "tool",
  },
  {
    label: "Hawaii Bases and Barracks",
    slug: "hawaii-bases-and-barracks",
    path: "military-real-estate-hawaii/hawaii-bases-and-barracks.html",
    kind: "military",
    keyword: "Hawaii bases and barracks",
    subject: "Bases and Barracks",
  },
  {
    label: "Hawaii Golf Courses",
    slug: "hawaii-golf-courses",
    path: "resources/hawaii-golf-courses.html",
    kind: "lifestyle",
  },
  {
    label: "Mililani Real Estate",
    slug: "mililani-real-estate",
    path: "category/mililani-real-estate.html",
    kind: "community",
    area: "Mililani",
    image: "diamond-head-neighborhood.jpg",
  },
  {
    label: "VA Home Buying in Hawaii",
    slug: "va-home-buying-in-hawaii",
    path: "category/va-home-buying-in-hawaii.html",
    kind: "va",
  },
  {
    label: "Ewa Beach Real Estate",
    slug: "ewa-beach-real-estate",
    path: "category/ewa-beach-real-estate.html",
    kind: "community",
    area: "Ewa Beach",
    image: "hero-hawaii.jpg",
  },
  {
    label: "Opportune Lift Program (OPLIFT)",
    slug: "opportune-lift-program-oplift",
    path: "military-real-estate-hawaii/oplift.html",
    kind: "military",
    keyword: "OPLIFT Hawaii",
    subject: "OPLIFT support and military travel planning",
  },
  {
    label: "The Right Down Payment on Hawaii Home",
    slug: "the-right-down-payment-on-hawaii-home",
    path: "buyers/are-you-making-the-right-down-payment.html",
    kind: "va",
    introHeading: "Down payment strategy in a Hawaii context",
  },
  {
    label: "Hawaii Real Estate News",
    slug: "hawaii-real-estate-news",
    path: "resources/hawaii-real-estate-news.html",
    kind: "news",
  },
  {
    label: "Hawaii Military Realty, Inc.",
    slug: "hawaii-military-realty-inc",
    path: "uncategorized/hawaii-military-realty-inc.html",
    kind: "brand",
    image: "hero-bg-about.jpg",
    heroEyebrow: "Company Overview",
    introHeading: "What to know about the company",
  },
  {
    label: "Kapolei Real Estate Listings and Information",
    slug: "kapolei-real-estate-listings-and-information",
    path: "kapolei-real-estate-2/kapolei-real-estate.html",
    kind: "community",
    seoTitle: "Kapolei Real Estate Listings",
    area: "Kapolei",
    listingsFocused: true,
    image: "hero-hawaii.jpg",
  },
  {
    label: "Hawaii Commissaries",
    slug: "hawaii-commissaries",
    path: "military-real-estate-hawaii/hawaii-commissaries.html",
    kind: "military",
    keyword: "Hawaii commissaries",
    subject: "Commissary planning and base-area support",
  },
];

const PROPERTY_PAGE_DEFS = [
  {
    label: "POOL Home for Sale in Ka Makana at Hoakalei in Ewa Beach, Hawaii",
    path: "featured/pool-home-for-sale-in-ka-makana-at-hoakalei-in-ewa-beach-hawaii.html",
    status: "For Sale",
  },
  {
    label: "3 Bedroom Townhouse in Makakilo",
    path: "oahu-available-rental-properties/3-bedroom-townhouse-in-makakilo.html",
    status: "For Rent",
  },
  {
    label: "3 Bedroom, 2.5 Bathroom Townhouse in Ewa Beach (Ocean Pointe)",
    path: "oahu-available-rental-properties/3-bedroom-2-5-bathroom-townhouse-in-ewa-beach-ocean-pointe.html",
    status: "For Rent",
  },
  {
    label: "2 Bedroom, 1.5 Bath Condo in Ewa Beach",
    path: "oahu-available-rental-properties/2-bedroom-1-5-bath-condo-in-ewa-beach.html",
    status: "For Rent",
  },
  {
    label: "3 Bedroom, 2 Bathroom Townhouse in Mililani Mauka",
    path: "oahu-available-rental-properties/3-bedroom-2-bathroom-townhouse-in-mililani-mauka.html",
    status: "For Rent",
  },
  {
    label: "$3,000, 4 BR, 3 BA Single Family Home in Kapolei",
    path: "oahu-available-rental-properties/4-br-3-ba-rental-in-kapolei.html",
    status: "For Rent",
  },
  {
    label: "3 BR, 1.5 Bath with Ocean Views",
    path: "oahu-available-rental-properties/3-br-1-5-bath-with-ocean-views.html",
    status: "For Rent",
  },
  {
    label: "2 BR, 2 BA with 2 Car Garage in Ewa Beach",
    path: "oahu-available-rental-properties/2-br-2-ba-with-2-car-garage-in-ewa-beach.html",
    status: "For Rent",
  },
  {
    label: "4 Bedroom, 3 Bathroom Single Family Home in Ewa Beach",
    path: "oahu-available-rental-properties/4-bedroom-3-bathroom-single-family-home-in-ewa-beach.html",
    status: "For Rent",
  },
  {
    label: "3 Bedroom, 2.5 Bathroom in Ocean Pointe",
    path: "oahu-available-rental-properties/3-bedroom-2-5-bathroom-in-ocean-pointe.html",
    status: "For Rent",
  },
  {
    label: "For Rent: 3 BR, 2 Bath Condominium in Mililani, Hawaii",
    path: "oahu-available-rental-properties/for-rent-2-br-2-ba-condominium-in-mililani-hawaii.html",
    status: "For Rent",
  },
  {
    label: "3 Bedroom, 2.5 Bath Townhouse at Fairways Edge",
    path: "oahu-available-rental-properties/3-bedroom-2-5-bath-townhouse-at-fairways-edge.html",
    status: "For Rent",
  },
  {
    label: "4 Bedroom Rental in Ewa Beach, Hawaii",
    path: "oahu-available-rental-properties/4-bedroom-2-5-bathrooms-1538-sf-in-ewa-beach-2500-per-month.html",
    status: "For Rent",
  },
  {
    label: "For Rent: 5 Bedroom Executive Home with 3 Car Garage in Ocean Pointe",
    path: "oahu-available-rental-properties/for-rent-5-bedroom-executive-home-with-3-car-garage-in-ocean-pointe.html",
    status: "For Rent",
  },
  {
    label: "For Rent: 2 BR, 2 Bath Condominium in Mililani Mauka",
    path: "oahu-available-rental-properties/for-rent-2-br-2-bath-condominium-in-mililani-mauka.html",
    status: "For Rent",
  },
  {
    label: "4 Bedroom, 3 Bath Single Family Home, 2,060 SF",
    path: "oahu-available-rental-properties/4-bedroom-3-bath-single-family-home-2060-sf.html",
    status: "For Rent",
  },
  {
    label: "2 Bedroom, 2 Bathroom Condo in Mililani",
    path: "oahu-available-rental-properties/2-bedroom-2-bathroom-condo-in-mililani.html",
    status: "For Rent",
  },
  {
    label: "2 Bedroom, 1.5 Bath Condo in Ewa Beach, $1,500 Per Month",
    path: "oahu-available-rental-properties/2-bedroom-1-5-bath-condo-in-ewa-beach-1500-per-month.html",
    status: "For Rent",
  },
];

const EVERGREEN_CONTENT_EXPANSIONS = {
  "ewa-beach-real-estate-hawaii-listings": {
    description: "Practical Ewa Beach real estate listings guidance for Oahu buyers comparing home type, commute, VA financing, schools, hazards, and tour timing.",
    keywords: [
      "Ewa Beach real estate listings",
      "Ewa Beach homes for sale",
      "Ewa Beach VA buyers",
      "West Oahu real estate",
      "Oahu military relocation",
      "Ewa Beach listing tours",
    ],
    heroEyebrow: "Ewa Beach Listings",
    heroIntro: "Ewa Beach listings can look similar online, but the right choice depends on commute pattern, financing, property type, neighborhood rules, and how the home will work after the first week on island.",
    introEyebrow: "Listing Strategy",
    introHeading: "How to compare Ewa Beach real estate listings before you tour",
    introLead: "Use this page to turn an Ewa Beach search from a photo scroll into a practical shortlist.",
    intro: [
      "A useful Ewa Beach listings search starts with the life you are trying to build on Oahu. The area can appeal to buyers who want West Oahu space, newer residential communities, townhome options, single-family homes, and a neighborhood feel that is different from town. That does not mean every listing with an Ewa Beach address solves the same problem.",
      "The Census Bureau's 2020-2024 QuickFacts estimates for the Ewa Beach CDP report 3,385 households, an owner-occupied housing rate of 72.9 percent, and a mean travel time to work of 38.0 minutes for workers age 16 and older. Those community-level figures do not price any current home or predict an individual commute, but they explain why monthly cost, travel patterns, and household fit should be tested early.",
      "For military and remote buyers, the best listing is not always the newest home or the biggest floor plan. It is the one that fits your orders, lender guidance, school logistics, commute tolerance, parking needs, and maintenance comfort. Ewa Beach can stay high on the list, but only after each candidate survives those Oahu-specific checks.",
    ],
    sidebar: {
      eyebrow: "Best Fit",
      heading: "Who this page helps",
      paragraphs: [
        "This page is for buyers, military families, and remote searchers who already know Ewa Beach is on the short list and need practical listing guidance before they request tours.",
        "Use it before you ask for showings, video walkthroughs, or offer strategy. The goal is to sort listings by daily use, financing reality, and location-specific risk instead of reacting only to photos, square footage, or a low apparent monthly payment.",
      ],
      pills: ["Ewa Beach", "Listings", "West Oahu", "PCS Buyers", "VA Buyers", "Remote Tours"],
    },
    sections: [
      {
        title: "Start with property type and monthly fit",
        pills: ["Home Type", "Budget", "Fees", "Condition"],
        paragraphs: [
          "Ewa Beach inventory can include detached homes, attached homes, townhomes, condos, and homes in planned communities. Compare them by the full monthly obligation, not only by list price. Association fees, insurance, property taxes, maintenance reserves, utilities, and commute fuel can change which listing is actually sustainable.",
          "A newer-looking home may still carry association rules, parking limits, landscaping expectations, or design review requirements. An older home may need more immediate repair planning but offer a different yard, street pattern, or renovation path. Ask what the listing does not show clearly: roof age, cooling approach, storage, guest parking, street noise, sun exposure, and whether the floor plan works for your household's normal week.",
          "Remote buyers should treat every promising listing as provisional until the condition questions are answered. Request a video tour that slows down at windows, exterior walls, garage areas, mechanical systems, nearby streets, and parking. Photos are useful for first impressions; they are not a substitute for seeing how the home sits in the neighborhood.",
        ],
      },
      {
        title: "Test the commute before the shortlist gets emotional",
        pills: ["Commute", "Base Access", "H-1", "Fort Weaver Road"],
        paragraphs: [
          "Ewa Beach can be a strong fit for buyers who want West Oahu living, but commute planning needs to happen before favorites form. Joint Base Pearl Harbor-Hickam, Fort Shafter, Schofield Barracks, Wheeler, Kapolei, downtown Honolulu, and airport-area work can create very different daily patterns from the same listing address.",
          "Official military relocation resources place Joint Base Pearl Harbor-Hickam west of Honolulu near Daniel K. Inouye International Airport, while Army resources describe units across Fort Shafter, Schofield Barracks, and Joint Base Pearl Harbor-Hickam. That means a military buyer should confirm the actual duty location, gate routine, report time, and spouse commute before deciding that one Ewa Beach listing is better than another.",
          "Do not rely on a single map estimate. Test likely departure windows, school drop-off needs, and weekend routines. A home that works for one service member assigned near Pearl Harbor may feel very different for a household splitting time between Schofield, town, and Ewa Beach schools or activities.",
        ],
      },
      {
        title: "Check schools, hazards, and parcel details by address",
        pills: ["Schools", "Flood Zone", "Tsunami Zone", "Parcel Review"],
        paragraphs: [
          "School assumptions should be verified by address. The Hawaii Department of Education's SchoolSite Locator lets users enter a street address to see general service areas, but DOE also says the locator is for reference only and should not be the sole source for relocation, purchase, or rent decisions. Confirm directly with the school before relying on a boundary for a purchase decision.",
          "Because Ewa Beach includes coastal and low-lying areas, property-specific hazard review matters. The City and County of Honolulu's Department of Emergency Management launched Oahu Hazard Explorer so residents can enter an address or select a map location to review tsunami evacuation, flood zone, wildfire risk, and dam or levee evacuation information. That tool is useful for preparedness conversations and for deciding what follow-up questions a listing needs.",
          "Honolulu's Department of Planning and Permitting also directs property researchers to Parcel Information for flood zone, zoning, Special Management Area, warnings, and advisories by address or TMK. Before you write an offer, use those public tools alongside seller disclosures, insurance quotes, inspection findings, and professional guidance so the listing is not evaluated only by interior condition.",
        ],
      },
      {
        title: "Use VA and lender rules as early filters",
        pills: ["VA Loan", "COE", "Condo Review", "Payment"],
        paragraphs: [
          "VA buyers should connect Ewa Beach listing research with lender review early. VA explains that buyers using a VA-backed purchase loan go through a private lender and need a Certificate of Eligibility as proof of qualification. VA also states that there are no county loan limits for Veterans with full entitlement, while county limits still matter for buyers with previously used entitlement that has not been restored.",
          "Those rules do not mean every Ewa Beach listing is automatically a clean VA fit. Condos and townhomes can raise project-approval questions, association budget questions, insurance questions, and appraisal timing issues. Detached homes can still raise condition, repair, or appraisal concerns. A listing that fits the search map should be screened against your lender's requirements before you spend limited tour time on it.",
          "If you are using BAH, a VA loan, or another military-timed financing plan, build the shortlist around monthly payment and cash-to-close realities. Keep lender estimates current, ask whether association fees or insurance assumptions changed the approval picture, and avoid stretching only because one listing looks rare.",
        ],
      },
      {
        title: "Turn online favorites into a tour plan",
        pills: ["Video Tours", "Offer Timing", "Shortlist", "Next Steps"],
        paragraphs: [
          "The strongest Ewa Beach shortlist usually has fewer homes and better questions. Rank each candidate by must-have fit, acceptable tradeoffs, unresolved risks, and decision deadline. If a listing fails on commute, school verification, payment, parking, or hazard comfort, remove it before it absorbs attention from better matches.",
          "For in-person tours, look beyond finishes. Check garage usability, driveway slope, guest parking, cross-breeze, afternoon heat, neighboring lots, road noise, storage, stairs, trash area, and how easy it feels to get out of the neighborhood. For video tours, ask for the same practical checks and make sure the camera shows transitions between rooms instead of only wide-angle highlights.",
          "When a home survives those steps, then it is time to discuss offer strategy, contingencies, inspection priorities, and timing. The point is not to make Ewa Beach harder than it needs to be. It is to make sure the home you pursue has already passed the checks that matter most on Oahu.",
        ],
      },
    ],
    faq: {
      eyebrow: "Common Questions",
      heading: "Ewa Beach listings FAQs",
      intro: "These questions come up often when buyers are deciding whether an Ewa Beach listing deserves a tour, a video walkthrough, or an offer conversation.",
      items: [
        {
          question: "Is Ewa Beach a good place to focus my Oahu home search?",
          answer: "It can be a strong fit if you want West Oahu housing options and the commute, monthly cost, school plan, and property type all work for your household. The right answer depends on your daily route and budget, not only on the neighborhood name.",
        },
        {
          question: "What should I compare first when looking at Ewa Beach homes for sale?",
          answer: "Start with property type, full monthly payment, association fees, parking, commute pattern, school verification, and property-specific hazards. Those factors usually remove poor-fit listings faster than cosmetic preferences do.",
        },
        {
          question: "Can I use a VA loan for an Ewa Beach listing?",
          answer: "Many buyers use VA financing on Oahu, but the specific property and your entitlement situation still need lender review. Confirm your COE, remaining entitlement if applicable, condo or association questions, appraisal timing, and payment comfort before relying on any listing as a VA-ready option.",
        },
        {
          question: "How should remote buyers tour Ewa Beach listings?",
          answer: "Use video tours to check condition, parking, exterior exposure, nearby streets, storage, and layout flow. Ask for practical footage, not only room-by-room highlights, and keep any offer strategy tied to inspections, disclosures, lender review, and your arrival timeline.",
        },
        {
          question: "Should I verify school boundaries before offering?",
          answer: "Yes. Use the Hawaii Department of Education locator as a starting point, then contact the school directly because DOE says the locator is for reference and should not be the sole source for relocation, purchase, or rent decisions.",
        },
      ],
    },
    cta: buildPageCta(
      "Compare Ewa Beach listings with local context",
      "Call or text before you spend time on listings that do not fit your commute, budget, financing, school plan, or move timeline."
    ),
  },
  "our-cooperating-broker-commissions": {
    description: "A plain-language guide to buyer-broker compensation, seller-authorized offers, referrals, written agreements, and VA buyer considerations in Oahu real estate.",
    keywords: ["Oahu cooperating broker commission", "Hawaii buyer broker compensation", "buyer representation agreement Hawaii", "VA buyer broker fee Hawaii", "real estate referral Oahu"],
    heroEyebrow: "Brokerage Compensation Guide",
    heroIntro: "Broker compensation is negotiable, property-specific, and best settled in writing before a showing, offer, or referral creates expectations. This guide explains the questions Oahu buyers, sellers, and cooperating professionals should resolve together.",
    introEyebrow: "Clear Terms Before Action",
    introHeading: "How cooperating-broker compensation works now",
    introLead: "There is no single commission that applies to every Oahu sale, buyer relationship, or broker referral.",
    intro: [
      "A buyer may agree to compensate a buyer broker for defined services. A seller may authorize a listing broker to offer payment to a broker representing a buyer, or the parties may negotiate buyer costs in the purchase contract. Those are separate decisions, and the final arrangement depends on the written representation, listing, compensation, and transaction documents—not on an assumed islandwide rate.",
      "For National Association of REALTORS® settlement-covered MLSs, offers of buyer-broker compensation are no longer displayed on the MLS. An offer can still be communicated and negotiated outside the MLS when the seller authorizes it. MLS participants working with a buyer also generally need a written agreement before touring a home. These practice rules make an early compensation conversation more important; they do not set a required fee or eliminate consumer choice.",
      "On Oahu, the issue often intersects with a short PCS timeline, a remote buyer or seller, VA financing, or an off-island referral. The practical goal is to identify who represents whom, what services each brokerage will provide, what compensation has been agreed to, which source may pay it, and what happens if that source pays less than the buyer agreed to pay their broker. Confirm those points before anyone relies on an informal message or starts work.",
    ],
    sidebar: {
      eyebrow: "Start With Your Role",
      heading: "The right question depends on who you are",
      paragraphs: [
        "Buyers should review services, duration, exclusivity, cancellation, compensation, and any potential shortfall. Sellers should decide what, if anything, they authorize their listing brokerage to offer or pay toward buyer representation and evaluate that choice as part of the listing strategy.",
        "Cooperating brokers and referral partners should contact the brokerage directly, identify the client and property or market area, and put the agreement in writing before providing the service that may earn compensation. This page is general information, not a standing offer of compensation or a substitute for the controlling documents.",
      ],
      pills: ["Buyers", "Sellers", "Cooperating Brokers", "Referral Partners", "VA Buyers"],
    },
    sections: [
      {
        title: "Separate representation from the source of payment",
        pills: ["Agency", "Services", "Payment Source"],
        paragraphs: [
          "Representation answers who the brokerage works for and what duties or services it has accepted. Compensation answers how that brokerage may be paid. A buyer broker does not become the seller's representative merely because a seller or listing broker contributes to the buyer broker's compensation. Likewise, a buyer should not infer representation simply because an agent opened a door or supplied listing information. Hawaii's agency-disclosure rules require the parties' representation to be disclosed and confirmed in the purchase contract; ask your licensee to explain the form and the relationship that applies to your transaction.",
          "The buyer-broker agreement should state the services and an objectively determinable compensation amount or method. It should also explain whether the buyer may owe a difference when an authorized seller or listing-broker payment is lower than the agreed buyer-broker compensation. Under the NAR settlement practice changes, an MLS participant cannot receive more from all sources than the amount agreed to with the buyer. Buyers should review the agreement before signing, ask about cancellation and exclusivity, and retain a copy.",
          "A seller's decision belongs in the seller's listing and transaction strategy. The seller can discuss with the listing broker whether an authorized payment toward buyer representation might support access or offer competitiveness, what amount or method is acceptable, and how it will be communicated outside the MLS. NAR guidance requires settlement-covered listing brokers to obtain the seller's written approval before offering or paying compensation to a buyer-side broker and to specify the amount or rate. The seller can also compare offers on their complete financial and contractual terms rather than treating one line item in isolation.",
        ],
      },
      {
        title: "What to confirm for a specific Oahu property",
        pills: ["Before Touring", "Before Offering", "Written Confirmation"],
        paragraphs: [
          "Before a private tour, the buyer and buyer broker should know which written agreement applies and what it says about scope, term, geographic area, compensation, and exit options. An open house attended without the listing agent working with the visitor as a buyer is treated differently under the NAR practice rules, but an unrepresented visitor should still understand that the listing agent works for the seller. Ask rather than assume.",
          "Before writing an offer, confirm whether the seller or listing brokerage has authorized any payment toward buyer-broker compensation, the exact amount or calculation, and whether a separate broker-to-broker agreement is needed. The buyer broker should compare that confirmed amount with the buyer agreement. If there is a gap, the buyer needs to understand the potential cash obligation and discuss with their agent and lender whether to request a seller-paid amount as an offer term. A request is negotiable; it is not guaranteed and may affect how the seller evaluates the offer's net terms.",
          "Oahu transactions frequently involve condominium documents, leasehold interests, association costs, insurance questions, and tight arrival or departure dates. Those items deserve their own review and should not get lost in a compensation discussion. A clean file identifies the agency relationship and compensation path early, then lets the buyer and seller evaluate price, financing, contingencies, condition, timing, and net proceeds together.",
        ],
      },
      {
        title: "Special planning for VA-financed buyers",
        pills: ["VA Loan", "Liquid Funds", "Closing Disclosure"],
        paragraphs: [
          "VA policy currently permits eligible VA home-loan buyers to pay reasonable and customary buyer-broker charges under a temporary local variance for qualifying purchase contracts. The charge cannot be added to the VA loan amount, and a buyer-paid amount is considered when the lender determines whether the borrower has enough liquid assets to close. VA also treats the buyer-broker agreement as part of the sales-contract package and expects applicable buyer-paid compensation to appear on the Closing Disclosure.",
          "The seller may still pay the VA buyer's broker charge, and VA states that this payment is not treated as a seller concession. That distinction is useful, but it does not mean every seller will agree to pay or that every proposed fee automatically satisfies VA requirements. Before making an offer, a VA buyer should give the representation agreement to the lender, ask the lender to model any buyer-paid amount in cash-to-close, and confirm current VA guidance. VA policy can change, so the lender and agent should verify the rule for the specific file rather than relying on an old transaction.",
          "For a military household moving to Oahu, cash reserves may also need to cover temporary lodging, deposits, vehicles, household setup, and costs that cannot be financed. Comparing compensation options early helps prevent a last-minute cash surprise and allows the offer strategy to reflect both competitiveness and the family's arrival plan.",
        ],
      },
      {
        title: "Cooperating brokers and referral partners: document the handoff",
        pills: ["Broker-to-Broker", "Referrals", "Client Handoff"],
        paragraphs: [
          "A cooperating broker seeking property-specific compensation should contact the listing brokerage through its stated channel and verify the terms before relying on them. A useful written confirmation identifies the property, parties or roles, amount or calculation, conditions that earn the compensation, and any required signatures. An advertisement, prior custom, or compensation offered on another listing should not be treated as the terms for the current property.",
          "A referral is different from cooperating on a particular sale. Referral partners should identify the prospective client, destination market, contemplated service, referral amount or method, exclusions, payment trigger, and expiration. They should also confirm licensing and brokerage approval requirements through their principal or broker in charge before sharing protected client information or expecting a fee. A warm introduction alone does not replace an accepted referral agreement.",
          "Remote handoffs deserve extra care. State the client's consent to be contacted, preferred communication method, Oahu target area, purchase or rental objective, military or civilian timeline, and whether another professional is already representing the client. Do not send sensitive financial, eligibility, or orders information unless it is needed and the client has authorized a secure transfer. Clear scope protects the client and makes the professional relationship easier to manage.",
        ],
      },
      {
        title: "A practical compensation checklist",
        pills: ["Questions to Ask", "Compare Terms", "Next Step"],
        paragraphs: [
          "Buyers can ask: What services are included? Is the agreement exclusive? How long does it last? How is compensation calculated? Can payment come from the seller or listing broker? Could I owe a shortfall? How do cancellation and property-specific agreements work? Sellers can ask: What am I paying my listing brokerage for? Have I authorized any payment to a buyer-side professional? How could that choice affect marketing, negotiation, and estimated net proceeds? What written approval is required?",
          "Professionals can ask: Which brokerage and licensees are involved? Who represents each party? Is the proposed compensation authorized and documented? What event earns it? Does the buyer agreement permit the amount? Are there financing constraints or disclosure steps? Is this cooperation on a listing or a separate referral? Resolve inconsistent answers before touring, drafting an offer, or transferring a client.",
          "Commission terms are negotiable and transaction-specific. Ask a Hawaii-licensed real estate professional to explain the brokerage documents, a lender to verify financing treatment, and an attorney to answer legal questions. Hawaii Military Realty can discuss its own services and the facts of a specific Oahu property, buyer relationship, seller engagement, or proposed referral; it cannot confirm another firm's obligations for them.",
        ],
      },
    ],
    faq: {
      eyebrow: "Common Questions",
      heading: "Cooperating-broker commission FAQs",
      intro: "Use these answers to frame the conversation, then rely on the signed documents and current guidance for the actual transaction.",
      items: [
        {
          question: "Is there a standard cooperating-broker commission on Oahu?",
          answer: "No universal rate applies to every transaction. Compensation is negotiable and depends on the buyer agreement, seller authorization, any broker-to-broker agreement, and the purchase contract. Confirm the amount and payment source for the specific property in writing.",
        },
        {
          question: "Can a seller still pay a buyer broker?",
          answer: "Yes. A seller may authorize a listing broker to offer or pay buyer-broker compensation outside the MLS, or the parties may negotiate a seller-paid amount in the offer. The seller's approval and the applicable terms should be written, and the buyer broker cannot receive more than the buyer agreed to pay under settlement-covered NAR practice rules.",
        },
        {
          question: "Why is buyer-broker compensation not shown in the MLS?",
          answer: "NAR's settlement practice changes prohibit offers of compensation on settlement-covered MLSs. That does not prohibit compensation; it means any seller- or listing-broker-authorized offer must be communicated and negotiated away from the MLS.",
        },
        {
          question: "Must I sign a buyer agreement before seeing a home?",
          answer: "MLS participants working with a buyer generally must have a written agreement before touring a home under NAR's practice rules. Open-house and listing-agent situations can differ. Ask the professional which role they are performing and read the scope, term, services, compensation, and cancellation language before signing.",
        },
        {
          question: "Can a VA buyer pay a buyer-broker fee?",
          answer: "Current VA guidance allows reasonable and customary buyer-broker charges under its temporary variance, subject to conditions. The fee cannot be financed into the VA loan, affects the lender's liquid-assets review, and may instead be paid by the seller. Confirm current treatment with the VA lender before the offer.",
        },
        {
          question: "Is this page a standing offer of compensation or referral fee?",
          answer: "No. It provides general information only. A cooperating broker or referral partner should contact Hawaii Military Realty with the specific property or client context and obtain an accepted written agreement before relying on any compensation term.",
        },
      ],
    },
    cta: buildPageCta(
      "Clarify the terms before the next step",
      "Share whether you are a buyer, seller, cooperating broker, or referral partner and identify the Oahu property or client situation. We can discuss our role, services, and the written terms needed before a tour, offer, or handoff."
    ),
  },
  "hawaii-va-homebuying-video": {
    description: "Watch the Hawaii VA homebuying overview, then use this Oahu guide to prepare your COE, budget, property checks, remote search, and offer plan.",
    keywords: ["Hawaii VA homebuying video", "VA home loan Oahu", "military home buying Hawaii", "Oahu VA buyer guide"],
    heroEyebrow: "Hawaii VA Buyer Briefing",
    heroIntro: "Start with the short Hawaii VA homebuying overview, then use this written briefing to turn the process into an Oahu-specific plan for financing, property checks, tours, and an offer.",
    introEyebrow: "Before You Search",
    introHeading: "A short briefing for a high-stakes Oahu purchase",
    introLead: "The VA benefit can be powerful, but the loan program is only one part of choosing a home that works for your payment, assignment, and daily life.",
    intro: [
      "This resource is for active duty members, veterans, and eligible surviving spouses who want the sequence before the detail. The practical order is to verify the benefit, compare lenders, set an all-in monthly ceiling, screen Oahu locations, evaluate the property, and write an offer that matches both the financing and your move calendar. A military spouse helping manage the search can use the same checklist, but the lender and VA must confirm who qualifies and how the borrowers will be structured.",
      "A VA-backed purchase loan comes from a private lender; VA guarantees part of it. A Certificate of Eligibility proves benefit eligibility, but it is not a loan approval. The lender still reviews credit, income, debts, and assets, and the property must support the transaction. Treat preapproval as the beginning of the housing budget conversation, not permission to shop at the highest possible number.",
      "Oahu adds decisions that a national explainer cannot settle for you. A condo may have maintenance fees and must be in a VA-approved project. A detached home may trade a longer commute for more space. Insurance, hazard exposure, parking, condition, utilities, and temporary-lodging overlap can all change the real cost. Watch for orientation, then use the sections below to build questions for a VA lender and a local real estate professional.",
    ],
    sidebar: {
      eyebrow: "Your First Brief",
      heading: "Bring these facts to the first call",
      paragraphs: [
        "Share your expected arrival or move date, duty location, household and pet needs, available cash, current housing obligation, desired monthly ceiling, and whether you are buying from off island. If you have used the benefit before, say so early so the lender can review remaining entitlement.",
        "Ask the lender to distinguish your COE, preapproval, estimated cash to close, funding-fee treatment, rate and points, and assumptions used for taxes, insurance, and association dues. Financing answers belong with the lender; neighborhood, property, tour, and offer strategy belong in the real estate conversation.",
      ],
      pills: ["COE", "VA Lender", "PCS Timeline", "All-In Payment", "Remote Search"],
    },
    sections: [
      {
        title: "1. Confirm the benefit, then compare the loan",
        pills: ["Eligibility", "COE", "Preapproval", "Entitlement"],
        paragraphs: [
          "Request your COE through VA or ask a participating lender to help obtain it. VA explains that the COE confirms eligibility for the home-loan benefit; the lender separately decides whether you qualify for a particular loan. Starting early gives you time to address service documentation, a prior VA loan, or an entitlement-restoration question before a property deadline is involved.",
          "Compare more than an advertised rate. Ask each lender for the same purchase-price and down-payment scenario, then compare rate, discount points, lender fees, estimated closing costs, cash required, and monthly payment. Ask whether the VA funding fee applies to you and whether it would be paid at closing or financed. VA publishes the governing fee rules, but only the lender can price your actual file.",
          "Full entitlement does not mean unlimited borrowing. VA says borrowers with full entitlement do not have a VA loan limit, but the lender must still approve the amount and the appraisal must support the purchase. If entitlement is not fully restored, county loan limits can affect how much may be borrowed without a down payment. Have the lender calculate this rather than relying on a generic calculator or an old approval letter.",
        ],
      },
      {
        title: "2. Build an Oahu payment, not just a price range",
        pills: ["Monthly Cost", "Association Fees", "Insurance", "Reserves"],
        paragraphs: [
          "Translate preapproval into an all-in housing ceiling you can live with. Include principal and interest, property taxes, homeowners insurance, any condominium or association dues, and costs the payment estimate may omit. Then protect room for utilities, transportation, maintenance, and the ordinary cost of settling into island life. A home can be lender-approved and still be too tight for the household.",
          "Association dues deserve line-by-line attention because they can change both affordability and what the owner must maintain. Ask for the current dues, what they cover, pending assessments, reserve information, insurance responsibilities, and the documents available for review. Do not compare a condo payment with a detached-home payment until you understand which expenses sit inside and outside each number.",
          "Keep cash needs separate from the phrase ‘no down payment.’ VA-backed loans may offer a no-down-payment option, but buyers can still face closing costs, inspections, prepaid items, moving expenses, appraisal-related negotiations, and post-closing repairs. Preserve a reserve that fits your household and ask the lender for an updated estimate whenever the price, credits, rate, or property type changes.",
        ],
      },
      {
        title: "3. Screen the location before falling for the home",
        pills: ["Duty Station", "Commute", "Daily Routine", "Hazards"],
        paragraphs: [
          "Begin with the duty location and daily routine, not a list of famous neighborhoods. Compare when the service member must report, where a spouse works, school or child-care logistics, medical needs, and how many vehicles the household will have. Test likely trips at the times you would actually travel; island distance alone is a poor substitute for a commute plan.",
          "Use two or three serious search zones and name the tradeoff in each. West and Central Oahu options may produce different combinations of space, property type, maintenance fees, and travel to work. Windward or urban options solve different routines. The goal is not to declare one area best, but to know what each location makes easier and what it asks the household to tolerate.",
          "Check property-specific hazards rather than making assumptions about an entire community. The City and County of Honolulu’s Oahu Hazard Explorer lets residents look up mapped tsunami, flood, wildfire, and dam or levee evacuation information. Use that public planning tool as a starting point, then ask the insurer, lender, inspectors, and appropriate agencies about the specific address and coverage requirements.",
        ],
      },
      {
        title: "4. Verify that the property works for VA financing",
        pills: ["Condo Approval", "Appraisal", "Inspection", "Property Condition"],
        paragraphs: [
          "For a condominium, confirm the project’s VA approval status before investing heavily in the transaction. VA guidance says a condo purchased with the benefit must be in a VA-approved project; if it is not approved, project documents must be submitted for review. Approval is a project-level financing question, not proof that a particular unit is physically sound or financially right for you.",
          "Do not confuse the VA appraisal with a home inspection. The appraisal supports valuation and reviews the property against VA minimum property requirements. VA separately recommends an inspection. Hire appropriate inspectors within the contract timeline and use their findings to understand systems, condition, likely repairs, and questions that require specialists. Your agent and lender can explain process options; inspectors evaluate condition.",
          "Before offering, identify issues that could affect value, loan eligibility, insurability, or closing time. Review seller disclosures and available association materials, ask what is included in the sale, and discuss visible condition with your agent. If a concern appears after contract, respond through the agreement’s deadlines rather than assuming the appraisal will solve it.",
        ],
      },
      {
        title: "5. Make remote tours and the offer deliberate",
        pills: ["Video Tours", "Offer Terms", "Timeline", "Closing Plan"],
        paragraphs: [
          "If you are off island, use live video as a verification tool. Ask for the approach, street, parking, common areas, views in both directions, storage, utility spaces, signs of noise, and visible wear—not only a smooth walkthrough of the best rooms. Request measurements or follow-up footage when a detail affects furniture, accessibility, pets, or work-from-home plans.",
          "An offer is more than price. Coordinate the financing type, deposit, inspection period, appraisal timing, requested credits, closing date, occupancy, and any sale or lease obligations. A stronger offer is one you can perform, not one that strips away protections you do not understand. Ask the lender to confirm the financing timeline and your agent to explain the real estate terms before signing.",
          "Plan the handoff from contract to arrival. Decide who can attend inspections, how documents will be signed, when funds must be available, whether a power of attorney is contemplated, and what happens if orders or travel change. Confirm legal questions with an attorney and signing or loan requirements with the lender and closing professionals. Keep temporary lodging flexible until the closing plan is dependable.",
        ],
      },
    ],
    faq: {
      eyebrow: "Hawaii VA Questions",
      heading: "Answers to use after the video",
      intro: "These answers establish the process, but your lender, real estate professional, insurer, inspectors, and closing team must verify the facts of a specific purchase.",
      items: [
        {
          question: "Does a COE mean I am approved for a VA loan?",
          answer: "No. The COE shows that you meet VA benefit-eligibility requirements. A participating lender still reviews your credit, income, debts, assets, and the property before approving a specific loan. Request the COE early, then obtain a scenario-specific preapproval.",
        },
        {
          question: "Can I buy on Oahu with no down payment?",
          answer: "VA-backed purchase loans may allow no down payment, but the result depends on entitlement, lender approval, purchase price, and appraised value. Borrowers without full entitlement may face a down-payment calculation. Closing costs and reserves also remain relevant, so ask a VA lender for the actual cash-to-close estimate.",
        },
        {
          question: "Can I use a VA loan for any Oahu condo?",
          answer: "No. VA says the condominium project must be VA-approved before a unit is eligible for the guaranty. Ask the lender to verify the exact project and status early. Project approval does not replace inspection, document review, insurance review, or an affordability analysis.",
        },
        {
          question: "Is the VA appraisal the same as a home inspection?",
          answer: "No. The appraisal addresses value and VA property requirements for the loan. A buyer’s inspection is a separate condition review, and VA recommends getting one. Discuss inspection scope and contract deadlines before deciding how to proceed.",
        },
        {
          question: "Should I wait until I arrive on Oahu to start?",
          answer: "Not necessarily. You can organize the COE, lender comparisons, budget, search zones, and remote-tour standards before arrival. Whether to contract from off island depends on your risk tolerance, timeline, available representation, and ability to complete due diligence—not simply on whether a video tour is available.",
        },
        {
          question: "What should I do immediately after this briefing?",
          answer: "Write down your move date, duty location, comfortable all-in payment, cash reserve, and two possible search zones. Then ask a VA lender to verify the financing assumptions and ask a local buyer representative to test the location, property-type, and tour plan against current options.",
        },
      ],
    },
    cta: buildPageCta(
      "Turn the VA overview into an Oahu search plan",
      "Share your assignment, arrival window, comfortable monthly range, and whether you will tour in person or remotely. We can help organize the location and property decisions while your VA lender confirms the financing."
    ),
  },
  "new-home-construction": {
    description: "A practical guide to new construction in Ewa Beach, Kapolei, and West Oahu, covering builder contracts, total cost, inspections, permits, financing, and PCS timing.",
    keywords: ["new construction Ewa Beach", "new homes Kapolei", "West Oahu new construction", "Oahu builder homes", "military home buying Hawaii"],
    heroEyebrow: "West Oahu Buyer Guide",
    heroIntro: "Compare new homes in Ewa Beach, Kapolei, and West Oahu by the finished price, contract, delivery risk, inspection plan, and daily routine—not by the model-home presentation alone.",
    introEyebrow: "New Construction Decisions",
    introHeading: "How to evaluate a new home before choosing a builder or release",
    introLead: "A newer home may offer modern systems and fewer immediate projects, but the purchase process can be less flexible than a typical resale transaction.",
    intro: [
      "New-construction buyers in Ewa Beach and Kapolei are often choosing among three different products: a home that is finished or nearly finished, a planned home with a projected completion window, and a resale home in a newer community. Each creates a different tradeoff. A completed home offers more certainty about the view, lot, finishes, and move-in date. An earlier-stage purchase may offer choices, but it also leaves more time for schedules, costs, and personal circumstances to change.",
      "Military households and remote buyers should make the timeline a financial question, not just a calendar question. If completion slips beyond a lease end, hotel reservation, household-goods delivery, or report date, identify who pays for temporary housing and storage. Keep a backup housing plan until the contract, lender, and builder milestones support a reliable closing window.",
      "Use the same discipline you would use for resale: investigate the property, compare financing, read every contract and community document, and preserve independent advice. A sales office represents the seller. Before registering or signing, ask how buyer representation works and have the agreement reviewed by the appropriate real estate, lending, insurance, and legal professionals for your situation."
    ],
    sidebar: {
      eyebrow: "Best For",
      heading: "Buyers comparing certainty with customization",
      paragraphs: [
        "This guide is designed for buyers considering Ewa Beach, Kapolei, or another West Oahu community, including service members coordinating a purchase from off island.",
        "Bring four numbers to every comparison: the finished purchase price, estimated cash needed, realistic all-in monthly cost, and the cost of a delayed closing."
      ],
      pills: ["Ewa Beach", "Kapolei", "Remote Tours", "PCS Timing", "Builder Contracts"]
    },
    sections: [
      {
        title: "Start with the finished price, not the advertised base price",
        pills: ["Lot Premium", "Options", "HOA Dues", "Closing Costs"],
        paragraphs: [
          "Build a written price sheet for the actual home or plan you would buy. Include the lot premium, structural options, design selections, appliances, window coverings, landscaping, solar or other energy equipment, and anything shown in the model that is not standard. Then add estimated lender charges, prepaid items, insurance, property taxes, homeowners or condominium dues, and any other community fees. Ask which figures can change and which deposits become nonrefundable at each milestone.",
          "Treat an incentive as one line in the comparison rather than automatic savings. A credit tied to the builder's affiliated lender can be valuable, but compare it with outside offers using the same loan type, term, down payment, lock period, and expected closing date. The Consumer Financial Protection Bureau recommends requesting and comparing official Loan Estimates; those standardized forms show the proposed rate, payment, and closing costs. Ask each lender how an uncertain completion date affects the rate lock, extension fees, and requalification.",
          "For VA-eligible buyers, have a VA lender confirm property eligibility, appraisal timing, cash requirements, funding fee treatment, and any new-construction documentation. Eligibility for the benefit does not by itself establish that a specific transaction, development, or delivery schedule will work."
        ]
      },
      {
        title: "Read the builder contract as a schedule and risk document",
        pills: ["Deposits", "Completion Window", "Change Orders", "Contingencies"],
        paragraphs: [
          "A builder agreement may differ substantially from the standard resale forms a buyer has seen. Identify the estimated completion language, permitted extensions, deposit schedule, financing and appraisal provisions, inspection access, change-order process, cancellation rights, dispute terms, and what happens if specified materials become unavailable. Do not assume a verbal promise, model-home feature, or marketing handout changes the signed contract; request important commitments in writing and seek legal advice when contract language is unclear.",
          "Create a milestone calendar that works backward from the proposed closing: selection deadlines, financing updates, appraisal, inspections, final walk-through, certificate-of-occupancy or permit milestones, final loan approval, household-goods delivery, and move-out from temporary lodging. For a remote purchase, decide who can attend each event, whether live video is permitted, and how defects will be documented and rechecked.",
          "Keep reserves outside the deposit and closing-cost budget. A completion shift can create overlapping rent, lodging, storage, travel, rate-lock, or moving costs. The contract determines the parties' rights; a projected date on a website is not a substitute for that language."
        ]
      },
      {
        title: "Verify the project, permits, and people involved",
        pills: ["HNL Build", "TMK", "Contractor License", "Records"],
        paragraphs: [
          "Ask for the exact address or Tax Map Key, building-permit number, development phase, and the legal name and license number of the relevant contractor. Honolulu's Department of Planning and Permitting says permit status can be checked through its building-permit search using the application or permit number or TMK. Permit records are one part of due diligence: ask what remains outstanding and what must occur before occupancy and closing.",
          "Hawaii's Department of Commerce and Consumer Affairs provides a public professional-license search. Confirm the license status under the correct business or individual name rather than relying only on branding in a brochure. The agency advises consumers to research and hire licensed contractors and notes that official license information can include status and disciplinary action.",
          "Match the paperwork to what you are buying. Confirm the parcel, parking assignment, floor plan, square footage source, boundaries, common elements, included equipment, and ownership structure. For a condominium or planned community, read the declaration, bylaws, house rules, budget, dues, reserve information, and pending or planned facilities. Ask which amenities are complete, which are proposed, and whether future phases may change traffic, views, access, or assessments."
        ]
      },
      {
        title: "Plan independent inspections and a documented handoff",
        pills: ["Inspection", "Appraisal", "Walk-Through", "Warranty"],
        paragraphs: [
          "New does not mean independently checked for your interests. Ask when your inspector may enter, which stages can be inspected, how findings must be submitted, and whether a reinspection is allowed before closing. For a finished inventory home, schedule enough time to review major systems and complete a detailed walk-through. Photograph and list incomplete, damaged, or nonfunctioning items, assign responsibility, and record the correction deadline and verification process.",
          "VA tells buyers that an appraisal is not the same as a home inspection and strongly recommends an inspection for major defects. That distinction matters with new construction too: an appraisal supports the lending decision and applicable property requirements, while an independent inspector evaluates condition within the agreed scope. Buyers using other financing should also ask their lender and inspector how their roles differ.",
          "Obtain every warranty in writing before closing. Note the coverage period, exclusions, maintenance duties, claim method, response timeline, emergency contact, and whether appliances or solar equipment have separate manufacturers' warranties. Hawaii law requires notice in contracts for a new structure about the contractor's right to resolve alleged construction defects before litigation; this is a reason to retain the contract, plans, options, inspection reports, walk-through list, closing documents, warranty materials, and all repair correspondence. Consult a Hawaii attorney for legal interpretation or a dispute."
        ]
      },
      {
        title: "Test the West Oahu location against daily life",
        pills: ["Commute", "Heat", "Flood Map", "Future Phases"],
        paragraphs: [
          "The right house can still be in the wrong place. Drive the likely route between the property and work or base at the hours you expect to travel. Test school, child-care, medical, shopping, and airport trips separately. For shift workers, consider early and late access rather than relying on a single map estimate. Visit the specific lot at different times if possible and look at sun exposure, wind, road noise, construction activity, guest parking, mailbox and trash locations, and the walk from assigned parking.",
          "Review hazard and insurance questions for the exact parcel, not just the community name. Hawaii's Department of Land and Natural Resources offers a Flood Hazard Assessment Tool using FEMA flood-map data, while warning that it does not identify every area subject to flooding. Use it as a screening resource, then confirm current flood-zone, elevation, drainage, tsunami, and insurance questions with the relevant agencies and qualified insurance or survey professionals.",
          "Compare a new home with at least one nearby resale that solves the same household need. A resale may offer a known streetscape, mature landscaping, completed amenities, or included upgrades; new construction may offer newer components or a different layout. Compare total monthly cost, condition, lot, parking, association structure, commute, and likely ownership horizon—not age alone."
        ]
      },
      {
        title: "Use a remote-buying checklist before committing",
        pills: ["Representation", "Video Tour", "Backup Plan", "Closing"],
        paragraphs: [
          "Before a remote tour, send your representative a written standard for what must be shown: the approach streets, neighboring lots, exterior on every side, utility and mechanical areas, storage, parking, views from each window, noise with the camera quiet, and every room at a pace that allows questions. A polished builder video cannot replace a live review of the exact lot and home.",
          "Before signing, confirm representation, contract-review needs, finished-price worksheet, deposit exposure, financing comparison, inspection access, permit identifiers, community documents, insurance inquiry, completion range, and backup lodging. Before closing, recheck the final walk-through items, lender conditions, occupancy or permit documentation relevant to the transaction, utility activation, keys and access devices, warranty contacts, and the first payment and dues schedule.",
          "A practical decision does not require predicting every delay. It requires knowing which risks you accept, which protections are written down, what cash remains available, and what you will do if the home is not ready when expected."
        ]
      }
    ],
    faq: {
      eyebrow: "New-Home Questions",
      heading: "Ewa Beach and West Oahu new-construction FAQs",
      intro: "Use these answers to identify the next document, professional, or comparison you need—not as a substitute for transaction-specific advice.",
      items: [
        {
          question: "Is a builder's preferred lender automatically the least expensive option?",
          answer: "No. Price the incentive and the loan together. Request Loan Estimates for comparable loan terms and compare the rate, points, lender charges, credits, cash to close, payment, lock period, and extension policy. Ask a qualified lender to explain differences."
        },
        {
          question: "Do I need an inspection on a brand-new home?",
          answer: "An independent inspection can identify incomplete work or defects before closing, subject to the contract and builder's access rules. VA specifically says its appraisal is not a home inspection and strongly recommends that buyers obtain an inspection."
        },
        {
          question: "How should a PCS buyer handle an estimated completion date?",
          answer: "Read the contract's completion and extension language, ask for milestone updates, budget for overlap or delay, and keep a temporary-housing and storage plan. Coordinate lender, inspection, travel, and household-goods decisions around verified milestones rather than marketing dates."
        },
        {
          question: "What should I verify about a West Oahu development?",
          answer: "Verify the exact parcel and plan, permit identifiers and status, contractor license, included features, ownership and association documents, dues, parking, future phases, inspection access, warranties, hazard information, insurance availability, and the route to daily destinations."
        },
        {
          question: "Can I use a VA-backed loan for any new-construction home?",
          answer: "Do not assume so. Ask a VA lender to assess the specific property and transaction, including appraisal timing and required new-construction documentation. The VA also recommends a separate home inspection because an appraisal serves a different purpose."
        },
        {
          question: "Should I compare new construction with resale homes?",
          answer: "Yes. Use the same location, household needs, and all-in budget. Compare finished price, monthly costs, included upgrades, lot and parking, condition, inspection findings, association structure, move-in certainty, commute, and resale horizon."
        }
      ]
    },
    cta: buildPageCta(
      "Build a West Oahu new-home comparison",
      "Share your duty location or work route, arrival window, financing plan, and preferred communities. We can help compare exact new and resale options while your lender, inspector, insurer, and attorney handle their specialized reviews."
    )
  },
  "oahu-real-estate-property-for-sale-listings": {
    title: "Oahu Real Estate Listings and Islandwide Buyer Guide",
    description: "Compare Oahu real estate listings by region, daily route, property type, monthly ownership cost, hazard research, and due diligence before choosing homes to tour.",
    keywords: ["Oahu real estate listings", "Oahu homes for sale", "buying a home on Oahu", "Oahu property search", "Oahu military home buyer"],
    heroEyebrow: "Islandwide Buyer Guide",
    heroIntro: "Use Oahu listings to test a housing plan—not just collect attractive homes. Start with the routes and costs your household can sustain, then compare exact properties with the same due-diligence checklist.",
    introEyebrow: "From Island Search to Short List",
    introHeading: "Build an Oahu home search around the life you will actually live",
    introLead: "An islandwide search is useful at the beginning, but the result should be a small set of areas and property types that work under real weekday conditions.",
    intro: [
      "Oahu buyers often open one search and see downtown and resort-area condos, older single-family homes, newer west-side developments, central townhomes, and windward properties together. Those listings are not interchangeable. Each combines a different route to work, parking pattern, exposure to association costs, maintenance burden, climate, and amount of private space.",
      "Start by writing down the non-negotiable trips for every decision-maker: duty station or workplace, school or childcare, medical care, and recurring family obligations. Test those trips at the hours you would actually travel. A map distance or a single estimated drive time cannot capture congestion, incidents, weather, gate access, or the fact that two adults may travel in opposite directions.",
      "Then set an all-in housing range with a qualified lender and keep cash needs visible. Purchase price is only one input. Depending on the property, the monthly and near-term picture may also include loan costs, property tax, hazard and other insurance, association or maintenance fees, utilities, repairs, parking, and reserves. This guide gives you a repeatable way to narrow listings; it does not replace lending, legal, inspection, insurance, or tax advice."
    ],
    sidebar: {
      eyebrow: "Best Fit",
      heading: "Who should use this islandwide search plan",
      paragraphs: [
        "Use this page if you have not settled on one Oahu community, are relocating from off island, are balancing more than one commute, or need to compare condos, townhomes, and detached homes on equal terms.",
        "Military households should include report date, temporary lodging, household-goods timing, base gate, possible reassignment horizon, and any lender requirements in the search plan. Keep at least one workable backup area rather than betting the move on a single listing."
      ],
      pills: ["Islandwide Buyers", "PCS Planning", "Route Testing", "All-In Cost", "Due Diligence"]
    },
    sections: [
      {
        title: "Divide Oahu by your routes, not by listing volume",
        pills: ["Honolulu", "Central Oahu", "West Oahu", "Windward", "Leeward"],
        paragraphs: [
          "Treat the common region names as starting points rather than promises. Urban Honolulu may put some buyers nearer major employment and services while making a high-rise or smaller footprint more likely. Central Oahu can change access to both town and parts of the military network. West Oahu may offer a different mix of planned communities, townhomes, and detached homes, but a town-focused household must test the route. Windward and leeward locations bring their own road dependencies, weather patterns, and access tradeoffs.",
          "Choose two or three search zones by plotting the household's recurring destinations. Drive the leading route during a realistic weekday window when possible, and identify the alternate route before making an offer. For a remote purchase, ask for live video of the approach streets, parking, neighboring properties, exterior condition, and ambient noise—not only the interior. No community label can substitute for checking the exact address.",
          "Compare the same five items for every zone: weekday route, attainable property type, all-in cost, parking and storage, and the household's likely holding period. This keeps a larger house from automatically beating a better-located townhome, or a lower list price from hiding fees and transportation tradeoffs."
        ]
      },
      {
        title: "Compare property types on the same all-in worksheet",
        pills: ["Condo", "Townhome", "Detached Home", "Fees", "Reserves"],
        paragraphs: [
          "A condominium can reduce exterior maintenance responsibility and place a buyer closer to a preferred destination, but the unit comes with a shared financial and governance structure. A townhome may offer more separation or parking while retaining association rules. A detached home can provide land and control, yet shift more exterior, drainage, roof, pest, and utility responsibility directly to the owner. Ask what you own, what is common, and who pays when a major component fails.",
          "For a condominium or other association property, review the declaration, bylaws, house rules, current budget, reserve study, insurance information, meeting minutes, pending work, litigation disclosures, delinquencies, and existing or discussed special assessments with the appropriate professionals. The Hawaiʻi Real Estate Commission's condominium buyer checklist specifically points buyers toward financials, insurance, reserves, rules, and board records. Do not reduce the comparison to the monthly fee alone.",
          "Build one worksheet for every serious listing. Include estimated principal and interest supplied by the lender, property taxes, insurance quotes, association charges, utilities, parking, expected near-term repairs, and a reserve allowance. Keep one-time cash items—down payment, lender and closing costs, inspection, moving, immediate repairs, and deposits—separate from the monthly view. Confirm figures for the exact property before relying on them."
        ]
      },
      {
        title: "Research the parcel before the showing becomes an offer",
        pills: ["TMK", "Property Record", "Permits", "Disclosure", "Title"],
        paragraphs: [
          "Use the address to identify the property's Tax Map Key, or TMK. Honolulu's Real Property Assessment Division says its parcel records include assessment and tax history, property classification, land description, and descriptions of building improvements. These records are useful leads, not a survey, title report, appraisal, permit approval, or guarantee that the physical home matches every official record.",
          "If an addition, converted space, extra dwelling area, wall removal, or major renovation affects your decision, ask for permits and final approvals and research the exact TMK with Honolulu's Department of Planning and Permitting. DPP explains that the TMK numerically identifies property and points users to its GIS search. Have the inspector, title provider, attorney, lender, and permitting professionals address issues within their roles rather than assuming attractive finished space is authorized.",
          "Read the seller disclosure and supporting documents early enough to investigate them. Verify the legal ownership form, parking rights, easements, leases if any, shared-drive or access arrangements, appliances and included items, known repairs, and deadlines in the purchase contract. Written records and professional review matter more than listing shorthand."
        ]
      },
      {
        title: "Check hazards and insurance at the exact address",
        pills: ["Flood", "Tsunami", "Drainage", "Insurance", "Resilience"],
        paragraphs: [
          "Hazard research belongs near the beginning of an Oahu search because it can affect safety planning, insurance, financing, maintenance, and resale. Use Hawaiʻi's official Flood Hazard Assessment Tool for the parcel and the Hawaiʻi Emergency Management Agency's tsunami evacuation maps for the home, work, and school locations. HI-EMA cautions that an evacuation zone is a minimum guideline and that locally generated events require immediate action after strong shaking.",
          "A map layer is only one part of property-level due diligence. Ask about past water entry, site drainage, retaining walls and slopes, roof and window age, corrosion, shoreline or stream proximity, sewer or wastewater system, and access during severe weather. Request an insurance quote during the contingency period rather than inferring availability or cost from a neighboring property.",
          "Have a licensed inspector evaluate the home's accessible systems and conditions under the agreed scope. If using a VA-backed loan, remember that VA states its appraisal is not the same as a home inspection. Financing approval, appraisal, inspection, title review, disclosures, hazard research, and insurability answer different questions; one does not make the others unnecessary."
        ]
      },
      {
        title: "Turn saved listings into a disciplined tour and offer plan",
        pills: ["Short List", "Tour", "Offer", "Contingencies", "Backup Plan"],
        paragraphs: [
          "Score saved listings before arranging tours. A useful scorecard covers route, all-in cost, layout, parking, condition, association health, hazard findings, and long-term flexibility. Mark each item as verified, estimated, or unknown. Remove homes that fail a true non-negotiable and carry the unresolved questions into the showing instead of letting fresh paint reset the decision.",
          "At the property, test how the home works: parking dimensions and assigned stalls, guest access, stairs, ventilation and afternoon sun, storage, laundry, water pressure, exterior drainage, street noise, neighboring uses, and phone connectivity. For remote buyers, request an unedited live walk-through and independent inspections; keep travel, signing, funds-transfer, and closing procedures secure and confirmed through known contacts.",
          "Before writing, ask your agent and lender to explain current comparable evidence, financing readiness, deadlines, deposits, included items, and the consequences of each proposed contingency. Decide your maximum exposure before negotiation starts. Keep the second-choice home or area alive until the transaction is secure, especially when a PCS or lease end leaves little schedule flexibility."
        ]
      }
    ],
    faq: {
      eyebrow: "Buyer Questions",
      heading: "Oahu real estate listing FAQs",
      intro: "Use these answers to narrow the search and identify which facts still require property-specific verification.",
      items: [
        {
          question: "Which part of Oahu should I search first?",
          answer: "Start with the two or three zones that best serve the household's recurring work, duty, school, and care routes. Then compare attainable property type, all-in cost, parking, and holding period. Test actual routes at relevant hours instead of choosing from distance alone."
        },
        {
          question: "Should I search condos and single-family homes together?",
          answer: "Yes, if both could solve the same housing need, but compare them on one all-in worksheet. Include association costs and documents for a condo and realistic exterior, land, pest, drainage, roof, and repair responsibility for a detached home."
        },
        {
          question: "What official records can I check for an Oahu property?",
          answer: "Start with the Honolulu parcel record and TMK, then use Department of Planning and Permitting resources for permit questions. Also review title and seller documents, association records where relevant, and official flood and tsunami tools. Ask the appropriate professional to interpret issues that affect the transaction."
        },
        {
          question: "Does a VA appraisal replace a home inspection?",
          answer: "No. The U.S. Department of Veterans Affairs expressly says an appraisal is not the same as an inspection. Discuss loan requirements with a qualified VA lender and hire appropriate inspectors for property-condition review."
        },
        {
          question: "How can I buy on Oahu while living elsewhere?",
          answer: "Set the route, budget, property, and documentation standards before touring. Use live, unedited video; verify the exact address and records; arrange independent inspections; confirm insurance and financing; protect funds-transfer instructions; and maintain a lodging or housing backup if timing is firm."
        },
        {
          question: "Are listings on this page guaranteed to be available?",
          answer: "No. Listing status, price, terms, and property facts can change. Confirm current availability and all material details with the brokerage and the relevant transaction professionals before relying on a listing or making a decision."
        }
      ]
    },
    cta: buildPageCta(
      "Build your Oahu short list",
      "Share your work or duty locations, arrival or purchase window, financing stage, property preferences, and non-negotiables. We can help narrow the island to realistic areas and exact homes while your lender, inspector, insurer, title provider, and attorney handle their specialized reviews."
    )
  },
  "hawaii-military-lodging": buildEvergreenExpansion({
    topic: "Hawaii military lodging",
    audienceShort: "incoming military families",
    intent: "planning temporary arrival logistics while trying to understand where permanent housing should come next",
    segment: "This page is for service members, spouses, and families arriving on Oahu who need temporary lodging context before they commit to a longer housing plan.",
    sidebarNote: "Temporary lodging is usually the first housing decision, but it should also help you prepare for the permanent housing decision that follows.",
    localContext: "Arriving on Oahu often means balancing temporary lodging, a vehicle, pets, school timing, household goods, base reporting, and the pressure to find a rental or purchase quickly.",
    whyItMatters: "Lodging searches happen when the move is already real. A useful page helps families avoid treating temporary arrival plans as separate from the neighborhood and housing decisions coming right behind them.",
    oahuContext: "Where you stay at arrival can shape which areas you tour first and how quickly you learn real commute patterns to Joint Base Pearl Harbor-Hickam, Schofield Barracks, Wheeler Army Airfield, Marine Corps Base Hawaii, Camp Smith, or Fort Shafter.",
    decisionFactors: ["arrival date", "base assignment", "pet needs", "vehicle access", "school timing", "housing search window"],
    compareGuidance: "Compare temporary lodging against the areas you will realistically tour. A convenient short-term location can make showings, school visits, and commute testing much easier.",
    nextStep: "Once temporary lodging is set, shift quickly into area screening, rental availability, or purchase readiness so the permanent housing plan does not fall behind.",
    heroIntro: "Military lodging is often the first practical step in an Oahu move, and it should connect directly to the housing decisions that follow.",
    introLead: "Use this page to link arrival logistics with permanent housing strategy.",
    pills: ["Military Lodging", "PCS Arrival", "Temporary Housing", "Oahu Bases", "Relocation"],
    contextPills: ["Arrival Planning", "Base Access", "Housing Search"],
    ctaTitle: "Connect arrival plans to housing plans",
    ctaText: "Call or text with your report date, base, family needs, and housing timeline so the next move is not reactive.",
  }),
  "va-loan-information": buildEvergreenExpansion({
    topic: "VA loan information",
    audienceShort: "Hawaii VA buyers",
    intent: "researching how VA-financed buying works in Hawaii and what to prepare before looking at homes",
    segment: "This page is for active duty members, veterans, and military families who need practical VA buying context on the real estate side of the transaction.",
    sidebarNote: "Financing specifics should be confirmed with a qualified VA loan professional. This page focuses on how the real estate search, offer, and Oahu property realities connect to that financing path.",
    localContext: "In Hawaii, VA buying decisions often involve condos, association fees, appraisal timing, insurance questions, limited inventory, and competition from buyers using different loan structures.",
    whyItMatters: "VA searches are high-value because they often come from buyers who are serious but need confidence. The right content helps them prepare without overpromising or replacing lender guidance.",
    oahuContext: "A VA buyer on Oahu should think beyond eligibility. The home still has to fit commute, maintenance fees, neighborhood tradeoffs, property condition, and the full monthly payment.",
    decisionFactors: ["preapproval", "monthly payment", "condo eligibility", "offer strength", "appraisal timing", "cash reserves"],
    compareGuidance: "Compare homes through the lens of total monthly cost and property fit, then coordinate financing questions with a lender before writing or removing contingencies.",
    nextStep: "Use this hub to move into Hawaii-specific VA buying guidance, down payment strategy, mortgage planning, and neighborhood pages tied to your assignment.",
    heroIntro: "VA loan information is most useful when it connects financing readiness with the real homes, condos, and neighborhoods buyers compare on Oahu.",
    introLead: "Use this page to understand the real estate side of a VA-financed purchase in Hawaii.",
    pills: ["VA Loans", "Military Buyers", "Oahu Homes", "Preapproval", "Appraisal"],
    contextPills: ["VA Process", "Condos", "Monthly Cost", "Offer Strategy"],
    ctaTitle: "Prepare your Hawaii VA buying plan",
    ctaText: "Call or text to connect your VA buying questions with Oahu neighborhoods, timing, and next steps.",
  }),
  "mortgage-calculator": buildEvergreenExpansion({
    topic: "mortgage calculator",
    audienceShort: "payment-focused Hawaii buyers",
    intent: "testing affordability before deciding which Oahu homes or neighborhoods should stay in the search",
    segment: "This page is for buyers who want rough payment context before they get attached to a listing or commit to a specific price range.",
    sidebarNote: "A calculator is a starting point. The useful decision comes from adding taxes, insurance, association fees, reserves, commute costs, and lender guidance.",
    localContext: "Hawaii affordability is shaped by more than principal and interest. Association dues, insurance, maintenance, utilities, and commuting patterns can change whether a payment feels workable.",
    whyItMatters: "Calculator traffic often has real buying intent. Visitors are not just learning; they are trying to decide what price point still makes sense.",
    oahuContext: "On Oahu, two homes with the same purchase price can have very different monthly outcomes because of association fees, property type, age, insurance exposure, and utility needs.",
    decisionFactors: ["principal and interest", "taxes", "insurance", "association fees", "cash reserves", "lender assumptions"],
    compareGuidance: "Run scenarios at several price points and then compare those numbers against the communities you are actually considering. The payment has to work with the lifestyle and commute, not only the spreadsheet.",
    nextStep: "Once you know the range, move into community pages, VA guidance, or active listings that fit the monthly number instead of browsing above your comfort zone.",
    heroIntro: "Use the mortgage calculator as a filter for smarter Oahu search decisions, not as a final financing answer.",
    introLead: "Payment planning should connect rough numbers with real Hawaii ownership costs.",
    pills: ["Mortgage Calculator", "Monthly Payment", "Budget", "VA Buyers", "Oahu"],
    contextPills: ["Taxes", "Insurance", "HOA Fees", "Affordability"],
    ctaTitle: "Turn payment estimates into a search plan",
    ctaText: "Call or text to compare payment scenarios against neighborhoods, property types, and timing.",
  }),
  "hawaii-bases-and-barracks": buildEvergreenExpansion({
    topic: "Hawaii bases and barracks",
    audienceShort: "incoming Oahu military households",
    intent: "comparing installation locations and how base geography should influence housing choices",
    segment: "This page is for military families who are trying to understand Oahu by assignment location before choosing where to rent or buy.",
    sidebarNote: "Base proximity is useful, but the right housing decision also depends on school routine, spouse commute, pets, budget, and how often you need to cross the island.",
    localContext: "Oahu installation geography can be confusing from off island. Joint Base Pearl Harbor-Hickam, Schofield Barracks, Wheeler Army Airfield, Marine Corps Base Hawaii, Camp Smith, Fort Shafter, Tripler, Barbers Point Coast Guard Station, Kunia Tunnel, and NCTAMS each create different housing conversations.",
    whyItMatters: "Base-related searches are usually housing searches in disguise. Families want to know where they should live, how long the drive may feel, and which communities belong on the short list.",
    oahuContext: "A short distance on the map can still mean a hard commute during the wrong hour. Traffic direction, H-1 access, gate patterns, and school timing should be part of the housing plan.",
    decisionFactors: ["assigned installation", "gate access", "commute window", "family routine", "housing budget", "community fit"],
    compareGuidance: "Compare communities by the commute you will actually drive, not by mileage. Then balance that commute against home size, rent or mortgage cost, and daily convenience.",
    nextStep: "Use the installation context to narrow likely communities, then compare rentals, listings, and VA buying guidance inside those areas.",
    heroIntro: "Base and barracks research should help incoming families connect assignment location with realistic Oahu housing choices.",
    introLead: "Use this page to understand how installation geography affects where you may want to live.",
    pills: ["Oahu Bases", "PCS Move", "Commute", "Military Housing", "Relocation"],
    contextPills: ["JBPHH", "Schofield", "MCBH", "Fort Shafter"],
    ctaTitle: "Plan housing around your assignment",
    ctaText: "Call or text with your base, report date, and household needs to narrow the right Oahu areas.",
  }),
  "hawaii-golf-courses": buildEvergreenExpansion({
    topic: "Hawaii golf courses",
    audienceShort: "lifestyle-driven Oahu movers",
    intent: "researching how golf access and recreation should influence where you may want to live on Oahu",
    segment: "This page is for buyers, renters, retirees, second-home searchers, and local movers who want lifestyle fit to be part of the real estate decision.",
    sidebarNote: "Golf access is not just recreation. It can point toward the communities, drive patterns, and weekend lifestyle a household wants after the move.",
    localContext: "Oahu golf access touches several real estate conversations, from Ewa Beach and Kapolei to central and windward areas. The best fit depends on how often you play, where you work, and how much drive time you want in normal life.",
    whyItMatters: "Lifestyle searches can become real estate searches when the user is trying to picture life after the transaction. That makes this page valuable when it connects recreation to location decisions.",
    oahuContext: "A community may be close to a course but still create tradeoffs around commute, heat, traffic, schools, and daily errands. Lifestyle has to be balanced with routine.",
    decisionFactors: ["course access", "nearby communities", "drive time", "budget", "weekend routine", "commute"],
    compareGuidance: "Compare golf convenience against the rest of the week. If the area supports both recreation and daily logistics, it deserves a closer housing look.",
    nextStep: "Use golf access as one filter, then move into community pages that match both lifestyle and practical housing needs.",
    heroIntro: "Golf-course research can help you picture where Oahu life may fit, but the right real estate decision still has to work Monday through Friday.",
    introLead: "Use this lifestyle guide to connect recreation with neighborhood decisions.",
    pills: ["Golf", "Lifestyle", "Ewa Beach", "Kapolei", "Oahu Communities"],
    contextPills: ["Lifestyle Fit", "Drive Time", "Neighborhoods", "Weekend Routine"],
    ctaTitle: "Connect lifestyle with location",
    ctaText: "Call or text to compare Oahu communities around golf access, commute, and housing fit.",
  }),
  "mililani-real-estate": buildEvergreenExpansion({
    topic: "Mililani real estate",
    audienceShort: "central Oahu buyers and renters",
    intent: "researching whether Mililani or Mililani Mauka fits your commute, household routine, and budget",
    segment: "This page is for buyers and renters comparing central Oahu, especially households connected to Schofield Barracks, Wheeler Army Airfield, or a more central island routine.",
    sidebarNote: "Mililani appeals to many households because it can feel more balanced than a purely west-side or town-focused search, but inventory and pricing still need careful comparison.",
    localContext: "Mililani and Mililani Mauka offer a central Oahu lifestyle with established neighborhoods, townhomes, condos, single-family homes, schools, shopping, and access toward Schofield, Wheeler, Pearl City, and H-2.",
    whyItMatters: "Mililani searches usually involve serious location comparison. People want to know whether central convenience is worth the price, inventory, and property-type tradeoffs.",
    oahuContext: "Central Oahu can make certain military and work commutes easier, but the best fit depends on whether you need more space, newer inventory, lower monthly cost, or a shorter drive to a specific installation.",
    decisionFactors: ["Mililani vs Mililani Mauka", "property type", "schools", "commute", "association fees", "inventory age"],
    compareGuidance: "Compare Mililani options against Ewa Beach, Kapolei, and Makakilo so you understand what you gain in central access and what you may give up in size, age, or price.",
    nextStep: "Review Mililani listings with a clear view of property type, monthly cost, and commute before deciding whether central Oahu should stay on the short list.",
    heroIntro: "Mililani real estate research is about more than central location. It is about whether the area fits your routine, budget, and long-term plan.",
    introLead: "Use this page to compare Mililani through the lens of daily life and Oahu market tradeoffs.",
    pills: ["Mililani", "Mililani Mauka", "Central Oahu", "Schofield", "Wheeler"],
    contextPills: ["Central Oahu", "Schools", "Townhomes", "Commute"],
    ctaTitle: "Compare Mililani with central Oahu context",
    ctaText: "Call or text to review Mililani options against your commute, budget, and property needs.",
  }),
  "va-home-buying-in-hawaii": buildEvergreenExpansion({
    topic: "VA home buying in Hawaii",
    audienceShort: "Hawaii-ready VA buyers",
    intent: "moving beyond general VA information into the local decisions that affect a Hawaii purchase",
    segment: "This page is for military and veteran buyers who understand the VA concept and now need to apply it to Oahu property types, neighborhoods, and timing.",
    sidebarNote: "Use this as the Hawaii-specific bridge between lender readiness and real estate execution.",
    localContext: "Hawaii VA buyers need to account for condos, association dues, inventory pressure, appraisal timing, remote showings, and the full monthly cost of island ownership.",
    whyItMatters: "A buyer who searches this topic is usually closer to action than someone reading broad national VA content. They need local preparation, not generic definitions.",
    oahuContext: "On Oahu, a strong VA plan has to match the buyer's assignment, commute, property type, and comfort with total monthly cost. The right home is not always the largest home or the newest listing.",
    decisionFactors: ["lender readiness", "property eligibility", "monthly payment", "area fit", "offer strategy", "remote purchase needs"],
    compareGuidance: "Compare each property by VA feasibility and household fit at the same time. A home that works for financing still has to work for routine, maintenance, and resale planning.",
    nextStep: "Move from education into a practical search plan that connects your VA readiness with Oahu areas and homes that can actually work.",
    heroIntro: "Hawaii VA buying requires local context around properties, payments, neighborhoods, and timing.",
    introLead: "Use this page when you are ready to turn VA eligibility into an Oahu buying plan.",
    pills: ["VA Home Buying", "Hawaii", "Oahu", "Military Buyers", "Offer Strategy"],
    contextPills: ["Condos", "Association Fees", "Appraisal", "Remote Tours"],
    ctaTitle: "Build a Hawaii VA home buying plan",
    ctaText: "Call or text to connect VA readiness with Oahu neighborhoods, listings, and timing.",
  }),
  "ewa-beach-real-estate": buildEvergreenExpansion({
    topic: "Ewa Beach real estate",
    audienceShort: "Ewa Beach researchers",
    intent: "deciding whether Ewa Beach fits your budget, commute, household needs, and move timeline",
    segment: "This page is for buyers, renters, sellers, and relocating families who want broader Ewa Beach context before focusing on active listings.",
    sidebarNote: "Use it as a community hub for understanding the area before you compare individual homes or rentals.",
    localContext: "Ewa Beach includes a mix of older neighborhoods, newer communities, condos, townhomes, single-family homes, golf-course areas, and beach-oriented lifestyle pockets.",
    whyItMatters: "Ewa Beach is one of the site's most commercially relevant communities. A strong page can help users understand the market before they choose a listing, rental, or sale strategy.",
    oahuContext: "The area can offer space and value that buyers want, but commute, heat, traffic timing, association rules, and parking can change the decision. Those tradeoffs should be discussed before a household commits to the area.",
    decisionFactors: ["neighborhood pocket", "property type", "commute", "schools", "parking", "association costs"],
    compareGuidance: "Compare Ewa Beach against Kapolei, Makakilo, and Mililani so you understand what the area gives you and what it asks in return.",
    nextStep: "Once the area fit is clear, move into active listings, rental options, or a sale conversation tied to your specific neighborhood.",
    heroIntro: "Ewa Beach real estate research should help you understand the community before individual listings start driving the decision.",
    introLead: "Use this page as a practical guide to Ewa Beach fit, tradeoffs, and next steps.",
    pills: ["Ewa Beach", "Community Guide", "West Oahu", "Buyers", "Renters"],
    contextPills: ["Neighborhoods", "Commute", "Schools", "Parking"],
    ctaTitle: "Talk through Ewa Beach fit",
    ctaText: "Call or text to compare Ewa Beach neighborhoods, listings, rentals, or sale timing.",
  }),
  "opportune-lift-program-oplift": buildEvergreenExpansion({
    topic: "OPLIFT",
    audienceShort: "military families researching relocation support",
    intent: "trying to understand whether OPLIFT or related support resources affect your move timing and housing plan",
    segment: "This page is for service members and families researching military support resources while preparing for an Oahu transition.",
    sidebarNote: "The program context matters most when it is connected to the housing timeline that follows arrival or travel planning.",
    localContext: "Military moves often involve overlapping logistics: travel, temporary lodging, orders, household goods, school timing, pets, and housing availability. Any support resource should be viewed inside that larger plan.",
    whyItMatters: "Niche military-resource searches can bring in highly relevant relocation traffic. These visitors may not be ready to buy or rent yet, but they are already solving move-related problems.",
    oahuContext: "On Oahu, timing pressure can compound quickly because rental availability, commute testing, and purchase readiness all depend on when the family can be on island and how much flexibility they have.",
    decisionFactors: ["eligibility questions", "arrival timing", "temporary lodging", "housing search window", "base assignment", "family logistics"],
    compareGuidance: "Connect any support-program details to the practical housing questions: where you will stay, how quickly you need a rental or purchase, and which areas are realistic for the assignment.",
    nextStep: "Use the resource research to build a housing timeline, then move into lodging, base, rental, or buying guidance as soon as the dates are clear.",
    heroIntro: "OPLIFT-related research should connect military support questions with the housing decisions that usually follow.",
    introLead: "Use this page to move from support-resource research into practical Oahu relocation planning.",
    pills: ["OPLIFT", "Military Support", "PCS", "Oahu Relocation", "Housing Timeline"],
    contextPills: ["Arrival", "Travel", "Temporary Lodging", "Housing Search"],
    ctaTitle: "Turn support questions into a housing timeline",
    ctaText: "Call or text with your timeline and assignment so relocation planning can move from logistics into housing decisions.",
  }),
  "the-right-down-payment-on-hawaii-home": buildEvergreenExpansion({
    topic: "Hawaii down payment strategy",
    audienceShort: "cash-conscious Hawaii buyers",
    intent: "deciding how much cash to put down while balancing monthly payment, reserves, VA eligibility, and move costs",
    segment: "This page is for buyers who are close enough to purchase planning that down payment choices have become real, especially military households weighing VA options and cash reserves.",
    sidebarNote: "Financing details should be confirmed with a lender. The real estate value here is helping you think through how the cash decision affects Oahu search strategy.",
    localContext: "Hawaii buyers often face high purchase prices, association fees, moving costs, and the need to keep reserves after closing. The right down payment is not always the largest one possible.",
    whyItMatters: "Down payment questions sit close to conversion because they affect offer comfort, monthly payment, emergency reserves, and which homes a buyer should pursue.",
    oahuContext: "On Oahu, cash preserved after closing can matter for repairs, utilities, travel, shipping, temporary lodging overlap, and unexpected ownership costs.",
    decisionFactors: ["cash to close", "monthly payment", "reserves", "VA eligibility", "offer strategy", "future repairs"],
    compareGuidance: "Compare lower cash outlay against payment comfort and post-closing reserves. A down payment that looks strong on paper may leave the household too tight after the move.",
    nextStep: "Review the down payment question with a lender and a local real estate strategy at the same time, then narrow the search to homes that fit both.",
    heroIntro: "The right down payment on a Hawaii home depends on cash reserves, monthly comfort, VA options, and local ownership costs.",
    introLead: "Use this page to think about down payment strategy in a practical Oahu context.",
    pills: ["Down Payment", "VA Buyers", "Cash Reserves", "Monthly Payment", "Hawaii Homes"],
    contextPills: ["Cash To Close", "Reserves", "Offer Strategy", "Ownership Costs"],
    ctaTitle: "Review your Hawaii down payment strategy",
    ctaText: "Call or text to connect cash planning with your Oahu search, lender questions, and timing.",
  }),
  "hawaii-real-estate-news": buildEvergreenExpansion({
    topic: "Hawaii real estate news",
    audienceShort: "buyers, sellers, owners, and relocating families",
    intent: "tracking market changes that may affect timing, pricing, inventory, or relocation decisions",
    segment: "This page is for people who need market updates they can actually apply to a purchase, sale, rental plan, or property ownership decision.",
    sidebarNote: "News is most valuable when it explains what changed, why it matters, and which next step should follow for your situation.",
    localContext: "Hawaii real estate news can include inventory shifts, pricing pressure, interest-rate impact, military relocation patterns, insurance issues, association costs, and neighborhood-level demand changes.",
    whyItMatters: "A news hub helps the site stay current while supporting evergreen authority. Visitors should leave with a clearer sense of what the market signal means for them.",
    oahuContext: "Oahu is not one market in practice. Ewa Beach, Kapolei, Mililani, town, and windward areas can move differently, and the impact depends on whether the user is buying, selling, renting, or managing property.",
    decisionFactors: ["inventory", "pricing", "interest rates", "buyer demand", "seller timing", "local area trends"],
    compareGuidance: "Compare headlines against the area and property type you actually care about. Broad Hawaii news only becomes useful when it is tied to a specific decision.",
    nextStep: "Use market updates to decide whether to wait, act, adjust price expectations, or move into a more specific neighborhood or service conversation.",
    heroIntro: "Hawaii real estate news should help you interpret market changes, not just follow headlines.",
    introLead: "Use this page to connect Oahu market updates with practical buying, selling, renting, and relocation decisions.",
    pills: ["Market News", "Oahu", "Inventory", "Pricing", "Timing"],
    contextPills: ["Market Updates", "Buyer Signals", "Seller Signals", "Relocation"],
    ctaTitle: "Apply market news to your next move",
    ctaText: "Call or text to discuss what current Oahu conditions mean for your buying, selling, or relocation timeline.",
  }),
  "hawaii-military-realty-inc": buildEvergreenExpansion({
    topic: "Hawaii Military Realty, Inc.",
    audienceShort: "branded entity searchers",
    intent: "verifying the company, its service model, and whether it is the right brokerage for an Oahu real estate need",
    segment: "This page is for people who searched the company by name and want to confirm legitimacy, specialization, leadership, and service fit before contacting the team.",
    sidebarNote: "Branded searchers are often close to taking action. The page should answer trust questions quickly and then guide them toward the relevant service or area page.",
    localContext: "Hawaii Military Realty is positioned around Oahu service, Native Hawaiian ownership, veteran-owned management, military relocation familiarity, and direct communication.",
    whyItMatters: "Company-name searches usually happen after a referral, review, listing, or prior interaction. That makes the page valuable for trust, not only for rankings.",
    oahuContext: "The brokerage's relevance is strongest when users need Oahu-specific guidance: PCS moves, VA-aware buying, rental placement, property management, selling from off island, and local community tradeoffs.",
    decisionFactors: ["company credibility", "Oahu focus", "military experience", "service fit", "communication style", "next step"],
    compareGuidance: "Compare the company against your actual need. A buyer on orders, an owner leaving island, a renter under deadline, and a seller facing timing pressure all need different next steps.",
    nextStep: "Move from company verification into the service, team, area, or contact page that matches your situation.",
    heroIntro: "If you searched Hawaii Military Realty, Inc. directly, you are likely deciding whether the company is credible and relevant for your Oahu move or transaction.",
    introLead: "Use this page to confirm who the company serves and why the military-informed Oahu focus matters.",
    pills: ["Company Profile", "Oahu", "Veteran Owned", "Military Realty", "Relocation"],
    contextPills: ["Trust", "Services", "Leadership", "Oahu Focus"],
    ctaTitle: "Confirm whether the team is the right fit",
    ctaText: "Call or text with your situation so the conversation can move from company research into a practical plan.",
  }),
  "kapolei-real-estate-listings-and-information": buildEvergreenExpansion({
    topic: "Kapolei real estate",
    audienceShort: "Kapolei and West Oahu buyers",
    intent: "researching Kapolei listings, community fit, and how the area compares with nearby West Oahu options",
    segment: "This page is for buyers and relocating households looking at Kapolei as a serious option in the West Oahu growth corridor.",
    sidebarNote: "Kapolei can appeal to households that want newer services, west-side convenience, and access to shopping, schools, and employment centers, but commute still matters.",
    localContext: "Kapolei is often compared with Ewa Beach, Makakilo, and other West Oahu communities. It can offer a more urbanized west-side hub while still connecting to beaches, newer communities, and family routines.",
    whyItMatters: "Kapolei searchers usually want more than inventory. They want to know whether the community makes sense for the way they will live on Oahu.",
    oahuContext: "Kapolei can reduce some west-side errand pressure because services are nearby, but drives toward Honolulu, Joint Base Pearl Harbor-Hickam, or central Oahu still need realistic planning.",
    decisionFactors: ["Kapolei neighborhoods", "home type", "commute", "schools", "shopping access", "budget"],
    compareGuidance: "Compare Kapolei against Ewa Beach and Makakilo by space, drive pattern, daily convenience, and inventory age. Each area solves a different version of the West Oahu housing problem.",
    nextStep: "Use Kapolei as a focused search area once you know whether its services, commute, and property mix fit your household.",
    heroIntro: "Kapolei real estate research should help you decide whether this West Oahu hub fits your budget, commute, and daily routine.",
    introLead: "Use this page to compare Kapolei listings with the lifestyle and logistics that surround them.",
    pills: ["Kapolei", "West Oahu", "Listings", "Buyers", "Relocation"],
    contextPills: ["West Oahu", "Services", "Commute", "Newer Homes"],
    ctaTitle: "Compare Kapolei listings with local context",
    ctaText: "Call or text to review Kapolei against your move timeline, commute, and property goals.",
  }),
  "hawaii-commissaries": buildEvergreenExpansion({
    topic: "Hawaii commissaries",
    audienceShort: "military households planning daily life on Oahu",
    intent: "understanding how commissary access and base-area convenience may affect where you live",
    segment: "This page is for incoming and current military households who are thinking about everyday logistics, not just installation names.",
    sidebarNote: "Commissary access can matter for grocery routine, budgeting, errands, and how convenient a community feels after move-in.",
    localContext: "On Oahu, daily convenience is part of housing fit. A home may be close to a preferred neighborhood, but the routine still has to work around base access, shopping, traffic, and family schedules.",
    whyItMatters: "Commissary searches are practical relocation searches. They show that the user is thinking about real life on island, which is exactly where housing guidance becomes valuable.",
    oahuContext: "Commissary convenience may connect to Joint Base Pearl Harbor-Hickam, Schofield Barracks, Marine Corps Base Hawaii, Fort Shafter, or other installation routines depending on assignment and household needs.",
    decisionFactors: ["base access", "shopping routine", "commute", "housing area", "family schedule", "budget"],
    compareGuidance: "Compare commissary convenience with the full weekly routine. If grocery access is easy but the commute is difficult, the housing decision may still need adjustment.",
    nextStep: "Use daily logistics as one more filter for community fit, then compare rentals or homes in the areas that support your normal week.",
    heroIntro: "Commissary access is a practical part of military relocation planning because it affects the way daily life works after move-in.",
    introLead: "Use this page to connect base-area convenience with housing and community decisions.",
    pills: ["Commissaries", "Military Families", "Daily Routine", "Base Access", "Relocation"],
    contextPills: ["Errands", "Base Access", "Shopping", "Housing Fit"],
    ctaTitle: "Plan housing around daily logistics",
    ctaText: "Call or text to compare base access, commissary convenience, commute, and housing areas.",
  }),
};

const PROPERTY_CONTENT_EXPANSIONS = {
  "featured/pool-home-for-sale-in-ka-makana-at-hoakalei-in-ewa-beach-hawaii.html": buildPropertyExpansion({
    topic: "Hoakalei pool home",
    status: "For Sale",
    segment: "This page is for buyers looking for an upgraded single-family lifestyle home in Ka Makana at Hoakalei, Ewa Beach, or a nearby premium West Oahu community.",
    bestFit: "The strongest fit is a buyer who wants a detached home with lifestyle features, more privacy, and a community setting that supports family life, entertaining, and a more resort-oriented Ewa Beach routine.",
    sidebarNote: "Pool homes can be attractive, but buyers should also compare maintenance, utility costs, insurance, association rules, and how the feature fits daily use.",
    localContext: "Ka Makana at Hoakalei sits inside one of Ewa Beach's most recognizable master-planned areas, where buyers often compare newer homes, golf access, community amenities, and proximity to West Oahu services.",
    whySearched: "The combination of pool home, Hoakalei, and Ewa Beach signals serious lifestyle and purchase intent. Searchers are usually trying to decide whether a premium feature set is worth a closer look.",
    neighborhoodContext: "Hoakalei and the surrounding Ewa Beach communities can work well for buyers who prioritize space and lifestyle, but commute patterns toward town, Joint Base Pearl Harbor-Hickam, or central Oahu still need to be tested.",
    compareFactors: ["pool condition", "HOA or association rules", "monthly ownership cost", "commute", "parking", "resale appeal"],
    compareGuidance: "A pool can add daily enjoyment, but it should be evaluated like any other major feature: useful, maintainable, properly documented, and aligned with the household's budget.",
    currentUse: "Use the archived property profile as a benchmark for similar Hoakalei and Ewa Beach homes with lifestyle features, then compare current active inventory against the same ownership questions.",
    heroIntro: "A Hoakalei pool home appeals to buyers who want more than bedroom count. Use this page to compare lifestyle value, ownership cost, and neighborhood fit.",
    introHeading: "Ka Makana at Hoakalei pool home context",
    introLead: "Premium Ewa Beach homes should be evaluated by lifestyle fit and practical ownership cost together.",
    pills: ["Pool Home", "Hoakalei", "Ewa Beach", "Single Family", "For Sale"],
    intentPills: ["Pool", "Hoakalei", "Lifestyle"],
    contextPills: ["Ewa Beach", "Commute", "Amenities"],
    comparePills: ["Pool Condition", "HOA", "Monthly Cost", "Resale"],
    ctaTitle: "Ask about similar Hoakalei homes",
    ctaText: "Call or text to compare current Ewa Beach homes with pool, lifestyle, and ownership-cost considerations.",
  }),
  "oahu-available-rental-properties/3-bedroom-townhouse-in-makakilo.html": buildPropertyExpansion({
    topic: "Makakilo 3-bedroom townhouse rental",
    status: "For Rent",
    segment: "This page is for renters seeking a family-sized West Oahu townhome and comparing Makakilo with Kapolei, Ewa Beach, and other leeward options.",
    bestFit: "A 3-bedroom Makakilo townhouse usually fits households that need more space than a condo, want manageable maintenance, and value access to Kapolei services without being directly in busier commercial areas.",
    sidebarNote: "Makakilo's hillside setting can appeal to renters who want a different feel from Ewa Beach, but drive patterns and parking still need to be confirmed.",
    localContext: "Makakilo is often part of the Kapolei-area rental conversation, with townhomes and homes that may offer elevation, views, and west-side access.",
    whySearched: "A 3-bedroom townhouse rental is a specific housing need. The searcher is likely comparing space, monthly cost, and move-in timing rather than casually browsing.",
    neighborhoodContext: "Makakilo can work well for renters tied to West Oahu routines, but H-1 access, morning traffic, and distance to base or work should be tested before applying.",
    compareFactors: ["rent", "parking", "stairs", "commute", "pet rules", "move-in date"],
    compareGuidance: "A townhouse can offer useful separation and storage, but layouts, stairs, guest parking, and association rules can vary widely.",
    currentUse: "Use this page to benchmark what a 3-bedroom Makakilo rental should answer before you request a showing or application.",
    heroIntro: "A 3-bedroom townhouse in Makakilo is a practical rental search for households that need space and West Oahu access.",
    introHeading: "Makakilo townhouse rental context",
    introLead: "Compare space, commute, parking, and move-in timing before treating a Makakilo townhouse as a serious rental option.",
    pills: ["Makakilo", "Townhouse", "3 Bedrooms", "West Oahu", "Rental"],
    comparePills: ["Rent", "Parking", "Commute", "Pets"],
    ctaTitle: "Ask about Makakilo rental options",
    ctaText: "Call or text to compare current Makakilo and Kapolei-area townhome rentals.",
  }),
  "oahu-available-rental-properties/3-bedroom-2-5-bathroom-townhouse-in-ewa-beach-ocean-pointe.html": buildPropertyExpansion({
    topic: "Ocean Pointe 3-bedroom townhouse rental",
    status: "For Rent",
    segment: "This page is for renters seeking a family-oriented Ewa Beach townhouse in Ocean Pointe or a nearby West Oahu community.",
    bestFit: "This profile tends to fit households that want a functional bedroom count, a townhome layout, and a neighborhood setting that feels established for daily family life.",
    sidebarNote: "Ocean Pointe searches should include parking, association rules, nearby schools, and commute timing before application pressure sets in.",
    localContext: "Ocean Pointe is one of Ewa Beach's recognizable residential areas and often draws renters who want West Oahu space without taking on a detached-home rental.",
    whySearched: "The title points to a specific neighborhood, bedroom count, and bathroom count. That means the searcher is already filtering by practical household fit.",
    neighborhoodContext: "Ocean Pointe can support a strong family routine, but renters should consider Fort Weaver Road timing, H-1 access, and where work or school happens during the week.",
    compareFactors: ["rent", "parking", "layout", "association rules", "commute", "school routine"],
    compareGuidance: "Compare townhome options by how the layout works in real life: entry, storage, guest parking, laundry location, and noise between rooms.",
    currentUse: "Use this archived Ocean Pointe rental as a guide for what similar 3-bedroom townhomes should clarify today.",
    heroIntro: "An Ocean Pointe townhouse rental should be evaluated by family fit, commute, and practical layout, not just bedroom count.",
    introHeading: "Ocean Pointe townhouse rental context",
    introLead: "Use this page to compare Ewa Beach townhome living with your move-in timeline and daily routine.",
    pills: ["Ocean Pointe", "Ewa Beach", "Townhouse", "3 Bedrooms", "Rental"],
    comparePills: ["Layout", "Parking", "HOA Rules", "Commute"],
    ctaTitle: "Compare Ocean Pointe rentals",
    ctaText: "Call or text to review current Ocean Pointe and Ewa Beach townhouse availability.",
  }),
  "oahu-available-rental-properties/2-bedroom-1-5-bath-condo-in-ewa-beach.html": buildPropertyExpansion({
    topic: "Ewa Beach 2-bedroom condo rental",
    status: "For Rent",
    segment: "This page is for smaller renter households, couples, roommates, or budget-aware movers comparing condo options in Ewa Beach.",
    bestFit: "A 2-bedroom condo may fit renters who want a manageable monthly cost and enough flexibility for a bedroom, office, roommate, or small family setup.",
    sidebarNote: "Condo rentals should be compared by more than rent. Parking, laundry, utilities, rules, storage, and commute can change the real value.",
    localContext: "Ewa Beach condo living may offer a lower entry point than larger townhomes or single-family rentals while keeping renters close to West Oahu services and residential neighborhoods.",
    whySearched: "Smaller condo searches are precise. The user is usually trying to match budget and space without overcommitting to a larger home.",
    neighborhoodContext: "Ewa Beach can work for renters who want West Oahu value and neighborhood feel, but the commute to town or certain bases should be considered before applying.",
    compareFactors: ["rent", "parking", "utilities", "laundry", "commute", "association rules"],
    compareGuidance: "A lower rent number is only useful if parking, utilities, and daily routine still work. Confirm the full monthly picture before deciding.",
    currentUse: "Use this page as a benchmark for evaluating current 2-bedroom condo rentals in Ewa Beach.",
    heroIntro: "A 2-bedroom Ewa Beach condo can be a practical rental option when budget, parking, and commute all line up.",
    introHeading: "Ewa Beach condo rental context",
    introLead: "Use this page to compare smaller Ewa Beach rentals against the full daily-life picture.",
    pills: ["Ewa Beach", "Condo", "2 Bedrooms", "Budget", "Rental"],
    comparePills: ["Rent", "Parking", "Utilities", "Rules"],
    ctaTitle: "Ask about Ewa Beach condo rentals",
    ctaText: "Call or text to compare current 2-bedroom rental options in Ewa Beach.",
  }),
  "oahu-available-rental-properties/3-bedroom-2-bathroom-townhouse-in-mililani-mauka.html": buildPropertyExpansion({
    topic: "Mililani Mauka 3-bedroom townhouse rental",
    status: "For Rent",
    segment: "This page is for central Oahu renter families comparing Mililani Mauka for routine, schools, and access to Schofield Barracks or Wheeler Army Airfield.",
    bestFit: "A 3-bedroom Mililani Mauka townhouse often fits households that want central Oahu convenience, a family-sized layout, and less direct dependence on West Oahu commute patterns.",
    sidebarNote: "Mililani Mauka is specific enough that renters should compare neighborhood feel, parking, rent, and commute before widening the search.",
    localContext: "Mililani Mauka is part of the central Oahu conversation, with access toward H-2, Schofield, Wheeler, Mililani services, and established residential routines.",
    whySearched: "The title combines bedroom count, property type, and a specific community, which signals a renter who already has a clear target.",
    neighborhoodContext: "Central Oahu can be a strong fit for some military and civilian households, but the exact commute and school routine should be confirmed before applying.",
    compareFactors: ["rent", "parking", "stairs", "commute to Schofield or Wheeler", "school routine", "pet rules"],
    compareGuidance: "Compare this type of rental with Mililani condos and single-family options so you understand the tradeoff between space, cost, and maintenance responsibility.",
    currentUse: "Use the page to evaluate current Mililani Mauka townhomes by practical household fit.",
    heroIntro: "A Mililani Mauka townhouse rental can be a strong central Oahu option when commute, space, and family routine line up.",
    introHeading: "Mililani Mauka townhouse rental context",
    introLead: "Use this page to compare central Oahu rental fit before submitting an application.",
    pills: ["Mililani Mauka", "Townhouse", "3 Bedrooms", "Central Oahu", "Rental"],
    comparePills: ["Rent", "Parking", "Schofield", "Schools"],
    ctaTitle: "Compare Mililani Mauka rentals",
    ctaText: "Call or text to review current central Oahu townhome and condo rentals.",
  }),
  "oahu-available-rental-properties/4-br-3-ba-rental-in-kapolei.html": buildPropertyExpansion({
    topic: "Kapolei 4-bedroom single-family rental",
    status: "For Rent",
    segment: "This page is for larger renter households with a higher budget looking for detached-home space in Kapolei.",
    bestFit: "This profile fits families or shared households that need multiple bedrooms, more bathrooms, parking, and a West Oahu location with access to Kapolei services.",
    sidebarNote: "A larger rental should be judged by total cost and function, not just bedroom count.",
    localContext: "Kapolei rentals can appeal to households that want west-side convenience, shopping, schools, and access to newer community infrastructure.",
    whySearched: "The price, bedroom count, and bathroom count suggest a serious renter comparing whether a larger home is realistic within budget.",
    neighborhoodContext: "Kapolei can make errands and services easier for West Oahu households, but drives toward Honolulu or certain installations still require realistic timing.",
    compareFactors: ["rent", "bedroom layout", "parking", "yard care", "utilities", "commute"],
    compareGuidance: "A 4-bedroom home may solve space needs, but utilities, yard care, and commute costs should be included in the monthly decision.",
    currentUse: "Use this page as a benchmark for larger Kapolei rental searches and current comparable availability.",
    heroIntro: "A 4-bedroom Kapolei rental is a serious family-size option that should be compared by space, cost, and routine.",
    introHeading: "Kapolei single-family rental context",
    introLead: "Use this page to compare larger rental homes against total monthly cost and commute.",
    pills: ["Kapolei", "4 Bedrooms", "Single Family", "Rental", "West Oahu"],
    comparePills: ["Rent", "Layout", "Parking", "Utilities"],
    ctaTitle: "Ask about Kapolei family rentals",
    ctaText: "Call or text to compare current 4-bedroom rentals in Kapolei and nearby West Oahu communities.",
  }),
  "oahu-available-rental-properties/3-br-1-5-bath-with-ocean-views.html": buildPropertyExpansion({
    topic: "3-bedroom rental with ocean views",
    status: "For Rent",
    segment: "This page is for renters attracted to view-oriented lifestyle features but still needing practical fit around space, cost, and location.",
    bestFit: "A rental with ocean views may fit households that value daily atmosphere and are willing to compare that lifestyle benefit against commute, parking, and monthly cost.",
    sidebarNote: "View language can be compelling, but renters should still verify exact location, condition, access, and whether the view affects the rent premium.",
    localContext: "On Oahu, view-oriented rentals can vary widely by elevation, neighborhood, road access, wind exposure, and distance from everyday services.",
    whySearched: "The phrase ocean views adds emotional pull to an otherwise practical bedroom and bathroom search. The content should ground that interest in real decision factors.",
    neighborhoodContext: "A view can improve the feel of a home, but the surrounding drive pattern, parking, and household routine determine whether it remains enjoyable after move-in.",
    compareFactors: ["rent premium", "exact location", "parking", "commute", "condition", "view quality"],
    compareGuidance: "Ask whether the view is visible from main living areas, whether it changes privacy or heat exposure, and whether the premium makes sense compared with similar no-view rentals.",
    currentUse: "Use this page to compare lifestyle-focused rentals without losing sight of practical Oahu constraints.",
    heroIntro: "Ocean views can make a rental stand out, but the right choice still has to work for budget, commute, and daily life.",
    introHeading: "Ocean-view rental context",
    introLead: "Use this page to balance lifestyle appeal with practical rental decisions.",
    pills: ["Ocean Views", "3 Bedrooms", "Lifestyle", "Rental", "Oahu"],
    comparePills: ["Rent Premium", "View Quality", "Parking", "Commute"],
    ctaTitle: "Compare view-oriented rentals",
    ctaText: "Call or text to evaluate current rentals with views against budget, location, and availability.",
  }),
  "oahu-available-rental-properties/2-br-2-ba-with-2-car-garage-in-ewa-beach.html": buildPropertyExpansion({
    topic: "Ewa Beach 2-bedroom rental with garage",
    status: "For Rent",
    segment: "This page is for renters who value parking, storage, and practical household function in Ewa Beach.",
    bestFit: "A 2-bedroom, 2-bath rental with a 2-car garage can fit couples, small families, roommates, or military households with gear, vehicles, or storage needs.",
    sidebarNote: "Garage parking can be a major feature on Oahu, but renters should still confirm driveway rules, guest parking, storage use, and association restrictions.",
    localContext: "In Ewa Beach, parking and storage can be meaningful advantages because household routines often involve multiple vehicles, beach gear, tools, or military equipment.",
    whySearched: "The garage detail is intent-rich. It tells us the renter cares about more than basic bedroom count.",
    neighborhoodContext: "Ewa Beach garage rentals should still be compared against commute timing, neighborhood rules, heat, and how far daily errands or base access will feel.",
    compareFactors: ["garage usability", "rent", "parking rules", "storage", "commute", "association restrictions"],
    compareGuidance: "Confirm whether the garage fits vehicles, storage, or both. Some garages are functionally different from what the listing headline suggests.",
    currentUse: "Use this page to benchmark Ewa Beach rentals where parking and storage are major decision factors.",
    heroIntro: "A 2-car garage can make an Ewa Beach rental much more practical for the right household.",
    introHeading: "Ewa Beach rental with garage context",
    introLead: "Use this page to compare parking and storage value against rent and commute.",
    pills: ["Ewa Beach", "2-Car Garage", "2 Bedrooms", "Storage", "Rental"],
    comparePills: ["Garage", "Parking Rules", "Storage", "Rent"],
    ctaTitle: "Ask about Ewa Beach rentals with garages",
    ctaText: "Call or text to compare current Ewa Beach rentals with parking and storage features.",
  }),
  "oahu-available-rental-properties/4-bedroom-3-bathroom-single-family-home-in-ewa-beach.html": buildPropertyExpansion({
    topic: "Ewa Beach 4-bedroom single-family rental",
    status: "For Rent",
    segment: "This page is for larger renter households looking for detached-home living, more bedrooms, and a West Oahu family routine.",
    bestFit: "A 4-bedroom Ewa Beach home usually fits families that need private bedrooms, garage or yard function, and enough space to settle quickly after a move.",
    sidebarNote: "Large rentals should be evaluated by how the whole home works, including layout, parking, utility cost, yard care, and commute.",
    localContext: "Ewa Beach single-family rentals are often attractive to military families and local households that need more space than a townhome or condo can provide.",
    whySearched: "A 4-bedroom, 3-bath title signals a renter with a serious space requirement and likely a tight decision window.",
    neighborhoodContext: "Ewa Beach can offer the space many families want, but commute timing and household logistics should be tested before signing a lease.",
    compareFactors: ["rent", "layout", "parking", "yard", "utilities", "commute"],
    compareGuidance: "Look beyond the bedroom count. Bedroom placement, bathroom access, yard expectations, and storage often matter more after move-in.",
    currentUse: "Use this page to compare current larger Ewa Beach rentals with the same practical family-living criteria.",
    heroIntro: "A 4-bedroom Ewa Beach rental should be judged by how well it supports family life under a real Oahu commute.",
    introHeading: "Ewa Beach family rental context",
    introLead: "Use this page to compare space, cost, parking, and timing before applying.",
    pills: ["Ewa Beach", "4 Bedrooms", "Single Family", "Family Rental", "West Oahu"],
    comparePills: ["Layout", "Yard", "Parking", "Utilities"],
    ctaTitle: "Ask about large Ewa Beach rentals",
    ctaText: "Call or text to compare current 4-bedroom rental homes in Ewa Beach and nearby areas.",
  }),
  "oahu-available-rental-properties/3-bedroom-2-5-bathroom-in-ocean-pointe.html": buildPropertyExpansion({
    topic: "Ocean Pointe 3-bedroom rental",
    status: "For Rent",
    segment: "This page is for renters already oriented toward Ocean Pointe and comparing whether a 3-bedroom, 2.5-bath layout fits their household.",
    bestFit: "This profile fits families or shared households that want West Oahu neighborhood structure, enough bedrooms, and a layout that separates living space from sleeping space.",
    sidebarNote: "Ocean Pointe rentals should be compared by parking, association expectations, school routine, and commute before the application step.",
    localContext: "Ocean Pointe is a recognizable Ewa Beach community and often enters the search for renters who want residential consistency and West Oahu access.",
    whySearched: "The search is specific enough to suggest the renter already likes Ocean Pointe or wants a similar Ewa Beach community.",
    neighborhoodContext: "Ocean Pointe can support a strong daily routine, but Fort Weaver Road, H-1 access, and school or work locations still need practical review.",
    compareFactors: ["rent", "parking", "layout", "association rules", "commute", "move-in timing"],
    compareGuidance: "Compare similar Ocean Pointe options by actual household flow, not just square footage or bedroom count.",
    currentUse: "Use the page to compare current Ocean Pointe rentals or nearby Ewa Beach alternatives.",
    heroIntro: "An Ocean Pointe rental search should connect the neighborhood appeal with layout, parking, and daily commute realities.",
    introHeading: "Ocean Pointe rental context",
    introLead: "Use this page to judge whether the Ocean Pointe profile fits your move.",
    pills: ["Ocean Pointe", "Ewa Beach", "3 Bedrooms", "Rental", "West Oahu"],
    comparePills: ["Parking", "Layout", "Rules", "Commute"],
    ctaTitle: "Compare Ocean Pointe options",
    ctaText: "Call or text to review current Ocean Pointe rentals and similar Ewa Beach options.",
  }),
  "oahu-available-rental-properties/for-rent-2-br-2-ba-condominium-in-mililani-hawaii.html": buildPropertyExpansion({
    topic: "Mililani condominium rental",
    status: "For Rent",
    segment: "This page is for central Oahu renters looking for condo living near Mililani's everyday conveniences.",
    bestFit: "A Mililani condo can fit smaller households that value central location, manageable space, and access to shopping, schools, and Schofield or Wheeler commute routes.",
    sidebarNote: "Confirm bedroom and bathroom details, parking, association rules, and utilities because archived titles may not tell the whole current story.",
    localContext: "Mililani offers a central Oahu option for renters who do not want every search path to default to Ewa Beach or Kapolei.",
    whySearched: "Mililani rental searches are often practical. The renter is likely balancing convenience, budget, and commute rather than chasing a luxury feature.",
    neighborhoodContext: "Mililani can make certain routines easier, especially for central or north-side assignments, but inventory can be competitive and property condition varies.",
    compareFactors: ["rent", "parking", "utilities", "association rules", "commute", "unit condition"],
    compareGuidance: "Compare Mililani condos against townhomes and smaller single-family options to understand what you gain in convenience and what you give up in space.",
    currentUse: "Use this page to evaluate current Mililani condo rentals with practical central Oahu criteria.",
    heroIntro: "A Mililani condo rental can be a practical central Oahu choice when convenience and monthly cost line up.",
    introHeading: "Mililani condo rental context",
    introLead: "Use this page to compare central Oahu condo living against your budget and commute.",
    pills: ["Mililani", "Condominium", "Central Oahu", "Rental", "Convenience"],
    comparePills: ["Rent", "Parking", "Utilities", "Condition"],
    ctaTitle: "Ask about Mililani condo rentals",
    ctaText: "Call or text to compare current Mililani rentals and central Oahu alternatives.",
  }),
  "oahu-available-rental-properties/3-bedroom-2-5-bath-townhouse-at-fairways-edge.html": buildPropertyExpansion({
    topic: "Fairways Edge townhouse rental",
    status: "For Rent",
    segment: "This page is for renters considering Fairways Edge or nearby Kapolei-area townhouse communities.",
    bestFit: "A 3-bedroom Fairways Edge townhouse can fit households that want West Oahu access, a defined community setting, and more functional space than a condo.",
    sidebarNote: "Community-named rentals should be checked for association rules, parking, amenities, and commute before application decisions.",
    localContext: "Fairways Edge is part of the broader West Oahu rental conversation, often compared with Kapolei, Makakilo, and Ewa Beach options.",
    whySearched: "A community name in the title shows the searcher may already know the neighborhood and wants specific fit details.",
    neighborhoodContext: "The area can work for renters who want west-side services and a residential setting, but traffic direction and work location still matter.",
    compareFactors: ["rent", "community rules", "parking", "amenities", "commute", "layout"],
    compareGuidance: "Compare community amenities against the rent and rules. Amenities are useful only if the household will actually use them.",
    currentUse: "Use this page to benchmark current Fairways Edge or nearby townhouse availability.",
    heroIntro: "Fairways Edge townhouse rentals should be compared by community fit, layout, parking, and West Oahu commute.",
    introHeading: "Fairways Edge rental context",
    introLead: "Use this page to compare community-specific rental fit before applying.",
    pills: ["Fairways Edge", "Townhouse", "3 Bedrooms", "West Oahu", "Rental"],
    comparePills: ["Community Rules", "Parking", "Amenities", "Commute"],
    ctaTitle: "Compare Fairways Edge rentals",
    ctaText: "Call or text to review current Fairways Edge and nearby West Oahu townhome options.",
  }),
  "oahu-available-rental-properties/4-bedroom-2-5-bathrooms-1538-sf-in-ewa-beach-2500-per-month.html": buildPropertyExpansion({
    topic: "Ewa Beach 4-bedroom budget rental",
    status: "For Rent",
    segment: "This page is for budget-aware family renters comparing a specific Ewa Beach size and price point.",
    bestFit: "This profile fits households that need four bedrooms but still need rent to stay controlled enough for the rest of the move budget.",
    sidebarNote: "When a title includes price and square footage, the searcher should use both to judge whether the layout and cost are realistic together.",
    localContext: "Ewa Beach can offer family-sized rentals, but pricing, condition, parking, and commute can vary sharply by neighborhood and property age.",
    whySearched: "A 4-bedroom rental at a named price point is a high-intent affordability search. The renter is trying to understand what a budget can secure.",
    neighborhoodContext: "Ewa Beach may fit larger households that need space, but the rental should be compared against the full cost of living and the commute the family will actually drive.",
    compareFactors: ["rent", "square footage", "bedroom usability", "parking", "condition", "commute"],
    compareGuidance: "A lower price can be valuable, but it may come with tradeoffs in size, condition, updates, or location. Confirm those details before treating it as the best option.",
    currentUse: "Use this archived example to compare current budget-friendly Ewa Beach family rentals.",
    heroIntro: "A 4-bedroom Ewa Beach rental at a defined price point should be evaluated by both affordability and day-to-day usability.",
    introHeading: "Ewa Beach budget rental context",
    introLead: "Use this page to compare family-sized rental value against space, condition, and commute.",
    pills: ["Ewa Beach", "4 Bedrooms", "$2,500", "Budget Rental", "Family Housing"],
    comparePills: ["Price", "Square Footage", "Condition", "Parking"],
    ctaTitle: "Compare budget-friendly Ewa Beach rentals",
    ctaText: "Call or text to review current family rental options in Ewa Beach within your target budget.",
  }),
  "oahu-available-rental-properties/for-rent-5-bedroom-executive-home-with-3-car-garage-in-ocean-pointe.html": buildPropertyExpansion({
    topic: "Ocean Pointe executive rental",
    status: "For Rent",
    segment: "This page is for higher-income renter households, senior military families, contractors, or executives looking for a larger Ocean Pointe home.",
    bestFit: "A 5-bedroom executive home with a 3-car garage usually fits households that need space, storage, privacy, and a premium West Oahu residential setting.",
    sidebarNote: "Premium rentals need premium-level due diligence: lease terms, maintenance responsibility, utility expectations, garage use, and move-in timing all matter.",
    localContext: "Ocean Pointe executive rentals can appeal to larger households that want Ewa Beach space with a more established residential feel.",
    whySearched: "The executive-home language, bedroom count, and garage size indicate a narrower but valuable rental audience with specific household requirements.",
    neighborhoodContext: "Ocean Pointe can work well for larger households, but premium rent should still be balanced against commute timing and how the home supports daily operations.",
    compareFactors: ["rent", "garage capacity", "bedroom layout", "maintenance terms", "utilities", "commute"],
    compareGuidance: "Premium rental value comes from how the home functions. Confirm whether the garage, bedroom layout, yard, and storage solve real household needs.",
    currentUse: "Use this page to compare current executive rentals in Ocean Pointe, Ewa Beach, and nearby West Oahu communities.",
    heroIntro: "A 5-bedroom Ocean Pointe executive rental should be compared by space, storage, lease terms, and daily routine.",
    introHeading: "Ocean Pointe executive rental context",
    introLead: "Use this page to evaluate premium West Oahu rental fit with practical detail.",
    pills: ["Ocean Pointe", "Executive Home", "5 Bedrooms", "3-Car Garage", "Rental"],
    comparePills: ["Garage", "Premium Rent", "Lease Terms", "Utilities"],
    ctaTitle: "Ask about executive rentals in Ocean Pointe",
    ctaText: "Call or text to compare current premium rental homes in Ocean Pointe and Ewa Beach.",
  }),
  "oahu-available-rental-properties/for-rent-2-br-2-bath-condominium-in-mililani-mauka.html": buildPropertyExpansion({
    topic: "Mililani Mauka 2-bedroom condo rental",
    status: "For Rent",
    segment: "This page is for smaller central Oahu renter households that want Mililani Mauka specifically.",
    bestFit: "A 2-bedroom Mililani Mauka condo can fit couples, small families, roommates, or remote workers who want central Oahu convenience without a larger rental footprint.",
    sidebarNote: "Smaller rentals should still be evaluated by parking, storage, rules, noise, and commute.",
    localContext: "Mililani Mauka can appeal to renters seeking a central location, residential structure, and access toward Schofield, Wheeler, and Mililani services.",
    whySearched: "The title indicates a specific size and community, which means the renter likely has a defined central Oahu target.",
    neighborhoodContext: "Central Oahu convenience can be a real advantage, but renters should confirm the exact commute and whether the unit fits normal household rhythms.",
    compareFactors: ["rent", "parking", "storage", "unit condition", "commute", "association rules"],
    compareGuidance: "Compare the condo against nearby townhomes by cost, privacy, storage, and how much space the household actually needs.",
    currentUse: "Use this page to compare current Mililani Mauka condo rentals with smaller central Oahu alternatives.",
    heroIntro: "A 2-bedroom Mililani Mauka condo rental can be a strong fit when central location and manageable space matter most.",
    introHeading: "Mililani Mauka condo rental context",
    introLead: "Use this page to compare smaller central Oahu rental options.",
    pills: ["Mililani Mauka", "Condo", "2 Bedrooms", "Central Oahu", "Rental"],
    comparePills: ["Rent", "Parking", "Storage", "Rules"],
    ctaTitle: "Compare Mililani Mauka condo rentals",
    ctaText: "Call or text to review current smaller rentals in Mililani Mauka and central Oahu.",
  }),
  "oahu-available-rental-properties/4-bedroom-3-bath-single-family-home-2060-sf.html": buildPropertyExpansion({
    topic: "4-bedroom single-family rental",
    status: "For Rent",
    segment: "This page is for space-focused renter households evaluating a large detached rental home on Oahu.",
    bestFit: "A 4-bedroom, 3-bath, 2,060-square-foot home usually fits larger families or shared households that need usable space, multiple bathrooms, and room to settle during an assignment or local move.",
    sidebarNote: "Square footage matters only if the layout works. Bedroom placement, storage, parking, and common areas should be reviewed carefully.",
    localContext: "Large detached rentals can be valuable on Oahu because space is limited and family-sized rentals can move quickly when priced correctly.",
    whySearched: "A size-specific rental search suggests the household already knows it needs room and is checking whether the home profile can support daily life.",
    neighborhoodContext: "The location should be evaluated by the commute and services the household needs, because a large home can still be a poor fit if daily logistics are wrong.",
    compareFactors: ["rent", "square footage", "bedroom layout", "bathroom access", "parking", "commute"],
    compareGuidance: "Compare large homes by how the space is distributed. A smaller home with a better layout can sometimes function better than a larger one with awkward rooms.",
    currentUse: "Use this page to evaluate current large single-family rentals with the same space and routine criteria.",
    heroIntro: "A large single-family rental should be judged by functional space, not only the headline square footage.",
    introHeading: "Large single-family rental context",
    introLead: "Use this page to compare space-focused rentals against real household needs.",
    pills: ["4 Bedrooms", "3 Bathrooms", "2,060 SF", "Single Family", "Rental"],
    comparePills: ["Square Footage", "Layout", "Parking", "Commute"],
    ctaTitle: "Ask about large Oahu rentals",
    ctaText: "Call or text to compare current 4-bedroom rental homes by location, layout, and availability.",
  }),
  "oahu-available-rental-properties/2-bedroom-2-bathroom-condo-in-mililani.html": buildPropertyExpansion({
    topic: "Mililani 2-bedroom condo rental",
    status: "For Rent",
    segment: "This page is for smaller renter households looking for central Oahu convenience and manageable monthly cost.",
    bestFit: "A 2-bedroom, 2-bath Mililani condo can fit couples, roommates, small families, or remote workers who want a practical central location.",
    sidebarNote: "The second bathroom can matter for roommates, guests, or family routine, but parking and utilities still need to be confirmed.",
    localContext: "Mililani condo rentals offer a central Oahu path for renters who want convenience without the upkeep of a larger home.",
    whySearched: "The search is practical and specific. The renter likely wants enough room to function without paying for more space than needed.",
    neighborhoodContext: "Mililani's central location may reduce some drive patterns, especially for Schofield, Wheeler, Pearl City, or central-island routines.",
    compareFactors: ["rent", "parking", "bathroom layout", "utilities", "commute", "association rules"],
    compareGuidance: "Compare 2-bedroom condos by privacy, parking, storage, and whether the monthly cost leaves room for the rest of the move budget.",
    currentUse: "Use this page to benchmark current Mililani condo rentals and similar central Oahu options.",
    heroIntro: "A 2-bedroom Mililani condo rental can be practical when central location, cost, and daily convenience line up.",
    introHeading: "Mililani condo rental context",
    introLead: "Use this page to compare smaller central Oahu rentals before applying.",
    pills: ["Mililani", "2 Bedrooms", "2 Bathrooms", "Condo", "Rental"],
    comparePills: ["Rent", "Parking", "Bathroom Layout", "Utilities"],
    ctaTitle: "Ask about Mililani condo rentals",
    ctaText: "Call or text to compare current Mililani and central Oahu rental options.",
  }),
  "oahu-available-rental-properties/2-bedroom-1-5-bath-condo-in-ewa-beach-1500-per-month.html": buildPropertyExpansion({
    topic: "Ewa Beach affordable condo rental",
    status: "For Rent",
    segment: "This page is for value-sensitive renters searching a specific affordable Ewa Beach price point.",
    bestFit: "A 2-bedroom, 1.5-bath condo at a lower monthly rent may fit renters who need a manageable payment and are willing to compare space, age, parking, or commute tradeoffs.",
    sidebarNote: "A budget-friendly rent can be useful, but renters should confirm what is included and what compromises come with the price.",
    localContext: "Affordable Ewa Beach rentals can help households stay in West Oahu, but availability, condition, and parking can change quickly.",
    whySearched: "A price-qualified rental search is strong intent. The renter is likely trying to determine whether the budget is realistic.",
    neighborhoodContext: "Ewa Beach may give renters access to West Oahu neighborhoods and services, but commute and property condition should still be weighed against the lower rent.",
    compareFactors: ["rent", "included utilities", "parking", "condition", "commute", "move-in costs"],
    compareGuidance: "Compare the advertised rent with the full monthly and move-in cost. Deposits, utilities, parking, and commute expenses can change the value quickly.",
    currentUse: "Use this archived page as a benchmark for current budget-friendly Ewa Beach rental searches.",
    heroIntro: "A lower-priced Ewa Beach condo rental can be valuable when the full cost and daily routine still work.",
    introHeading: "Affordable Ewa Beach rental context",
    introLead: "Use this page to compare budget-friendly rental options with practical tradeoffs.",
    pills: ["Ewa Beach", "Affordable Rental", "$1,500", "2 Bedrooms", "Condo"],
    comparePills: ["Rent", "Utilities", "Parking", "Move-In Cost"],
    ctaTitle: "Compare affordable Ewa Beach rentals",
    ctaText: "Call or text to review current rentals that fit your budget and move-in timeline.",
  }),
};

CONTENT.evergreenPages = EVERGREEN_PAGE_DEFS.map(buildEvergreenPage).map(function (page) {
  return applyPageExpansion(page, EVERGREEN_CONTENT_EXPANSIONS[page.key]);
});
CONTENT.propertyPages = PROPERTY_PAGE_DEFS.map(createPropertyPage).map(function (page) {
  return applyPageExpansion(page, PROPERTY_CONTENT_EXPANSIONS[page.path]);
});

function buildPageIndex() {
  const index = Object.create(null);

  CONTENT.evergreenPages.concat(CONTENT.propertyPages).forEach(function (page) {
    index[page.key] = page;
  });

  return index;
}

function linkTo(pageIndex, key, label, description) {
  const page = pageIndex[key];

  if (!page) return null;

  return {
    path: page.path,
    label: label || page.title,
    description: description,
  };
}

function assignSecondPassLinks() {
  const pageIndex = buildPageIndex();
  const evergreenRelations = {
    "ewa-beach-real-estate-hawaii-listings": [
      linkTo(pageIndex, "ewa-beach-real-estate", "Ewa Beach Real Estate", "Compare this listings-focused page with the broader area guide."),
      linkTo(pageIndex, "va-loan-information", "VA Loan Information", "Connect area research with Hawaii VA buying context."),
      linkTo(pageIndex, "mortgage-calculator", "Mortgage Calculator", "Compare search results against estimated monthly payment scenarios."),
    ],
    "our-cooperating-broker-commissions": [
      { path: "services.html", label: "Real Estate Services", description: "Review the brokerage services that support buyer and seller representation." },
      linkTo(pageIndex, "hawaii-military-realty-inc", "Hawaii Military Realty, Inc.", "See the company overview behind the brokerage standards."),
      { path: "contact.html", label: "Contact the Brokerage", description: "Start a direct conversation about representation and next steps." },
    ],
    "hawaii-va-homebuying-video": [
      linkTo(pageIndex, "va-loan-information", "VA Loan Information", "Continue from the video summary into broader VA buying guidance."),
      linkTo(pageIndex, "va-home-buying-in-hawaii", "VA Home Buying in Hawaii", "Compare the general VA overview with Hawaii-specific buying context."),
      linkTo(pageIndex, "mortgage-calculator", "Mortgage Calculator", "Pair the video resource with payment-planning scenarios."),
    ],
    "new-home-construction": [
      linkTo(pageIndex, "kapolei-real-estate-listings-and-information", "Kapolei Real Estate Listings", "Compare builder interest with a west Oahu search hub."),
      linkTo(pageIndex, "ewa-beach-real-estate", "Ewa Beach Real Estate", "Review another high-interest area for newer housing stock."),
      { path: "services.html", label: "Buyer Services", description: "See how the team supports purchases, tours, and negotiation." },
    ],
    "oahu-real-estate-property-for-sale-listings": [
      linkTo(pageIndex, "ewa-beach-real-estate", "Ewa Beach Real Estate", "Explore one of the most searched Oahu submarkets in more detail."),
      linkTo(pageIndex, "kapolei-real-estate-listings-and-information", "Kapolei Real Estate Listings", "Compare broader Oahu search intent with Kapolei-specific guidance."),
      linkTo(pageIndex, "mililani-real-estate", "Mililani Real Estate", "Jump into a central Oahu community page from the islandwide search hub."),
    ],
    "hawaii-military-lodging": [
      linkTo(pageIndex, "hawaii-bases-and-barracks", "Hawaii Bases and Barracks", "Pair short-term arrival planning with installation context."),
      linkTo(pageIndex, "hawaii-commissaries", "Hawaii Commissaries", "Connect arrival logistics with everyday base-area support."),
      linkTo(pageIndex, "opportune-lift-program-oplift", "OPLIFT Program", "Review another military support topic tied to transition planning."),
    ],
    "va-loan-information": [
      linkTo(pageIndex, "va-home-buying-in-hawaii", "VA Home Buying in Hawaii", "Move from general VA guidance into Hawaii-specific buying context."),
      linkTo(pageIndex, "the-right-down-payment-on-hawaii-home", "Down Payment on a Hawaii Home", "Compare no-down and low-down planning scenarios."),
      linkTo(pageIndex, "mortgage-calculator", "Mortgage Calculator", "Use a planning tool after reviewing the broader VA overview."),
    ],
    "mortgage-calculator": [
      linkTo(pageIndex, "va-loan-information", "VA Loan Information", "Connect payment estimates with VA buying guidance."),
      linkTo(pageIndex, "ewa-beach-real-estate", "Ewa Beach Real Estate", "Test payment scenarios against a popular west Oahu search area."),
      linkTo(pageIndex, "kapolei-real-estate-listings-and-information", "Kapolei Real Estate Listings", "Compare monthly planning against another active Oahu market."),
    ],
    "hawaii-bases-and-barracks": [
      linkTo(pageIndex, "hawaii-military-lodging", "Hawaii Military Lodging", "Connect base context with arrival and temporary stay planning."),
      linkTo(pageIndex, "hawaii-commissaries", "Hawaii Commissaries", "Add everyday support context around installations and communities."),
      linkTo(pageIndex, "va-home-buying-in-hawaii", "VA Home Buying in Hawaii", "Move from assignment planning into housing planning."),
    ],
    "hawaii-golf-courses": [
      linkTo(pageIndex, "ewa-beach-real-estate", "Ewa Beach Real Estate", "Connect lifestyle interest with one of west Oahu's residential hubs."),
      linkTo(pageIndex, "kapolei-real-estate-listings-and-information", "Kapolei Real Estate Listings", "Compare golf lifestyle interest with nearby home search content."),
      linkTo(pageIndex, "mililani-real-estate", "Mililani Real Estate", "Review another community page after exploring lifestyle content."),
    ],
    "mililani-real-estate": [
      linkTo(pageIndex, "oahu-real-estate-property-for-sale-listings", "Oahu Real Estate Listings", "Step back into an islandwide property search page."),
      linkTo(pageIndex, "mortgage-calculator", "Mortgage Calculator", "Compare Mililani search interest with payment planning."),
      linkTo(pageIndex, "va-home-buying-in-hawaii", "VA Home Buying in Hawaii", "Pair community research with military buyer guidance."),
    ],
    "va-home-buying-in-hawaii": [
      linkTo(pageIndex, "va-loan-information", "VA Loan Information", "Start with the broad overview if you need core VA context."),
      linkTo(pageIndex, "hawaii-va-homebuying-video", "Hawaii VA Homebuying Video", "Use the video as a faster summary of the topic."),
      linkTo(pageIndex, "the-right-down-payment-on-hawaii-home", "Down Payment on a Hawaii Home", "Review one of the most common Hawaii buyer questions."),
    ],
    "ewa-beach-real-estate": [
      linkTo(pageIndex, "ewa-beach-real-estate-hawaii-listings", "Ewa Beach Listings", "Compare the area guide with the listings-oriented version."),
      linkTo(pageIndex, "mortgage-calculator", "Mortgage Calculator", "Estimate payment ranges while reviewing the area."),
      linkTo(pageIndex, "va-home-buying-in-hawaii", "VA Home Buying in Hawaii", "Pair neighborhood research with military buyer guidance."),
    ],
    "opportune-lift-program-oplift": [
      linkTo(pageIndex, "hawaii-military-lodging", "Hawaii Military Lodging", "Link travel support questions with arrival planning."),
      linkTo(pageIndex, "hawaii-bases-and-barracks", "Hawaii Bases and Barracks", "Add installation context while planning a move."),
      { path: "contact.html", label: "Talk Through Your Move", description: "Use the resource pages as a starting point for direct relocation guidance." },
    ],
    "the-right-down-payment-on-hawaii-home": [
      linkTo(pageIndex, "va-loan-information", "VA Loan Information", "Review the bigger VA context before comparing down payment strategy."),
      linkTo(pageIndex, "mortgage-calculator", "Mortgage Calculator", "Model how different cash-to-close choices affect monthly planning."),
      linkTo(pageIndex, "va-home-buying-in-hawaii", "VA Home Buying in Hawaii", "Keep the down payment conversation tied to the broader Hawaii buying process."),
    ],
    "hawaii-real-estate-news": [
      linkTo(pageIndex, "oahu-real-estate-property-for-sale-listings", "Oahu Real Estate Listings", "Move from news and updates into active search intent."),
      linkTo(pageIndex, "ewa-beach-real-estate", "Ewa Beach Real Estate", "Compare market updates with one of the site's main community guides."),
      linkTo(pageIndex, "va-home-buying-in-hawaii", "VA Home Buying in Hawaii", "Use market context alongside buyer education resources."),
    ],
    "hawaii-military-realty-inc": [
      { path: "about.html", label: "Who Are David and Tonya?", description: "Read the leadership and background page that maps to the legacy about route." },
      { path: "index.html", label: "Hawaii Real Estate and Military Homes", description: "See the legacy home route that carries the primary brand positioning." },
      { path: "team.html", label: "Meet the Team", description: "Continue into the full team page from the company overview." },
    ],
    "kapolei-real-estate-listings-and-information": [
      linkTo(pageIndex, "oahu-real-estate-property-for-sale-listings", "Oahu Real Estate Listings", "Compare the Kapolei search page with the islandwide search hub."),
      linkTo(pageIndex, "mortgage-calculator", "Mortgage Calculator", "Use payment planning while evaluating Kapolei inventory."),
      linkTo(pageIndex, "va-home-buying-in-hawaii", "VA Home Buying in Hawaii", "Pair Kapolei research with military buyer guidance."),
    ],
    "hawaii-commissaries": [
      linkTo(pageIndex, "hawaii-bases-and-barracks", "Hawaii Bases and Barracks", "Connect everyday shopping logistics with installation context."),
      linkTo(pageIndex, "hawaii-military-lodging", "Hawaii Military Lodging", "Use another relocation resource while preparing arrival plans."),
      linkTo(pageIndex, "opportune-lift-program-oplift", "OPLIFT Program", "Review an additional military transition support topic."),
    ],
  };
  const communityKeyByName = {
    "Ewa Beach": "ewa-beach-real-estate",
    "Ocean Pointe": "ewa-beach-real-estate",
    "Ka Makana at Hoakalei": "ewa-beach-real-estate",
    Kapolei: "kapolei-real-estate-listings-and-information",
    Makakilo: "kapolei-real-estate-listings-and-information",
    "Fairways Edge": "kapolei-real-estate-listings-and-information",
    Mililani: "mililani-real-estate",
    "Mililani Mauka": "mililani-real-estate",
  };

  CONTENT.evergreenPages.forEach(function (page) {
    page.relatedLinks = (evergreenRelations[page.key] || [])
      .filter(Boolean)
      .slice(0, 3);
  });

  CONTENT.propertyPages.forEach(function (page) {
    const communityLinkKey =
      communityKeyByName[detectPropertySeoArea(page.hero.heading, "Oahu")] ||
      "oahu-real-estate-property-for-sale-listings";

    page.relatedLinks = [
      linkTo(pageIndex, communityLinkKey, "Area Guide", "Review the broader community page that surrounds this property search."),
      linkTo(pageIndex, "mortgage-calculator", "Mortgage Calculator", "Compare the property interest with estimated monthly payment scenarios."),
      linkTo(pageIndex, "va-home-buying-in-hawaii", "VA Home Buying in Hawaii", "Connect this home search with Hawaii military buyer guidance."),
    ]
      .filter(Boolean)
      .slice(0, 3);
  });
}

assignSecondPassLinks();


module.exports = CONTENT;
