import React, { useState } from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import {
  Button,
  Input,
  SearchInput,
  Dialog,
  StatusBadge,
  DeviceStatusIndicator,
  ToastProvider,
  useToast,
  Tabs,
} from '../src/index'

afterEach(() => {
  cleanup()
})

describe('LocalVault Reusable Component Suite', () => {
  describe('Button Component', () => {
    it('renders with default primary variant and handles click', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Connect Device</Button>)
      const btn = screen.getByRole('button', { name: /connect device/i })
      expect(btn).toBeDefined()
      expect(btn.getAttribute('data-variant')).toBe('primary')
      fireEvent.click(btn)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('sets aria-busy and disables interaction when loading', () => {
      const handleClick = vi.fn()
      render(<Button loading onClick={handleClick}>Transferring</Button>)
      const btn = screen.getByRole('button', { name: /transferring/i })
      expect(btn.getAttribute('aria-busy')).toBe('true')
      expect(btn.hasAttribute('disabled')).toBe(true)
      fireEvent.click(btn)
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('aliases danger variant to destructive styling', () => {
      render(<Button variant="danger">Delete File</Button>)
      const btn = screen.getByRole('button', { name: /delete file/i })
      expect(btn.getAttribute('data-variant')).toBe('destructive')
    })
  })

  describe('Input & SearchInput Components', () => {
    it('renders Input with accessible label and helper text', () => {
      render(<Input label="Gateway Passcode" helperText="Enter 12-char master secret" />)
      expect(screen.getByLabelText(/gateway passcode/i)).toBeDefined()
      expect(screen.getByText(/enter 12-char master secret/i)).toBeDefined()
    })

    it('clears SearchInput value on Escape key', () => {
      function SearchHarness() {
        const [query, setQuery] = useState('report.pdf')
        return <SearchInput placeholder="Search files..." value={query} onValueChange={setQuery} />
      }
      render(<SearchHarness />)
      const input = screen.getByPlaceholderText(/search files/i) as HTMLInputElement
      expect(input.value).toBe('report.pdf')
      fireEvent.keyDown(input, { key: 'Escape' })
      expect(input.value).toBe('')
    })
  })

  describe('Feedback & Status Components', () => {
    it('renders StatusBadge with semantic tone and label', () => {
      render(<StatusBadge tone="success">Verified</StatusBadge>)
      expect(screen.getByText('Verified')).toBeDefined()
    })

    it('renders DeviceStatusIndicator with proper status label', () => {
      render(<DeviceStatusIndicator status="online" />)
      expect(screen.getByText('Online')).toBeDefined()
    })
  })

  describe('Navigation Components', () => {
    it('renders Tabs and handles tab switching', () => {
      const handleChange = vi.fn()
      const items = [
        { id: 'all', label: 'All Files' },
        { id: 'transfers', label: 'Transfers', count: 3 },
      ]
      render(<Tabs items={items} value="all" onChange={handleChange} ariaLabel="Main Navigation" />)
      const transferTab = screen.getByRole('tab', { name: /transfers/i })
      fireEvent.click(transferTab)
      expect(handleChange).toHaveBeenCalledWith('transfers')
    })
  })

  describe('Toast Notifications Provider', () => {
    function ToastTrigger() {
      const { toast } = useToast()
      return (
        <button onClick={() => toast({ title: 'Transfer Complete', variant: 'success' })}>
          Trigger Toast
        </button>
      )
    }

    it('triggers and displays toast notification', () => {
      render(
        <ToastProvider>
          <ToastTrigger />
        </ToastProvider>
      )
      const triggerBtn = screen.getByRole('button', { name: /trigger toast/i })
      fireEvent.click(triggerBtn)
      expect(screen.getByText('Transfer Complete')).toBeDefined()
    })
  })
})
