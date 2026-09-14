'use client'

import { useState, useEffect } from 'react'

interface Experience {
  id: string
  company: string
  role: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  graduationYear: string
  grade?: string
}

interface Project {
  id: string
  name: string
  link: string
  description: string
  tech: string
}

interface ResumeData {
  personal: {
    fullName: string
    title: string
    email: string
    phone: string
    location: string
    website: string
    linkedin: string
    summary: string
  }
  experience: Experience[]
  education: Education[]
  skills: string[]
  projects: Project[]
}

const SAMPLE_RESUME: ResumeData = {
  personal: {
    fullName: 'Alex Vance',
    title: 'Senior Frontend & Product Engineer',
    email: 'alex.vance@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    website: 'https://alexvance.dev',
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

type ThemeMode = 'modern' | 'minimal' | 'executive'
type AccentColor = 'indigo' | 'emerald' | 'cyan' | 'amber' | 'rose' | 'slate'
type FontFamily = 'sans' | 'serif' | 'mono'

export default function ResumeForgePage() {
  const [data, setData] = useState<ResumeData>(SAMPLE_RESUME)
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor')
  const [theme, setTheme] = useState<ThemeMode>('modern')
  const [accent, setAccent] = useState<AccentColor>('indigo')
  const [font, setFont] = useState<FontFamily>('sans')
  const [skillInput, setSkillInput] = useState('')

  // Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('resumeforge_data')
      if (saved) {
        setData(JSON.parse(saved))
      }
    } catch {
      // ignore
    }
  }, [])

  // Auto-save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('resumeforge_data', JSON.stringify(data))
    } catch {
      // ignore
    }
  }, [data])

  const accentHex = {
    indigo: '#4f46e5',
    emerald: '#059669',
    cyan: '#0891b2',
    amber: '#d97706',
    rose: '#e11d48',
    slate: '#334155',
  }[accent]

  const fontClass = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono',
  }[font]

  // Personal updates
  const updatePersonal = (field: keyof ResumeData['personal'], value: string) => {
    setData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }))
  }

  // Experience handlers
  const addExperience = () => {
    const newItem: Experience = {
      id: Date.now().toString(),
      company: 'Company Name',
      role: 'Role Title',
      location: 'City, State',
      startDate: '2023',
      endDate: 'Present',
      current: true,
      description: 'Describe key responsibilities, leadership, and quantitative achievements.',
    }
    setData((prev) => ({ ...prev, experience: [newItem, ...prev.experience] }))
  }

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((it) => (it.id === id ? { ...it, [field]: value } : it)),
    }))
  }

  const removeExperience = (id: string) => {
    setData((prev) => ({ ...prev, experience: prev.experience.filter((it) => it.id !== id) }))
  }

  // Education handlers
  const addEducation = () => {
    const newItem: Education = {
      id: Date.now().toString(),
      institution: 'University / College',
      degree: 'Degree',
      field: 'Field of Study',
      graduationYear: '2024',
    }
    setData((prev) => ({ ...prev, education: [...prev.education, newItem] }))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((it) => (it.id === id ? { ...it, [field]: value } : it)),
    }))
  }

  const removeEducation = (id: string) => {
    setData((prev) => ({ ...prev, education: prev.education.filter((it) => it.id !== id) }))
  }

  // Project handlers
  const addProject = () => {
    const newItem: Project = {
      id: Date.now().toString(),
      name: 'Project Name',
      link: 'github.com/user/project',
      description: 'Brief overview of technical challenge and outcome.',
      tech: 'Technologies used',
    }
    setData((prev) => ({ ...prev, projects: [...prev.projects, newItem] }))
  }

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((it) => (it.id === id ? { ...it, [field]: value } : it)),
    }))
  }

  const removeProject = (id: string) => {
    setData((prev) => ({ ...prev, projects: prev.projects.filter((it) => it.id !== id) }))
  }

  // Skills handlers
  const addSkill = () => {
    const trimmed = skillInput.trim()
    if (!trimmed || data.skills.includes(trimmed)) return
    setData((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }))
    setSkillInput('')
  }

  const removeSkill = (skill: string) => {
    setData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }))
  }

  const handlePrint = () => {
    window.print()
  }

  const resetSample = () => {
    setData(SAMPLE_RESUME)
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-30 px-6 py-3 flex items-center justify-between no-print shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-slate-900 p-0.5 shadow-sm shadow-amber-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.586 7.586" />
                <circle cx="11" cy="11" r="2" />
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-slate-900 leading-none">
                Resume<span className="text-amber-600">Forge</span>
              </h1>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                Editorial CV
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Professional one-page resume architect &amp; PDF exporter</p>
          </div>
        </div>

        {/* Mobile View Toggle */}
        <div className="flex md:hidden bg-neutral-900 border border-neutral-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1 text-xs rounded-md font-medium ${
              activeTab === 'editor' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 text-xs rounded-md font-medium ${
              activeTab === 'preview' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
            }`}
          >
            Preview
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetSample}
            className="text-xs text-neutral-400 hover:text-neutral-200 px-3 py-1.5 rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors"
          >
            Reset Starter
          </button>
          <button
            onClick={handlePrint}
            className="text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-neutral-950 px-4 py-1.5 rounded-lg shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 active:scale-98"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Export / Print PDF
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Editor Panel */}
        <div
          className={`w-full md:w-1/2 lg:w-5/12 border-r border-neutral-800 bg-neutral-900/20 overflow-y-auto p-6 space-y-6 no-print ${
            activeTab === 'preview' ? 'hidden md:block' : 'block'
          }`}
        >
          {/* Styling & Layout Controls */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Design &amp; Theme</h2>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'modern', label: 'Modern' },
                { id: 'minimal', label: 'Minimal' },
                { id: 'executive', label: 'Executive' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as ThemeMode)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                    theme === t.id
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1.5">
                {(['indigo', 'emerald', 'cyan', 'amber', 'rose', 'slate'] as AccentColor[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setAccent(c)}
                    className={`w-5 h-5 rounded-full border transition-all ${
                      accent === c ? 'scale-125 border-white' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: {
                        indigo: '#4f46e5',
                        emerald: '#059669',
                        cyan: '#0891b2',
                        amber: '#d97706',
                        rose: '#e11d48',
                        slate: '#475569',
                      }[c],
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1 bg-neutral-950 border border-neutral-800 rounded-lg p-0.5">
                {(['sans', 'serif', 'mono'] as FontFamily[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFont(f)}
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold transition-all ${
                      font === f ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Personal Details Form */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Personal Details</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 sm:col-span-1">
                <label className="text-[11px] text-neutral-500 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={data.personal.fullName}
                  onChange={(e) => updatePersonal('fullName', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 outline-none focus:border-amber-500"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="text-[11px] text-neutral-500 block mb-1">Professional Title</label>
                <input
                  type="text"
                  value={data.personal.title}
                  onChange={(e) => updatePersonal('title', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-neutral-500 block mb-1">Email</label>
                <input
                  type="email"
                  value={data.personal.email}
                  onChange={(e) => updatePersonal('email', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-neutral-500 block mb-1">Phone</label>
                <input
                  type="text"
                  value={data.personal.phone}
                  onChange={(e) => updatePersonal('phone', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-neutral-500 block mb-1">Location</label>
                <input
                  type="text"
                  value={data.personal.location}
                  onChange={(e) => updatePersonal('location', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-neutral-500 block mb-1">Website / Portfolio</label>
                <input
                  type="text"
                  value={data.personal.website}
                  onChange={(e) => updatePersonal('website', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 outline-none focus:border-amber-500"
                />
              </div>
              <div className="col-span-2">
                <label className="text-[11px] text-neutral-500 block mb-1">LinkedIn Profile</label>
                <input
                  type="text"
                  value={data.personal.linkedin}
                  onChange={(e) => updatePersonal('linkedin', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 outline-none focus:border-amber-500"
                />
              </div>
              <div className="col-span-2">
                <label className="text-[11px] text-neutral-500 block mb-1">Professional Summary</label>
                <textarea
                  rows={3}
                  value={data.personal.summary}
                  onChange={(e) => updatePersonal('summary', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 outline-none focus:border-amber-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Experience</h2>
              <button
                onClick={addExperience}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium"
              >
                + Add Experience
              </button>
            </div>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="bg-neutral-950/80 border border-neutral-850 p-3 rounded-lg space-y-2 relative group">
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="absolute top-2 right-2 text-neutral-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete position"
                  >
                    ×
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-200"
                    />
                    <input
                      type="text"
                      placeholder="Role"
                      value={exp.role}
                      onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                      className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-200"
                    />
                    <input
                      type="text"
                      placeholder="Start (e.g. 2021)"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-200"
                    />
                    <input
                      type="text"
                      placeholder="End (e.g. Present)"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-200"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Achievements & description"
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-1.5 text-xs text-neutral-300 resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Education</h2>
              <button
                onClick={addEducation}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium"
              >
                + Add Education
              </button>
            </div>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="bg-neutral-950/80 border border-neutral-850 p-3 rounded-lg space-y-2 relative group">
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="absolute top-2 right-2 text-neutral-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-200 col-span-2"
                    />
                    <input
                      type="text"
                      placeholder="Degree & Field"
                      value={`${edu.degree} in ${edu.field}`}
                      onChange={(e) => {
                        const parts = e.target.value.split(' in ')
                        updateEducation(edu.id, 'degree', parts[0] || '')
                        updateEducation(edu.id, 'field', parts[1] || '')
                      }}
                      className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-200"
                    />
                    <input
                      type="text"
                      placeholder="Graduation Year"
                      value={edu.graduationYear}
                      onChange={(e) => updateEducation(edu.id, 'graduationYear', e.target.value)}
                      className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Skills</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add skill (e.g. Next.js)..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 outline-none focus:border-amber-500"
              />
              <button
                onClick={addSkill}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-medium rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {data.skills.map((s) => (
                <span
                  key={s}
                  className="bg-neutral-900 text-neutral-300 border border-neutral-800 text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 group"
                >
                  {s}
                  <button
                    onClick={() => removeSkill(s)}
                    className="text-neutral-500 group-hover:text-red-400 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Projects</h2>
              <button
                onClick={addProject}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium"
              >
                + Add Project
              </button>
            </div>
            <div className="space-y-3">
              {data.projects.map((prj) => (
                <div key={prj.id} className="bg-neutral-950/80 border border-neutral-850 p-3 rounded-lg space-y-2 relative group">
                  <button
                    onClick={() => removeProject(prj.id)}
                    className="absolute top-2 right-2 text-neutral-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Project Name"
                      value={prj.name}
                      onChange={(e) => updateProject(prj.id, 'name', e.target.value)}
                      className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-200"
                    />
                    <input
                      type="text"
                      placeholder="Link / URL"
                      value={prj.link}
                      onChange={(e) => updateProject(prj.id, 'link', e.target.value)}
                      className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-200"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Description & Impact"
                    value={prj.description}
                    onChange={(e) => updateProject(prj.id, 'description', e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-1.5 text-xs text-neutral-300 resize-none"
                  />
                  <input
                    type="text"
                    placeholder="Technologies used"
                    value={prj.tech}
                    onChange={(e) => updateProject(prj.id, 'tech', e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-[11px] text-neutral-400"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Resume Paper Preview */}
        <div
          className={`flex-1 bg-neutral-950/80 overflow-y-auto p-6 md:p-10 flex justify-center items-start ${
            activeTab === 'editor' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Paper Container (A4 Proportions) */}
          <div
            className={`print-area w-full max-w-[780px] bg-white text-neutral-900 rounded-xl shadow-2xl overflow-hidden min-h-[1050px] p-10 ${fontClass} border border-neutral-200`}
          >
            {/* Header Section */}
            <div
              className={`pb-6 mb-6 border-b ${
                theme === 'modern' ? 'border-neutral-200' : theme === 'executive' ? 'border-neutral-900' : 'border-neutral-100'
              }`}
            >
              <h1
                className="text-3xl font-bold tracking-tight mb-1"
                style={{ color: theme === 'modern' ? accentHex : '#111827' }}
              >
                {data.personal.fullName || 'Your Name'}
              </h1>
              <p className="text-base font-medium text-neutral-600 mb-3">{data.personal.title}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500">
                {data.personal.email && <span>{data.personal.email}</span>}
                {data.personal.phone && <span>• {data.personal.phone}</span>}
                {data.personal.location && <span>• {data.personal.location}</span>}
                {data.personal.website && (
                  <span>
                    • <a href={`https://${data.personal.website}`} className="underline">{data.personal.website}</a>
                  </span>
                )}
                {data.personal.linkedin && <span>• {data.personal.linkedin}</span>}
              </div>
            </div>

            {/* Summary */}
            {data.personal.summary && (
              <div className="mb-6">
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: accentHex }}
                >
                  Summary
                </h2>
                <p className="text-xs text-neutral-700 leading-relaxed">{data.personal.summary}</p>
              </div>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
              <div className="mb-6">
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-3"
                  style={{ color: accentHex }}
                >
                  Experience
                </h2>
                <div className="space-y-4">
                  {data.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="text-xs font-bold text-neutral-900">
                          {exp.role} <span className="font-normal text-neutral-500">at</span> {exp.company}
                        </span>
                        <span className="text-[11px] text-neutral-500 font-medium">
                          {exp.startDate} – {exp.endDate} {exp.location && `| ${exp.location}`}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-650 leading-relaxed text-neutral-600 whitespace-pre-line">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
              <div className="mb-6">
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-3"
                  style={{ color: accentHex }}
                >
                  Key Projects
                </h2>
                <div className="space-y-3">
                  {data.projects.map((prj) => (
                    <div key={prj.id}>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="text-xs font-bold text-neutral-900">{prj.name}</span>
                        {prj.link && <span className="text-[11px] text-neutral-500 font-mono">{prj.link}</span>}
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed">{prj.description}</p>
                      {prj.tech && (
                        <span className="text-[10px] text-neutral-400 font-mono mt-0.5 block">
                          Stack: {prj.tech}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <div className="mb-6">
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: accentHex }}
                >
                  Education
                </h2>
                <div className="space-y-2">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-baseline text-xs">
                      <div>
                        <span className="font-bold text-neutral-900">{edu.institution}</span>
                        <span className="text-neutral-600"> — {edu.degree} in {edu.field}</span>
                      </div>
                      <span className="text-[11px] text-neutral-500">
                        {edu.graduationYear} {edu.grade && `(${edu.grade})`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
              <div>
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: accentHex }}
                >
                  Skills &amp; Expertise
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {data.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 border border-neutral-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
