'use client'

import { useState, type ReactNode } from 'react'
import {
  Briefcase,
  FolderGit2,
  GraduationCap,
  Plus,
  Printer,
  RotateCcw,
  SlidersHorizontal,
  Tags,
  UserRound,
  X,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import {
  ACCENT_COLORS,
  FONT_FAMILIES,
  SAMPLE_RESUME,
  THEME_MODES,
  createId,
  type AccentColor,
  type Education,
  type Experience,
  type FontFamily,
  type Project,
  type ResumeData,
  type ThemeMode,
} from '@/lib/resume'
import { setResumeData, useResumeData } from '@/lib/resume-store'

const FONT_CLASS: Record<FontFamily, string> = {
  serif: 'font-serif',
  sans: 'font-sans',
  mono: 'font-mono',
}

export default function ResumeForgePage() {
  const data = useResumeData()
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor')
  const [theme, setTheme] = useState<ThemeMode>('modern')
  const [accent, setAccent] = useState<AccentColor>('oxblood')
  const [font, setFont] = useState<FontFamily>('serif')
  const [skillInput, setSkillInput] = useState('')

  const accentHex = ACCENT_COLORS[accent]
  const fontClass = FONT_CLASS[font]

  const updatePersonal = (field: keyof ResumeData['personal'], value: string) => {
    setResumeData((prev) => ({ ...prev, personal: { ...prev.personal, [field]: value } }))
  }

  const addExperience = () => {
    const newItem: Experience = {
      id: createId(),
      company: 'Company Name',
      role: 'Role Title',
      location: 'City, State',
      startDate: '2023',
      endDate: 'Present',
      current: true,
      description: 'Describe key responsibilities, leadership, and quantitative achievements.',
    }
    setResumeData((prev) => ({ ...prev, experience: [newItem, ...prev.experience] }))
  }

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((it) => (it.id === id ? { ...it, [field]: value } : it)),
    }))
  }

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({ ...prev, experience: prev.experience.filter((it) => it.id !== id) }))
  }

  const addEducation = () => {
    const newItem: Education = {
      id: createId(),
      institution: 'University / College',
      degree: 'Degree',
      field: 'Field of Study',
      graduationYear: '2024',
    }
    setResumeData((prev) => ({ ...prev, education: [...prev.education, newItem] }))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((it) => (it.id === id ? { ...it, [field]: value } : it)),
    }))
  }

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({ ...prev, education: prev.education.filter((it) => it.id !== id) }))
  }

  const addProject = () => {
    const newItem: Project = {
      id: createId(),
      name: 'Project Name',
      link: 'github.com/user/project',
      description: 'Brief overview of technical challenge and outcome.',
      tech: 'Technologies used',
    }
    setResumeData((prev) => ({ ...prev, projects: [...prev.projects, newItem] }))
  }

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((it) => (it.id === id ? { ...it, [field]: value } : it)),
    }))
  }

  const removeProject = (id: string) => {
    setResumeData((prev) => ({ ...prev, projects: prev.projects.filter((it) => it.id !== id) }))
  }

  const addSkill = () => {
    const trimmed = skillInput.trim()
    if (!trimmed || data.skills.includes(trimmed)) return
    setResumeData((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }))
    setSkillInput('')
  }

  const removeSkill = (skill: string) => {
    setResumeData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }))
  }

  const handlePrint = () => window.print()

  const resetSample = () => {
    if (confirm('Reset all fields back to the sample resume? This cannot be undone.')) {
      setResumeData(SAMPLE_RESUME)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <SiteHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onReset={resetSample}
        onPrint={handlePrint}
      />

      <main className="mx-auto flex w-full max-w-[1680px] flex-1 flex-col lg:flex-row">
        <EditorPane
          hidden={activeTab === 'preview'}
          data={data}
          theme={theme}
          accent={accent}
          font={font}
          skillInput={skillInput}
          onThemeChange={setTheme}
          onAccentChange={setAccent}
          onFontChange={setFont}
          onSkillInputChange={setSkillInput}
          onUpdatePersonal={updatePersonal}
          onAddExperience={addExperience}
          onUpdateExperience={updateExperience}
          onRemoveExperience={removeExperience}
          onAddEducation={addEducation}
          onUpdateEducation={updateEducation}
          onRemoveEducation={removeEducation}
          onAddProject={addProject}
          onUpdateProject={updateProject}
          onRemoveProject={removeProject}
          onAddSkill={addSkill}
          onRemoveSkill={removeSkill}
        />

        <PreviewPane hidden={activeTab === 'editor'} data={data} theme={theme} accentHex={accentHex} fontClass={fontClass} />
      </main>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

function SiteHeader({
  activeTab,
  onTabChange,
  onReset,
  onPrint,
}: {
  activeTab: 'editor' | 'preview'
  onTabChange: (tab: 'editor' | 'preview') => void
  onReset: () => void
  onPrint: () => void
}) {
  return (
    <header className="no-print sticky top-0 z-30 border-b border-rule bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[1680px] items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <div className="flex items-center gap-3">
          <Logo size={30} className="shrink-0 text-accent" />
          <div className="leading-tight">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              No. 001 &middot; Composed Locally
            </p>
            <h1 className="font-serif text-xl font-semibold tracking-tight text-ink">ResumeForge</h1>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Switch between editing and preview"
          className="flex items-center gap-0.5 rounded-full border border-rule bg-paper-raised p-1 lg:hidden"
        >
          {(['editor', 'preview'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => onTabChange(tab)}
              className={`h-9 rounded-full px-4 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                activeTab === tab ? 'bg-accent text-paper-raised' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {tab === 'editor' ? 'Edit' : 'Preview'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-11 items-center gap-1.5 rounded-sm border border-rule px-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft transition-colors hover:border-ink hover:text-ink"
          >
            <RotateCcw size={14} aria-hidden />
            <span className="hidden sm:inline">Reset Starter</span>
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex h-11 items-center gap-1.5 rounded-sm bg-accent px-4 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-paper-raised shadow-sm transition-colors hover:bg-accent-dark"
          >
            <Printer size={14} aria-hidden />
            Export PDF
          </button>
        </div>
      </div>
    </header>
  )
}

// ---------------------------------------------------------------------------
// Editor pane
// ---------------------------------------------------------------------------

interface EditorPaneProps {
  hidden: boolean
  data: ResumeData
  theme: ThemeMode
  accent: AccentColor
  font: FontFamily
  skillInput: string
  onThemeChange: (t: ThemeMode) => void
  onAccentChange: (a: AccentColor) => void
  onFontChange: (f: FontFamily) => void
  onSkillInputChange: (v: string) => void
  onUpdatePersonal: (field: keyof ResumeData['personal'], value: string) => void
  onAddExperience: () => void
  onUpdateExperience: (id: string, field: keyof Experience, value: string | boolean) => void
  onRemoveExperience: (id: string) => void
  onAddEducation: () => void
  onUpdateEducation: (id: string, field: keyof Education, value: string) => void
  onRemoveEducation: (id: string) => void
  onAddProject: () => void
  onUpdateProject: (id: string, field: keyof Project, value: string) => void
  onRemoveProject: (id: string) => void
  onAddSkill: () => void
  onRemoveSkill: (skill: string) => void
}

function EditorPane(props: EditorPaneProps) {
  const { hidden, data } = props

  return (
    <section
      className={`no-print w-full shrink-0 border-r border-rule bg-paper lg:block lg:w-[440px] xl:w-[500px] ${
        hidden ? 'hidden' : 'block'
      }`}
    >
      <div className="space-y-6 px-4 py-6 sm:px-8 sm:py-8">
        <SettingsCard
          theme={props.theme}
          accent={props.accent}
          font={props.font}
          onThemeChange={props.onThemeChange}
          onAccentChange={props.onAccentChange}
          onFontChange={props.onFontChange}
        />

        <EditorCard icon={UserRound} title="Personal Details" index="01">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <Field className="col-span-2 sm:col-span-1" label="Full name">
              <TextInput value={data.personal.fullName} onChange={(v) => props.onUpdatePersonal('fullName', v)} />
            </Field>
            <Field className="col-span-2 sm:col-span-1" label="Professional title">
              <TextInput value={data.personal.title} onChange={(v) => props.onUpdatePersonal('title', v)} />
            </Field>
            <Field label="Email">
              <TextInput type="email" value={data.personal.email} onChange={(v) => props.onUpdatePersonal('email', v)} />
            </Field>
            <Field label="Phone">
              <TextInput value={data.personal.phone} onChange={(v) => props.onUpdatePersonal('phone', v)} />
            </Field>
            <Field label="Location">
              <TextInput value={data.personal.location} onChange={(v) => props.onUpdatePersonal('location', v)} />
            </Field>
            <Field label="Website / portfolio">
              <TextInput value={data.personal.website} onChange={(v) => props.onUpdatePersonal('website', v)} />
            </Field>
            <Field className="col-span-2" label="LinkedIn profile">
              <TextInput value={data.personal.linkedin} onChange={(v) => props.onUpdatePersonal('linkedin', v)} />
            </Field>
            <Field className="col-span-2" label="Professional summary">
              <TextArea
                rows={4}
                value={data.personal.summary}
                onChange={(v) => props.onUpdatePersonal('summary', v)}
              />
            </Field>
          </div>
        </EditorCard>

        <EditorCard icon={Briefcase} title="Experience" index="02" onAdd={props.onAddExperience} addLabel="Add position">
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <RecordCard key={exp.id} onRemove={() => props.onRemoveExperience(exp.id)} removeLabel={`Remove ${exp.role || 'position'} at ${exp.company || 'company'}`}>
                <div className="grid grid-cols-2 gap-3">
                  <TextInput placeholder="Company" value={exp.company} onChange={(v) => props.onUpdateExperience(exp.id, 'company', v)} />
                  <TextInput placeholder="Role" value={exp.role} onChange={(v) => props.onUpdateExperience(exp.id, 'role', v)} />
                  <TextInput placeholder="Location" value={exp.location} onChange={(v) => props.onUpdateExperience(exp.id, 'location', v)} />
                  <div className="flex gap-2">
                    <TextInput placeholder="Start" value={exp.startDate} onChange={(v) => props.onUpdateExperience(exp.id, 'startDate', v)} />
                    <TextInput placeholder="End" value={exp.endDate} onChange={(v) => props.onUpdateExperience(exp.id, 'endDate', v)} />
                  </div>
                </div>
                <TextArea
                  rows={3}
                  placeholder="Achievements & description"
                  value={exp.description}
                  onChange={(v) => props.onUpdateExperience(exp.id, 'description', v)}
                />
              </RecordCard>
            ))}
            {data.experience.length === 0 && <EmptyHint text="No positions yet — add your most recent role first." />}
          </div>
        </EditorCard>

        <EditorCard icon={GraduationCap} title="Education" index="03" onAdd={props.onAddEducation} addLabel="Add education">
          <div className="space-y-4">
            {data.education.map((edu) => (
              <RecordCard key={edu.id} onRemove={() => props.onRemoveEducation(edu.id)} removeLabel={`Remove ${edu.institution || 'education entry'}`}>
                <TextInput placeholder="Institution" value={edu.institution} onChange={(v) => props.onUpdateEducation(edu.id, 'institution', v)} />
                <div className="grid grid-cols-2 gap-3">
                  <TextInput placeholder="Degree" value={edu.degree} onChange={(v) => props.onUpdateEducation(edu.id, 'degree', v)} />
                  <TextInput placeholder="Field of study" value={edu.field} onChange={(v) => props.onUpdateEducation(edu.id, 'field', v)} />
                  <TextInput placeholder="Graduation year" value={edu.graduationYear} onChange={(v) => props.onUpdateEducation(edu.id, 'graduationYear', v)} />
                  <TextInput placeholder="Grade (optional)" value={edu.grade ?? ''} onChange={(v) => props.onUpdateEducation(edu.id, 'grade', v)} />
                </div>
              </RecordCard>
            ))}
            {data.education.length === 0 && <EmptyHint text="No education entries yet." />}
          </div>
        </EditorCard>

        <EditorCard icon={Tags} title="Skills" index="04">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              props.onAddSkill()
            }}
          >
            <TextInput
              placeholder="Add a skill (e.g. Next.js)"
              value={props.skillInput}
              onChange={props.onSkillInputChange}
            />
            <button
              type="submit"
              className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-sm border border-ink px-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink transition-colors hover:bg-ink hover:text-paper-raised"
            >
              <Plus size={14} aria-hidden />
              Add
            </button>
          </form>
          <div className="flex flex-wrap gap-2 pt-3">
            {data.skills.map((s) => (
              <span
                key={s}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-rule bg-paper-raised pl-3 pr-1.5 font-mono text-xs text-ink-soft"
              >
                {s}
                <button
                  type="button"
                  onClick={() => props.onRemoveSkill(s)}
                  aria-label={`Remove ${s} skill`}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-accent-soft hover:text-accent"
                >
                  <X size={13} aria-hidden />
                </button>
              </span>
            ))}
            {data.skills.length === 0 && <EmptyHint text="No skills listed yet." />}
          </div>
        </EditorCard>

        <EditorCard icon={FolderGit2} title="Projects" index="05" onAdd={props.onAddProject} addLabel="Add project">
          <div className="space-y-4">
            {data.projects.map((prj) => (
              <RecordCard key={prj.id} onRemove={() => props.onRemoveProject(prj.id)} removeLabel={`Remove ${prj.name || 'project'}`}>
                <div className="grid grid-cols-2 gap-3">
                  <TextInput placeholder="Project name" value={prj.name} onChange={(v) => props.onUpdateProject(prj.id, 'name', v)} />
                  <TextInput placeholder="Link / URL" value={prj.link} onChange={(v) => props.onUpdateProject(prj.id, 'link', v)} />
                </div>
                <TextArea
                  rows={2}
                  placeholder="Description & impact"
                  value={prj.description}
                  onChange={(v) => props.onUpdateProject(prj.id, 'description', v)}
                />
                <TextInput placeholder="Technologies used" value={prj.tech} onChange={(v) => props.onUpdateProject(prj.id, 'tech', v)} />
              </RecordCard>
            ))}
            {data.projects.length === 0 && <EmptyHint text="No projects yet." />}
          </div>
        </EditorCard>
      </div>
    </section>
  )
}

function SettingsCard({
  theme,
  accent,
  font,
  onThemeChange,
  onAccentChange,
  onFontChange,
}: {
  theme: ThemeMode
  accent: AccentColor
  font: FontFamily
  onThemeChange: (t: ThemeMode) => void
  onAccentChange: (a: AccentColor) => void
  onFontChange: (f: FontFamily) => void
}) {
  return (
    <EditorCard icon={SlidersHorizontal} title="Press Settings" index="00">
      <div className="space-y-4">
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">Composition</p>
          <div className="grid grid-cols-3 gap-2">
            {THEME_MODES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onThemeChange(t.id)}
                aria-pressed={theme === t.id}
                className={`h-11 rounded-sm border font-mono text-[11px] uppercase tracking-[0.06em] transition-colors ${
                  theme === t.id
                    ? 'border-ink bg-ink text-paper-raised'
                    : 'border-rule text-ink-soft hover:border-ink hover:text-ink'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">Ink</p>
            <div className="flex items-center gap-2">
              {(Object.keys(ACCENT_COLORS) as AccentColor[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onAccentChange(c)}
                  aria-label={`${c} ink`}
                  aria-pressed={accent === c}
                  className="flex h-11 w-11 items-center justify-center"
                >
                  <span
                    className={`block h-5 w-5 rounded-full border-2 transition-transform ${
                      accent === c ? 'scale-110 border-ink' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: ACCENT_COLORS[c] }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">Typeface</p>
            <div className="flex items-center gap-1 rounded-sm border border-rule p-1">
              {FONT_FAMILIES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => onFontChange(f.id)}
                  aria-pressed={font === f.id}
                  className={`h-9 rounded-sm px-2.5 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors ${
                    font === f.id ? 'bg-ink text-paper-raised' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </EditorCard>
  )
}

// ---------------------------------------------------------------------------
// Shared editor primitives
// ---------------------------------------------------------------------------

function EditorCard({
  icon: Icon,
  title,
  index,
  onAdd,
  addLabel,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  index: string
  onAdd?: () => void
  addLabel?: string
  children: ReactNode
}) {
  return (
    <div className="border border-rule bg-paper-raised p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between border-b border-rule pb-3">
        <div className="flex items-center gap-2">
          <Icon size={15} className="text-accent" />
          <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          {onAdd && (
            <button
              type="button"
              onClick={onAdd}
              className="inline-flex h-11 items-center gap-1 rounded-sm px-2 font-mono text-[11px] uppercase tracking-[0.06em] text-accent transition-colors hover:text-accent-dark"
            >
              <Plus size={14} aria-hidden />
              {addLabel ?? 'Add'}
            </button>
          )}
          <span className="font-mono text-[10px] text-ink-faint">{index}</span>
        </div>
      </div>
      {children}
    </div>
  )
}

function RecordCard({
  onRemove,
  removeLabel,
  children,
}: {
  onRemove: () => void
  removeLabel: string
  children: ReactNode
}) {
  return (
    <div className="relative space-y-2 border border-rule bg-paper p-3 pr-11">
      <button
        type="button"
        onClick={onRemove}
        aria-label={removeLabel}
        className="absolute right-1 top-1 flex h-9 w-9 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-accent-soft hover:text-accent"
      >
        <X size={15} aria-hidden />
      </button>
      {children}
    </div>
  )
}

function Field({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <label className={`block ${className ?? ''}`}>
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">{label}</span>
      {children}
    </label>
  )
}

function TextInput({
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="min-h-11 w-full border-b border-rule bg-transparent px-0.5 py-2 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent"
    />
  )
}

function TextArea({
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  rows?: number
  placeholder?: string
}) {
  return (
    <textarea
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full resize-none border-b border-rule bg-transparent px-0.5 py-2 text-sm leading-relaxed text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent"
    />
  )
}

function EmptyHint({ text }: { text: string }) {
  return <p className="font-mono text-xs italic text-ink-faint">{text}</p>
}

// ---------------------------------------------------------------------------
// Preview pane — the printed page
// ---------------------------------------------------------------------------

function PreviewPane({
  hidden,
  data,
  theme,
  accentHex,
  fontClass,
}: {
  hidden: boolean
  data: ResumeData
  theme: ThemeMode
  accentHex: string
  fontClass: string
}) {
  return (
    <section
      className={`flex-1 bg-paper-dim px-4 py-8 sm:px-10 sm:py-12 lg:py-16 ${hidden ? 'hidden lg:flex' : 'flex'} justify-center`}
    >
      <div className="w-full max-w-[780px]">
        <p className="no-print mb-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
          Live proof &middot; US Letter proportion
        </p>
        <article
          className={`print-area paper-grain relative mx-auto w-full border border-rule bg-paper-raised shadow-page ${fontClass}`}
          style={{ aspectRatio: '8.5 / 11' }}
        >
          <div className="h-full overflow-y-auto px-8 py-10 sm:px-12 sm:py-14">
            <ResumeHeader data={data} theme={theme} accentHex={accentHex} />

            {data.personal.summary && (
              <ResumeSection index="01" label="Summary" accentHex={accentHex}>
                <p className="text-[13px] leading-relaxed text-ink-soft">{data.personal.summary}</p>
              </ResumeSection>
            )}

            {data.experience.length > 0 && (
              <ResumeSection index="02" label="Experience" accentHex={accentHex}>
                <div className="space-y-4">
                  {data.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                        <span className="text-[13px] font-semibold text-ink">
                          {exp.role || 'Role'}
                          <span className="font-normal text-ink-faint"> &middot; {exp.company || 'Company'}</span>
                        </span>
                        <span className="font-mono text-[11px] text-ink-faint">
                          {exp.startDate}&ndash;{exp.endDate}
                          {exp.location ? ` &middot; ${exp.location}` : ''}
                        </span>
                      </div>
                      <p className="mt-0.5 whitespace-pre-line text-[13px] leading-relaxed text-ink-soft">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </ResumeSection>
            )}

            {data.projects.length > 0 && (
              <ResumeSection index="03" label="Projects" accentHex={accentHex}>
                <div className="space-y-3">
                  {data.projects.map((prj) => (
                    <div key={prj.id}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <span className="text-[13px] font-semibold text-ink">{prj.name || 'Project'}</span>
                        {prj.link && <span className="font-mono text-[11px] text-ink-faint">{prj.link}</span>}
                      </div>
                      <p className="text-[13px] leading-relaxed text-ink-soft">{prj.description}</p>
                      {prj.tech && (
                        <p className="mt-0.5 font-mono text-[11px] text-ink-faint">Stack &middot; {prj.tech}</p>
                      )}
                    </div>
                  ))}
                </div>
              </ResumeSection>
            )}

            {data.education.length > 0 && (
              <ResumeSection index="04" label="Education" accentHex={accentHex}>
                <div className="space-y-2">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="flex flex-wrap items-baseline justify-between gap-x-3 text-[13px]">
                      <span>
                        <span className="font-semibold text-ink">{edu.institution || 'Institution'}</span>
                        <span className="text-ink-soft">
                          {' '}
                          &mdash; {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                        </span>
                      </span>
                      <span className="font-mono text-[11px] text-ink-faint">
                        {edu.graduationYear} {edu.grade ? `(${edu.grade})` : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </ResumeSection>
            )}

            {data.skills.length > 0 && (
              <ResumeSection index="05" label="Skills" accentHex={accentHex} last>
                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {data.skills.map((s, i) => (
                    <span key={s} className="text-[12px] text-ink-soft">
                      {s}
                      {i < data.skills.length - 1 && <span className="ml-3 text-ink-faint">&middot;</span>}
                    </span>
                  ))}
                </div>
              </ResumeSection>
            )}
          </div>
        </article>
      </div>
    </section>
  )
}

function ResumeHeader({ data, theme, accentHex }: { data: ResumeData; theme: ThemeMode; accentHex: string }) {
  return (
    <div className="mb-6">
      <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: accentHex }}>
        Curriculum Vitae
      </p>
      <h1 className="font-serif text-[32px] font-semibold leading-none tracking-tight text-ink">
        {data.personal.fullName || 'Your Name'}
      </h1>
      <p className="mt-2 text-[15px] text-ink-soft">{data.personal.title}</p>

      <div className="mt-4" style={{ borderBottom: '2px solid var(--color-ink)' }} />
      <div className="mb-3 mt-[3px]" style={{ borderBottom: '1px solid var(--color-rule-strong)' }} />

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-ink-soft">
        {data.personal.email && <span>{data.personal.email}</span>}
        {data.personal.phone && <span>{data.personal.phone}</span>}
        {data.personal.location && <span>{data.personal.location}</span>}
        {data.personal.website && <span>{data.personal.website}</span>}
        {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
      </div>
      {theme === 'executive' && (
        <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint">
          Prepared for confidential circulation
        </p>
      )}
    </div>
  )
}

function ResumeSection({
  index,
  label,
  accentHex,
  children,
  last,
}: {
  index: string
  label: string
  accentHex: string
  children: ReactNode
  last?: boolean
}) {
  return (
    <div className={last ? '' : 'mb-6'}>
      <div className="mb-2.5 flex items-center gap-2.5">
        <span aria-hidden className="h-[7px] w-[7px]" style={{ backgroundColor: accentHex }} />
        <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-ink">{label}</h2>
        <span aria-hidden className="h-px flex-1" style={{ backgroundColor: 'var(--color-rule)' }} />
        <span aria-hidden className="font-mono text-[10px] text-ink-faint">
          {index}
        </span>
      </div>
      {children}
    </div>
  )
}
