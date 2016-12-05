
export const traceFunc = (tag, func) => input => {

  const value = func(input)

  console.log(tag, value)  // eslint-disable-line no-console

  return value

}

export const trace = (tag, value) => {

  console.log(tag, value)  // eslint-disable-line no-console

  return value

}

