import React from 'react'

export function FoundationsView() {
  const surfaces = [
    { name: 'App Background', varName: '--lv-bg', css: 'bg-lv-bg text-lv-text border border-lv-border' },
    { name: 'Surface', varName: '--lv-surface', css: 'bg-lv-surface text-lv-text border border-lv-border' },
    { name: 'Surface Muted', varName: '--lv-surface-muted', css: 'bg-lv-surface-muted text-lv-text border border-lv-border' },
    { name: 'Surface Inset', varName: '--lv-surface-inset', css: 'bg-lv-surface-inset text-lv-text border border-lv-border' },
    { name: 'Surface Sunken', varName: '--lv-surface-sunken', css: 'bg-lv-surface-sunken text-lv-text border border-lv-border' },
  ]

  const semantics = [
    { name: 'Accent (Primary)', varName: '--lv-accent', css: 'bg-lv-accent text-lv-on-accent' },
    { name: 'Success', varName: '--lv-success', css: 'bg-lv-success text-white' },
    { name: 'Warning', varName: '--lv-warning', css: 'bg-lv-warning text-white' },
    { name: 'Danger (Destructive)', varName: '--lv-danger', css: 'bg-lv-danger text-white' },
    { name: 'Info', varName: '--lv-info', css: 'bg-lv-info text-white' },
  ]

  const typography = [
    { name: 'Display', spec: '32px / 40px', class: 'text-display', sample: 'LocalVault Secure Bridge' },
    { name: 'Heading 1', spec: '28px / 36px', class: 'text-h1', sample: 'Device Network Transfers' },
    { name: 'Heading 2', spec: '22px / 30px', class: 'text-h2', sample: 'Paired Local Storage' },
    { name: 'Heading 3', spec: '18px / 26px', class: 'text-h3', sample: 'MacBook Pro 14″ ⇄ Windows PC' },
    { name: 'Body', spec: '14px / 22px', class: 'text-body', sample: 'Peer-to-peer authenticated chunked file transfer over local Wi-Fi.' },
    { name: 'Small', spec: '13px / 20px', class: 'text-small', sample: 'SHA-256 integrity verification hash checksum confirmed.' },
    { name: 'Caption', spec: '12px / 18px', class: 'text-caption text-lv-text-muted', sample: 'PORT 3000 · HTTPS MTLS · AES-GCM' },
  ]

  const radii = [
    { name: 'Small', px: '6px', class: 'rounded-lv-sm' },
    { name: 'Medium', px: '10px', class: 'rounded-lv-md' },
    { name: 'Large', px: '14px', class: 'rounded-lv-lg' },
    { name: 'X-Large', px: '18px', class: 'rounded-lv-xl' },
    { name: 'Pill / Full', px: '9999px', class: 'rounded-lv-full' },
  ]

  const shadows = [
    { name: 'Shadow SM', class: 'shadow-lv-sm', desc: 'Buttons, resting controls' },
    { name: 'Shadow MD', class: 'shadow-lv-md', desc: 'Elevated cards, tooltips' },
    { name: 'Shadow LG', class: 'shadow-lv-lg', desc: 'Popovers, menus, dropdowns' },
    { name: 'Shadow Dialog', class: 'shadow-lv-dialog', desc: 'Modal dialogs and sheets' },
  ]

  return (
    <div className="flex flex-col gap-10">
      {/* Surfaces & Core Palette */}
      <div>
        <h3 className="text-h2 font-semibold text-lv-text">Color Palette & Surfaces</h3>
        <p className="mt-1 text-small text-lv-text-muted">
          All colors dynamically bind to <code>--lv-*</code> semantic CSS variables.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {surfaces.map((s) => (
            <div key={s.varName} className={`flex flex-col justify-between rounded-lv-md p-3.5 shadow-lv-sm ${s.css}`}>
              <span className="text-small font-semibold">{s.name}</span>
              <span className="mt-4 font-mono text-caption opacity-75">{s.varName}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {semantics.map((s) => (
            <div key={s.varName} className={`flex flex-col justify-between rounded-lv-md p-3.5 shadow-lv-sm ${s.css}`}>
              <span className="text-small font-semibold">{s.name}</span>
              <span className="mt-4 font-mono text-caption opacity-90">{s.varName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Scale */}
      <div>
        <h3 className="text-h2 font-semibold text-lv-text">Typography Scale</h3>
        <p className="mt-1 text-small text-lv-text-muted">Inter font scale with proportional line-heights and negative letter-spacing.</p>
        <div className="mt-4 flex flex-col divide-y divide-lv-border rounded-lv-lg border border-lv-border bg-lv-surface p-4">
          {typography.map((t) => (
            <div key={t.name} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between">
              <div className="w-48 shrink-0">
                <span className="text-small font-semibold text-lv-text">{t.name}</span>
                <span className="ml-2 font-mono text-caption text-lv-text-muted">{t.spec}</span>
              </div>
              <div className={`min-w-0 flex-1 ${t.class}`}>{t.sample}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Radii & Shadows */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-h3 font-semibold text-lv-text">Border Radii</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {radii.map((r) => (
              <div
                key={r.name}
                className={`flex h-16 items-center justify-center border border-lv-border bg-lv-surface p-3 text-center ${r.class}`}
              >
                <div>
                  <div className="text-small font-medium text-lv-text">{r.name}</div>
                  <div className="text-caption text-lv-text-muted">{r.px}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-h3 font-semibold text-lv-text">Shadow Elevation</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {shadows.map((s) => (
              <div
                key={s.name}
                className={`flex h-16 flex-col justify-center rounded-lv-md border border-lv-border/40 bg-lv-surface p-3 text-center ${s.class}`}
              >
                <div className="text-small font-medium text-lv-text">{s.name}</div>
                <div className="text-caption text-lv-text-muted">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
