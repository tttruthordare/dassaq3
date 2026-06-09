# Technical Specification — Azərbaycan Universitetləri

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0.0 | UI framework |
| react-dom | ^19.0.0 | React DOM renderer |
| vite | ^6.0.0 | Build tool |
| @vitejs/plugin-react | ^4.0.0 | Vite React plugin |
| tailwindcss | ^4.0.0 | Utility-first CSS |
| @tailwindcss/vite | ^4.0.0 | Tailwind Vite integration |
| gsap | ^3.12.0 | Core animation engine + ScrollTrigger |
| lenis | ^1.1.0 | Smooth scroll with inertia |
| lucide-react | ^0.460.0 | Icon library |
| typescript | ^5.6.0 | Type safety |
| @types/react | ^19.0.0 | React type definitions |
| @types/react-dom | ^19.0.0 | ReactDOM type definitions |

**Fonts**: Playfair Display (700) + Inter (400, 500, 600, 700) via Google Fonts `<link>` in `index.html` — no npm package.

---

## Component Inventory

### Layout (shared)

| Component | Source | Notes |
|-----------|--------|-------|
| **Navigation** | Custom | Floating pill bar (`backdrop-filter: blur`), desktop text links + mobile hamburger/full-screen overlay. Fixed at top. |
| **Footer** | Custom | 4-column link grid + bottom row. No shared logic. |

### Reusable Components

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| **CTAButton** | Custom | Hero, AdmissionRequirements, TuitionFees, FAQ, CTA section | Two visual variants: filled (Muted Teal bg) and outline (border only). Accept `variant` prop. |
| **SectionLabel** | Custom | TopUniversities, AdmissionReqs, UniversityTypes, Programs, TuitionFees, StudentLife, FAQ, CTA | Pill tag with tinted background. Needs `isDark` prop for white variant on dark sections. |
| **UniversityCard** | Custom | TopUniversities (×6) | Image top + content area (name, city badge, description, stats, link). Hover lift + image scale. |
| **FeatureCard** | Custom | UniversityTypes (×6) | Icon circle + title + description. Centered layout. |
| **AccordionItem** | Custom | AdmissionRequirements (×5), FAQ (×8) | Expandable with height animation. Chevron rotation on toggle. Keyboard accessible (Enter/Space). |
| **StatBlock** | Custom | Statistics (×4) | Number + accent line + label. Number uses GSAP `snap` counter. |
| **ProgramCard** | Custom | Programs (×6) | Image top + content (name, universities, duration/degree badges). |
| **FeeCard** | Custom | TuitionFees (×3) | Badge banner + title + price + features list + CTA. Three color accent variants (top border). |

### Section Components

All sections are single-use page sections. Each maps 1:1 to a design section:

Hero, TopUniversities, Statistics, AdmissionRequirements, UniversityTypes, Programs, TuitionFees, StudentLife, FAQ, CTASection, Footer

**Non-obvious composition decisions:**
- **Programs section**: The horizontal scrollable row uses native CSS `overflow-x: auto` + `scroll-snap-type: x mandatory` — no carousel library needed. Right-edge fade is a CSS gradient overlay.
- **AdmissionRequirements** uses a 60/40 two-column layout where the right image card is `position: sticky`.
- **Hero** is the only section with `height: 100vh`; all others flow naturally.

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Scroll Reveal (global pattern) | GSAP + ScrollTrigger | Reusable hook `useScrollReveal` wrapping `gsap.from({ opacity:0, y:50 })` with ScrollTrigger `start: "top 85%"`. Stagger parameter configurable. | **Low** |
| Section Header Animation | GSAP + ScrollTrigger | Sequence of 3 reveals (label → heading → description) with fixed 0.15s offsets. Can be a shared component or hook. | **Low** |
| Card Stagger Grid | GSAP + ScrollTrigger | Extends Scroll Reveal with `stagger: 0.12` on card container children. | **Low** |
| Hero Split Panel entrance | GSAP timeline | 5-step timeline on mount (image scale → headline → subheadline → description → CTA). Fires on `DOMContentLoaded` equivalent, not scroll. | **Medium** 🔒 |
| Number counter (Statistics) | GSAP | `gsap.to` with `snap: { innerText: 1 }` on scroll trigger. Preserves suffix (`+`, `K`). One-shot trigger. | **Medium** |
| Parallax (Hero right image, About sticky image, CTA decorative image) | GSAP + ScrollTrigger | `yPercent` tween with `scrub: true`. Rate varies per instance (-8, -5, -10). | **Low** |
| Mobile nav overlay | GSAP | Open: `scaleY(0→1)` from top origin (0.4s) + staggered link reveals. Close: reverse. | **Medium** 🔒 |
| Scroll indicator bounce | CSS keyframes | `translateY(0→8px)` infinite 1.5s ease-in-out. Pure CSS, no library. | **Low** |
| Accordion expand/collapse | GSAP or CSS | Height auto animation (0.3s ease-out). Chevron `rotate(180deg)` via CSS transition. | **Low** |
| Fee card hover | CSS | `translateY(-4px)` + shadow transition. Pure CSS, no JS. | **Low** |

**Reduced motion**: Wrap all GSAP timelines in `prefers-reduced-motion` check — skip to end state when enabled. Lenis smooth scroll also disabled.

---

## State & Logic

No global state library needed. All state is local:

- **Accordion open/closed**: `useState` per item index in parent. No shared state across sections.
- **Mobile nav open/closed**: `useState` in Navigation component. Locks body scroll when open.
- **Lenis instance**: Single shared ref via React context or module-level singleton — accessed by Navigation (scroll-to) and root component (cleanup on unmount).
- **ScrollTrigger cleanup**: All ScrollTrigger instances created in `useEffect` must be killed on unmount via `ScrollTrigger.getAll().forEach(t => t.kill())` or per-trigger cleanup. This is critical for SPA correctness.

---

## Other Key Decisions

**Image strategy**: 16 images total, all generated. Serve as optimized assets in `/public/images/`. Use `loading="lazy"` on all except hero background. Provide WebP with JPG fallback if build tooling supports it; otherwise serve optimized JPG.

**Routing**: Single page, no router. All nav links are anchor scrolls (`#section-id`).

**No shadcn/ui**: The design's aesthetic is fully custom (pill nav, card shadows, color palette, gold accents). Standard shadcn primitives would require more override than value. All components built from scratch with Tailwind.
