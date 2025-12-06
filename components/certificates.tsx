"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Loader2, Award } from "lucide-react"
import { getAllCertificates } from "@/lib/database"

interface Certificate {
  id: number
  image_url: string
  title: string
  category: string
}

export function Certificates() {
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null)
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCertificates()
  }, [])

  const loadCertificates = async () => {
    try {
      const data = await getAllCertificates()
      setCertificates(data)
    } catch (err) {
      console.error('Error loading certificates:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="certificates" className="py-10 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Our <span className="text-primary">Certificates</span>
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
    <section id="certificates" className="py-10 md:py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-12 text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <Award className="h-8 w-8 md:h-10 md:w-10 text-primary mr-2" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Our <span className="text-primary">Certificates</span>
            </h2>
          </div>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground px-2">
            ACC Computer Center (Ashwini Computer Centre) is proud to showcase our certifications and accreditations. 
            We are an ISO 9001:2015 certified organization committed to providing quality computer education.
          </p>
        </div>

        {certificates.length === 0 ? (
          <div className="text-center py-12">
            <Award className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Certificates will be displayed here soon.</p>
          </div>
        ) : (
          <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate) => (
              <Card 
                key={certificate.id} 
                className="group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow" 
                onClick={() => setSelectedCertificate(certificate.image_url)}
              >
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
                  <img
                    src={certificate.image_url || "/placeholder.svg"}
                    alt={`${certificate.title} - ACC Computer Center Ashwini Computer Centre`}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105 p-4"
                  />
                  <div className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/5" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-primary flex-shrink-0" />
                    <h3 className="font-semibold text-foreground text-sm md:text-base">{certificate.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">Click to view full size</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-4xl p-2 md:p-4">
          {selectedCertificate && (
            <img 
              src={selectedCertificate || "/placeholder.svg"} 
              alt="ACC Computer Center - Ashwini Computer Centre Certificate" 
              className="w-full rounded-lg" 
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

