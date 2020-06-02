import React, { useCallback, useState, useEffect, useRef } from 'react'

const Expander = ({children, expanded}) => {
  const expanderRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (expanded) {
      setHeight(getRefHeight())
      setTimeout(() => { setHeight('') }, 150)
    } else {
      setHeight(getRefHeight())
      setTimeout(() => { setHeight(0) }, 150)
    }
  }, [expanded])

  const getRefHeight = useCallback(() => {
    if (expanderRef.current) {
      return expanderRef.current.scrollHeight
    }
  }, [])

  return <div className='menu-expander' style={{height: height}}><div ref={expanderRef}>{children}</div></div>
}

export default Expander
