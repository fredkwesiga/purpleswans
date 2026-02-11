'use client'

import Link from 'next/link'
import { Mail, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-graymid/50 text-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/PurpleSwan LOGO-4.png"
                alt="Purple Swans"
                className="h-20 w-120"
              />
            </div>
            <p className="text-sm text-black text-muted-foreground">
              Professional graphic design for creative minds and ambitious businesses.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-black  ">
              <li>
                <Link href="/" className="text-muted-foreground text-black transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-muted-foreground text-black  transition-colors hover:text-primary">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground text-black transition-colors hover:text-primary">
                  Contact
                </Link>
              </li>
              {/* <li>
                <Link href="/admin" className="text-muted-foreground transition-colors hover:text-primary">
                  Admin
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:contact@purpleswans.design"
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 text-black " />
                <span className="text-black">contact@purpleswans.design</span>
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
              >
                <MessageCircle className="h-4 w-4 text-black" />
                <span className="text-black">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <p className="text-center text-sm text-black text-muted-foreground">
            © {new Date().getFullYear()} Purple Swans. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
