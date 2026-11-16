# LocalVault Master Design System

A unified, accessible, desktop-first design system and component library built for **LocalVault** — a private desktop file-management application securely connecting macOS and Windows devices over local networks.

---

## 📦 Overview

This package consolidates six modular design-system exports generated via Magic Patterns into a single, cohesive React + TypeScript design system:

1. **Part 01 — Visual Foundations**: Canonical tokens, surfaces, elevation, typography, and theme switching.
2. **Part 02 — Buttons & Form Controls**: Canonical Button, Field, Input, PasswordInput, SearchInput, Select, Textarea.
3. **Part 03 — Cards & Navigation**: Breadcrumbs, NavigationGroup, SidebarNavItem, Tabs, Toolbar, Pagination, DeviceCard, FolderCard, FileRow, Card.
4. **Part 04 — Feedback & Progress**: StatusBadge, DeviceStatusIndicator, DeviceConnectionSummary, LinearProgress, CircularProgress, TransferProgressSummary, InlineAlert, SkeletonLoader, Spinner, EmptyState.
5. **Part 05A — Dialogs & Context Menus**: Modal Dialogs, destructive ConfirmDialog, full keyboard & mouse ContextMenu.
6. **Part 05B — Menus, Toasts, Tooltips & Popovers**: Accessible DropdownMenu, ToastProvider, Toast notifications, Tooltip with arrow, Popover.

---

## 🛠️ Technology Stack

- **React:** `18.3.1`
- **TypeScript:** `5.9.3`
- **Tailwind CSS:** `4.3.1` (with `@tailwindcss/vite` inline `@theme` engine)
- **Icons:** `lucide-react` `0.577.0`
- **Animations:** `framer-motion` `11.18.2`
- **Class Merging:** `tailwind-merge` `2.6.1` (with custom typography scale extensions)
- **Build Tool:** `vite` `8.3.2`
- **Testing:** `vitest` `2.1.9` with `happy-dom` & `@testing-library/react`

---

## 🚀 Quick Start

### Installation

```bash
cd "Design System/localvault-design-system"
npm install
```

### Running the Showcase Application

To run the interactive showcase featuring all 6 design system parts with live theme switching:

```bash
npm run dev
```

Visit `http://localhost:5173` to explore the live components.

### Build and Test

```bash
# Typecheck and production bundle build
npm run build

# Run unit and component test suites
npm test
```

---

## 📁 Project Architecture

```
Design System/localvault-design-system/
├── dist/                          # Production build output
├── src/
│   ├── components/
│   │   ├── ui/                    # Buttons, inputs, cards, containers, theme toggle
│   │   │   ├── Button.tsx         # Canonical LocalVault button with danger alias
│   │   │   ├── Card.tsx
│   │   │   ├── DeviceCard.tsx
│   │   │   ├── Field.tsx
│   │   │   ├── FileRow.tsx
│   │   │   ├── FolderCard.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── InteractiveCard.tsx
│   │   │   ├── PasswordInput.tsx
│   │   │   ├── SearchInput.tsx
│   │   │   ├── SectionContainer.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Textarea.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── navigation/            # Navigation items, breadcrumbs, tabs, toolbars
│   │   │   ├── Breadcrumbs.tsx
│   │   │   ├── NavigationGroup.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── SidebarNavItem.tsx
│   │   │   ├── Tabs.tsx
│   │   │   └── Toolbar.tsx
│   │   ├── feedback/              # Progress bars, badges, status indicators, alerts
│   │   │   ├── CircularProgress.tsx
│   │   │   ├── DeviceConnectionSummary.tsx
│   │   │   ├── DeviceStatusIndicator.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── InlineAlert.tsx
│   │   │   ├── LinearProgress.tsx
│   │   │   ├── SkeletonLoader.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   └── TransferProgressSummary.tsx
│   │   └── overlays/              # Modals, context menus, dropdowns, toasts, tooltips
│   │       ├── ConfirmDialog.tsx
│   │       ├── ContextMenu.tsx
│   │       ├── Dialog.tsx
│   │       ├── DropdownMenu.tsx
│   │       ├── Popover.tsx
│   │       ├── Toast.tsx
│   │       └── Tooltip.tsx
│   ├── hooks/
│   │   ├── useDismiss.ts          # Outside click and Escape key dismissal
│   │   ├── useFloatingPosition.ts # Smart viewport-aware positioning & auto-flip
│   │   └── useTheme.ts            # Theme management (light/dark/system)
│   ├── lib/
│   │   ├── cn.ts                  # Extended tailwind-merge handling LocalVault typography
│   │   └── formatters.ts          # Byte, speed, and duration formatters
│   ├── providers/
│   │   ├── ThemeProvider.tsx      # App-wide theme context provider
│   │   └── ToastProvider.tsx      # Global notification toast context & dispatch
│   ├── showcase/                  # Interactive visual test harness
│   │   ├── sections/              # 6 categorized showcase views
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── styles/
│   │   ├── tokens.css             # Canonical CSS custom properties & aliases
│   │   └── globals.css            # Tailwind v4 theme wiring & utility classes
│   └── index.ts                   # Master library barrel export
├── tests/
│   ├── cn.test.ts                 # Tests for class conflict resolution
│   └── components.test.tsx        # Tests for button, input, dialogs, and tokens
├── COMPONENT_INVENTORY.md         # Full catalog of 29 reusable components
├── DESIGN_TOKENS.md               # Detailed specification of colors, typography & elevation
└── INTEGRATION_REPORT.md          # Technical conflict resolution & integration log
```

---

## 🎨 Consuming the Design System

### Root Setup

Wrap your application in `ThemeProvider` and `ToastProvider`:

```tsx
import React from 'react'
import { ThemeProvider, ToastProvider } from '@localvault/design-system'
import '@localvault/design-system/dist/assets/index.css'

export function Root() {
  return (
    <ThemeProvider defaultTheme="system">
      <ToastProvider position="bottom-right">
        <App />
      </ToastProvider>
    </ThemeProvider>
  )
}
```

### Component Usage

```tsx
import { 
  Button, 
  Input, 
  DeviceCard, 
  TransferProgressSummary, 
  Dialog,
  useToast 
} from '@localvault/design-system'

export function TransferView() {
  const { showToast } = useToast()

  return (
    <div className="p-6 space-y-4">
      <DeviceCard
        name="MacBook Pro M2"
        os="mac"
        ipAddress="192.168.1.105"
        status="online"
        transferSpeed="112 MB/s"
      />

      <TransferProgressSummary
        fileName="backup-localvault-2026.tar.gz"
        transferredBytes={1024 * 1024 * 750}
        totalBytes={1024 * 1024 * 1000}
        speedBytesPerSecond={1024 * 1024 * 48}
        status="transferring"
      />

      <Button 
        variant="primary" 
        onClick={() => showToast('Transfer complete!', 'success')}
      >
        Send Notification
      </Button>
    </div>
  )
}
```

---

## ♿ Accessibility Guidelines

- **Focus Visibility:** All interactive components feature an explicit `focus-visible:ring-2 focus-visible:ring-lv-accent` ring with an offset matching the current surface.
- **Dialog Focus Trapping:** `Dialog` and `ConfirmDialog` trap `Tab` and `Shift+Tab` cycles within the modal dialog and restore focus to the triggering element upon dismissal.
- **Escape Key Handling:** Escapes seamlessly close Dialogs, Popovers, Dropdowns, Context Menus, and Tooltips.
- **Roving Focus:** Dropdown menus and Context menus support arrow key traversal (`ArrowUp` / `ArrowDown`), `Home`, `End`, and alphanumeric quick jump.
- **Screen Reader Support:** ARIA attributes (`aria-expanded`, `aria-haspopup`, `aria-invalid`, `aria-describedby`, `aria-live`) are built directly into form controls, status badges, and overlay containers.

---

## 📄 License

Proprietary — LocalVault Project. All rights reserved.
