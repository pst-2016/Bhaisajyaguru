# Technical Specifications: Static-First Architecture

## Overview

This document outlines the technical approach for Bhaisajyaguru, shifting from a monolithic Flask application to a **static marketing/landing site** with **separate dynamic micro-apps** linked as needed.

### Rationale

| Factor | Static-First Approach | Monolithic Flask |
|--------|----------------------|------------------|
| **Hosting Cost** | Free/minimal (GitHub Pages, Netlify, Vercel) | $5-20+/month (server required) |
| **Development Time** | Days for MVP | Weeks for full stack |
| **Maintenance** | Near zero | Ongoing server management |
| **Scalability** | CDN handles traffic spikes | Requires scaling infrastructure |
| **Business Validation** | Launch fast, iterate | Heavy upfront investment |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    STATIC MARKETING SITE                     │
│              (GitHub Pages / Netlify / Vercel)               │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │   Home   │  │  About   │  │ Services │  │ Contact  │     │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘     │
│                                                              │
│              [Links to Dynamic Apps when needed]             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│   Donation    │   │    Blog/CMS   │   │  Members App  │
│   (Stripe/    │   │   (Ghost/     │   │  (Flask/      │
│   Ko-fi/etc)  │   │   Notion/etc) │   │   FastAPI)    │
└───────────────┘   └───────────────┘   └───────────────┘
   External SaaS        External SaaS      Self-hosted
                                          (when needed)
```

---

## Phase 1: Static Marketing Site

### Scope

Convert existing Flask templates to pure static HTML/CSS.

### Pages to Build

| Page | Source | Content |
|------|--------|---------|
| `index.html` | `app/templates/home.html` | Landing page with Buddhist imagery and message |
| `donate.html` | `app/templates/payment.html` | Donation page with QR code |
| `about.html` | New | About the project/mission |
| `contact.html` | New | Contact information |

### Technology Stack

```
Static Site:
├── HTML5
├── CSS3 (with Flexbox/Grid)
├── Vanilla JavaScript (minimal, if needed)
└── No build tools required (optional: add later)
```

### File Structure (GitHub Pages)

```
/docs/                 # GitHub Pages source directory
├── index.html         # Temple page (main)
├── scriptures.html    # Scriptures listing
├── contacts.html      # Contact & donation
├── scriptures/        # Individual scripture pages
│   ├── medicine-buddha.html
│   ├── heart-sutra.html
│   └── great-compassion.html
├── css/
│   └── style.css
├── images/
│   ├── buddha/
│   ├── icons/
│   ├── main_pic.jpeg
│   └── qr.jpeg
├── sounds/
│   ├── bell.mp3
│   └── chanting.mp3
├── js/
│   └── temple.js      # Icon interactions
└── CNAME              # For custom domain (optional)
```

**Note:** Using `/docs` folder allows GitHub Pages deployment directly from `main` branch without needing a separate `gh-pages` branch.

### Migration Tasks

1. **Extract HTML from Jinja2 templates**
   - Remove `{% extends %}`, `{% block %}` syntax
   - Replace `{{ url_for('static', ...) }}` with relative paths
   - Merge base.html structure into each page

2. **Clean up CSS**
   - Consolidate inline styles into `style.css`
   - Remove duplicate styles from templates
   - Ensure responsive design

3. **Update asset references**
   - Change `{{ url_for('static', filename='...') }}` to `./images/...`, `./css/...`

### Hosting: GitHub Pages (Confirmed)

| Platform | Cost | Setup | Custom Domain | Notes |
|----------|------|-------|---------------|-------|
| **GitHub Pages** | Free | Push to repo | Free with CNAME | **SELECTED** |

**Decision:** GitHub Pages selected for its simplicity, zero cost, and seamless GitHub integration.

**Deployment Method:** Deploy from `/docs` folder on `main` branch (simplest approach - no separate branch needed).

---

## Phase 2: Dynamic Features (As Needed)

### Option A: External Services (Lowest Effort)

| Feature | Service | Cost | Integration |
|---------|---------|------|-------------|
| **Donations** | Ko-fi, Buy Me a Coffee, Stripe Payment Links | Free / 5% fee | Link/embed |
| **Blog** | Notion + Super.so, Ghost, Substack | Free-$15/mo | Subdomain or embed |
| **Email Collection** | Mailchimp, ConvertKit, Buttondown | Free tier | Embed form |
| **Comments** | Disqus, Giscus (GitHub-based) | Free | Script embed |
| **Analytics** | Plausible, Umami, Google Analytics | Free-$9/mo | Script tag |
| **Forms** | Netlify Forms, Formspree, Google Forms | Free tier | Form action |

### Option B: Self-Hosted Micro-Apps (When Scale Requires)

Deploy individual Flask/FastAPI apps only when external services are insufficient.

```
Potential Future Apps:
├── /apps/members/     # Flask app for membership (if needed)
├── /apps/gallery/     # Flask app for dynamic gallery
└── /apps/api/         # FastAPI for custom API endpoints
```

**Deployment options for micro-apps:**
- Railway.app (free tier, easy Flask deployment)
- Render.com (free tier with limitations)
- Fly.io (free tier)
- DigitalOcean App Platform ($5/mo)

---

## Phase 3: Custom Dynamic Features (Future)

Only build when:
1. External services can't meet requirements
2. User base justifies development cost
3. Specific features need custom logic

### Preserved for Future Use

The following files in `/app/` and `/remedies/` are **archived** for potential future use:

```
Archived (do not delete):
├── /remedies/          # Legacy implementation reference
├── /app/models.py      # Database model templates
├── /app/routes/auth.py # Authentication blueprint
├── /app/routes/blog.py # Blog blueprint
└── requirements.txt    # Full dependency list
```

---

## Implementation Plan

### Step 1: Create Static Site (Priority: HIGH)

```bash
# Create new static-site directory
mkdir -p static-site/{css,images,js}

# Copy and convert templates to static HTML
# (Manual conversion from Jinja2 to plain HTML)

# Copy static assets
cp app/static/css/style.css static-site/css/
cp app/static/images/* static-site/images/
```

### Step 2: Deploy to GitHub Pages

```bash
# GitHub Pages deployment using /docs folder:

# 1. Ensure static site files are in /docs directory
# 2. Commit and push to main branch
git add docs/
git commit -m "feat: add static site for GitHub Pages"
git push origin main

# 3. Enable GitHub Pages in repo settings:
#    - Go to Settings > Pages
#    - Source: "Deploy from a branch"
#    - Branch: "main" folder: "/docs"
#    - Save

# 4. Site will be available at:
#    https://<username>.github.io/<repo-name>/
```

### Step 3: Archive Flask Code

```bash
# Move Flask app to archive (keep for reference)
mkdir -p archive
mv app/ archive/flask-app/
mv run.py archive/
# Keep remedies/ as-is for reference
```

### Step 4: Update Documentation

- Update `README.md` with new project structure
- Update `CLAUDE.md` with static site conventions

---

## Cost Comparison

### Current Plan (Static-First)

| Item | Monthly Cost |
|------|-------------|
| Static hosting (GitHub Pages) | $0 |
| Custom domain (optional) | $12/year |
| External donation service | $0 (percentage fee only) |
| **Total** | **~$1/month** |

### Alternative (Flask Deployment)

| Item | Monthly Cost |
|------|-------------|
| VPS/PaaS hosting | $5-20 |
| Database (if needed) | $0-15 |
| Domain + SSL | $12/year |
| **Total** | **$7-35/month** |

---

## Technical Decisions

### Confirmed

- [x] Static-first architecture
- [x] **GitHub Pages** for hosting (from `/docs` folder on main branch)
- [x] External services for donations initially
- [x] No database required for Phase 1
- [x] No authentication required for Phase 1

### To Decide Later

- [ ] Custom domain name (optional - can add CNAME file later)
- [ ] Blog platform choice (if adding blog)
- [ ] Analytics tool
- [ ] Email collection approach

---

## Files to Modify/Create

### New Files

| File | Purpose |
|------|---------|
| `/static-site/index.html` | Static homepage |
| `/static-site/donate.html` | Static donation page |
| `/static-site/css/style.css` | Consolidated styles |
| `/docs/technical-specs.md` | This document |

### Files to Archive

| File | Reason |
|------|--------|
| `/app/*` | Flask app not needed for static site |
| `/run.py` | Flask entry point not needed |
| `/requirements.txt` | Reduce to minimal or remove |

### Files to Keep

| File | Reason |
|------|--------|
| `/remedies/*` | Reference implementation |
| `/CLAUDE.md` | Update for static site workflow |
| `/README.md` | Update with new structure |
| `/docs/*` | Documentation |

---

## Next Steps

1. **Approve this spec** - Review and confirm approach
2. **Create static-site directory** - Set up new structure
3. **Convert templates** - Migrate Jinja2 to plain HTML
4. **Deploy** - Push to GitHub Pages or Netlify
5. **Test** - Verify all pages and assets load correctly
6. **Archive** - Move Flask code to archive folder

---

*Last updated: 2026-01-18*
*Status: APPROVED - GitHub Pages hosting confirmed*
