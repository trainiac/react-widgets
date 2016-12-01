/* eslint-disable no-console */

import React from 'react'
import Tabs from 'components/tabs'
import Tab from 'components/tabs/tab'

const handleTabDidClose = tabId => console.log(`${tabId} did close`)
const handleTabWillClose = tabId => console.log(`${tabId} will close`)
const handleTabDidOpen = tabId => console.log(`${tabId} did open`)
const handleTabWillOpen = tabId => console.log(`${tabId} will open`)

export default function TabsSection() {

  return (
    <div>
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
    </div>
  )

}
