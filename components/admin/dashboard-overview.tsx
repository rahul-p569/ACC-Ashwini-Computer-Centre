"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, ImageIcon, BookOpen, TrendingUp, Loader2, Download } from "lucide-react"
import { getAllAdmissionSubmissions, getAllExamSubmissions, getAllGalleryPhotos } from "@/lib/database"

interface Submission {
  id: number
  created_at?: string
  name: string
  course?: string
  appType?: 'admission' | 'exam'
  [key: string]: any
}

const courses = [
  "Basic Computer Course",
  "Advanced Computer Course",
  "Typing Course (Hindi & English)",
  "Tally Prime with GST",
  "DTP & Graphic Design",
  "Web Development Basics",
]

export function DashboardOverview() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalApplications: 0,
    galleryPhotos: 0,
    activeCourses: courses.length,
    thisMonth: 0,
  })
  const [recentApplications, setRecentApplications] = useState<Submission[]>([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [admissions, exams, photos] = await Promise.all([
        getAllAdmissionSubmissions(),
        getAllExamSubmissions(),
        getAllGalleryPhotos(),
      ])

      // Calculate total applications
      const totalApps = admissions.length + exams.length
      
      // Calculate this month's submissions
      const now = new Date()
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      const thisMonthApps = [...admissions, ...exams].filter(app => {
        const appDate = new Date(app.created_at || '')
        return appDate >= thisMonthStart
      }).length

      setStats({
        totalApplications: totalApps,
        galleryPhotos: photos.length,
        activeCourses: courses.length,
        thisMonth: thisMonthApps,
      })

      // Get recent applications (last 5, sorted by date)
      // Add type identifier to prevent duplicate keys
      const allApps = [
        ...admissions.map(app => ({ ...app, appType: 'admission' })),
        ...exams.map(app => ({ ...app, appType: 'exam' }))
      ]
        .sort((a, b) => {
          const dateA = new Date(a.created_at || 0).getTime()
          const dateB = new Date(b.created_at || 0).getTime()
          return dateB - dateA
        })
        .slice(0, 5)

      setRecentApplications(allApps)
    } catch (err) {
      console.error('Error loading dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }

  const exportAllData = async () => {
    try {
      const [admissions, exams] = await Promise.all([
        getAllAdmissionSubmissions(),
        getAllExamSubmissions(),
      ])

      const allData = [
        ...admissions.map(app => ({
          type: "Admission",
          name: app.name,
          mobile: app.mobile,
          email: app.email || "",
          course: app.course || "",
          branch: app.branch || "",
          date: formatDate(app.created_at)
        })),
        ...exams.map(app => ({
          type: "Exam",
          name: app.name,
          mobile: app.mobile,
          email: app.email || "",
          course: app.course || "",
          branch: app.branch || "",
          date: formatDate(app.created_at)
        }))
      ]

      if (allData.length === 0) {
        alert("No data to export")
        return
      }

      const headers = ["Type", "Name", "Mobile", "Email", "Course", "Branch", "Date"]
      const rows = allData.map(item => [
        item.type,
        item.name,
        item.mobile,
        item.email,
        item.course,
        item.branch,
        item.date
      ].map(value => `"${String(value).replace(/"/g, '""')}"`))

      const csv = [headers.join(","), ...rows.map(row => row.join(","))].join("\n")
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `all-submissions-${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error('Error exporting data:', err)
      alert('Failed to export data')
    }
  }

  const statsData = [
    { 
      title: "Total Applications", 
      value: stats.totalApplications.toString(), 
      change: "All time", 
      icon: Users, 
      color: "text-blue-500" 
    },
    { 
      title: "Gallery Photos", 
      value: stats.galleryPhotos.toString(), 
      change: "Total uploaded", 
      icon: ImageIcon, 
      color: "text-pink-500" 
    },
    { 
      title: "Active Courses", 
      value: stats.activeCourses.toString(), 
      change: "All running", 
      icon: BookOpen, 
      color: "text-green-500" 
    },
    { 
      title: "This Month", 
      value: stats.thisMonth.toString(), 
      change: "New submissions", 
      icon: TrendingUp, 
      color: "text-orange-500" 
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={exportAllData} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export All Data
        </Button>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </div>
                <stat.icon className={`h-10 w-10 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {recentApplications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No applications submitted yet
            </div>
          ) : (
            <div className="space-y-4">
              {recentApplications.map((app, index) => (
                <div key={`${app.appType || 'app'}-${app.id}-${index}`} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-foreground">{app.name}</p>
                    <p className="text-sm text-muted-foreground">{app.course || "N/A"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{formatDate(app.created_at)}</p>
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">
                      submitted
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
