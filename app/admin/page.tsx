'use client'
import { useEffect, useState } from 'react'
import { Trash2, Edit2, Plus, Mail, Download, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {
  getProjects,
  getCategories,
  addProject,
  updateProject,
  deleteProject,
  getContactSubmissions,
  deleteContactSubmission,
  clearAllContacts,
} from '@/lib/storage'
import type { Project, ContactSubmission } from '@/lib/storage'

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>(getProjects())
  const [contacts, setContacts] = useState<ContactSubmission[]>(getContactSubmissions())
  const categories = getCategories()
  const [editingId, setEditingId] = useState<string | null>(null)

  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    images: ['/placeholder.jpg'] as string[],
    featured: false,
  })

  useEffect(() => {
    setProjects(getProjects())
  }, [])

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      images: ['/placeholder.jpg'],
      featured: false,
    })
    setEditingId(null)
  }

  // Handle edit
  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      images: Array.isArray(project.images) && project.images.length > 0 
        ? project.images 
        : ['/placeholder.jpg'],
      featured: project.featured,
    })
    setEditingId(project.id)
  }

  // Upload images to Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    for (const file of files) {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formDataUpload,
        })

        const data = await res.json()

        if (!res.ok) throw new Error(data.error || 'Upload failed')

        // Add uploaded Cloudinary URL using your existing function
        addImageFieldWithUrl(data.url)
      } catch (error) {
        console.error('Upload error:', error)
        alert(`Failed to upload ${file.name}`)
      }
    }

    setUploading(false)
    e.target.value = '' // Reset file input
  }

  // Helper to add URL using your style
  const addImageFieldWithUrl = (url: string) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, url]
    }))
  }

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.category || !formData.description) {
      alert('Please fill in all required fields')
      return
    }

    // Remove empty image fields
    const cleanedData = {
      ...formData,
      images: formData.images.filter(img => img.trim() !== '' && img !== '/placeholder.jpg'),
    }

    let updated: Project | undefined
    if (editingId) {
      updated = updateProject(editingId, cleanedData)
    } else {
      updated = addProject(cleanedData)
    }

    if (updated) {
      setProjects(getProjects())
      resetForm()
      alert(editingId ? 'Project updated successfully!' : 'Project added successfully!')
    }
  }

  // Handle delete
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      if (deleteProject(id)) {
        setProjects(getProjects())
        alert('Project deleted successfully!')
      }
    }
  }

  // Handle delete contact
  const handleDeleteContact = (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      if (deleteContactSubmission(id)) {
        setContacts(getContactSubmissions())
      }
    }
  }

  // Handle clear all contacts
  const handleClearAllContacts = () => {
    if (confirm('Are you sure you want to delete ALL contacts? This cannot be undone.')) {
      clearAllContacts()
      setContacts([])
    }
  }

  // Add image field (empty)
  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ''],
    })
  }

  // Remove image field
  const removeImageField = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    })
  }

  // Update image field (kept for compatibility)
  const updateImageField = (index: number, value: string) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData({
      ...formData,
      images: newImages,
    })
  }

  // Download functions (unchanged)
  const downloadContacts = () => {
    const dataStr = JSON.stringify(contacts, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `contacts-${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  const downloadContactsCSV = () => {
    const csv = [
      ['Name', 'Email', 'Message', 'Submitted At'],
      ...contacts.map(c => [c.name, c.email, c.message, c.submittedAt]),
    ]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `contacts-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-1 w-12 bg-primary rounded-full"></div>
              <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
            </div>
            <p className="mt-2 text-lg text-muted-foreground">
              Manage your portfolio projects and client inquiries with ease
            </p>
          </div>

          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="projects">Projects ({projects.length})</TabsTrigger>
              <TabsTrigger value="contacts">Inquiries ({contacts.length})</TabsTrigger>
            </TabsList>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-8 mt-8">
              {/* Add/Edit Project Form */}
              <Card className="p-8 border-2 border-border shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-1 w-8 bg-primary rounded-full"></div>
                  <h2 className="text-2xl font-bold">
                    {editingId ? 'Edit Project' : 'Add New Project'}
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Title and Category */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Title *</label>
                      <Input
                        placeholder="e.g., Brand Identity Design"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category *</label>
                      <select
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="">Select a category</option>
                        <option value="Flyers">Flyers</option>
                        <option value="Brochures">Brochures</option>
                        <option value="Branding">Branding</option>
                        <option value="Posters">Posters</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Packaging">Packaging</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <Textarea
                      placeholder="Describe your project..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  {/* Cloudinary Image Upload */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Images</label>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <label className="cursor-pointer">
                        <div className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                          <Upload className="h-5 w-5" />
                          <span>{uploading ? 'Uploading...' : 'Upload Images (Multiple)'}</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          disabled={uploading}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Image Previews */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          {image && image !== '/placeholder.jpg' ? (
                            <img
                              src={image}
                              alt={`Preview ${index}`}
                              className="w-full h-40 object-cover rounded-lg border border-border"
                            />
                          ) : (
                            <div className="w-full h-40 bg-muted rounded-lg border flex items-center justify-center">
                              <span className="text-muted-foreground">No image</span>
                            </div>
                          )}
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
                            onClick={() => removeImageField(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addImageField}
                      className="mt-3"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Empty Image Field
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 rounded border-input"
                    />
                    <label htmlFor="featured" className="text-sm font-medium">
                      Feature on Homepage
                    </label>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="gap-2" disabled={uploading}>
                      <Plus className="h-4 w-4" />
                      {editingId ? 'Update Project' : 'Add Project'}
                    </Button>
                    {editingId && (
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </Card>

              {/* Projects List - unchanged */}
              <div className="mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-8 bg-primary rounded-full"></div>
                  <h3 className="text-lg font-bold">All Projects ({projects.length})</h3>
                </div>
                <div className="space-y-4">
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <Card key={project.id} className="p-4">
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="font-bold text-lg">{project.title}</div>
                              <span className="inline-block rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                                {project.category}
                              </span>
                              {project.featured && (
                                <span className="inline-block rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {project.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {project.images.length} image(s) • Created{' '}
                              {new Date(project.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2 w-full md:w-auto">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(project)}
                              className="gap-2"
                            >
                              <Edit2 className="h-4 w-4" />
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(project.id)}
                              className="gap-2"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="p-8 text-center">
                      <p className="text-muted-foreground">No projects yet. Create your first one!</p>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Contacts Tab - unchanged */}
            <TabsContent value="contacts" className="space-y-8 mt-8">
              {/* ... your existing contacts tab code ... */}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}