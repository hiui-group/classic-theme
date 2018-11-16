import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Page, { Logo, Login, NavGroup } from './src'
import { Icon, ThemeContext } from '@hi-ui/hiui'
import Home from './src/example/Home'
import About from './src/example/About'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  }, {
    path: '/about',
    exact: true,
    component: About
  }
]
const login = {
  name: 'Admin',
  icon: <span className='hi-icon icon-user' />,
  children: [
    <div key='1' style={{textAlign: 'center', margin: 4, width: '100px'}}>个人信息</div>,
    <div key='2' style={{textAlign: 'center', margin: 4, width: '100px'}}>注销</div>
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
      <NavGroup.Item />
    </NavGroup>
    <NavGroup pos='right'>
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
      type: 'inner',
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
          sider={[
            {key: 1, title: '首页', to: '/', icon: <Icon name='user' />},
            {
              key: 2,
              title: '内嵌',
              to: '',
              icon: <Icon name='usergroup' />,
              children: [
                {key: 21,
                  title: '内嵌',
                  to: {
                    hash: 'inner'
                  }
                },
                {key: 22,
                  title: '外嵌',
                  to: {
                    hash: 'outer'
                  }
                },
                {
                  key: 22,
                  title: '外嵌',
                  to: {
                    hash: 'outer'
                  }
                },
                {
                  key: 22,
                  title: '外嵌',
                  to: {
                    hash: 'outer'
                  }
                },
                {
                  key: 22,
                  title: '外嵌',
                  to: {
                    hash: 'outer'
                  }
                },
                {
                  key: 22,
                  title: '外嵌',
                  to: {
                    hash: 'outer'
                  }
                },
                {
                  key: 22,
                  title: '外嵌',
                  to: {
                    hash: 'outer'
                  }
                },
                {
                  key: 22,
                  title: '外嵌',
                  to: {
                    hash: 'outer'
                  }
                },
                {
                  key: 22,
                  title: '外嵌',
                  to: {
                    hash: 'outer'
                  }
                },
                {
                  key: 22,
                  title: '外嵌',
                  to: {
                    hash: 'outer'
                  }
                },
                {
                  key: 22,
                  title: '外嵌',
                  to: {
                    hash: 'outer'
                  }
                },
                {
                  key: 22,
                  title: '外嵌',
                  to: {
                    hash: 'outer'
                  }
                },
                {
                  key: 22,
                  title: '外嵌',
                  to: {
                    hash: 'outer'
                  }
                }
              ]
            },
            {
              key: 3,
              title: '配色',
              to: '',
              icon: <Icon name='usergroup' />,
              children: [
                {
                  key: 31,
                  title: '灰色',
                  to: {
                    hash: 'gray'
                  }
                },
                {
                  key: 32,
                  title: '蓝色',
                  to: {
                    hash: 'blue'
                  }
                }
              ]
            }
          ]
          }
          theme={{
            // color: 'dark',
            // type: 'outer'
          }}
        />
      </ThemeContext.Provider>
    )
  }
}

export default App
