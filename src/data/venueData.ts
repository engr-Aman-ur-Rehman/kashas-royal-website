/**
 * VENUE FACT SHEET — the single source of truth for every fact, figure and
 * piece of repeated copy on the site. Edit here and every page updates.
 *
 * BUSINESS RULES (please keep when editing):
 *   1. No public pricing. Never add prices, currency amounts or rates of any kind.
 *   2. The phone number may appear anywhere. The email address and Instagram
 *      handle live in `footerOnlyContact` and are rendered by the Footer only.
 */

export const venue = {
  name: "Kashas Royal",
  tagline: "Catering • Venue • Decor",
  phone: {
    display: "07475 515813",
    href: "tel:+447475515813",
  },
  address: {
    street: "12 Bridge Close",
    town: "Romford",
    postcode: "RM7 0AU",
    region: "Greater London",
    oneLine: "12 Bridge Close, Romford, RM7 0AU",
  },
  hours: {
    days: "Monday – Sunday",
    daysShort: "Mon – Sun",
    times: "11:00 AM – 12:00 AM",
    note: "Midnight finish",
  },
  sessions: {
    daytime: "11:00 AM – 5:00 PM",
    evening: "6:00 PM – 12:00 AM",
  },
  station: {
    name: "Romford Station",
    distance: "0.2 miles",
    walk: "approx. 4-minute walk",
  },
  maxGuests: 400,
  map: {
    embedUrl: "https://www.google.com/maps?q=12+Bridge+Close,+Romford,+RM7+0AU&z=16&output=embed",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=12+Bridge+Close,+Romford,+RM7+0AU",
  },
  menuPdf: "/downloads/kashas-royal-menu.pdf",
} as const;

/** FOOTER ONLY — do not import this anywhere except components/layout/Footer.tsx. */
export const footerOnlyContact = {
  email: "contact@kashasroyal.com",
  instagram: {
    handle: "@royalkashas",
    url: "https://www.instagram.com/royalkashas/?hl=en",
  },
} as const;

export const group = {
  kashasEvents: {
    name: "Kashas Events",
    url: "https://kashasevents.com",
    domain: "kashasevents.com",
    role: "In-House & Outdoor Catering",
    description:
      "Our dedicated in-house and outdoor catering company, delivering authentic South Asian and bespoke multicultural cuisine at Kashas Royal or at external venues across London and Essex.",
  },
  sisterVenues: {
    names: ["The Imperial Banqueting Hall", "Kashas Suite Croydon"],
    url: "https://ihbanqueting.com",
    domain: "ihbanqueting.com",
    location: "Croydon, South London",
    description:
      "Kashas Royal is operated alongside The Imperial Banqueting Hall and Kashas Suite Croydon, bringing decades of trusted London hospitality to East London and Essex.",
  },
} as const;

/* ------------------------------------------------------------------
   Navigation
------------------------------------------------------------------- */
export const routes = {
  home: "/",
  venue: "/the-venue",
  events: "/events-packages",
  gallery: "/gallery",
  visit: "/visit-us",
  enquire: "/enquire",
} as const;

export const navLinks = [
  { label: "The Venue", to: routes.venue },
  { label: "Events & Packages", to: routes.events },
  { label: "Gallery", to: routes.gallery },
  { label: "Visit Us", to: routes.visit },
] as const;

export const footerExploreLinks = [
  { label: "Home", to: routes.home },
  { label: "The Venue", to: routes.venue },
  { label: "Events & Packages", to: routes.events },
  { label: "Gallery", to: routes.gallery },
  { label: "Visit Us", to: routes.visit },
  { label: "Make an Enquiry", to: routes.enquire },
] as const;

/* ------------------------------------------------------------------
   Per-page titles and SEO descriptions
------------------------------------------------------------------- */
export const pageMeta = {
  home: {
    title: "Kashas Royal | Banqueting & Event Venue in Romford",
    description:
      "A royal canvas for extraordinary celebrations. Kashas Royal is Romford's customisable banqueting hall for up to 400 guests, with in-house catering, décor packages and flexible dry hire.",
  },
  venue: {
    title: "The Venue | Capacities, Layouts & Facilities | Kashas Royal",
    description:
      "Explore the Kashas Royal main banqueting hall in Romford: seven layouts for up to 400 guests, crystal chandeliers, LED mood lighting, a private changing room and step-free access.",
  },
  events: {
    title: "Events & Packages | Weddings, Celebrations & Corporate | Kashas Royal",
    description:
      "South Asian and multicultural weddings, private celebrations and corporate events at Kashas Royal. Wedding Full Package, Gold, Diamond and Platinum décor, dry hire and catering by Kashas Events.",
  },
  gallery: {
    title: "Gallery | Weddings, Décor & Celebrations | Kashas Royal",
    description:
      "Browse weddings, décor, private celebrations and dining at Kashas Royal, the customisable banqueting hall in Romford.",
  },
  visit: {
    title: "Visit Us | 12 Bridge Close, Romford | Kashas Royal",
    description:
      "Find Kashas Royal at 12 Bridge Close, Romford, RM7 0AU. 0.2 miles from Romford Station on the Elizabeth line, with step-free access and free on-street parking nearby.",
  },
  enquire: {
    title: "Enquire & FAQs | Request a Bespoke Quote | Kashas Royal",
    description:
      "Enquire about weddings, celebrations and corporate events at Kashas Royal, Romford. Request a bespoke quote, book a private viewing and read our venue policies.",
  },
  notFound: {
    title: "Page Not Found | Kashas Royal",
    description: "The page you were looking for could not be found.",
  },
} as const;

/* ------------------------------------------------------------------
   Trust signals
------------------------------------------------------------------- */
export const trustSignals = [
  {
    id: "hygiene",
    value: "5 / 5",
    stars: false,
    label: "Food Hygiene Rating",
    detail: "“Very Good” — Havering Council",
  },
  {
    id: "tagvenue",
    value: "4.8",
    stars: true,
    label: "Trusted Tagvenue Partner",
    detail: "Tagvenue rating · 96% response rate",
  },
  {
    id: "google",
    value: "4.4",
    stars: true,
    label: "Google Reviews",
    detail: "Across 130+ reviews",
  },
] as const;

/* ------------------------------------------------------------------
   Client reviews

   PLACEHOLDER REVIEWS — the wording below is illustrative sample copy, not
   real client feedback. Replace each entry with a genuine review that the
   client has agreed to share, then set REVIEWS_ARE_PLACEHOLDERS to false to
   remove the "sample" note shown beneath the reviews.
------------------------------------------------------------------- */
export const REVIEWS_ARE_PLACEHOLDERS = true;

export interface Review {
  quote: string;
  /** Use a first name or a generic description only. */
  attribution: string;
  occasion: string;
}

export const reviews: Review[] = [
  {
    // PLACEHOLDER — SWAP WITH A REAL CLIENT REVIEW
    quote:
      "The hall was transformed beyond anything we had pictured. Our families are still talking about the welcome, the food and how calmly the whole day ran.",
    attribution: "Bride & Groom",
    occasion: "Walima Reception",
  },
  {
    // PLACEHOLDER — SWAP WITH A REAL CLIENT REVIEW
    quote:
      "We chose dry hire so we could bring our own caterer and DJ. The team were clear about every detail from the first viewing, and nothing was left to chance.",
    attribution: "Family Host",
    occasion: "Engagement Celebration",
  },
  {
    // PLACEHOLDER — SWAP WITH A REAL CLIENT REVIEW
    quote:
      "Step-free access mattered for our grandparents, and the walk from the station made it easy for everyone. A beautiful room and a genuinely attentive team.",
    attribution: "Birthday Host",
    occasion: "Milestone Birthday",
  },
  {
    // PLACEHOLDER — SWAP WITH A REAL CLIENT REVIEW
    quote:
      "The starters disappeared within minutes. Service was warm, polished and perfectly timed, and the lighting made the room feel entirely our own.",
    attribution: "Event Organiser",
    occasion: "Company Gala Dinner",
  },
  {
    // PLACEHOLDER — SWAP WITH A REAL CLIENT REVIEW
    quote:
      "From the consultation to the final farewell, we felt looked after. The décor team understood our traditions and brought every idea to life.",
    attribution: "Bride’s Family",
    occasion: "Mehndi Evening",
  },
];

/* ------------------------------------------------------------------
   Home: four value pillars
------------------------------------------------------------------- */
export const valuePillars = [
  {
    title: "Up to 400 Guests in Grand Style",
    text: "One expansive ground-floor hall, arranged across seven official layouts, from standing receptions to banquet dining.",
  },
  {
    title: "Bespoke Packages & Flexible Dry Hire",
    text: "Choose our all-inclusive Wedding Full Package, a signature décor tier, or a blank canvas with complete vendor freedom.",
  },
  {
    title: "In-House Catering by Kashas Events",
    text: "Authentic South Asian and bespoke multicultural cuisine from our own catering company, with a 5 / 5 Food Hygiene Rating.",
  },
  {
    title: "Ground-Floor Access, 0.2 Miles from Romford Station",
    text: "Step-free throughout, and around four minutes on foot from the Elizabeth line and National Rail.",
  },
] as const;

/* ------------------------------------------------------------------
   Capacities: the seven official layouts
------------------------------------------------------------------- */
export type LayoutId = "standing" | "dining" | "theatre" | "classroom" | "boardroom" | "ushape" | "cabaret";

export interface CapacityLayout {
  id: LayoutId;
  /** Short label for the switcher button. */
  label: string;
  name: string;
  capacity: number;
  summary: string;
  idealFor: string[];
}

export const capacityLayouts: CapacityLayout[] = [
  {
    id: "standing",
    label: "Standing",
    name: "Standing Reception",
    capacity: 400,
    summary:
      "The hall at its most open. Guests circulate freely beneath the chandeliers, with the floor kept clear for mingling, entrances and celebration.",
    idealFor: ["Wedding receptions", "Networking evenings", "Festive celebrations"],
  },
  {
    id: "dining",
    label: "Dining",
    name: "Banquet Dining",
    capacity: 350,
    summary:
      "Round tables set across the hall for generous, seated hospitality, with a clear line of sight to the stage and top table.",
    idealFor: ["Walima and wedding banquets", "Gala dinners", "Milestone birthdays"],
  },
  {
    id: "theatre",
    label: "Theatre",
    name: "Theatre Style",
    capacity: 400,
    summary:
      "Rows of seating facing a single focal point, keeping every guest turned towards the stage, speaker or ceremony.",
    idealFor: ["Conferences", "Award ceremonies", "Community seminars"],
  },
  {
    id: "classroom",
    label: "Classroom",
    name: "Classroom Style",
    capacity: 400,
    summary:
      "Rows of tables and chairs facing the front, giving every delegate a surface for notes, devices and refreshments.",
    idealFor: ["Training days", "Seminars", "Workshops"],
  },
  {
    id: "boardroom",
    label: "Boardroom",
    name: "Boardroom",
    capacity: 200,
    summary:
      "Guests seated around a central table arrangement, facing one another for focused, face-to-face discussion.",
    idealFor: ["Executive meetings", "Round-table discussions", "Committee gatherings"],
  },
  {
    id: "ushape",
    label: "U-Shaped",
    name: "U-Shaped",
    capacity: 200,
    summary:
      "Tables arranged in an open U, so a presenter can step into the centre while delegates keep sight of each other.",
    idealFor: ["Presentations", "Interactive workshops", "Briefings"],
  },
  {
    id: "cabaret",
    label: "Cabaret",
    name: "Cabaret",
    capacity: 180,
    summary:
      "Round tables seated on an open arc, so every guest dines and faces the stage without turning a chair.",
    idealFor: ["Award dinners", "Staged entertainment", "Charity evenings"],
  },
];

/* ------------------------------------------------------------------
   Spaces and facilities
------------------------------------------------------------------- */
export const hallFeatures = [
  { id: "walls", title: "Pristine white walls", text: "A customisable backdrop for any colour story or theme." },
  { id: "chandeliers", title: "Grand crystal chandeliers", text: "A sense of occasion from the moment guests arrive." },
  { id: "lighting", title: "Customisable LED mood lighting", text: "Set the tone of the room to suit your occasion." },
  { id: "flooring", title: "Elegant carpeted flooring", text: "Soft underfoot across the whole ground-floor hall." },
  { id: "air", title: "Fully air-conditioned", text: "Comfortable for every guest, in every season." },
  { id: "wifi", title: "High-speed Wi-Fi", text: "For presentations, livestreams and sharing the moment." },
  { id: "mirrors", title: "Full-length mirrors", text: "For final touches before the grand entrance." },
  { id: "access", title: "Step-free throughout", text: "Wheelchair accessible across the entire venue." },
] as const;

export const changingRoomFeatures = [
  "One private changing room",
  "Ideal as a bridal or groom suite",
  "A calm preparation room for VIP hosts",
  "Part of every Simple Dry Hire booking",
] as const;

export const specifications = [
  {
    id: "access",
    title: "Accessibility",
    items: [
      "Step-free, ground-floor wheelchair access throughout the entire venue",
      "No dedicated accessible parking bay on-site",
    ],
  },
  {
    id: "music",
    title: "Music & Sound",
    items: [
      "Bring your own DJ, music and entertainment",
      "No in-house PA system or speakers are provided",
    ],
  },
  {
    id: "timings",
    title: "Timings",
    items: [
      "Noise restriction applies after 11:00 PM",
      "All events conclude by 12:00 AM (midnight)",
      "Daytime 11:00 AM – 5:00 PM or evening 6:00 PM – 12:00 AM sessions, plus full-day dry hire options",
    ],
  },
  {
    id: "parking",
    title: "Parking",
    items: ["Free on-street parking available nearby", "Dedicated parking attendant can be arranged on request"],
  },
  {
    id: "catering",
    title: "Catering & Drinks",
    items: [
      "In-house catering by Kashas Events",
      "External caterers welcome with no buyout fee",
      "On-site kitchen facilities are not available for external or guest use",
      "The venue does not serve alcohol; bring your own with zero corkage fee",
    ],
  },
  {
    id: "comfort",
    title: "Comfort & Connectivity",
    items: ["Fully air-conditioned", "High-speed Wi-Fi", "Full-length mirrors", "One private changing room"],
  },
  {
    id: "addons",
    title: "Optional Add-Ons",
    items: [
      "Dedicated dance floor",
      "Custom photography and event backdrops",
      "Dedicated parking attendant",
      "Hall cleaning service",
    ],
  },
] as const;

/* ------------------------------------------------------------------
   Event types
------------------------------------------------------------------- */
export type EventTypeId = "weddings" | "private" | "corporate";

export interface EventType {
  id: EventTypeId;
  /** Label for the Home page showcase. */
  homeLabel: string;
  title: string;
  eyebrow: string;
  summary: string;
  paragraphs: string[];
  occasions: string[];
  cta: { label: string; to: string };
}

export const eventTypes: EventType[] = [
  {
    id: "weddings",
    homeLabel: "Weddings",
    title: "South Asian & Multicultural Weddings",
    eyebrow: "Weddings",
    summary:
      "Nikkah, Mehndi, Walima, Hindu, Sikh, African and multicultural receptions, tailored to cultural traditions and grand family hospitality.",
    paragraphs: [
      "A wedding is rarely a single moment. It is a gathering of generations, a sequence of rituals and a table that must welcome everyone. Kashas Royal is shaped for exactly that scale of hospitality, seating up to 350 guests for banquet dining or receiving up to 400 standing.",
      "Our white hall takes on the character of your celebration, from a first entrance beneath the chandeliers to a stage styled around your traditions. Choose the all-inclusive Wedding Full Package, add a signature décor tier, or bring your own trusted suppliers with dry hire.",
    ],
    occasions: ["Nikkah", "Mehndi", "Walima", "Hindu weddings", "Sikh weddings", "African weddings", "Multicultural receptions"],
    cta: { label: "Enquire About Your Wedding", to: "/enquire?type=wedding" },
  },
  {
    id: "private",
    homeLabel: "Private Celebrations",
    title: "Private Celebrations",
    eyebrow: "Birthdays, Baby Showers & Engagements",
    summary:
      "Milestone birthdays, baby showers, engagements, anniversaries, family galas and festive celebrations, hosted with warmth and composure.",
    paragraphs: [
      "The occasions that mark a family's story deserve a room that rises to them. Whether it is a first birthday, a golden anniversary or an engagement that brings two families together, the hall adapts to your guest list and your theme.",
      "Style the space yourself with complete vendor freedom, or let our décor team build the backdrop, table styling and lighting around your vision. A private changing room keeps the hosts composed and close at hand.",
    ],
    occasions: ["Milestone birthdays", "Baby showers", "Engagements", "Anniversaries", "Family galas", "Festive celebrations"],
    cta: { label: "Plan a Private Celebration", to: "/enquire?type=birthday" },
  },
  {
    id: "corporate",
    homeLabel: "Corporate Events & Galas",
    title: "Corporate Functions & Gala Dinners",
    eyebrow: "Corporate Events",
    summary:
      "Conferences, executive meetings, gala dinners, award ceremonies, community seminars and Christmas parties, a short walk from the Elizabeth line.",
    paragraphs: [
      "A clear, air-conditioned hall with high-speed Wi-Fi and seven official layouts, from theatre and classroom formats for up to 400 delegates to boardroom and U-shaped arrangements for up to 200.",
      "Move from a daytime programme to an evening awards dinner without leaving the room, with catering by Kashas Events or your own appointed caterer. Romford Station is 0.2 miles away, keeping arrivals from Central London and Essex straightforward.",
    ],
    occasions: ["Conferences", "Executive meetings", "Gala dinners", "Award ceremonies", "Community seminars", "Christmas parties"],
    cta: { label: "Discuss a Corporate Event", to: "/enquire?type=corporate" },
  },
];

/* ------------------------------------------------------------------
   Hire options (no prices)
------------------------------------------------------------------- */
export const hireOptions = [
  {
    id: "wedding-full",
    eyebrow: "All-Inclusive",
    title: "Wedding Full Package",
    summary:
      "Everything in place for a seamless wedding day: the hall, the welcome, the menu and the service, arranged by one team.",
    inclusions: [
      "Exclusive hall hire: 11:00 AM – 5:00 PM or 6:00 PM – 12:00 AM",
      "Welcome drinks on arrival",
      "Authentic 3-course menu with professional waiter service",
      "Table décor",
      "Crockery and cutlery",
      "Rice, naan, raita, mint sauce and green salad",
      "3 varieties of soft drinks",
    ],
    cta: { label: "Enquire for Availability & Quote", to: "/enquire?package=wedding-full" },
  },
  {
    id: "dry-hire",
    eyebrow: "Blank Canvas",
    title: "Simple Dry Hire",
    summary:
      "The hall and changing room, exclusively yours, with complete freedom to bring the suppliers you already trust.",
    inclusions: [
      "Exclusive hire of the customisable main hall and private changing room",
      "Bring your own external caterers, with zero buyout fee",
      "Bring your own alcohol free of charge, with zero corkage fee",
      "Bring your own DJ, entertainment and styling",
      "Daytime, evening and full-day hire options",
    ],
    cta: { label: "Enquire for Dry Hire", to: "/enquire?package=dry-hire" },
  },
] as const;

export const decorTiers = [
  {
    id: "gold",
    name: "Gold Package",
    character: "Classic elegance",
    summary: "A refined, coordinated look that lets the hall and your guests take centre stage.",
    inclusions: [
      "Classic, elegant styling throughout",
      "Coordinated table styling",
      "Refined focal backdrop",
      "Warm ambient mood lighting",
    ],
    enquiryValue: "gold",
  },
  {
    id: "diamond",
    name: "Diamond Package",
    character: "Elevated & floral",
    summary: "Richer florals and a styled stage for celebrations that call for a greater sense of occasion.",
    inclusions: [
      "Elevated floral arrangements",
      "Luxury stage and top-table styling",
      "Upgraded centrepieces",
      "Bespoke lighting accents",
    ],
    enquiryValue: "diamond",
  },
  {
    id: "platinum",
    name: "Platinum Package",
    character: "Full royal transformation",
    summary: "The complete production, designed end to end so every sightline feels considered.",
    inclusions: [
      "Full royal transformation of the hall",
      "Grand statement stage and floral architecture",
      "Luxury walkway and entrance styling",
      "Tailored end-to-end visual production",
    ],
    enquiryValue: "platinum",
  },
] as const;

export const addOns = [
  {
    id: "backdrops",
    title: "Photography & Event Backdrops",
    text: "Custom backdrops designed for portraits, entrances and the photographs guests will keep.",
  },
  {
    id: "dance-floor",
    title: "Dedicated Dance Floor",
    text: "A defined dance floor laid within the hall, ready for the first dance and everything after.",
  },
  {
    id: "catering",
    title: "Full Catering & Cutlery",
    text: "Complete catering with cutlery for all occasions, prepared and served by Kashas Events.",
  },
  {
    id: "parking",
    title: "Parking Attendant",
    text: "A dedicated attendant to guide guests on arrival, arranged on request.",
  },
  {
    id: "cleaning",
    title: "Hall Cleaning Service",
    text: "Leave the clear-down to us, so your evening ends with the last farewell.",
  },
] as const;

/* ------------------------------------------------------------------
   Sample menu (in-house starters)
------------------------------------------------------------------- */
export const sampleMenu = [
  {
    id: "grill",
    label: "Meat & Grill",
    title: "Meat & Grill Starters",
    items: ["Lamb Kebab", "Chicken Tikka", "Chilli Chicken", "Chicken Leg", "Malai Tikka"],
  },
  {
    id: "chaat",
    label: "Chaat & Vegetarian",
    title: "Chaat & Vegetarian Starters",
    items: ["Papri Chaat", "Samosa Chaat", "Aloo Tikki Chaat", "Chilli Paneer"],
  },
  {
    id: "accompaniments",
    label: "Accompaniments",
    title: "Accompaniments & Service",
    items: ["Fragrant Rice", "Fresh Naan", "Raita", "Mint Sauce", "Green Salad", "Welcome Drinks & Soft Drinks"],
  },
] as const;

export const signatureStarters = ["Lamb Kebab", "Malai Tikka", "Samosa Chaat", "Chilli Paneer"] as const;

/* ------------------------------------------------------------------
   Visit Us
------------------------------------------------------------------- */
export const travelCards = [
  {
    id: "train",
    title: "By Train / Elizabeth Line",
    highlight: "0.2 miles from Romford Station",
    text: "Romford Station is just 0.2 miles away, an approximate 4-minute walk, with rapid links to Liverpool Street, Canary Wharf, Stratford and Shenfield.",
  },
  {
    id: "car",
    title: "By Car & Parking",
    highlight: "Free on-street parking",
    text: "Convenient access via the A12, A127 and M25, with free on-street parking available nearby. A dedicated parking attendant can be arranged for events. Please note there is no dedicated accessible bay on-site.",
  },
  {
    id: "access",
    title: "Accessibility",
    highlight: "Step-free ground floor",
    text: "Full step-free, ground-floor access throughout the entire venue, for wheelchair users and elderly guests alike.",
  },
] as const;

/* ------------------------------------------------------------------
   Enquiry: consultation flow and form options
------------------------------------------------------------------- */
export const consultationSteps = [
  {
    title: "We respond personally",
    text: "A member of our team reviews your enquiry and contacts you to talk through your date, guest numbers and ideas.",
  },
  {
    title: "You visit the hall",
    text: "Join us for a private viewing to walk the space, discuss layouts, décor and catering, and ask every question.",
  },
  {
    title: "You receive a bespoke quote",
    text: "We prepare a proposal tailored to your occasion and, once you are happy, secure your date.",
  },
] as const;

export const enquiryOptions = {
  eventTypes: [
    { value: "wedding", label: "Wedding" },
    { value: "nikkah-mehndi-walima", label: "Nikkah / Mehndi / Walima" },
    { value: "birthday", label: "Birthday / Baby Shower" },
    { value: "engagement", label: "Engagement / Anniversary" },
    { value: "corporate", label: "Corporate Event" },
    { value: "other", label: "Other" },
  ],
  packages: [
    { value: "wedding-full", label: "Wedding Full Package" },
    { value: "dry-hire", label: "Dry Hire Only" },
    { value: "gold", label: "Gold Décor Package" },
    { value: "diamond", label: "Diamond Décor Package" },
    { value: "platinum", label: "Platinum Décor Package" },
    { value: "catering", label: "Catering Only via Kashas Events" },
    { value: "not-sure", label: "Not Sure Yet" },
  ],
  sessions: [
    { value: "daytime", label: "Daytime 11:00 AM – 5:00 PM" },
    { value: "evening", label: "Evening 6:00 PM – 12:00 AM" },
    { value: "full-day", label: "Full Day" },
    { value: "flexible", label: "Flexible" },
  ],
  addOns: [
    { value: "dance-floor", label: "Dance Floor" },
    { value: "backdrops", label: "Photography Backdrops" },
    { value: "catering", label: "In-House Catering" },
    { value: "parking", label: "Parking Attendant" },
    { value: "viewing", label: "Book a Private Viewing" },
  ],
} as const;

/* ------------------------------------------------------------------
   FAQs: every official venue policy
------------------------------------------------------------------- */
export interface Faq {
  id: string;
  question: string;
  answer: string[];
}

export interface FaqCategory {
  id: string;
  title: string;
  faqs: Faq[];
}

export const faqCategories: FaqCategory[] = [
  {
    id: "packages-catering",
    title: "Packages, Catering & Alcohol",
    faqs: [
      {
        id: "package-vs-dry-hire",
        question: "What is the difference between the Wedding Full Package and Dry Hire?",
        answer: [
          "The Wedding Full Package is all-inclusive: exclusive hall hire for a daytime (11:00 AM – 5:00 PM) or evening (6:00 PM – 12:00 AM) session, welcome drinks on arrival, an authentic 3-course menu with professional waiter service, table décor, crockery and cutlery, rice, naan, raita, mint sauce, green salad and 3 varieties of soft drinks.",
          "Simple Dry Hire gives you exclusive use of the customisable main hall and private changing room as a blank canvas, with complete freedom to bring your own caterers, entertainment and styling.",
        ],
      },
      {
        id: "external-catering",
        question: "Can we bring our own caterers?",
        answer: [
          "Yes. External caterers are welcome with no buyout fee.",
          "Please note that our on-site kitchen facilities are not available for external or guest use, so your caterer should plan to work without kitchen access.",
        ],
      },
      {
        id: "in-house-catering",
        question: "Do you offer in-house catering?",
        answer: [
          "Yes. Kashas Events is our dedicated in-house and outdoor catering company, delivering authentic South Asian and bespoke multicultural cuisine at Kashas Royal or at external venues across London and Essex.",
          "We hold an official 5 / 5 Food Hygiene Rating (“Very Good”, Havering Council). Full 3-course bespoke menus are available in our downloadable menu and through a private tasting and consultation.",
        ],
      },
      {
        id: "alcohol",
        question: "Do you serve alcohol, and can we bring our own?",
        answer: [
          "Kashas Royal does not serve or supply alcohol. Guests are welcome to bring their own alcohol free of charge, with zero corkage fee.",
        ],
      },
      {
        id: "pricing",
        question: "How do we receive a quote?",
        answer: [
          "Every occasion is different, so each proposal is prepared individually. Share your date, guest numbers and preferred package through our enquiry form, or call us, and we will prepare a bespoke quote.",
        ],
      },
    ],
  },
  {
    id: "music-timings",
    title: "Music, Sound & Timings",
    faqs: [
      {
        id: "sessions",
        question: "What are the session times?",
        answer: [
          "Events typically run as a daytime session from 11:00 AM to 5:00 PM or an evening session from 6:00 PM to 12:00 AM. Full-day dry hire options are also available.",
          "The venue is open Monday to Sunday, 11:00 AM to 12:00 AM.",
        ],
      },
      {
        id: "dj",
        question: "Can we bring our own DJ and play our own music?",
        answer: ["Yes. You are welcome to play your own music and bring your own DJ and entertainment."],
      },
      {
        id: "pa",
        question: "Is there a sound system at the venue?",
        answer: [
          "There is no in-house PA system or speakers, so please ask your DJ or entertainment supplier to bring the equipment they need.",
        ],
      },
      {
        id: "curfew",
        question: "Is there a curfew?",
        answer: [
          "A noise restriction applies after 11:00 PM, and all events conclude by 12:00 AM (midnight).",
        ],
      },
    ],
  },
  {
    id: "space-access",
    title: "Space, Capacity & Accessibility",
    faqs: [
      {
        id: "capacity",
        question: "How many guests can Kashas Royal hold?",
        answer: [
          "The main banqueting hall holds up to 400 guests for a standing reception and up to 350 for banquet dining.",
          "Seven official layouts are available: Standing (400), Banquet Dining (350), Theatre (400), Classroom (400), Boardroom (200), U-Shaped (200) and Cabaret (180).",
        ],
      },
      {
        id: "changing-room",
        question: "Is there a private room for the bride, groom or hosts?",
        answer: [
          "Yes. There is one private changing room, ideal as a bridal or groom suite or as a VIP preparation room.",
        ],
      },
      {
        id: "accessibility",
        question: "Is the venue wheelchair accessible?",
        answer: [
          "Yes. Kashas Royal is on the ground floor, with step-free wheelchair access throughout the entire venue.",
          "Please note there is no dedicated accessible parking bay on-site.",
        ],
      },
      {
        id: "parking",
        question: "Where can guests park?",
        answer: [
          "Free on-street parking is available nearby. A dedicated parking attendant can be arranged on request.",
        ],
      },
      {
        id: "viewing",
        question: "How do we book a viewing?",
        answer: [
          "Private viewings are arranged by appointment. Send an enquiry and tick “Book a Private Viewing”, or call us, and we will find a time that suits you.",
        ],
      },
    ],
  },
  {
    id: "licences-cancellation",
    title: "Licences, Rules & Cancellation Policy",
    faqs: [
      {
        id: "civil-licence",
        question: "Can we hold a civil wedding ceremony at Kashas Royal?",
        answer: [
          "Kashas Royal does not hold a civil wedding licence. We host private celebrations, receptions and corporate events.",
        ],
      },
      {
        id: "tens",
        question: "Do you offer Temporary Event Notices (TENs)?",
        answer: ["No. We do not offer Temporary Event Notices."],
      },
      {
        id: "ticketed",
        question: "Can we hold a ticketed or promoted event?",
        answer: [
          "No. Promoted or ticketed public events are not permitted. Kashas Royal hosts private celebrations, receptions and corporate events.",
        ],
      },
      {
        id: "cancellation",
        question: "What is your cancellation and refund policy?",
        answer: [
          "We operate a standard 60-day policy with a grace period (excluding bookings starting within 48 hours):",
          "Cancellations 60 or more days in advance receive a 100% full refund. Cancellations 30 to 60 days in advance receive a 50% refund. Cancellations within 30 days are non-refundable.",
        ],
      },
    ],
  },
];

const findFaq = (id: string): Faq => {
  const match = faqCategories.flatMap((category) => category.faqs).find((faq) => faq.id === id);
  if (!match) throw new Error(`Unknown FAQ id: ${id}`);
  return match;
};

/** Home page preview: dry hire and external catering, BYO alcohol, capacities, music and curfew, viewings. */
export const homeFaqs: Faq[] = [
  {
    id: "home-dry-hire",
    question: "Can we hire the hall only and bring our own caterers?",
    answer: [
      "Yes. Simple Dry Hire gives you exclusive use of the main hall and private changing room. External caterers are welcome with no buyout fee.",
      "Please note that on-site kitchen facilities are not available for external or guest use.",
    ],
  },
  { ...findFaq("alcohol"), question: "Can we bring our own alcohol?" },
  findFaq("capacity"),
  {
    id: "home-music",
    question: "Can we bring a DJ, and is there a curfew?",
    answer: [
      "You are welcome to bring your own DJ and music. There is no in-house PA system or speakers, so your supplier should bring their own equipment.",
      "A noise restriction applies after 11:00 PM, and all events conclude by 12:00 AM (midnight).",
    ],
  },
  findFaq("viewing"),
];
