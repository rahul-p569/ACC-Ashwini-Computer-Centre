import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, Users, Award, Clock } from "lucide-react"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-blue-900 py-12 md:py-20 text-primary-foreground">
      <div className="absolute inset-0 bg-[url('/computer-lab-students-learning.jpg')] opacity-10 bg-cover bg-center" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 md:mb-4 inline-block rounded-full bg-accent px-3 md:px-4 py-1 text-xs md:text-sm font-semibold text-accent-foreground">
            A National IT Development Organization
          </div>
          <h1 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
            ACC Computer Center - <span className="text-accent">Ashwini Computer Centre</span> | Best Computer Training Institute
          </h1>
          <p className="mb-6 md:mb-8 text-sm md:text-lg text-primary-foreground/80 text-pretty px-2">
            Welcome to ACC Computer Center (Ashwini Computer Centre) - Your trusted partner for quality computer education in Deoghar, Jharkhand. 
            Join ACC Computer Center and unlock your potential in the digital world. We offer ISO certified courses in
            computer basics, typing, programming, Tally, DTP, and more.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center px-4 sm:px-0">
            <Link href="/admission" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 text-base md:text-lg px-6 md:px-8"
              >
                Enroll Now
              </Button>
            </Link>
            <Link href="/exam-form" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white/10 text-base md:text-lg px-6 md:px-8 bg-transparent"
              >
                Exam Form
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-10 md:mt-16 grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-4">
          {[
            { icon: GraduationCap, label: "500+ Students", desc: "Trained" },
            { icon: Users, label: "Expert", desc: "Faculty" },
            { icon: Award, label: "ISO Certified", desc: "Organization" },
            { icon: Clock, label: "Flexible", desc: "Batch Timing" },
          ].map((stat, i) => (
            <div key={i} className="rounded-xl bg-white/10 p-3 md:p-4 text-center backdrop-blur-sm">
              <stat.icon className="mx-auto mb-1 md:mb-2 h-6 w-6 md:h-8 md:w-8 text-accent" />
              <div className="font-bold text-sm md:text-base">{stat.label}</div>
              <div className="text-xs md:text-sm text-primary-foreground/70">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
