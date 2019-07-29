import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { motion, AnimatePresence } from 'framer-motion'
import fn from '@ninetynine/noop'

class Notice extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: true,
      width: 0
    }

    this.ref = React.createRef()
    this.timeout = null

    this.onClick = this.onClick.bind(this)
    this.onClose = this.onClose.bind(this)
  }

  get className () {
    const { className, theme, closeable } = this.props

    return (
      classNames([
        className, 'notice',
        {
          [`display-${theme}`]: theme,
          'state-closeable': closeable
        }
      ])
    )
  }

  get dimensions () {
    const { current } = this.ref

    return (
      current
        ? current.getBoundingClientRect()
        : {}
    )
  }

  get animations () {
    const { animations } = this.props

    return (
      Object.assign(
        {}, Notice.animations, animations
      )
    )
  }

  componentDidMount () {
    const { timeout } = this.props

    this.timeout = (
      setTimeout(
        this.onClose,
        timeout
      )
    )

    this.setState({
      width: this.dimensions.width || 0
    })
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  onClick () {
    const { closeable } = this.props

    if (closeable) {
      this.onClose()
    }
  }

  onClose () {
    this.setState({
      visible: false
    })
  }

  render () {
    const { visible, width } = this.state
    const { content, children, onClose } = this.props

    return (
      <AnimatePresence onExitComplete={onClose}>
        {visible && (
          <motion.div
            key={'_'}
            ref={this.ref}
            className={this.className}
            onClick={this.onClick}
            custom={{ width }}
            variants={Notice.animations}
            transition={{
              ease: 'easeInOut',
              duration: 0.2
            }}
            initial={'init'}
            animate={'visible'}
            exit={'hidden'}
          >
            {content || children}
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
}

Notice.animations = {
  init: {
    opacity: 0,
    top: 20
  },
  visible: {
    opacity: 1,
    top: 0,
    right: 0
  },
  hidden: ({ width }) => ({
    opacity: 0,
    right: -width
  })
}

Notice.defaultProps = {
  closeable: true,
  timeout: 2000,
  animations: {},
  onClose: fn
}

Notice.propTypes = {
  closeable: PropTypes.bool,
  timeout: PropTypes.number,
  animations: PropTypes.shape({
    init: PropTypes.oneOfType([
      PropTypes.object, PropTypes.func
    ]),
    visible: PropTypes.oneOfType([
      PropTypes.object, PropTypes.func
    ]),
    hidden: PropTypes.oneOfType([
      PropTypes.object, PropTypes.func
    ])
  }),
  theme: PropTypes.oneOf([
    'light', 'info', 'warning', 'danger'
  ]),
  onClose: PropTypes.func
}

export default Notice
