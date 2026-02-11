'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getProjects, getCategories } from '@/lib/storage'
import type { Project } from '@/lib/storage'

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const projects: Project[] = getProjects()
  const categories: string[] = getCategories()

  const filteredProjects = selectedCategory
    ? projects.filter(p => p.category === selectedCategory)
    : projects

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Header Section */}
        <section className="border-b border-border bg-secondary/30 px-4 py-12 sm:py-16 lg:px-8 animate-slideUp">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Our Portfolio
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Browse through our collection of creative design work across multiple categories. Each project showcases our commitment to excellence and innovation.
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="border-b border-border px-4 py-8 lg:px-8 animate-slideUp">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => setSelectedCategory(null)}
                variant={selectedCategory === null ? 'default' : 'outline'}
                className="rounded-full transition-all duration-300"
              >
                All Projects ({projects.length})
              </Button>
              {categories.map((category) => {
                const count = projects.filter(p => p.category === category).length
                return (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className="rounded-full transition-all duration-300"
                  >
                    {category} ({count})
                  </Button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="px-4 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {filteredProjects.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project, index) => (
                  <div key={project.id} style={{ animation: `slideUp 0.6s ease-out ${index * 0.1}s backwards` }}>
                    <Link href={`/portfolio/${project.id}`}>
                      <Card className="group overflow-hidden transition-all hover:shadow-xl hover:scale-105 duration-300 h-full cursor-pointer">
                        <div className="aspect-square overflow-hidden bg-muted">
                          <img
                            src={project.images[0] || "/placeholder.svg"}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-6">
                          <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            {project.category}
                          </div>
                          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                            {project.description}
                          </p>
                        </div>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 animate-fadeIn">
                <p className="text-muted-foreground">
                  No projects found in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
