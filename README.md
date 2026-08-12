# Heritage Atelier

Static marketing site for **Heritage Atelier** — Sydney NSW. Handmade Gifts. Keepsakes. Heritage Inspired.

Live: <https://welcometothenextlevel.github.io/heritage-atelier/>

Home of two sub brands and one heritage collection:

- **Kontessa** — luxury crochet handbags. *Designed to be coveted.*
- **Little Kontessa** — European inspired baby gifts. *Made for their little moments.*
- **The Pappou & Yiayia Collection** — Greek heritage kitchen and family gifts.

## Stack

Plain HTML, CSS and vanilla JavaScript. No framework, no build step, no npm. Open `index.html` in a
browser and it works.

```
index.html  kontessa.html  little-kontessa.html  heritage.html
gift-finder.html  shop.html  about.html  contact.html
css/style.css      one stylesheet, CSS custom properties for palette and spacing
js/main.js         nav, scroll reveal, modal, shop filter, gift finder
assets/images/     45 photographs — see IMAGES.md
```

Every path in the markup is relative, so the site works from a GitHub Pages project subpath as well
as from the domain root. `.nojekyll` is present so Pages serves the files as-is.

## What the JavaScript does

- Sticky header that shrinks past 24px of scroll, and a full screen mobile menu.
- Scroll reveal via `IntersectionObserver`, disabled under `prefers-reduced-motion`.
- Enquiry modal with Escape to close, focus trapping and focus restore.
- Shop filtering by collection, no page reload.
- The Heritage Gift Finder: a three step flow that scores the 18 products against recipient,
  occasion and budget and reveals the six best matches. Product data lives in `window.HA_PRODUCTS`,
  inlined on `gift-finder.html`.

No forms post anywhere. Submitting shows an inline success state — wire them to a real endpoint
(Formspree, Netlify Forms, or a mail handler) before launch.

## Editing content

Product names, prices, copy and collection tags are duplicated across `shop.html`, the three
collection pages and the `HA_PRODUCTS` array in `gift-finder.html`. Change a price in one place and
change it in the others.

Photography is placeholder stock. `IMAGES.md` lists every file, its aspect ratio, and what the
client's real photograph should be.

## Contact

kontessaau@gmail.com · +61 421 925 493 · Sydney NSW, Australia
Instagram [@kontessa.au](https://www.instagram.com/kontessa.au/) and
[@littlekontessa](https://www.instagram.com/littlekontessa/)
