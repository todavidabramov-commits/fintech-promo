'use client'

import React, { useEffect, useRef, useState } from 'react'

import styles from './Stats.module.css'

const STATS = [
  { value: 8, suffix: '+', label: 'Лет успешной работы' },
  { value: 450, suffix: ' млрд ₽', label: 'Объем выданных гарантий' },
  { value: 12, suffix: ' тыс.+', label: 'Доверенных контрагентов' },
  { value: 30, suffix: '+', label: 'Банков-партнеров' },
] as const

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

function useCountUp(target: number, active: boolean, delayMs: number, durationMs = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setValue(target)
      return
    }

    let raf = 0
    const timeout = window.setTimeout(() => {
      const startAt = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - startAt) / durationMs)
        setValue(Math.round(target * easeOutCubic(t)))
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

function StatItem({
  value,
  suffix,
  label,
  index,
  active,
}: {
  value: number
  suffix: string
  label: string
  index: number
  active: boolean
}) {
  const current = useCountUp(value, active, index * 100)

  return (
    <div>
      <div className={styles.value}>
        {current}
        {suffix}
      </div>
      <p className={styles.label}>{label}</p>
    </div>
  )
}

export function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section className="section section--muted">
      <div className="container">
        <div className={`grid-4 ${styles.grid}`} ref={ref}>
          {STATS.map((item, index) => (
            <StatItem
              active={inView}
              index={index}
              key={item.label}
              label={item.label}
              suffix={item.suffix}
              value={item.value}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
