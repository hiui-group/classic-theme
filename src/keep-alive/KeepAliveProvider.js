import React, { useReducer, useCallback, useMemo } from 'react'
import CacheContext from './CacheContext'
import cacheReducer from './cacheReducer'
import * as cacheTypes from './cache-types'
function KeepAliveProvider(props) {
  const { isExistKeepAlive } = props
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

  const unmountComponentByCacheId = useCallback(
    (cacheId) => {
      const cacheInstance = cacheStates[cacheId]
      if (cacheInstance) {
        dispatch({ type: cacheTypes.DESTROY, payload: { cacheId } })
      }
    },
    [cacheStates]
  )

  const providedValue = useMemo(
    () => ({
      cacheStates,
      mount,
      unmount: unmountComponentByCacheId
    }),
    [cacheStates, mount, unmountComponentByCacheId]
  )

  return !isExistKeepAlive ? (
    <>{props.children}</>
  ) : (
    <CacheContext.Provider value={providedValue}>
      {props.children}
      {Object.values(cacheStates)
        .filter((cacheState) => cacheState.status !== cacheTypes.DESTROY)
        .map(({ cacheId, element }) => {
          return (
            <div
              id={`cache_${cacheId}`}
              key={cacheId}
              ref={(dom) => {
                const cacheState = cacheStates[cacheId]
                if (dom && (!cacheState.doms || cacheState.status === cacheTypes.DESTROY)) {
                  // 修复异步加载组件时无法收集 dom 渲染
                  const observer = new MutationObserver(() => {
                    const doms = Array.from(dom.childNodes)

                    if (doms.length > 0) {
                      dispatch({ type: cacheTypes.CREATED, payload: { cacheId, doms } })
                    }
                  })

                  observer.observe(dom, {
                    // attributes: true,
                    // subtree: true,
                    childList: true
                  })

                  const doms = Array.from(dom.childNodes)
                  dispatch({ type: cacheTypes.CREATED, payload: { cacheId, doms } })
                }
              }}
            >
              {element}
            </div>
          )
        })}
    </CacheContext.Provider>
  )
}
export default KeepAliveProvider
