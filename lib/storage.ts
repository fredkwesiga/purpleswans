// Data Models
export interface Project {
  id: string
  title: string
  category: string
  description: string
  images: string[]
  featured: boolean
  createdAt: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  message: string
  submittedAt: string
}

// Storage Keys
const PROJECTS_KEY = 'purple-swans-projects'
const CONTACTS_KEY = 'purple-swans-contacts'

// Sample Projects
const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Modern Brand Identity',
    category: 'Branding',
    description: 'Complete brand identity design including logo, color palette, and typography guidelines for a tech startup.',
    images: ['/placeholder.jpg', '/placeholder.jpg'],
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Product Launch Flyer',
    category: 'Flyers',
    description: 'Eye-catching flyer design for a new product launch event with modern layout and striking visuals.',
    images: ['/placeholder.jpg'],
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Corporate Brochure',
    category: 'Brochures',
    description: 'Professional three-fold brochure design showcasing company services and portfolio.',
    images: ['/placeholder.jpg', '/placeholder.jpg'],
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Concert Poster Design',
    category: 'Posters',
    description: 'Dynamic and vibrant poster design for a music festival featuring bold typography and imagery.',
    images: ['/placeholder.jpg'],
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Digital Marketing Campaign',
    category: 'Marketing',
    description: 'Comprehensive digital marketing materials including social media graphics and web banners.',
    images: ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg'],
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Packaging Design',
    category: 'Packaging',
    description: 'Creative packaging design for luxury product line with sustainable materials focus.',
    images: ['/placeholder.jpg', '/placeholder.jpg'],
    featured: false,
    createdAt: new Date().toISOString(),
  },
]

// Initialize Projects
export function getProjects(): Project[] {
  if (typeof window === 'undefined') return SAMPLE_PROJECTS
  
  const stored = localStorage.getItem(PROJECTS_KEY)
  return stored ? JSON.parse(stored) : SAMPLE_PROJECTS
}

// Get Featured Projects
export function getFeaturedProjects(): Project[] {
  return getProjects().filter(p => p.featured)
}

// Get Categories
export function getCategories(): string[] {
  const projects = getProjects()
  const categories = new Set(projects.map(p => p.category))
  return Array.from(categories).sort()
}

// Get Single Project
export function getProjectById(id: string): Project | undefined {
  return getProjects().find(p => p.id === id)
}

// Add Project
export function addProject(project: Omit<Project, 'id' | 'createdAt'>): Project {
  const newProject: Project = {
    ...project,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  
  const projects = getProjects()
  projects.push(newProject)
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
  
  return newProject
}

// Update Project
export function updateProject(id: string, updates: Partial<Omit<Project, 'id' | 'createdAt'>>): Project | undefined {
  const projects = getProjects()
  const project = projects.find(p => p.id === id)
  
  if (!project) return undefined
  
  const updated = { ...project, ...updates }
  const index = projects.indexOf(project)
  projects[index] = updated
  
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
  return updated
}

// Delete Project
export function deleteProject(id: string): boolean {
  const projects = getProjects()
  const filtered = projects.filter(p => p.id !== id)
  
  if (filtered.length === projects.length) return false
  
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(filtered))
  return true
}

// Contact Submissions
export function getContactSubmissions(): ContactSubmission[] {
  if (typeof window === 'undefined') return []
  
  const stored = localStorage.getItem(CONTACTS_KEY)
  return stored ? JSON.parse(stored) : []
}

export function addContactSubmission(submission: Omit<ContactSubmission, 'id' | 'submittedAt'>): ContactSubmission {
  const newSubmission: ContactSubmission = {
    ...submission,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
  }
  
  const submissions = getContactSubmissions()
  submissions.push(newSubmission)
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(submissions))
  
  return newSubmission
}

export function deleteContactSubmission(id: string): boolean {
  const submissions = getContactSubmissions()
  const filtered = submissions.filter(s => s.id !== id)
  
  if (filtered.length === submissions.length) return false
  
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(filtered))
  return true
}

export function clearAllContacts(): void {
  localStorage.setItem(CONTACTS_KEY, JSON.stringify([]))
}
