import { EnquiryForm } from "@/components/enquiry-form"
import { MessageSquare, Phone, Mail } from "lucide-react"

export function Enquiry() {
  return (
    <section id="enquiry" className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-12 text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <MessageSquare className="h-8 w-8 md:h-10 md:w-10 text-primary mr-2" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Get in <span className="text-primary">Touch</span>
            </h2>
          </div>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground px-2">
            Have questions about our courses or services? Send us an enquiry and our team will get back to you as soon as possible.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <EnquiryForm />
          </div>
          
          <div className="space-y-6">
            <div className="rounded-xl bg-primary/5 border border-primary/10 p-6">
              <h3 className="font-semibold text-lg mb-4 text-foreground">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Phone</p>
                    <a href="tel:7903060859" className="text-sm text-muted-foreground hover:text-primary">
                      7903060859
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <a 
                      href="mailto:ashwinicomputercenter@gmail.com" 
                      className="text-sm text-muted-foreground hover:text-primary break-all"
                    >
                      ashwinicomputercenter@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-muted p-6">
              <h3 className="font-semibold text-lg mb-3 text-foreground">Why Choose ACC?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>ISO 9001:2015 Certified Institute</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Expert Faculty & Modern Labs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Flexible Batch Timings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>100% Job Assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Government Recognized Certificates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

