import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'


const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer

/*
 ability to customize position
 ability to position relative to any element
 ability pass in a class or styles
 dialog is center position fixed by default
 easyClose option
 modalOption
 title text option

 close on click outside
 close on escape
 reposition on window resize

 callbacks
 beforeOpen
 afterOpen
 beforeClose
 afterClose
*/

export default function PortalHOC(WrappedComponent) {

  return class Portal extends WrappedComponent {

    static propTypes = {
      portalClassName: PropTypes.string
    }

    static defaultProps = {
      // TODO try to use displayname of wrapped component
      portalClassName: 'portal'
    }


    componentDidMount() {

      this.node = document.createElement('div')
      this.node.className = this.props.portalClassName
      document.body.appendChild(this.node)
      this.renderPortal(this.props)
      super.componentDidMount()

    }

    componentWillReceiveProps(newProps) {

      super.componentWillReceiveProps(newProps)
      this.renderPortal(newProps)

    }

    componentWillUnmount() {

      if (super.componentWillUnmount) {

        super.componentWillUnmount()

      }
      ReactDOM.unmountComponentAtNode(this.node)
      document.body.removeChild(this.node)

    }


    renderPortal(props) {

      renderSubtreeIntoContainer(
        this,
        <WrappedComponent {...props}/>,
        this.node
      )

    }

  }

}
