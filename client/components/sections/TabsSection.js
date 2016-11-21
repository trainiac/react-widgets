/* eslint-disable no-console */

import React from 'react'
import Tabs from '../tabs/Tabs'
import Tab from '../tabs/Tab'
import WidgetSection from './WidgetSection'

const handleTabDidClose = tabId => console.log(`${tabId} did close`)
const handleTabWillClose = tabId => console.log(`${tabId} will close`)
const handleTabDidOpen = tabId => console.log(`${tabId} did open`)
const handleTabWillOpen = tabId => console.log(`${tabId} will open`)

export default function TabsSection() {


  return (
    <WidgetSection title='Tabs'>
      <Tabs
        tabWillClose={handleTabWillClose}
        tabWillOpen={handleTabWillOpen}
        tabDidClose={handleTabDidClose}
        tabDidOpen={handleTabDidOpen}
      >
        <Tab
          tabId='a'
          buttonText='Boston'
        >
          Stuff about boston
        </Tab>
        <Tab
          tabId='b'
          buttonText='Paris'
          isDisabled={true}
        >
          Stuff about Paris
        </Tab>
        <Tab
          tabId='c'
          buttonText='Tokyo'
        >
          Stuff about Tokyo
        </Tab>
      </Tabs>
    </WidgetSection>
  )

}
