/* eslint-disable no-console */

import React from 'react'
import Accordion from '../accordion/Accordion'
import AccordionKey from '../accordion/AccordionKey'
import WidgetSection from './WidgetSection'
import { girdle } from '../../utils/index'

const styles = girdle({
  accordion: {
    margin: '0 0 20px 0'
  }
})

const onKeyDidClose = keyId => console.log(`${keyId} did close`)
const onKeyWillClose = keyId => console.log(`${keyId} will close`)
const onKeyDidOpen = keyId => console.log(`${keyId} did open`)
const onKeyWillOpen = keyId => console.log(`${keyId} will open`)

export default function TabsSection() {

  return (
    <WidgetSection title='Accordions'>

      <Accordion
        {...styles.accordion()}
        keyDidClose={onKeyDidClose}
        keyWillClose={onKeyWillClose}
        keyDidOpen={onKeyDidOpen}
        keyWillOpen={onKeyWillOpen}
      >
        <AccordionKey
          keyText='First Key'
          keyId='1st'
        >
          Biltong swine venison boudin tri-tip. Turkey ham hock tenderloin boudin,
          capicola fatback ham brisket rump tongue frankfurter drumstick pork belly.
        </AccordionKey>
        <AccordionKey
          keyText='Second Key'
          keyId='2nd'
          isDisabled={true}
        >
          Biltong swine venison boudin tri-tip. Turkey ham hock tenderloin boudin,
          capicola fatback ham brisket rump tongue frankfurter drumstick pork belly.
        </AccordionKey>
        <AccordionKey
          keyText='Third Key'
          keyId='3rd'
        >
          Biltong swine venison boudin tri-tip. Turkey ham hock tenderloin boudin,
          capicola fatback ham brisket rump tongue frankfurter drumstick pork belly.
        </AccordionKey>
      </Accordion>
      <Accordion multiOpen={true}>
        <AccordionKey
          keyText='First Key'
          keyId='1st'
          height={300}
        >
          Biltong swine venison boudin tri-tip. Turkey ham hock tenderloin boudin,
          capicola fatback ham brisket rump tongue frankfurter drumstick pork belly.
        </AccordionKey>
        <AccordionKey
          keyText='Second Key'
          keyId='2nd'
          isDisabled={true}
        >
          Biltong swine venison boudin tri-tip. Turkey ham hock tenderloin boudin,
          capicola fatback ham brisket rump tongue frankfurter drumstick pork belly.
        </AccordionKey>
        <AccordionKey
          keyText='Third Key'
          keyId='3rd'
          isOpen={true}
        >
          Biltong swine venison boudin tri-tip. Turkey ham hock tenderloin boudin,
          capicola fatback ham brisket rump tongue frankfurter drumstick pork belly.
        </AccordionKey>
      </Accordion>
    </WidgetSection>
  )

}
