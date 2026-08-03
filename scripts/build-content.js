#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const content = require("../src/content-seo.js");

const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "src");
const buildDir = path.join(root, "build");
const templatesDir = path.join(srcDir, "templates");
const generatedComment =
  "<!-- Generated into build/ from src/content.js and src/content-seo.js by scripts/build-content.js. Do not edit generated output directly. -->";

const iconAliases = {
  arrowLeft: "arrow-left",
  arrowRight: "arrow-right",
  checkCircle: "check-circle",
  checkCircleOpen: "check-circle-open",
  mapPin: "map-pin",
  shieldCheck: "shield-check",
};

const templateCache = new Map();
const iconCache = new Map();

// Domain policies
function sortAgents(agents) {
  return agents.slice().sort(function (a, b) {
    const aHasSort = typeof a.sort === "number";
    const bHasSort = typeof b.sort === "number";

    if (aHasSort && bHasSort) {
      return a.sort - b.sort || a.name.localeCompare(b.name);
    }

    if (aHasSort) return -1;
    if (bHasSort) return 1;

    return a.name.localeCompare(b.name);
  });
}

function formatList(items) {
  if (items.length < 2) return items[0] || "";
  if (items.length === 2) return items.join(" and ");

  return items.slice(0, -1).join(", ") + ", and " + items[items.length - 1];
}

function getFeaturedAgent() {
  return (
    sortAgents(content.agents).find(function (agent) {
      return agent.featured === true;
    }) || sortAgents(content.agents)[0]
  );
}

function resolveHref(currentOutputPath, hrefKey) {
  const contact = content.site.contact;

  if (hrefKey === "email")
    return relativePublicHref(
      currentOutputPath,
      contact.contactPageHref || "contact.html",
    );
  if (hrefKey && contact[hrefKey])
    return relativePublicHref(currentOutputPath, contact[hrefKey]);

  return relativePublicHref(currentOutputPath, hrefKey || "#");
}

function phoneHref(phone) {
  const digits = String(phone || "").replace(/\D/g, "");

  return digits ? "tel:" + digits : "#";
}

function smsHref(phone) {
  const digits = String(phone || "").replace(/\D/g, "");

  return digits ? "sms:" + digits : "#";
}

function renderAgentContactActions(agent, variant) {
  const actions = [];
  const linkClass = variant === "hero" ? ' class="cta"' : "";

  if (agent.phone) {
    actions.push(
      '<a' +
        linkClass +
        ' href="' +
        escapeHtml(phoneHref(agent.phone)) +
        '">' +
        icon("phone") +
        " " +
        escapeHtml(agent.phone) +
        "</a>",
    );
    actions.push(
      '<a' +
        linkClass +
        ' href="' +
        escapeHtml(smsHref(agent.phone)) +
        '">' +
        icon("msg") +
        " Text</a>",
    );
  }

  if (agent.email) {
    actions.push(
      '<a' +
        linkClass +
        ' href="mailto:' +
        escapeHtml(agent.email) +
        '">' +
        icon("mail") +
        " Email</a>",
    );
  }

  return actions.join("\n");
}

// Application use cases
function getRootPageModels() {
  return [
    {
      page: content.pages.home,
      activePath: "index.html",
      template: "pages/home.html",
      cta: content.site.cta,
    },
    {
      page: content.pages.services,
      activePath: "services.html",
      template: "pages/services.html",
      cta: content.pages.services.cta,
    },
    {
      page: content.pages.testimonials,
      activePath: "testimonials.html",
      template: "pages/testimonials.html",
      cta: content.pages.testimonials.cta,
    },
    {
      page: content.pages.contact,
      activePath: "contact.html",
      template: "pages/contact.html",
      cta: content.pages.contact.cta,
    },
    {
      page: content.pages.notFound,
      activePath: "",
      template: "pages/404.html",
      cta: null,
    },
    {
      page: content.team,
      path: "team.html",
      activePath: "team.html",
      template: "pages/team.html",
      cta: content.team.cta,
    },
    {
      page: content.about,
      path: "about.html",
      activePath: "about.html",
      template: "pages/about.html",
      cta: content.about.cta,
    },
  ];
}

function getFeaturedListingModel() {
  return {
    page: content.pages.featuredListing,
    activePath: "featured-listing.html",
    template: "pages/featured-listing.html",
    cta: content.pages.featuredListing.cta,
  };
}

function getContentPageModels() {
  return []
    .concat(
      (content.evergreenPages || []).map(function (page) {
        return {
          page: page,
          activePath: "",
          prefix: "../",
          template: "pages/content-page.html",
          cta: page.cta,
        };
      }),
    )
    .concat(
      (content.propertyPages || []).map(function (page) {
        return {
          page: page,
          activePath: "",
          prefix: "../",
          template: "pages/content-page.html",
          cta: page.cta,
        };
      }),
    );
}

function getAgentPageModels() {
  return content.agents.map(function (agent) {
    return { agent: agent };
  });
}

// Presentation primitives
function readTemplate(relativePath) {
  if (!templateCache.has(relativePath)) {
    templateCache.set(
      relativePath,
      fs.readFileSync(path.join(templatesDir, relativePath), "utf8"),
    );
  }

  return templateCache.get(relativePath);
}

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getPathValue(source, dottedPath) {
  return dottedPath.split(".").reduce(function (current, key) {
    if (current == null) return "";
    return current[key];
  }, source);
}

function renderString(template, data) {
  return template
    .replace(/\{\{\{\s*([\w.]+)\s*\}\}\}/g, function (_, key) {
      return String(
        getPathValue(data, key) == null ? "" : getPathValue(data, key),
      );
    })
    .replace(/\{\{\s*([\w.]+)\s*\}\}/g, function (_, key) {
      return escapeHtml(getPathValue(data, key));
    });
}

function renderTemplate(relativePath, data) {
  return renderString(readTemplate(relativePath), data);
}

function icon(name) {
  const fileName = iconAliases[name] || name;

  if (!iconCache.has(fileName)) {
    iconCache.set(
      fileName,
      readTemplate(path.join("icons", fileName + ".html")).trim(),
    );
  }

  return iconCache.get(fileName);
}

function paragraphs(items) {
  return (items || [])
    .map(function (text) {
      return renderTemplate("partials/paragraph.html", { text: text });
    })
    .join("\n");
}

function repeatHtml(html, times) {
  return Array.from({ length: times }, function () {
    return html;
  }).join("\n");
}

function starRating(count) {
  return Array.from({ length: count }, function () {
    return icon("star");
  }).join("");
}

function renderEyebrow(label) {
  return renderTemplate("partials/eyebrow-pill.html", { label: label });
}

function renderHeadData(page, prefix, extraHeadHtml, currentOutputPath) {
  const siteSeo = content.site.seo || {};
  const title = page.title || "";
  const description = page.description || "";
  const ogTitle = page.ogTitle || title;
  const ogDescription = page.ogDescription || description;

  return {
    title: title,
    description: description,
    generator: siteSeo.generator || "",
    googleSiteVerification: siteSeo.googleSiteVerification || "",
    ogLocale: page.ogLocale || siteSeo.locale || "en_US",
    ogSiteName: page.ogSiteName || siteSeo.siteName || content.site.brand.name,
    ogType: page.ogType || siteSeo.type || "website",
    ogTitle: ogTitle,
    ogDescription: ogDescription,
    ogUrl:
      page.ogUrl || buildAbsolutePublicUrl(currentOutputPath, siteSeo.url || ""),
    twitterCard: page.twitterCard || siteSeo.twitterCard || "summary",
    twitterTitle: page.twitterTitle || ogTitle,
    twitterDescription: page.twitterDescription || ogDescription,
    prefix: prefix,
    extraHeadHtml: extraHeadHtml || "",
  };
}

function renderHeadRoot(page, prefix, extraHeadHtml, currentOutputPath) {
  return renderTemplate(
    "partials/head-root.html",
    renderHeadData(page, prefix, extraHeadHtml, currentOutputPath),
  );
}

function renderHeadAsset(page, prefix, extraHeadHtml, currentOutputPath) {
  return renderTemplate(
    "partials/head-asset.html",
    renderHeadData(page, prefix, extraHeadHtml, currentOutputPath),
  );
}

function normalizeOutputPath(value) {
  return String(value || "").replace(/\\/g, "/").replace(/^\/+/, "");
}

function isExternalHref(value) {
  return /^(?:[a-z]+:|\/\/|#)/i.test(String(value || ""));
}

function logicalPageToPublicPath(value) {
  const normalized = normalizeOutputPath(value);

  if (!normalized) return "";
  if (normalized === "index.html") return "";
  if (normalized === "404.html") return "404.html";
  if (/\/index\.html$/i.test(normalized))
    return normalized.replace(/\/index\.html$/i, "");
  if (/\.html$/i.test(normalized))
    return normalized.replace(/\.html$/i, "");

  return normalized;
}

function logicalPageToOutputPath(value) {
  return normalizeOutputPath(value);
}

function buildAbsolutePublicUrl(outputPath, siteUrl) {
  const baseUrl = String(siteUrl || "").replace(/\/+$/, "");
  const publicPath = logicalPageToPublicPath(outputPath);

  if (!baseUrl) return publicPath ? "/" + publicPath : "/";
  if (!publicPath) return baseUrl;

  return baseUrl + "/" + publicPath;
}

function assetPrefixForOutputPath(outputPath) {
  const normalized = normalizeOutputPath(outputPath);
  const dir = path.posix.dirname(normalized || "index.html");

  if (!dir || dir === ".") return "";

  return dir
    .split("/")
    .map(function () {
      return "..";
    })
    .join("/") + "/";
}

function relativePublicHref(fromOutputPath, targetPath) {
  const rawTarget = String(targetPath || "");

  if (!rawTarget) return "#";
  if (isExternalHref(rawTarget)) return rawTarget;

  const publicTarget = logicalPageToPublicPath(rawTarget);
  const fromDir = path.posix.dirname(
    normalizeOutputPath(fromOutputPath || "index.html"),
  );
  const fromBase = fromDir === "." ? "." : fromDir;

  if (!publicTarget) {
    const hrefToRoot = path.posix.relative(fromBase, ".");

    return hrefToRoot || "./";
  }

  if (/\.html$/i.test(publicTarget)) {
    const hrefToFile = path.posix.relative(fromBase, publicTarget);

    return hrefToFile || path.posix.basename(publicTarget);
  }

  const hrefToTarget = path.posix.relative(fromBase, publicTarget || ".");

  return hrefToTarget || "./";
}

function assetHref(prefix, fileName) {
  return prefix + "assets/" + fileName;
}

function relativePageHref(fromOutputPath, targetPath) {
  const fromPath = normalizeOutputPath(fromOutputPath);
  const target = normalizeOutputPath(targetPath);
  const fromDir = path.posix.dirname(fromPath || "index.html");
  const href = path.posix.relative(fromDir, target || fromPath || "index.html");

  return href || path.posix.basename(target || fromPath || "index.html");
}

function relativeStaticHref(fromOutputPath, targetPath) {
  const rawTarget = String(targetPath || "");

  if (!rawTarget) return "";
  if (isExternalHref(rawTarget)) return rawTarget;

  return relativePageHref(fromOutputPath || "index.html", rawTarget);
}

function renderExtraHead(page, currentOutputPath) {
  const rows = [];
  const canonicalTarget = page.canonical || page.path || currentOutputPath || "";
  const canonicalHref = canonicalTarget
    ? relativePublicHref(currentOutputPath || canonicalTarget, canonicalTarget)
    : "";

  if (page.robots)
    rows.push(
      '<meta name="robots" content="' + escapeHtml(page.robots) + '" />',
    );
  if (page.keywords && page.keywords.length) {
    rows.push(
      '<meta name="keywords" content="' +
        escapeHtml(
          Array.isArray(page.keywords) ? page.keywords.join(", ") : page.keywords,
        ) +
        '" />',
    );
  }
  if (canonicalHref)
    rows.push(
      '<link rel="canonical" href="' + escapeHtml(canonicalHref) + '" />',
    );
  if (page.ogImage) {
    const ogImageHref = relativeStaticHref(currentOutputPath, page.ogImage);
    rows.push(
      '<meta property="og:image" content="' + escapeHtml(ogImageHref) + '" />',
    );
    rows.push(
      '<meta name="twitter:image" content="' +
        escapeHtml(ogImageHref) +
        '" />',
    );
  }

  return rows.join("\n  ");
}

function brandParts() {
  const brand = content.site.brand;

  return {
    brandName: brand.name,
    brandShortName: brand.shortName,
    brandSubName: brand.subName,
    brandMark: brand.mark,
    brandFirst: "Hawaii",
    brandAccent: "Military",
    brandTagline: brand.tagline,
  };
}

function renderBrandLogo(style, prefix, light) {
  const brand = content.site.brand;
  const markHtml =
    brand.useSimulatedLogo !== false
      ? renderBrandMark(style, brand)
      : '<span class="brand-image-mark"><img src="' +
        escapeHtml(prefix + "assets/" + brand.logoPath) +
        '" alt="" /></span>';

  if (style === "asset") {
    return (
      markHtml +
      '<span class="brand-text"><span class="brand-name">' +
      escapeHtml(brand.shortName) +
      '</span><span class="brand-sub">' +
      escapeHtml(brand.subName) +
      "</span></span>"
    );
  }

  return (
    markHtml +
    '<span>Hawaii <span style="color:' +
    (light ? "var(--accent)" : "var(--primary)") +
    '">Military</span><small>' +
    escapeHtml(brand.tagline) +
    "</small></span>"
  );
}

function renderBrandMark(style, brand) {
  if (style === "asset") {
    return '<span class="brand-mark">' + icon("home-mark") + "</span>";
  }

  return '<span class="logo-mark">' + escapeHtml(brand.mark) + "</span>";
}

function renderNav(style, activePath, currentOutputPath, asFooter) {
  const partial =
    style === "asset"
      ? "partials/nav-link-asset.html"
      : "partials/nav-link-root.html";

  return content.site.nav
    .map(function (item) {
      const href = relativePublicHref(currentOutputPath, item.href);
      const isActive = activePath === item.href;
      const linkHtml = renderTemplate(partial, {
        href: href,
        label: item.label,
        activeClass: isActive ? "active" : "",
        currentAttribute: isActive && !asFooter ? ' aria-current="page"' : "",
      });

      return asFooter ? "<li>" + linkHtml + "</li>" : linkHtml;
    })
    .join("");
}

function renderFooterGuides(currentOutputPath) {
  return (content.site.footer.guides || [])
    .map(function (item) {
      return (
        "<li><a href=\"" +
        escapeHtml(relativePublicHref(currentOutputPath, item.href)) +
        "\">" +
        escapeHtml(item.label) +
        "</a></li>"
      );
    })
    .join("");
}

function renderSocials() {
  return content.site.social
    .map(function (item) {
      return renderTemplate("partials/social-link.html", {
        href: item.href,
        label: item.label,
        iconHtml: icon(item.icon),
      });
    })
    .join("");
}

function chromeData(style, activePath, currentOutputPath) {
  const contact = content.site.contact;
  const footer = content.site.footer;
  const prefix = assetPrefixForOutputPath(currentOutputPath);

  return {
    ...brandParts(),
    prefix: prefix,
    homeHref: relativePublicHref(currentOutputPath, "index.html"),
    brandLogoHtml: renderBrandLogo(style, prefix, style === "asset"),
    phoneHref: contact.phoneHref,
    phoneDisplay: contact.phoneDisplay,
    email: contact.email,
    address: contact.address,
    navHtml: renderNav(style, activePath, currentOutputPath, false),
    mobileNavHtml: renderNav(style, activePath, currentOutputPath, false),
    footerNavHtml: renderNav(style, activePath, currentOutputPath, true),
    socialHtml: renderSocials(),
    footerBlurb: footer.blurb,
    navHeading: footer.navHeading,
    guidesHeading: footer.guidesHeading,
    footerGuidesHtml: renderFooterGuides(currentOutputPath),
    contactHeading: footer.contactHeading,
    contactPageHref: relativePublicHref(
      currentOutputPath,
      contact.contactPageHref || "contact.html",
    ),
    contactPageLabel: contact.contactPageLabel || "Contact Page",
    copyright: footer.copyright,
    year: new Date().getFullYear(),
    phoneIcon: icon("phone"),
    mailIcon: icon("mail"),
    mapPinIcon: icon("mapPin"),
    menuIcon: icon("menu"),
    closeIcon: icon("x"),
    homeMarkIcon: icon("home-mark"),
  };
}

function renderHeader(style, activePath, currentOutputPath) {
  return renderTemplate(
    style === "asset"
      ? "partials/header-asset.html"
      : "partials/header-root.html",
    chromeData(style, activePath, currentOutputPath),
  );
}

function renderFooter(style, activePath, currentOutputPath) {
  return renderTemplate(
    style === "asset"
      ? "partials/footer-asset.html"
      : "partials/footer-root.html",
    chromeData(style, activePath, currentOutputPath),
  );
}

function renderCta(style, cta, currentOutputPath) {
  if (!cta) return "";

  const merged = { ...content.site.cta, ...cta };
  const contact = content.site.contact;
  const prefix = assetPrefixForOutputPath(currentOutputPath);

  return renderTemplate(
    style === "asset" ? "partials/cta-asset.html" : "partials/cta-root.html",
    {
      prefix: prefix,
      eyebrow: merged.eyebrow,
      title: merged.title,
      subtitle: merged.subtitle,
      note: merged.note,
      primaryLabel: merged.primaryLabel || content.site.cta.primaryLabel,
      secondaryLabel:
        merged.secondaryLabel ||
        contact.contactPageLabel ||
        "Contact Page",
      secondaryHref: relativePublicHref(
        currentOutputPath,
        merged.secondaryHref || contact.contactPageHref || "contact.html",
      ),
      phoneHref: contact.phoneHref,
      phoneIcon: icon("phone"),
      secondaryIcon: icon(merged.secondaryIcon || "mail"),
      arrowRightIcon: icon("arrowRight"),
    },
  );
}

function renderShell(options) {
  return renderTemplate("layouts/" + options.style + ".html", {
    headHtml: options.headHtml,
    generatedComment: generatedComment,
    headerHtml: options.headerHtml,
    mainHtml: options.mainHtml,
    ctaHtml: options.ctaHtml || "",
    footerHtml: options.footerHtml,
    scriptPath: options.scriptPath,
  });
}

function renderRootPage(options) {
  const currentOutputPath =
    options.outputPath || options.path || options.page.path || "index.html";
  const prefix = assetPrefixForOutputPath(currentOutputPath);
  const pageForHead = options.page.path
    ? options.page
    : { ...options.page, path: options.path || "" };

  return renderShell({
    style: "root",
    headHtml: renderHeadRoot(
      pageForHead,
      prefix,
      renderExtraHead(pageForHead, currentOutputPath),
      currentOutputPath,
    ),
    headerHtml: renderHeader("root", options.activePath, currentOutputPath),
    mainHtml: options.mainHtml,
    ctaHtml: renderCta("root", options.cta, currentOutputPath),
    footerHtml: renderFooter("root", options.activePath, currentOutputPath),
    scriptPath: prefix + "js/site.js",
  });
}

function renderAssetPage(options) {
  const currentOutputPath =
    options.outputPath || options.path || options.page.path || "index.html";
  const prefix = assetPrefixForOutputPath(currentOutputPath);
  const pageForHead = options.page.path
    ? options.page
    : { ...options.page, path: options.path || "" };

  return renderShell({
    style: "asset",
    headHtml: renderHeadAsset(
      pageForHead,
      prefix,
      renderExtraHead(pageForHead, currentOutputPath),
      currentOutputPath,
    ),
    headerHtml: renderHeader("asset", options.activePath, currentOutputPath),
    mainHtml: options.mainHtml,
    ctaHtml: renderCta("asset", options.cta, currentOutputPath),
    footerHtml: renderFooter("asset", options.activePath, currentOutputPath),
    scriptPath: prefix + "js/site.js",
  });
}

// Presentation composites
function renderPageHero(hero, prefix) {
  return renderTemplate("pages/page-hero.html", {
    imageSrc: assetHref(prefix, hero.image),
    imageAlt: hero.imageAlt || "",
    eyebrowHtml: renderEyebrow(hero.eyebrow),
    heading: hero.heading,
    introHtml: paragraphs([hero.intro]),
  });
}

function renderHomePage(model) {
  const page = model.page;
  const prefix = assetPrefixForOutputPath(model.outputPath);
  const hero = {
    ...page.hero,
    secondaryHref: relativePublicHref(
      model.outputPath,
      page.hero.secondaryHref || "contact.html",
    ),
  };
  const heritage = {
    ...page.heritage,
    imageSrc: assetHref(prefix, page.heritage.image),
  };
  const testimonials = renderTestimonials(content.shared.testimonials, 4);

  const mainHtml = renderTemplate(model.template, {
    ...page,
    assetPrefix: prefix,
    hero: hero,
    heritage: heritage,
    phoneHref: content.site.contact.phoneHref,
    phoneIcon: icon("phone"),
    arrowRightIcon: icon("arrowRight"),
    starsHtml: starRating(5),
    shieldIcon: icon("shield"),
    heroStatsHtml: hero.imageStats.map(renderHeroStat).join(""),
    trustBarHtml: page.trustBar.map(renderHomeTrustItem).join(""),
    whyCardsHtml: page.why.cards
      .map(function (card) {
        return renderWhyCard(card, prefix);
      })
      .join("\n"),
    processStepsHtml: page.process.steps
      .map(function (step) {
        return renderTemplate("partials/process-step-number.html", step);
      })
      .join("\n"),
    testimonialsHtml: renderTestimonials(content.shared.testimonials, 4, prefix),
  });

  return renderRootPage({ ...model, mainHtml: mainHtml });
}

function renderHeroStat(item) {
  return renderTemplate("partials/hero-stat.html", item);
}

function renderHomeTrustItem(item) {
  return renderTemplate("partials/home-trust-item.html", {
    ...item,
    iconHtml: icon(item.icon),
  });
}

function renderWhyCard(card, prefix) {
  const bulletsHtml = card.bullets
    .map(function (text) {
      return renderTemplate("partials/check-list-item.html", {
        text: text,
        checkIcon: icon("check"),
      });
    })
    .join("\n");

  return renderTemplate("partials/why-card.html", {
    ...card,
    imageSrc: assetHref(prefix, card.image),
    bulletsHtml: bulletsHtml,
  });
}

function renderServiceCard(card, prefix) {
  const bulletsHtml = card.bullets
    .map(function (text) {
      return renderTemplate("partials/service-list-item.html", {
        text: text,
        checkIcon: icon("checkCircle"),
      });
    })
    .join("\n");

  return renderTemplate("partials/service-card.html", {
    ...card,
    imageSrc: assetHref(prefix, card.image),
    bulletsHtml: bulletsHtml,
  });
}

function renderServicesPage(model) {
  const page = model.page;
  const prefix = assetPrefixForOutputPath(model.outputPath);
  const mainHtml = renderTemplate(model.template, {
    ...page,
    heroHtml: renderPageHero(page.hero, prefix),
    serviceCardsHtml: page.cards
      .map(function (card) {
        return renderServiceCard(card, prefix);
      })
      .join("\n"),
    processStepsHtml: page.process.steps
      .map(function (step) {
        return renderTemplate("partials/process-step-icon.html", {
          ...step,
          iconHtml: icon(step.icon),
        });
      })
      .join("\n"),
  });

  return renderRootPage({ ...model, mainHtml: mainHtml });
}

function renderTestimonialsPage(model) {
  const page = model.page;
  const prefix = assetPrefixForOutputPath(model.outputPath);
  const mainHtml = renderTemplate(model.template, {
    ...page,
    heroHtml: renderPageHero(page.hero, prefix),
    testimonialsHtml: renderTestimonials(content.shared.testimonials, 4, prefix),
    statsHtml: page.stats
      .map(function (stat) {
        return renderTemplate("partials/stat-card.html", stat);
      })
      .join("\n"),
    longFormHtml: renderLongFormTestimonials(page.longForm.testimonials),
  });

  return renderRootPage({ ...model, mainHtml: mainHtml });
}

function renderContactPage(model) {
  const page = model.page;
  const prefix = assetPrefixForOutputPath(model.outputPath);
  const mainHtml = renderTemplate(model.template, {
    ...page,
    heroHtml: renderPageHero(page.hero, prefix),
    methodsHtml: page.methods
      .map(function (method) {
        return renderTemplate("partials/contact-method.html", {
          ...method,
          href: resolveHref(model.outputPath, method.hrefKey),
          iconHtml: icon(method.icon),
        });
      })
      .join(""),
    infoCardsHtml: page.infoCards
      .map(function (card) {
        return renderTemplate("partials/contact-info-card.html", {
          ...card,
          iconHtml: icon(card.icon),
        });
      })
      .join("\n"),
  });

  return renderRootPage({ ...model, mainHtml: mainHtml });
}

function renderTeamPage(model) {
  const page = content.team;
  const prefix = assetPrefixForOutputPath(model.outputPath);
  const sortedAgents = sortAgents(content.agents);
  const agentNames = formatList(
    sortedAgents.map(function (agent) {
      return agent.name;
    }),
  );
  const teamPage = {
    ...page,
    description:
      "Meet " +
      agentNames +
      ", real estate professionals serving clients across Oahu.",
  };
  const heroHtml = renderPageHero({
    image: "hero-bg-team.jpg",
    eyebrow: page.eyebrow,
    heading: page.heading,
    intro: agentNames + " " + page.intro[0],
  }, prefix);
  const mainHtml = renderTemplate(model.template, {
    heroHtml: heroHtml,
    teamCardsHtml: sortedAgents
      .map(function (agent) {
        return renderTeamCard(agent, model.outputPath);
      })
      .join("\n"),
  });

  return renderRootPage({ ...model, page: teamPage, mainHtml: mainHtml });
}

function renderTeamCard(agent, currentOutputPath) {
  const showContactButtons =
    content.site.settings &&
    content.site.settings.showAgentCardContactButtons === true;
  const prefix = assetPrefixForOutputPath(currentOutputPath);

  return renderTemplate("partials/team-card.html", {
    ...agent,
    prefix: prefix,
    profileHref: relativePublicHref(
      currentOutputPath,
      "agents/" + agent.slug + ".html",
    ),
    contactActionsHtml: showContactButtons
      ? renderAgentContactActions(agent, "card")
      : "",
    sortAttribute:
      typeof agent.sort === "number"
        ? ' data-sort="' + escapeHtml(agent.sort) + '"'
        : "",
  });
}

function renderAboutPage(model) {
  const page = content.about;
  const prefix = assetPrefixForOutputPath(model.outputPath);
  const featuredAgent = getFeaturedAgent();
  const featuredAbout =
    featuredAgent.featuredAbout && featuredAgent.featuredAbout.length
      ? featuredAgent.featuredAbout
      : featuredAgent.about;
  const heroHtml = renderPageHero({
    image: "hero-bg-about.jpg",
    eyebrow: page.eyebrow,
    heading: page.heading,
    intro: page.intro[0],
  }, prefix);
  const mainHtml = renderTemplate(model.template, {
    ...page,
    heroHtml: heroHtml,
    featuredAgent: featuredAgent,
    featuredAgentImageSrc: assetHref(prefix, featuredAgent.image),
    featuredAgentProfileHref: relativePublicHref(
      model.outputPath,
      "agents/" + featuredAgent.slug + ".html",
    ),
    featuredAboutHtml: paragraphs(featuredAbout),
    backgroundCardsHtml: page.cards.map(renderBackgroundCard).join("\n"),
    arrowRightIcon: icon("arrowRight"),
  });

  return renderRootPage({ ...model, page: page, mainHtml: mainHtml });
}

function renderBackgroundCard(card) {
  return renderTemplate("partials/background-card.html", {
    ...card,
    iconHtml: icon(card.icon),
  });
}

function renderAgentPage(model) {
  const agent = model.agent;
  const prefix = assetPrefixForOutputPath(model.outputPath);
  const page = {
    title: agent.title,
    description: agent.description,
    path: model.logicalPath,
  };
  const mainHtml = renderTemplate("pages/agent.html", {
    agent: agent,
    assetPrefix: prefix,
    backHref: relativePublicHref(model.outputPath, "team.html"),
    contactActionsHtml: renderAgentContactActions(agent, "hero"),
    arrowLeftIcon: icon("arrowLeft"),
    aboutHtml: paragraphs(agent.about),
    badgesHtml: agent.badges.map(renderBadge).join("\n"),
    sectionRowsHtml: renderSectionRows(agent.sections),
  });

  return renderRootPage({
    page: page,
    activePath: "team.html",
    prefix: "../",
    cta: agent.cta,
    outputPath: model.outputPath,
    mainHtml: mainHtml,
  });
}

function renderBadge(badge) {
  return renderTemplate("partials/badge-card.html", {
    ...badge,
    iconHtml: icon(badge.icon),
  });
}

function renderPills(pills) {
  if (!pills || !pills.length) return "";

  return renderTemplate("partials/pills.html", {
    itemsHtml: pills
      .map(function (pill) {
        return renderTemplate("partials/pill.html", { label: pill });
      })
      .join(""),
  });
}

function renderContentSection(section) {
  return renderTemplate("partials/content-section.html", {
    title: section.title,
    paragraphsHtml: paragraphs(section.paragraphs),
    pillsHtml: renderPills(section.pills),
  });
}

function renderSectionRows(sections) {
  const rows = [];

  for (let index = 0; index < sections.length; index += 2) {
    rows.push(
      renderTemplate("partials/section-row.html", {
        sectionsHtml: sections
          .slice(index, index + 2)
          .map(renderContentSection)
          .join("\n"),
      }),
    );
  }

  return rows.join("\n\n");
}

function renderTestimonials(items, repetitions, prefix) {
  const cardsHtml = items
    .map(function (testimonial) {
      return renderTemplate("partials/testimonial-card.html", {
        ...testimonial,
        imageSrc: assetHref(prefix || "", testimonial.image),
        starsHtml: starRating(5),
        quoteIcon: icon("quote"),
      });
    })
    .join("\n");

  return repeatHtml(cardsHtml, repetitions || 1);
}

function excerpt(value, length) {
  if (value.length <= length) return value;

  return (
    value
      .slice(0, length)
      .trim()
      .replace(/[,.!?;:]+$/, "") + "…"
  );
}

function renderLongFormTestimonials(items) {
  return (items || [])
    .map(function (testimonial) {
      return renderTemplate("partials/long-testimonial-card.html", {
        author: testimonial.author,
        excerpt: excerpt(testimonial.body, 220),
        summaryLabel: "Read full testimonial",
        quoteIcon: icon("quote"),
        bodyHtml: paragraphs([testimonial.body]),
      });
    })
    .join("\n");
}

function renderFeaturedListingPage(model) {
  const page = model.page;
  const prefix = assetPrefixForOutputPath(model.outputPath);
  const mainHtml = renderTemplate(model.template, {
    ...page,
    heroImageSrc: assetHref(prefix, page.hero.image),
    homeIcon: icon("home"),
    mapPinIcon: icon("mapPin"),
    specsHtml: page.specs
      .map(function (spec) {
        return renderTemplate("partials/listing-spec.html", {
          ...spec,
          iconHtml: icon(spec.icon),
        });
      })
      .join("\n"),
    overviewHtml: paragraphs(page.overview.paragraphs),
    highlightsHtml: page.highlights
      .map(function (text) {
        return renderTemplate("partials/listing-highlight.html", {
          text: text,
          iconHtml: icon("checkCircleOpen"),
        });
      })
      .join("\n"),
    detailsHtml: page.details
      .map(function (detail) {
        return renderTemplate("partials/listing-detail.html", detail);
      })
      .join("\n"),
    tourOptionsHtml: page.tour.options
      .map(function (option, index) {
        return renderTemplate("partials/listing-tour-option.html", {
          ...option,
          href: resolveHref(model.outputPath, option.hrefKey),
          variantClass: index === 0 ? "" : "glass",
          iconHtml: icon(option.icon),
        });
      })
      .join("\n"),
  });

  return renderAssetPage({ ...model, mainHtml: mainHtml });
}

function renderContentFaq(item) {
  return renderTemplate("partials/content-faq-card.html", {
    question: item.question,
    answerHtml: paragraphs([item.answer]),
  });
}

function renderContentRelatedLink(item, currentOutputPath) {
  return renderTemplate("partials/content-related-link.html", {
    href: relativePublicHref(currentOutputPath, item.path || item.href || ""),
    eyebrow: item.eyebrow || "Related Resource",
    label: item.label,
    description: item.description,
  });
}

function renderContentPage(model) {
  const page = model.page;
  const prefix = assetPrefixForOutputPath(model.outputPath);
  const mainHtml = renderTemplate(model.template, {
    heroHtml: renderPageHero(page.hero, prefix),
    introEyebrow: page.introEyebrow,
    introHeading: page.introHeading,
    introLead: page.introLead,
    introHtml: paragraphs(page.intro),
    sidebarEyebrow: page.sidebar.eyebrow,
    sidebarHeading: page.sidebar.heading,
    sidebarHtml: paragraphs(page.sidebar.paragraphs),
    pillsHtml: renderPills(page.sidebar.pills),
    sectionRowsHtml: renderSectionRows(page.sections),
    relatedEyebrow: "Related Resources",
    relatedHeading: "Keep exploring the topic",
    relatedIntro:
      "Use these supporting pages to keep the search path connected and to move from research into a clearer next step.",
    relatedLinksHtml: (page.relatedLinks || [])
      .map(function (item) {
        return renderContentRelatedLink(item, model.outputPath);
      })
      .join("\n"),
    faqEyebrow: page.faq.eyebrow,
    faqHeading: page.faq.heading,
    faqIntro: page.faq.intro,
    faqHtml: (page.faq.items || []).map(renderContentFaq).join("\n"),
  });

  return renderRootPage({ ...model, mainHtml: mainHtml });
}

function renderNotFoundPage(model) {
  const page = model.page;
  const mainHtml = renderTemplate(model.template, {
    ...page,
    homeHref: relativePublicHref(model.outputPath, "index.html"),
  });

  return renderRootPage({ ...model, page: page, mainHtml: mainHtml });
}

// Infrastructure
function writeFile(relativePath, html) {
  const target = path.join(buildDir, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html.trimEnd() + "\n", "utf8");
}

function shouldCopySourceFile(relativePath) {
  const normalized = relativePath.replace(/\\/g, "/");

  if (normalized === "content.js" || normalized === "content-seo.js")
    return false;
  if (normalized === "README.md") return false;
  if (normalized.startsWith("templates/")) return false;
  if (/\.html$/i.test(normalized)) return false;
  if (/^agents\/.*\.html$/i.test(normalized)) return false;

  return true;
}

function shouldCopySourceDirectory(relativePath) {
  const normalized = relativePath.replace(/\\/g, "/");

  if (normalized === "templates" || normalized.startsWith("templates/"))
    return false;

  return true;
}

function copyDirectory(sourceDir, targetDir, relativeBase) {
  fs.mkdirSync(targetDir, { recursive: true });

  fs.readdirSync(sourceDir).forEach(function (name) {
    const source = path.join(sourceDir, name);
    const target = path.join(targetDir, name);
    const relativePath = path.join(relativeBase || "", name);
    const stat = fs.statSync(source);

    if (stat.isDirectory()) {
      if (!shouldCopySourceDirectory(relativePath)) return;
      copyDirectory(source, target, relativePath);
      return;
    }

    if (!shouldCopySourceFile(relativePath)) return;

    fs.copyFileSync(source, target);
  });
}

function removeDirectory(targetDir) {
  if (!fs.existsSync(targetDir)) return;

  fs.readdirSync(targetDir).forEach(function (name) {
    const current = path.join(targetDir, name);
    const stat = fs.statSync(current);

    if (stat.isDirectory()) {
      removeDirectory(current);
      return;
    }

    fs.unlinkSync(current);
  });

  fs.rmdirSync(targetDir);
}

function prepareBuildDirectory() {
  removeDirectory(buildDir);
  fs.mkdirSync(buildDir, { recursive: true });
  copyDirectory(srcDir, buildDir, "");
}

function getLogicalPagePath(model) {
  return model.path || model.page.path;
}

function writePageModel(model, renderFn, seenOutputPaths) {
  const logicalPath = getLogicalPagePath(model);
  const outputPath = logicalPageToOutputPath(logicalPath);
  const existingLogicalPath = seenOutputPaths
    ? seenOutputPaths.get(outputPath)
    : null;

  if (existingLogicalPath) {
    throw new Error(
      'Duplicate output path "' +
        outputPath +
        '" generated for "' +
        logicalPath +
        '" and "' +
        existingLogicalPath +
        '".',
    );
  }

  if (seenOutputPaths) {
    seenOutputPaths.set(outputPath, logicalPath);
  }

  const rendered = renderFn({ ...model, logicalPath: logicalPath, outputPath: outputPath });

  writeFile(outputPath, rendered);
}

function renderRootModel(model) {
  if (model.template === "pages/home.html") return renderHomePage(model);
  if (model.template === "pages/services.html")
    return renderServicesPage(model);
  if (model.template === "pages/testimonials.html")
    return renderTestimonialsPage(model);
  if (model.template === "pages/contact.html") return renderContactPage(model);
  if (model.template === "pages/team.html") return renderTeamPage(model);
  if (model.template === "pages/about.html") return renderAboutPage(model);
  if (model.template === "pages/content-page.html")
    return renderContentPage(model);
  if (model.template === "pages/404.html") return renderNotFoundPage(model);

  throw new Error("No renderer registered for " + model.template);
}

function main() {
  prepareBuildDirectory();

  const rootModels = getRootPageModels();
  const contentPageModels = getContentPageModels();
  const agentModels = getAgentPageModels();
  const seenOutputPaths = new Map();

  rootModels.forEach(function (model) {
    writePageModel(model, renderRootModel, seenOutputPaths);
  });

  const listingModel = getFeaturedListingModel();
  writePageModel(
    listingModel,
    renderFeaturedListingPage,
    seenOutputPaths,
  );

  contentPageModels.forEach(function (model) {
    writePageModel(model, renderRootModel, seenOutputPaths);
  });

  agentModels.forEach(function (model) {
    writePageModel(
      {
        ...model,
        path: path.posix.join("agents", model.agent.slug + ".html"),
      },
      renderAgentPage,
      seenOutputPaths,
    );
  });

  console.log(
    "Rendered " +
      (rootModels.length + 1 + contentPageModels.length) +
      " root/listing/content pages and " +
      agentModels.length +
      " agent profile pages into build/.",
  );
}

main();
