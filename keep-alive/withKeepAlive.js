import React, { useContext, useRef, useEffect } from 'react'
import CacheContext from './CacheContext'
import * as cacheTypes from './cache-types'
const withKeepAlive = (OldComponent, { cacheId = window.location.pathname, scroll = false }) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const { mount, cacheStates, dispatch, handleScroll } = useContext(CacheContext)
    const ref = useRef(null)
    useEffect(() => {
      if (scroll) {
        ref.current.addEventListener('scroll', handleScroll.bind(null, cacheId), true)
      }
    }, [handleScroll])
    useEffect(() => {
      const cacheState = cacheStates[cacheId]
      if (cacheState && cacheState.doms && cacheState.status !== cacheTypes.DESTROY) {
        const doms = cacheState.doms
        doms.forEach((dom) => ref.current.appendChild(dom))
        if (scroll) {
          doms.forEach((dom) => {
            if (cacheState.scrolls[dom]) dom.scrollTop = cacheState.scrolls[dom]
          })
        }
      } else {
        mount({ cacheId, element: <OldComponent {...props} dispatch={dispatch} /> })
      }
    }, [cacheStates, dispatch, mount, props])
    return <div id={`keepalive_${cacheId}`} ref={ref} />
  }
}
export default withKeepAlive
