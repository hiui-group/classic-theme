import React, { Component } from 'react'
import { Logo, Classic, History } from '../../src'
import routes from './routes'
import Header from './Header'
import './index.scss'
// History.createHashHistory()
const logo = <Logo
  url='https://xiaomi.github.io/hiui/#/'
  logoUrl='https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05'
  text='HIUI Demo'
  title='HIUI Classic Theme Demo'
  alt='Project Logo'
/>

class App extends Component {
  constructor () {
    super()
    this.state = {
      type: 'flat',
      color: 'black',
      breadcrumb: [
        {
          to: '/products/mix3',
          title: '产品系列'
        },
        {
          title: '红米系列'
        },
        {
          to: '/products/mi6',
          title: '红米6'
        }
      ]
    }
  }
  changeColor (val) {
    this.setState({
      color: val
    })
  }
  render () {
    const {
      breadcrumb,
      color,
      type
    } = this.state
    const header = <Header
      onColorChange={(color) => { this.setState({color}) }}
      onLayoutChange={type => this.setState({type})}
    />
    return (
      <Classic
        header={header}
        logo={logo}
        breadcrumb={breadcrumb}
        routes={routes}
        config={{
          color,
          type
        }}
      />
    )
  }
}

export default App
