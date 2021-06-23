import React, { useState, useEffect, useCallback, useRef } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { findMenu } from '../../util/common.js'
import './index.scss'

const prefix = 'theme-nav-bar'
const Tag = ({ menu, history, onMenuClick }) => {
  const [historyPaths, setHistoryPaths] = useState({})
  const [activePath, setActivePath] = useState({})
  const mergeRouter = useRef()
  useEffect(() => {
    // 默认进入执行一次
    const { pathname } = window.location
    if (!historyPaths[pathname]) {
      const menuInfo = findMenu(pathname, menu)
      mergeRouter.current = Object.assign({}, { ...mergeRouter.current }, { [pathname]: menuInfo })
      menuInfo && setHistoryPaths(mergeRouter.current)
    }
    setActivePath(pathname)
    const unlistten = history.listen((location) => {
      const { pathname } = location
      if (!historyPaths[pathname]) {
        const menuInfo = findMenu(pathname, menu)
        mergeRouter.current = Object.assign({}, { ...mergeRouter.current }, { [pathname]: menuInfo })
        menuInfo && setHistoryPaths(mergeRouter.current)
      }
      setActivePath(pathname)
    })
    return () => {
      unlistten()
    }
  }, [])
  useEffect(() => {
    mergeRouter.current = _.cloneDeep(historyPaths)
  }, [historyPaths])
  const deleteItem = useCallback(
    (path, prePath, nextPath, isActive) => {
      const _historyPaths = _.cloneDeep(historyPaths)
      delete _historyPaths[path]
      setHistoryPaths(_historyPaths)
      if (isActive) {
        prePath ? setActivePath(prePath) : setActivePath(nextPath)
      }
    },
    [historyPaths, activePath]
  )
  const historyPathsKeys = Object.keys(historyPaths)
  return (
    <div className={`${prefix}`}>
      {historyPathsKeys.map((key, index) => {
        const { path, name } = historyPaths[key]
        const prePath = historyPathsKeys[index - 1]
        const nextPath = historyPathsKeys[index + 1]
        const isActive = key === activePath
        return (
          <span
            className={classNames(`${prefix}_tag`, { [`${prefix}_tag--active`]: isActive })}
            key={path + index}
            onClick={() => {
              history.push(path)
              onMenuClick && onMenuClick(historyPaths[key])
            }}
          >
            <span>{name}</span>
            <span
              className={`${prefix}_icon`}
              onClick={(e) => {
                e.stopPropagation()
                deleteItem(path, prePath, nextPath, isActive)
              }}
            >
              <svg
                t="1624244997818"
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8674"
                width="14"
                height="14"
              >
                <path
                  d="M834.44 234.814a8 8 0 0 1 0 11.314L568.568 512 834.44 777.872a8 8 0 0 1 0 11.314l-45.254 45.254a8 8 0 0 1-11.314 0L512 568.568 246.128 834.44a8 8 0 0 1-11.314 0L189.56 789.186a8 8 0 0 1 0-11.314L455.432 512 189.56 246.128a8 8 0 0 1 0-11.314l45.254-45.254a8 8 0 0 1 11.314 0L512 455.43 777.872 189.56a8 8 0 0 1 11.314 0l45.254 45.254z"
                  p-id="8675"
                  fill="#333"
                ></path>
              </svg>
            </span>
          </span>
        )
      })}
    </div>
  )
}
export default Tag
