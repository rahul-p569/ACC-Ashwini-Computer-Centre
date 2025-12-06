"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Loader2, MessageSquare } from "lucide-react"
import { createEnquiry } from "@/lib/database"

const courses = [
  "DCA - Diploma in Computer Applications",
  "Tally Prime with GST",
  "DTP - Desktop Publishing",
  "DFA - Diploma in Financial Accounting",
  "ADCA - Advanced Diploma in Computer Applications",
  "CCC - Course on Computer Concepts",
  "Internet & Scanning",
  "English & Hindi Typing",
  "Online Government Exam Practice",
  "HTML Web Development",
  "School Level Courses",
  "Test & Practice Facilities",
  "General Inquiry",
]

export function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
    course_interest: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createEnquiry({
        name: formData.name,
        email: formData.email || undefined,
        mobile: formData.mobile,
        subject: formData.subject || undefined,
        message: formData.message,
        course_interest: formData.course_interest || undefined,
        status: "new",
      })

      setSubmitted(true)
      setFormData({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
        course_interest: "",
      })
    } catch (error) {
      console.error("Error submitting enquiry:", error)
      alert("Failed to submit enquiry. Please try again or contact us directly.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 md:p-12 text-center">
          <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Enquiry Submitted Successfully!</h3>
          <p className="text-muted-foreground mb-6">
            Thank you for your interest in ACC Computer Center. We will contact you soon.
          </p>
          <Button onClick={() => setSubmitted(false)}>Submit Another Enquiry</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Send Us an Enquiry</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">
                Mobile Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="mobile"
                type="tel"
                required
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="10-digit mobile number"
                maxLength={10}
                pattern="[0-9]{10}"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course_interest">Course Interest</Label>
              <Select
                value={formData.course_interest}
                onValueChange={(value) => setFormData({ ...formData, course_interest: value })}
              >
                <SelectTrigger id="course_interest">
                  <SelectValue placeholder="Select a course (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Brief subject of your enquiry"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Message <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your enquiry..."
              rows={5}
              className="resize-none"
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Enquiry"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

