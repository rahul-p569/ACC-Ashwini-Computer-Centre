import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-14 w-14 flex-shrink-0">
                <Image
                  src="/acc-logo.png"
                  alt="ACC Computer Center - Ashwini Computer Centre Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold">ASHWINI</h3>
                <p className="text-xs text-background/70">COMPUTER CENTER</p>
              </div>
            </div>
            <p className="text-sm text-background/70 leading-relaxed">
              An ISO 9001:2015 Certified Organization providing quality computer education to build a skilled digital
              workforce.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="/" className="hover:text-accent">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#courses" className="hover:text-accent">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-accent">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="hover:text-accent">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/admission" className="hover:text-accent">
                  Admission
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Contact Info</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" /> 7903060859
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" /> info@ashwinicomputer.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                Chitra More, Deoghar, Jharkhand
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-background/10 pt-8 text-center text-sm text-background/50">
          <p>© {new Date().getFullYear()} Ashwini Computer Center. All rights reserved.</p>
          <p className="mt-1">Affiliated with MEGABYTE CORPORATE - A National IT Development Organization</p>
        </div>
      </div>
    </footer>
  )
}
