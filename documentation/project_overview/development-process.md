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

1. Go to https://github.com/GZ82/Bhaisajyaguru/settings/pages
2. Under "Source", select **Deploy from a branch**
3. Select branch: **main**, folder: **/docs**
4. Click **Save**

**Site URL:** https://gz82.github.io/Bhaisajyaguru/

### Notes
- GitHub Pages only free if the repo is public
- Custom domain supported for free (need to buy domain separately)

---

## Next Steps

- [ ] Discuss and implement the structure of current GitHub Pages site
