const BaseReactHOC = WrappedComponent =>

  class BaseReact extends WrappedComponent {

    constructor(props) {

      super(props)

      const wrappedClassProps = Object.getOwnPropertyNames(WrappedComponent.prototype)

      for (const prop of wrappedClassProps) {

        if (prop.startsWith('handle')) {

          this[prop] = this[prop].bind(this)

        }

      }

    }

    ref(refName) {

      return { ref: el => this[refName] = el }

    }

    getData() {

      return {
        state: {
          ...this.state
        },
        props: {
          ...this.props
        }
      }

    }

    render() {

      return super.render()

    }

  }


export default BaseReactHOC
