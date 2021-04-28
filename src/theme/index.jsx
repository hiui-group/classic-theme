import React, { useRef, useEffect, useState } from 'react'
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory, createHashHistory } from 'history'
import layout from '../components/Layout'
import './style/index'

import { transformConfig } from '../util/common'
const _history = {}
export const history = _history

const historyGenerator = {
  browserHistory: createBrowserHistory,
  hashHistory: createHashHistory
}
const defaultApperance = { contentBackground: '#f6f6f6', contentPadding: 24, color: 'dark' }

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
  footer,
  defaultExpandAll,
  pageHeader,
  onToggle,
  authority,
  dynamic = true,
  sliderCollapse,
  defaultToggle
}) => {
  const [viewSize, setViewSize] = useState('large')
  const [siderVisible, setSiderVisible] = useState(true)
  useEffect(() => {
    if (typeof sliderCollapse !== 'undefined') {
      setViewSize(sliderCollapse ? 'large' : 'middle')
    }
  }, [sliderCollapse])
  useEffect(() => {
    function dynamicLayout(e) {
      if (typeof sliderCollapse !== 'undefined') {
        return
      }
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
      <Route
        path="/"
        render={(props) => (
          <Layout
            viewSize={viewSize}
            menu={transformConfig(routes)}
            siderTopRender={siderTopRender}
            siderBottomRender={siderBottomRender}
            toolbar={toolbar}
            footer={footer}
            type={type}
            apperance={Object.assign({}, defaultApperance, apperance)}
            logo={logo}
            login={login}
            header={header}
            accordion={accordion}
            fallback={fallback}
            defaultExpandAll={defaultExpandAll}
            pageHeader={pageHeader}
            sliderCollapse={sliderCollapse}
            onToggle={onToggle}
            authority={authority}
            setSiderVisible={setSiderVisible}
            siderVisible={siderVisible}
            defaultToggle={defaultToggle}
            {...props}
          />
        )}
      />
    </Router>
  )
}

export default Layout
