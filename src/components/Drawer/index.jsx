import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Classnames from 'classnames'
import './style/index'

const PREFIX = 'sider-drawer'

const getDefaultContainer = () => {
  const defaultContainer = document.createElement('div')
  document.body.appendChild(defaultContainer)
  return defaultContainer
}

const DrawerComp = ({
  children,
  container,
  visible,
  onClose,
  maskClosable = true,
  width,
  showMask = true,
  placement = 'right'
}) => {
  const defaultContainer = useRef(false)
  if (defaultContainer.current === false) {
    defaultContainer.current = getDefaultContainer()
  }

  useEffect(() => {
    const parent = (container || defaultContainer.current).parentNode
    // 屏蔽滚动条
    if (visible) {
      parent.style.setProperty('overflow', 'hidden')
    } else {
      parent.style.removeProperty('overflow')
    }
  }, [visible, container])

  return ReactDOM.createPortal(
    <div className={PREFIX}>
      {showMask && (
        <div
          className={Classnames(`${PREFIX}__mask`, { [`${PREFIX}__mask--visible`]: visible })}
          onClick={() => {
            if (maskClosable) {
              onClose()
            }
          }}
        />
      )}
      <div
        style={{ width: width }}
        className={Classnames(`${PREFIX}__wrapper`, `${PREFIX}__wrapper--${placement}`, {
          [`${PREFIX}__wrapper--visible`]: visible
        })}
      >
        {children}
      </div>
    </div>,
    container || defaultContainer.current
  )
}

export default DrawerComp
