---
name: Agro-Telemetry Orchestration
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#414942'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#717972'
  outline-variant: '#c1c9c0'
  surface-tint: '#3c674b'
  primary: '#002411'
  on-primary: '#ffffff'
  primary-container: '#0d3b22'
  on-primary-container: '#78a685'
  inverse-primary: '#a2d2ae'
  secondary: '#3b674f'
  on-secondary: '#ffffff'
  secondary-container: '#bdeecf'
  on-secondary-container: '#416d55'
  tertiary: '#141f30'
  on-tertiary: '#ffffff'
  tertiary-container: '#293446'
  on-tertiary-container: '#919cb3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bdeec9'
  primary-fixed-dim: '#a2d2ae'
  on-primary-fixed: '#00210f'
  on-primary-fixed-variant: '#244f34'
  secondary-fixed: '#bdeecf'
  secondary-fixed-dim: '#a1d1b4'
  on-secondary-fixed: '#002112'
  on-secondary-fixed-variant: '#224f39'
  tertiary-fixed: '#d8e3fb'
  tertiary-fixed-dim: '#bcc7de'
  on-tertiary-fixed: '#111c2d'
  on-tertiary-fixed-variant: '#3c475a'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 2rem
    fontWeight: '700'
    lineHeight: 2.5rem
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 1.5rem
    fontWeight: '700'
    lineHeight: 2rem
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1rem
  label-lg:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: 0.875rem
  telemetry-metric:
    fontFamily: JetBrains Mono
    fontSize: 1.25rem
    fontWeight: '700'
    lineHeight: 1.5rem
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-tablet: 1rem
  gutter-desktop: 1.5rem
  margin: 0.75rem
  margin-tablet: 1.25rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.375rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style
The design system establishes an ultra-precise, mission-critical operational environment engineered for enterprise agronomists, field operations directors, and autonomous multi-agent fleet dispatchers. Balancing computational telemetry with industrial field utility, the design aesthetic merges Technical Modernism with High-Density Instrumental utility.

Interfaces must project absolute operational reliability under high cognitive load, harsh sunlight, and rapid field triage. The aesthetic eschews decorative fluff in favor of structural clarity, high-contrast status signifiers, hairline borders, and tactical data density reminiscent of avionics consoles adapted for field machinery and distributed agronomic telemetry.

## Colors
The palette balances deep botanical authorities with industrial hardware neutrals and clear telemetry semantics:

- **Primary (`#0D3B22`)**: Deep Forest Green serves as the primary ground for authoritative brand moments, primary CTAs, active telemetry roots, and key operational confirmations.
- **Secondary (`#4E7B62`)**: Sage/Leaf Mid-tone provides structural framing for secondary interactions, active filters, selected state fills, and sub-tier telemetry metrics.
- **Tertiary (`#1E293B`)**: Dark Slate/Charcoal anchors structural shell architecture, persistent top control bars, bottom fleet navigation rails, and modal title bars.
- **Neutral (`#64748B`)**: Structural steel slate informing borders, muted legends, inactive tracking states, and micro-grid rules.
- **Canvas & Card Layers**: Base background uses `#F8FAFC` (Slate 50), with operational cards rendered on `#FFFFFF` bordered with `#E2E8F0` for crisp dimensional separation.
- **Status & Telemetry Accents**:
  - `Status Optimal/Active`: `#10B981` (Emerald Green)
  - `Status Warning/Deferred`: `#F59E0B` (Amber)
  - `Status Critical/Aborted`: `#EF4444` (Crimson)

## Typography
Typographic rules follow a rigid operational hierarchy:

1. **System & Section Headers (`Space Grotesk`)**: Technical, geometric, authoritative. Provides structural anchors for dashboard modules, agent dispatch queues, and field zone monitors.
2. **Operational Text (`Inter`)**: Neutral, highly legible humanist-grotesque optimized for high-density reading of prescription models, diagnostic logs, and multi-line agent instructions.
3. **Telemetry & Sensor Data (`JetBrains Mono`)**: Strict tabular lining figures. Applied to all coordinate vectors (GPS/RTK), chemical distribution values (kg/ha, pH, soil moisture % levels), autonomous agent status codes, timestamps, and model inference confidences.

## Layout & Spacing
Designed around mobile ergonomics and condensed field viewports:

- **Layout Structure**: 4-column fluid layout on mobile viewports (< 640px), 8-column layout on tablet field displays (640px - 1024px), and 12-column layout on master consoles (> 1024px).
- **Density Index**: Compact enterprise density. Vertical stacking prioritizes one-thumb interactions with vital status metrics accessible within the bottom 60% of the viewport.
- **Rhythm**: Spacing follows a 4px/6px base grid step. Tight micro-gaps (`space-xs` and `space-sm`) group unified telemetry readings, while `space-lg` and `space-xl` insulate mission-critical orchestrator triggers from passive data feeds.

## Elevation & Depth
Visual hierarchy is articulated through flat structural tiers, strict hairline perimeter boundaries, and subtle tonal depth rather than diffuse blur-heavy drop shadows:

- **Surface Tier 0 (Canvas)**: `#F8FAFC` base application field.
- **Surface Tier 1 (Containers & Cards)**: Solid `#FFFFFF` elevated solely by a 1px border (`#E2E8F0`). Under active focus or critical alert, border color pivots to the matching semantic token (`#10B981`, `#F59E0B`, or `#EF4444`).
- **Surface Tier 2 (Overlays, Tactical Drawers, Sticky Toolbars)**: `#1E293B` Slate header/footer anchors with subtle downward elevation: `0 1px 3px 0 rgba(15, 23, 42, 0.08)`.
- **Surface Tier 3 (Floating HUD Overlays & Quick-Action Triggers)**: White or Charcoal backdrops framed with a 1px border (`#CBD5E1` or `#334155`) and an ambient, directional shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.

## Shapes
A "Soft" geometric profile (`roundedness: 1`) governs the system. UI elements utilize `0.25rem` (4px) corner radii for high-density cards, telemetry meters, and input controls, accentuating the rugged, precise telemetry instrument feel. 

Segmented pills, active status badges, and inline status pills use a strict capsule radius (9999px) to distinctly contrast interactive tags against squared analytical containers.

## Components

### Buttons
- **Primary Action**: Forest green (`#0D3B22`) solid fill, white text, 4px border-radius, minimum mobile touch target of 44px. Active state transitions to `#082415`.
- **Secondary Action**: White fill, 1px border in `#CBD5E1`, text in `#1E293B`. Active state uses `#F1F5F9`.
- **Destructive/Abort**: Crimson (`#EF4444`) solid fill or 1px Crimson outline with bold warning label.

### Segmented Controls & Pills
- **Segmented Filter Rails**: Embedded in a `#E2E8F0` track. Active tab displays `#1E293B` text against `#FFFFFF` pill with a 1px border (`#CBD5E1`), while inactive items remain muted `#64748B`.
- **Telemetry Chips**: Compact pill badge (`rounded-full`) with `label-sm` monospace typography. Includes an 6px pulse dot indicating live sync (`#10B981` optimal, `#F59E0B` latency/degraded, `#EF4444` offline/error).

### Form Controls & Toggles
- **Inputs**: Hairline 1px border (`#CBD5E1`), background `#FFFFFF`, text `#0F172A`. Focused state upgrades to `#0D3B22` 1.5px border with zero glow radius. Labels set in `label-sm` monospace caps.
- **Tactile Toggles**: 44x24px track. Deactivated: `#CBD5E1` with `#FFFFFF` circular knob. Activated: `#0D3B22` track with `#FFFFFF` knob offset, delivering a crisp physical switch click-feel.

### Cards & Data Modules
- **Telemetry Card**: `#FFFFFF` background, 4px roundedness, 1px `#E2E8F0` border. Headers split horizontally with Space Grotesk zone titles on the left and live JetBrains Mono telemetry metrics aligned right.
- **Agent Orchestration Row**: Dense tabular strip featuring Agent ID, autonomous status pill, current task vector, and instantaneous override action buttons.