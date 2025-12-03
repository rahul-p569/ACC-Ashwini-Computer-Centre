"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit2, Trash2 } from "lucide-react"

const initialCourses = [
  { id: 1, title: "Basic Computer Course", duration: "3 Months", fee: 3000, students: 150 },
  { id: 2, title: "Advanced Computer Course", duration: "6 Months", fee: 6000, students: 100 },
  { id: 3, title: "Typing Course (Hindi & English)", duration: "2 Months", fee: 2000, students: 200 },
  { id: 4, title: "Tally Prime with GST", duration: "3 Months", fee: 5000, students: 80 },
  { id: 5, title: "DTP & Graphic Design", duration: "4 Months", fee: 7000, students: 60 },
  { id: 6, title: "Web Development Basics", duration: "6 Months", fee: 10000, students: 40 },
]

export function CourseManager() {
  const [courses, setCourses] = useState(initialCourses)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<(typeof initialCourses)[0] | null>(null)
  const [formData, setFormData] = useState({ title: "", duration: "", fee: "" })

  const handleSave = () => {
    if (editingCourse) {
      setCourses(
        courses.map((c) =>
          c.id === editingCourse.id
            ? { ...c, title: formData.title, duration: formData.duration, fee: Number(formData.fee) }
            : c,
        ),
      )
    } else {
      setCourses([
        ...courses,
        {
          id: Date.now(),
          title: formData.title,
          duration: formData.duration,
          fee: Number(formData.fee),
          students: 0,
        },
      ])
    }
    setDialogOpen(false)
    setEditingCourse(null)
    setFormData({ title: "", duration: "", fee: "" })
  }

  const handleEdit = (course: (typeof initialCourses)[0]) => {
    setEditingCourse(course)
    setFormData({ title: course.title, duration: course.duration, fee: String(course.fee) })
    setDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setCourses(courses.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Course Manager</h2>
          <p className="text-muted-foreground">Add and manage available courses</p>
        </div>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open)
            if (!open) {
              setEditingCourse(null)
              setFormData({ title: "", duration: "", fee: "" })
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Course
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Course Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter course title"
                />
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 3 Months"
                />
              </div>
              <div className="space-y-2">
                <Label>Fee (₹)</Label>
                <Input
                  type="number"
                  value={formData.fee}
                  onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                  placeholder="Enter course fee"
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                {editingCourse ? "Update Course" : "Add Course"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="text-foreground">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fee:</span>
                  <span className="font-bold text-primary">₹{course.fee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Students:</span>
                  <span className="text-foreground">{course.students}+</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => handleEdit(course)}
                >
                  <Edit2 className="h-3 w-3 mr-1" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(course.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
