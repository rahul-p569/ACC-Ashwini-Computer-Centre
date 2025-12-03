"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Calendar, User, Phone, Mail, Loader2, RefreshCw, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getAllAdmissionSubmissions, getAllExamSubmissions, deleteAdmissionSubmission, deleteExamSubmission } from "@/lib/database"

interface Submission {
  id: number
  created_at?: string
  name: string
  mobile: string
  email?: string
  course?: string
  [key: string]: any
}

export function SubmissionsViewer() {
  const [admissionSubmissions, setAdmissionSubmissions] = useState<Submission[]>([])
  const [examSubmissions, setExamSubmissions] = useState<Submission[]>([])
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadSubmissions()
  }, [])

  const loadSubmissions = async () => {
    setLoading(true)
    setError("")
    
    try {
      const [admissions, exams] = await Promise.all([
        getAllAdmissionSubmissions(),
        getAllExamSubmissions()
      ])
      
      setAdmissionSubmissions(admissions)
      setExamSubmissions(exams)
    } catch (err) {
      console.error('Error loading submissions:', err)
      setError("Failed to load submissions. Please check your database connection.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number, type: 'admission' | 'exam') => {
    if (!confirm(`Are you sure you want to delete this ${type} submission? This action cannot be undone.`)) {
      return
    }

    try {
      if (type === 'admission') {
        await deleteAdmissionSubmission(id)
        setAdmissionSubmissions(prev => prev.filter(sub => sub.id !== id))
      } else {
        await deleteExamSubmission(id)
        setExamSubmissions(prev => prev.filter(sub => sub.id !== id))
      }
      alert('Submission deleted successfully')
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null)
      }
    } catch (err) {
      console.error('Error deleting submission:', err)
      alert('Failed to delete submission. Please try again.')
    }
  }

  const exportToExcel = (submissions: Submission[], filename: string) => {
    if (submissions.length === 0) {
      alert("No data to export")
      return
    }

    // Get all unique keys from submissions
    const allKeys = new Set<string>()
    submissions.forEach(sub => {
      Object.keys(sub).forEach(key => allKeys.add(key))
    })

    // Create CSV content
    const headers = Array.from(allKeys).join(",")
    const rows = submissions.map(sub => {
      return Array.from(allKeys).map(key => {
        const value = sub[key] || ""
        // Escape commas and quotes in values
        return `"${String(value).replace(/"/g, '""')}"`
      }).join(",")
    })

    const csv = [headers, ...rows].join("\n")
    
    // Create download link
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const SubmissionCard = ({ submission, type }: { submission: Submission, type: 'admission' | 'exam' }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold">{submission.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge>
              {submission.course || "Application"}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(submission.id, type)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          {submission.course && (
            <div className="flex items-center gap-2">
              <FileText className="h-3 w-3" />
              <span>{submission.course}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Phone className="h-3 w-3" />
            <span>{submission.mobile}</span>
          </div>
          {submission.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-3 w-3" />
              <span>{submission.email}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(submission.created_at)}</span>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3"
              onClick={() => setSelectedSubmission(submission)}
            >
              View Full Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Submission Details</DialogTitle>
            </DialogHeader>
            {selectedSubmission && (
              <div className="space-y-4">
                {Object.entries(selectedSubmission).map(([key, value]) => {
                  if (key === "id") return null
                  return (
                    <div key={key} className="grid grid-cols-3 gap-2 border-b pb-2">
                      <div className="font-semibold capitalize text-sm">
                        {key.replace(/_/g, " ").replace(/([A-Z])/g, " $1").trim()}:
                      </div>
                      <div className="col-span-2 text-sm">{String(value || "N/A")}</div>
                    </div>
                  )
                })}
                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    variant="destructive" 
                    onClick={() => {
                      handleDelete(selectedSubmission.id, type)
                      setSelectedSubmission(null)
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                  <Button className="flex-1" onClick={() => setSelectedSubmission(null)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Form Submissions</h2>
          <p className="text-muted-foreground">View and export admission and exam form submissions</p>
        </div>
        <Button onClick={loadSubmissions} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {error && (
        <Card className="bg-destructive/10 border-destructive">
          <CardContent className="p-4">
            <p className="text-destructive text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Admission Submissions */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold">Admission Forms</h3>
            <p className="text-sm text-muted-foreground">{admissionSubmissions.length} submissions</p>
          </div>
          <Button
            onClick={() => exportToExcel(admissionSubmissions, "admission-submissions")}
            disabled={admissionSubmissions.length === 0}
            className="w-full sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4" />
            Export to Excel
          </Button>
        </div>
        
        {admissionSubmissions.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No admission submissions yet
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {admissionSubmissions.map((submission) => (
              <SubmissionCard key={submission.id} submission={submission} type="admission" />
            ))}
          </div>
        )}
      </div>

      {/* Exam Submissions */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold">Exam Forms</h3>
            <p className="text-sm text-muted-foreground">{examSubmissions.length} submissions</p>
          </div>
          <Button
            onClick={() => exportToExcel(examSubmissions, "exam-submissions")}
            disabled={examSubmissions.length === 0}
            className="w-full sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4" />
            Export to Excel
          </Button>
        </div>
        
        {examSubmissions.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No exam submissions yet
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {examSubmissions.map((submission) => (
              <SubmissionCard key={submission.id} submission={submission} type="exam" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

