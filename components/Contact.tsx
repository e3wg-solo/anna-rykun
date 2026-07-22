'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle, CircleNotch, PaperPlaneTilt } from '@phosphor-icons/react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useI18n } from '../i18n'
import { CONTACT } from '../data/content'
import { EASE } from '../lib/motion'
import { SectionHeading } from './ui/SectionHeading'

type Status = 'idle' | 'sending' | 'sent'

export function Contact() {
  const { t } = useI18n()
  const c = t.contact
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
    if (error) setError(null)
  }

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError(c.errorRequired)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError(c.errorEmail)
      return
    }
    setError(null)
    setStatus('sending')
    const subject = encodeURIComponent(`Portfolio — ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.setTimeout(() => {
      window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`
      setStatus('sent')
    }, 750)
  }

  function reset() {
    setForm({ name: '', email: '', message: '' })
    setStatus('idle')
  }

  const fieldCls =
    'w-full rounded-lg border border-line bg-paper px-4 py-3 text-ink outline-none transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.2,0,0,1)] placeholder:text-ink-faint focus:border-accent focus:ring-4 focus:ring-accent/10'

  return (
    <section id="contact" className="border-t border-line bg-paper-2/50">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28 md:py-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Invitation */}
          <div className="lg:col-span-5">
            <SectionHeading index="08" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

            <div className="mt-10 border-t border-line-strong pt-8">
              <p className="eyebrow mb-3 text-ink-faint">{c.emailDirect}</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="group inline-flex items-center gap-2 font-display text-2xl text-ink transition-colors hover:text-accent sm:text-3xl"
              >
                {CONTACT.email}
                <ArrowUpRight
                  size={22}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:-scale-x-100"
                />
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-line bg-paper p-6 shadow-diffuse sm:p-8 md:p-10">
              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex min-h-[22rem] flex-col items-center justify-center text-center"
                  >
                    <span className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent">
                      <CheckCircle size={34} weight="fill" />
                    </span>
                    <h3 className="font-display text-2xl text-ink sm:text-3xl">{c.sentTitle}</h3>
                    <p className="mt-3 max-w-[42ch] text-pretty text-ink-soft">{c.sentBody}</p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-7 rounded-full border border-line-strong px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                      {c.eyebrow}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    onSubmit={submit}
                    noValidate
                    className="flex flex-col gap-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="flex flex-col gap-2">
                        <span className="eyebrow text-ink-soft">{c.nameLabel}</span>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => update('name', e.target.value)}
                          placeholder={c.namePh}
                          className={fieldCls}
                        />
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className="eyebrow text-ink-soft">{c.emailLabel}</span>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          placeholder={c.emailPh}
                          dir="ltr"
                          className={fieldCls}
                        />
                      </label>
                    </div>

                    <label className="flex flex-col gap-2">
                      <span className="eyebrow text-ink-soft">{c.msgLabel}</span>
                      <textarea
                        value={form.message}
                        onChange={(e) => update('message', e.target.value)}
                        placeholder={c.msgPh}
                        rows={5}
                        className={`${fieldCls} resize-none`}
                      />
                    </label>

                    <AnimatePresence initial={false}>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                          className="text-sm text-accent-deep"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="pressable group mt-1 flex min-h-11 items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream hover:bg-accent disabled:opacity-70"
                    >
                      {status === 'sending' ? (
                        <>
                          <CircleNotch size={17} weight="bold" className="animate-spin" />
                          {c.sending}
                        </>
                      ) : (
                        <>
                          {c.send}
                          <PaperPlaneTilt
                            size={17}
                            weight="bold"
                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 rtl:-scale-x-100"
                          />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
