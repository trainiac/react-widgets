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
        min={10}
        max={70}
        step={10}
        value={20}
        showLabel
        onChange={handleOnChange}
      />
    </div>
  )

}
