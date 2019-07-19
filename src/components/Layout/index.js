import React from 'react'
import Header from '../HeaderLayout'
import Sider from '../SiderLayout2'
import { BrowserRouter as Router, Route } from 'react-router-dom'
class Layout extends React.Component {
  state = { activeMainMenu: '', activeSiderMenu: '' }
  setMainMenu = activeMainMenu => {
    this.setState({ activeMainMenu })
  }
  setSiderMenu = activeSiderMenu => {
    this.setState({ activeSiderMenu })
  }

  getMainMenu = menu => {
    return menu.map(m => {
      return {
        content: m.name,
        id: m.id,
        pathname: m.path || (m.children && m.children[0] && m.children[0].path) || ''
      }
    })
  }
  getSiderMenu = menu => {
    const activeMainMenu = this.state.activeMainMenu || menu[0].id
    const _activeMainMenu = menu.find(m => m.id === activeMainMenu)
    const siderMenu = (_activeMainMenu && _activeMainMenu.children) || []
    return siderMenu.map(m => {
      return {
        content: m.name,
        id: m.id
        // pathname: m.path || (m.children && m.children[0] && m.children[0].path) || ''
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
  getDefaultActiveSiderMenu = menu => {
    const currentSiderMenu = this.getSiderMenu(menu)
    const activeSiders = this.getFirstChild(currentSiderMenu)
    return activeSiders[activeSiders.length - 1]
  }
  render () {
    const { menu } = this.props
    const { activeMainMenu, activeSiderMenu } = this.state
    const mainMenu = this.getMainMenu(menu)
    const siderMenu = this.getSiderMenu(menu)
    return (
      <Router>
        <div>
          <Header
            mainMenu={mainMenu}
            activeMainMenu={activeMainMenu || mainMenu[0].id}
            setMainMenu={this.setMainMenu}
          />
          <div>
            {siderMenu.length > 0 && (
              <Sider
                siderMenu={siderMenu}
                activeSiderMenu={activeSiderMenu || this.getDefaultActiveSiderMenu(menu)}
                setSiderMenu={this.setSiderMenu}
              />
            )}
            <div>
              <Route exact path='/a' component={A} />
            </div>
          </div>
        </div>
      </Router>
    )
  }
}
const A = () => <div>A</div>
export default Layout
