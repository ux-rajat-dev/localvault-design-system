# Magic Patterns Design System Import Guide: LocalVault

This guide provides step-by-step instructions for importing and utilizing the **`localvault-design-system`** repository in [Magic Patterns](https://www.magicpatterns.com) to generate full application screens and prototypes with perfect fidelity to the design system.

---

## 1. Connecting the GitHub Repository to Magic Patterns

1. **Publish to GitHub:**  
   Ensure the `localvault-design-system` repository has been pushed to a private GitHub repository under your organization or personal account (e.g. `https://github.com/<your-username>/localvault-design-system`).
2. **Authorize Magic Patterns GitHub App:**  
   - In Magic Patterns, navigate to **Settings** → **Integrations** → **GitHub**.
   - Click **Connect GitHub Account** and authenticate.
   - When prompted for repository access permissions, select **Only select repositories** and check `localvault-design-system` (or choose all repositories if preferred).
3. **Confirm Connection:**  
   Verify that `localvault-design-system` appears with a green connected badge in your Magic Patterns Integrations tab.

---

## 2. Registering as a Design System in Magic Patterns

1. Navigate to **Design Systems** in the Magic Patterns workspace sidebar.
2. Click **+ New Design System** (or **Import from GitHub**).
3. Fill in the repository details:
   - **Repository:** `<your-username>/localvault-design-system`
   - **Branch:** `main`
   - **Root Directory:** `/` (or `Design System/localvault-design-system` if imported from a monorepo)
   - **Component Entry Point:** `src/index.ts`
   - **Styles Entry Point:** `src/styles/globals.css`
   - **Tokens Entry Point:** `src/styles/tokens.css`
4. Click **Scan & Index**.  
   Magic Patterns will parse the TypeScript exports in `src/index.ts` and catalog the available components, props, variants, and design tokens.

---

## 3. Connecting the Design System to a Preset

To ensure every new screen generation uses the LocalVault design tokens and components by default:

1. In Magic Patterns, go to **Presets** → **Create New Preset** (or edit an existing LocalVault preset).
2. Set the preset name: `LocalVault Desktop Standard`.
3. Under **Design System**, select `localvault-design-system`.
4. Under **Theme & Tokens**:
   - Ensure `tokens.css` and `globals.css` are linked into the base preview iframe.
   - Set Default Mode to `Light` (with toggle available for `Dark`).
   - Define root attributes: `<html data-theme="light">` and body background `bg-lv-bg text-lv-text`.
5. Under **Core Rules / System Prompt Guidelines**, append:
   ```markdown
   Always reuse components from @localvault/design-system.
   Do not recreate custom Button, Input, Card, DeviceCard, StatusBadge, Dialog, or Progress components.
   Use CSS variables (--lv-bg, --lv-surface, --lv-text, --lv-accent, etc.) and Tailwind utilities (bg-lv-surface, text-lv-text, etc.).
   ```
6. Click **Save Preset** and set as **Default**.

---

## 4. Referencing Imported Components in Prompts

When prompting Magic Patterns to generate application screens (e.g., Device Pairing, File Vault, Transfer Center, Settings), reference components explicitly by their exported names and prop variants:

### Example Prompt 1: Device Pairing & Network Status View
```text
Create a LocalVault Device Pairing screen using the LocalVault Design System preset.
- Top: Toolbar with Breadcrumbs ("LocalVault" > "Devices") and a SearchInput with shortcut "⌘F".
- Main Grid: Display 2 DeviceCard components:
  1. "MacBook Pro M2", os="mac", ipAddress="192.168.1.105", status="online", transferSpeed="112 MB/s".
  2. "Gaming PC Windows 11", os="windows", ipAddress="192.168.1.110", status="online".
- Bottom: DeviceConnectionSummary showing 2 devices connected with "up-to-date" status.
- Action: Primary Button with label "Pair New Device" using a Plus icon.
- Wrap the page in SectionContainer and ensure dark/light mode toggle works via ThemeToggle.
```

### Example Prompt 2: File Transfer Progress View
```text
Build a Transfer Queue panel for LocalVault using the imported design system:
- Use TransferProgressSummary for the active transfer of "Encrypted_Backup_2026.iso":
  - 1.4 GB transferred out of 2.0 GB (70%)
  - Speed: 84 MB/s, status="transferring"
  - Interactive pause and cancel buttons
- Below: List completed files using FileRow items with green StatusBadge ("Completed").
- Header: H2 typography ("Active Transfers") and a secondary Button ("Clear Completed").
```

---

## 5. Verifying Colors, Typography, Themes & Behavior

After Magic Patterns generates a prototype screen, perform visual and interactive verification:

1. **Color Contrast & Consistency:**
   - **Light Theme:** Check that the canvas background is `#F8FAFC`, surfaces are `#FFFFFF`, and borders are `#E2E8F0`.
   - **Dark Theme:** Check that canvas background is `#0B1020`, cards are `#151B2D`, and borders are `#293247`.
   - **Accent:** Indigo `#6366F1` (Light) and `#818CF8` (Dark).
2. **Typography Hierarchy:**
   - Verify headings match the scale: `text-display` (32px), `text-h1` (28px), `text-h2` (22px), `text-h3` (18px), `text-body` (14px), `text-small` (13px), `text-caption` (12px).
   - Ensure font family renders as Inter.
3. **Interactive Behavior:**
   - Click `ThemeToggle` to confirm seamless switching between Light and Dark modes.
   - Click buttons to verify loading states and focus-visible rings.
   - Trigger dialogs or popovers to confirm focus trapping and Escape key dismissal.

---

## 6. How to Avoid Regenerating Existing Components

Generative AI platforms can sometimes default to generating raw HTML/Tailwind `div`s and `button`s if prompts are generic. To strictly prevent this:

1. **Use Strict Component Directives in Every Prompt:**
   Always include:
   > "Strict Requirement: Import and use the exact components from `@localvault/design-system` (`Button`, `Input`, `DeviceCard`, `FileRow`, `StatusBadge`, `Dialog`). Do NOT generate ad-hoc HTML buttons, cards, or custom dialog overlays."
2. **Specify Exact Props:**
   Always supply prop names matching `COMPONENT_INVENTORY.md` (e.g. `variant="destructive"`, `size="md"`, `status="online"`, `tone="success"`).
3. **Reference the Component Inventory:**
   If Magic Patterns suggests a component that is missing, refer to `COMPONENT_INVENTORY.md` to provide the exact path: `src/components/ui/DeviceCard.tsx`.

---

## 7. Troubleshooting Partial Imports & Limitations

> [!NOTE]
> Magic Patterns component indexing depends on static AST analysis. Note that not every complex or higher-order component may be fully indexed until the import is verified in the live project.

### If Magic Patterns imports only part of the library:
1. **Check Barrel Export (`src/index.ts`):**
   Ensure every component is re-exported explicitly as a named export. Avoid `export * from ...` wildcards if Magic Patterns fails to crawl sub-barrels.
2. **Check Complex Dependencies:**
   Components utilizing Framer Motion gestures (`framer-motion`) or custom hooks (`useFloatingPosition`) might render as fallback static components if the Magic Patterns sandbox environment lacks specific browser APIs. In such cases:
   - Provide fallback static props.
   - Use the standard `Button`, `Input`, `Card`, and `Badge` components for primary layouts.
3. **Manual Component Registration:**
   In the Magic Patterns Design System dashboard, you can manually add any unindexed component by pointing directly to its file path (e.g., `src/components/overlays/ConfirmDialog.tsx`).
4. **Style Missing in Previews:**
   If components look unstyled:
   - Verify that `globals.css` and `tokens.css` are selected under Preset CSS files.
   - Ensure `<html data-theme="light">` is present in the wrapper template.
