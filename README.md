# Kashas Royal website

The website for Kashas Royal, a banqueting and event venue at 12 Bridge Close, Romford, RM7 0AU.

Built with React, Vite, TypeScript, Tailwind CSS, React Router and Framer Motion. It deploys to Netlify as a static site, with the enquiry form handled by Netlify Forms.

## Run it locally

Requires Node.js 20 or newer (Netlify builds with Node 22).

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Type-checks, then builds the production site into `dist/` |
| `npm run preview` | Serves the production build locally on port 4173 |
| `npm run typecheck` | TypeScript check only |
| `npm run check:rules` | Confirms no pricing appears anywhere and that the email and Instagram are footer-only |
| `npm run check:media` | Confirms every image URL in `src/data/media.ts` still returns an image |

## Where things live

```
index.html                 Page shell, fonts, SEO defaults, hidden Netlify form
netlify.toml               Netlify build settings and single-page-app redirect
public/images/             Logo, favicon, image fallback
public/downloads/          Sample menu PDF
src/data/venueData.ts      All venue facts and copy: capacities, packages, FAQs, contact details
src/data/media.ts          Every photograph used on the site
src/config/motion.ts       Animation timings and presets
src/index.css              Brand colours, fonts and shared text styles
src/pages/                 One file per page
src/components/            Header, footer, capacity switcher, gallery lightbox, enquiry form, etc.
```

To change wording, capacities, packages or FAQs, edit `src/data/venueData.ts`. The pages read from it, so one edit updates every place that fact appears.

## 1. Swapping images

Every image is declared in `src/data/media.ts`. Each entry is marked `authentic: true` (a real Kashas Royal photo) or `authentic: false` (a stock placeholder).

Placeholders are the entries built with `stockPhoto(...)`, each tagged with the comment `// SWAP WITH KASHAS ROYAL PHOTO`. At the time of writing these are the changing room, the corporate dinner, the conference, the grill starters, the chaat and the buffet service.

To replace one:

1. Put your photo in `public/images/`, for example `public/images/changing-room.jpg`. JPG or WebP, around 1600 to 2400 pixels wide.
2. In `src/data/media.ts`, replace the `stockPhoto(...)` call with a plain entry:

   ```ts
   const changingRoomPlaceholder: MediaImage = {
     src: "/images/changing-room.jpg",
     alt: "The private changing room at Kashas Royal",
     authentic: true,
   };
   ```

3. Optional: add `focus: "50% 30%"` to control which part of the photo stays visible when it is cropped, and `thumb` to supply a smaller version for cards.

The gallery is the `gallery` list in the same file. Add, remove or reorder entries there. Each has a `category` (which filter it appears under), a `caption` and `tags`.

The real venue photos currently load from the venue's public Tagvenue listing, so they depend on Tagvenue keeping those files online and carry a faint Tagvenue watermark. Before launch, copy your original photos into `public/images/` and point each `venuePhoto(...)` entry at the local file in the same way. If an image ever fails to load, the site shows a neutral branded panel instead of a broken image.

Run `npm run check:media` after any change to confirm every image loads.

## 2. Logo and menu PDF

**Logo:** `public/images/kashas-royal-logo.jpg`. Replace the file, keeping the same name, and it updates in the header, footer, mobile menu and form confirmation.

The current logo is gold artwork on an olive background. `src/components/ui/Logo.tsx` removes that olive background in the browser so the gold sits directly on the header and footer, and crops the "KR" crest for the compact header mark. If a new logo has a different background colour or proportions, adjust the `feColorMatrix` values and `crestCrop` in that file, or pass `keyed={false}` to show the file exactly as supplied. A PNG or SVG with a transparent background also works; update `LOGO_SRC` in the same file to the new name.

The favicon files are `public/favicon.png` and `public/apple-touch-icon.png`.

**Menu PDF:** `public/downloads/kashas-royal-menu.pdf`. The file in place is a one-page stand-in listing the sample starters. Replace it with your real menu PDF, keeping the same file name, and every "Download Sample Menu" button serves the new file. Make sure the PDF you upload shows no prices.

## 3. Fonts and transitions

**Fonts** are set in two places:

- `index.html`: the Google Fonts `<link>` loads the `Bricolage Grotesque` variable family (`opsz`, `wdth`, `wght`).
- `src/index.css`: `--font-display` (Condensed Light `wdth: 75`, `wght: 280`) and `--font-sans` (`Bricolage Grotesque` Regular/Medium) at the top of the file.

Change both together. Brand colours, card radii (`10px`) and transition timings (`300ms` / `500ms` / `900ms` / `1200ms`) are in the same block of `src/index.css`.

**Transitions** are in `src/config/motion.ts` (GSAP `circ.out` 1.2s word reveals, `0.5s ease-in-out` card/hover glides, `0.05s` word stagger), with desktop smooth wheel scrolling via Lenis in `src/hooks/useSmoothScroll.ts`. Hover transitions on links, cards and buttons use `--ease-editorial`, `--duration-fast`, `--duration-base` and `--duration-slow` in `src/index.css`. Visitors who have "reduce motion" switched on in their device settings automatically get a calmer version.

## 4. Deploying to Netlify

The code lives at <https://github.com/engr-Aman-ur-Rehman/kashas-royal-website>.

1. Sign in at [app.netlify.com](https://app.netlify.com) and choose **Add new site → Import an existing project**.
2. Choose **GitHub**, authorise Netlify if asked, and pick `engr-Aman-ur-Rehman/kashas-royal-website`.
3. Netlify reads `netlify.toml`, so the settings should already be filled in. Confirm them:
   - **Branch to deploy:** `main`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Select **Deploy site**. Every later push to `main` redeploys automatically.
5. Under **Domain management**, add your domain and follow the DNS instructions.

`netlify.toml` also sets up the redirect that lets addresses such as `/the-venue` open directly.

### Enquiry form and email notifications

The enquiry form posts to Netlify Forms under the name `venue-enquiry`. Netlify finds it at build time from the hidden copy of the form in `index.html`.

1. In the Netlify dashboard, open **Forms** and select **Enable form detection** if it is not already on, then trigger a new deploy.
2. `venue-enquiry` appears in the **Forms** list once that deploy finishes. Submissions are stored there.
3. To receive each enquiry by email, go to **Netlify Dashboard → Forms → Form notifications → Add notification → Email notification**, enter the address that should receive enquiries, and choose the `venue-enquiry` form.
4. Send a test enquiry from the live site and check that it arrives.

If you add, remove or rename a form field, make the same change in both `src/components/enquire/EnquiryForm.tsx` and the hidden form in `index.html`. Netlify ignores fields that are missing from the hidden form.

Spam is filtered with a hidden honeypot field (`bot-field`).

### Testing the form before deployment

Netlify Forms only exists on Netlify, so `npm run dev` and `npm run preview` include a small stand-in that accepts the form and prints each submission in the terminal. To see the form's error message instead:

```bash
MOCK_FORM_FAIL=1 npm run dev
```

The stand-in is in `vite.config.ts` and is not part of the deployed site.

## Rules the site follows

These come from the owner's brief. `npm run check:rules` fails if either is broken.

1. **No public pricing.** No pound amounts, per-guest rates, hire fees or add-on prices anywhere, including the menu PDF. Buttons invite an enquiry instead.
2. **Phone number everywhere; email and Instagram in the footer only.** The email address and Instagram handle are stored in `footerOnlyContact` in `src/data/venueData.ts` and used only by `src/components/layout/Footer.tsx`.

## Before launch

- [ ] Replace the placeholder reviews in `src/data/venueData.ts` (`reviews`) with real client reviews you have permission to publish, then set `REVIEWS_ARE_PLACEHOLDERS` to `false` to remove the "sample wording" note.
- [ ] Replace the six stock placeholder photos in `src/data/media.ts`, and move the real venue photos into `public/images/`.
- [ ] Replace `public/downloads/kashas-royal-menu.pdf` with the real menu.
- [ ] Review the privacy policy wording in `src/components/layout/PrivacyModal.tsx`.
- [ ] Set up the email notification in Netlify and send a test enquiry.
- [ ] Once the final domain is known, change `og:image` in `index.html` to a full address (for example `https://your-domain/images/kashas-royal-logo.jpg`) so link previews on social media show the logo.
