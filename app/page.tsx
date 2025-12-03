import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { QuickLinks } from "@/components/quick-links"
import { About } from "@/components/about"
import { Gallery } from "@/components/gallery"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <QuickLinks />
      <About />
      <Gallery />
      <Footer />
    </main>
  )
}
