# Development Plan: Online Buddhist Temple

## Vision

**Bhaisajyaguru (药师琉璃光如来)** - An online Buddhist temple to share and preach Buddhism through a peaceful, meditative web experience.

---

## Site Structure

```
┌─────────────────────────────────────────────────────────────┐
│                     药师琉璃光如来                            │
│                  Online Buddhist Temple                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│    [Temple]      [Scriptures]      [Contacts]               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Navigation Tabs

| Tab | Chinese | Description |
|-----|---------|-------------|
| **Temple** | 佛堂 | Interactive temple with icons, images, and music |
| **Scriptures** | 经典 | Buddhist scriptures and teachings |
| **Contacts** | 联系 | Contact information and donation |

---

## Page Specifications

### 1. Temple Page (佛堂) - `index.html`

The main interactive experience. A virtual temple hall where visitors can explore.

#### Layout

```
┌─────────────────────────────────────────────────────────────┐
│                      Navigation Bar                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                    ┌─────────────┐                          │
│                    │   Buddha    │                          │
│                    │   Image     │                          │
│                    └─────────────┘                          │
│                                                              │
│     ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    │
│     │ 🔔  │    │ 🪘  │    │ 📿  │    │ 🪷  │    │ 🎵  │    │
│     │Bell │    │Drum │    │Beads│    │Lotus│    │Chant│    │
│     └─────┘    └─────┘    └─────┘    └─────┘    └─────┘    │
│                                                              │
│                  [Sacred Text / Mantra]                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Interactive Elements

| Icon | Name | Click Action |
|------|------|--------------|
| 🔔 | Temple Bell | Play bell sound + show bell image |
| 🪘 | Wooden Fish (木鱼) | Play wooden fish sound + show image |
| 📿 | Prayer Beads (念珠) | Show beads image + play counting sound |
| 🪷 | Lotus (莲花) | Show lotus offering image |
| 🎵 | Chanting (诵经) | Play Buddhist chant/sutra audio |
| 🙏 | Incense (香) | Show incense animation/image |

#### Technical Implementation

```html
<!-- Icon Button Structure -->
<div class="temple-icons">
  <button class="icon-btn" data-image="bell.jpg" data-sound="bell.mp3">
    <span class="icon">🔔</span>
    <span class="label">Temple Bell</span>
  </button>
  <!-- More icons... -->
</div>

<!-- Image Display Area -->
<div id="image-display" class="hidden">
  <img id="display-image" src="" alt="">
  <button class="close-btn">×</button>
</div>

<!-- Audio Elements -->
<audio id="audio-player" preload="none"></audio>
```

```javascript
// Simple click handler (vanilla JS)
document.querySelectorAll('.icon-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Show image
    const imgSrc = btn.dataset.image;
    document.getElementById('display-image').src = `images/${imgSrc}`;
    document.getElementById('image-display').classList.remove('hidden');

    // Play sound
    const soundSrc = btn.dataset.sound;
    const audio = document.getElementById('audio-player');
    audio.src = `sounds/${soundSrc}`;
    audio.play();
  });
});
```

#### Assets Needed

**Images:**
| File | Description |
|------|-------------|
| `buddha.jpg` | Main Buddha image (Medicine Buddha) |
| `bell.jpg` | Temple bell image |
| `wooden_fish.jpg` | Wooden fish (木鱼) image |
| `beads.jpg` | Prayer beads image |
| `lotus.jpg` | Lotus flower offering |
| `incense.jpg` | Burning incense image |

**Audio:**
| File | Description | Duration |
|------|-------------|----------|
| `bell.mp3` | Temple bell sound | 3-5 sec |
| `wooden_fish.mp3` | Wooden fish rhythm | 5-10 sec |
| `chanting.mp3` | Buddhist chanting | 1-3 min |
| `mantra.mp3` | Medicine Buddha mantra | 1-2 min |
| `ambient.mp3` | Temple ambient sound (optional) | loop |

---

### 2. Scriptures Page (经典) - `scriptures.html`

A collection of Buddhist scriptures and teachings.

#### Layout

```
┌─────────────────────────────────────────────────────────────┐
│                      Navigation Bar                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Scripture Categories:                                       │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │ 药师经            │  │ 心经              │                 │
│  │ Medicine Buddha  │  │ Heart Sutra      │                 │
│  │ Sutra            │  │                  │                 │
│  └──────────────────┘  └──────────────────┘                 │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │ 大悲咒            │  │ 般若经            │                 │
│  │ Great Compassion │  │ Prajna Sutra     │                 │
│  │ Mantra           │  │                  │                 │
│  └──────────────────┘  └──────────────────┘                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Content Structure

```
scriptures/
├── medicine-buddha-sutra.html    # 药师琉璃光如来本愿功德经
├── heart-sutra.html              # 般若波罗蜜多心经
├── great-compassion-mantra.html  # 大悲咒
└── (expandable)
```

#### Scripture Display Format

```
┌─────────────────────────────────────────┐
│  药师琉璃光如来本愿功德经                  │
│  Medicine Buddha Sutra                  │
├─────────────────────────────────────────┤
│                                         │
│  [Audio Player: Listen to Chanting]     │
│                                         │
│  如是我闻。一时薄伽梵游化诸国...          │
│                                         │
│  (Full sutra text with proper          │
│   formatting and line breaks)           │
│                                         │
└─────────────────────────────────────────┘
```

---

### 3. Contacts Page (联系) - `contacts.html`

Contact information and support options.

#### Content

```
┌─────────────────────────────────────────────────────────────┐
│                      Navigation Bar                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                      联系我们                                 │
│                    Contact Us                                │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Email: [contact email]                             │    │
│  │                                                     │    │
│  │  Location: [temple/organization info]               │    │
│  │                                                     │    │
│  │  Social Media: [links if applicable]                │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│                      随喜功德                                 │
│                    Donations                                 │
│                                                              │
│                    ┌──────────┐                              │
│                    │  QR Code │                              │
│                    │          │                              │
│                    └──────────┘                              │
│                                                              │
│              Thank you for your support                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

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
│   │   └── medicine-buddha.jpg
│   ├── icons/
│   │   ├── bell.jpg
│   │   ├── wooden-fish.jpg
│   │   ├── beads.jpg
│   │   ├── lotus.jpg
│   │   └── incense.jpg
│   ├── main_pic.png       # (existing)
│   └── qr.jpeg             # (existing)
└── sounds/
    ├── bell.mp3
    ├── wooden-fish.mp3
    ├── chanting.mp3
    └── mantra.mp3
```

---

## Design Guidelines

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Sky Blue | `#87CEEB` | Background (current) |
| Gold | `#D4AF37` | Accents, icons |
| Deep Red | `#8B0000` | Temple elements |
| White | `#FFFFFF` | Text, cards |
| Black | `#1A1A1A` | Primary text |

### Typography

- **Headings:** Serif font for traditional feel (e.g., Noto Serif SC)
- **Body:** Clean sans-serif for readability
- **Scriptures:** Traditional Chinese typography, generous line-height

### Visual Style

- Peaceful, meditative atmosphere
- Traditional Buddhist aesthetic
- Ample whitespace
- Subtle animations (fade-in, gentle hover effects)
- Mobile-responsive design

---

## Development Phases

### Phase 1: Core Structure
- [ ] Set up static site directory
- [ ] Create base HTML template
- [ ] Build navigation component
- [ ] Style with CSS (responsive)

### Phase 2: Temple Page
- [ ] Design icon grid layout
- [ ] Implement image popup/modal
- [ ] Add audio playback functionality
- [ ] Create smooth transitions

### Phase 3: Scriptures Page
- [ ] Create scripture listing page
- [ ] Build individual scripture pages
- [ ] Add audio players for chanting
- [ ] Style text for readability

### Phase 4: Contacts Page
- [ ] Create contact information section
- [ ] Add donation section with QR code
- [ ] Style for consistency

### Phase 5: Assets & Polish
- [ ] Gather/create images
- [ ] Source/record audio files
- [ ] Optimize assets for web
- [ ] Cross-browser testing
- [ ] Mobile testing

### Phase 6: Deployment
- [ ] Deploy to GitHub Pages / Netlify
- [ ] Set up custom domain (optional)
- [ ] Verify all functionality

---

## Asset Sources

### Images (Options)

| Source | Type | License |
|--------|------|---------|
| Unsplash | Photos | Free |
| Wikimedia Commons | Buddhist art | Various (check each) |
| Custom photography | Original | Own |
| AI-generated | Illustrations | Depends on tool |

### Audio (Options)

| Source | Type | Notes |
|--------|------|-------|
| Freesound.org | Sound effects | Various licenses |
| YouTube Audio Library | Music | Free for use |
| Self-recorded | Original | Best for authenticity |
| Buddhist meditation apps | Reference | For style reference only |

---

## Technical Requirements

### Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

### Performance Goals

- Page load: < 3 seconds
- Images: Optimized, lazy-loaded
- Audio: Preload on demand only
- Lighthouse score: > 90

### Accessibility

- Alt text for all images
- Keyboard navigation support
- Audio controls visible
- Sufficient color contrast
- Screen reader compatible

---

## Future Enhancements (Post-Launch)

| Feature | Description | Priority |
|---------|-------------|----------|
| Multi-language | English/Chinese toggle | Medium |
| More scriptures | Expand scripture collection | Medium |
| Meditation timer | Guided meditation feature | Low |
| Virtual offering | Animated incense/candle | Low |
| Daily blessing | Random scripture quote | Low |

---

*Last updated: 2026-01-15*
*Status: DRAFT*
