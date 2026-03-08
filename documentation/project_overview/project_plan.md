# Project Plan: Bhaisajyaguru Online Buddhist Temple

## 1. Project Overview

**Name:** Bhaisajyaguru (药师琉璃光如来)

**Mission:** Create an online Buddhist temple to share and preach Buddhism through a peaceful, meditative web experience.

**Approach:** Static-first architecture with extensibility to advanced web applications via hyperlinks.

---

## 2. Site Structure

```
┌─────────────────────────────────────────────────────────────┐
│                     药师琉璃光如来                            │
│                  Online Buddhist Temple                      │
├─────────────────────────────────────────────────────────────┤
│    [Temple]      [Scriptures]      [Contacts]               │
└─────────────────────────────────────────────────────────────┘
```

| Page | Chinese | Description |
|------|---------|-------------|
| **Temple** | 佛堂 | Interactive temple with icons, images, and audio |
| **Scriptures** | 经典 | Buddhist scriptures and teachings |
| **Contacts** | 联系 | Contact information and donation options |

---

## 3. Technical Architecture

### Static-First Design

```
┌─────────────────────────────────────────────────────────────┐
│                    STATIC WEBSITE                            │
│              (GitHub Pages / Netlify / Vercel)               │
│                                                              │
│  ┌──────────┐  ┌──────────────┐  ┌──────────┐               │
│  │  Temple  │  │  Scriptures  │  │ Contacts │               │
│  └──────────┘  └──────────────┘  └──────────┘               │
│                                                              │
│              [Hyperlinks to Dynamic Apps]                    │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │  Donations  │    │    Blog     │    │ Members App │
   │  (Ko-fi/    │    │  (Ghost/    │    │  (Flask/    │
   │   Stripe)   │    │   Notion)   │    │   FastAPI)  │
   └─────────────┘    └─────────────┘    └─────────────┘
     External SaaS      External SaaS     Self-hosted
                                         (when needed)
```

### Technology Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| **Markup** | HTML5 | Semantic, accessible |
| **Styling** | CSS3 | Flexbox/Grid, responsive |
| **Interactivity** | Vanilla JavaScript | Minimal, for audio/images |
| **Build Tools** | None required | Optional: add later |

---

## 4. Hosting Strategy (Low Cost)

### Recommended: GitHub Pages

| Platform | Cost | Custom Domain | Auto-Deploy | Notes |
|----------|------|---------------|-------------|-------|
| **GitHub Pages** | Free | Free with CNAME | On push | Simplest option |
| **Netlify** | Free tier | Free SSL | On push | Form handling built-in |
| **Cloudflare Pages** | Free | Free SSL | On push | Fast global CDN |
| **Vercel** | Free tier | Free SSL | On push | Good for future expansion |

### Cost Analysis

| Item | Monthly Cost |
|------|-------------|
| Static hosting (GitHub Pages) | $0 |
| Custom domain (optional) | ~$1 ($12/year) |
| External services | $0 (percentage fee only) |
| **Total** | **~$0-1/month** |

---

## 5. Extensibility via Hyperlinks

The static site remains simple and cheap. Advanced features are added through **external links** to specialized services or self-hosted apps.

### External Services (Zero Development)

| Feature | Service Options | Integration |
|---------|-----------------|-------------|
| **Donations** | Ko-fi, Buy Me a Coffee, Stripe Links | Link/embed button |
| **Blog** | Ghost, Notion + Super.so, Substack | Subdomain link |
| **Email List** | Mailchimp, ConvertKit, Buttondown | Embedded form |
| **Analytics** | Plausible, Umami, Google Analytics | Script tag |
| **Comments** | Giscus (GitHub-based), Disqus | Script embed |
| **Forms** | Netlify Forms, Formspree | Form action URL |

### Self-Hosted Micro-Apps (When Needed)

Deploy custom Flask/FastAPI apps only when external services are insufficient.

| Platform | Cost | Notes |
|----------|------|-------|
| Railway.app | Free tier | Easy Flask deployment |
| Render.com | Free tier | Sleeps on inactivity |
| Fly.io | Free tier | Good for global apps |
| DigitalOcean | $5/month | Full control |

**Link Example:**
```html
<!-- On static site -->
<a href="https://members.bhaisajyaguru.org">Member Portal</a>
```

---

## 6. Development Phases

### Phase 1: Core Structure
- [ ] Create static site directory structure
- [ ] Build base HTML template with navigation
- [ ] Implement responsive CSS styling
- [ ] Set up color palette (Sky Blue, Gold, Deep Red)

### Phase 2: Temple Page (佛堂)
- [ ] Design icon grid layout (Bell, Drum, Beads, Lotus, Chant)
- [ ] Implement image popup/modal on click
- [ ] Add audio playback functionality
- [ ] Create smooth transitions and hover effects

### Phase 3: Scriptures Page (经典)
- [ ] Create scripture listing page
- [ ] Build individual scripture pages (药师经, 心经, 大悲咒)
- [ ] Add audio players for sutra chanting
- [ ] Style text for optimal readability

### Phase 4: Contacts Page (联系)
- [ ] Create contact information section
- [ ] Add donation section with QR code
- [ ] Include social media links (if applicable)

### Phase 5: Assets
- [ ] Gather Buddhist images (Wikimedia, Unsplash, custom)
- [ ] Source audio files (temple sounds, chanting)
- [ ] Optimize all assets for web (compression, lazy loading)

### Phase 6: Deployment
- [ ] Deploy to GitHub Pages
- [ ] Set up custom domain (optional)
- [ ] Verify all functionality across browsers
- [ ] Mobile testing

### Phase 7: External Integrations (Optional)
- [ ] Add donation service link
- [ ] Set up analytics
- [ ] Configure email collection (if needed)

---

## 7. File Structure

```
/static-site/
├── index.html              # Temple page (main)
├── scriptures.html         # Scriptures listing
├── contacts.html           # Contact & donation
├── scriptures/
│   ├── medicine-buddha.html
│   ├── heart-sutra.html
│   └── great-compassion.html
├── css/
│   ├── style.css           # Main styles
│   └── temple.css          # Temple page specific
├── js/
│   └── temple.js           # Icon interactions
├── images/
│   ├── buddha/
│   ├── icons/
│   └── qr.jpeg
├── sounds/
│   ├── bell.mp3
│   ├── wooden-fish.mp3
│   ├── chanting.mp3
│   └── mantra.mp3
└── CNAME                   # For custom domain
```

---

## 8. Design Guidelines

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Sky Blue | `#87CEEB` | Background |
| Gold | `#D4AF37` | Accents, icons |
| Deep Red | `#8B0000` | Temple elements |
| White | `#FFFFFF` | Text, cards |
| Black | `#1A1A1A` | Primary text |

### Typography

- **Headings:** Noto Serif SC (traditional feel)
- **Body:** Clean sans-serif for readability
- **Scriptures:** Traditional Chinese typography, generous line-height

### Visual Principles

- Peaceful, meditative atmosphere
- Traditional Buddhist aesthetic
- Ample whitespace
- Subtle animations (fade-in, gentle hover)
- Mobile-first responsive design

---

## 9. Performance & Accessibility

### Performance Targets

| Metric | Target |
|--------|--------|
| Page load | < 3 seconds |
| Lighthouse score | > 90 |
| Images | Optimized, lazy-loaded |
| Audio | Preload on demand only |

### Accessibility

- Alt text for all images
- Keyboard navigation support
- Visible audio controls
- Sufficient color contrast (WCAG AA)
- Screen reader compatible

---

## 10. Future Enhancements

| Feature | Description | Trigger |
|---------|-------------|---------|
| Multi-language | English/Chinese toggle | User feedback |
| More scriptures | Expand collection | Content ready |
| Meditation timer | Guided meditation | User demand |
| Virtual offering | Animated incense/candle | Enhancement |
| Members portal | User accounts, progress | Growth milestone |
| Daily blessing | Random scripture quote | Quick win |

---

## 11. Summary

| Aspect | Approach |
|--------|----------|
| **Architecture** | Static HTML/CSS/JS |
| **Hosting** | GitHub Pages (free) |
| **Cost** | ~$0-1/month |
| **Extensibility** | Hyperlinks to external services or self-hosted apps |
| **Timeline** | Phase 1-6 for core site, Phase 7+ as needed |

---

*Created: 2026-01-18*
*Status: APPROVED*
