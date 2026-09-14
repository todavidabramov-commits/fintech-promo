import React from 'react'

import { Cases } from '@/components/home/Cases'
import { ContactForm } from '@/components/home/ContactForm'
import { Directions } from '@/components/home/Directions'
import { Hero } from '@/components/home/Hero'
import { Partners } from '@/components/home/Partners'
import { Process } from '@/components/home/Process'
import { Stats } from '@/components/home/Stats'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Directions />
      <Stats />
      <Process />
      <Partners />
      <Cases />
      <ContactForm />
    </>
  )
}
