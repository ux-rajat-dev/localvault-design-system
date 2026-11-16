# LocalVault Design Tokens Specification

This document provides the complete design token reference for the **LocalVault Master Design System**.

Tokens are defined in `src/styles/tokens.css` and exposed directly as Tailwind utilities via `@theme inline` in `src/styles/globals.css`.

---

## 🎨 Color Palette & Themes

The design system implements a high-contrast desktop aesthetic with strict dark and light modes. The active theme is controlled by the canonical `[data-theme="light" | "dark"]` attribute on `<html>`, with backward-compatible support for `[data-lv-theme]` and `.light` / `.dark` classes.

### 1. Theme Variables

| Canonical Variable | Tailwind Utility | Light Value | Dark Value | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `--lv-bg` | `bg-lv-bg` | `#F8FAFC` (Slate 50) | `#0B1020` (Deep Navy) | App canvas background |
| `--lv-surface` | `bg-lv-surface` | `#FFFFFF` (Pure White) | `#151B2D` (Midnight Surface) | Cards, panels, sidebars |
| `--lv-surface-subtle` | `bg-lv-surface-subtle` | `#F1F5F9` | `#1A233A` | Hover states, secondary panels |
| `--lv-text` | `text-lv-text` | `#0F172A` (Slate 900) | `#F8FAFC` (Slate 50) | Primary typography |
| `--lv-text-muted` | `text-lv-text-muted` | `#64748B` (Slate 500) | `#94A3B8` (Slate 400) | Secondary / helper text |
| `--lv-accent` | `bg-lv-accent`, `text-lv-accent` | `#6366F1` (Indigo 500) | `#818CF8` (Indigo 400) | Primary actions, focus rings |
| `--lv-accent-hover` | `bg-lv-accent-hover` | `#4F46E5` (Indigo 600) | `#6366F1` (Indigo 500) | Button hover states |
| `--lv-on-accent` | `text-lv-on-accent` | `#FFFFFF` | `#FFFFFF` | Text on accent surfaces |
| `--lv-border` | `border-lv-border` | `#E2E8F0` (Slate 200) | `#293247` (Navy Border) | Standard dividers & borders |
| `--lv-border-hover` | `border-lv-border-hover` | `#CBD5E1` | `#3A4763` | Interactive hover borders |

---

### 2. Semantic Feedback Colors

Semantic tokens remain consistent across themes to ensure instant recognition of status and alerts:

| Canonical Variable | Tailwind Utility | Value | Usage |
| :--- | :--- | :--- | :--- |
| `--lv-success` | `bg-lv-success`, `text-lv-success` | `#16A34A` (Green 600) | Connected, sync complete, success badge |
| `--lv-warning` | `bg-lv-warning`, `text-lv-warning` | `#D97706` (Amber 600) | Sync paused, storage low, warnings |
| `--lv-danger` | `bg-lv-danger`, `text-lv-danger` | `#DC2626` (Red 600) | Disconnected, deletion, error states |
| `--lv-info` | `bg-lv-info`, `text-lv-info` | `#0284C7` (Sky 600) | Informational banners, active transfers |

---

### 3. Backward-Compatibility Aliases

To support components migrating from Part 01 without manual code churn, the following aliases are defined in `tokens.css`:

```css
:root {
  --lv-color-bg: var(--lv-bg);
  --lv-color-surface: var(--lv-surface);
  --lv-color-text: var(--lv-text);
  --lv-color-text-muted: var(--lv-text-muted);
  --lv-color-accent: var(--lv-accent);
  --lv-color-border: var(--lv-border);
  --lv-color-success: var(--lv-success);
  --lv-color-warning: var(--lv-warning);
  --lv-color-danger: var(--lv-danger);
  --lv-color-info: var(--lv-info);
}
```

---

## 🔤 Typography Scale

LocalVault specifies the **Inter** font family with native OS fallback stacks:

```css
font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

### Type Scale Specification

All classes are registered as custom Tailwind utilities (`@utility text-*`) and configured in `extendedTwMerge` to prevent class-dropping conflicts:

| Utility Class | Font Size | Line Height | Font Weight | Typical Usage |
| :--- | :--- | :--- | :--- | :--- |
| `text-display` | `32px` (`2rem`) | `40px` (`1.25`) | `700` (Bold) | Welcome heroes, dashboard title |
| `text-h1` | `28px` (`1.75rem`) | `36px` (`1.28`) | `700` (Bold) | Page headers, main view headers |
| `text-h2` | `22px` (`1.375rem`) | `30px` (`1.36`) | `600` (Semibold) | Card group headers, section titles |
| `text-h3` | `18px` (`1.125rem`) | `26px` (`1.44`) | `600` (Semibold) | Dialog titles, drawer headings |
| `text-body` | `14px` (`0.875rem`) | `22px` (`1.57`) | `400` / `500` | Standard body text, form inputs, table rows |
| `text-small` | `13px` (`0.8125rem`) | `20px` (`1.53`) | `400` / `500` | Secondary metadata, breadcrumbs, badges |
| `text-caption` | `12px` (`0.75rem`) | `18px` (`1.50`) | `400` / `600` | Timestamp tags, device IP pills, footnotes |

---

## 📐 Spacing Scale

Based on a strict 4px grid:

| Token / Class | Value | Usage |
| :--- | :--- | :--- |
| `p-1`, `gap-1` | `4px` (`0.25rem`) | Icon gaps, tight badge padding |
| `p-2`, `gap-2` | `8px` (`0.5rem`) | Button padding, icon spacing |
| `p-3`, `gap-3` | `12px` (`0.75rem`) | Input field padding, compact card padding |
| `p-4`, `gap-4` | `16px` (`1.0rem`) | Standard card padding, modal content padding |
| `p-5`, `gap-5` | `20px` (`1.25rem`) | Toolbar spacing, medium section headers |
| `p-6`, `gap-6` | `24px` (`1.5rem`) | Page container gutters, dialog outer padding |
| `p-8`, `gap-8` | `32px` (`2.0rem`) | Empty state padding, large heroes |
| `p-12`, `gap-12` | `48px` (`3.0rem`) | Primary page view boundaries |

---

## 🔘 Corner Radii

| CSS Variable | Tailwind Utility | Value | Target Components |
| :--- | :--- | :--- | :--- |
| `--lv-radius-sm` | `rounded-lv-sm` | `6px` | Small badges, sub-inputs, keyboard shortcut tags |
| `--lv-radius-md` | `rounded-lv-md` | `10px` | Standard buttons, input fields, dropdown menus |
| `--lv-radius-lg` | `rounded-lv-lg` | `14px` | Standard cards, folder cards, popover panels |
| `--lv-radius-xl` | `rounded-lv-xl` | `18px` | Modal dialogs, drawer panels |
| `--lv-radius-full` | `rounded-lv-full` | `9999px` | Circular progress, avatar rings, pill badges |

---

## 🌑 Elevation & Shadows

Shadows adjust dynamically between Light mode (soft diffuse shadows) and Dark mode (deep ambient glow and border highlights):

| CSS Variable | Tailwind Utility | Light Value | Dark Value |
| :--- | :--- | :--- | :--- |
| `--lv-shadow-sm` | `shadow-lv-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | `0 1px 2px 0 rgb(0 0 0 / 0.3)` |
| `--lv-shadow-md` | `shadow-lv-md` | `0 4px 6px -1px rgb(0 0 0 / 0.08)` | `0 4px 12px -2px rgb(0 0 0 / 0.4)` |
| `--lv-shadow-lg` | `shadow-lv-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1)` | `0 10px 25px -4px rgb(0 0 0 / 0.5)` |
| `--lv-shadow-xl` | `shadow-lv-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.12)` | `0 20px 30px -6px rgb(0 0 0 / 0.6)` |

---

## ⚡ Motion & Transitions

| Variable | Value | Usage |
| :--- | :--- | :--- |
| `--lv-duration-fast` | `150ms` | Hover states, button clicks, icon rotations |
| `--lv-duration-normal` | `200ms` | Dropdown openings, accordion expands |
| `--lv-duration-slow` | `300ms` | Modal backdrops, dialog entries, theme transitions |
| `--lv-ease` | `cubic-bezier(0.16, 1, 0.3, 1)` | Natural deceleration curve |
