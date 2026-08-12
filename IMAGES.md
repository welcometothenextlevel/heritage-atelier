# Image manifest — Heritage Atelier

Every file in `assets/images/` is a real downloaded photograph (Unsplash, free licence) acting as a
stand-in for the client's own photography. Nothing is hotlinked; nothing is a placeholder graphic.

**Swapping in real photos:** keep the filename and the aspect ratio identical and the site needs no
code changes. The `width`/`height` attributes in the HTML match the ratios below — if you change a
ratio, update those attributes too or the page will shift while loading.

| Ratio | Used for | Pixel size shipped |
|---|---|---|
| 16:9 | desktop heroes | 1920 × 1080 |
| 4:5 | mobile heroes, product cards, brand cards | 900 × 1125 / 1000 × 1250 |
| 3:2 | story bands | 1400 × 933 |
| 1.91:1 | Open Graph share card | 1200 × 630 |

Keep every replacement under 400 KB. Export JPEG at quality 70–80.

---

## Heroes — desktop 16:9 (`*-mobile.jpg` is the same shot cropped to 4:5)

| File | Currently | Replace with |
|---|---|---|
| `hero-home.jpg` / `hero-home-mobile.jpg` | Woman in a cream coat holding a cream handbag | The signature Kontessa bag worn on a Sydney street — natural light, full length, face optional |
| `hero-kontessa.jpg` / `-mobile.jpg` | Woman holding a pale structured handbag | A model carrying the Soft Romance Shoulder Bag, editorial crop, neutral wardrobe |
| `hero-little-kontessa.jpg` / `-mobile.jpg` | Newborn asleep on a soft blanket | A real client newborn on the Hand Crocheted Heirloom Blanket (get written permission) |
| `hero-heritage.jpg` / `-mobile.jpg` | Olive tree in sunlight | Olive branches on the family table, or the Yiayia's Kitchen towels hung in a real kitchen |
| `hero-about.jpg` / `-mobile.jpg` | Hands weaving straw fibre | The maker's own hands crocheting in the Sydney studio |
| `hero-gift-finder.jpg` / `-mobile.jpg` | Gift box tied with a ribbon | The black ribbon Kontessa gift box, closed, on a marble bench |
| `hero-shop.jpg` / `-mobile.jpg` | Beige textured fabric swirl | A flat lay of several finished pieces across all three houses |
| `hero-contact.jpg` / `-mobile.jpg` | Ceramic vase and book on linen | A corner of the real studio — worktable, thread spools, order cards |

## Brand cards — 4:5

| File | Currently | Replace with |
|---|---|---|
| `brand-kontessa.jpg` | Hands holding a pale clutch | Hands holding a real Kontessa crochet bag, gold clasp visible |
| `brand-little-kontessa.jpg` | Wooden teething toys on a knitted blanket | The Welcome To The World set styled together |
| `brand-heritage.jpg` | Chopping board with a knife and fork | The engraved family chopping board with the surname in shot |

## Story bands — 3:2

| File | Currently | Replace with |
|---|---|---|
| `story-sydney.jpg` | Maker's hands with thread and fabric | The Sydney studio, wide, with work in progress on the table |
| `story-crochet.jpg` | Crochet hook mid stitch | A Kontessa bag half finished, showing the stitch density |
| `story-atelier.jpg` | Crochet hook above cream work | Blocking or lining a finished bag |
| `story-greek-table.jpg` | Long table above the sea in Greece | The client's own family table, name day or Easter |
| `story-personalisation.jpg` | Knitted bunny teether on baby clothing | An embroidery proof beside the thread options |
| `story-recipe.jpg` | Open recipe books on a counter | The Family Recipe Journal open, filled in by hand |

## Textures

| File | Currently | Replace with |
|---|---|---|
| `texture-linen.jpg` | Beige linen weave close-up | Macro of the actual linen or cotton used in the collection |

## Products — 4:5, 1000 × 1250

Each of these should become a real photograph of the piece itself on a warm off-white or marble
surface, shot in daylight, with roughly 12% negative space so the 4:5 crop stays comfortable.

| File | Product | Currently |
|---|---|---|
| `kontessa-soft-romance-shoulder-bag.jpg` | Soft Romance Shoulder Bag — $289 | Blush crocheted bag on timber |
| `kontessa-ivory-pearl-tote.jpg` | Ivory Pearl Crochet Tote — $329 | Ivory pleated tote |
| `kontessa-blush-boucle-mini.jpg` | Blush Bouclé Mini Bag — $249 | Pink handbag on marble |
| `kontessa-olive-silk-scarf.jpg` | Olive Grove Silk Scarf — $89 | Scarf worn with a camel coat |
| `kontessa-gold-clasp-pouch.jpg` | Gold Clasp Evening Pouch — $219 | Tan clutch on a windowsill |
| `kontessa-coveted-gift-set.jpg` | The Coveted Gift Set — $379 | Clutch styled with jewellery |
| `little-initial-tee.jpg` | Personalised Initial Tee — $49 | Plain white cotton tee |
| `little-nouna-bodysuit.jpg` | Nouna's Little Blessing Bodysuit — $45 | White baby bodysuit, flat |
| `little-yiayia-bodysuit.jpg` | Yiayia's Little Angel Bodysuit — $45 | White and blue onesie |
| `little-heirloom-blanket.jpg` | Hand Crocheted Heirloom Blanket — $139 | Cream crocheted blanket |
| `little-keepsake-box.jpg` | Keepsake Gift Box — $119 | Kraft box with a blush ribbon |
| `little-newborn-set.jpg` | Welcome To The World Newborn Set — $159 | Basket on a knitted blanket |
| `heritage-pappou-apron.jpg` | Pappou Chef Of Everything Apron — $69 | Cook in a linen apron |
| `heritage-chopping-board.jpg` | Engraved Family Chopping Board — $89 | Board and knife on timber |
| `heritage-kitchen-rules-print.jpg` | Pappou's Kitchen Rules Print — $45 | Framed print on a pale wall |
| `heritage-recipe-journal.jpg` | Family Recipe Journal — $59 | Open notebook with pasta |
| `heritage-tea-towel-set.jpg` | Yiayia's Kitchen Linen Tea Towel Set — $49 | Linen towel with wheat |
| `heritage-gift-box.jpg` | The Heritage Kitchen Gift Box — $189 | Brown ribbon on white |

## Social

| File | Currently | Replace with |
|---|---|---|
| `og-cover.jpg` (1200 × 630) | Crop of the home hero | The strongest brand shot; keep the subject centred, it gets cropped by some platforms |

---

## Alt text

Alt text is written per image in the HTML and describes what is in the photo, not the product name.
When you swap a photo, rewrite the `alt` attribute to match the new picture — a stale description is
worse than none for a screen reader. Product names and prices are already in the surrounding markup.
