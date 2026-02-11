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

const PROJECTS_KEY = 'purple-swans-projects'
const CONTACTS_KEY = 'purple-swans-contacts'

// Sample projects for initial state
const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Summer Festival Flyer',
    category: 'Flyers',
    description: 'Vibrant and eye-catching flyer design for a summer music festival. Features bold typography and bright color palette.',
    images: ['/placeholder.jpg'],
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Modern Brand Identity',
    category: 'Branding',
    description: 'Complete brand identity package including logo, color palette, and brand guidelines for a tech startup.',
    images: ['/placeholder.jpg'],
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Corporate Brochure',
    category: 'Brochures',
    description: 'Professional tri-fold brochure design for a consulting firm. Clean layout with premium finishing touches.',
    images: ['/placeholder.jpg'],
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Movie Poster Design',
    category: 'Posters',
    description: 'Dramatic movie poster with striking imagery and innovative typography. Suitable for theater and digital promotion.',
    images: ['/placeholder.jpg'],
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Event Promotional Flyer',
    category: 'Flyers',
    description: 'Modern event flyer design with clear hierarchy and engaging visual elements.',
    images: ['/placeholder.jpg'],
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Restaurant Branding',
    category: 'Branding',
    description: 'Complete restaurant brand design including logo, menu design, and business cards.',
    images: ['/placeholder.jpg'],
    featured: false,
    createdAt: new Date().toISOString(),
  },
]

export function getProjects(): Project[] {
  if (typeof window === 'undefined') return SAMPLE_PROJECTS
  
  const stored = localStorage.getItem(PROJECTS_KEY)
  if (!stored) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(SAMPLE_PROJECTS))
    return SAMPLE_PROJECTS
  }
  
  try {
    return JSON.parse(stored)
  } catch {
    return SAMPLE_PROJECTS
  }
}

export function getProjectById(id: string): Project | undefined {
  return getProjects().find(p => p.id === id)
}

export function getProjectsByCategory(category: string): Project[] {
  return getProjects().filter(p => p.category === category)
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter(p => p.featured).slice(0, 3)
}

export function getCategories(): string[] {
  const projects = getProjects()
  return Array.from(new Set(projects.map(p => p.category)))
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

export function getContactSubmissions(): ContactSubmission[] {
  if (typeof window === 'undefined') return []
  
  const stored = localStorage.getItem(CONTACTS_KEY)
  if (!stored) return []
  
  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}
