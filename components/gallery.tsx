"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import { getAllGalleryPhotos } from "@/lib/database"

interface GalleryImage {
  id: number
  image_url: string
  title: string
  category: string
}

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGallery()
  }, [])

  const loadGallery = async () => {
    try {
      const photos = await getAllGalleryPhotos()
      setGalleryImages(photos)
    } catch (err) {
      console.error('Error loading gallery:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="gallery" className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Our <span className="text-primary">Gallery</span>
            </h2>
          </div>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="gallery" className="py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Our <span className="text-primary">Gallery</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground px-2">
            Glimpses of our events, celebrations, and the vibrant learning environment at ACC.
          </p>
        </div>

        {galleryImages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No photos in gallery yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-3 md:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {galleryImages.map((img) => (
              <Card key={img.id} className="group cursor-pointer overflow-hidden" onClick={() => setSelectedImage(img.image_url)}>
                <div className="relative aspect-square sm:aspect-video overflow-hidden">
                  <img
                    src={img.image_url || "/placeholder.svg"}
                    alt={img.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/20" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-white text-xs md:text-sm font-medium truncate">{img.title}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-4xl p-2 md:p-4">
          {selectedImage && (
            <img src={selectedImage || "/placeholder.svg"} alt="Gallery image" className="w-full rounded-lg" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
