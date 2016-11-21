import React from 'react'
import TabsSection from '../components/sections/TabsSection'
import AccordionsSection from '../components/sections/AccordionsSection'
import ActionMenusSection from '../components/sections/ActionMenusSection'
import InfiniteScrollsSection from '../components/sections/InfiniteScrollsSection'
import SlidersSection from '../components/sections/SlidersSection'
import DatepickersSection from '../components/sections/DatepickersSection'

export default function Root() {

  return (
    <div>
      <AccordionsSection/>
      <ActionMenusSection/>
      <DatepickersSection/>
      <InfiniteScrollsSection/>
      <SlidersSection/>
      <TabsSection/>
    </div>
  )

}
