"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "./admin-sidebar"
import { AdminHeader } from "./admin-header"
import { DashboardOverview } from "./dashboard-overview"
import { GalleryManager } from "./gallery-manager"
import { CertificateManager } from "./certificate-manager"
import { EnquiryManager } from "./enquiry-manager"
import { ApplicationsList } from "./applications-list"
import { SubmissionsViewer } from "./submissions-viewer"

export function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [router])

  const checkAuth = async () => {
    try {
      const { getSession } = await import("@/lib/database")
      const session = await getSession()
      
      if (session) {
        setIsAuthenticated(true)
      } else {
        router.push("/admin/login")
      }
    } catch (err) {
      router.push("/admin/login")
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-muted">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1">
        <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-6">
          {activeTab === "overview" && <DashboardOverview />}
          {activeTab === "submissions" && <SubmissionsViewer />}
          {activeTab === "gallery" && <GalleryManager />}
          {activeTab === "certificates" && <CertificateManager />}
          {activeTab === "enquiries" && <EnquiryManager />}
          {activeTab === "applications" && <ApplicationsList />}
        </main>
      </div>
    </div>
  )
}
