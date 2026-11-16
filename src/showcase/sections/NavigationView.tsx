import React, { useState } from 'react'
import {
  Breadcrumbs,
  Card,
  DeviceCard,
  FileRow,
  FolderCard,
  InteractiveCard,
  NavigationGroup,
  Pagination,
  SidebarNavItem,
  Tabs,
  Toolbar,
  ToolbarButton,
  ToolbarIconButton,
} from '../../index'
import {
  Folder,
  HardDrive,
  Laptop,
  LayoutGrid,
  List,
  Monitor,
  Plus,
  RefreshCw,
  Search,
  Settings,
} from 'lucide-react'

export function NavigationView() {
  const [activeTab, setActiveTab] = useState('all')
  const [segmentedTab, setSegmentedTab] = useState('grid')
  const [activeNav, setActiveNav] = useState('documents')
  const [selectedCard, setSelectedCard] = useState('mac')
  const [page, setPage] = useState(1)

  const breadcrumbs = [
    { id: 'storage', label: 'LocalVault Storage' },
    { id: 'shared', label: 'Shared' },
    { id: 'projects', label: 'Projects' },
    { id: 'q4', label: '2026-Q4' },
    { id: 'releases', label: 'Release-Builds' },
  ]

  const tabItems = [
    { id: 'all', label: 'All Files', count: 142 },
    { id: 'transfers', label: 'Active Transfers', count: 2 },
    { id: 'devices', label: 'Connected Devices', count: 2 },
  ]

  const viewModes = [
    { id: 'grid', label: 'Grid View', icon: LayoutGrid },
    { id: 'list', label: 'List View', icon: List },
  ]

  return (
    <div className="flex flex-col gap-10">
      {/* Toolbar & Breadcrumbs */}
      <div>
        <h3 className="text-h2 font-semibold text-lv-text">Toolbar & Breadcrumbs</h3>
        <p className="mt-1 text-small text-lv-text-muted">Header toolbar with navigation slots, action buttons, and collapsible breadcrumbs.</p>

        <div className="mt-4 overflow-hidden rounded-lv-lg border border-lv-border shadow-lv-sm">
          <Toolbar
            title="Shared Documents"
            description="MacBook Pro ⇄ Windows PC synchronized directory"
            leading={<ToolbarIconButton icon={RefreshCw} label="Refresh Directory" />}
            actions={
              <div className="flex items-center gap-2">
                <Tabs
                  variant="segmented"
                  items={viewModes}
                  value={segmentedTab}
                  onChange={setSegmentedTab}
                  ariaLabel="View mode"
                />
                <ToolbarButton icon={Plus} variant="primary">New Folder</ToolbarButton>
              </div>
            }
          >
            <Breadcrumbs items={breadcrumbs} maxVisible={4} onNavigate={(id) => console.log('Navigated to:', id)} />
          </Toolbar>
        </div>
      </div>

      {/* Tabs & View Controls */}
      <div>
        <h3 className="text-h2 font-semibold text-lv-text">Tabs</h3>
        <div className="mt-4 flex flex-col gap-4">
          <Tabs items={tabItems} value={activeTab} onChange={setActiveTab} ariaLabel="Storage sections" />
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <h3 className="text-h3 font-semibold text-lv-text">Sidebar Navigation</h3>
          <p className="mt-1 text-caption text-lv-text-muted">Collapsible navigation groups with icons and badge counters.</p>

          <div className="mt-4 flex flex-col gap-4 rounded-lv-lg border border-lv-border bg-lv-surface p-3">
            <NavigationGroup label="LocalVault Volumes" defaultOpen>
              <SidebarNavItem
                icon={HardDrive}
                label="Primary Shared Storage"
                active={activeNav === 'documents'}
                count={84}
                onClick={() => setActiveNav('documents')}
              />
              <SidebarNavItem
                icon={Folder}
                label="Transfer Temp Queue"
                active={activeNav === 'temp'}
                count={2}
                onClick={() => setActiveNav('temp')}
              />
            </NavigationGroup>

            <NavigationGroup label="Paired Hardware" collapsible defaultOpen>
              <SidebarNavItem
                icon={Laptop}
                label="MacBook Pro 14″"
                status="online"
                active={activeNav === 'mac'}
                onClick={() => setActiveNav('mac')}
              />
              <SidebarNavItem
                icon={Monitor}
                label="Windows 11 Workstation"
                status="online"
                active={activeNav === 'win'}
                onClick={() => setActiveNav('win')}
              />
            </NavigationGroup>
          </div>
        </div>

        {/* Cards & Data Displays */}
        <div className="md:col-span-2">
          <h3 className="text-h3 font-semibold text-lv-text">Data Cards & Storage Tiles</h3>
          <p className="mt-1 text-caption text-lv-text-muted">Interactive hardware tiles and folder cards with storage meters.</p>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DeviceCard
              name="MacBook Pro"
              platform="macos"
              status="online"
              model="Apple M2 Pro · macOS 15.1"
              address="127.0.0.1:3001"
              isCurrent
              storage={{ usedGB: 412, totalGB: 1000 }}
              selected={selectedCard === 'mac'}
              onSelect={() => setSelectedCard('mac')}
            />

            <DeviceCard
              name="Asus Gaming PC"
              platform="windows"
              status="online"
              model="AMD Ryzen 9 · Windows 11 Pro"
              address="192.168.29.49:3001"
              storage={{ usedGB: 1720, totalGB: 2000 }}
              selected={selectedCard === 'win'}
              onSelect={() => setSelectedCard('win')}
            />

            <FolderCard
              name="Project Documents"
              itemCount={24}
              selected={selectedCard === 'docs'}
              onSelect={() => setSelectedCard('docs')}
            />

            <FolderCard
              name="4K Video Renders"
              itemCount={8}
              selected={selectedCard === 'videos'}
              onSelect={() => setSelectedCard('videos')}
            />
          </div>
        </div>
      </div>

      {/* File Row List & Pagination */}
      <div>
        <h3 className="text-h2 font-semibold text-lv-text">File Rows & Pager</h3>
        <div className="mt-4 flex flex-col rounded-lv-lg border border-lv-border bg-lv-surface p-4">
          <div className="flex flex-col gap-1">
            <FileRow
              name="LocalVault-Windows-Final.zip"
              kind="archive"
              size="48.2 MB"
              modified="Today, 11:24 AM"
            />
            <FileRow
              name="Network-Transfer-Audit.pdf"
              kind="document"
              size="3.4 MB"
              modified="Today, 09:15 AM"
              selected
            />
            <FileRow
              name="Gateway-Access-Key.pem"
              kind="code"
              size="1.8 KB"
              modified="Yesterday, 4:40 PM"
            />
            <FileRow
              name="Architecture-Overview.mp4"
              kind="video"
              size="240.1 MB"
              modified="Nov 14, 2026"
            />
          </div>

          <div className="mt-6 border-t border-lv-border pt-4">
            <Pagination
              page={page}
              pageCount={12}
              pageSize={10}
              totalItems={118}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
