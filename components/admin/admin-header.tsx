"use client"

import { useRouter } from "next/navigation"
import { Menu, Bell, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AdminHeaderProps {
  onMenuClick: () => void
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const { signOut } = await import("@/lib/database")
      await signOut()
      router.push("/admin/login")
    } catch (err) {
      console.error('Logout error:', err)
      router.push("/admin/login")
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-semibold text-foreground">Welcome, Admin</h2>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
        </div>
        <Link href="/">
          <Button variant="outline" size="sm">
            View Site
          </Button>
        </Link>
        <Button variant="destructive" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-1" />
          Logout
        </Button>
      </div>
    </header>
  )
}
