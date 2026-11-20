/**
 * CENTRAL IMAGE MAP — every photograph on the site is declared here.
 *
 * HOW TO SWAP AN IMAGE
 *   1. Drop your photo into /public/images/ (JPG or WebP, ideally 1600–2400px wide).
 *   2. Replace the entry's `src` (and `thumb`, if present) with its path,
 *      e.g.  src: "/images/main-hall.jpg"
 *   3. Update `alt` to describe the new photo and set `authentic: true`.
 *
 * WHAT IS REAL AND WHAT IS A PLACEHOLDER
 *   - `authentic: true`  — real Kashas Royal photography, loaded from the venue's
 *     public Tagvenue listing. These work today, but they live on Tagvenue's
 *     servers; for long-term reliability copy the originals into /public/images/
 *     and point `src` at them.
 *   - `authentic: false` — Unsplash stock placeholder. Each one is marked with
 *     `// SWAP WITH KASHAS ROYAL PHOTO`.
 *
 * Run `npm run check:media` to confirm that every URL below still returns an image.
 */

export type GalleryCategory = "weddings" | "decor" | "private" | "corporate";

export interface MediaImage {
  /** Full-size image used for heroes, feature blocks and the lightbox. */
  src: string;
  /** Lighter version for cards and grids. Falls back to `src` when omitted. */
  thumb?: string;
  alt: string;
  /** True for real Kashas Royal photography, false for stock placeholders. */
  authentic: boolean;
  /** CSS object-position used when the image is cropped. */
  focus?: string;
}

export interface GalleryImage extends MediaImage {
  id: string;
  category: GalleryCategory;
  caption: string;
  tags: string[];
  /** Tile shape in the gallery grid. */
  shape: "landscape" | "portrait" | "wide";
}

/** Shown automatically if any image above fails to load. */
export const FALLBACK_IMAGE = "/images/image-fallback.svg";

const TAGVENUE_BASE = "https://www.tagvenue.com/resize";

/** Real venue photo from the Kashas Royal Tagvenue listing (room 69332). */
const venuePhoto = (key: string, alt: string, focus?: string): MediaImage => ({
  src: `${TAGVENUE_BASE}/${key}/widen-1680-noupsize;69332-entire-venue-room.jpg`,
  thumb: `${TAGVENUE_BASE}/${key}/fit-900-600;69332-entire-venue-room.jpg`,
  alt,
  authentic: true,
  focus,
});

/** Unsplash stock placeholder. */
const stockPhoto = (id: string, alt: string, focus?: string): MediaImage => ({
  src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1800&q=75`,
  thumb: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=70`,
  alt,
  authentic: false,
  focus,
});

/* ------------------------------------------------------------------
   Real Kashas Royal photographs
------------------------------------------------------------------- */
const blossomArchHall = venuePhoto(
  "41/3a",
  "Kashas Royal main hall dressed for a wedding, seen through a blossom-tree arch towards the floral stage",
  "50% 35%",
);
const floralTopTable = venuePhoto(
  "22/b6",
  "Floral top table overlooking the Kashas Royal banqueting hall, set with gold chairs beneath crystal chandeliers",
  "50% 60%",
);
const ledLitReception = venuePhoto(
  "cc/5a",
  "Kashas Royal hall set for a reception with white chairs, blossom centrepieces and violet LED mood lighting",
);
const goldTableSetting = venuePhoto(
  "08/4d",
  "Round table at Kashas Royal styled with gold charger plates, gold cutlery and blush linen",
);
const greeneryWhiteTables = venuePhoto(
  "c2/c9",
  "White banquet tables with sage chair sashes beside a greenery-draped stage at Kashas Royal",
);
const whiteTableDetail = venuePhoto(
  "09/42",
  "White table setting with folded napkins and a floral centrepiece in the Kashas Royal hall",
);
const mandapStage = venuePhoto(
  "eb/44",
  "Illuminated wedding mandap on the stage at Kashas Royal with round tables laid for guests",
  "50% 40%",
);
const floralCentrepiece = venuePhoto(
  "41/b1",
  "Tall floral centrepiece on a guest table with colourful chair sashes across the Kashas Royal hall",
);
const blossomBirthday = venuePhoto(
  "8b/24",
  "Pink blossom-tree centrepieces and pastel tables set for a birthday celebration at Kashas Royal",
);
const blossomStageView = venuePhoto(
  "0f/15",
  "Pastel party tables with blossom trees facing a themed stage at Kashas Royal",
);
const balloonStage = venuePhoto(
  "78/9d",
  "Stage at Kashas Royal dressed with a balloon arch and sequin backdrop for a first-birthday party",
);
const themedTable = venuePhoto(
  "a0/a9",
  "Guest table with gold charger plates in front of a themed party stage at Kashas Royal",
);
const dessertDisplay = venuePhoto(
  "bc/f1",
  "Themed dessert display and pastel balloon backdrop at a private party in Kashas Royal",
);

/* ------------------------------------------------------------------
   Stock placeholders — replace these with Kashas Royal photography
------------------------------------------------------------------- */
// SWAP WITH KASHAS ROYAL PHOTO — the private changing room / bridal suite
const changingRoomPlaceholder = stockPhoto(
  "1608009139988-29d4463ce62c",
  "Bride checking her reflection in an ornate full-length mirror",
  "50% 30%",
);
// SWAP WITH KASHAS ROYAL PHOTO — a corporate dinner or conference set-up in the hall
const corporatePlaceholder = stockPhoto(
  "1768508951405-10e83c4a2872",
  "Event hall laid with round tables for a formal corporate dinner",
);
// SWAP WITH KASHAS ROYAL PHOTO — a conference or seminar in the hall
const conferencePlaceholder = stockPhoto(
  "1540575467063-178a50c2df87",
  "Audience seated in rows at a conference",
);
// SWAP WITH KASHAS ROYAL PHOTO — Kashas Events grill starters (kebabs, tikka)
const grillPlaceholder = stockPhoto(
  "1599487488170-d11ec9c172f0",
  "Skewers of marinated meat grilling over charcoal",
);
// SWAP WITH KASHAS ROYAL PHOTO — Kashas Events chaat starters
const chaatPlaceholder = stockPhoto(
  "1788602563638-840d0d1d3ad2",
  "Bowl of papri chaat topped with yoghurt, pomegranate and sev",
);
// SWAP WITH KASHAS ROYAL PHOTO — Kashas Events buffet or service at an event
const buffetPlaceholder = stockPhoto(
  "1555244162-803834f70033",
  "Catered buffet with silver serving dishes",
);

/* ------------------------------------------------------------------
   Image slots used by the pages
------------------------------------------------------------------- */
export const media = {
  /** Home: full-viewport hero. */
  hero: blossomArchHall,
  /** Home hall feature and The Venue: the main banqueting hall. */
  mainHall: floralTopTable,
  /** Secondary hall image showing the LED mood lighting. */
  hallLighting: ledLitReception,
  /** The Venue: private changing room. */
  changingRoom: changingRoomPlaceholder,

  /** Event types. */
  weddings: mandapStage,
  privateParties: blossomBirthday,
  corporate: corporatePlaceholder,

  /** Signature décor tiers. */
  decorGold: goldTableSetting,
  decorDiamond: greeneryWhiteTables,
  decorPlatinum: { ...blossomArchHall, focus: "100% 50%" },

  /** Hire options. */
  weddingPackage: floralTopTable,
  dryHire: whiteTableDetail,

  /** Catering by Kashas Events. */
  catering: grillPlaceholder,
  cateringChaat: chaatPlaceholder,
  cateringService: buffetPlaceholder,

  /** Inner-page heroes. */
  venueHero: ledLitReception,
  eventsHero: blossomStageView,
  galleryHero: greeneryWhiteTables,
  visitHero: floralCentrepiece,

  /** Venue walkthrough call-to-action and Visit Us snapshot. */
  walkthrough: greeneryWhiteTables,
  visitSnapshot: floralCentrepiece,


  gallery: [
    {
      ...floralTopTable,
      id: "floral-top-table",
      category: "weddings",
      caption: "A floral top table overlooking the hall",
      tags: ["Wedding", "Top Table"],
      shape: "wide",
    },
    {
      ...goldTableSetting,
      id: "gold-table-setting",
      category: "decor",
      caption: "Gold charger plates and blush linen",
      tags: ["Table Styling", "Gold"],
      shape: "portrait",
    },
    {
      ...mandapStage,
      id: "mandap-stage",
      category: "weddings",
      caption: "An illuminated mandap on the main stage",
      tags: ["Wedding", "Stage"],
      shape: "landscape",
    },
    {
      ...blossomBirthday,
      id: "blossom-birthday",
      category: "private",
      caption: "Blossom centrepieces for a milestone birthday",
      tags: ["Birthday", "Centrepieces"],
      shape: "landscape",
    },
    {
      ...greeneryWhiteTables,
      id: "greenery-white-tables",
      category: "weddings",
      caption: "White linen beside a greenery-draped stage",
      tags: ["Wedding", "Stage Styling"],
      shape: "portrait",
    },
    {
      ...ledLitReception,
      id: "led-lit-reception",
      category: "decor",
      caption: "The hall under violet LED mood lighting",
      tags: ["LED Lighting", "Reception"],
      shape: "wide",
    },
    {
      ...corporatePlaceholder, // SWAP WITH KASHAS ROYAL PHOTO
      id: "corporate-dinner",
      category: "corporate",
      caption: "Round tables set for a formal dinner",
      tags: ["Corporate", "Gala Dinner"],
      shape: "landscape",
    },
    {
      ...balloonStage,
      id: "balloon-stage",
      category: "private",
      caption: "A balloon-arch stage for a first birthday",
      tags: ["Birthday", "Stage"],
      shape: "landscape",
    },
    {
      ...grillPlaceholder, // SWAP WITH KASHAS ROYAL PHOTO
      id: "grill-starters",
      category: "corporate",
      caption: "Grill starters, fresh from the charcoal",
      tags: ["Dining", "Catering"],
      shape: "portrait",
    },
    {
      ...floralCentrepiece,
      id: "floral-centrepiece",
      category: "decor",
      caption: "A tall floral centrepiece above the tables",
      tags: ["Florals", "Centrepiece"],
      shape: "portrait",
    },
    {
      ...whiteTableDetail,
      id: "white-table-detail",
      category: "corporate",
      caption: "Crisp white place settings, ready for service",
      tags: ["Dining", "Table Setting"],
      shape: "landscape",
    },
    {
      ...blossomStageView,
      id: "blossom-stage-view",
      category: "private",
      caption: "Pastel tables facing the party stage",
      tags: ["Celebration", "Blossom Trees"],
      shape: "wide",
    },
    {
      ...chaatPlaceholder, // SWAP WITH KASHAS ROYAL PHOTO
      id: "chaat",
      category: "corporate",
      caption: "Chaat starters, layered and bright",
      tags: ["Dining", "Vegetarian"],
      shape: "landscape",
    },
    {
      ...themedTable,
      id: "themed-table",
      category: "decor",
      caption: "Gold place settings before a themed stage",
      tags: ["Table Styling", "Stage"],
      shape: "landscape",
    },
    {
      ...conferencePlaceholder, // SWAP WITH KASHAS ROYAL PHOTO
      id: "conference",
      category: "corporate",
      caption: "Theatre-style seating for a conference",
      tags: ["Corporate", "Conference"],
      shape: "landscape",
    },
    {
      ...dessertDisplay,
      id: "dessert-display",
      category: "private",
      caption: "A themed dessert display and balloon backdrop",
      tags: ["Private Party", "Dessert Table"],
      shape: "landscape",
    },
  ] satisfies GalleryImage[] as GalleryImage[],
} as const;

export const galleryCategories: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "weddings", label: "Weddings" },
  { id: "decor", label: "Décor & Lighting" },
  { id: "private", label: "Private Celebrations" },
  { id: "corporate", label: "Corporate & Dining" },
];
