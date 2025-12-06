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
          <Card className="h-full">
            <CardContent className="flex flex-col items-center text-center gap-3 md:gap-4 p-4 md:p-6 h-full">
              <div className="rounded-full bg-primary/10 p-3 md:p-4 flex-shrink-0">
                <Phone className="h-6 w-6 md:h-7 md:w-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-base md:text-lg mb-2">Phone</h3>
                <a href="tel:7903060859" className="text-muted-foreground text-sm md:text-base hover:text-primary transition-colors">
                  7903060859
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardContent className="flex flex-col items-center text-center gap-3 md:gap-4 p-4 md:p-6 h-full">
              <div className="rounded-full bg-primary/10 p-3 md:p-4 flex-shrink-0">
                <Mail className="h-6 w-6 md:h-7 md:w-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-base md:text-lg mb-2">Email</h3>
                <a 
                  href="mailto:ashwinicomputercenter@gmail.com" 
                  className="text-muted-foreground text-xs md:text-sm hover:text-primary transition-colors break-all"
                >
                  ashwinicomputercenter@gmail.com
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardContent className="flex flex-col items-center text-center gap-3 md:gap-4 p-4 md:p-6 h-full">
              <div className="rounded-full bg-primary/10 p-3 md:p-4 flex-shrink-0">
                <MapPin className="h-6 w-6 md:h-7 md:w-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-base md:text-lg mb-2">Address</h3>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                  Chitra More, Uperbandha Dumka Jamtara Road,
                  <br />
                  Deoghar, Jharkhand - 814146
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardContent className="flex flex-col items-center text-center gap-3 md:gap-4 p-4 md:p-6 h-full">
              <div className="rounded-full bg-primary/10 p-3 md:p-4 flex-shrink-0">
                <Clock className="h-6 w-6 md:h-7 md:w-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-base md:text-lg mb-2">Working Hours</h3>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
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
