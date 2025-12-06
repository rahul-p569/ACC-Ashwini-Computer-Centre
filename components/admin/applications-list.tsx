"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Eye, Loader2, RefreshCw, Download, Trash2 } from "lucide-react"
import { getAllAdmissionSubmissions, getAllExamSubmissions, deleteAdmissionSubmission, deleteExamSubmission } from "@/lib/database"

interface AdmissionApplication {
  id: number
  name: string
  father_name: string
  mother_name: string
  course: string
  branch: string
  mobile: string
  created_at?: string
  dob: string
  address: string
  email?: string
  gender: string
  id_number?: string
  tenth_board?: string
  tenth_year?: string
  tenth_percent?: string
  twelve_board?: string
  twelve_year?: string
  twelve_percent?: string
}

interface ExamApplication {
  id: number
  name: string
  father_name: string
  mother_name: string
  course: string
  branch: string
  mobile: string
  created_at?: string
  dob: string
  address: string
  email?: string
  gender: string
  id_number?: string
  reg_no?: string
  duration?: string
  admission_date?: string
  fees?: string
  paid?: string
  dues?: string
  place?: string
  date?: string
  tenth_subject?: string
  tenth_board?: string
  tenth_year?: string
  tenth_percent?: string
  inter_subject?: string
  inter_board?: string
  inter_year?: string
  inter_percent?: string
  degree_subject?: string
  degree_board?: string
  degree_year?: string
  degree_percent?: string
  other_subject?: string
  other_board?: string
  other_year?: string
  other_percent?: string
}

export function ApplicationsList() {
  const [admissionApplications, setAdmissionApplications] = useState<AdmissionApplication[]>([])
  const [examApplications, setExamApplications] = useState<ExamApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | ExamApplication | null>(null)
  const [activeTab, setActiveTab] = useState("admission")

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = async () => {
    setLoading(true)
    try {
      const [admissions, exams] = await Promise.all([
        getAllAdmissionSubmissions(),
        getAllExamSubmissions()
      ])
      setAdmissionApplications(admissions)
      setExamApplications(exams)
    } catch (err) {
      console.error('Error loading applications:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number, type: 'admission' | 'exam') => {
    if (!confirm(`Are you sure you want to delete this ${type} application? This action cannot be undone.`)) {
      return
    }

    try {
      if (type === 'admission') {
        await deleteAdmissionSubmission(id)
        setAdmissionApplications(prev => prev.filter(app => app.id !== id))
      } else {
        await deleteExamSubmission(id)
        setExamApplications(prev => prev.filter(app => app.id !== id))
      }
      alert('Application deleted successfully')
    } catch (err) {
      console.error('Error deleting application:', err)
      alert('Failed to delete application. Please try again.')
    }
  }

  const filteredAdmissions = admissionApplications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.mobile.includes(searchTerm),
  )

  const filteredExams = examApplications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.mobile.includes(searchTerm),
  )

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }

  const exportAdmissionsToExcel = () => {
    if (admissionApplications.length === 0) {
      alert("No admission data to export")
      return
    }

    const headers = [
      "ID",
      "Submission Date",
      "Name",
      "Father's Name",
      "Mother's Name",
      "DOB",
      "Gender",
      "Mobile",
      "Email",
      "Address",
      "ID Number",
      "Course",
      "Branch",
      "10th Board",
      "10th Year",
      "10th %",
      "12th Board",
      "12th Year",
      "12th %"
    ]

    const rows = admissionApplications.map(app => [
      app.id,
      formatDate(app.created_at),
      app.name,
      app.father_name,
      app.mother_name,
      app.dob,
      app.gender,
      app.mobile,
      app.email || "",
      app.address,
      app.id_number || "",
      app.course,
      app.branch,
      app.tenth_board || "",
      app.tenth_year || "",
      app.tenth_percent || "",
      app.twelve_board || "",
      app.twelve_year || "",
      app.twelve_percent || ""
    ].map(value => `"${String(value).replace(/"/g, '""')}"`))

    const csv = [headers.join(","), ...rows.map(row => row.join(","))].join("\n")
    downloadCSV(csv, `admission-forms-${new Date().toISOString().split('T')[0]}.csv`)
  }

  const exportExamsToExcel = () => {
    if (examApplications.length === 0) {
      alert("No exam data to export")
      return
    }

    const headers = [
      "ID",
      "Submission Date",
      "Name",
      "Father's Name",
      "Mother's Name",
      "DOB",
      "Gender",
      "Mobile",
      "Email",
      "Address",
      "ID Number",
      "Course",
      "Branch",
      "Reg No",
      "Duration",
      "Admission Date",
      "Fees",
      "Paid",
      "Dues",
      "Place",
      "Date",
      "10th Subject",
      "10th Board",
      "10th Year",
      "10th %",
      "Inter Subject",
      "Inter Board",
      "Inter Year",
      "Inter %",
      "Degree Subject",
      "Degree Board",
      "Degree Year",
      "Degree %",
      "Other Subject",
      "Other Board",
      "Other Year",
      "Other %"
    ]

    const rows = examApplications.map(app => [
      app.id,
      formatDate(app.created_at),
      app.name,
      app.father_name,
      app.mother_name,
      app.dob,
      app.gender,
      app.mobile,
      app.email || "",
      app.address,
      app.id_number || "",
      app.course,
      app.branch,
      app.reg_no || "",
      app.duration || "",
      app.admission_date || "",
      app.fees || "",
      app.paid || "",
      app.dues || "",
      app.place || "",
      app.date || "",
      app.tenth_subject || "",
      app.tenth_board || "",
      app.tenth_year || "",
      app.tenth_percent || "",
      app.inter_subject || "",
      app.inter_board || "",
      app.inter_year || "",
      app.inter_percent || "",
      app.degree_subject || "",
      app.degree_board || "",
      app.degree_year || "",
      app.degree_percent || "",
      app.other_subject || "",
      app.other_board || "",
      app.other_year || "",
      app.other_percent || ""
    ].map(value => `"${String(value).replace(/"/g, '""')}"`))

    const csv = [headers.join(","), ...rows.map(row => row.join(","))].join("\n")
    downloadCSV(csv, `exam-forms-${new Date().toISOString().split('T')[0]}.csv`)
  }

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const renderApplicationsTable = (applications: any[], type: 'admission' | 'exam') => {
    if (applications.length === 0) {
      return (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            {searchTerm ? "No applications found matching your search" : `No ${type} forms submitted yet`}
          </CardContent>
        </Card>
      )
    }

    return (
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Course</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden md:table-cell">
                    Branch
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden sm:table-cell">
                    Submission Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-foreground">{app.name}</p>
                        <p className="text-sm text-muted-foreground">{app.mobile}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-foreground">{app.course}</td>
                    <td className="px-4 py-3 text-foreground hidden md:table-cell">{app.branch}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                      <div className="text-sm">
                        {formatDate(app.created_at)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary">
                        submitted
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedApp(app)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDelete(app.id, type === 'admission' ? 'admission' : 'exam')}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const currentApplications = activeTab === "admission" ? filteredAdmissions : filteredExams
  const totalCount = activeTab === "admission" ? admissionApplications.length : examApplications.length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Student Applications</h2>
          <p className="text-muted-foreground">Manage and review student form submissions</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon" onClick={loadApplications}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <TabsList>
            <TabsTrigger value="admission">
              Admission Forms ({admissionApplications.length})
            </TabsTrigger>
            <TabsTrigger value="exam">
              Exam Forms ({examApplications.length})
            </TabsTrigger>
          </TabsList>
          
          <Button
            variant="outline"
            onClick={activeTab === "admission" ? exportAdmissionsToExcel : exportExamsToExcel}
            disabled={totalCount === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Export to Excel
          </Button>
        </div>

        <TabsContent value="admission" className="mt-0">
          {renderApplicationsTable(filteredAdmissions, 'admission')}
        </TabsContent>

        <TabsContent value="exam" className="mt-0">
          {renderApplicationsTable(filteredExams, 'exam')}
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-primary mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Student Name</p>
                    <p className="font-medium text-foreground">{selectedApp.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{"Father's Name"}</p>
                    <p className="font-medium text-foreground">{selectedApp.father_name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{"Mother's Name"}</p>
                    <p className="font-medium text-foreground">{selectedApp.mother_name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date of Birth</p>
                    <p className="font-medium text-foreground">{selectedApp.dob}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Gender</p>
                    <p className="font-medium text-foreground capitalize">{selectedApp.gender}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Mobile</p>
                    <p className="font-medium text-foreground">{selectedApp.mobile}</p>
                  </div>
                  {selectedApp.email && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{selectedApp.email}</p>
                    </div>
                  )}
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Address</p>
                    <p className="font-medium text-foreground">{selectedApp.address}</p>
                  </div>
                  {selectedApp.id_number && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground">ID Number</p>
                      <p className="font-medium text-foreground">{selectedApp.id_number}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-primary mb-3">Course Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Course</p>
                    <p className="font-medium text-foreground">{selectedApp.course}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Branch</p>
                    <p className="font-medium text-foreground">{selectedApp.branch}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Submission Date</p>
                    <p className="font-medium text-foreground">{formatDate(selectedApp.created_at)}</p>
                  </div>
                  {'reg_no' in selectedApp && selectedApp.reg_no && (
                    <>
                      <div>
                        <p className="text-muted-foreground">Registration No</p>
                        <p className="font-medium text-foreground">{selectedApp.reg_no}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-medium text-foreground">{selectedApp.duration || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Fees</p>
                        <p className="font-medium text-foreground">₹{selectedApp.fees || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Paid</p>
                        <p className="font-medium text-foreground">₹{selectedApp.paid || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Dues</p>
                        <p className="font-medium text-foreground">₹{selectedApp.dues || "N/A"}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Educational Qualification - Shows for both admission and exam forms */}
              {(('tenth_board' in selectedApp && (selectedApp.tenth_board || selectedApp.twelve_board)) ||
                ('tenth_subject' in selectedApp && (selectedApp.tenth_subject || selectedApp.inter_subject || selectedApp.degree_subject || selectedApp.other_subject))) && (
                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-primary mb-3">Educational Qualification</h3>
                  
                  {/* For Admission Forms (10th & 12th) */}
                  {'tenth_board' in selectedApp && (selectedApp.tenth_board || selectedApp.twelve_board) && (
                    <div className="space-y-3 text-sm">
                      {selectedApp.tenth_board && (
                        <div className="bg-muted/50 p-3 rounded">
                          <p className="font-semibold mb-2">10th / Matric</p>
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <p className="text-muted-foreground text-xs">Board</p>
                              <p className="font-medium text-foreground">{selectedApp.tenth_board}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Year</p>
                              <p className="font-medium text-foreground">{selectedApp.tenth_year || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Percentage</p>
                              <p className="font-medium text-foreground">{selectedApp.tenth_percent || "N/A"}%</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedApp.twelve_board && (
                        <div className="bg-muted/50 p-3 rounded">
                          <p className="font-semibold mb-2">12th / Intermediate</p>
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <p className="text-muted-foreground text-xs">Board</p>
                              <p className="font-medium text-foreground">{selectedApp.twelve_board}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Year</p>
                              <p className="font-medium text-foreground">{selectedApp.twelve_year || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Percentage</p>
                              <p className="font-medium text-foreground">{selectedApp.twelve_percent || "N/A"}%</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* For Exam Forms (10th, Inter, Degree, Others) */}
                  {'tenth_subject' in selectedApp && (
                    <div className="space-y-3 text-sm">
                      {(selectedApp.tenth_subject || selectedApp.tenth_board) && (
                        <div className="bg-muted/50 p-3 rounded">
                          <p className="font-semibold mb-2">10th</p>
                          <div className="grid grid-cols-4 gap-2">
                            <div>
                              <p className="text-muted-foreground text-xs">Subject</p>
                              <p className="font-medium text-foreground">{selectedApp.tenth_subject || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Board</p>
                              <p className="font-medium text-foreground">{selectedApp.tenth_board || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Year</p>
                              <p className="font-medium text-foreground">{selectedApp.tenth_year || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">%</p>
                              <p className="font-medium text-foreground">{selectedApp.tenth_percent || "N/A"}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {(selectedApp.inter_subject || selectedApp.inter_board) && (
                        <div className="bg-muted/50 p-3 rounded">
                          <p className="font-semibold mb-2">Intermediate</p>
                          <div className="grid grid-cols-4 gap-2">
                            <div>
                              <p className="text-muted-foreground text-xs">Subject</p>
                              <p className="font-medium text-foreground">{selectedApp.inter_subject || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Board</p>
                              <p className="font-medium text-foreground">{selectedApp.inter_board || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Year</p>
                              <p className="font-medium text-foreground">{selectedApp.inter_year || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">%</p>
                              <p className="font-medium text-foreground">{selectedApp.inter_percent || "N/A"}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {(selectedApp.degree_subject || selectedApp.degree_board) && (
                        <div className="bg-muted/50 p-3 rounded">
                          <p className="font-semibold mb-2">Degree</p>
                          <div className="grid grid-cols-4 gap-2">
                            <div>
                              <p className="text-muted-foreground text-xs">Subject</p>
                              <p className="font-medium text-foreground">{selectedApp.degree_subject || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Board</p>
                              <p className="font-medium text-foreground">{selectedApp.degree_board || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Year</p>
                              <p className="font-medium text-foreground">{selectedApp.degree_year || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">%</p>
                              <p className="font-medium text-foreground">{selectedApp.degree_percent || "N/A"}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {(selectedApp.other_subject || selectedApp.other_board) && (
                        <div className="bg-muted/50 p-3 rounded">
                          <p className="font-semibold mb-2">Others</p>
                          <div className="grid grid-cols-4 gap-2">
                            <div>
                              <p className="text-muted-foreground text-xs">Subject</p>
                              <p className="font-medium text-foreground">{selectedApp.other_subject || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Board</p>
                              <p className="font-medium text-foreground">{selectedApp.other_board || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Year</p>
                              <p className="font-medium text-foreground">{selectedApp.other_year || "N/A"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">%</p>
                              <p className="font-medium text-foreground">{selectedApp.other_percent || "N/A"}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    if (selectedApp) {
                      const type = 'reg_no' in selectedApp ? 'exam' : 'admission'
                      handleDelete(selectedApp.id, type)
                      setSelectedApp(null)
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
                <Button className="flex-1" onClick={() => setSelectedApp(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
