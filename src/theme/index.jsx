import React, { useRef } from 'react'
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory, createHashHistory } from 'history'
import layout from '../components/Layout'
import './index.scss'

import { transformConfig } from '../util/common'
let _history = {}
export const history = _history

const historyGenerator = {
  browserHistory: createBrowserHistory,
  hashHistory: createHashHistory
}

const Layout = ({
  historyType = 'browserHistory',
  basename = '/',
  routes = [],
  type = 'classic',
  apperance = { contentBackground: '#f6f6f6', contentPadding: 24 },
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
  pageHeader
}) => {
  const Layout = layout[type]
  const historyForLayout = useRef(null)
  if (!historyForLayout.current) {
    historyForLayout.current = historyGenerator[historyType]({ basename })

    _history[historyType] = historyForLayout.current
  }
  return (
    <Router history={historyForLayout.current}>
      <Route
        path='/'
        render={(props) => (
          <Layout
            menu={transformConfig(routes)}
            siderTopRender={siderTopRender}
            siderBottomRender={siderBottomRender}
            toolbar={toolbar}
            footer={footer}
            type={type}
            apperance={apperance}
            logo={logo}
            login={login}
            header={header}
            accordion={accordion}
            fallback={fallback}
            defaultExpandAll={defaultExpandAll}
            pageHeader={pageHeader}
            {...props}
          />
        )}
      />
    </Router>
  )
}

export default Layout
