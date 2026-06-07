# PR #1: Temple Grounds Layout Map on Main Page

## Meta
- PR: #1
- Title: feat: add temple grounds layout map to main page
- Head branch: codespaces
- Base branch: main
- Status: Draft
- Related ADRs: none

## Summary
Retrofit the main page (`index.html`) to display a spatial map of the temple grounds based on the layout defined in `documentation/project_overview/temple_layout.md`. Each building or entity is rendered as a clickable placeholder (text label) arranged in a grid that mirrors the traditional axial temple plan — central axis running south-to-north with east/west wings flanking it. No sub-page links are wired yet; they will be added in a future PR.

## Context
- Problem / motivation: The main page only showed the central Buddha image and ritual icons. There was no visual representation of the full temple grounds and its buildings.
- Constraints: Static site, vanilla JS/CSS only. No icons generated — building names used as labels per request.
- Non-goals: Wiring actual sub-page links, adding building detail pages, or adding icons/images for buildings.

## Approach
- High-level plan: Add a `.temple-grounds` section to `index.html` with a 3-column CSS grid (`temple-map`). Each grid cell is either a clickable `<a>` tag (a building) or an empty `<div>` (empty corners). Place the section between the existing Buddha image section and the mantra.
- Key design notes:
  - Grid columns: West wing | Central axis | East wing
  - Rows (south → north, i.e. entrance → deepest point): 山门 → 天王殿 → 大雄宝殿 → 药师殿 → 药师塔
  - East wing (right column): 钟楼, 观音殿, 药草园
  - West wing (left column): 鼓楼, 地藏殿, 斋堂
  - Axis buildings styled in gold; wing buildings in white/red
  - All `<a>` tags use `href="#"` as placeholder for future sub-links

## Changes
- Added: `.temple-grounds` section in `docs/index.html`
- Added: CSS rules for `.temple-grounds`, `.temple-map`, `.building-btn`, `.axis-building`, `.wing-building`, `.bldg-sub`, and responsive overrides in `docs/css/style.css`
- Changed: nothing removed from existing page content

## Testing / Validation
- Tests run: none (static site)
- Manual checks: visual inspection in browser at localhost:8000
- Performance impact: negligible — pure CSS/HTML, no assets added
- Security/permissions considerations: none

## Risks & Rollback
- Risks: Layout may look cramped on very small screens
- Mitigations: responsive CSS collapses font sizes and padding on mobile
- Rollback plan: revert the two file edits (index.html section + style.css rules)

## Notes / Decisions made during implementation
- Used `<a href="#">` instead of `<button>` so buildings are naturally navigable and can accept real hrefs in future
- Central axis buildings use a gold tint to distinguish them from wing buildings
- 药师塔 given slightly larger font to mark it as the spiritual apex
- Map orientation: left = West, right = East, top = South (entrance), bottom = North (deepest) — matches visitor perspective entering the temple

## TODO
- [X] Rearrange main page layout (order and placement of existing sections)
- [X] Wire sub-page links to each building button
- [X] Add new main page a picture of Buddha use the picture docs/images/main_pic.jpeg,current main page as "道场 Temple"
- [ ] Add building detail pages per structure

## References
- Issue(s): n/a
- Docs: documentation/project_overview/temple_layout.md
- Related PRs: none
