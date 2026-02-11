'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/PurpleSwan LOGO.png"
            alt="Purple Swans"
            className="h-20 w-100"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors duration-200 hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/portfolio"
            className="text-sm font-medium transition-colors duration-200 hover:text-primary"
          >
            Portfolio
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium transition-colors duration-200 hover:text-primary"
          >
            Contact
          </Link>
        </div>

        {/* Contact Button */}
        <div className="hidden gap-4 md:flex">
          <Button asChild variant="default">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border md:hidden animate-slideDown">
          <div className="space-y-2 px-4 py-4">
            <Link
              href="/"
              className="block px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/portfolio"
              className="block px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Button asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
