'use client'

import React, { useEffect, useRef, useState } from 'react'

import ui from '@/components/ui/ui.module.css'

type Project = {
  title: string
  text: string
  pct: number
  raised: string
  goal: string
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [inView])

  return { ref, inView }
}

function useProgress(target: number, active: boolean, delayMs: number, durationMs = 1200) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setValue(target)
      return
    }

    let raf = 0
    let startAt = 0
    const timeout = window.setTimeout(() => {
      startAt = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - startAt) / durationMs)
        setValue(target * easeOutCubic(t))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delayMs)

    return () => {
      window.clearTimeout(timeout)
      cancelAnimationFrame(raf)
    }
  }, [active, target, delayMs, durationMs])

  return value
}

function ProjectCard({ item, index, active }: { item: Project; index: number; active: boolean }) {
  const progress = useProgress(item.pct, active, index * 120)
  const displayPct = Math.round(progress)

  return (
    <article className="card">
      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
      <p style={{ color: 'var(--color-text-muted)', fontSize: 15 }}>{item.text}</p>
      <div className={ui.progressTrack}>
        <div className={ui.progressFill} style={{ width: `${progress}%` }} />
      </div>
      <div className={ui.progressMeta}>
        <span>
          <strong>{displayPct}%</strong> · Собрано: {item.raised}
        </span>
        <span>Цель: {item.goal}</span>
      </div>
    </article>
  )
}

export function CharityProjects({ projects }: { projects: readonly Project[] }) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div className="grid-3" ref={ref}>
      {projects.map((item, index) => (
        <ProjectCard active={inView} index={index} item={item} key={item.title} />
      ))}
    </div>
  )
}
