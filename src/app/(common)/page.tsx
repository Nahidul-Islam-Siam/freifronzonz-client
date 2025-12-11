import HeroSection from '@/components/pages/home/HeroSection/HeroSection'
import NewEventsSection from '@/components/pages/home/NewEventsSection'
import OurStorySection from '@/components/pages/home/OurStorySection'
import React from 'react'

export default function page() {
  return (
    <div>
      <HeroSection/>
      <OurStorySection/>
      <NewEventsSection/>
    </div>
  )
}
