/* ==========================================================================
   site-content.js — ALL editable site content lives here.

   Edit this file to change copy, prices, projects, and contact details.
   You should never need to open an .html file to change wording.

   This is a plain script that defines one global: SITE.
   It is loaded with <script src="data/site-content.js"></script> BEFORE
   js/render.js on every page.

   >>> Anything tagged PLACEHOLDER is invented and must be replaced. <<<
   ========================================================================== */

const SITE = {

  /* ---------------------------------------------------------------------
     BUSINESS IDENTITY
     PLACEHOLDER: business name is invented. Change `name` and `nameShort`
     here and it updates across every page, the footer, and the <title>s
     (titles are in the HTML — search/replace those separately, they're
     static for SEO reasons).
     --------------------------------------------------------------------- */
  business: {
    name: 'Northampton Web Co.',            // PLACEHOLDER
    nameShort: 'NWC',                        // PLACEHOLDER — used in the logo mark
    owner: 'Nick',
    role: 'Web developer & automation builder',
    town: 'Northampton, PA',
    region: 'the Lehigh Valley',

    // PLACEHOLDER: replace with the address you actually want published.
    email: 'hello@example.com',
    // PLACEHOLDER: replace or set to null to hide the phone link everywhere.
    phone: '(610) 555-0142',

    // Towns listed in the footer. Helps local search. Add/remove freely.
    serviceArea: [
      'Northampton', 'Allentown', 'Bethlehem', 'Easton', 'Nazareth',
      'Catasauqua', 'Whitehall', 'Bath', 'Emmaus', 'Coplay'
    ]
  },

  /* ---------------------------------------------------------------------
     HOME PAGE HERO
     --------------------------------------------------------------------- */
  hero: {
    // The one-line value proposition. Keep it under ~12 words.
    headline: 'Websites and automation for Lehigh Valley businesses that do real work.',
    sub: 'I build fast, mobile-first sites and the small automations behind them — ' +
         'online booking, review requests, appointment reminders. One person, ' +
         'local, direct. No agency retainer, no account manager, no runaround.',
    // Short proof points under the hero. Keep to three.
    stats: [
      { value: 'Under 3s', label: 'Load time target on 4G' },
      { value: '2–3 wks',  label: 'Typical build, start to live' },
      { value: '1',        label: 'Person you talk to. Me.' }
    ]
  },

  /* ---------------------------------------------------------------------
     SERVICES
     Used on Home (summary) and Services (full detail).

     PLACEHOLDER: every price below is invented. Replace `priceFrom` and
     `priceNote` with your real numbers before launch.
     --------------------------------------------------------------------- */
  services: [
    {
      id: 'websites',
      num: '01',
      title: 'Website design & build',
      // One line, shown on the Home page card.
      teaser: 'A fast, mobile-first site that loads in under three seconds and ' +
              'tells people what you do, where you are, and how to reach you.',
      // Longer copy, shown on the Services page.
      body: 'Most of the shops I work with either have no website or have one ' +
            'built in 2011 that breaks on a phone. That costs you jobs, because ' +
            'the first thing someone does when they need a mechanic or a roofer ' +
            'is search on their phone and call whoever looks like they are still ' +
            'in business.\n\n' +
            'I build the whole thing by hand — no page builder, no bloated theme. ' +
            'That means it loads fast, it works on every phone, and there is no ' +
            'monthly platform fee waiting for you.',
      includes: [
        'Mobile-first design, built for phones before desktops',
        'Up to 5 pages (home, services, about, gallery, contact)',
        'Contact form that routes straight to your email or phone',
        'Google Business Profile setup and cleanup',
        'Local search basics — schema, page titles, map listing',
        'Hosting setup on your own domain',
        'You own the domain, the code, and the accounts. Not me.'
      ],
      priceFrom: '$900',                                        // PLACEHOLDER
      priceNote: 'flat, one time. Most builds land between $900 and $2,400 ' +
                 'depending on page count.',                    // PLACEHOLDER
      timeline: '2–3 weeks',                                    // PLACEHOLDER
      accent: 'orange',
      pattern: 'grid'
    },
    {
      id: 'automation',
      num: '02',
      title: 'Business automation',
      teaser: 'The follow-up work you keep meaning to do — booking, reminders, ' +
              'review requests — handled automatically, every time.',
      body: 'This is usually the part that actually makes you money. A no-show ' +
            'costs you a full appointment slot. A customer who was happy but ' +
            'never got asked for a review costs you the next five customers who ' +
            'read your Google page.\n\n' +
            'I set up the small, boring systems that handle it: a booking page ' +
            'that fills your calendar without a phone call, a text reminder the ' +
            'day before, a review request the day after. You approve the wording ' +
            'once, then it runs on its own.',
      includes: [
        'Online booking page wired to your real calendar',
        'Automated appointment reminders by text or email',
        'Automatic review requests after a completed job',
        'Contact form routing — right message, right person, right away',
        'Quote and invoice request intake',
        'Written handover doc so you can change the wording yourself'
      ],
      priceFrom: '$450',                                        // PLACEHOLDER
      priceNote: 'per workflow, one time. Third-party tool fees (if any) are ' +
                 'yours and I will tell you the cost up front.',// PLACEHOLDER
      timeline: '3–7 days',                                     // PLACEHOLDER
      accent: 'blue',
      pattern: 'flow'
    },
    {
      id: 'tools',
      num: '03',
      title: 'Custom internal tools',
      teaser: 'A small app that does the one specific thing your business needs ' +
              'and no off-the-shelf software does properly.',
      body: 'Every shop has one process running on a clipboard, a whiteboard, or ' +
            'a spreadsheet that three people have their own copy of. Job tracking. ' +
            'Parts inventory. Which truck has which equipment. A quote calculator ' +
            'you currently do in your head.\n\n' +
            'I build a small tool that does exactly that, and nothing else. No ' +
            'per-seat license, no features you will never touch, no forced ' +
            'migration when the vendor changes their pricing.',
      includes: [
        'A scoping call where I watch how you actually do it now',
        'A working prototype you can try before I finish it',
        'Built for the device you will use it on — usually a phone in a bay',
        'Your data exportable to a spreadsheet at any time',
        'Training session with whoever will use it daily',
        '30 days of fixes after handover, included'
      ],
      priceFrom: '$1,200',                                      // PLACEHOLDER
      priceNote: 'scoped per project after a free call. I will not quote a ' +
                 'number before I understand the job.',         // PLACEHOLDER
      timeline: '2–5 weeks',                                    // PLACEHOLDER
      accent: 'green',
      pattern: 'stack'
    }
  ],

  /* ---------------------------------------------------------------------
     HOW IT WORKS — the process strip on the Home page.
     --------------------------------------------------------------------- */
  process: [
    {
      num: '01',
      title: 'A 20-minute call',
      body: 'Free. You tell me what the business does and what is not working. ' +
            'I tell you straight whether I can help and roughly what it costs.'
    },
    {
      num: '02',
      title: 'A fixed quote',
      body: 'In writing, before anything starts. One number, what it covers, ' +
            'and when it will be done. It does not move unless you change scope.'
    },
    {
      num: '03',
      title: 'I build it',
      body: 'You see it while it is being built, not at the end. Two check-ins, ' +
            'and you can tell me it is wrong at any point.'
    },
    {
      num: '04',
      title: 'You own it',
      body: 'Domain, hosting, accounts, code — all in your name. No monthly ' +
            'lock-in, no holding your site hostage. Leave whenever you want.'
    }
  ],

  /* ---------------------------------------------------------------------
     PORTFOLIO / WORK
     Add a project by appending an object here. Nothing else to edit.

     >>> PLACEHOLDER: ALL SIX PROJECTS BELOW ARE INVENTED. <<<
     They exist so the layout can be judged. Delete every one you have not
     actually built before this site goes live — shipping fictional client
     work is the fastest way to lose a deal.

     Fields:
       title     — project or client name
       category  — 'Website' | 'Automation' | 'Custom tool'  (drives filters)
       year      — string
       summary   — one or two sentences
       result    — the outcome line, shown in mono. Keep it concrete.
       tags      — array of short strings
       url       — live link, or null for no link
       accent    — 'orange' | 'blue' | 'green' | 'violet' | 'clay' | 'slate'
       pattern   — 'grid' | 'flow' | 'stack' | 'arc' | 'bars' | 'pulse'
                   (drives the generated SVG cover — there are no photos)
     --------------------------------------------------------------------- */
  projects: [
    {
      title: 'Keller Auto & Tire',                              // PLACEHOLDER
      category: 'Website',
      year: '2026',
      summary: 'Five-page site for a two-bay repair shop that had been running ' +
               'on a Facebook page. Built around the two things people search ' +
               'for: hours and a phone number.',
      result: 'Calls from search up, no more "are you still open?" messages',
      tags: ['5 pages', 'Click-to-call', 'Google Business'],
      url: null,
      accent: 'orange',
      pattern: 'grid'
    },
    {
      title: 'Beers Electric',                                  // PLACEHOLDER
      category: 'Automation',
      year: '2026',
      summary: 'Booking page plus automatic text reminders for a residential ' +
               'electrician who was losing an appointment a week to no-shows.',
      result: 'No-shows down from ~4 a month to under 1',
      tags: ['Cal.com', 'SMS reminders', 'Calendar sync'],
      url: null,
      accent: 'blue',
      pattern: 'pulse'
    },
    {
      title: 'Lehigh Gutter Works',                             // PLACEHOLDER
      category: 'Website',
      year: '2025',
      summary: 'Rebuild of a site last touched in 2013. Same content, ' +
               'restructured so it works on a phone and loads on job-site data.',
      result: '11s → 1.4s load on mobile',
      tags: ['Rebuild', 'Mobile-first', 'No CMS fees'],
      url: null,
      accent: 'green',
      pattern: 'arc'
    },
    {
      title: 'Fogel & Sons Landscaping',                        // PLACEHOLDER
      category: 'Custom tool',
      year: '2025',
      summary: 'Quote calculator the crew uses on a phone in the truck. Enter ' +
               'square footage and material, get a number and a printable quote.',
      result: 'Quotes out same-day instead of same-week',
      tags: ['Internal app', 'Offline-capable', 'PDF export'],
      url: null,
      accent: 'clay',
      pattern: 'bars'
    },
    {
      title: 'Nazareth Dental Arts',                            // PLACEHOLDER
      category: 'Automation',
      year: '2025',
      summary: 'Automated review requests sent the day after an appointment, ' +
               'with the wording the office manager wrote herself.',
      result: '9 Google reviews → 74 in five months',
      tags: ['Review flow', 'Email + SMS', 'Handover doc'],
      url: null,
      accent: 'violet',
      pattern: 'flow'
    },
    {
      title: 'Coplay Collision',                                // PLACEHOLDER
      category: 'Custom tool',
      year: '2024',
      summary: 'Job board that replaced a whiteboard. Every car in the shop, ' +
               'what stage it is at, and who is waiting on a part.',
      result: 'Whiteboard retired; status calls dropped off',
      tags: ['Job tracking', 'Shop-floor tablet', 'CSV export'],
      url: null,
      accent: 'slate',
      pattern: 'stack'
    }
  ],

  /* ---------------------------------------------------------------------
     TRUST BLOCK — deliberately NOT testimonials.

     There are no real testimonials yet, and inventing them on a site whose
     entire job is earning trust is a bad trade. These are commitments you
     can actually keep instead. Replace this block with real quotes the
     moment you have two or three — the layout is built to take either.
     --------------------------------------------------------------------- */
  commitments: [
    {
      title: 'You own everything',
      body: 'Domain, hosting account, code, and every third-party login is in ' +
            'your name from day one. If you fire me, you keep working.'
    },
    {
      title: 'The quote is the price',
      body: 'Fixed, in writing, before I start. It changes only if you ask for ' +
            'something that was not in it, and I tell you before I do the work.'
    },
    {
      title: 'You talk to me',
      body: 'Not a project manager, not a ticket queue. Same phone number, ' +
            'same person, from the first call through a year later.'
    },
    {
      title: 'No monthly ransom',
      body: 'Hosting a static site costs near nothing and I will show you how. ' +
            'If you want me on retainer for changes, that is optional and cheap.'
    }
  ],

  /* ---------------------------------------------------------------------
     ABOUT PAGE
     The About prose and the "short version" table are NOT here on purpose.
     They are static markup in about.html — that page is long-form writing,
     not a repeated list, and keeping it in HTML means it still reads with
     JavaScript turned off. Edit about.html directly.
     --------------------------------------------------------------------- */

  /* ---------------------------------------------------------------------
     BOOK PAGE
     --------------------------------------------------------------------- */
  book: {
    heading: 'Book a 20-minute call',
    sub: 'Free, no pitch deck. Tell me what the business does and what is ' +
         'annoying you. I will tell you if I can help and what it would cost.',
    expect: [
      'What you do and who your customers are',
      'What happens now when someone tries to reach you',
      'What you have already tried, and why it did not stick',
      'A rough number before we hang up'
    ]
  },

  /* ---------------------------------------------------------------------
     FAQ — shown on Services. Answers objections before the call.
     --------------------------------------------------------------------- */
  faq: [
    {
      q: 'Why are you cheaper than an agency?',
      a: 'Because I do not have their costs. No office, no sales team, no ' +
         'project managers between you and the person writing the code. You are ' +
         'paying for the build, not the overhead around it.'
    },
    {
      q: 'What does it cost to keep the site running?',
      a: 'A domain is roughly $15 a year. Hosting for a site like this is free ' +
         'or close to it, and I will set it up in your name and show you the ' +
         'bill. There is no platform fee coming from me.'
    },
    {
      q: 'I already have a website. Can you fix it instead?',
      a: 'Sometimes. If it is on a platform that is fighting you, a rebuild is ' +
         'usually cheaper than the repair. I will look at it and tell you which ' +
         'one you are in, for free.'
    },
    {
      q: 'Do I have to sign a contract?',
      a: 'A one-page agreement with the scope, the price, and the date. That is ' +
         'to protect both of us. There is no minimum term and no auto-renewal.'
    },
    {
      q: 'What if I need a change six months later?',
      a: 'Email me. Small changes are usually free or an hourly charge I will ' +
         'quote before doing. You can also edit the content yourself — I hand ' +
         'over a doc showing how.'
    },
    {
      q: 'Do you work outside the Lehigh Valley?',
      a: 'Yes, but local is where I am most useful. Being able to show up in ' +
         'person is half of why this works.'
    }
  ],

  /* ---------------------------------------------------------------------
     GLOBAL CTA — appears at the bottom of most pages.
     --------------------------------------------------------------------- */
  cta: {
    heading: 'Still reading? Let’s talk.',
    body: 'Twenty minutes, no cost, no pitch. Worst case you get a free ' +
          'opinion on your website from someone who builds them.',
    button: 'Book a call'
  }
};
