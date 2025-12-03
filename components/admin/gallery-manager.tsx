"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, ImageIcon, Loader2, RefreshCw } from "lucide-react"
import { getAllGalleryPhotos, createGalleryPhoto, deleteGalleryPhoto, uploadGalleryImage } from "@/lib/database"

interface Photo {
  id: number
  image_url: string
  image_path: string
  title: string
  category: string
}

export function GalleryManager() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [newPhoto, setNewPhoto] = useState({ title: "", category: "", file: null as File | null })
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    loadPhotos()
  }, [])

  const loadPhotos = async () => {
    setLoading(true)
    try {
      const data = await getAllGalleryPhotos()
      setPhotos(data)
    } catch (err) {
      console.error('Error loading photos:', err)
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
      
      setNewPhoto({ ...newPhoto, file })
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddPhoto = async () => {
    if (!newPhoto.title || !newPhoto.category || !newPhoto.file) return
    
    setUploading(true)
    try {
      // Upload image to Supabase Storage
      const { url, path } = await uploadGalleryImage(newPhoto.file)
      
      // Save metadata to database
      const result = await createGalleryPhoto({
        title: newPhoto.title,
        category: newPhoto.category,
        image_url: url,
        image_path: path
      })
      
      // Add to local state
      setPhotos([result, ...photos])
      
      // Reset form
      setNewPhoto({ title: "", category: "", file: null })
      setPhotoPreview(null)
      setDialogOpen(false)
    } catch (err) {
      console.error('Error adding photo:', err)
      alert('Failed to upload photo. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleDeletePhoto = async (id: number, imagePath: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return
    
    try {
      await deleteGalleryPhoto(id, imagePath)
      setPhotos(photos.filter((p) => p.id !== id))
    } catch (err) {
      console.error('Error deleting photo:', err)
      alert('Failed to delete photo. Please try again.')
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
          <h2 className="text-2xl font-bold text-foreground">Gallery Manager</h2>
          <p className="text-muted-foreground">Upload and manage celebration photos</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadPhotos} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Photo
              </Button>
            </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Photo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Photo Title</Label>
                <Input
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  placeholder="Enter photo title"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={newPhoto.category}
                  onValueChange={(value) => setNewPhoto({ ...newPhoto, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="celebration">Celebration</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="classes">Classes</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Upload Image</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  {photoPreview ? (
                    <div className="space-y-2">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg object-cover"
                      />
                      <p className="text-sm text-muted-foreground">Image ready to upload</p>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Select an image file (Max 5MB)</p>
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
                onClick={handleAddPhoto}
                className="w-full"
                disabled={!newPhoto.title || !newPhoto.category || !photoPreview || uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Add to Gallery"
                )}
              </Button>
            </div>
          </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="p-8 text-center text-muted-foreground">
              No photos uploaded yet. Click "Add Photo" to get started.
            </CardContent>
          </Card>
        ) : (
          photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden">
              <div className="relative aspect-video">
                <img src={photo.image_url || "/placeholder.svg"} alt={photo.title} className="w-full h-full object-cover" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => handleDeletePhoto(photo.id, photo.image_path)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-foreground">{photo.title}</h3>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground capitalize">
                  {photo.category}
                </span>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
