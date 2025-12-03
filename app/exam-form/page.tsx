import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ExamForm } from "@/components/exam-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Exam Form - ACC Computer Center | Ashwini Computer Centre",
  description:
    "Fill your exam registration form for ACC Computer Center (Ashwini Computer Centre). Register for computer course exams at our ISO certified institute in Deoghar.",
  keywords: [
    "ACC computer exam form",
    "ACC computer center exam registration",
    "Ashwini Computer Centre exam form",
    "computer course exam Deoghar",
    "ACC exam registration",
  ],
  openGraph: {
    title: "Exam Form - ACC Computer Center | Ashwini Computer Centre",
    description: "Fill your exam registration form for ACC Computer Center - ISO certified computer training institute.",
  },
}

export default function ExamFormPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ExamForm />
      <Footer />
    </main>
  )
}
