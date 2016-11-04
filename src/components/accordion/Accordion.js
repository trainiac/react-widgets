import React, { PureComponent, cloneElement, PropTypes } from 'react'
import _ from 'lodash/fp'
import { isTypeComponent } from '../../utils/index'


const transform = _.transform.convert({ cap: false })


const findKeyComponents = _.filter(isTypeComponent('AccordionKey'))


const toKeyComponentArray = children =>
  findKeyComponents(React.Children.toArray(children))


const componentsToIsOpenState = _.transform((next, key) => {

  next[key.props.keyId] = Boolean(key.props.isOpen)

  return next

})({})


const mapKeysToIsOpenState = _.flow(
  toKeyComponentArray,
  componentsToIsOpenState
)


const getTruthyKeys = _.flow(
  _.pickBy(_.identity),
  _.keys
)


function maybeHead(arr) {

  return arr.length ? _.head(arr) : null

}


const getFirstTruthyKey = _.flow(
  getTruthyKeys,
  maybeHead
)


export default class Accordion extends PureComponent {

  constructor(props) {

    super(props)

    const keysOpenState = mapKeysToIsOpenState(this.props.children)

    this.state = {
      keysOpenState
    }

  }

  isKeyOpen(keyId) {

    return this.state.keysOpenState[keyId]

  }

  componentWillUpdate(nextProps, nextState) {

    const state = this.state
    const { keyWillClose, keyWillOpen } = this.props

    if (nextState.keysOpenState !== state.keysOpenState) {

      const changes = this.getKeysOpenChanges(nextState.keysOpenState, 'will')

      if (changes.willClose) {

        keyWillClose(changes.willClose)

      }

      if (changes.willOpen) {

        keyWillOpen(changes.willOpen)

      }

    }

  }

  componentDidUpdate(prevProps, prevState) {

    const state = this.state
    const { keyDidClose, keyDidOpen } = this.props

    if (prevState.keysOpenState !== state.keysOpenState) {

      const changes = this.getKeysOpenChanges(prevState.keysOpenState, 'did')

      if (changes.didClose) {

        keyDidClose(changes.didClose)

      }

      if (changes.didOpen) {

        keyDidOpen(changes.didOpen)

      }

    }

  }

  getKeysOpenChanges(keysOpenState, tense) {

    const self = this

    return transform((next, isOpen, keyId) => {

      if (isOpen !== self.state.keysOpenState[keyId]) {

        if (isOpen && tense === 'will') {

          next.willOpen = keyId

        } else if (isOpen && tense === 'did') {

          next.didClose = keyId

        } else if (!isOpen && tense === 'will') {

          next.willClose = keyId

        } else if (!isOpen && tense === 'did') {

          next.didOpen = keyId

        }

      }

      return next

    })({})(keysOpenState)

  }

  onKeyHeaderClick(keyId, isOpen) {

    const newKeysOpenState = { ...this.state.keysOpenState }

    if (isOpen) {

      newKeysOpenState[keyId] = false

    } else if (this.props.multiOpen) {

      newKeysOpenState[keyId] = true

    } else {

      const openKeyId = getFirstTruthyKey(this.state.keysOpenState)

      if (openKeyId) {

        newKeysOpenState[openKeyId] = false

      }

      newKeysOpenState[keyId] = true

    }

    this.setState({
      keysOpenState: newKeysOpenState
    })

  }

  renderKeys() {

    const self = this
    const keyComponents = toKeyComponentArray(this.props.children)

    return _.map(keyComponent => {

      const keyId = keyComponent.props.keyId

      return cloneElement(
        keyComponent,
        {
          onHeaderClick: this.onKeyHeaderClick.bind(this),
          key: keyId,
          isOpen: self.isKeyOpen(keyId)
        }
      )

    })(keyComponents)

  }

  render() {

    return (
      <div className={this.props.className}>
        {this.renderKeys()}
      </div>
    )

  }

}


Accordion.propTypes = {
  children: PropTypes.node,
  keyDidClose: PropTypes.func,
  keyWillClose: PropTypes.func,
  keyDidOpen: PropTypes.func,
  keyWillOpen: PropTypes.func,
  multiOpen: PropTypes.bool,
  className: PropTypes.string
}

Accordion.defaultProps = {
  keyDidClose: _.noop,
  keyDidOpen: _.noop,
  keyWillClose: _.noop,
  keyWillOpen: _.noop,
  multiOpen: false
}
