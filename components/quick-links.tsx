import Link from "next/link"
import { FileText, ImageIcon, Award, HelpCircle, Users, ClipboardList } from "lucide-react"

const links = [
  { icon: FileText, label: "Admission", href: "/admission", color: "bg-green-500" },
  { icon: ClipboardList, label: "Exam Form", href: "/exam-form", color: "bg-blue-500" },
  { icon: ImageIcon, label: "Gallery", href: "#gallery", color: "bg-pink-500" },
  { icon: Award, label: "Certificates", href: "#", color: "bg-orange-500" },
  { icon: HelpCircle, label: "Help Desk", href: "#contact", color: "bg-red-500" },
  { icon: Users, label: "Our Team", href: "#about", color: "bg-teal-500" },
]

export function QuickLinks() {
  return (
    <section className="py-8 md:py-12 bg-muted">
      <div className="container mx-auto px-3 md:px-4">
        <div className="grid grid-cols-3 gap-2 md:gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="group flex flex-col items-center rounded-lg md:rounded-xl bg-card p-2 md:p-4 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div
                className={`${link.color} mb-2 md:mb-3 rounded-full p-2 md:p-3 text-white transition-transform group-hover:scale-110`}
              >
                <link.icon className="h-4 w-4 md:h-6 md:w-6" />
              </div>
              <span className="text-xs md:text-sm font-medium text-card-foreground text-center">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
