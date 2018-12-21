import React, { Component } from 'react'

export const Context = React.createContext('sider')
export const ContextProvider = Context.Provider
export const ContextConsumer = Context.Consumer

export default (WrappedComponent) =>
  class WrapperComponent extends Component {
    render () {
      const {
        options,
        ...restProps
      } = this.props
      let ConsumerComponent = (
        <Context.Consumer>
          {options => (
            <WrappedComponent options={options} {...restProps} />
          )}
        </Context.Consumer>
      )

      return wrapProvider(options, Context)(ConsumerComponent)
    }
  }

function wrapProvider (value, context) {
  wrapProvider.Providers || (wrapProvider.Providers = [])
  if (value !== undefined && context) {
    wrapProvider.Providers.push({
      value,
      context
    })
  }
  if (!context) {
    let component = value
    wrapProvider.Providers.reverse().map(obj => {
      component = (
        <obj.context.Provider value={obj.value}>
          {component}
        </obj.context.Provider>
      )
    })
    wrapProvider.Providers = []
    return component
  }
  return wrapProvider
}
