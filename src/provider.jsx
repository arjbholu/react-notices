import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Context from './context'
import Notice from './notice'

class Provider extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      queue: [],
      active: []
    }

    this.interval = null

    this.isQueued = this.isQueued.bind(this)
    this.isActive = this.isActive.bind(this)

    this.watch = this.watch.bind(this)
    this.notice = this.notice.bind(this)
    this.queue = this.queue.bind(this)
    this.clear = this.clear.bind(this)

    this.onClose = this.onClose.bind(this)
  }

  componentDidMount () {
    const { eventLoop } = this.props

    this.node = document.body

    this.interval = setInterval(
      this.watch, eventLoop
    )

    this.forceUpdate()
  }

  componentWillUnmount () {
    this.clear()

    clearInterval(this.interval)
  }

  get $context () {
    const { queue, active } = this.state

    return {
      isActive: this.isActive,
      isQueued: this.isQueued,
      notice: this.notice,
      clear: this.clear,
      $queue: queue,
      $active: active
    }
  }

  get className () {
    const { position } = this.props
    let posClass = position

    if (!posClass.includes(' ')) {
      posClass += ' center'
    }

    posClass = posClass.replace(' ', '-')

    return (
      classNames([
        'notice-container',
        {
          [`display-${posClass}`]: position
        }
      ])
    )
  }

  isQueued (key) {
    const { queue } = this.state
    const index = (
      queue.findIndex(notice => (
        notice.key === key
      ))
    )

    return {
      bool: index > -1,
      index
    }
  }

  isActive (key) {
    const { active } = this.state
    const index = (
      active.findIndex(notice => (
        notice.key === key
      ))
    )

    return {
      bool: index > -1,
      index
    }
  }

  watch () {
    const { queue, active } = this.state
    const { maxActive } = this.props

    if (active.length < maxActive && queue.length >= 1) {
      const newQueue = [...queue]
      const newActive = [...active]

      const next = newQueue.shift()
      newActive.push(next)

      this.setState({
        queue: newQueue,
        active: newActive
      })
    }
  }

  notice () {
    return this.queue(...arguments)
  }

  queue (notice) {
    const { queue } = this.state
    const { position } = this.props

    const newQueue = [...queue]

    const toQueue = {
      key: Math.random().toString(36).substring(7),
      ...Notice.defaultProps,
      ...notice,
      position
    }

    newQueue.push(toQueue)

    this.setState({
      queue: newQueue
    })

    return toQueue.key
  }

  clear () {
    this.setState({
      queue: [],
      active: []
    })
  }

  onClose (key) {
    const { bool, index } = this.isActive(key)

    if (!bool) {
      return
    }

    const { active } = this.state
    const newActive = [...active]

    newActive.splice(index, 1)

    this.setState({
      active: newActive
    })
  }

  renderNotices () {
    const { active } = this.state

    if (!this.node) {
      return null
    }

    return (
      ReactDOM.createPortal(
        (
          <div className={'notice-container'}>
            {active.map(({ key, ...notice }) => (
              <Notice
                key={key}
                {...notice}
                onClose={() => (
                  this.onClose(key)
                )}
              />
            ))}
          </div>
        ),
        this.node
      )
    )
  }

  render () {
    const { children } = this.props

    return (
      <Context.Provider value={this.$context}>
        {children}
        {this.renderNotices()}
      </Context.Provider>
    )
  }
}

Provider.defaultProps = {
  maxActive: 1,
  eventLoop: 500,
  position: 'bottom right'
}

Provider.propTypes = {
  maxActive: PropTypes.number,
  eventLoop: PropTypes.number,
  position: PropTypes.oneOf([
    'top', 'top left', 'top right',
    'bottom', 'bottom left', 'bottom right',
    'left', 'right'
  ])
}

export default Provider
