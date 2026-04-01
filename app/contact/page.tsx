'use client'

import React, { useState } from "react"
import { Mail, MessageCircle, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { addContactSubmission } from '@/lib/storage'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('Failed to send message')
      }

      addContactSubmission({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      })

      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })

      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">

        {/* Header Section with Beams Background */}
        <section className="relative overflow-hidden bg-[#4a1f5f] px-4 py-20 sm:py-28 lg:px-8 min-h-[30vh] flex items-center  animate-slideUp">

          {/* Dark overlay to improve contrast and readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#702c8a]/80 to-[#4a1f5f]/90  z-[-1]" />

          <div className="mx-auto max-w-7xl relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white">
                Get in Touch
              </h1>
              <p className="mt-6 text-xl text-zinc-300 max-w-2xl">
                Have a project in mind? We'd love to hear from you. Reach out and let's create something amazing together.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-4 py-16 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 md:grid-cols-2">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>

                {submitted ? (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                    <Check className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-900">Message Sent!</h3>
                    <p className="mt-2 text-green-700">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full"
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold mb-8">Contact Information</h2>

                <div className="space-y-6">
                  {/* Email Card */}
                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <p className="text-muted-foreground text-sm">
                          contact@purpleswans.design
                        </p>
                        <p className="text-muted-foreground text-sm">
                          We typically respond within 24 hours
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* WhatsApp Card */}
                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <MessageCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">WhatsApp</h3>
                        <a
                          href="https://wa.me/256701772758"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          +256 701 772 758
                        </a>
                        <p className="text-muted-foreground text-sm mt-1">
                          Quick messages and instant replies
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Service Areas Card */}
                  <Card className="p-6">
                    <h3 className="font-semibold mb-3">Services</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        LOGO Design
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        Social Media Design
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        Print & Marketing Design
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        Corporate & Event Designs
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        UI/UX Design
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        Retainer Packages
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        Packaging Design (PER SKU)
                      </li>

                    </ul>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-border bg-secondary/30 px-4 py-16 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight mb-8">
              Frequently Asked Questions
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-2">How long does a project typically take?</h3>
                <p className="text-sm text-muted-foreground">
                  Project timelines vary depending on complexity and scope. Simple designs may take 1-2 weeks, while larger projects can take 4-8 weeks. We'll provide a detailed timeline during our initial consultation.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">What is your revision policy?</h3>
                <p className="text-sm text-muted-foreground">
                  We include unlimited revisions until you're completely satisfied with the final design. Your satisfaction is our top priority.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Do you offer rush services?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes! We offer expedited services for projects with tight deadlines. Please contact us directly to discuss your timeline and pricing.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">What are your payment terms?</h3>
                <p className="text-sm text-muted-foreground">
                  We typically require a 50% deposit to start a project with the balance due upon completion. Flexible payment arrangements are available for larger projects.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
