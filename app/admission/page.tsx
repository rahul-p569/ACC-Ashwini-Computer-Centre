import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdmissionForm } from "@/components/admission-form"

export default function AdmissionPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold md:text-4xl">Student Admission Form</h1>
          <p className="mt-2 text-primary-foreground/80">Fill out the form below to enroll in our courses</p>
        </div>
      </div>
      <AdmissionForm />
      <Footer />
    </main>
  )
}
