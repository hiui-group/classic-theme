import React, { useContext, useRef, useEffect } from 'react'
import CacheContext from './CacheContext'
import * as cacheTypes from './cache-types'
const withKeepAlive = (OldComponent, { cacheId = window.location.pathname }) => {
  const keepAliveWrapper = (props) => {
    const { mount, cacheStates, dispatch } = useContext(CacheContext)
    const ref = useRef(null)

    useEffect(() => {
      const cacheState = cacheStates[cacheId]
      if (cacheState && cacheState.doms && cacheState.status !== cacheTypes.DESTROY) {
        const doms = cacheState.doms
        doms.forEach((dom) => ref.current.appendChild(dom))
      } else {
        mount({ cacheId, element: <OldComponent {...props} dispatch={dispatch} /> })
      }
    }, [cacheStates, dispatch, mount, props])

    return <div id={`keepalive_${cacheId}`} ref={ref} />
  }
  return keepAliveWrapper
}
export default withKeepAlive
