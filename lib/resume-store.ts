// A tiny external store for the resume document, synced to localStorage.
//
// We deliberately avoid `useEffect` + `setState` for loading/saving: this is a
// static export with no server-known user data, so the resume is genuinely an
// external system (the browser's localStorage) rather than derived state.
// `useSyncExternalStore` is the mechanism React recommends for that — it also
// keeps server and first-paint client markup identical (both use the sample
// resume as the server snapshot), avoiding hydration mismatches.
import { useSyncExternalStore } from 'react'
import { SAMPLE_RESUME, STORAGE_KEY, type ResumeData } from './resume'

type Listener = () => void

let cache: ResumeData | null = null
const listeners = new Set<Listener>()

function readFromStorage(): ResumeData {
  if (typeof window === 'undefined') return SAMPLE_RESUME
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as ResumeData) : SAMPLE_RESUME
  } catch {
    // Corrupt JSON or storage disabled (e.g. private browsing quota) — fall back to the sample.
    return SAMPLE_RESUME
  }
}

function getSnapshot(): ResumeData {
  if (cache === null) cache = readFromStorage()
  return cache
}

function getServerSnapshot(): ResumeData {
  return SAMPLE_RESUME
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function commit(next: ResumeData) {
  cache = next
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Best-effort persistence; editing still works for the rest of the session.
  }
  for (const listener of listeners) listener()
}

export function setResumeData(updater: ResumeData | ((prev: ResumeData) => ResumeData)) {
  const prev = getSnapshot()
  const next = typeof updater === 'function' ? (updater as (p: ResumeData) => ResumeData)(prev) : updater
  commit(next)
}

export function useResumeData(): ResumeData {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
