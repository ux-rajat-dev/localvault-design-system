import React, { useState } from 'react'
import { ThemeProvider, ToastProvider } from '../index'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { FoundationsView } from './sections/FoundationsView'
import { ControlsView } from './sections/ControlsView'
import { NavigationView } from './sections/NavigationView'
import { FeedbackView } from './sections/FeedbackView'
import { DialogsView } from './sections/DialogsView'
import { OverlaysView } from './sections/OverlaysView'
import {
  Bell,
  CheckCircle2,
  FolderTree,
  Layers,
  MessageSquare,
  Shield,
  Sliders,
  type LucideIcon,
} from 'lucide-react'

type SectionId = 'foundations' | 'controls' | 'navigation' | 'feedback' | 'dialogs' | 'overlays'

export function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('foundations')

  const sections: Array<{ id: SectionId; label: string; icon: LucideIcon }> = [
    { id: 'foundations', label: '1. Foundations', icon: Layers },
    { id: 'controls', label: '2. Buttons & Inputs', icon: Sliders },
    { id: 'navigation', label: '3. Cards & Navigation', icon: FolderTree },
    { id: 'feedback', label: '4. Feedback & Progress', icon: CheckCircle2 },
    { id: 'dialogs', label: '5. Dialogs & Context Menus', icon: MessageSquare },
    { id: 'overlays', label: '6. Menus, Toasts & Tooltips', icon: Bell },
  ]

  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen bg-lv-bg text-lv-text font-sans">
          {/* Top Bar */}
          <header className="sticky top-0 z-40 border-b border-lv-border bg-lv-surface/85 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lv-md bg-lv-accent text-lv-on-accent shadow-lv-sm">
                  <Shield size={20} strokeWidth={2.2} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-body font-bold text-lv-text">LocalVault</h1>
                    <span className="rounded-lv-full bg-lv-accent/15 px-2 py-0.5 text-caption font-semibold text-lv-accent">
                      Design System v1.0
                    </span>
                  </div>
                  <p className="text-caption text-lv-text-muted">Master Consolidated Component Suite</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ThemeToggle />
              </div>
            </div>

            {/* Navigation Bar */}
            <div className="border-t border-lv-border/60">
              <div className="mx-auto flex max-w-7xl overflow-x-auto px-4 sm:px-6">
                <nav className="flex space-x-1 py-1" aria-label="Showcase Sections">
                  {sections.map(({ id, label, icon: Icon }) => {
                    const active = activeSection === id
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setActiveSection(id)}
                        className={`flex items-center gap-2 whitespace-nowrap rounded-lv-md px-3 py-2 text-small font-medium transition-colors ${
                          active
                            ? 'bg-lv-accent/12 text-lv-accent'
                            : 'text-lv-text-muted hover:bg-lv-hover hover:text-lv-text'
                        }`}
                      >
                        <Icon size={16} />
                        {label}
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>
          </header>

          {/* Section Main View */}
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            {activeSection === 'foundations' && <FoundationsView />}
            {activeSection === 'controls' && <ControlsView />}
            {activeSection === 'navigation' && <NavigationView />}
            {activeSection === 'feedback' && <FeedbackView />}
            {activeSection === 'dialogs' && <DialogsView />}
            {activeSection === 'overlays' && <OverlaysView />}
          </main>
        </div>
      </ToastProvider>
    </ThemeProvider>
  )
}
