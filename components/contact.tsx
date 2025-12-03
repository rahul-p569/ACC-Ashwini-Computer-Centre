"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="bg-muted py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Contact <span className="text-primary">Us</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground">
            Have questions? Reach out to us and we will be happy to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          <Card>
            <CardContent className="flex items-start gap-3 md:gap-4 p-4 md:p-6">
              <div className="rounded-full bg-primary/10 p-2 md:p-3 flex-shrink-0">
                <Phone className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm md:text-base">Phone</h3>
                <p className="text-muted-foreground text-sm md:text-base">7903060859</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-3 md:gap-4 p-4 md:p-6">
              <div className="rounded-full bg-primary/10 p-2 md:p-3 flex-shrink-0">
                <Mail className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm md:text-base">Email</h3>
                <p className="text-muted-foreground text-sm md:text-base break-all">info@ashwinicomputer.com</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-3 md:gap-4 p-4 md:p-6">
              <div className="rounded-full bg-primary/10 p-2 md:p-3 flex-shrink-0">
                <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm md:text-base">Address</h3>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Chitra More, Uperbandha Dumka Jamtara Road,
                  <br />
                  Deoghar, Jharkhand - 814146
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-3 md:gap-4 p-4 md:p-6">
              <div className="rounded-full bg-primary/10 p-2 md:p-3 flex-shrink-0">
                <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm md:text-base">Working Hours</h3>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Mon - Sat: 9:00 AM - 7:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
