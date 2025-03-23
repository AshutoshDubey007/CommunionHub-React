import React from 'react'
import Hero from '../Components/Hero'
import CommunionSec from '../Components/CommunionSec'
import SectionOne from '../Components/SectionOne'
import SectionTwo from '../Components/SectionTwo'

export default function Home() {
  return (
    <>
    <div>
        <Hero/>
        <CommunionSec/>
        <div className='max-w-7xl mx-auto mt-10'>
          <h1 className="text-3xl sm:text-4xl md:text-5xl mt-14 sm:mt-16 md:mt-20 text-center font-bold text-gray-900">Moments of Connection We&apos;ve Made</h1>
          <p className="text-gray-600 mt-3 sm:mt-4 mb-8 sm:mb-10 text-lg sm:text-xl text-center max-w-xs sm:max-w-md md:max-w-3xl mx-auto">
            Building bridges between communities by fostering meaningful connections.
          </p>
          <SectionOne/>
          <SectionTwo/>
          <SectionOne/>
        </div>
    </div>
    </>
  )
}
