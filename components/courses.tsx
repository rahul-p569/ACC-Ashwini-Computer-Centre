import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, BookOpen, Monitor, FileText, Globe, Keyboard, Award, Users, School, ClipboardCheck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const courses = [
  {
    id: "dca",
    name: "DCA",
    fullName: "Diploma in Computer Applications",
    description: "Comprehensive diploma course covering fundamental computer applications, MS Office, and basic programming concepts.",
    icon: GraduationCap,
    color: "bg-blue-500",
  },
  {
    id: "tally",
    name: "Tally",
    fullName: "Tally Prime with GST",
    description: "Master Tally accounting software with GST implementation. Learn financial accounting, inventory management, and taxation.",
    icon: FileText,
    color: "bg-green-500",
  },
  {
    id: "dtp",
    name: "DTP",
    fullName: "Desktop Publishing",
    description: "Learn graphic design and desktop publishing using industry-standard software for creating professional layouts and designs.",
    icon: Monitor,
    color: "bg-purple-500",
  },
  {
    id: "dfa",
    name: "DFA",
    fullName: "Diploma in Financial Accounting",
    description: "Advanced course in financial accounting principles, bookkeeping, and financial statement preparation.",
    icon: FileText,
    color: "bg-emerald-500",
  },
  {
    id: "adca",
    name: "ADCA",
    fullName: "Advanced Diploma in Computer Applications",
    description: "Advanced level course covering advanced computer applications, programming, database management, and software development.",
    icon: GraduationCap,
    color: "bg-indigo-500",
  },
  {
    id: "ccc",
    name: "CCC",
    fullName: "Course on Computer Concepts",
    description: "NIELIT certified course covering basic computer concepts, internet, email, and digital literacy essentials.",
    icon: BookOpen,
    color: "bg-orange-500",
  },
  {
    id: "internet-scanning",
    name: "Internet & Scanning",
    fullName: "Internet & Scanning",
    description: "Learn internet browsing, email management, online tools, and document scanning techniques.",
    icon: Globe,
    color: "bg-cyan-500",
  },
  {
    id: "typing",
    name: "English & Hindi Typing",
    fullName: "English & Hindi Typing",
    description: "Master typing skills in both English and Hindi. Improve speed and accuracy for professional typing requirements.",
    icon: Keyboard,
    color: "bg-pink-500",
  },
  {
    id: "govt-exam",
    name: "Online Govt. Exam Practice",
    fullName: "Online Government Exam Practice",
    description: "Practice for various government exams with online mock tests, previous year papers, and exam preparation guidance.",
    icon: ClipboardCheck,
    color: "bg-red-500",
  },
  {
    id: "html",
    name: "HTML",
    fullName: "HTML Web Development",
    description: "Learn HTML fundamentals for web development. Create and structure web pages using HTML5 standards.",
    icon: Monitor,
    color: "bg-teal-500",
  },
  {
    id: "school-level",
    name: "School Level Courses",
    fullName: "School Level Computer Courses",
    description: "Specialized computer courses designed for school students to enhance their digital skills and academic performance.",
    icon: School,
    color: "bg-yellow-500",
  },
  {
    id: "test-facilities",
    name: "Test Facilities",
    fullName: "Test & Practice Facilities",
    description: "Access to computer lab facilities for practice tests, mock exams, and hands-on training sessions.",
    icon: Award,
    color: "bg-rose-500",
  },
]

export function Courses() {
  return (
    <section id="courses" className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-12 text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8 md:h-10 md:w-10 text-primary mr-2" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Our <span className="text-primary">Courses</span>
            </h2>
          </div>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground px-2">
            ACC Computer Center (Ashwini Computer Centre) offers a wide range of computer courses designed to enhance your skills 
            and career prospects. All courses are ISO 9001:2015 certified and recognized by government authorities.
          </p>
        </div>

        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const IconComponent = course.icon
            return (
              <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className={`${course.color} rounded-lg p-3 text-white`}>
                      <IconComponent className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                      {course.name}
                    </span>
                  </div>
                  <CardTitle className="text-lg md:text-xl font-bold text-foreground">
                    {course.fullName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {course.description}
                  </p>
                  <Link href="/admission">
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Enroll Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-6 md:p-8 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-base md:text-lg font-semibold text-foreground">
              Ready to start your journey with ACC Computer Center?
            </p>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
              Join hundreds of successful students who have enhanced their careers through our quality computer education programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/admission">
                <Button size="lg" className="w-full sm:w-auto">
                  Apply for Admission
                </Button>
              </Link>
              <Link href="/exam-form">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Exam Registration
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

