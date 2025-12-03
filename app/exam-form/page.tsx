import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ExamForm } from "@/components/exam-form"

export const metadata = {
  title: "Exam Form - Ashwini Computer Center",
  description: "Fill your exam registration form for Ashwini Computer Center",
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
