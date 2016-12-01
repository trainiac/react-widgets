
export const traceFunc = (tag, func) => input => {

  const value = func(input)

  console.log(tag, value)  // eslint-disable-line no-console

  return value

}

export const trace = (value, tag = 'No tag:') => {

  console.log(tag, value)  // eslint-disable-line no-console

  return value

}

