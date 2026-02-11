'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { getFeaturedProjects } from '@/lib/storage'
import type { Project } from '@/lib/storage'

export default function Home() {
  const featured: Project[] = getFeaturedProjects()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/30 px-4 py-12 sm:py-20 lg:px-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
    <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse-slow delay-1000" />
    <div className="absolute top-1/4 left-1/3 h-64 w-64 rounded-full bg-accent/5 blur-2xl animate-float-slow" />
  </div>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          </div>
          <div className="mx-auto max-w-7xl relative z-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="flex flex-col justify-center animate-slideInLeft">
                <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Creative Design
              <br className="hidden sm:block" />
              <span className="text-primary">That Elevates</span>
            </h1>
                <p className="text-balance mt-6 text-lg text-muted-foreground">
                  I craft bold identities, scroll-stopping social graphics, packaging, flyers & more — designed to make your business unforgettable.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button asChild size="lg" className="gap-2 transition-all duration-300 hover:shadow-lg hover:scale-105">
                    <Link href="/portfolio">
                      View Portfolio
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="transition-all duration-300 hover:shadow-lg bg-transparent">
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative animate-slideInRight">
                <div className="aspect-square overflow-hidden rounded-2xl bg-muted shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-105">
                  <img
                    src="/IMG_2445.JPG.jpeg"
                    alt="Angella Newumbe"
                    className="h-full w-full "
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
<section className="relative px-4 py-8 sm:py-8 lg:py-12 lg:px-8 overflow-hidden bg-gradient-to-b from-background to-background/80">
  {/* Optional subtle background accent – ties to hero style */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-pulse-slow" />
    <div className="absolute bottom-0 left-20 h-64 w-64 rounded-full bg-accent/5 blur-2xl animate-float-slow" />
  </div>

  <div className="mx-auto max-w-7xl relative z-10">
    <div className="text-center mb-12 animate-slideUp">
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
        Featured Work
      </h2>
      <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
        A selection of recent projects — from bold branding to scroll-stopping graphics and everything in between.
      </p>
    </div>

    <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
      {featured.map((project, index) => (
        <div
          key={project.id}
          className="animate-slideUp"
          style={{ animationDelay: `${index * 0.12}s` }}
        >
          <Link href={`/portfolio/${project.id}`} className="block h-full group">
            <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-b from-card to-card/80 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 h-full flex flex-col">
              {/* Image / Mockup area – better aspect for design work */}
              <div className="relative overflow-hidden aspect-[4/3] md:aspect-[5/4] bg-muted/50">
                <img
                  src={project.images[0] || "/placeholder.svg?height=600&width=800"}
                  alt={project.title}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover overlay with quick info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="text-white">
                    <div className="inline-block rounded-full bg-primary/90 px-3 py-1 text-xs font-medium mb-2">
                      {project.category}
                    </div>
                    <p className="text-sm line-clamp-2 opacity-90">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors duration-300 mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
                  {project.description}
                </p>   
              </div>
            </Card>
          </Link>
        </div>
      ))}
    </div>

    <div className="mt-16 flex justify-center">
      <Button
        asChild
        size="lg"
        variant="default"
        className="gap-2 text-base px-8 transition-all duration-300 hover:shadow-xl hover:scale-105"
      >
        <Link href="/portfolio">
          View All Projects
          <ArrowRight className="h-5 w-5" />
        </Link>
      </Button>
    </div>
  </div>
</section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground px-4 py-16 sm:py-24 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-white blur-3xl" />
          </div>
          <div className="mx-auto max-w-4xl text-center relative z-10 animate-slideUp">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Start Your Project?
            </h2>
            <p className="mt-6 text-lg opacity-90">
              Let's collaborate and create something extraordinary together. Get in touch with us today to discuss your design needs.
            </p>
            <div className="mt-8">
              <Button asChild variant="secondary" size="lg" className="transition-all duration-300 hover:shadow-xl hover:scale-105">
                <Link href="/contact">Contact Us Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
