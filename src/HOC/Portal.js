import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'


const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer

const PortalHOC = params => WrappedComponent =>

  class Portal extends WrappedComponent {

    static propTypes = {
      portalClassName: PropTypes.string
    }

    static defaultProps = {
      // TODO try to use displayname of wrapped component
      portalClassName: 'portal'
    }


    componentDidMount() {

      this.maybeRenderPortal(this.props)

      if (super.componentDidMount) {

        super.componentDidMount()

      }


    }

    componentWillReceiveProps(newProps) {

      if (super.componentWillReceiveProps) {

        super.componentWillReceiveProps(newProps)

      }

      this.maybeRenderPortal(newProps)

    }

    componentWillUnmount() {

      if (super.componentWillUnmount) {

        super.componentWillUnmount()

      }
      ReactDOM.unmountComponentAtNode(this.portal)
      document.body.removeChild(this.portal)

    }


    maybeRenderPortal(props) {

      if (!this.portal && params(props).shouldRenderPortal) {

        this.portal = document.createElement('div')
        this.portal.className = this.props.portalClassName
        document.body.appendChild(this.portal)

      }

      if (this.portal) {

        renderSubtreeIntoContainer(
          this,
          <WrappedComponent {...props}/>,
          this.portal
        )

      }


    }

    render() {

      return null

    }

  }


export default PortalHOC

