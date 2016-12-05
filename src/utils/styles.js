import * as aphrodite from 'aphrodite/no-important'

export const css = aphrodite.css

export const styleSheet = (styles) => {

  const chain = styles =>

    ({
      add: newStyles => chain({
        ...styles,
        ...aphrodite.StyleSheet.create(newStyles)
      }),
      get: () => styles
    })


  return chain({}).add(styles)

}
