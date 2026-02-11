'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { getProjectById, getProjects } from '@/lib/storage'
import type { Project } from '@/lib/storage'

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const [project, setProject] = useState<Project | undefined>()
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([])
  const [id, setId] = useState<string>('')

  useEffect(() => {
    params.then(p => {
      setId(p.id)
      const foundProject = getProjectById(p.id)
      setProject(foundProject)
      
      if (foundProject) {
        const related = getProjects()
          .filter(proj => proj.category === foundProject.category && proj.id !== foundProject.id)
          .slice(0, 3)
        setRelatedProjects(related)
      }
    })
  }, [params])

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Project not found</h1>
            <p className="mt-2 text-muted-foreground">The project you're looking for doesn't exist.</p>
            <Button asChild className="mt-4">
              <Link href="/portfolio">Back to Portfolio</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Back Button */}
        <div className="border-b border-border px-4 py-4 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Button asChild variant="ghost" className="gap-2">
              <Link href="/portfolio">
                <ArrowLeft className="h-4 w-4" />
                Back to Portfolio
              </Link>
            </Button>
          </div>
        </div>

        {/* Project Content */}
        <section className="px-4 py-12 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Title and Meta */}
            <div className="mb-8">
              <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                {project.category}
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                {project.description}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Created on {new Date(project.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* Project Images */}
            <div className="space-y-6">
              {project.images.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg bg-muted">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="h-auto w-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-12 rounded-lg border border-border bg-secondary/30 p-8">
              <h3 className="text-2xl font-bold mb-4">Interested in Similar Work?</h3>
              <p className="text-muted-foreground mb-6">
                Let's discuss how we can create an amazing design for your project. Contact us to get started.
              </p>
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact">Start a Project</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="border-t border-border px-4 py-16 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-3xl font-bold tracking-tight mb-8">
                Similar Projects
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((relatedProject) => (
                  <Link key={relatedProject.id} href={`/portfolio/${relatedProject.id}`}>
                    <Card className="group overflow-hidden transition-all hover:shadow-lg h-full">
                      <div className="aspect-square overflow-hidden bg-muted">
                        <img
                          src={relatedProject.images[0] || "/placeholder.svg"}
                          alt={relatedProject.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          {relatedProject.category}
                        </div>
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {relatedProject.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {relatedProject.description}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
