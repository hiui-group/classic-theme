import React from 'react'
import Provider from '../../src/util/context'
class Template extends React.Component {
  render () {
    return (
      <h2>模板一</h2>
    )
  }
}
class Template2 extends React.Component {
  render () {
    return (
      <h2>模板二</h2>
    )
  }
}

export { Template2 }
export default Provider(Template)
