import React, { useState } from 'react'
import { describe, it, expect, afterEach, beforeAll } from 'vitest'
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { MotionGlobalConfig } from 'framer-motion'
import {
  ThemeProvider,
  useTheme,
  Button,
  Input,
  Breadcrumbs,
  Tabs,
  StatusBadge,
  DeviceStatusIndicator,
  LinearProgress,
  Dialog,
  Tooltip,
} from '../src/index'

beforeAll(() => {
  MotionGlobalConfig.skipAnimations = true
})

afterEach(() => {
  cleanup()
})

/**
 * ConsumerApp simulates an external consumer application importing and
 * integrating LocalVault Master Design System components, hooks, and styles.
 */
function ConsumerApp() {
  const { theme, toggleTheme } = useTheme()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  const breadcrumbItems = [
    { id: 'root', label: 'Vault Root', href: '/' },
    { id: 'docs', label: 'Documents', href: '/docs' },
    { id: 'file', label: 'Q4_Report.pdf', isCurrent: true },
  ]

  const tabItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'sync', label: 'Sync Status', count: 2 },
  ]

  return (
    <div data-testid="consumer-app-root">
      {/* 1. Theme toggle verification */}
      <Button
        variant="secondary"
        size="sm"
        onClick={toggleTheme}
        aria-label="Toggle Current Theme"
      >
        Current Theme: {theme}
      </Button>

      {/* 2. Navigation components */}
      <Breadcrumbs items={breadcrumbItems} />
      <Tabs
        items={tabItems}
        value={activeTab}
        onChange={setActiveTab}
        ariaLabel="Consumer Sections"
      />

      {/* 3. Form controls */}
      <Input
        label="Vault Name"
        placeholder="Enter vault name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        variant="primary"
        onClick={() => setIsDialogOpen(true)}
      >
        Open Settings Dialog
      </Button>

      {/* 4. Feedback & Status components */}
      <StatusBadge tone="success">Peer Connected</StatusBadge>
      <DeviceStatusIndicator status="online" label="MacBook Pro" />
      <LinearProgress value={65} showValue label="Sync Progress" />

      {/* 5. Overlays: Tooltip */}
      <Tooltip content="Secure encryption active">
        <span data-testid="tooltip-trigger">Security Shield</span>
      </Tooltip>

      {/* 6. Overlays: Modal Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Consumer Settings"
        description="Configure your external consumer storage preferences."
      >
        <p>Dialog body content rendered by consumer</p>
        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
          Dismiss Settings
        </Button>
      </Dialog>
    </div>
  )
}

describe('Design System Consumer Integration Smoke Test', () => {
  it('mounts ThemeProvider and successfully consumes components from all 4 categories', async () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ConsumerApp />
      </ThemeProvider>
    )

    // 1. Verify ThemeProvider integration
    expect(screen.getByTestId('consumer-app-root')).toBeDefined()
    const themeBtn = screen.getByRole('button', { name: /toggle current theme/i })
    expect(themeBtn.textContent).toContain('Current Theme: light')

    // 2. Verify Navigation: Breadcrumbs & Tabs
    expect(screen.getByText('Vault Root')).toBeDefined()
    expect(screen.getByText('Q4_Report.pdf')).toBeDefined()
    const syncTab = screen.getByRole('tab', { name: /sync status/i })
    expect(syncTab).toBeDefined()
    fireEvent.click(syncTab)
    expect(syncTab.getAttribute('aria-selected')).toBe('true')

    // 3. Verify Form controls: Input & Button
    const input = screen.getByLabelText(/vault name/i) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Production Vault' } })
    expect(input.value).toBe('Production Vault')

    // 4. Verify Feedback components: StatusBadge, DeviceStatusIndicator, LinearProgress
    expect(screen.getByText('Peer Connected')).toBeDefined()
    expect(screen.getByText('MacBook Pro')).toBeDefined()
    expect(screen.getByText('65%')).toBeDefined()

    // 5. Verify Overlays: Tooltip trigger
    expect(screen.getByTestId('tooltip-trigger')).toBeDefined()

    // 6. Verify Overlays: Modal Dialog interaction
    expect(screen.queryByText('Consumer Settings')).toBeNull()
    const openDialogBtn = screen.getByRole('button', { name: /open settings dialog/i })
    fireEvent.click(openDialogBtn)
    expect(screen.getByText('Consumer Settings')).toBeDefined()
    expect(screen.getByText('Dialog body content rendered by consumer')).toBeDefined()

    // Close Dialog
    const closeBtn = screen.getByRole('button', { name: /dismiss settings/i })
    fireEvent.click(closeBtn)
    await waitFor(() => {
      expect(screen.queryByText('Consumer Settings')).toBeNull()
    })
  })
})
