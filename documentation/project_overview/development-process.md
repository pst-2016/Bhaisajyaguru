# Development Process

This document records the development progress of the Bhaisajyaguru project.

---

## Static Site Deployment - COMPLETED

**Date:** 2026-01-18

### Tasks Completed

- [x] **Updated technical-specs.md** - Confirmed GitHub Pages as hosting choice
- [x] **Reorganized project structure** - Moved documentation to `/documentation` folder
- [x] **Created static site in `/docs` folder:**
  - `index.html` - Temple page with interactive icons and mantra
  - `scriptures.html` - Scripture listing page
  - `contacts.html` - Contact and donation page
  - `scriptures/` - Individual sutra pages (Heart Sutra, Medicine Buddha, Great Compassion)
  - `css/style.css` - Buddhist temple theme styling
  - `js/temple.js` - Interactive icon functionality

### GitHub Pages Setup

1. Go to https://github.com/pst-2016/Bhaisajyaguru/settings/pages
2. Under "Source", select **Deploy from a branch**
3. Select branch: **main**, folder: **/docs**
4. Click **Save**

**Site URL:** https://pst-2016.github.io/Bhaisajyaguru/

### Notes
- GitHub Pages only free if the repo is public
- Custom domain supported for free (need to buy domain separately)

---

## Homage Landing Page & Full Sutra Reader - COMPLETED

**Date:** 2026-06-07

### Tasks Completed

- [x] **Restructured navigation** - New nav across all 18 pages:
  `礼佛 Homage` · `道场 Temple` · `经典 Scriptures` · `联系 Contacts`
- [x] **New `index.html` (礼佛 Homage)** - Devotional landing page:
  - Buddha image (`images/main_pic.png`) with a CSS radial gold halo
  - Three offering buttons (献花 / 上香 / 供灯) using custom inline SVG icons in cream pills
  - 每日念诵 card and 药师灌顶真言 card (designed with serif typography)
- [x] **Moved temple grounds map** - Old `index.html` content relocated to new `temple.html` (道场 Temple)
- [x] **Full Medicine Buddha Sutra reader** - `scriptures/medicine-buddha.html`:
  - Complete authentic text of 《药师琉璃光如来本愿功德经》 (玄奘译), sourced from Wikisource / CBETA T14n0450
  - Stored in `js/medicine-buddha-sutra.js` as structured data (15 sections, 50 paragraphs)
  - Reusable paginated reader in `js/sutra-reader.js` (prev/next buttons, page indicator, arrow-key nav)
- [x] **Offering interactions** - `js/temple.js` extended with toast feedback for the three offerings

### Notes
- Offering SVG strokes use `currentColor` (set via `.offer-icon { color }`) for single-point theming
- Sutra text embedded as JS object (not `fetch`) so it works on both `file://` and GitHub Pages
- `main_pic_bk.jpeg` is a backup of the original Buddha image; old `main_pic.jpeg` was replaced by `main_pic.png`

---

## Next Steps
- [ ] Perchase domain
- [ ] Proselytize while building halls
- [ ] Add building detail pages content (hall pages exist but may need richer content)
- [ ] Consider applying the paginated reader to Heart Sutra & Great Compassion pages
- [ ] Commit & push this session's work (currently uncommitted on `codespaces` branch)

## Done
- [x] Discuss and implement the structure of current GitHub Pages site
