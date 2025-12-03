"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <div className="bg-accent text-accent-foreground py-1 text-center text-xs md:text-sm px-2">
        <span className="flex items-center justify-center gap-1 md:gap-2">
          <Phone className="h-3 w-3" />
          <span className="truncate">Call: 7903060859 | ISO 9001:2015 Certified</span>
        </span>
      </div>
      <div className="container mx-auto px-3 md:px-4">
        <div className="flex items-center justify-between py-3 md:py-4">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <div className="relative h-14 w-14 md:h-16 md:w-16 flex-shrink-0">
              <Image
                src="/acc-logo.png"
                alt="Ashwini Computer Center Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight">ASHWINI</h1>
              <p className="text-[10px] md:text-xs text-primary-foreground/80">COMPUTER CENTER</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-4 lg:gap-6 md:flex">
            <Link href="/" className="hover:text-accent transition-colors text-sm lg:text-base">
              Home
            </Link>
            <Link href="#about" className="hover:text-accent transition-colors text-sm lg:text-base">
              About
            </Link>
            <Link href="#gallery" className="hover:text-accent transition-colors text-sm lg:text-base">
              Gallery
            </Link>
            <Link href="#contact" className="hover:text-accent transition-colors text-sm lg:text-base">
              Contact
            </Link>
            <Link href="/admission">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90" size="sm">
                Apply Now
              </Button>
            </Link>
          </nav>

          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <nav className="flex flex-col gap-3 pb-4 md:hidden border-t border-primary-foreground/20 pt-3">
            <Link href="/" className="hover:text-accent py-2" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="#about" className="hover:text-accent py-2" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="#gallery" className="hover:text-accent py-2" onClick={() => setIsOpen(false)}>
              Gallery
            </Link>
            <Link href="#contact" className="hover:text-accent py-2" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <Link href="/admission" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-accent text-accent-foreground">Apply Now</Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
