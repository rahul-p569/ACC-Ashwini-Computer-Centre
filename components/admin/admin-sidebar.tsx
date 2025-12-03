"use client"

import Image from "next/image"
import { LayoutDashboard, ImageIcon, FileText, X, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const menuItems = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "submissions", label: "Form Submissions", icon: ClipboardList },
  { id: "applications", label: "Applications", icon: FileText },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
]

export function AdminSidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: AdminSidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />}

      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-primary text-primary-foreground transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-primary-foreground/10">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 flex-shrink-0">
              <Image
                src="/acc-logo.png"
                alt="ACC Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="font-bold">ACC Admin</h1>
              <p className="text-xs text-primary-foreground/70">Dashboard</p>
            </div>
          </div>
          <button className="lg:hidden" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                setIsOpen(false)
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left",
                activeTab === item.id
                  ? "bg-white text-primary"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  )
}
