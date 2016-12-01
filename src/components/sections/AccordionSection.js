/* eslint-disable no-console */

import React from 'react'
import Accordion from 'components/accordion'
import AccordionKey from 'components/accordion/key'
import { styleSheet, css } from 'utils/styles'

const classNames = styleSheet({
  accordion: {
    margin: '0 0 20px 0'
  }
}).get()

const onKeyDidClose = keyId => console.log(`${keyId} did close`)
const onKeyWillClose = keyId => console.log(`${keyId} will close`)
const onKeyDidOpen = keyId => console.log(`${keyId} did open`)
const onKeyWillOpen = keyId => console.log(`${keyId} will open`)

export default function AccordionsSection() {

  return (
    <div>
      <Accordion
        {...css(classNames.accordion)}
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
          isDisabled
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
      <Accordion multiOpen>
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
          isDisabled
        >
          Biltong swine venison boudin tri-tip. Turkey ham hock tenderloin boudin,
          capicola fatback ham brisket rump tongue frankfurter drumstick pork belly.
        </AccordionKey>
        <AccordionKey
          keyText='Third Key'
          keyId='3rd'
          isOpen
        >
          Biltong swine venison boudin tri-tip. Turkey ham hock tenderloin boudin,
          capicola fatback ham brisket rump tongue frankfurter drumstick pork belly.
        </AccordionKey>
      </Accordion>
    </div>
  )

}
