"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle, Loader2 } from "lucide-react"
import { createAdmissionSubmission } from "@/lib/database"

const courses = [
  "Basic Computer Course",
  "Advanced Computer Course",
  "Typing Course (Hindi & English)",
  "Tally Prime with GST",
  "DTP & Graphic Design",
  "Web Development Basics",
]

const branches = ["Head Branch - Chitra More, Deoghar", "2nd Branch - Bagdaha More, Fatehpur Jamtara"]

export function AdmissionForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    idNumber: "",
    course: "",
    branch: "",
    qualification: "",
    tenthBoard: "",
    tenthYear: "",
    tenthPercent: "",
    twelveBoard: "",
    twelveYear: "",
    twelvePercent: "",
    declaration: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    try {
      // Save to Supabase
      await createAdmissionSubmission({
        name: formData.name,
        father_name: formData.fatherName,
        mother_name: formData.motherName,
        dob: formData.dob,
        gender: formData.gender,
        mobile: formData.mobile,
        email: formData.email,
        address: formData.address,
        id_number: formData.idNumber,
        course: formData.course,
        branch: formData.branch,
        tenth_board: formData.tenthBoard,
        tenth_year: formData.tenthYear,
        tenth_percent: formData.tenthPercent,
        twelve_board: formData.twelveBoard,
        twelve_year: formData.twelveYear,
        twelve_percent: formData.twelvePercent,
      })
      
      setSubmitted(true)
    } catch (err) {
      console.error('Error submitting form:', err)
      setError("Failed to submit form. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="mx-auto max-w-lg text-center">
          <CardContent className="py-12">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
            <h2 className="mb-2 text-2xl font-bold text-foreground">Application Submitted!</h2>
            <p className="mb-6 text-muted-foreground">
              Thank you for your interest in Ashwini Computer Center. We will contact you shortly to complete the
              admission process.
            </p>
            <Button onClick={() => setSubmitted(false)}>Submit Another Application</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="mx-auto max-w-4xl">
        <CardHeader className="border-b bg-muted">
          <CardTitle className="text-center text-2xl">Admission Form</CardTitle>
          <p className="text-center text-sm text-muted-foreground">ISO 9001:2015 Certified | Reg. No: BJ/DRW/___</p>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Course & Branch Selection */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="course">Select Course *</Label>
                <Select
                  value={formData.course}
                  onValueChange={(value) => setFormData({ ...formData, course: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a course" />
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
              <div className="space-y-2">
                <Label htmlFor="branch">Select Branch *</Label>
                <Select
                  value={formData.branch}
                  onValueChange={(value) => setFormData({ ...formData, branch: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Personal Information */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground border-b pb-2">Personal Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fatherName">{"Father's Name *"}</Label>
                  <Input
                    id="fatherName"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    placeholder="Enter father's name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motherName">{"Mother's Name *"}</Label>
                  <Input
                    id="motherName"
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    placeholder="Enter mother's name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData({ ...formData, gender: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number (Aadhar/Voter ID)</Label>
                  <Input
                    id="idNumber"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                    placeholder="Enter ID number"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter your complete address"
                    rows={3}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Educational Qualification */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground border-b pb-2">Educational Qualification</h3>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="font-medium text-muted-foreground">Examination</div>
                  <div className="font-medium text-muted-foreground">Board/University</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium text-muted-foreground">Year</div>
                    <div className="font-medium text-muted-foreground">% Marks</div>
                  </div>
                </div>

                {/* 10th */}
                <div className="grid gap-4 sm:grid-cols-3 items-center">
                  <div className="text-foreground">10th / Matric</div>
                  <Input
                    value={formData.tenthBoard}
                    onChange={(e) => setFormData({ ...formData, tenthBoard: e.target.value })}
                    placeholder="Board name"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={formData.tenthYear}
                      onChange={(e) => setFormData({ ...formData, tenthYear: e.target.value })}
                      placeholder="Year"
                    />
                    <Input
                      value={formData.tenthPercent}
                      onChange={(e) => setFormData({ ...formData, tenthPercent: e.target.value })}
                      placeholder="%"
                    />
                  </div>
                </div>

                {/* 12th */}
                <div className="grid gap-4 sm:grid-cols-3 items-center">
                  <div className="text-foreground">12th / Intermediate</div>
                  <Input
                    value={formData.twelveBoard}
                    onChange={(e) => setFormData({ ...formData, twelveBoard: e.target.value })}
                    placeholder="Board name"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={formData.twelveYear}
                      onChange={(e) => setFormData({ ...formData, twelveYear: e.target.value })}
                      placeholder="Year"
                    />
                    <Input
                      value={formData.twelvePercent}
                      onChange={(e) => setFormData({ ...formData, twelvePercent: e.target.value })}
                      placeholder="%"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Declaration */}
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="declaration"
                  checked={formData.declaration}
                  onCheckedChange={(checked) => setFormData({ ...formData, declaration: checked as boolean })}
                  required
                />
                <Label htmlFor="declaration" className="text-sm leading-relaxed">
                  I hereby declare that the above information is true to the best of my knowledge and belief. I agree to
                  abide by the rules and regulations of ASHWINI COMPUTER CENTER.
                </Label>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={!formData.declaration || loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
