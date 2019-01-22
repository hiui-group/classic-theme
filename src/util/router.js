import React from 'react'
import { Switch, Route } from 'react-router'

const defaultRenderProxy = page => page

export const renderRoutes = (routes, extraProps = {}, switchProps = {}, renderProxy = defaultRenderProxy) => {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props => {
            const page = route.render ? (
              route.render({ ...props, ...extraProps, route: route })
            ) : (
              <route.component {...props} {...extraProps} route={route} />
            )

            return renderProxy(page)
          }}
        />
      ))}
    </Switch>
  ) : null
}
