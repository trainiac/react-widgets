import * as aphrodite from 'aphrodite/no-important'

export const css = (...args) =>
   ({
     className: aphrodite.css(...args)
   })

export const styleSheet = (styles) => {

  const chain = styles =>

     ({
       add: newStyles => chain(Object.assign({},
        styles,
        aphrodite.StyleSheet.create(newStyles)
      )),
       get: () => styles
     })


  return chain({}).add(styles)

}
