# Session Status — Handoff Notes

> **Next session: read this file first to resume.**
> Last updated: **2026-06-07**

---

## TL;DR
Built a new devotional landing page (礼佛 Homage) and a full paginated Medicine Buddha Sutra reader. **All work is uncommitted** on the `codespaces` branch.

---

## Current State

- **Branch:** `codespaces` (base/deploy branch is `main`)
- **Git:** changes are **NOT committed and NOT pushed**. Nothing is live yet.
- **Site URLs:** https://gz82.github.io/Bhaisajyaguru/ (per CLAUDE.md) — note older docs reference `pst-2016`; confirm the correct GitHub account before deploying.

---

## What was done this session

### 1. Navigation restructured (all 18 pages)
New nav: `礼佛 Homage` · `道场 Temple` · `经典 Scriptures` · `联系 Contacts`

### 2. New `index.html` = 礼佛 Homage (devotional landing page)
- Buddha image `images/main_pic.png` with a CSS radial gold halo behind it
- Three offering buttons: **献花 / 上香 / 供灯** — custom inline **SVG icons** (gold stroke via `currentColor`) in **cream pills**
- **每日念诵** card: 南无药师琉璃光如来 — 早晚三次　消灾延寿　祛病增财
- **药师灌顶真言** card: short liturgical dharani + Sanskrit romanization

### 3. `temple.html` = 道场 Temple (NEW)
- The old `index.html` temple-grounds map was moved here unchanged (just nav updated).

### 4. Full Sutra Reader — `scriptures/medicine-buddha.html`
- Complete authentic 《药师琉璃光如来本愿功德经》 (唐玄奘译), from Wikisource / CBETA T14n0450 (public domain), verified verbatim.
- Text data: **`js/medicine-buddha-sutra.js`** → `window.SUTRA_DATA` (15 sections / 50 paragraphs)
- Reader logic: **`js/sutra-reader.js`** — generic, reusable; prev/next buttons, `n / 15` indicator, arrow-key nav.
- Embedded as JS object (not `fetch`) so it works on `file://` and GitHub Pages alike.

### 5. `js/temple.js`
- Added offering toast feedback: 献花功德 / 香供养 / 燃灯续命.

---

## Files changed / added

**Added (untracked):**
- `docs/temple.html`
- `docs/js/medicine-buddha-sutra.js`
- `docs/js/sutra-reader.js`
- `docs/images/main_pic.png` (new Buddha image, referenced by index.html)
- `docs/images/main_pic_bk.jpeg` (backup of original image)

**Modified:**
- `docs/index.html` (now the homage page)
- `docs/css/style.css` (homage, offerings/SVG pills, practice cards, sutra reader styles + responsive)
- `docs/js/temple.js`
- `docs/scriptures/medicine-buddha.html`
- All nav-bar updates: `docs/scriptures.html`, `docs/contacts.html`, `docs/halls/*.html` (11), `docs/scriptures/*.html` (3)

**Deleted:**
- `docs/images/main_pic.jpeg` (replaced by `.png`)

---

## How to preview
```bash
cd docs && python -m http.server 8000
# open http://localhost:8000
```
Check: Homage page icons/halo, offering toasts, Temple map, Scriptures → 药师经 reader (prev/next + arrow keys).

---

## Open items / next steps
- [ ] **Commit & push** this session's work (conventional commit; no Co-Authored-By per CLAUDE.md). Confirm correct GitHub repo/account first.
- [ ] Confirm GitHub Pages deploys from `main` /docs — this work is on `codespaces`, needs merge.
- [ ] Optional: apply the paginated reader to Heart Sutra (`heart-sutra.html`) & Great Compassion (`great-compassion.html`).
- [ ] Optional: review the 灌顶真言 — homepage card and `medicine-buddha.html` use slightly different transliteration variants (both valid). Standardize if desired.
- [ ] Textual note: 12th yaksha general rendered as `毗羯罗大将` (CBETA standard); Wikisource showed variant `毘羯魔`. Change if matching Wikisource exactly is preferred.
- [ ] Longer-term (from development-process.md): purchase domain; enrich hall detail pages.

---

## Notes / gotchas
- Offering icon color is themed in ONE place: `.offer-icon { color: #B8860B }` (SVGs use `currentColor`).
- The sutra reader is data-driven — to add another sutra, create a `SUTRA_DATA`-shaped JS file + include `sutra-reader.js` with the reader DOM (`#sutra-reader`, `#sutra-page-heading`, `#sutra-page-body`, `#sutra-indicator`, `#sutra-prev`, `#sutra-next`).
- CLAUDE.md rules: no `Co-Authored-By` in commits; use `./` or `../` paths (not leading `/`); conventional commits; push to `main` to deploy.
