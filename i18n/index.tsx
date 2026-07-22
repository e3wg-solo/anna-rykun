'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { en } from './en'
import type { Dict } from './en'
import { it } from './it'
import { ar } from './ar'

export type LangCode = 'en' | 'it' | 'ar'

export const DICTS: Record<LangCode, Dict> = { en, it, ar }

export const LANGS: { code: LangCode; label: string; short: string }[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ar', label: 'العربية', short: 'ع' },
  { code: 'it', label: 'Italiano', short: 'IT' },
]

interface I18nValue {
  lang: LangCode
  dir: 'ltr' | 'rtl'
  t: Dict
  setLang: (l: LangCode) => void
}

const I18nContext = createContext<I18nValue | null>(null)
const STORAGE_KEY = 'anna-rykun-lang'

function detectInitial(): LangCode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as LangCode | null
    if (saved && saved in DICTS) return saved
    const nav = navigator.language?.slice(0, 2).toLowerCase()
    if (nav === 'ar') return 'ar'
    if (nav === 'it') return 'it'
  } catch {
    /* ignore */
  }
  return 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Deterministic default so server and first client render match (avoids hydration mismatch).
  const [lang, setLang] = useState<LangCode>('en')
  const t = DICTS[lang]
  const dir = t.dir

  // Detect saved / browser language only after mount.
  useEffect(() => {
    const detected = detectInitial()
    if (detected !== 'en') setLang(detected)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dir
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang, dir])

  const value = useMemo<I18nValue>(() => ({ lang, dir, t, setLang }), [lang, dir, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
