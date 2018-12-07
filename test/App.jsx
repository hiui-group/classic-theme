import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Page, { Logo, Login, NavGroup } from '../src'
import { Icon, ThemeContext } from '@hi-ui/hiui'
import Home from './pages/Home'
import About from './pages/About'
const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  }, {
    path: '/about',
    exact: true,
    component: About
  }, {
    path: '/inner/1',
    exact: true,
    component: Home
  }, {
    path: '/color/blue',
    exact: true,
    component: About
  }
]
const login = {
  name: 'Admin',
  icon: <span className='hi-icon icon-user' />,
  children: [
    <div key='1' style={{textAlign: 'center', margin: 4, width: '100px'}}><a href='#'>个人信息</a></div>,
    <div key='2' style={{textAlign: 'center', margin: 4, width: '100px'}}><a href='#'>注销</a></div>
  ]
}

const header = (
  <React.Fragment>
    <NavGroup pos='left'>
      <NavGroup.Item>
        <Link to='/'>首页</Link>
      </NavGroup.Item>
      <NavGroup.Item>
        <Link to='/about'>关于我们</Link>
      </NavGroup.Item>
      <NavGroup.Item>
        <Link to='/about'>关于我们</Link>
      </NavGroup.Item>
    </NavGroup>
    <NavGroup pos='right'>
      <NavGroup.Item>
        <Link to='/'>主页</Link>
      </NavGroup.Item>
      <Login {...login} />
    </NavGroup>
  </React.Fragment>
)

// const Row = Layout.Row
// const Col = Layout.Col
// const footer = (
//   <React.Fragment>
//     <Row>
//       <Col span={12}>&copy;2018</Col>
//       <Col span={12} style={{textAlign: 'right'}}>mi-hiui@xiaomi.com</Col>
//     </Row>
//   </React.Fragment>
// )

class App extends Component {
  constructor () {
    super()
    this.state = {
      type: 'flat',
      color: 'blue'
    }
  }
  render () {
    const logo = <Logo
      url='https://xiaomi.github.io/hiui/#/'
      logoUrl='https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05'
      text='HIUI Demo'
      title='HIUI Classic Theme Demo'
      alt='Project Logo'
    />
    return (
      <ThemeContext.Provider value='orange'>
        <Page
          header={header}
          // footer={footer}
          logo={logo}
          routes={routes}
          sider={{
            items: [
              { title: '首页', to: '/', icon: <Icon name='user' /> },
              {
                title: '内外',

                icon: <Icon name='usergroup' />,
                children: [
                  {
                    title: '内嵌',
                    to: '/inner'
                  },
                  {
                    title: '内嵌1',
                    to: '/inner/1'
                  },
                  {
                    title: '外嵌',
                    type: 'title',
                    children: [
                      {
                        title: '外嵌1',
                        to: '/outer/1'
                      },
                      {
                        title: '外嵌2',
                        to: '/outer/2'
                      },
                      {
                        title: '外嵌3',
                        to: '/outer/3'
                      }
                    ]
                  }
                ]
              },
              {
                title: '配色',
                to: '',
                icon: <Icon name='usergroup' />,
                children: [
                  {
                    title: '灰色',
                    to: '/color/gray'
                  },
                  {
                    title: '蓝色',
                    to: '/color/blue'
                  }
                ]
              }
            ]
          }}
          config={{
            // color: 'black'
            // type: 'card'
          }}
        />
      </ThemeContext.Provider>
    )
  }
}

export default App
