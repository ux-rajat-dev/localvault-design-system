# LocalVault Design System — Component Inventory

This document provides a comprehensive inventory of all reusable UI, Navigation, Feedback, and Overlay components consolidated into `@localvault/design-system`.

---

## 📊 Summary Statistics

| Category | Component Count | Source Export Parts | Status |
| :--- | :--- | :--- | :--- |
| **UI & Form Controls** | 14 | Part 01, Part 02, Part 03 | Consolidated & Verified |
| **Navigation** | 6 | Part 03 | Consolidated & Verified |
| **Feedback & Progress** | 10 | Part 04 | Consolidated & Verified |
| **Overlays & Dialogs** | 7 | Part 05A, Part 05B | Consolidated & Verified |
| **Total Reusable Components** | **37** | **All 6 Parts** | **Production Ready** |

---

## 1. UI & Form Controls (`src/components/ui/`)

### `Button`
- **Source:** Part 02 (`localvault-ds-02-controls/src/components/Button.tsx`)
- **Canonical Status:** Canonical implementation replacing stubs from Part 01 and Part 05A.
- **Props:** `variant` ('primary' | 'secondary' | 'ghost' | 'outline' | 'destructive' | 'danger'), `size` ('sm' | 'md' | 'lg'), `isLoading`, `leftIcon`, `rightIcon`, `fullWidth`, standard HTML button attributes.
- **Key Features:** Built-in loading spinner, disabled state styling, accessible focus ring, backward-compatible `danger` alias for `destructive`.

### `Field`
- **Source:** Part 02 (`localvault-ds-02-controls/src/components/Field.tsx`)
- **Props:** `label`, `error`, `helperText`, `required`, `htmlFor`, `id`.
- **Key Features:** Automatically generates accessibility IDs, maps `aria-describedby` and `aria-invalid` to input controls.

### `Input`
- **Source:** Part 02 (`localvault-ds-02-controls/src/components/Input.tsx`)
- **Props:** `size` ('sm' | 'md' | 'lg'), `hasError`, `leftIcon`, `rightIcon`, `clearable`, `onClear`, standard HTML input attributes.
- **Key Features:** Floating/prefix icons, one-click clear button, subtle border transition, error states.

### `PasswordInput`
- **Source:** Part 02 (`localvault-ds-02-controls/src/components/PasswordInput.tsx`)
- **Props:** Extends `Input` props; `showStrength`, `strengthScore`.
- **Key Features:** Accessible visibility toggle button (Eye / EyeOff) with `aria-label`, optional password complexity meter.

### `SearchInput`
- **Source:** Part 02 (`localvault-ds-02-controls/src/components/SearchInput.tsx`)
- **Props:** Extends `Input` props; `shortcutKey` (e.g. "⌘K"), `onShortcutPress`.
- **Key Features:** Built-in search icon, shortcut hint badge, auto-clearing functionality.

### `Select`
- **Source:** Part 02 (`localvault-ds-02-controls/src/components/Select.tsx`)
- **Props:** `options` ({ value, label, disabled }[]), `size` ('sm' | 'md' | 'lg'), `hasError`, standard HTML select attributes.
- **Key Features:** Custom accessible Lucide chevron icon, dark/light theme option styling, keyboard navigable.

### `Textarea`
- **Source:** Part 02 (`localvault-ds-02-controls/src/components/Textarea.tsx`)
- **Props:** `hasError`, `showCount`, `maxLength`, standard HTML textarea attributes.
- **Key Features:** Character counter with limit warning, auto-expanding capabilities, custom focus ring.

### `Card`
- **Source:** Part 03 (`localvault-ds-03-navigation/src/components/Card.tsx`)
- **Props:** `variant` ('default' | 'surface' | 'glass' | 'outline'), `padding` ('none' | 'sm' | 'md' | 'lg'), `interactive`, HTML div attributes.
- **Key Features:** Standard surface background, subtle border, rounded corner hierarchy, optional hover elevation.

### `InteractiveCard`
- **Source:** Part 03 (`localvault-ds-03-navigation/src/components/InteractiveCard.tsx`)
- **Props:** Extends `Card` props; `selected`, `disabled`, `onClick`.
- **Key Features:** Hover border glow, selected ring state, keyboard activation via Enter/Space.

### `DeviceCard`
- **Source:** Part 03 (`localvault-ds-03-navigation/src/components/DeviceCard.tsx`)
- **Props:** `name`, `os` ('mac' | 'windows' | 'linux'), `ipAddress`, `status` ('online' | 'offline' | 'transferring'), `lastSync`, `transferSpeed`, `actions`.
- **Key Features:** OS brand icon, device status ping indicator, IP address copyable badge, network throughput metrics.

### `FolderCard`
- **Source:** Part 03 (`localvault-ds-03-navigation/src/components/FolderCard.tsx`)
- **Props:** `name`, `itemCount`, `totalSizeBytes`, `isPinned`, `onPinToggle`, `onOpen`, `updatedAt`.
- **Key Features:** Directory visual badge, storage capacity gauge, pin quick-action, double-click trigger.

### `FileRow`
- **Source:** Part 03 (`localvault-ds-03-navigation/src/components/FileRow.tsx`)
- **Props:** `name`, `sizeBytes`, `modifiedDate`, `fileType`, `selected`, `onSelect`, `onOpen`, `onContextMenu`.
- **Key Features:** Dynamic file type icon (document, media, archive, code), formatted file size, inline action buttons.

### `ThemeToggle`
- **Source:** Part 01 (`localvault-ds-01-foundations/src/components/ThemeToggle.tsx`)
- **Props:** `variant` ('icon-button' | 'segmented-control' | 'dropdown'), `size` ('sm' | 'md').
- **Key Features:** Seamless switching between Light, Dark, and System preferences; uses smooth cross-fade animation.

### `SectionContainer`
- **Source:** Part 01 (`localvault-ds-01-foundations/src/components/SectionContainer.tsx`)
- **Props:** `title`, `description`, `action`, `children`, `className`.
- **Key Features:** Standardizes section header hierarchy, subtitle styling, and action alignment across views.

---

## 2. Navigation Components (`src/components/navigation/`)

### `Breadcrumbs`
- **Source:** Part 03 (`localvault-ds-03-navigation/src/components/Breadcrumbs.tsx`)
- **Props:** `items` ({ label, path, icon, isCurrent }[]), `separator`, `maxItems`, `onNavigate`.
- **Key Features:** Truncates long paths with ellipsis dropdown, current location marked with `aria-current="page"`.

### `NavigationGroup`
- **Source:** Part 03 (`localvault-ds-03-navigation/src/components/NavigationGroup.tsx`)
- **Props:** `label`, `children`, `collapsible`, `defaultOpen`, `badge`.
- **Key Features:** Section divider for sidebars, accessible expand/collapse state with chevron animation.

### `SidebarNavItem`
- **Source:** Part 03 (`localvault-ds-03-navigation/src/components/SidebarNavItem.tsx`)
- **Props:** `label`, `icon`, `active`, `badge`, `shortcut`, `onClick`, `href`.
- **Key Features:** Left accent active bar, count pill, keyboard shortcut badge, active high-contrast background.

### `Tabs`
- **Source:** Part 03 (`localvault-ds-03-navigation/src/components/Tabs.tsx`)
- **Props:** `tabs` ({ id, label, icon, badge, disabled }[]), `activeTab`, `onChange`, `variant` ('line' | 'pills' | 'segmented').
- **Key Features:** Animated sliding active indicator via CSS transitions, arrow-key roving tabindex navigation.

### `Toolbar`
- **Source:** Part 03 (`localvault-ds-03-navigation/src/components/Toolbar.tsx`)
- **Props:** `children`, `align` ('left' | 'between' | 'right'), `dense`.
- **Key Features:** Standardized flex container with separator dividers for action buttons, search bars, and view switchers.

### `Pagination`
- **Source:** Part 03 (`localvault-ds-03-navigation/src/components/Pagination.tsx`)
- **Props:** `currentPage`, `totalPages`, `onPageChange`, `showTotal`, `pageSize`, `onPageSizeChange`.
- **Key Features:** Next/previous step buttons, numbered page links with ellipsis collapsing, page size selector.

---

## 3. Feedback & Status (`src/components/feedback/`)

### `StatusBadge`
- **Source:** Part 04 (`localvault-ds-04-feedback/src/components/StatusBadge.tsx`)
- **Props:** `status` ('online' | 'offline' | 'transferring' | 'warning' | 'idle' | 'success' | 'danger'), `variant` ('solid' | 'subtle' | 'outline'), `size` ('sm' | 'md'), `showDot`, `pulse`.
- **Key Features:** Glowing pulse animation for active states, semantic color mapping, high-contrast text ratios.

### `DeviceStatusIndicator`
- **Source:** Part 04 (`localvault-ds-04-feedback/src/components/DeviceStatusIndicator.tsx`)
- **Props:** `status` ('connected' | 'disconnected' | 'syncing' | 'error'), `size` ('sm' | 'md' | 'lg'), `label`, `showTooltip`.
- **Key Features:** Accessible status indicator dot with optional status label and live status ping.

### `DeviceConnectionSummary`
- **Source:** Part 04 (`localvault-ds-04-feedback/src/components/DeviceConnectionSummary.tsx`)
- **Props:** `connectedCount`, `totalCount`, `syncStatus` ('up-to-date' | 'syncing' | 'paused' | 'error'), `lastSyncedText`.
- **Key Features:** Compact bar showing local peer connectivity, overall sync status, and quick sync action button.

### `LinearProgress`
- **Source:** Part 04 (`localvault-ds-04-feedback/src/components/LinearProgress.tsx`)
- **Props:** `value` (0-100), `variant` ('default' | 'success' | 'warning' | 'danger'), `size` ('xs' | 'sm' | 'md' | 'lg'), `indeterminate`, `showValueLabel`.
- **Key Features:** Smooth hardware-accelerated width transition, continuous sweep animation in indeterminate mode, accessible `aria-valuenow`.

### `CircularProgress`
- **Source:** Part 04 (`localvault-ds-04-feedback/src/components/CircularProgress.tsx`)
- **Props:** `value` (0-100), `size` (number), `strokeWidth`, `variant`, `indeterminate`, `children`.
- **Key Features:** Crisp SVG stroke dasharray rendering, center icon or percentage display, rotating indeterminate state.

### `TransferProgressSummary`
- **Source:** Part 04 (`localvault-ds-04-feedback/src/components/TransferProgressSummary.tsx`)
- **Props:** `fileName`, `transferredBytes`, `totalBytes`, `speedBytesPerSecond`, `status` ('preparing' | 'transferring' | 'paused' | 'completed' | 'failed'), `onPause`, `onResume`, `onCancel`.
- **Key Features:** Live transfer rate calculation, remaining time estimation (ETA), dynamic progress bar, interactive pause/cancel buttons.

### `InlineAlert`
- **Source:** Part 04 (`localvault-ds-04-feedback/src/components/InlineAlert.tsx`)
- **Props:** `variant` ('info' | 'success' | 'warning' | 'danger'), `title`, `children`, `onDismiss`, `action`.
- **Key Features:** Semantic left accent border, corresponding status icon, dismiss button, support for inline action triggers.

### `SkeletonLoader`
- **Source:** Part 04 (`localvault-ds-04-feedback/src/components/SkeletonLoader.tsx`)
- **Props:** `variant` ('text' | 'circular' | 'rectangular'), `width`, `height`, `count`.
- **Key Features:** Smooth linear gradient shimmer animation across `--lv-surface` and `--lv-bg`.

### `Spinner`
- **Source:** Part 04 (`localvault-ds-04-feedback/src/components/Spinner.tsx`)
- **Props:** `size` ('sm' | 'md' | 'lg'), `variant` ('current' | 'accent' | 'muted'), `label`.
- **Key Features:** Pure CSS infinite rotational animation, accessible screen reader text via `aria-label`.

### `EmptyState`
- **Source:** Part 04 (`localvault-ds-04-feedback/src/components/EmptyState.tsx`)
- **Props:** `icon`, `title`, `description`, `primaryAction`, `secondaryAction`.
- **Key Features:** Standardized layout for empty folders, disconnected states, and zero-result search views.

---

## 4. Overlays & Dialogs (`src/components/overlays/`)

### `Dialog`
- **Source:** Part 05A (`localvault-ds-05a-dialogs/src/components/Dialog.tsx`)
- **Props:** `isOpen`, `onClose`, `title`, `description`, `children`, `footer`, `size` ('sm' | 'md' | 'lg' | 'full'), `closeOnOutsideClick`.
- **Key Features:** Accessible modal trap preventing focus escape, backdrop blur overlay, smooth scale-in animation, Escape key dismissal.

### `ConfirmDialog`
- **Source:** Part 05A (`localvault-ds-05a-dialogs/src/components/ConfirmDialog.tsx`)
- **Props:** `isOpen`, `onClose`, `onConfirm`, `title`, `message`, `confirmText`, `cancelText`, `isDestructive`, `isLoading`.
- **Key Features:** High-risk confirmation dialog wired to canonical destructive `Button`, loading state support, autofocus on cancel button for safety.

### `ContextMenu`
- **Source:** Part 05A (`localvault-ds-05a-dialogs/src/components/ContextMenu.tsx`)
- **Props:** `isOpen`, `x`, `y`, `onClose`, `items` ({ label, icon, shortcut, danger, disabled, onClick }[]).
- **Key Features:** Viewport boundary clamping (prevents opening off-screen), keyboard navigation (`ArrowUp`, `ArrowDown`, `Enter`), backdrop dismissal.

### `DropdownMenu`
- **Source:** Part 05B (`localvault-ds-05b-menus/src/components/DropdownMenu.tsx`)
- **Props:** `trigger`, `items` ({ label, icon, shortcut, danger, disabled, divider, onClick }[]), `align` ('left' | 'right'), `width`.
- **Key Features:** Roving tabindex focus handling, keyboard open (`ArrowDown` / `Enter`), auto-closing on item selection.

### `Popover`
- **Source:** Part 05B (`localvault-ds-05b-menus/src/components/Popover.tsx`)
- **Props:** `trigger`, `content`, `isOpen`, `onToggle`, `placement` ('top' | 'bottom' | 'left' | 'right').
- **Key Features:** Anchored floating panel with smart auto-flipping to prevent viewport clipping, outside click dismissal.

### `Tooltip`
- **Source:** Part 05B (`localvault-ds-05b-menus/src/components/Tooltip.tsx`)
- **Props:** `content`, `children`, `delayMs`, `placement` ('top' | 'bottom' | 'left' | 'right').
- **Key Features:** Hover and keyboard focus detection, directional indicator arrow, accessible `aria-describedby` linkage.

### `Toast` & `ToastProvider`
- **Source:** Part 05B (`localvault-ds-05b-menus/src/components/Toast.tsx`, `ToastProvider.tsx`)
- **Props:** `showToast(message, type, durationMs, action)` hook, multi-toast stack, customizable placement ('bottom-right' | 'bottom-left' | 'top-right' | 'top-left').
- **Key Features:** Automatic timer expiration with progress bar countdown, manual close action, pause-on-hover, accessible `aria-live="polite"`.
