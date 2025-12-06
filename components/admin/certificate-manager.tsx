"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Trash2, ImageIcon, Loader2, RefreshCw, Award } from "lucide-react"
import { getAllCertificates, createCertificate, deleteCertificate, uploadCertificateImage } from "@/lib/database"

interface Certificate {
  id: number
  image_url: string
  image_path: string
  title: string
  category: string
}

export function CertificateManager() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [newCertificate, setNewCertificate] = useState({ title: "", file: null as File | null })
  const [certificatePreview, setCertificatePreview] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    loadCertificates()
  }, [])

  const loadCertificates = async () => {
    setLoading(true)
    try {
      const data = await getAllCertificates()
      setCertificates(data)
    } catch (err) {
      console.error('Error loading certificates:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("File size must be less than 5MB")
        return
      }
      
      setNewCertificate({ ...newCertificate, file })
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setCertificatePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddCertificate = async () => {
    if (!newCertificate.title || !newCertificate.file) return
    
    setUploading(true)
    try {
      // Upload image to Supabase Storage
      const { url, path } = await uploadCertificateImage(newCertificate.file)
      
      // Save metadata to database
      const result = await createCertificate({
        title: newCertificate.title,
        category: "certificate",
        image_url: url,
        image_path: path
      })
      
      // Add to local state
      setCertificates([result, ...certificates])
      
      // Reset form
      setNewCertificate({ title: "", file: null })
      setCertificatePreview(null)
      setDialogOpen(false)
    } catch (err) {
      console.error('Error adding certificate:', err)
      alert('Failed to upload certificate. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteCertificate = async (id: number, imagePath: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return
    
    try {
      await deleteCertificate(id, imagePath)
      setCertificates(certificates.filter((c) => c.id !== id))
    } catch (err) {
      console.error('Error deleting certificate:', err)
      alert('Failed to delete certificate. Please try again.')
    }
  }

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
          <h2 className="text-2xl font-bold text-foreground">Certificate Manager</h2>
          <p className="text-muted-foreground">Upload and manage certificates</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadCertificates} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Certificate
              </Button>
            </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Certificate</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Certificate Title</Label>
                <Input
                  value={newCertificate.title}
                  onChange={(e) => setNewCertificate({ ...newCertificate, title: e.target.value })}
                  placeholder="Enter certificate title (e.g., ISO Certification, Student Certificate)"
                />
              </div>
              <div className="space-y-2">
                <Label>Upload Certificate Image</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  {certificatePreview ? (
                    <div className="space-y-2">
                      <img
                        src={certificatePreview}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg object-cover"
                      />
                      <p className="text-sm text-muted-foreground">Certificate ready to upload</p>
                    </div>
                  ) : (
                    <>
                      <Award className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Select a certificate image file (Max 5MB)</p>
                    </>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-2"
                  />
                </div>
              </div>
              <Button
                onClick={handleAddCertificate}
                className="w-full"
                disabled={!newCertificate.title || !certificatePreview || uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Add Certificate"
                )}
              </Button>
            </div>
          </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="p-8 text-center text-muted-foreground">
              No certificates uploaded yet. Click "Add Certificate" to get started.
            </CardContent>
          </Card>
        ) : (
          certificates.map((certificate) => (
            <Card key={certificate.id} className="overflow-hidden">
              <div className="relative aspect-video">
                <img 
                  src={certificate.image_url || "/placeholder.svg"} 
                  alt={certificate.title} 
                  className="w-full h-full object-cover" 
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => handleDeleteCertificate(certificate.id, certificate.image_path)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-foreground">{certificate.title}</h3>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground capitalize">
                  Certificate
                </span>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

