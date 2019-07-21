import React from 'react'
import Header from '../HeaderLayout'
import Sider from '../SiderLayout2'
import { Route } from 'react-router-dom'
class Layout extends React.Component {
  state = {
    activeMainMenu: '',
    activeSiderMenu: '',
    mainMenu: [],
    siderMenu: []
  }

  componentDidMount () {
    const { menu } = this.props
    const mainMenu = this.getMainMenu(menu)
    const activeMainMenu = mainMenu[0].id
    const siderMenu = this.getSiderMenu(menu, activeMainMenu)
    const activeSiderMenu = this.getDefaultActiveSiderMenu(siderMenu)
    this.setState({ mainMenu, activeMainMenu, siderMenu, activeSiderMenu })
  }
  setMainMenu = activeMainMenu => {
    const siderMenu = this.getSiderMenu(this.props.menu, activeMainMenu)
    if (siderMenu.length) {
      const activeSiderMenu = this.getDefaultActiveSiderMenu(siderMenu)
      this.setState({ activeMainMenu, siderMenu, activeSiderMenu })
    } else {
      this.setState({ activeMainMenu, siderMenu })
    }
  }
  setSiderMenu = activeSiderMenu => {
    console.log('clickSiderMenu', activeSiderMenu)
    this.setState({ activeSiderMenu })
  }

  getMainMenu = menu => {
    return menu.map(m => {
      return {
        content: m.name,
        id: m.id,
        pathname:
          m.path || (m.children && m.children[0] && m.children[0].path) || ''
      }
    })
  }
  getSiderMenu = (menu, activeMainMenu) => {
    const _activeMainMenu = menu.find(m => m.id === activeMainMenu)
    const siderMenu = (_activeMainMenu && _activeMainMenu.children) || []
    return siderMenu.map(m => {
      return {
        content: m.name,
        id: m.id
      }
    })
  }
  getFirstChild = (arr, result = []) => {
    result.push(arr[0].id)
    if (arr[0].children) {
      this.getFirstChild(arr[0].children, result)
    }
    return result
  }
  getDefaultActiveSiderMenu = currentSiderMenu => {
    const activeSiders = this.getFirstChild(currentSiderMenu)
    return activeSiders[activeSiders.length - 1]
  }
  render () {
    const { activeMainMenu, activeSiderMenu, mainMenu, siderMenu } = this.state
    return (
      <div>
        <Header
          mainMenu={mainMenu}
          activeMainMenu={activeMainMenu}
          setMainMenu={this.setMainMenu}
        />
        <div>
          {siderMenu.length > 0 && (
            <Sider
              siderMenu={siderMenu}
              activeSiderMenu={activeSiderMenu}
              setSiderMenu={this.setSiderMenu}
            />
          )}
          <div>
            <Route exact path='/a' component={A} />
          </div>
        </div>
      </div>
    )
  }
}
const A = () => <div>A</div>
export default Layout
