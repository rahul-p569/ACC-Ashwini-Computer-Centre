"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Loader2, RefreshCw, Trash2, Mail, Phone, MessageSquare } from "lucide-react"
import { getAllEnquiries, deleteEnquiry, updateEnquiryStatus } from "@/lib/database"

interface Enquiry {
  id: number
  created_at?: string
  name: string
  email?: string
  mobile: string
  subject?: string
  message: string
  course_interest?: string
  status?: string
}

export function EnquiryManager() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    loadEnquiries()
  }, [])

  const loadEnquiries = async () => {
    setLoading(true)
    try {
      const data = await getAllEnquiries()
      setEnquiries(data)
    } catch (err) {
      console.error('Error loading enquiries:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) {
      return
    }

    try {
      await deleteEnquiry(id)
      setEnquiries(prev => prev.filter(enq => enq.id !== id))
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(null)
      }
      alert('Enquiry deleted successfully')
    } catch (err) {
      console.error('Error deleting enquiry:', err)
      alert('Failed to delete enquiry. Please try again.')
    }
  }

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      await updateEnquiryStatus(id, status)
      setEnquiries(prev => prev.map(enq => enq.id === id ? { ...enq, status } : enq))
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status })
      }
    } catch (err) {
      console.error('Error updating status:', err)
      alert('Failed to update status. Please try again.')
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getStatusBadge = (status?: string) => {
    const statusValue = status || "new"
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", label: string }> = {
      new: { variant: "default", label: "New" },
      contacted: { variant: "secondary", label: "Contacted" },
      resolved: { variant: "outline", label: "Resolved" },
      closed: { variant: "secondary", label: "Closed" }
    }
    const config = variants[statusValue] || variants.new
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesSearch = 
      enq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.mobile.includes(searchTerm) ||
      (enq.email && enq.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (enq.subject && enq.subject.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === "all" || enq.status === statusFilter || (!enq.status && statusFilter === "new")
    
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Enquiry Management</h2>
          <p className="text-muted-foreground">View and manage customer enquiries</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search enquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={loadEnquiries}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {filteredEnquiries.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            {searchTerm || statusFilter !== "all" 
              ? "No enquiries found matching your filters" 
              : "No enquiries submitted yet"}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredEnquiries.map((enquiry) => (
            <Card key={enquiry.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{enquiry.name}</h3>
                        {enquiry.subject && (
                          <p className="text-sm text-muted-foreground mt-1">{enquiry.subject}</p>
                        )}
                      </div>
                      {getStatusBadge(enquiry.status)}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span>{enquiry.mobile}</span>
                      </div>
                      {enquiry.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span>{enquiry.email}</span>
                        </div>
                      )}
                      {enquiry.course_interest && (
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span className="truncate max-w-[200px]">{enquiry.course_interest}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatDate(enquiry.created_at)}
                    </p>
                  </div>
                  <div className="flex gap-2 sm:flex-col">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedEnquiry(enquiry)}
                      className="w-full sm:w-auto"
                    >
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Select
                      value={enquiry.status || "new"}
                      onValueChange={(value) => handleStatusUpdate(enquiry.id, value)}
                    >
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleDelete(enquiry.id)}
                      className="w-full sm:w-auto"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedEnquiry} onOpenChange={() => setSelectedEnquiry(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-primary mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-medium text-foreground">{selectedEnquiry.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Mobile</p>
                    <a 
                      href={`tel:${selectedEnquiry.mobile}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {selectedEnquiry.mobile}
                    </a>
                  </div>
                  {selectedEnquiry.email && (
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <a 
                        href={`mailto:${selectedEnquiry.email}`}
                        className="font-medium text-primary hover:underline break-all"
                      >
                        {selectedEnquiry.email}
                      </a>
                    </div>
                  )}
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <div className="mt-1">{getStatusBadge(selectedEnquiry.status)}</div>
                  </div>
                  {selectedEnquiry.subject && (
                    <div className="md:col-span-2">
                      <p className="text-muted-foreground">Subject</p>
                      <p className="font-medium text-foreground">{selectedEnquiry.subject}</p>
                    </div>
                  )}
                  {selectedEnquiry.course_interest && (
                    <div className="md:col-span-2">
                      <p className="text-muted-foreground">Course Interest</p>
                      <p className="font-medium text-foreground">{selectedEnquiry.course_interest}</p>
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <p className="text-muted-foreground">Submitted On</p>
                    <p className="font-medium text-foreground">{formatDate(selectedEnquiry.created_at)}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-primary mb-3">Message</h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-foreground whitespace-pre-wrap">{selectedEnquiry.message}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Select
                  value={selectedEnquiry.status || "new"}
                  onValueChange={(value) => handleStatusUpdate(selectedEnquiry.id, value)}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    handleDelete(selectedEnquiry.id)
                    setSelectedEnquiry(null)
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
                <Button onClick={() => setSelectedEnquiry(null)}>
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

