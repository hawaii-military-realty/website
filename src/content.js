const CONTENT = {
  site: {
    brand: {
      name: "Hawaii Military Realty",
      shortName: "Hawaii Military",
      subName: "Realty",
      mark: "HMR",
      tagline: "Native Hawaiian & Veteran Owned/Managed",
      useSimulatedLogo: false,
      logoPath: "logo.jpg",
    },
    contact: {
      phoneDisplay: "(808) 218-9338",
      phoneHref: "tel:8082189338",
      smsHref: "sms:8082189338",
      email: "",
      contactPageHref: "contact.html",
      contactPageLabel: "Contact Page",
      address: "91-1282 Kaiokia St, Ewa Beach, HI 96706",
    },
    settings: {
      showAgentCardContactButtons: false,
    },
    nav: [
      {
        href: "index.html",
        label: "Home",
      },
      {
        href: "about.html",
        label: "About",
      },
      {
        href: "services.html",
        label: "Services",
      },
      {
        href: "team.html",
        label: "Team",
      },
      {
        href: "testimonials.html",
        label: "Testimonials",
      },
      {
        href: "contact.html",
        label: "Contact",
      },
    ],
    social: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/david-kucic-7948236/",
        icon: "linkedin",
      },
      // {
      //   label: "Facebook",
      //   href: "https://www.facebook.com/HawaiiMilitaryRealty/",
      //   icon: "facebook",
      // },
    ],
    footer: {
      blurb:
        "Native Hawaiian owned, veteran owned and managed real estate guidance for Oahu buyers, sellers, renters, property owners, military families, and service-minded clients.",
      navHeading: "Navigate",
      guidesHeading: "Popular Guides",
      guides: [
        {
          href: "category/va-loan-information.html",
          label: "VA Loan Information",
        },
        {
          href: "buyers/mortgage-calculator.html",
          label: "Mortgage Calculator",
        },
        {
          href: "category/ewa-beach-real-estate.html",
          label: "Ewa Beach Real Estate",
        },
        {
          href: "military-real-estate-hawaii/hawaii-bases-and-barracks.html",
          label: "Bases and Barracks",
        },
      ],
      contactHeading: "Get in Touch",
      copyright:
        "Hawaii Military Realty | Veteran-Owned. All Rights Reserved.",
    },
    cta: {
      eyebrow: "Mission-Ready Guidance",
      title: "Get a Clear Plan for Your Oahu Move",
      subtitle:
        "PCS orders, VA-financed purchases, remote showings, renters, property management, and sale timelines handled with direct veteran-first communication.",
      note: "Clear answers within 2 hours during business hours.",
      primaryLabel: "Call (808) 218-9338",
      secondaryLabel: "Visit Contact Page",
      secondaryHref: "contact.html",
    },
  },
  shared: {
    testimonials: [
      {
        name: "Brigadier General Frank and Beverly Tate",
        role: "Client Testimonial",
        quote:
          "David Kucic is an exceptional realtor that displays the integrity and values of our Military Family.",
        image: "client-1.jpg",
      },
      {
        name: "CSM Toese and Retta Tia",
        role: "Client Testimonial",
        quote:
          "David’s professionalism, his wisdom, knowledge, dedication, experience and willingness to go above and beyond for our family was absolutely amazing!",
        image: "client-2.jpg",
      },
      {
        name: "LTC Russ Meyer",
        role: "Client Testimonial",
        quote:
          "He was knowledgeable about the area, understood the dynamics of the market, and “got us” as a military family.",
        image: "client-3.jpg",
      },
      {
        name: "Mr and Mrs Rich and Sue Fabrizius",
        role: "Client Testimonial",
        quote:
          "David helped us get our dream home in Hawaii. We cannot say enough good about David’s professionalism.",
        image: "client-4.jpg",
      },
      {
        name: "CPT Justin and Sydney Tonelli",
        role: "Client Testimonial",
        quote:
          "David’s 1SG experience is obvious as his communication was never delayed and always detailed.",
        image: "client-5.jpg",
      },
      {
        name: "Captain Todd and Ophelia Isreal",
        role: "Client Testimonial",
        quote:
          "But David and Tonya were very patient with us and, because of their knowledge of the different neighborhoods, they were able to help us locate just the right home.",
        image: "client-6.jpg",
      },
    ],
  },
  pages: {
    home: {
      path: "index.html",
      title: "Hawaii Real Estate and Military Homes by David Kucic",
      description:
        "Native Hawaiian veteran owned and managed Oahu real estate guidance for active duty, veterans, reservists, government civilians, government contractors, and service-minded clients.",
      hero: {
        eyebrow: "Native Hawaiian & Veteran Owned/Managed",
        title: "Hawaii's #1 Military",
        titleAccent: "Real Estate Specialists Since 2011.",
        lead: "A retired First Sergeant's approach to Oahu real estate: direct guidance, disciplined execution, and clear answers for active duty, veterans, reservists, government civilians, government contractors, military families, and anyone seeking excellent service, communication, and honesty.",
        primaryLabel: "Call (808) 218-9338",
        secondaryLabel: "Review Services",
        secondaryHref: "services.html",
        avatarCount: "+500",
        rating: "4.9",
        ratingLabel: "500+ Oahu Clients Served",
        image: "hero-military-family.jpg",
        imageAlt: "Military family receiving Hawaii real estate guidance during a PCS move",
        imageStats: [
          {
            value: "22",
            label: "Years Army",
          },
          {
            value: "500+",
            label: "Families Served",
          },
          {
            value: "20+",
            label: "Years Oahu",
          },
        ],
        badgeTitle: "Oahu Specialists",
        badgeSubtitle: "Since 2011",
      },
      trustBar: [
        {
          icon: "shield",
          value: "1SG",
          label: "Army Leadership",
        },
        {
          icon: "award",
          value: "4x",
          label: "Aloha Aina Award",
        },
        {
          icon: "users",
          value: "500+",
          label: "Oahu Clients Served",
        },
        {
          icon: "home",
          value: "VA",
          label: "Process Guidance",
        },
      ],
      heritage: {
        eyebrow: "Local matters",
        heading: "Oahu Area Intel",
        text: "Diamond Head, West Oahu, Ewa Beach, Kapolei, Joint Base Pearl Harbor-Hickam, Schofield Barracks, Wheeler Army Airfield, MCBH, Camp Smith, Fort Shafter, Tripler, Barbers Point Coast Guard Station, Kunia Tunnel, NCTAMS, and every commute in between. We help clients understand Oahu before they commit to a home.",
        image: "diamond-head-neighborhood.jpg",
        imageAlt: "Diamond Head above an Oahu neighborhood at golden hour",
      },
      why: {
        eyebrow: "Why Oahu Clients Call Us",
        heading: "Command-Level Clarity for Hawaii Real Estate",
        intro:
          "The process is direct, responsive, and built for the realities of PCS timelines, VA-financed purchases, renters, property management, and Oahu market pressure.",
        cards: [
          {
            image: "hero-military-family.jpg",
            tag: "Base Intel",
            title: "Local guidance for Oahu's military communities",
            text: "Joint Base Pearl Harbor-Hickam, Schofield Barracks, Wheeler Army Airfield, MCBH, Camp Smith, Fort Shafter, Tripler, Barbers Point Coast Guard Station, Kunia Tunnel, NCTAMS, Ewa Beach, Kapolei, and the surrounding neighborhoods. We explain commute, BAH, schools, and tradeoffs plainly.",
            bullets: [
              "School district insights",
              "Commute and BAH guidance",
              "West Oahu market context",
            ],
          },
          {
            image: "hero-pcs-planning.jpg",
            tag: "PCS Ready",
            title: "Buy, sell, rent, or manage from anywhere",
            text: "Video walkthroughs, remote paperwork, clear timelines, and practical decisions for clients moving on orders, changing duty stations, or preparing an Oahu property.",
            bullets: [
              "Live video walkthroughs",
              "Remote digital closings",
              "PCS timeline planning",
            ],
          },
          {
            image: "service-property-management.jpg",
            tag: "VA Process",
            title: "Understand the VA process before you write",
            text: "We understand the VA-financed purchase process, explain the real estate side clearly, and coordinate with a trusted VA Loan Officer when financing guidance is needed.",
            bullets: [
              "Trusted VA Loan Officer coordination",
              "VA appraisal and timeline awareness",
              "Offer strategy for VA-financed buyers",
            ],
          },
        ],
      },
      process: {
        eyebrow: "The Mission Plan",
        heading: "Three direct steps from research to a workable plan",
        steps: [
          {
            number: "01",
            title: "Brief",
            text: "Share orders, timeline, BAH, family needs, rental needs, and risk tolerance. We give you the straight Oahu market picture.",
          },
          {
            number: "02",
            title: "Execute",
            text: "We run showings, video tours, listing strategy, negotiations, inspections, and coordinate with VA Loan Officers to meet your timeline.",
          },
          {
            number: "03",
            title: "Secure",
            text: "Remote or in person, we keep escrow, documents, keys, tenants, or sale proceeds moving without guesswork.",
          },
        ],
      },
      testimonials: {
        eyebrow: "After-Action Reports",
        heading: "Trusted by Oahu military families and service-minded clients",
      },
    },
    services: {
      path: "services.html",
      title: "Oahu Real Estate Services | Hawaii Military Realty",
      description:
        "Buying, selling, renting, PCS relocation, property management, and VA process coordination for Oahu clients.",
      hero: {
        image: "hero-pcs-planning.jpg",
        eyebrow: "Mission Services",
        heading: "Buy, sell, rent, relocate, and manage Oahu property with veteran-first guidance",
        intro:
          "Clear strategy for active duty, veterans, reservists, government civilians, government contractors, renters, property owners, and clients who value excellent service, communication, and honesty.",
      },
      cards: [
        {
          image: "hero-military-family.jpg",
          tag: "Buy",
          title: "Buying with VA Process Confidence",
          bullets: [
            "Base-aware neighborhood guidance and live video walkthroughs",
            "VA process guidance and coordination with trusted VA Loan Officers",
            "PCS timeline coordination aligned with your orders",
            "Offer strategy, negotiation, and closing support",
          ],
        },
        {
          image: "cta-veteran-service.jpg",
          tag: "Sell",
          title: "Selling on a Military Timeline",
          bullets: [
            "Military-focused marketing for incoming PCS families",
            "Professional indoor photography",
            "Professional outdoor photography",
            "Aerial/drone photography",
            "Outreach to military relocation and housing offices",
            "Remote closing support if you have already left island",
          ],
        },
        {
          image: "service-property-management.jpg",
          tag: "Manage",
          title: "Property Management After PCS",
          bullets: [
            "Tenant placement and screening highly qualified renters",
            "Maintenance coordination while you are off island",
            "Lease management and on-time rent collection",
            "Owner communication built for deployment and PCS distance",
          ],
        },
      ],
      process: {
        eyebrow: "Operational Process",
        heading: "Three clear steps with no guesswork",
        steps: [
          {
            icon: "msg",
            title: "1. Brief",
            text: "We confirm orders, goals, timeline, and financial position.",
          },
          {
            icon: "hand",
            title: "2. Execute",
            text: "We build the plan around your mission, then keep showings, offers, inspections, tenants, and documents on track.",
          },
          {
            icon: "key",
            title: "3. Secure",
            text: "We guide escrow, keys, property handoff, or management setup.",
          },
        ],
      },
      cta: {
        title: "Ready for a Straight Assessment?",
        subtitle:
          "Call us to review orders, timing, rental needs, VA process questions, and your Oahu real estate options.",
        note: "Direct advice. No pressure. No sales theater.",
      },
    },
    testimonials: {
      path: "testimonials.html",
      title: "Client Testimonials – Military Families | Hawaii Real Estate",
      description:
        "Real reviews from military families who bought or sold Hawaii homes with us.",
      hero: {
        image: "cta-veteran-service.jpg",
        eyebrow: "After-Action Reports",
        heading: "Real results from military families",
        intro:
          "Client feedback from service members, veterans, retirees, and families who trusted Hawaii Military Realty through major moves.",
      },
      stats: [
        {
          value: "20+",
          label: "Years of Experience",
        },
        {
          value: "500+",
          label: "Families Helped",
        },
        {
          value: "4.9★",
          label: "Average Rating",
        },
        {
          value: "100%",
          label: "Military Focused",
        },
      ],
      cta: {
        title: "Ready for Veteran-First Guidance?",
        subtitle: "Let's review your mission, timeline, and next move.",
        note: "Call (808) 218-9338 today.",
      },
      longForm: {
        eyebrow: "Detailed Reports",
        heading: "Detailed client experiences",
        intro:
          "Read full stories from military families, buyers, sellers, and property owners who trusted Hawaii Military Realty through major real estate decisions.",
        testimonials: [
          {
            author: "Brigadier General Frank and Beverly Tate",
            body: "David Kucic is an exceptional realtor that displays the integrity and values of our Military Family. David went above and beyond the call of duty during the processes of house-hunting, working with mortgage companies, and getting us through the closing with the title company. Whenever we had any questions, about anything, David quickly found the answers for us. He made sure that we were fully aware of everything going on in all of the processes involved. His realtor wife, Tonya, also helped us out a few times in addition to his excellent service. Together, they really make a great team. Not only have they become our favorite realtors, they have also become our friends. We recommend them highly to anyone seeking realtor services because of their thorough knowledge of the real estate business, exceptional work ethic, and wonderful dispositions – they were a pleasure to work with!!",
          },
          {
            author: "CSM Toese and Retta Tia",
            body: "THIS REVIEW IS WAY OVER DUE! You military? Need a realtor….look no further, call David Kucic of Hawaii Military Realty! I cannot speak highly enough of David Kucic and Hawaii Military Realty. Being in the military, it was good to know that David was no stranger to the military. Arriving in Hawaii back in 2010 on military orders, my family was beyond blessed in purchasing our beautiful home through David. We were not first-time homebuyers, so we knew the type of agent we wanted. We met with several realtors, but knew instantly the David Kucic was the realtor for us. David’s professionalism, his wisdom, knowledge, dedication, experience and willingness to go above and beyond for our family was absolutely amazing! His values are evident. He is a person of integrity, honesty and loyalty. David Kucic is the real deal! So much so, that when I received orders to leave Hawaii, we knew to call David. By now, David was not only our agent who sold us our home back in 2010…he was family. We knew David would take care of us. And David did not disappoint us. Prior to leaving the island, he walked us through what needed to be done to sell and the expectations. Long story short, without a hitch, we had more offers than we knew what to do with, and the house sold/closed in 45 days. It felt great to received our double-portion blessing!! GOD IS GOOD! Thank you! Thank you! Thank you, David Kucic and Hawaii Military Realty!! We pray God bless you, your family and your business 100-fold in return for all you have done for our family.",
          },
          {
            author: "LTC Russ Meyer",
            body: "My wife and I met David through another friend who knew him. As soon as we began discussing what it would take to sell our home, we knew David was the guy to help us. He was knowledgeable about the area, understood the dynamics of the market, and “got us” as a military family. He helped figure out how our home should be presented, and we had two offers in nine days after our home went on sale. David helped us navigate the intricate world of home sales and stayed with us throughout the process, patiently answering every question we put to him. Even more than recommending him to the public, I would recommend him to a friend or family member. Absolutely top notch.",
          },
          {
            author: "Mr and Mrs Rich and Sue Fabrizius",
            body: "My husband and I were renting a house when we first moved to Hawaii. My husband decided we should look around for something to purchase even though we were in a lease. So we started looking. We met David Kucic at an open house. We immediately liked David because he is so personable. But even better, he was totally knowledgeable and was able to make suggestion about getting released from our lease. Bottom line….David helped us get our dream home in Hawaii. We cannot say enough good about David’s professionalism. He made this the easiest purchase we have ever made. I strongly recommend Hawaii Military Realty.",
          },
          {
            author: "Mr and Mrs John and Megan Freeman",
            body: "My family and I recently relocated from Hawaii to the mainland, and David Kucic not only sold our home in less than 2 weeks, but he found us a beautiful pet-friendly month-to-month rental for us to stay in for 6 weeks after our previous house closed before we flew off island. I can’t fully express how grateful I am to have been recommended David as a realtor. I would recommend Hawaii Military Realty to anyone I know.",
          },
          {
            author: "Mr. and Mrs. Mitch and Jac Tomei",
            body: "David was the best part of our home buying process. He was very responsive and took great interest into what we were looking for and could afford. There were regular emails and calls from David letting us know what was on the market that fit our family’s needs. As first time home buyers we had many questions and no idea what we were getting into. David was able to address and explain everything we did not understand. This put us at ease and gave us the confidence needed to take this big step. In a matter of a couple weeks, David was able to get us ready to purchase our first (and brand new) home. David stuck with us through the start of buying, all the way to title, and even after we moved in. We cannot thank David and Hawaii Military Realty enough for their professionalism and attention to our concerns. I cannot recommend a better person or company to use when you are ready to purchase a home.",
          },
          {
            author: "Mr Rick Fall",
            body: "David Kucic was a tremendous help. He knew the market well, priced it right and helped me get my asking price. He anticipated things before they happened, did more than he had to, answered all my questions. David has a great attitude and instills confidence that he can get the job done. I would recommend him to anyone looking for a realtor on the Leeward side. You can go wrong with him!!!!",
          },
          {
            author: "CPT Justin and Sydney Tonelli",
            body: "We bought our first home through Hawaii Military Realty this past March. David made the home buying process very easy. He walked us through all the paperwork and made us feel at ease through the closing process. David’s 1SG experience is obvious as his communication was never delayed and always detailed. I don’t think I ever went more than a few hours or usually a few minutes without a response to my emails. I plan on selling or renting my home through Hawaii Military Realty when I move.",
          },
          {
            author: "MAJ Matt Masuyama",
            body: "David is the MAN! A man with integrity, an incredible passion and work ethic. He’s on the ball with everything. He really made selling our home stress free. Even helped us get MORE than we’d hoped for. Mahalo David for not only helping me sell my home but also my brother’s home as well! YOU ROCK! If you want someone you can TRUST to get you the best service and price for your home, give David a call today! Certainly the BEST IN THE BUSINESS!",
          },
          {
            author: "CDR Jim and Monika Scola",
            body: "When it was time to sell our our Cyprus Point home in Ewa Beach, we placed the call to David Kucic and his Hawaii Military Realty team. Our choice was simple. Every morning as she walked the dogs, my wife would see FOR SALE signs throughout the neighborhood. The houses with UNDER CONTRACT or SOLD on the signs all seemed to belong to Hawaii Military Realty. David did not disappoint us in our decision, smoothly guiding us to a sale which met all our needs. David was personally very pleasant to work with, quick to share all information concerning the market and potential buyers, and was thoroughly prepared in all aspects of the sale. We highly recommend his services.",
          },
          {
            author: "Mr and Mrs JR and Dawn Balmilero",
            body: "I have known David & Tonya for a few years now. When I needed a Realtor, I called upon David Kucic to help me and my family. Selling a home and relocating can be very stressful and uncertain. David & Tonya put us at ease and stood by us every step of the way. David gave us all the information that we needed to make confident decisions during the sale of our home. He also helped us find a pet-friendly rental (not an easy task) and helped us find our new home. We are so very grateful for David & Tonya! They are both truly great people who love what they do, love helping people and are such a joy to work with. I would highly recommend David – if you need a Realtor, give him a call! Thanks David & Tonya from the bottom of our heart!",
          },
          {
            author: "Mr and Mrs Bob and Carmie Luke",
            body: "When we decided to sell our home we wanted a Realty Company that we could trust, who would work with us, and who knew the quality and pricing of the homes in Ewa Beach. We met David and knew he was our guy. Besides the immense knowledge he and Tonya have, they are professional, detail orientated, have strong ethics, and were there every step of the way during the process. When we had questions or concerns they answered and resolved them making the sale of our home as stress free as possible for us. There aren’t enough adjectives to describe our experience with Hawaii Military Realty. Our home sold one day after it was on the market. Hawaii Military Realty is awesome. We highly recommend them and would use them again if the opportunity presented itself.",
          },
          {
            author: "Kyle Gearen",
            body: "David was my agent during the purchase of my first home where I bought a short-sale townhouse in Ewa Beach. I found David through an online forum and he came highly recommended. After meeting with David and explaining what I wanted, he drove me around and showed dozens of homes (on several different occasions). When I finally found several homes I really liked he helped me navigate through the short-sale process every step of the way. David prepared very aggressive offers for each property and I ended up getting the one I really wanted – at my initial offer. I have since moved from the island and David is now my property manager. From purchase to rental, David has offered advice, recommendations, and prompt monthly payments from my new tenant. David is high-energy, professional, prompt, and most importantly sincere about his line of work. Although he would be a great agent for anyone in the market, he is especially sensitive to military, being a military veteran himself. I feel secure knowing my biggest investment is being managed by David. Lastly, David will tell you to search carefully when shopping for a mortgage broker, but he recommended Jay Oku. They have been working together for some time, and David certainly didn’t steer me wrong. Jay made the whole purchase process easy and secured the lowest interest rate available at the time. When the seller’s agent postponed closing due to a severe oversight on their part, Jay not only kept the deal together, he even saved me several thousand dollars on my lock-extension. These guys make a great team and I am happy I found them. Happy hunting!",
          },
          {
            author: "Sergeant Major (Retired) Eric Johnson",
            body: "I U.S. Army SGM (R) Eric O. Johnson wanted to take this opportunity to thank you for your assistance with my recent property purchase. Your support in finding my home made the difference! You were referred to me by good friends who were extremely pleased and grateful for your help when they purchased their new home. They were impressed by your attention to details that they might not have considered, to both protect their interest and to save money. I wholeheartedly agree with their opinions! I was returning from my deployment to Afghanistan. And, I really appreciate how much time, effort and importance you placed on my real estate search. Not being familiar with the area and living out of town, I was fortunate to rely on your guidance and expertise with a sense of trust that my requirements and interests were your highest priority in finding that perfect property. In addition, your strong and positive network with related professionals and business streamlined the process. You should know that you are held in high esteem by your peers, as I discovered during our association. 1SG (R) David Kucic, you exceeded my expectations, and I hope to work with you again.",
          },
          {
            author: "Major Boyce and Brandie Buckner",
            body: "In January 2012 I received notification of my new assignment to Schofield Barracks, Hawaii. Initially, my wife and I were thrilled, especially since we planned on buying our first home together. Unfortunately, that wave of excitement turned quickly to despair as I was later notified that I would be deploying to Afghanistan shortly after our arrival. This predicament left me with approximately six months to complete my current assignment at the Command and General Staff College in Fort Leavenworth, Kansas, finish my graduate school, move myself and my wife from two different locations, purchase a home and get my family established there prior to my departure. I was overwhelmed, and asked myself how was I going to do all of this? While I did not have a plan, God did and introduced David Kucic into our lives in February 2012. After our first conversation, I knew that this was the man who was going to put all of our worries at ease and find our future home. With minimal guidance, David sought out to find the perfect home for my family and I, which he found in less than 30 days. While this may not sound like a huge feat to some, I offer those who think so to first consider that the majority of our coordination occurred over email and phone calls with the Pacific Ocean and five time zones serving as two of the many obstacles interdicting my need to find and close on a home in an expeditious manner. Despite our many roadblocks, David was tenacious in his search, working around the clock until he completed his mission. His process was precise and methodical, and included the introduction and provision of all recorded data on the property. If we expressed interest, he then visited the home personally, in order to assess the property, the neighborhood and surrounding area as well as provide other services my wife and I would have never thought to ask. Of note, each of these assessments not only came with a wealth of valuable information and perspective, but also included a multitude of digital photographs and video tours, which enabled my wife and I to create our top 10 list of homes to visit. In March of 2012, my wife and I visited the island, where David was first to greet us, provided personal transportation and coordinated a successful visit of each of our properties of interest in less than 48 hours (including last minute follow-up showings of three properties). Upon completion of our visit, my wife and I selected three properties for bidding and as soon as we came under contract, David truly began to shine. To start, he directly contributed to the successful negotiation of our agreed purchase price, which was less than $125K of the sellers’ original asking price. In addition to his skillful negotiation and handling of all paperwork, which again was all completed via phone and email, David also ensured we met all time benchmarks to meet our contractual obligations and closing dates, which I am happy to report that we met every single hard time. With every requirement, David always had a way or recommendation for us such as whom to hire for pest inspections or his top preferences for home inspectors. And somehow, amidst this whirlwind of activity, he still had the presence of mind to remind us of other additional and more personal requirements such as setting up utilities (which he provided all contacts for) and even helping us locate companies to aid in our desired renovations. David also served as our protector, ensuring that the sellers, despite their attempts, did not escape their responsibilities to us, to include one case in particular where he denied their request for a waiver from their responsibility of a potential change in our HOA dues. He also, on his own accord, investigated into the HOA dues change in hopes of officially documenting such changes prior to our closing, preventing my wife and I from gaining any financial liability to cover the difference in cost. David served as our liaison between our various loan and mortgage representatives to ensure they were also staying with our timeline and that all parties were on the same page with respect to the closure of our new home. Lastly, David served as our caretaker, conducting a final walk-through of our home prior to closing, signing for our keys, fobs and garage remotes since we were still not on island yet and even taking time out of his own schedule grant access to our home improvement contractors so they could finish our renovations prior to our arrival to Oahu. In short, to say that David provided exceptional service to my family and I through his experience, knowledge, integrity, objectivity and negotiation skills would truly be an understatement. In a word, David was a Godsend, whose phenomenal service, dedication and attributes translated into the successful closing of our home. It is because of the single-handed efforts of this fine individual that I was able to conduct one of the most complex moves of my Army career without issue, move my family into our new home and deploy to combat, knowing that my family is safe and settled. David granted me piece of mind, protection, mentorship and friendship, which I will always treasure and consider myself blessed to have had him as my Realtor. 1SG(R) Kucic has my respect, admiration and endorsement so much that I refer anyone I meet searching for a new home in Hawaii to him, so that they may share the same fortune and phenomenal service that I once experienced. It would be my absolute honor to work with him and his family again if the opportunity presented itself. I thank you for your time and wish all of you the very best from across the globe in Kandahar, Afghanistan…mahalo and aloha!",
          },
          {
            author: "Timothy L. & Donna R. Alger",
            body: "Mr. Kucic represented my wife Donna and me on a short sale in Hawaii at 91-1010 Kalehuna St, Kapolei, HI 96707. We had been trying to re-modify and requested for a Home Affordable Foreclosure Alternative (HAFA) on our home for at least a year and a half with Bank of America but had not been successful due to for unseen reasons. After my return from deployment and a few deaths in our family, we were at a point where we had exhausted all of our income and resources, so we turned to Mr. Kucic for help on 24 May 2011. We wanted him to know it was our full intention to pay what we owed, but at the time, it was not possible to do so. We asked Mr. Kucic for the help and assistance and stated we would appreciate if you could work with us to short sale our home so we could avoid a default and make amends with our Bank. Mr. Kucic did not hesitate; he went to work as quickly and professionally as one could be asked to do so. On 24 May 2011 we requested assistance from Mr. Kucic. On 9 July 2011 Mr. Kucic contacted us with a full price offer on the short sale of our home. On 23 September 2011 our short sale was complete, we were extremely relieved. Donna and I could not have asked a better real-estate agent to represent us and be as personal, kind and understanding. We will always keep Mr. Kucic in our hearts, minds and prayers . Mr. Kucic is definitely a True Professional look what he did for us in less than 120 days. Mr. Kucic, Thanks for all you do,",
          },
          {
            author: "Mr. Jaime Benavente",
            body: "When buying our house we had a specific workable but difficult budget. After verbally settling on our first available choice, David noticed that my fiance was not particularly happy with the home. He took it upon himself and continued to look at available property listings in the area. After just a couple days of an extensive search, David was able to locate a home meeting all the criteria we discussed at a price lower than budget. The property was owned by a military member who was scheduled for a deployment overseas. At first the military member was wanting to rent the property, then later decided to sell after some discussions with his spouse. Upon this notification, David explained my situation and the seller was very quick to accept my first offer. In this particular sell, the seller was upside down on his loan, even with this David was able to tactfully negotiate a deal to where the seller would use the a USACE Housing Assistance Program (HAP) which was designed to help military service members in this type of situation. David’s negotiation skills with the HAP office, seller, and I were extensive due to federal budgeting constraints. However, David’s consistent follow up actions and in-depth knowledge of the system and program managers allowed the home to close earlier than expected.",
          },
          {
            author: "Master Sergeant Jack and Grace Thompson",
            body: "With a growing family, my wife and I were looking for a bigger home to move into. We had purchased our starter home when the housing market was at its peak in 2006. Our home had depreciated substantially so our situation was looking bleak. We were also in the process of an international adoption (4th child) and wanted to move and be settled in before our child’s arrival. We needed an exceptional realtor to help us sell our home where we could break even and then help us buy our new “dream” home. We were introduced to David by my brother-in-law, who had a friend that was a neighbor to David. David’s neighbor vouched for him, promising us a realtor with integrity, dedication, and undue professionalism. My wife contacted David via email and no more than 10 minutes of sending the email, she received an immediate response. David had already looked into our housing situation with comparable homes in the neighborhood! Upon meeting David for the first time, my wife and I were struck by David’s warm and enthusiastic personality. He was also very prepared, intelligent, professional, and confident despite our bleak situation. David informed us that our home was valued at $20k lower than where we needed to break even and that we would have to take the loss in order to sell. My wife and I decided to wait until next year in the hope that our home would appreciate to the desired value. We hadn’t heard from David since that meeting. But then three months later, we received an email from David stating that a home in our neighbor had sold at the value we needed to break even and it was time to sell! The value of our home had appreciated $20k in three months. We would’ve never known this had it not been for David’s vigilance and knowledge of the fluctuating market. Even though we hadn’t heard from him, he was committed to us, constantly watching the market on our behalf. I met with David the following week on Tuesday and with his encouragement, we prepared to put our house officially on the market the following Monday. We received a call from David a few days before our house was even on the market, that there were interested buyers already set up for a viewing on Monday! David’s stellar relationship and connection with other realtors had us way ahead of the game! To our amazement, we received our first and best offer the very day we put our house on the market! We had added $5k to the value for room for negotiation but the buyers added another $5k! We had several more viewings in the following days with more offers. We decided to go with our first offer and ended up closing with a profit of $10k! What would’ve been an incredibly taxing journey turned out to be a pleasant, even smooth ride with David as our realtor. Within a week of selling our home, David also helped us buy our “dream” home, ideal for our growing family in every way. His stellar reputation amongst the realtors was highly reputable and we were proud to be represented by him. When looking into model homes and talking with other agents, David was well-known among the community as a generous, committed, dedicated realtor. Through all the hiccups, ups and downs of this arduous process, David was always there for us, quick to respond, ready to work. He has surprised and amazed us time and time again with his extreme professionalism and flawless attention to detail. He has shown us nothing but loyalty, perseverance, commitment, generosity, vigilance, professionalism, integrity, and 200% of his efforts from day one. David has always been honest and upfront with us, keeping us informed of our situation, whether good or bad. He is always a step ahead, leading the charge. We consider it our incredible joy and blessing to have met David and extremely honored to have been represented by him as our realtor. I have no doubt we would not be able to have had the results we had with another realtor and will only seek David’s services in the future.",
          },
          {
            author: "Mr. Roy Bergeson",
            body: "I was arriving in Hawaii as a newcomer to the state and needed to find an apartment to rent near my work in Kapolei. I was bewildered by the multitude of different realtors and listings on Craigslist. I must have looked at over 35 apartments, either calling, driving by, or being shown by other realtors. Nothing matched what I hoped to find. Then someone at my new job recommended David Kucic. He had an apartment for rent that seemed to suit what I was looking for. He showed it to me. I liked it, but I was still unsure of the market in Hawaii. I asked my boss and his wife, long-time Hawaiians, to take a look at the apartment with me. The confirmed my sense that this was a great place. Unfortunately it wouldn’t be available for two months! What to do? David Kucic came to the rescue. Through another realtor he found me a furnished apartment to rent until my new apartment was ready. I’ve had unfortunate experiences with realtors and of course I’ve heard many horror stories. Through the next two months while making arrangements to move to the new apartment and working with the owners through David Kucic, I came to trust him completely. What a relief for a new resident of Hawaii. Integrity is the word that comes to mind when I think of David Kucic. He was scrupulously fair in representing the owners of the apartment I rented and totally honest in all of his dealings with me. He asked to be informed when I was going to be off-island, so that he could check on the apartment. I could tell that he was being a good steward for the owners. When another job caused me to leave Hawaii before my lease was completed, he informed me honestly of my obligations and how, if another renter was found, I would be able to move away without having to pay rent for an empty apartment. He worked diligently and a good renter was found to move in when I left. I consulted him about cleaning services and I called the people he recommended. When I told them that David Kucic had recommended them, they told me that they immediately knew the quality of work they needed to do. He clearly has a good reputation for service, honesty, and a high-level of expectation for all parties. Hawaii is very fortunate to have realtors of David Kucic’s character. If I were to move back to the island, David would be the first person I would call.",
          },
          {
            author: "Sergeant Major Toese Tia",
            body: "What a blessing it is to share the awesome testimony of how God aligns people together for the Glory of his kingdom. You and Tonya have truly been and will always be a blessing! My wife and I have often talked with others about the exceptional service and friendship that you and Tonya have blessed our family with. We look forward to writing this testimony on what a blessing the Hawaii Military Realty, Inc has been in our lives. Thank you so much for all the you and Tonya do, and continue to do, providing exceptional service and support for our service members!",
          },
          {
            author: "Sam and Svetelina Tomyim",
            body: "We are a military family & while stationed in Hawaii we purchased a home. It was not a good timing, as shortly after we closed on our first home, the mortgage industry as we knew it started crumbling & falling apart. Needless to say, when time came to PCS, we found ourselves in a position, where neither rental, nor selling the property was a good option. Renting left us with a hefty out of pocket expense on a monthly basis & selling was only possible through a short sale. We asked David Kucic to take on the overbearing task of selling the property on our behalf, as we had to move elsewhere. Overbearing is an understatement, when one has to deal with the endless communication & lack thereof, between former & current holders of our then mortgage loans. But despite all the ups & downs, David Kucic kept going strong. Never did he lose his professional demeanor, always had a positive outlook on things & not for a second doubted that we’ll get through this, one way or another. Needless to say, he did see us through a successful short sale & we are forever thankful for his enormous efforts & great work! We will always recommend David Kucic in the future, as by far he has been more than just a realtor to us. Having someone like David, who take his job & turns it into passion, treat his customers as friends, rather than just another number, all these things speak volumes & we can never forget that. One can never go wrong, when deciding on going with David Kucic for all their real estate needs.",
          },
          {
            author: "Lieutenant Chris Westrom",
            body: "The word “exceptional” does not even being to describe the type of service that I received from David Kucic. I expect realtors to be knowledable, available, and honest. Dave pushes well beyond these expectations. He has a vast knowledge of the entire island of Oahu, which I learned first hand after asking for showings from everywhere from Ko Olina to Waikiki. He didn’t just know the facts and the comps, but he had an understanding of the essence of the neighborhoods and the lifestyles they would fit. He is available to his clients literally night and day, including weekends, and never took more than an hour to return a call. Most importantly, though, he is honest, willing to give his opinion when asked. His exceptional service met all of these expectations and more. In addition to his competence and professionalism, he was a great guy to be around, possessing all of the extras and intangibles that put me at ease and made me trust him to help me with the biggest financial decision of my life. I felt like we were teamates, and he was buying the property just as much as I was! He took me through all of the stages of buying, from searching to closing. Most realtors will follow through to closing, but Dave still sends me updates on sold properties in my building. He keeps tabs on the building and the market for me, just because he knows that I am still curious and want to be updated on how much my condo’s comps are selling for. He even called to let me know when rates had dropped! Dave was fair through and through, clearly explaining everything to me and letting me know exactly what I was getting into. He never tried to sell me on a more expensive condo, offered to refund any realtor bonuses to me, and made sure I was an informed buyer in every way possible. I recently moved to San Antonio and bought another home….I wish I could have had Dave in Texas! I have at least 5 friends that have used Dave, and everyone has been as thankful to him as I have.",
          },
          {
            author: "Sergeant Major (Retired) Donald Gower.",
            body: "I started looking for and talking with a number of realtor’s while my wife and I were still living in South, Korea, preparing for our move to Oahu, Hawaii. Every realtor I spoke with only wanted to know the ceiling of how much I could spend, and were not very willing to show me anything but those near my price ceiling. Once we arrived on Island our experience only became worse. I could not find a realtor that would take the time to not only listen, but give suggestions as well. While searching the internet one day I came across David Kucic. I could see that he was retired military as I am, so I figured we would at least be speaking the same language. What a pleasant surprise it was to find David. After we initially spoke, he must have sent me 30 different listings within the hour. My previous experience’s were maybe a reply within a week. He constantly returned my e-mail’s and calls as soon as he possibly could. When we had selected a dozen of so places to see, David came to our apartment and picked us up in his own car. We were amazed at his generosity as our previous realtor met us at the first place we looked at and then drove her own car as we followed. That was very upsetting as we had just moved to the island and really did not know which way was up! David knew when to keep quite and let my wife and I just look. He also knew when to chime in and explain. He is an extremely polite and courteous gentlemen that always made us feel that we were like we were his priority. I remember a few times as he was showing us properties that he would receive calls from other clients. he was always so polite as to ask if we cared if he step away to take the call, and he always asked if he could call back as he was assisting another client. These are not just qualities of a realtor. These are qualities of a true professional. I had never met David Kucic before then, however I know that if i need anything I can call or e-mail and he will assist us. In fact, we just found out that we are relocating again in the near future and David recommended us to a gentlemen to manage or property. What better service could you ask for? We are proud to call David our friend and realtor.",
          },
          {
            author: "Staff Sergeants Dawn and Johnny Ramos.",
            body: "When my husband and I arrived to Hawaii in December 2010 we immediately fell in love and knew that we wanted to make this our permanent home. After looking at several places for rent or sale on our own we discovered that it would be difficult to search and find a place that was right for us without the help of a realtor. I picked up a homebuyers guide in the lobby of the hotel we were staying in and found an ad for Dave Kucic. His ad appealed to us because my husband and I are both in the Army and Dave is retired Army, but we wanted to meet with a few different realtors before choosing one. Dave was the first and last realtor we met with; we knew right away that he was a perfect fit for our family. He was warm and friendly, personable yet still very professional. Right from the beginning the odds were stacked against us. We have a large family (5 members), two large breed dogs, a looming deployment to Afghanistan, and Christmas right around the corner. We needed to find a place big enough for all of us that we loved and could afford, hopefully get moved in before the holidays, and definitely close before my husband left for a 12 month deployment. Dave set right to work. That same day he showed us three places. He was very in tune with what we were looking for and kept us focused on the different options that would work for us. He only showed us places that he knew would fit all of our needs, and he dedicated a lot of time to our cause….sometimes full days just to us. We found a place within a couple of weeks that was perfect for us. Dave handled all of the details that needed to be handled in order to get us in the home that we had fallen in love with. We got everything we wanted; a home to spend Christmas with our family in, a fast closing that was finished before my husband left on his deployment, and a place that we can all be happy in for many years to come. Without Dave none of it would have been possible. As a realtor he really stuck in there and gave us the VIP treatment. As a fellow service member he showed that he continues to live the Warrior Ethos and Army Values that he promised to serve and live by for so many years. I truly feel that Hawaii is better off for having professionals like Dave who understand the true meaning of the word “service”, who has served his country, and then continued to choose service to his community through his new profession as a realtor. In a largely military community, he is an invaluable asset.",
          },
          {
            author: "Mr. Burl Hays.",
            body: "David exceeded our expectations as a buyer’s agent. My wife and I had no prior experience in using a buyer’s agent to assist in finding a home and completing the purchase transaction. But when we submitted an inquiry to a website with which David is affiliated, he contacted us promptly and clearly explained to us his role and how he would help us in our home search. Then throughout the process, I found David to extremely balanced and insightful as he helped us evaluate various properties. An agent could have easily not told us of his/her concerns about a particular property, which would have likely resulted in us finding a property sooner and pursuing a transaction, but David was not at all reluctant to identify concerns we never would have known about and to let us know so we could properly consider whether a property was right for us. We truly appreciated this transparency and integrity as we sought David’s advice on properties in Hawaii. I also found David to be extremely responsive to our questions, responding as accurately and completely as possible within a very short time period. And if he did not know the answer to a question immediately, he communicated to us that he did not know it, but that he would find out and let us know within a defined time period. This was very comforting to us and allowed us to anticipate every step of the process smoothly. Again, throughout the process, David followed up on every step of the transaction to ensure we were 100% clear on the requirements and implications of each step, and then he also ensured that the counterparty responded appropriately to our questions and requests. We made an offer on this property “sight unseen” and David’s support was very helpful to ensure that we were fully comfortable with the property we were buying. He visited the property on our behalf, took photos and video, and conducted independent assessments of comparables to ensure we were offering a fair price. Before making an offer sight unseen on the property we ultimately purchased, we had been in Hawaii on vacation and visited a number of other properties with David. There were many times that David could have simply withheld his views on negative aspects of a property, in order to accelerate a transaction. But instead he was very proactive in identifying concerns and giving us a very realistic assessment of whether a property met our expectations. Without his assistance, I am certain we would not have been so happy with the property we ultimately bought.",
          },
          {
            author: "Master Sergeant (Retired) David Harris",
            body: "David Kucic provided exceptional service and exceeded all my expectations in marketing and selling my home for me in a tough and down-turned market. I shopped around for the best Realtor I could find as I knew it was a tough time to sell my home and there were many homes in my neighborhood in competition that had been on the market for several months. A neighbor had referred David Kucic to me and boy am I glad he did. I had many questions about selling my first home. My circumstances were that I was an active duty military member facing retirement without an income opportunity in the area that would allow me to continue to meet my mortgage obligation, also my home had lost $100,000 in value since I purchased it over three years earlier and I was way upside down on my loan. I had a firm job offer back on the mainland, but I was not going to have sufficient income to cover my Hawaii mortgage and meet living expenses in a new area. I considered keeping my home and renting it out, but the amount of rent I would have been able to get would not have covered my mortgage and maintenance fees, and I would have had to come up with almost $1,000 per month to meet the difference. I was the most scared I had ever been in my life. David Kucic took the time to patiently answer all of my questions about what a short sale is, how the short sale worked and what the ramifications to my credit could be. He helped me and my wife every step of the way through what was a very stressful and uncertain time for us. To start with David came over and looked at our home, sat down with my wife and I and explained the entire process. He helped us to fill out the forms to request approval for a short sale from our lender. He then took some very flattering pictures of our home and immediately got busy marketing it. Not only did David Kucic list our home on MLS, he posted it on multiple other web sites including Zillow. He paid the fees to Zillow and other sites to market our home. His exceptional knowledge of the market and the short sale process gave us the clear advantage. Dave priced our home right at the fair market price at the time and we had an offer and a backup offer in no time. I could not believe it, other comparable and even nicer homes in our neighborhood (8 homes on my street alone) had sat on the market for 5 months or more and yet David had buyers for us quickly with written offers. We had a firm offer with a backup for safety sake. With written offer in hand I went ahead and took the new job on the mainland and moved. David then did another amazing thing, he rented out my home to the buyer so they could live there while we all waited for the banks to close the deal. This saved me expenses such as HOA and maintenance fees as the new buyers were paying them in the form of rent. During the time that I had moved away and my home was being rented by the buyer, ground termites were discovered in several locations around the foundation of the house. David Kucic notified me immediately of the concern and recommended a termite inspector and termite treatment. He advised me that the fair and right thing to do was for me to pay for the inspection and the treatment. He referred me to an excellent company that went to work right away on the problem. The termite treatment company even worked with me on payments giving me a couple of months to pay for all the work they did. The termite company David recommended even came out the very next day on a Saturday. This quick action put the potential buyers and current tenants at ease and in my opinion saved the sale. After the sale was complete I received a letter from my bank indicating that because of my circumstances and the way the short sale was conducted, that they would not be pursuing me for the remaining balance on the loan, nor would they file a claim against me with the Veterans’ Administration (I had a VA Loan). This was a huge relief and a blessing as I thought for sure that I would lose my VA eligibility forever. It is my firm conviction that the expert guidance, thorough follow through, tenacious marketing, and fair dealings of David Kucic are the reasons why I came out of my hardship in great shape. I am very grateful to David Kucic and highly recommend him to anyone seeking to buy or sell a home. Please feel free to email me at i.am.dave.harris@gmail.com and I will tell you myself how professional and thorough he is.",
          },
          {
            author: "Master Sergeant (Retired) Scott Chaplin",
            body: "David Kucic was referred to me by my previous realtor so I didn’t know him. However, all my concerns were set to rest almost immediately by David’s professionalism, knowledge and his obvious experience. Unfortunately for David my business with him was a Shrot Sale but David assured me WE would get through it. That is exactly what we did, even though Wells Fargo wasn’t working with us very well and it took us almost a year from Jan 2010 through Dec 2010 to finalize the Short Sale, David made it happen. Through all the gueling paperwork and endless communications between me, David and Wells Fargo, David stuck with it and made made sure it all came together. Wells Fargo lost us several buyers and Wells Fargo’s communications with us and or personnel in their own organization were very lacking. So, there were many times I thought for certain David would be contacting me just to say he couldn’t do it anymore and that it wasn’t worth it anymore for him to keep trying to work the Short Sale for me. Even though he said during all of his years of experience as a realtor he had never had one last so long and be so exhausting. However, David never gave up and like a true warrior he never quit the fight during this year long process. David was the lynchpin and or focal point that held everything together, to make the process as smooth and successful for me as possible considering the circumstances. There were several times during this long hard process I felt as though it was never going to end and or was never going to be finalized but David always assured me we would make it happen. David was not only an excellent personable realtor at times he felt like a friend that was there for support and or guidance when I needed it most. If you’re looking to buy and or sell a home David Kucic is definitely the Realtor to depend on regardless of the circumstances. David Kucic is loyal, dedicated, trustworthy and I am so thankful he assisted me with my Short Sale. I am honored to know him not only as a Realtor but as a man and a friend!! Thanks again David I truly appreciate all you’ve done for me and I wish you all the best the world has to offer for you and your family!!",
          },
          {
            author: "CW3 Phil Wilson",
            body: "Throughout my experience with David Kucic, I never really felt like a client. I felt more like a friend of his that he was helping and advising through the home buying process. I was a first time home buyer who didn’t know much about the process. David was always there to answer my questions or promptly gather information from lenders. It never really seemed like too early was in David’s vocabulary. It didn’t matter how early I called or emailed, David was always there to lend me a helping hand. David’s exceptional service didn’t end once I closed on my home. David is still always there to help me find inspectors, contractors, or to just answer a real estate question that I might have. He helps me select businesses that not only have a good reputation, but ones that offer the best deal or discounts towards me. Home buying can be a difficult and frustrating process. Luckily for me, I had David Kucic to always make sure that I was getting the best deal and that the process was being completed efficiently and correctly.",
          },
          {
            author: "CW2 Casey Clark",
            body: "I am a pilot in the military and I was stationed in Korea. I was transferred to Hawaii and didn’t know where I was going to live. My wife contacted David Kucic via a reference and am I glad that we found him. First he is retired military, and his knowledge and professionalism when dealing with the military buyer is second to none. He walked me through every step of the buying process and put all of my first time buyer nervousness to rest. Without his knowledge of the local area, VA benefits, and the buying process, I never would have been able to handle the purchase being out of the country. When I arrived at the airport with my family, he was there waiting with his ohana and the spirit of aloha that only a true island representative could produce. David and his wife made sure that we were welcome, and well taken care of while we waited in a hotel for our house to become available. He even made arrangements for me to have an automobile to get around the island while we waited. He and Tonya not only were our agents, but quickly became our friends and “go to” people when we had any issues, or out of the box needs. They not only assisted us with the move, but answered every question that we had. I had to move again 3 years later and unfortunately had to short-sale our home. He not only brought the same level of knowledge and professionalism that he displayed with the purchase, but made the process so stream-lined that I never had to question or worry about the sale. It was a very stressful time in my family’s life with the move to Alabama, and the short-sale. David and Tonya made sure that all issues were taken care of and represented me through the selling process. I was constantly updated, and the proper forms were sent to me to be filled out, timely, and explained thoroughly. The only thing that I had to wait for was the phone call from David notifying me that the house was sold. I would recommend David and Tonya to anyone, and everyone that asks about real estate when moving to the islands. They are true Ohana, they want to help good people, and display everyday what it means to be both.",
          },
          {
            author: "Steven and Stephanie Genchi",
            body: "I had the pleasure of meeting David Kucic several years ago when we initially considered selling our home. At that time (December 2007), my husband and I decided not to put our home on the market, but promised David when the time came to sell our home we would contact him. True to our word, I called David in the Fall of 2010, and asked him to list our home. I was confident that David would provide honest feedback and exceptional service, but I had no idea how far he would surpass my expectations. From the onset of the transaction, David set the PROFESSIONAL EXPECTATIONS that he would do everything he could to market my home properly, price it correctly, and find the right buyer. Knowing that my home was one of several townhome units in Ewa Beach, it was critical for him to set the expectation up front. David’s EXCEPTIONAL SERVICE service simply cannot be described in words. Not only did David agree to list my home, he found me a program unique to my situation that would grant my husband and I financial assistance to sell our home. He prevented us from listing our home as a Short Sale and as a result gave us an incredible peace of mind. Throughout the process, David was always available, day or night, to help. He conducted a thorough walk through of our property and pointed out some areas of improvement to make the home more marketable. Without his help, I am confident my husband and I would still own this home and would struggle to make ends meet month after month. The HAP program was a lengthy process that required a significant amount of preparation prior to listing the home as well as THOROUGH FOLLOW-UP by both David and myself. Because of David’s preparation and follow up, we were able to go through the entire HAP transaction smoothly with no set-backs. We stayed in constant communication throughout the process. David was always honest and forthcoming with information and never tried to hide information or mislead me in any way. He was always engaged in FAIR DEALINGS. David Kucic is clearly a man of great integrity. I have the utmost respect for him as a person and as a realtor. I am truly honored to have had the pleasure of working with him. Although we will always miss our home in Ewa Beach, my husband and I sleep much better every night knowing we got the best deal possible…all because of David’s amazing service!!",
          },
          {
            author: "Captain Kenny Davis",
            body: "Dave’s work ethic and business savvy are unmatched in this field. I have worked with several others in the real estate business and not once have I encountered an agent as trustworthy, reliable, and hardworking as Dave. Every question I had was thoroughly answered and every document presented to me was explained in great detail. I was extremely impressed with the information I received from Dave. His expertise in the real estate area is unmatched from my previous experiences. As a Captain in the Army I would recommend them to any of my peers, family, or friends. Dave is an honorable and trustworthy agent. I always felt like Dave gave me the straight assessment of information every time I dealt with him. He was always early to every meeting we had, answered every phone call right away and would reply on email in less than 2 hours to any question I asked. After my enjoyable experience with Dave finding the house of my dreams he is the only agent I would consider in my future endeavors in Hawaii.",
          },
          {
            author: "SFC Tres and Mary Redd.",
            body: "We’ve been blessed with a truly dedicated real estate agent. His willingness to go the extra mile for us had made our first home buying experience easy. If we had a question, David would not hesitate to find the answer for us. He is a trustworthy and compassionate person when it come to the needs of his clients. In a sense, the transistion from renter to homeowner was effortless. We appreciate everything he has done for us and have since been singing his praises to anyone willing to listen. Thank you David for a stellar job. We’ll be certain to call on your services when we decide to sell or buy a home in the islands again. You and your family are always welcome in our home.",
          },
          {
            author: "Sergeant Taryn and Micah Bargas.",
            body: "My husband and I had been working with another agent for quite some time while we lived in Hawaii but since we moved to Germany we felt the agent no longer believed we were serious buyers. Frustrated and bit pessimistic I happened to check the Hawaii MLS listings. To my amazement the home I had always had my eye on, was up for sale. I ‘googled’ military-VA-real estate, or some variation of those words and came across David Kucic’s website. I registered with my information not expecting much and doubtful about the reality of purchasing a home in Hawaii while living in Germany. Surprisingly I received an email and phone call from David within 24 hours. Unless you’ve lived overseas it’s difficult to understand how rare this is. Most of the time when dealing with businesses in the States you are typically told they are unable to call Internationally or that they just plain don’t know how. I was impressed form the beginning with David’s professionalism. As an active duty service member purchasing a home thousands of miles away, I was comforted by David’s familiarity with the Army and our particular situation. We have purchased and sold other properties while we lived in Hawaii but none moved as timely and seamlessly as the transaction we did with David while living in Germany. David was available to answer any questions we had and provided sound advice based on knowledge and experience. He was honest and informative of not just the pros but the cons too. He helped us make the best decisions for our situation. He actually listened to our plans, goals and expectations. He truly was available via email and phone daily if not hourly while going above and beyond our expectations. It was obvious that David and his team set a high standard of customer service and he expected that same standard from the other agencies he works with. He was flexible, dependable, attentive, and willing to work and communicate exactly how we preferred while advocating for us every step of the way. Not only will I recommend the Kucic team to our friends, family and any interested buyer/seller. I will be using them for all of our real estate services in the future.",
          },
          {
            author:
              "Your friends, Coast Guard Petty Officer Second Class Brett Salter",
            body: "Thank you David and Tonya from the bottom of our hearts. We could not thank you enough for the outstanding representation you provided for us during this trying time. When the mortgage company went bankrupt 4 weeks into the transaction, we were left homeless until you both calmed us down and eventually got us into the home. We were ready to give up and become renters once again. We tell everyone that we know about what you did for us and we are so happy to have found you. Thanks for taking me on that deep sea fishing trip. I had a blast even though I didn’t get to pull in the biggest fish that day. The housewarming party is right around the corner and you are at the top of our guest list.",
          },
          {
            author: "Sincerely, Staff Sergeant Matt and Belinda Garza.",
            body: "We were so lucky to find you! Thank you very much for helping us to purchase our first home. You are extremely efficient, knowledgeable and an awesome communicator. Sorry we weren’t quite as good with the communication as you were! We are very happy in our new home and when it is time to sell, you will be the only one that we would ever think to call.",
          },
          {
            author: "MAJOR MO and Ann Loynes.",
            body: "David and Tonya Kucic are phenomenal agents. They are everything that we would have ever expected from realtors. They came to our hotel to drop off documents, drove us around looking at homes, kept us updated always via email and phone calls and most importantly to us, THEY COULD ALWAYS BE REACHED. Since we were short on time for finding a house and closing, we needed an agent that was accessible via email, phone, fax and in person. Thankfully we found David and Tonya Kucic! We are now happy homeowners in Hawaii and could have never done this without their assistance. We will recommend them to everyone we meet that mentions “realtor”",
          },
          {
            author: "Lieutenant Derek Curry.",
            body: "I couldn’t imagine buying a home without David and Tonya Kucic of Tropic Lightning Realty. I was a first time home buyer and they took the time to walk me through all the steps. I never felt any pressure from them to buy a particular property, and they even looked out from me when I was in the process of getting into a bad mortgage deal. During the week I am pretty busy, so when I couldn’t make the trip to them, they came to me when there were papers to sign, or things to consider. I would not hesitate to recommend them to a friend, and I will definitely go to them in the future for any real-estate needs.",
          },
          {
            author: "Sergeant First Class Charles and Jennifer Covey.",
            body: "David and Tonya Kucic of Hawaii Military Realty. This comes from Jennifer and I, both names you can use as references. We had a wonderful experience with your services during the many homes that you showed us, around 20 or so, in various neighborhoods and communities over the month and change and we worked well together. You never pushed anything upon us or pressured us into placing an offer on a property we were not interested in. You did research on the three properties that we thought about bidding on and weren’t upset when we decided against the property in Makakilo with the high association/maintenance fees upon the sellers counter-offer. You figured out our tastes so much that you found the house we bought in Ocean Pointe (that was almost new!!) Your dedication to service never faltered as you showed up to do the final walk-though, at closing with the mortgage lender; and at escrow, and even afterwards stopped by and gave a house warming gift. This is not the first house I have bought, but the Kucic’s are by far the Best Realtors I have ever dealt with! I would recommend them to anyone looking to buy or sell in Hawaii!",
          },
          {
            author: "Captain Todd and Ophelia Isreal",
            body: "David and Tonya Kucic of Hawaii Military Realty are an incredible real estate team! My wife and I had certain requirements for our new home (both financially and architecturally) which really narrowed our options. But David and Tonya were very patient with us and, because of their knowledge of the different neighborhoods, they were able to help us locate just the right home. I felt that they gave us individualized service, going above and beyond to help my wife and I make the right decision. They even took the time to e-mail my wife pictures of the houses we were viewing since she was still in the mainland and unable to tour them with me. When we finally located a home, they provided us with detailed information, helping us to make the right offer. From the beginning of our search to after closing, the Kucics provided us with exceptional, thorough, and personal service. I recommend them to anyone interested in buying a home!",
          },
        ],
      },
    },
    contact: {
      path: "contact.html",
      title: "Contact Us | Hawaii Military Realty",
      description:
        "Call, or text to reach any of us here at Hawaii Military Realty.",
      hero: {
        image: "hero-pcs-planning.jpg",
        eyebrow: "Direct Contact",
        heading: "Get clear answers before you move",
        intro:
          "PCS timeline, VA questions, selling from off island, or property management after orders. Call, text, or use the contact page for a straight assessment.",
      },
      section: {
        eyebrow: "No Intake Maze",
        heading: "Talk to a real person",
        intro:
          "No forms. No waiting. Direct communication with people who understand military timelines and Hawaii real estate.",
      },
      methods: [
        {
          icon: "phone",
          tone: "pri",
          label: "Call / Text",
          value: "(808) 218-9338",
          note: "The fastest way to get a direct answer.",
          hrefKey: "phoneHref",
        },
        {
          icon: "mail",
          tone: "acc",
          label: "Contact Page",
          value: "Open contact page",
          note: "Contact us for next steps.",
          hrefKey: "contactPageHref",
        },
        {
          icon: "msg",
          tone: "palm",
          label: "SMS",
          value: "Text us now",
          note: "Quick questions and scheduling updates welcome.",
          hrefKey: "smsHref",
        },
      ],
      infoCards: [
        {
          icon: "mapPin",
          tone: "deep",
          label: "Service Area",
          title: "Based on Oahu",
          text: "Serving Oahu buyers, sellers, renters, property owners, military families, and service-minded clients.",
        },
        {
          icon: "clock",
          tone: "pri",
          label: "Hours",
          title: "7 Days | 8am-8pm HST",
          text: "Deployment-friendly communication across time zones.",
        },
        {
          icon: "calendar",
          tone: "acc",
          label: "Mission Brief",
          title: "15-minute call",
          text: "No pressure. Just facts, risk, timing, and next steps.",
        },
      ],
      cta: {
        title: "Start With a Clear Brief",
        subtitle:
          "Buying, selling, relocating, or managing property from afar? Call or text anytime.",
        note: "(808) 218-9338 | 7 days a week.",
      },
    },
    featuredListing: {
      path: "featured-listing.html",
      title: "VA-Ready Kapolei Home Near JBPHH | Hawaii Military Realty",
      description:
        "Turnkey 4-bed, 3-bath home minutes from JBPHH. VA loan eligible, solar, AC, and fenced yard.",
      canonical: "/featured-listing.html",
      ogTitle: "Featured Listing | Kapolei Home Near JBPHH",
      ogDescription: "VA-ready Kapolei home with practical access to JBPHH.",
      ogImage: "assets/featured-home.jpg",
      hero: {
        image: "featured-home.jpg",
        imageAlt: "123 Aloha Drive Kapolei exterior",
        eyebrow: "Featured Property",
        heading: "VA-Ready Kapolei Home Near JBPHH",
        address: "123 Aloha Drive, Kapolei, HI 96707",
        price: "$785,000",
        valueNote: "VA Eligible | $0 Down for qualified veterans",
      },
      specs: [
        {
          icon: "bed",
          value: "4",
          label: "Beds",
        },
        {
          icon: "bath",
          value: "3",
          label: "Baths",
        },
        {
          icon: "square",
          value: "2,200",
          label: "Sq Ft",
        },
      ],
      overview: {
        eyebrow: "Property Brief",
        heading: "A move-in ready home minutes from JBPHH",
        paragraphs: [
          "Just minutes from Joint Base Pearl Harbor-Hickam, this turnkey home features owned solar panels, a two-car garage, and a fenced backyard perfect for keiki (children) and pets. Recently updated kitchen and AC throughout.",
          "VA loan eligible with no down payment for qualified veterans. Lot size: 7,500 Sq Ft. Quiet, family-friendly street with easy access to H-1, schools, commissary, and exchange.",
        ],
      },
      highlightsHeading: "Highlights",
      highlights: [
        "Near schools, commissary, and exchange",
        "Move-in ready with new paint and flooring",
        "Low HOA fee ($45/month)",
        "5-year-old roof and owned solar",
        "Fenced backyard for keiki and pets",
        "Two-car garage with practical storage",
      ],
      detailsHeading: "Property details",
      details: [
        {
          label: "Year Built",
          value: "2018",
        },
        {
          label: "Lot Size",
          value: "7,500 sqft",
        },
        {
          label: "Garage",
          value: "2 cars",
        },
        {
          label: "HOA",
          value: "$45/mo",
        },
        {
          label: "Property Type",
          value: "Single Family",
        },
        {
          label: "Status",
          value: "Active",
        },
      ],
      tour: {
        eyebrow: "Schedule a Tour",
        heading: "Get eyes on the property",
        intro:
          "Private tours available 7 days a week, in person or by live video walkthrough.",
        reply: "Typical reply in under 2 hours.",
        options: [
          {
            icon: "phone",
            tone: "primary",
            label: "Call now",
            value: "(808) 218-9338",
            hrefKey: "phoneHref",
          },
          {
            icon: "calendar",
            tone: "accent",
            label: "Text to book",
            value: "Schedule a tour",
            hrefKey: "smsHref",
          },
          {
            icon: "mail",
            tone: "palm",
            label: "Email",
            value: "Send a question",
            hrefKey: "email",
          },
        ],
      },
      cta: {
        title: "Need a VA-Ready Home Search?",
        subtitle:
          "Ask about this home or similar properties near Oahu's military communities.",
        note: "Call or text for a private tour.",
      },
    },
    notFound: {
      path: "404.html",
      title: "Page Not Found | Hawaii Military Realty",
      robots: "noindex",
      heading: "404",
      subheading: "Page not found",
      text: "The page you're looking for doesn't exist.",
      linkLabel: "Go home",
    },
  },
  team: {
    title: "Meet the Team | Hawaii Military Realty",
    description:
      "Meet David J. Kucic, Cameron Kucic, Ashley Payne, Brandie Martin, Jim Pickens, Tonya Kucic, Jeff R. Loyd, and Tami Sego, real estate professionals serving clients across Oahu.",
    eyebrow: "The Team",
    heading: "Military-informed guidance, broker-level standards",
    cta: {
      title: "Ready for a Clear Plan?",
      subtitle: "Call or text to brief us on your next Hawaii real estate move.",
      note: "Serving buyers, sellers, renters, military families, property owners, and property investors across Oahu.",
    },
    intro: [
      "serve buyers, sellers, renters, military families, homeowners, government civilians, government contractors, and investors with steady communication, practical Oahu market guidance, and disciplined client advocacy.",
    ],
  },
  about: {
    title: "About Hawaii Military Realty",
    description:
      "Learn about Hawaii Military Realty's disciplined Oahu real estate guidance, broker expertise, and veteran-first service approach.",
    eyebrow: "About Hawaii Military Realty",
    heading: "Native Hawaiian owned. Veteran owned and managed.",
    featuredEyebrow: "First Sergeant Leadership",
    featuredCtaLabel: "Read Full Bio",
    backgroundEyebrow: "Operating Standards",
    backgroundHeading: "Broker expertise shaped by military service",
    cards: [
      {
        icon: "shieldCheck",
        title: "Veteran Owned & Managed Brokerage",
        text: "The brokerage is managed with firsthand military experience, mission-focused execution, and direct accountability.",
      },
      {
        icon: "heart",
        title: "Native Hawaiian Owned",
        text: "Local ownership anchors the brokerage in Oahu communities, relationships, and island responsibility.",
      },
      {
        icon: "home",
        title: "Oahu Real Estate",
        text: "We guide buyers, sellers, renters, families, and investors through Oahu's base communities and neighborhood tradeoffs.",
      },
      {
        icon: "award",
        title: "Broker Standards",
        text: "The brokerage is built around disciplined process, strong advocacy, and clear operational standards.",
      },
      {
        icon: "heart",
        title: "Hawaii Roots",
        text: "We understand the local communities, traffic realities, climate, schools, and long-term stability that matter here.",
      },
    ],
    cta: {
      title: "Brief Us on the Mission",
      subtitle: "Call or text us today to get direct guidance before you move.",
      note: "Available for buying, selling, renting, relocation, and property management planning.",
    },
    intro: [
      "Hawaii Military Realty combines deep Oahu market experience, broker-level operational standards, Native Hawaiian ownership, and veteran-owned management to support buyers, sellers, renters, property owners, and service families.",
    ],
  },
  agents: [
    {
      slug: "david-kucic",
      sort: 1,
      name: "David J. Kucic",
      shortName: "David",
      image: "david kucic.jpg",
      phone: "(808) 218-9338",
      email: "david@davidkucic.com",
      title: "David J. Kucic - Founder / Principal Broker",
      description:
        "Meet David J. Kucic, founder and president of Hawaii Military Realty, Army veteran, principal broker, and trusted military relocation advisor.",
      roleTag: "Founder / Principal Broker",
      cardRole: "Founder / Principal Broker",
      cardMeta: "Army 1SG · Founder",
      tagline:
        "Army veteran and founder of Hawaii Military Realty, serving military members, veterans, and families across Oahu.",
      aboutTitle: "About David",
      badges: [
        {
          icon: "star",
          title: "Army Veteran",
          text: "22 years of honorable service, retiring as First Sergeant",
        },
        {
          icon: "shieldCheck",
          title: "Combat Recognition",
          text: "Two Bronze Star Medals for Desert Storm and Iraqi Freedom",
        },
        {
          icon: "home",
          title: "Founder",
          text: "Founder and president of Hawaii Military Realty, Inc.",
        },
        {
          icon: "award",
          title: "Aloha Aina Winner",
          text: "Aloha Aina Award Winner in 2008, 2010, 2011, and 2013",
        },
        {
          icon: "users",
          title: "Top 50 Brokerage",
          text: "Top 50 Oahu Real Estate Brokerage since 2011",
        },
      ],
      sections: [
        {
          title: "Military Service",
          paragraphs: [
            "Before entering the real estate industry, Kucic served honorably in the United States Army for 22 years as a field artillery soldier, ultimately retiring with the rank of First Sergeant. Throughout his distinguished military career, he was stationed at multiple locations in the United States and overseas, culminating in his final assignment at Schofield Barracks, Hawaii.",
            "Kucic's service included participation in major combat operations, earning him two Bronze Star Medals for his actions during Operation Desert Storm and Operation Iraqi Freedom. His long list of military awards and leadership recognitions reflects both his dedication to duty and his excellence as a noncommissioned officer.",
          ],
        },
        {
          title: "Real Estate Leadership",
          pills: [
            "VA Process Guidance",
            "Relocation Services",
            "Home Buying",
            "Home Selling",
          ],
          paragraphs: [
            "Following his retirement from active duty in 2005, Kucic transitioned seamlessly into civilian life by applying his leadership skills and military values to the real estate profession. As a licensed REALTOR, principal broker, and business owner, he has built a reputation as a trusted advisor, particularly among military clients relocating to or within Hawaii.",
            "His continued success is marked by numerous industry recognitions and awards, including Aloha Aina Award Winner honors in 2008, 2010, 2011, and 2013. Hawaii Military Realty has also been recognized as a Top 50 Oahu Real Estate Brokerage since 2011. Through Hawaii Military Realty, Kucic continues to serve the military community, extending his legacy of service beyond the battlefield and into the lives of families seeking stability and opportunity in Hawaii.",
          ],
        },
      ],
      cta: {
        title: "Let's Talk About Your Move",
        subtitle:
          "Call or text David for military relocation and Oahu real estate guidance.",
        note: "Support for military members, veterans, families, buyers, and sellers.",
      },
      about: [
        "David J. Kucic is an American real estate professional, military veteran, and community leader best known as the founder and president of Hawaii Military Realty, Inc., a company dedicated to serving military members, veterans, and their families with real estate needs across Oahu. Based in Ewa Beach, Hawaii, Kucic built his business alongside his wife, creating a team-oriented organization rooted in trust, integrity, and firsthand military experience.",
        "His company specializes in relocation, renters, home buying and selling, property management, and helping clients understand the real estate side of the VA purchase process while coordinating with trusted lending professionals when financing questions need a licensed loan expert.",
      ],
      featuredAbout: [],
    },
    {
      slug: "cameron-kucic",
      sort: 3,
      featured: false,
      name: "Cameron Kucic",
      shortName: "Cameron",
      image: "cameron.jpg",
      phone: "(808) 225-5699",
      email: "camkucic@gmail.com",
      title: "Cameron Kucic - Broker in Charge / Oahu Real Estate Expert",
      description:
        "With over a decade of Oahu real estate experience, Cameron Kucic serves buyers, sellers, property investors, and military families with broker-level precision.",
      roleTag: "Broker in Charge",
      cardRole: "Broker in Charge / Property Management Advisor",
      cardMeta: "10+ yrs Oahu real estate",
      tagline:
        "Oahu real estate guidance built on discipline, island expertise, and client advocacy.",
      aboutTitle: "About Cameron",
      badges: [
        {
          icon: "star",
          title: "Broker in Charge",
          text: "Serving in broker leadership since 2022",
        },
        {
          icon: "home",
          title: "Oahu Expertise",
          text: "100+ clients guided through buying and selling",
        },
        {
          icon: "hand",
          title: "Property Management",
          text: "25+ active homes and 50+ managed career-wide",
        },
        {
          icon: "shieldCheck",
          title: "Military Leadership",
          text: "Commander and Senior Instructor, HIARNG OCS",
        },
      ],
      sections: [
        {
          title: "Military Leadership",
          paragraphs: [
            "Beyond his civilian career, Cameron brings a profound depth of leadership, precision, and mission-first execution derived from a distinguished military career. Coming from a military family-as the proud son of a retired U.S. Army First Sergeant-Cameron traveled the world as an Army brat before settling in Hawaii, where he earned a BBA in Marketing from the University of Hawaii at Manoa. He entered military service in December 2014, commissioning as a 13A Field Artillery Officer out of the Federal Officer Candidate School at Fort Benning.",
            "Over his years of service, Captain Kucic has held pivotal tactical and command roles within the Hawaii Army National Guard, including serving as a Platoon Leader and Fire Direction Officer for Alpha Battery, 1st Battalion, 487th Field Artillery Regiment. His operational experience is extensive, having served on State Active-Duty orders as the OIC for Task Force Hawaii during Hurricane Lane, and deploying from 2019 to 2020 as a Site OIC to Afghanistan, Iraq, and Qatar in support of OPERATION FREEDOM'S SENTINEL, where he led 35 Soldiers in high-stakes Counter-Rocket, Artillery, and Mortar (C-RAM) operations. Following his deployment, he served as a J33 Battle Captain for OPERATION LONGCLAW (Joint Task Force Headquarters COVID-19 mission) and spent two highly successful years in command as the Battery Commander for Charlie Battery, 1st Battalion, 487th FA.",
          ],
        },
        {
          title: "Current Service",
          paragraphs: [
            "Currently, Captain Kucic serves as the Commander and Senior Instructor of the Hawaii Army National Guard Officer Candidate School (OCS) at the 298th Multi-Functional Training Regiment (RTI). In this vital role, he commands the state's premier officer commissioning program, directly shaping and mentoring the next generation of military leaders. His advanced military education includes the Field Artillery Captain's Career Course and the Joint Fires Observer course.",
            "Captain Kucic's military awards and decorations include: Army Commendation Medal w/C Device, Army Achievement Medal, Army Reserve Component Achievement Medal, National Defense Service Medal, Afghanistan Campaign Medal w/1 Bronze Star, Global War on Terrorism Medal, Reserve Component Mobilization Medal w/M device and bronze hourglass, Army Service Ribbon, Overseas Service Ribbon, Overseas Training Ribbon, NATO Ribbon, Meritorious Unit Commendation Ribbon, State Humanitarian Service Ribbon w/Bronze Kahili, State Active Duty Ribbon w/Bronze Kahili, and the Basic Army Instructor Badge.",
          ],
        },
        {
          title: "Local Hawaii Roots",
          paragraphs: [
            "When he is out of uniform and away from the closing table, Cameron stays deeply connected to Oahu's communities, neighborhoods, and day-to-day realities. That local perspective helps clients understand more than a listing sheet: commute pressure, heat, schools, upkeep, and what long-term stability looks like on island.",
          ],
        },
        {
          title: "Real Estate Approach",
          pills: [
            "Residential Sales",
            "Property Management",
            "Military Relocation",
            "Oahu Market",
          ],
          paragraphs: [
            "The absolute precision, emotional intelligence, and rigorous organizational standards required to command a training regiment and manage complex operational environments seamlessly translate into Cameron's real estate practice. Whether managing an investment asset, coordinating a complex relocation for a service family, or positioning a property to sell, Cameron Kucic delivers the discipline, integrity, and elite island expertise required to ensure your mission is a success.",
          ],
        },
      ],
      cta: {
        title: "Let's Talk About Your Goals",
        subtitle: "Call or text Cameron to plan your next move.",
        note: "Guidance for buyers, sellers, investors, and military families.",
      },
      about: [
        "With over a decade of dedicated experience in the Oahu real estate market, Cameron Kucic has built a reputation centered on strategic execution, strict operational standards, and unwavering client advocacy. Cameron began his real estate career serving as a licensed salesperson from 2014 to 2022, mastering the unique complexities of the island's market and guiding more than 100 clients through the major milestones of buying and selling their homes. Demonstrating elite industry expertise and leadership, he earned his broker's license and has served as one of two Brokers in Charge at Hawaii Military Realty from 2022 to the present. His comprehensive approach covers every tier of residential sales and property management services, making him a trusted asset for buyers, sellers, and property investors.",
        "Cameron's property management portfolio spans more than 25 single-family homes, townhouses, and condominiums across the island and he has managed more than 50 homes in his career.",
      ],
      featuredAbout: [
        "Cameron has served Oahu clients for more than a decade, first as a licensed salesperson and now as one of two Brokers in Charge at Hawaii Military Realty. His work spans residential sales, property management, relocations, and investment assets.",
        "His Hawaii Army National Guard leadership background informs a real estate practice built on precision, accountability, and mission-first execution.",
      ],
    },
    {
      slug: "ashley-payne",
      name: "Ashley Payne",
      shortName: "Ashley",
      image: "ashley.jpg",
      phone: "(808) 282-3270",
      email: "ashleykpayne.himre@gmail.com",
      title: "Ashley Payne - Realtor / Property Management Advisor",
      description:
        "Meet Ashley Payne, a Realtor and Property Management Advisor helping families, military families, buyers, sellers, renters, and property owners across Oahu.",
      roleTag: "Realtor / Property Management Advisor",
      cardRole: "Realtor / Property Management Advisor",
      cardMeta: "Property management advisor",
      tagline:
        "Helping families, renters, and property owners feel supported, informed, and confident through every real estate decision.",
      aboutTitle: "About Ashley",
      badges: [
        {
          icon: "star",
          title: "Military Family",
          text: "20 years married to an Army Physician",
        },
        {
          icon: "users",
          title: "Family Focused",
          text: "Mother to 4 boys with firsthand household insight",
        },
        {
          icon: "home",
          title: "Home-Centered",
          text: "Guidance rooted in stability, connection, and belonging",
        },
        {
          icon: "hand",
          title: "Client First",
          text: "Hard work, attention to detail, and steady advocacy",
        },
      ],
      sections: [
        {
          title: "My Approach",
          paragraphs: [
            "My approach to real estate is built on hard work, attention to detail, and treating every transaction as if it were my own. Whether helping first-time buyers, growing families, military families, or sellers preparing for their next chapter, I focus on creating a smooth and personalized experience from start to finish.",
            "I believe clients deserve an agent who listens closely, advocates strongly, and stays present every step of the way. Real estate, for me, has always been about people first. I believe a home is more than just a property - it's where families grow, milestones happen, and memories are created. That's why I approach every client relationship with honesty, communication, and a genuine commitment to helping people make confident decisions that support their goals.",
          ],
        },
        {
          title: "Why I Do This",
          pills: [
            "First-Time Buyers",
            "Growing Families",
            "Military Families",
            "Sellers",
          ],
          paragraphs: [
            "I got into real estate because I love helping people build a future. Homeownership can create stability, opportunity, and generational wealth, and being part of that journey is something I never take lightly. I'm passionate about helping clients not only find the right home, but also feel supported, informed, and cared for throughout the process.",
            "Outside of real estate, I value family, church, community, health, and steady service - all of which shape the way I connect with clients and serve others. My goal is always to build lasting relationships, not just close transactions.",
          ],
        },
      ],
      cta: {
        title: "Let's Talk About Your Next Chapter",
        subtitle: "Call or text Ashley to start planning your move.",
        note: "Support for buyers, sellers, military families, and growing families.",
      },
      about: [
        "I'm Ashley Payne, a wife of 20 years to an Army Physician and mother to 4 boys, which has shaped who I am both personally and professionally. Life in a busy household has taught me patience, resilience, organization, and the importance of creating a home where people feel supported, loved, and connected. Raising four active boys has given me a deep appreciation for the value of family, community, and having a place to truly call home.",
        "These experiences are also what drive my passion for real estate: helping families find the right home for their own memories, milestones, and next chapters. I understand firsthand how important a home is, and I bring that perspective into every relationship and every client experience.",
      ],
      featuredAbout: [],
    },
    {
      slug: "brandie-martin",
      name: "Brandie Martin",
      shortName: "Brandie",
      image: "brandie.jpg",
      phone: "(808) 388-9921",
      email: "brandie.martin.himre@gmail.com",
      title:
        "Brandie Martin - Military Relocation Professional / Hawaii REALTOR",
      description:
        "Meet Brandie Martin, a Navy veteran, Military Relocation Professional, and Hawaii REALTOR helping buyers, sellers, investors, and military families across Oahu.",
      roleTag: "Military Relocation Professional",
      cardRole: "Military Relocation Professional / Hawaii REALTOR",
      cardMeta: "20+ yrs Navy · 10 yrs RE",
      tagline:
        "Navy veteran and Hawaii REALTOR serving buyers, sellers, investors, and military families across Oahu.",
      aboutTitle: "About Brandie",
      badges: [
        {
          icon: "star",
          title: "Navy Veteran",
          text: "More than 20 years of military service",
        },
        {
          icon: "shieldCheck",
          title: "MRP Certified",
          text: "Trained to serve service members and veterans",
        },
        {
          icon: "home",
          title: "Oahu Real Estate",
          text: "Nearly 10 years helping buyers, sellers, and investors",
        },
        {
          icon: "hand",
          title: "Client First",
          text: "Honest guidance, sharp negotiation, and steady execution",
        },
      ],
      sections: [
        {
          title: "Military Relocation",
          paragraphs: [
            "As a Military Relocation Professional (MRP), Brandie is specially trained to serve active-duty service members, veterans, and military families - from understanding the real estate side of VA-financed purchases to managing the tight timelines that come with PCS orders. Having lived that life firsthand, she knows what's at stake and is committed to making every transition as smooth as possible.",
          ],
        },
        {
          title: "Professional Memberships",
          pills: [
            "VA Process Guidance",
            "PCS Timelines",
            "Buyers",
            "Sellers",
            "Investors",
          ],
          paragraphs: [
            "Brandie is a licensed Hawaii REALTOR and proud member of the Hawaii Board of Realtors and National Association of Realtors.",
          ],
        },
      ],
      cta: {
        title: "Let's Talk About Your Move",
        subtitle:
          "Call or text Brandie for military relocation and Oahu real estate guidance.",
        note: "Support for buyers, sellers, investors, and military families.",
      },
      about: [
        "After more than 20 years of service in the Navy, Brandie brought the same discipline, integrity, and mission-focused mindset to a second career in real estate. Now nearly 10 years in, she helps buyers, sellers, and investors across O'ahu with honest guidance, sharp negotiation, and a client-first approach that keeps deals moving from contract to close.",
        "Military life teaches you to listen, adapt, and execute under pressure - and she brings every one of those skills to the closing table.",
      ],
      featuredAbout: [],
    },
    {
      slug: "jim-pickens",
      name: "Jim Pickens",
      shortName: "Jim",
      image: "Jim Pickens.jpg",
      phone: "(808) 861-2136",
      email: "jim.pickens.himre@gmail.com",
      title: "Jim Pickens - Realtor / Military Relocation Professional",
      description:
        "Meet Jim Pickens, a Hawaii Military Realty Realtor, retired Marine Master Sergeant, Military Relocation Professional, and property management advisor.",
      roleTag: "Military Relocation Professional",
      cardRole: "Realtor / Property Management Advisor",
      cardMeta: "Marine MSgt · MRP",
      tagline:
        "Retired Marine Master Sergeant helping buyers, sellers, and property management clients across Oahu.",
      aboutTitle: "About Jim",
      badges: [
        {
          icon: "star",
          title: "Marine Veteran",
          text: "Active duty Marine Master Sergeant, 1990 to 2017",
        },
        {
          icon: "home",
          title: "Licensed Since 2017",
          text: "Hawaii Real Estate license obtained in August 2017",
        },
        {
          icon: "hand",
          title: "Property Management",
          text: "Expanded into property management in 2018",
        },
        {
          icon: "shieldCheck",
          title: "MRP Designation",
          text: "Military Relocation Professional designation earned",
        },
      ],
      sections: [
        {
          title: "Real Estate Experience",
          paragraphs: [
            "Since becoming licensed, Jim has assisted clients with residential sales, purchases, and property management needs. His background gives him a practical understanding of military transitions, timelines, and the importance of clear communication throughout each transaction.",
          ],
        },
        {
          title: "Professional Development",
          pills: [
            "Buyers",
            "Sellers",
            "Property Management",
            "Military Relocation",
          ],
          paragraphs: [
            "Since becoming licensed, Jim has completed over 120 hours of continuing education and earned the Military Relocation Professional (MRP) designation.",
          ],
        },
      ],
      cta: {
        title: "Let's Talk About Your Goals",
        subtitle:
          "Call or text Jim for sales, purchase, and property management guidance.",
        note: "Support for buyers, sellers, property owners, and military families.",
      },
      about: [
        "My name is Jim Pickens, and I am a Realtor with Hawaii Military Realty, Inc., specializing in assisting buyers, sellers, and property management. I served on active duty as a Marine Master Sergeant from 1990 to 2017.",
        "Following my retirement, I obtained my Hawaii Real Estate license in August 2017 and have been assisting clients with sales and purchases ever since. I also expanded into property management in 2018.",
      ],
      featuredAbout: [],
    },
    {
      slug: "tonya-kucic",
      name: "Tonya Kucic",
      sort: 2,
      shortName: "Tonya",
      image: "Tonya Kucic.jpg",
      phone: "(808) 221-3638",
      email: "tonyakucic@yahoo.com",
      title: "Tonya Kucic - Co-Owner / Realtor",
      description:
        "Meet Tonya Kucic, co-owner and full-time agent with Hawaii Military Realty, serving military and civilian clients across Oahu.",
      roleTag: "Co-Owner / Realtor",
      cardRole: "Co-Owner / Realtor",
      cardMeta: "20 yrs real estate | Native Hawaiian",
      tagline:
        "Dedicated Hawaii real estate professional serving military and civilian clients across Oahu with local insight and reliable guidance.",
      aboutTitle: "About Tonya",
      badges: [
        {
          icon: "star",
          title: "Two Decades in Real Estate",
          text: "Helping Oahu buyers and sellers since entering real estate in 2005",
        },
        {
          icon: "shieldCheck",
          title: "Military Family Insight",
          text: "Army dependent and Army spouse with firsthand relocation experience",
        },
        {
          icon: "home",
          title: "Oahu Communities",
          text: "Experience across Ewa Beach, Kapolei, Mililani, and surrounding markets",
        },
        {
          icon: "hand",
          title: "Financial Background",
          text: "Banking experience with Bank of Hawaii and American Express Bank",
        },
      ],
      sections: [
        {
          title: "Oahu Real Estate Service",
          pills: [
            "Buyers",
            "Sellers",
            "Military Families",
            "Civilian Clients",
          ],
          paragraphs: [
            "As a co-owner and full-time agent with Hawaii Military Realty, Inc., Tonya has built a career centered on helping individuals and families navigate the complexities of buying and selling homes across Oahu.",
            "With approximately two decades of experience in the real estate industry, she has developed a reputation for reliability, market knowledge, and personalized service, handling transactions across communities such as Ewa Beach, Kapolei, and Mililani.",
          ],
        },
        {
          title: "Military Family Perspective",
          pills: [
            "Military Dependent",
            "Army Spouse",
            "Relocation",
            "Hawaii Military Realty",
          ],
          paragraphs: [
            "Raised as the daughter of a career U.S. Army infantry soldier, Tonya grew up as a military dependent and experienced life in multiple locations, including the mainland United States, Panama, and Germany.",
            "This upbringing shaped her deep understanding of military life and the unique challenges faced by service members and their families. Later in life, she continued that connection as an Army spouse, further strengthening her insight into relocation, deployment cycles, and the importance of stable housing for military families.",
          ],
        },
        {
          title: "Hawaii Roots and Financial Experience",
          paragraphs: [
            "Tonya is recognized for her strong ties to Hawaii and her identity as a Native Hawaiian, which influences her appreciation for local culture, community, and aina.",
            "Before entering real estate in 2005, she built a background in banking, working with institutions such as Bank of Hawaii and American Express Bank, which helped develop her financial expertise.",
          ],
        },
      ],
      cta: {
        title: "Let's Talk About Your Oahu Goals",
        subtitle:
          "Call or text Tonya for experienced buying and selling guidance.",
        note: "Support for military families, civilian clients, buyers, and sellers.",
      },
      about: [
        "Tonya Kucic is a dedicated real estate professional based in Hawaii, known for her commitment to serving both military and civilian clients through her work with Hawaii Military Realty, Inc. As a co-owner and full-time agent, she has built a career centered on helping individuals and families navigate the complexities of buying and selling homes across Oahu.",
        "With approximately two decades of experience in the real estate industry, she has developed a reputation for reliability, market knowledge, and personalized service, handling transactions across communities such as Ewa Beach, Kapolei, and Mililani.",
        "Raised as the daughter of a career U.S. Army infantry soldier and later an Army spouse, Tonya brings a deep understanding of military life, relocation, deployment cycles, and the importance of stable housing for military families.",
        "Before entering real estate in 2005, she built a background in banking with institutions such as Bank of Hawaii and American Express Bank, helping develop the financial expertise she brings to client guidance today.",
      ],
      featuredAbout: [],
    },
    {
      slug: "jeff-loyd",
      name: "Jeff R. Loyd",
      shortName: "Jeff",
      image: "Jeff Loyd.JPG",
      phone: "(808) 542-6095",
      email: "jeff.loyd.himre@gmail.com",
      title: "Jeff R. Loyd - Broker-in-Charge / Property Management Advisor",
      description:
        "Meet Sergeant First Class (Retired) Jeff R. Loyd, Broker-in-Charge and Property Management Advisor for Hawaii Military Realty.",
      roleTag: "Broker-in-Charge",
      cardRole: "Broker-in-Charge / Property Management Advisor",
      cardMeta: "SFC (Ret.) | ABR | CRS",
      tagline:
        "Sergeant First Class (Retired), Broker-in-Charge, and Property Management Advisor serving Oahu clients with disciplined communication and steady execution.",
      aboutTitle: "About Jeff",
      badges: [
        {
          icon: "star",
          title: "Army Veteran",
          text: "23 years of U.S. Army service, retiring as Sergeant First Class",
        },
        {
          icon: "shieldCheck",
          title: "Broker-in-Charge",
          text: "Broker-in-Charge for Hawaii Military Realty, Inc.",
        },
        {
          icon: "home",
          title: "Property Management",
          text: "Experienced Buyer's Agent, Seller's Agent, and Property Manager",
        },
        {
          icon: "award",
          title: "ABR and CRS",
          text: "Accredited Buyer's Representative and Certified Residential Specialist",
        },
      ],
      sections: [
        {
          title: "Military Service",
          pills: [
            "Sergeant First Class (Retired)",
            "Aviation Maintenance",
            "Senior Enlisted Trainer",
          ],
          paragraphs: [
            "Jeff grew up in the border town of El Paso, Texas. Soon after he graduated from high school, he enlisted in the U.S. Army as a helicopter avionics technician.",
            "While in the Army, Jeff's service spanned the globe. He served the military in far away assignments such as Korea, Japan, Kuwait, Bosnia, Iraq, and Afghanistan, all while honing his managerial skills.",
            "Throughout his 23-year career, Jeff excelled in a wide assortment of positions, including avionics technician, helicopter electrician, squad leader, platoon sergeant, instructor, Division Liaison Officer, and Operations Non-Commissioned Officer in Charge (NCOIC) of a forward-deployed brigade in hostile countries including Iraq and Afghanistan. Jeff also served as the Senior Enlisted Trainer to the Afghan Air Force.",
          ],
        },
        {
          title: "Awards and Education",
          paragraphs: [
            "Jeff's military awards and decorations include the Bronze Star Medal, Meritorious Service Medal (2), Army Commendation Medal (2), Army Achievement Medal (13), Air Force Achievement Medal, Good Conduct Medal (7th Knot), National Defense Service Medal with campaign star, Korean Defense Service Medal, Armed Forces Service Expeditionary Medal with campaign star, Afghanistan Campaign Medal with campaign star, Iraq Campaign Medal with two campaign stars, Global War on Terrorism Service Medal, Armed Forces Service Medal, NATO Medal with campaign star, NCO Professional Development Ribbon (3), Army Service Ribbon, Overseas Service Ribbon (6), Meritorious Unit Citation, Master Air Crewmember Badge, Driver's Badge, and Sharpshooter Marksmanship Badge for M4 and M9.",
            "His education includes a Bachelor of Science in Occupational Education in Business Management with a minor in Marketing from Wayland Baptist University.",
          ],
        },
        {
          title: "Real Estate Leadership",
          pills: [
            "Broker-in-Charge",
            "Property Management Advisor",
            "ABR",
            "CRS",
          ],
          paragraphs: [
            "After retirement, Jeff pursued a license as a Real Estate Salesperson and completed all requirements on April 1, 2013.",
            "In his 12-year career as a Realtor, Jeff has earned the Accredited Buyer's Representative (ABR) designation and Certified Residential Specialist (CRS) designation. He is currently a Broker-in-Charge for Hawaii Military Realty, Inc.",
            "Jeff has served as a Buyer's Agent, Seller's Agent, and Property Manager.",
          ],
        },
        {
          title: "Family and Interests",
          paragraphs: [
            "Jeff is married to his wife, Aiko, and has two children. His oldest son, Nicholas, graduated from Purdue University in 2026, and his youngest son, Colin, is an upcoming senior at Campbell High School.",
            "Jeff's hobbies include golf, photography, and spending time with his family.",
          ],
        },
      ],
      cta: {
        title: "Let's Talk About Your Property Goals",
        subtitle:
          "Call or text Jeff for Oahu buying, selling, and property management guidance.",
        note: "Support for buyers, sellers, property owners, renters, and military families.",
      },
      about: [
        "Sergeant First Class (Retired) Jeff R. Loyd is a Broker-in-Charge and Property Management Advisor for Hawaii Military Realty, Inc.",
        "Jeff grew up in El Paso, Texas, and enlisted in the U.S. Army as a helicopter avionics technician soon after graduating from high school. His 23-year Army career spanned Korea, Japan, Kuwait, Bosnia, Iraq, and Afghanistan, where he served in roles ranging from avionics technician and helicopter electrician to platoon sergeant, instructor, Division Liaison Officer, Operations NCOIC, and Senior Enlisted Trainer to the Afghan Air Force.",
        "After retirement, Jeff pursued a license as a Real Estate Salesperson and completed all requirements on April 1, 2013. In his 12-year career as a Realtor, he has earned the Accredited Buyer's Representative (ABR) designation and Certified Residential Specialist (CRS) designation and is currently a Broker-in-Charge for Hawaii Military Realty, Inc.",
        "Jeff has served as a Buyer's Agent, Seller's Agent, and Property Manager. He is married to his wife, Aiko, and has two children. His hobbies include golf, photography, and spending time with his family.",
      ],
      featuredAbout: [],
    },
    {
      slug: "tami-sego",
      name: "Tami Sego",
      shortName: "Tami",
      image: "Tami Sego.png",
      phone: "(808) 226-2126",
      email: "tami.sego.himre@gmail.com",
      title: "Tami Sego - Realtor",
      description:
        "Meet Tami Sego, a Hawaii Realtor, military spouse, mom, and former educator serving Oahu buyers, sellers, local residents, and military families.",
      roleTag: "Realtor",
      cardRole: "Realtor",
      cardMeta: "Military spouse | Former educator",
      tagline:
        "Hawaii Realtor, military spouse, mom, and former educator helping Oahu clients buy and sell with confidence.",
      aboutTitle: "About Tami",
      badges: [
        {
          icon: "star",
          title: "Former Educator",
          text: "20 years teaching in Hawaii public schools",
        },
        {
          icon: "shieldCheck",
          title: "Military Spouse",
          text: "Firsthand understanding of PCS moves and military family transitions",
        },
        {
          icon: "home",
          title: "Oahu Guidance",
          text: "Serving buyers and sellers across Oahu's unique real estate market",
        },
        {
          icon: "hand",
          title: "Client First",
          text: "Calm communication, careful listening, and personalized guidance",
        },
      ],
      sections: [
        {
          title: "Client-First Guidance",
          pills: [
            "Buyers",
            "Sellers",
            "PCS Moves",
            "Local Residents",
          ],
          paragraphs: [
            "Tami believes informed clients make the best decisions. She takes the time to listen, understand each client's unique goals, and provide personalized guidance every step of the way.",
            "As a military spouse, she understands firsthand that moving is about more than finding a house - it's about finding a place to truly call home. Whether assisting military families with PCS moves to or from Oahu or helping local residents navigate the unique Hawaii real estate market, she is committed to creating a seamless and rewarding experience for her clients.",
          ],
        },
        {
          title: "Relationships Beyond Closing",
          paragraphs: [
            "Known for her genuine care and dedication to lasting relationships, Tami strives to be a trusted resource long after closing day.",
            "When she's not helping clients, you can find her outrigger canoe paddling, discovering local coffee shops, or spending time with her family.",
          ],
        },
      ],
      cta: {
        title: "Let's Talk About Your Oahu Move",
        subtitle:
          "Call or text Tami for calm, informed buying and selling guidance.",
        note: "Support for military families, local residents, buyers, and sellers.",
      },
      about: [
        "Proudly serving Oahu, Tami Sego is a Hawaii Realtor, military spouse, mom, and former educator who is passionate about helping clients buy and sell real estate with confidence. After 20 years teaching in Hawaii public schools, she brings exceptional communication and a calm, client-first approach to the home buying and selling process.",
        "Tami believes informed clients make the best decisions. She takes the time to listen, understand each client's unique goals, and provide personalized guidance every step of the way. As a military spouse, she understands firsthand that moving is about more than finding a house - it's about finding a place to truly call home.",
        "Whether assisting military families with PCS moves to or from Oahu or helping local residents navigate the unique Hawaii real estate market, she is committed to creating a seamless and rewarding experience for her clients.",
      ],
      featuredAbout: [],
    },
  ],
};

if (typeof module !== "undefined") {
  module.exports = CONTENT;
}

if (typeof window !== "undefined") {
  window.HMR_CONTENT = CONTENT;
}
