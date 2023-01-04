import React, { useRef, useEffect, useState, useMemo } from 'react'
import { unstable_HistoryRouter as Router, Routes, Route } from 'react-router-dom'
import { createBrowserHistory, createHashHistory } from 'history'
import { KeepAliveProvider, withKeepAlive } from '../keep-alive'

import layout from '../components/Layout'
import './style/index'

import { transformConfig, existKeepAliveRouter } from '../util/common'

const _history = {}
export const history = _history

const historyGenerator = {
  browserHistory: createBrowserHistory,
  hashHistory: createHashHistory
}

const defaultAppearance = { contentBackground: undefined, contentPadding: undefined, color: 'dark' }

const Layout = ({
  historyType = 'browserHistory',
  basename = '/',
  routes = [],
  type = 'classic',
  apperance,
  logo,
  login,
  header,
  toolbar,
  siderTopRender,
  siderBottomRender,
  accordion,
  fallback,
  disabledAutoFallback = false,
  footer,
  defaultExpandAll,
  pageHeader,
  onToggle,
  authority,
  dynamic = true,
  defaultToggle,
  onMenuClick,
  tagsView,
  theme
}) => {
  // 获取是否存在keepAlive的路由

  const isExistKeepAlive = useMemo(() => {
    return existKeepAliveRouter(routes, withKeepAlive)
  }, [routes])

  const [viewSize, setViewSize] = useState('large')
  const [siderVisible, setSiderVisible] = useState(true)

  useEffect(() => {
    function dynamicLayout(e) {
      if (dynamic) {
        const realSize = document.documentElement.clientWidth
        if (realSize <= 960) {
          setViewSize('small')
          setSiderVisible(false)
        } else if (realSize > 960 && realSize < 1366) {
          setViewSize('middle')
        } else {
          setViewSize('large')
        }
      }
    }
    if (!defaultToggle) {
      dynamicLayout()
      window.addEventListener('resize', dynamicLayout)
      return () => {
        window.addEventListener('resize', dynamicLayout)
      }
    }
  }, [dynamic, defaultToggle])

  const Layout = layout[type]
  const historyForLayout = useRef(null)

  if (!historyForLayout.current) {
    historyForLayout.current = historyGenerator[historyType]({ basename })
    _history[historyType] = historyForLayout.current
  }

  return (
    <Router history={historyForLayout.current}>
      <KeepAliveProvider isExistKeepAlive={isExistKeepAlive}>
        <Routes>
          <Route
            path="*"
            element={
              <Layout
                viewSize={viewSize}
                menu={transformConfig(routes)}
                siderTopRender={siderTopRender}
                siderBottomRender={siderBottomRender}
                toolbar={toolbar}
                footer={footer}
                type={type}
                apperance={Object.assign({}, defaultAppearance, apperance)}
                logo={logo}
                login={login}
                header={header}
                accordion={accordion}
                onMenuClick={onMenuClick}
                fallback={fallback}
                disabledAutoFallback={disabledAutoFallback}
                defaultExpandAll={defaultExpandAll}
                pageHeader={pageHeader}
                onToggle={onToggle}
                authority={authority}
                setSiderVisible={setSiderVisible}
                siderVisible={siderVisible}
                defaultToggle={defaultToggle}
                theme={theme}
                tagsView={tagsView}
              />
            }
          />
        </Routes>
      </KeepAliveProvider>
    </Router>
  )
}

export default Layout
