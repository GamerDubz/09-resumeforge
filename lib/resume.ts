// Domain types and starter content for the resume builder.
// Kept separate from app/page.tsx so the editor UI can stay focused on presentation.

export interface Experience {
  id: string
  company: string
  role: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  graduationYear: string
  grade?: string
}

export interface Project {
  id: string
  name: string
  link: string
  description: string
  tech: string
}

export interface PersonalDetails {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
  summary: string
}

export interface ResumeData {
  personal: PersonalDetails
  experience: Experience[]
  education: Education[]
  skills: string[]
  projects: Project[]
}

export type ThemeMode = 'modern' | 'minimal' | 'executive'
export type AccentColor = 'oxblood' | 'forest' | 'ink' | 'cobalt' | 'ochre' | 'plum'
export type FontFamily = 'serif' | 'sans' | 'mono'

export const THEME_MODES: { id: ThemeMode; label: string }[] = [
  { id: 'modern', label: 'Modern' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'executive', label: 'Executive' },
]

export const ACCENT_COLORS: Record<AccentColor, string> = {
  oxblood: '#7a1f2b',
  forest: '#33503f',
  ink: '#1d1a15',
  cobalt: '#264a63',
  ochre: '#a06a1f',
  plum: '#5b3358',
}

export const FONT_FAMILIES: { id: FontFamily; label: string }[] = [
  { id: 'serif', label: 'Serif' },
  { id: 'sans', label: 'Sans' },
  { id: 'mono', label: 'Mono' },
]

export const STORAGE_KEY = 'resumeforge_data'

export const SAMPLE_RESUME: ResumeData = {
  personal: {
    fullName: 'Alex Vance',
    title: 'Senior Frontend & Product Engineer',
    email: 'alex.vance@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    website: 'alexvance.dev',
    linkedin: 'linkedin.com/in/alexvance',
    summary:
      'Passionate product-minded engineer with 7+ years of experience building modern, responsive, and accessible web applications. Experienced in Next.js, TypeScript, browser graphics, and developer tooling.',
  },
  experience: [
    {
      id: '1',
      company: 'Veloce Labs',
      role: 'Staff Frontend Engineer',
      location: 'San Francisco, CA',
      startDate: '2022',
      endDate: 'Present',
      current: true,
      description:
        'Architected the core design system and high-throughput canvas editor used by over 250,000 monthly active creators. Reduced initial bundle size by 42% through aggressive tree-shaking and dynamic module imports.',
    },
    {
      id: '2',
      company: 'Kinetic Systems',
      role: 'Senior UI Engineer',
      location: 'New York, NY',
      startDate: '2019',
      endDate: '2022',
      current: false,
      description:
        'Led a squad of 6 engineers migrating legacy dashboards to React and TypeScript. Introduced automated accessibility audits achieving 100% WCAG 2.1 AA compliance.',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'B.S.',
      field: 'Computer Science',
      graduationYear: '2019',
      grade: '3.85 GPA',
    },
  ],
  skills: [
    'TypeScript',
    'React',
    'Next.js',
    'Tailwind CSS',
    'Node.js',
    'Web Audio & Canvas',
    'REST & GraphQL APIs',
    'UI/UX Prototyping',
    'Accessibility (WCAG)',
    'Performance Optimization',
  ],
  projects: [
    {
      id: '1',
      name: 'OmniCanvas',
      link: 'github.com/alexvance/omnicanvas',
      description: 'Zero-latency vector graphics sandbox running in WebAssembly and Canvas 2D.',
      tech: 'TypeScript, Canvas API, WASM',
    },
    {
      id: '2',
      name: 'FastDiff CLI',
      link: 'fastdiff.sh',
      description: 'Interactive CLI tool for visualizing visual and AST regression diffs.',
      tech: 'Rust, Node.js',
    },
  ],
}

export function createId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Date.now().toString(36) + Math.random().toString(36).slice(2)
}
