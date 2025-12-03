import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdmissionForm } from "@/components/admission-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admission Form - ACC Computer Center | Ashwini Computer Centre",
  description:
    "Enroll in ACC Computer Center (Ashwini Computer Centre) - Best computer training institute in Deoghar. Fill admission form for Basic Computer, Tally, DTP, Typing courses. ISO certified institute.",
  keywords: [
    "ACC computer admission",
    "ACC computer center admission form",
    "Ashwini Computer Centre admission",
    "computer course admission Deoghar",
    "ACC admission form",
  ],
  openGraph: {
    title: "Admission Form - ACC Computer Center | Ashwini Computer Centre",
    description: "Enroll in ACC Computer Center - Best computer training institute in Deoghar. Fill admission form now!",
  },
}

export default function AdmissionPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold md:text-4xl">ACC Computer Center - Student Admission Form</h1>
          <p className="mt-2 text-primary-foreground/80">Fill out the form below to enroll in ACC Computer Center (Ashwini Computer Centre) courses</p>
        </div>
      </div>
      <AdmissionForm />
      <Footer />
    </main>
  )
}
