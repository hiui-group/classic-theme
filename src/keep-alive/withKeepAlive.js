import React, { useContext, useRef, useEffect } from 'react'
import CacheContext from './CacheContext'
import * as cacheTypes from './cache-types'
const withKeepAlive = (OldComponent) => {
  const keepAliveWrapper = (props) => {
    const { mount, cacheStates, dispatch } = useContext(CacheContext)
    const ref = useRef(null)

    useEffect(() => {
      const cacheState = cacheStates[props.match.url]
      if (cacheState && cacheState.doms && cacheState.status !== cacheTypes.DESTROY) {
        const doms = cacheState.doms
        // 先清空 childNodes 再注入
        ref.current.childNodes.forEach((child) => ref.current.removeChild(child))
        doms.forEach((dom) => ref.current.appendChild(dom))
      } else {
        mount({ cacheId: props.match.url, element: <OldComponent {...props} dispatch={dispatch} /> })
      }
    }, [cacheStates, dispatch, mount, props])

    return <div id={`keepalive_${props.match.url}`} ref={ref} />
  }
  return keepAliveWrapper
}
export default withKeepAlive
