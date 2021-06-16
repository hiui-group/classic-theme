import React, { useReducer, useCallback } from 'react'
import CacheContext from './CacheContext'
import cacheReducer from './cacheReducer'
import * as cacheTypes from './cache-types'
function KeepAliveProvider(props) {
  const [cacheStates, dispatch] = useReducer(cacheReducer, {})
  const mount = useCallback(
    ({ cacheId, element }) => {
      if (cacheStates[cacheId]) {
        const cacheState = cacheStates[cacheId]
        if (cacheState.status === cacheTypes.DESTROY) {
          const doms = cacheState.doms
          doms.forEach((dom) => dom.parentNode.removeChild(dom))
          dispatch({ type: cacheTypes.CREATE, payload: { cacheId, element } })
        }
      } else {
        dispatch({ type: cacheTypes.CREATE, payload: { cacheId, element } })
      }
    },
    [cacheStates]
  )
  const handleScroll = useCallback(
    (cacheId, { target }) => {
      if (cacheStates[cacheId]) {
        const scrolls = cacheStates[cacheId].scrolls
        scrolls[target] = target.scrollTop
      }
    },
    [cacheStates]
  )
  return (
    <CacheContext.Provider value={{ mount, cacheStates, dispatch, handleScroll }}>
      {props.children}
      {Object.values(cacheStates)
        .filter((cacheState) => cacheState.status !== cacheTypes.DESTROY)
        .map(({ cacheId, element }) => (
          <div
            id={`cache_${cacheId}`}
            key={cacheId}
            ref={(dom) => {
              const cacheState = cacheStates[cacheId]
              if (dom && (!cacheState.doms || cacheState.status === cacheTypes.DESTROY)) {
                const doms = Array.from(dom.childNodes)
                dispatch({ type: cacheTypes.CREATED, payload: { cacheId, doms } })
              }
            }}
          >
            {element}
          </div>
        ))}
    </CacheContext.Provider>
  )
}
export default KeepAliveProvider
