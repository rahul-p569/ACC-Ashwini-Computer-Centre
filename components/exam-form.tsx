"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ClipboardList, Loader2 } from "lucide-react"
import { createExamSubmission } from "@/lib/database"

export function ExamForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    try {
      const formData = new FormData(e.target as HTMLFormElement)
      
      await createExamSubmission({
        branch: formData.get("branch") as string,
        course: formData.get("course") as string,
        reg_no: formData.get("regNo") as string,
        duration: formData.get("duration") as string,
        admission_date: formData.get("admissionDate") as string,
        fees: formData.get("fees") as string,
        paid: formData.get("paid") as string,
        dues: formData.get("dues") as string,
        name: formData.get("name") as string,
        father_name: formData.get("fatherName") as string,
        mother_name: formData.get("motherName") as string,
        dob: formData.get("dob") as string,
        gender: formData.get("gender") as string,
        mobile: formData.get("mobile") as string,
        email: formData.get("email") as string || undefined,
        address: formData.get("address") as string,
        id_number: formData.get("idNumber") as string,
        place: formData.get("place") as string,
        date: formData.get("date") as string,
        tenth_subject: formData.get("tenth_subject") as string,
        tenth_board: formData.get("tenth_board") as string,
        tenth_year: formData.get("tenth_year") as string,
        tenth_percent: formData.get("tenth_percent") as string,
        inter_subject: formData.get("inter_subject") as string,
        inter_board: formData.get("inter_board") as string,
        inter_year: formData.get("inter_year") as string,
        inter_percent: formData.get("inter_percent") as string,
        degree_subject: formData.get("degree_subject") as string,
        degree_board: formData.get("degree_board") as string,
        degree_year: formData.get("degree_year") as string,
        degree_percent: formData.get("degree_percent") as string,
        other_subject: formData.get("other_subject") as string,
        other_board: formData.get("other_board") as string,
        other_year: formData.get("other_year") as string,
        other_percent: formData.get("other_percent") as string,
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
      <section className="py-8 md:py-16 bg-muted min-h-screen">
        <div className="container mx-auto px-3 md:px-4">
          <div className="mx-auto max-w-md">
            <Card className="shadow-xl text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClipboardList className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Exam Form Submitted!</h2>
                <p className="text-muted-foreground mb-6">
                  Your exam registration has been submitted successfully. We will contact you shortly.
                </p>
                <Button onClick={() => setSubmitted(false)}>Submit Another Form</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 md:py-16 bg-muted min-h-screen">
      <div className="container mx-auto px-3 md:px-4">
        <div className="mx-auto max-w-4xl">
          <Card className="shadow-xl">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3">
                <ClipboardList className="h-6 w-6 md:h-8 md:w-8 flex-shrink-0" />
                <div>
                  <CardTitle className="text-lg md:text-2xl">Exam Registration Form</CardTitle>
                  <p className="text-primary-foreground/80 text-xs md:text-sm mt-1">
                    Ashwini Computer Center - ISO 9001:2015 Certified
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                  <div>
                    <Label htmlFor="branch">Branch</Label>
                    <Select name="branch">
                      <SelectTrigger id="branch">
                        <SelectValue placeholder="Select Branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="deoghar">Chitra More, Deoghar</SelectItem>
                        <SelectItem value="fatehpur">Bagdaha More, Fatehpur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="course">Course</Label>
                    <Select name="course">
                      <SelectTrigger id="course">
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dca">DCA</SelectItem>
                        <SelectItem value="adca">ADCA</SelectItem>
                        <SelectItem value="tally">Tally</SelectItem>
                        <SelectItem value="typing">Typing</SelectItem>
                        <SelectItem value="ccc">CCC</SelectItem>
                        <SelectItem value="pgdca">PGDCA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="regNo">Reg. No.</Label>
                    <Input id="regNo" name="regNo" placeholder="Registration Number" />
                  </div>
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" name="duration" placeholder="Course Duration" />
                  </div>
                  <div>
                    <Label htmlFor="admissionDate">Date of Admission</Label>
                    <Input id="admissionDate" name="admissionDate" type="date" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  <div>
                    <Label htmlFor="fees" className="text-xs md:text-sm">
                      Fees
                    </Label>
                    <Input id="fees" name="fees" placeholder="Total" className="text-sm" />
                  </div>
                  <div>
                    <Label htmlFor="paid" className="text-xs md:text-sm">
                      Paid
                    </Label>
                    <Input id="paid" name="paid" placeholder="Paid" className="text-sm" />
                  </div>
                  <div>
                    <Label htmlFor="dues" className="text-xs md:text-sm">
                      Dues
                    </Label>
                    <Input id="dues" name="dues" placeholder="Dues" className="text-sm" />
                  </div>
                </div>

                {/* Personal Information */}
                  <div className="border-t pt-6">
                  <h3 className="text-base md:text-lg font-semibold text-primary mb-4">Personal Information</h3>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" placeholder="Full Name" required />
                    </div>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="fatherName">Father's Name</Label>
                        <Input id="fatherName" name="fatherName" placeholder="Father's Name" required />
                      </div>
                      <div>
                        <Label htmlFor="motherName">Mother's Name</Label>
                        <Input id="motherName" name="motherName" placeholder="Mother's Name" required />
                      </div>
                    </div>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input id="dob" name="dob" type="date" required />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select name="gender">
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mt-4">
                    <div>
                      <Label htmlFor="mobile">Mobile No.</Label>
                      <Input id="mobile" name="mobile" type="tel" placeholder="Mobile Number" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="Email Address" />
                    </div>
                  </div>

                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mt-4">
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" name="address" placeholder="Full Address" required />
                    </div>
                    <div>
                      <Label htmlFor="idNumber">ID Number (Aadhar/Voter ID)</Label>
                      <Input id="idNumber" name="idNumber" placeholder="ID Number" />
                    </div>
                  </div>
                </div>

                {/* Educational Qualification Table */}
                <div className="border-t pt-6">
                  <h3 className="text-base md:text-lg font-semibold text-primary mb-4">Educational Qualification</h3>

                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full border-collapse border border-border text-sm">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border p-2 text-left">Examination</th>
                          <th className="border border-border p-2 text-left">Subject</th>
                          <th className="border border-border p-2 text-left">Board/University</th>
                          <th className="border border-border p-2 text-left">Year of Passing</th>
                          <th className="border border-border p-2 text-left">% of Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-2 font-medium">10th</td>
                          <td className="border border-border p-1">
                            <Input className="border-0 h-8" name="tenth_subject" placeholder="Subject" />
                          </td>
                          <td className="border border-border p-1">
                            <Input className="border-0 h-8" name="tenth_board" placeholder="Board/University" />
                          </td>
                          <td className="border border-border p-1">
                            <Input className="border-0 h-8" name="tenth_year" placeholder="Year" />
                          </td>
                          <td className="border border-border p-1">
                            <Input className="border-0 h-8" name="tenth_percent" placeholder="%" />
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-border p-2 font-medium">Intermediate</td>
                          <td className="border border-border p-1">
                            <Input className="border-0 h-8" name="inter_subject" placeholder="Subject" />
                          </td>
                          <td className="border border-border p-1">
                            <Input className="border-0 h-8" name="inter_board" placeholder="Board/University" />
                          </td>
                          <td className="border border-border p-1">
                            <Input className="border-0 h-8" name="inter_year" placeholder="Year" />
                          </td>
                          <td className="border border-border p-1">
                            <Input className="border-0 h-8" name="inter_percent" placeholder="%" />
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-border p-2 font-medium">Degree</td>
                          <td className="border border-border p-1">
                            <Input className="border-0 h-8" name="degree_subject" placeholder="Subject" />
                          </td>
                          <td className="border border-border p-1">
                            <Input className="border-0 h-8" name="degree_board" placeholder="Board/University" />
                          </td>
                          <td className="border border-border p-1">
                            <Input className="border-0 h-8" name="degree_year" placeholder="Year" />
                          </td>
                          <td className="border border-border p-1">
                            <Input className="border-0 h-8" name="degree_percent" placeholder="%" />
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-border p-2 font-medium">Others</td>
                          <td className="border border-border p-1">
                            <Input className="border-0 h-8" name="other_subject" placeholder="Subject" />
                          </td>
                          <td className="border border-border p-1">
                            <Input className="border-0 h-8" name="other_board" placeholder="Board/University" />
                          </td>
                          <td className="border border-border p-1">
                            <Input className="border-0 h-8" name="other_year" placeholder="Year" />
                          </td>
                          <td className="border border-border p-1">
                            <Input className="border-0 h-8" name="other_percent" placeholder="%" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="md:hidden space-y-4">
                    <Card className="p-4">
                      <h4 className="font-semibold text-primary mb-3">10th</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs">Subject</Label>
                          <Input name="tenth_subject" placeholder="Subject" className="h-9 text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs">Board/University</Label>
                          <Input name="tenth_board" placeholder="Board" className="h-9 text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs">Year of Passing</Label>
                          <Input name="tenth_year" placeholder="Year" className="h-9 text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs">% of Marks</Label>
                          <Input name="tenth_percent" placeholder="%" className="h-9 text-sm" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold text-primary mb-3">Intermediate</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs">Subject</Label>
                          <Input name="inter_subject" placeholder="Subject" className="h-9 text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs">Board/University</Label>
                          <Input name="inter_board" placeholder="Board" className="h-9 text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs">Year of Passing</Label>
                          <Input name="inter_year" placeholder="Year" className="h-9 text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs">% of Marks</Label>
                          <Input name="inter_percent" placeholder="%" className="h-9 text-sm" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold text-primary mb-3">Degree</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs">Subject</Label>
                          <Input name="degree_subject" placeholder="Subject" className="h-9 text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs">Board/University</Label>
                          <Input name="degree_board" placeholder="Board" className="h-9 text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs">Year of Passing</Label>
                          <Input name="degree_year" placeholder="Year" className="h-9 text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs">% of Marks</Label>
                          <Input name="degree_percent" placeholder="%" className="h-9 text-sm" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold text-primary mb-3">Others</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs">Subject</Label>
                          <Input name="other_subject" placeholder="Subject" className="h-9 text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs">Board/University</Label>
                          <Input name="other_board" placeholder="Board" className="h-9 text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs">Year of Passing</Label>
                          <Input name="other_year" placeholder="Year" className="h-9 text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs">% of Marks</Label>
                          <Input name="other_percent" placeholder="%" className="h-9 text-sm" />
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Declaration */}
                <div className="border-t pt-6">
                  <h3 className="text-base md:text-lg font-semibold text-primary mb-4">Declaration</h3>
                  <div className="flex items-start gap-3 bg-muted/50 p-3 md:p-4 rounded-lg">
                    <Checkbox id="declaration" required className="mt-0.5" />
                    <Label htmlFor="declaration" className="text-xs md:text-sm leading-relaxed cursor-pointer">
                      I hereby declare that the above information is true to the best of my knowledge and belief. I
                      agree to abide by the rules and regulations of ASHWINI COMPUTER CENTER.
                    </Label>
                  </div>

                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mt-4">
                    <div>
                      <Label htmlFor="place">Place</Label>
                      <Input id="place" name="place" placeholder="Place" />
                    </div>
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" name="date" type="date" />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                    {error}
                  </div>
                )}

                <div className="flex justify-center pt-4">
                  <Button type="submit" size="lg" className="w-full sm:w-auto px-8 md:px-12" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Exam Form"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

