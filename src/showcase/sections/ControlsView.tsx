import React, { useState } from 'react'
import {
  Button,
  Input,
  PasswordInput,
  SearchInput,
  Select,
  Textarea,
  type SelectOption,
} from '../../index'
import { ArrowRight, Download, Laptop, Monitor, RefreshCw, Trash2, Upload } from 'lucide-react'

export function ControlsView() {
  const [btnLoading, setBtnLoading] = useState(false)
  const [searchVal, setSearchVal] = useState('Quarterly-Report.pdf')
  const [password, setPassword] = useState('localvault-secret-pass')
  const [device, setDevice] = useState<string | null>('windows-pc')
  const [notes, setNotes] = useState('Encrypted transfer session initiated over local port 3000.')

  const deviceOptions: SelectOption[] = [
    { value: 'macbook', label: 'MacBook Pro 14″ (Local)', description: '127.0.0.1:3001 · macOS', icon: Laptop },
    { value: 'windows-pc', label: 'Windows PC (Remote)', description: '192.168.29.49:3001 · Windows 11', icon: Monitor },
  ]

  return (
    <div className="flex flex-col gap-10">
      {/* Button Gallery */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-h2 font-semibold text-lv-text">Buttons & Variants</h3>
            <p className="mt-1 text-small text-lv-text-muted">
              Canonical Button component with five variants, three sizes, leading/trailing icons, and aria-busy loading states.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            leadingIcon={RefreshCw}
            onClick={() => setBtnLoading(!btnLoading)}
          >
            Toggle Loading ({btnLoading ? 'ON' : 'OFF'})
          </Button>
        </div>

        <div className="mt-6 flex flex-col gap-6 rounded-lv-lg border border-lv-border bg-lv-surface p-6">
          {/* Variants */}
          <div>
            <span className="text-caption font-semibold uppercase tracking-wider text-lv-text-muted">Variants (Medium 36px)</span>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Button variant="primary" loading={btnLoading} leadingIcon={Upload}>
                Primary Action
              </Button>
              <Button variant="secondary" loading={btnLoading}>
                Secondary
              </Button>
              <Button variant="outline" loading={btnLoading}>
                Outline
              </Button>
              <Button variant="ghost" loading={btnLoading}>
                Ghost
              </Button>
              <Button variant="destructive" loading={btnLoading} leadingIcon={Trash2}>
                Destructive
              </Button>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <span className="text-caption font-semibold uppercase tracking-wider text-lv-text-muted">Sizes</span>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Button size="sm" variant="primary">Small (30px)</Button>
              <Button size="md" variant="primary">Medium (36px)</Button>
              <Button size="lg" variant="primary">Large (42px)</Button>
              <Button size="md" variant="primary" trailingIcon={ArrowRight}>
                With Trailing Icon
              </Button>
              <Button size="md" variant="outline" icon={Download} aria-label="Download file" />
              <Button size="md" variant="destructive" icon={Trash2} aria-label="Delete item" />
            </div>
          </div>
        </div>
      </div>

      {/* Inputs & Form Controls */}
      <div>
        <h3 className="text-h2 font-semibold text-lv-text">Inputs & Form Controls</h3>
        <p className="mt-1 text-small text-lv-text-muted">
          All inputs share the unified <code>Field</code> frame with label, helper, error, and aside slots.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 rounded-lv-lg border border-lv-border bg-lv-surface p-6 md:grid-cols-2">
          <Input
            label="Gateway Address"
            placeholder="http://127.0.0.1:3000"
            helperText="Local HTTP service running on loopback"
          />

          <Input
            label="Device Endpoint"
            defaultValue="https://192.168.29.49:3001"
            error="Connection timed out (ping > 5000ms)"
            required
          />

          <SearchInput
            label="Search Storage"
            placeholder="Type a filename..."
            value={searchVal}
            onValueChange={setSearchVal}
            helperText="Press Escape to clear field"
          />

          <PasswordInput
            label="Master Session Passcode"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="Stored exclusively in HttpOnly lv_session cookie"
          />

          <Select
            label="Target Paired Device"
            options={deviceOptions}
            value={device}
            onValueChange={setDevice}
            helperText="Select destination node for transfers"
          />

          <Textarea
            label="Transfer Manifest Notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            showCount
            maxLength={120}
            helperText="Optional notes attached to file transfer manifest"
          />
        </div>
      </div>
    </div>
  )
}
