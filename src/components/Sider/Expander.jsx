import React, { useCallback, useState, useEffect, useRef } from 'react'

const Expander = ({ children, expanded, isManul }) => {
  const expanderRef = useRef(null)
  const wrapperRef = useRef(null)
  const [height, setHeight] = useState(expanded ? '' : 0)
  useEffect(() => {
    if (isManul) {
      if (expanded) {
        setHeight(getRefHeight())
        setTimeout(() => {
          setHeight('')
        }, 150)
      } else {
        if (height === 0) {
          wrapperRef.current.style.height = ''
        }
        setHeight(getRefHeight())
        setTimeout(() => {
          setHeight(0)
        }, 150)
      }
    }
  }, [expanded, isManul])

  const getRefHeight = useCallback(() => {
    if (expanderRef.current) {
      return expanderRef.current.scrollHeight
    }
  }, [expanderRef.current])

  return (
    <div className='menu-expander' ref={wrapperRef} style={{ height: isManul ? height : expanded ? '' : 0 }}>
      <div ref={expanderRef}>{children}</div>
    </div>
  )
}

export default Expander
