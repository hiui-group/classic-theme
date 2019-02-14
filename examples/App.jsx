import React, { Component } from 'react'
import { Logo, Login, NavGroup, NavLink, Classic, Genuine, History } from '../src'
import { Dropdown } from '@hi-ui/hiui'
import routes from './routes'
import NavHeader, {NoNavHeader} from './pages/Header'
import './App.scss'
History.createHashHistory()

class App extends Component {
  constructor () {
    super()
    this.state = {
      type: 'flat',
      color: 'black',
      colors: [{title: 'white'}, {title: 'black'}],
      layoutName: 'classic',
      layouts: [{
        title: '经典布局(平铺式)'
      }, {
        title: '经典布局(卡片式)'
      }, {
        title: '经典布局(顶部导航)'
      }, {
        title: '左右双栏(平铺式)'
      }, {
        title: '左右双栏(卡片式)'
      }, {
        title: '左右双栏(Header)'
      }],
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
  changeLayout (val) {
    const layouts = this.state.layouts
    let tile = 'flat'
    let layout = 'classic'
    let header = null
    switch (val) {
      case layouts[0].title:
        tile = 'flat'
        layout = 'classic'
        break
      case layouts[1].title:
        tile = 'card'
        layout = 'classic'
        break
      case layouts[2].title:
        header = <NavHeader />
        break
      case layouts[3].title:
        tile = 'flat'
        layout = 'genuine'
        break
      case layouts[4].title:
        tile = 'card'
        layout = 'genuine'
        break
      case layouts[5].title:
        tile = 'flat'
        layout = 'genuine'
        header = <NoNavHeader />
        break
      default:
        break
    }
    this.setState({
      type: tile,
      header
    }, () => {
      this.setState({
        layoutName: layout
      })
    })
  }
  changeColor (val) {
    this.setState({
      color: val
    })
  }
  render () {
    const logo = <Logo
      url='https://xiaomi.github.io/hiui/#/'
      logoUrl='https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05'
      text='HIUI Demo'
      title='HIUI Classic Theme Demo'
      alt='Project Logo'
    />
    const {
      breadcrumb,
      colors,
      layouts,
      layoutName,
      color,
      type,
      header
    } = this.state

    return (
      <React.Fragment>
        <div
          className='menus'
        >
          <Dropdown list={colors} title='更换配色' onClick={this.changeColor.bind(this)} />
          <Dropdown list={layouts} title='更换布局' onClick={this.changeLayout.bind(this)} />
        </div>
        {
          layoutName === 'classic'
            ? (<Classic
              header={header}
              logo={logo}
              breadcrumb={breadcrumb}
              routes={routes}
              config={{
                color,
                type
              }}
            />)
            : <Genuine
              header={header}
              logo={logo}
              breadcrumb={breadcrumb}
              routes={routes}
              config={{
                color,
                type
              }}
            />
        }
      </React.Fragment>
    )
  }
}

export default App
