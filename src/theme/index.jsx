import React, { useRef } from 'react'
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory, createHashHistory } from 'history'
import layout from '../components/Layout'
import Login from '../components/Login'
import Logo from '../components/Logo'
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
  apperance = { color: 'dark' },
  logo,
  login,
  header,
  toolbar,
  siderTopRender,
  siderBottomRender,
  accordion = true,
  fallback,
  footer
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
            logo={logo && <Logo {...logo} />}
            login={login}
            header={header}
            accordion={accordion}
            fallback={fallback}
            {...props}
          />
        )}
      />
    </Router>
  )
}

export default Layout
