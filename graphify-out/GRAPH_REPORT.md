# Graph Report - /home/essam/work/SHIFT/Website/frontend-test  (2026-08-27)

## Corpus Check
- 27 files · ~51,758 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 243 nodes · 281 edges · 30 communities (20 shown, 10 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 23 edges (avg confidence: 0.84)
- Token cost: 92 input · 806 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Hero Accessibility|Hero Accessibility]]
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_TypeScript Options|TypeScript Options]]
- [[_COMMUNITY_Build Configuration|Build Configuration]]
- [[_COMMUNITY_Mobile Menu Asset|Mobile Menu Asset]]
- [[_COMMUNITY_Graphify Corpus|Graphify Corpus]]
- [[_COMMUNITY_Strict TypeScript|Strict TypeScript]]
- [[_COMMUNITY_Product Positioning|Product Positioning]]
- [[_COMMUNITY_Hero Scroll Flow|Hero Scroll Flow]]
- [[_COMMUNITY_Brand Foundations|Brand Foundations]]
- [[_COMMUNITY_Warm Atmosphere|Warm Atmosphere]]
- [[_COMMUNITY_Desktop CTA Arrow|Desktop CTA Arrow]]
- [[_COMMUNITY_React Entry Point|React Entry Point]]
- [[_COMMUNITY_Mobile CTA Arrow|Mobile CTA Arrow]]
- [[_COMMUNITY_Glass Visual Language|Glass Visual Language]]
- [[_COMMUNITY_Desktop Blue Atmosphere|Desktop Blue Atmosphere]]
- [[_COMMUNITY_Asset Inventory|Asset Inventory]]
- [[_COMMUNITY_Mobile Orange Atmosphere|Mobile Orange Atmosphere]]
- [[_COMMUNITY_TypeScript References|TypeScript References]]
- [[_COMMUNITY_Desktop Orange Atmosphere|Desktop Orange Atmosphere]]
- [[_COMMUNITY_Mobile Blue Atmosphere|Mobile Blue Atmosphere]]
- [[_COMMUNITY_Header Signal Marker|Header Signal Marker]]
- [[_COMMUNITY_Figma Reference|Figma Reference]]
- [[_COMMUNITY_Favicon Mark|Favicon Mark]]
- [[_COMMUNITY_Wordmark Logo|Wordmark Logo]]
- [[_COMMUNITY_Bridge Arrow Asset|Bridge Arrow Asset]]

## God Nodes (most connected - your core abstractions)
1. `ShiftHero()` - 28 edges
2. `compilerOptions` - 17 edges
3. `compilerOptions` - 12 edges
4. `scrollToTarget()` - 8 edges
5. `Root <svg> element` - 8 edges
6. `files` - 6 edges
7. `Circle: Mobile Nav / Menu Button` - 6 edges
8. `SHIFT brand identity` - 5 edges
9. `First viewport Orbit composition` - 5 edges
10. `SHIFT typography tokens` - 5 edges

## Surprising Connections (you probably didn't know these)
- `scrollToTarget()` --references--> `Reduced-motion support`  [EXTRACTED]
  src/components/ShiftHero.tsx → frontend-test/PRODUCT.md
- `ShiftHero()` --implements--> `Semantic landmarks and keyboard-visible focus`  [EXTRACTED]
  src/components/ShiftHero.tsx → frontend-test/PRODUCT.md
- `ShiftHero()` --references--> `Desktop orange atmosphere layer`  [EXTRACTED]
  src/components/ShiftHero.tsx → frontend-test/public/assets/desktop-orange-atmosphere.svg
- `ShiftHero()` --references--> `Desktop blue atmosphere layer`  [EXTRACTED]
  src/components/ShiftHero.tsx → frontend-test/public/assets/desktop-blue-atmosphere.svg
- `ShiftHero()` --references--> `Desktop warm atmosphere layer`  [EXTRACTED]
  src/components/ShiftHero.tsx → frontend-test/public/assets/desktop-warm-atmosphere.svg

## Hyperedges (group relationships)
- **SHIFT first implementation stack** — product_implementation_stack, tech_react, tech_react_dom, tech_vite, tech_typescript, tech_tailwind_css [EXTRACTED 1.00]
- **SHIFT Orbit visual system** — shift_orbit_hero, desktop_orbit_composition, mobile_orbit_composition, glass_field_visual_mechanism, shift_color_tokens [EXTRACTED 1.00]
- **Hero navigation and menu interaction flow** — components_shifthero_shifthero, components_shifthero_navitems, components_shifthero_scrolltotarget, components_shifthero_menu_open_state, components_shifthero_next_stage_bridge [EXTRACTED 1.00]
- **Mobile menu circular button visual** — mobile_menu_svg, mobile_menu_circle, mobile_menu_fill_fe5e0e, mobile_navigation_menu_button [INFERRED 0.85]
- **Primary Arrow SVG Composition** — primary_arrow_svg, svg_root_structure, primary_cta_arrow, arrow_vector_path [EXTRACTED 1.00]
- **Desktop warm atmosphere SVG construction** — warm_atmosphere_background_group, centered_warm_ellipse, warm_atmosphere_blur_filter, gaussian_blur_35, warm_cream_f2ede5 [EXTRACTED 1.00]
- **Mobile Primary CTA Arrow SVG Structure** — mobile_primary_arrow_svg_root, v4_hero_primary_cta_arrow_group, mobile_primary_arrow_vector_path [EXTRACTED 1.00]

## Communities (30 total, 10 thin omitted)

### Community 0 - "Hero Accessibility"
Cohesion: 0.07
Nodes (33): Accessibility and inclusion contract, Accessible mobile menu with explicit expanded state, Contact anchor, menuOpen state, navItems, ShiftHero(), SignalArrow(), Wordmark() (+25 more)

### Community 1 - "Package Dependencies"
Cohesion: 0.09
Nodes (21): dependencies, react, react-dom, devDependencies, autoprefixer, postcss, tailwindcss, @types/node (+13 more)

### Community 2 - "TypeScript Options"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, allowSyntheticDefaultImports, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib (+10 more)

### Community 3 - "Build Configuration"
Cohesion: 0.12
Nodes (12): PostCSS Tailwind + Autoprefixer pipeline, React + Vite + TypeScript + Tailwind CSS stack, Autoprefixer, PostCSS, React, React DOM, TypeScript, Vite (+4 more)

### Community 4 - "Mobile Menu Asset"
Cohesion: 0.15
Nodes (15): Circular mobile-menu button surface, 38 × 38 SVG canvas, Circle: Mobile Nav / Menu Button, Circle center (19, 19), Circle radius 19, Block display style, Orange fill #FE5E0E, Visible overflow (+7 more)

### Community 5 - "Graphify Corpus"
Cohesion: 0.14
Nodes (13): files, code, document, image, paper, video, graphifyignore_patterns, needs_graph (+5 more)

### Community 6 - "Strict TypeScript"
Cohesion: 0.14
Nodes (13): compilerOptions, allowImportingTsExtensions, lib, module, moduleDetection, moduleResolution, noEmit, skipLibCheck (+5 more)

### Community 7 - "Product Positioning"
Cohesion: 0.18
Nodes (13): Approved Figma Orbit hero frames, Founder-led businesses in Egypt and Arab markets, Hero scope limited to websites and web solutions, Website keeps pace with business growth, No fabricated clients, testimonials, metrics, or case studies, Progress is the outcome; technology is the tool, SHIFT Creative Solutions, Website as the first proof of craft (+5 more)

### Community 8 - "Hero Scroll Flow"
Cohesion: 0.17
Nodes (8): Next-stage bridge, scrollToTarget(), First viewport Orbit composition, Glass-field visual mechanism, Motion and visual detail support comprehension, optional close callback, SHIFT Orbit hero direction contract, SHIFT Orbit Hero

### Community 9 - "Brand Foundations"
Cohesion: 0.21
Nodes (10): Arabic-first RTL dark-first marketing surface, Arabic RTL site locale, Inter for metadata and navigation, Noto Sans Arabic, SHIFT favicon, SHIFT brand identity, SHIFT color tokens, SHIFT typography tokens (+2 more)

### Community 10 - "Warm Atmosphere"
Cohesion: 0.28
Nodes (9): Aspect-ratio-free container stretch, Centered warm ellipse, Desktop decorative background layer, 470 × 360 SVG canvas, Desktop Warm Atmosphere SVG, 35-unit Gaussian blur, Background / Warm Atmosphere group, Warm atmosphere blur filter (+1 more)

### Community 11 - "Desktop CTA Arrow"
Cohesion: 0.32
Nodes (8): Diagonal Up-Right Arrow Vector Path, Diagonal Up-Right Arrow Geometry, Hero Primary CTA, 16x16 Icon Viewport, Near-Black Arrow Stroke (#0A0A0A), Primary Arrow SVG, V4 Hero Primary CTA Arrow Group, SVG Root Structure

### Community 13 - "Mobile CTA Arrow"
Cohesion: 0.33
Nodes (6): Near-Black Arrow Stroke (#0A0A0A), Mobile Primary CTA Arrow SVG (16x16), SVG Root Element, 16x16 Viewport, Diagonal Up-Right Arrow Vector Path, Mobile Primary CTA Component, V4 / Hero / Primary CTA / Arrow Group

### Community 14 - "Glass Visual Language"
Cohesion: 0.50
Nodes (4): Dark Glassmorphism Visual Language, Hero Background Visual, Left Text Overlay Composition, SHIFT Glass Field Asset

### Community 15 - "Desktop Blue Atmosphere"
Cohesion: 0.67
Nodes (3): Desktop Decorative Blue Atmosphere Background, Soft Blue Gaussian-Blur Glow, Desktop Blue Atmosphere SVG

### Community 17 - "Mobile Orange Atmosphere"
Cohesion: 0.67
Nodes (3): Mobile Orange Atmosphere SVG, Mobile Orange Atmosphere Background Treatment, Soft Orange Gaussian-Blur Glow

## Knowledge Gaps
- **82 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+77 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ShiftHero()` connect `Hero Accessibility` to `Hero Scroll Flow`, `React Entry Point`, `Product Positioning`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `React + Vite + TypeScript + Tailwind CSS stack` connect `Build Configuration` to `Product Positioning`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `Tailwind CSS` connect `Brand Foundations` to `Build Configuration`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _120 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Hero Accessibility` be split into smaller, more focused modules?**
  _Cohesion score 0.07439024390243902 - nodes in this community are weakly interconnected._
- **Should `Package Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `TypeScript Options` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._