import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { QuickLinks } from "@/components/quick-links"
import { About } from "@/components/about"
import { Courses } from "@/components/courses"
import { Certificates } from "@/components/certificates"
import { Gallery } from "@/components/gallery"
import { Enquiry } from "@/components/enquiry"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <QuickLinks />
      <About />
      <Courses />
      <Certificates />
      <Gallery />
      <Enquiry />
      <Contact />
      <Footer />
    </main>
  )
}
