import React from 'react'

import { Slider } from 'components/slider'

const handleOnChange = e => {

  console.log(e.state.value)

}

export default function SliderDemo() {

  return (
    <div>
      <Slider value={50}/>
      <br/>
      <br/>
      <br/>
      <Slider
        isRange
        minValue={50}
        maxValue={75}
      />
      <br/>
      <br/>
      <br/>
      <Slider
        value={20}
        showLabel
        onChange={handleOnChange}
      />
    </div>
  )

}
