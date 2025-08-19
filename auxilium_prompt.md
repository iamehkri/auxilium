# Auxilium.io – One-Shot Site Build Prompt

## Brand Identity

**Tagline:** *Empowering Resilience Through Digital Aid*

**Mission:** Auxilium.io is your digital ally — empowering organizations with modern, beautiful web and app development, meaningful marketing & social media, virtual experiences, media development, AI-powered workflow improvements, and strategic consulting.

### Logo Direction
- Abstract shield/arc + digital nodes.
- Flat vector, scalable to favicon.
- Gradient option: teal → violet → sky.

### Colors
- Auxilium Teal → `#4DD0E1` (primary)
- Resilience Violet → `#7C4DFF` (secondary)
- Calm Sky → `#81D4FA` (gradient mid)
- Digital Silver → `#CFD8DC` (neutral)
- Deep Space → `#0B0C10` (dark background)
- White Sand → `#F9FAFB` (light background)
- **Gradient:** from-teal via-sky to-violet

### Fonts
- **Headings:** Sora (geometric, futuristic)
- **Body:** Inter (neutral, readable)
- **Accent:** Orbitron (optional highlights)
- Gradient heading text (teal→violet).

---

## Layout & Components

### Sticky Liquid-Glass Nav
- Sticky top nav, backdrop blur, semi-transparent, rounded-2xl, subtle border.
- Active highlight: liquid pill slides/resizes.
- Mobile: collapsible vertical nav.

### Background
- Radial vignette (fade edges).
- Dot grid (~22px).
- Gradient blobs: top-left (violet→cyan), bottom-right (cyan→pink).
- Subtle SVG noise overlay.
- Dark-first, light variant supported.

### Hero Section
- Heading: *Empowering Resilience Through Digital Aid* (gradient text).
- Subtext: mission summary.
- CTA buttons: “Work With Us” (filled gradient) + “Our Services” (outline).

### Hero Showcase Grid
- Mosaic layout (desktop: 12-col, 2 rows).
- Service cards:
  - Web & App Development
  - Marketing & Social Media
  - Virtual Experiences
  - Media Development
  - AI-Powered Workflows
  - Strategic Consulting
- Cards: glassy, gradient tag chip, hover scale/glow.
- Staggered animations.

### Animated Beam Section
- Title: *Works With Your Tools*.
- Integration logos: Slack, HubSpot, Salesforce, Notion, Gmail, Stripe, Zapier, Calendly.
- SVG glowing beam travels path with comet-head glow.
- Hover: beam slows, node highlights.

### About Section
- Explains “Resilience” & “Digital Aid”.
- Two-column layout: text + abstract visuals.

### CTA Section
- Gradient block: *“Let’s Build Resilience Together.”*
- Button: *Start Your Project*.
- Glassy overlay card.

### Footer
- Minimal glassy style.
- Logo + tagline.
- Quick links + social icons.
- Copyright.

---

## Technical Requirements

- Framework: Next.js (App Router) + TypeScript + Tailwind.
- Components:
  - `Background.tsx`
  - `LiquidGlassNav.tsx`
  - `HeroShowcaseGrid.tsx`
  - `AnimatedBeam.tsx`
- Dark mode: class-based.
- Tailwind theme with brand colors & fonts.
- Accessibility: WCAG AA compliant.
- Animations: CSS + Framer Motion (if needed).
- Performance: next/image, lazy loading.
- Responsive: mobile-first.

---

## Acceptance Criteria

- Branding is cohesive, futuristic, calming, and empowering.
- Sticky nav, background, hero, grid, and beam work across breakpoints.
- Fast load, accessible, production-ready.

---
