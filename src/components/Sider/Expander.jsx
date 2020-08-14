import React, { useCallback, useState, useEffect, useRef } from 'react'

const Expander = ({ children, expanded, isManul }) => {
  const expanderRef = useRef(null)
  const [height, setHeight] = useState('')
  useEffect(() => {
    if (isManul) {
      if (expanded) {
        setHeight(getRefHeight())
        setTimeout(() => {
          setHeight('')
        }, 150)
      } else {
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
  }, [])
  return (
    <div className='menu-expander' style={{ height: isManul ? height : expanded ? '' : 0 }}>
      <div ref={expanderRef}>{children}</div>
    </div>
  )
}

export default Expander
