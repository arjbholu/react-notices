export const animationForPosition = position => {
  const out = {
    init: {},
    visible: {},
    hidden: {}
  }

  switch (position) {
    case 'top':
    case 'top left':
    case 'top right':
      out.init = {
        opacity: 0,
        bottom: 20
      }

      break
    case 'bottom':
    case 'bottom left':
    case 'bottom right':
    default:
      out.init = {
        opacity: 0,
        top: 20
      }
  }

  switch (position) {
    case 'top':
      out.visible = {
        opacity: 1,
        bottom: 0
      }

      break
    case 'top left':
      out.visible = {
        opacity: 1,
        bottom: 0,
        left: 0
      }

      break
    case 'top right':
      out.visible = {
        opacity: 1,
        bottom: 0,
        right: 0
      }

      break
    case 'bottom':
      out.visible = {
        opacity: 1,
        top: 0
      }

      break
    case 'bottom left':
      out.visible = {
        opacity: 1,
        top: 0,
        left: 0
      }

      break
    case 'bottom right':
    default:
      out.visible = {
        opacity: 1,
        top: 0,
        right: 0
      }
  }

  switch (position) {
    case 'top':
      out.hidden = {
        opacity: 0,
        bottom: 20
      }

      break
    case 'bottom':
      out.hidden = {
        opacity: 0,
        top: 20
      }

      break
    case 'top left':
    case 'bottom left':
      out.hidden = ({ width }) => ({
        opacity: 0,
        left: -width
      })

      break
    case 'top right':
    case 'bottom right':
    default:
      out.hidden = ({ width }) => ({
        opacity: 0,
        right: -width
      })
  }

  return out
}
