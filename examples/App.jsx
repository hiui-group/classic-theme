import React, { Component } from 'react'
import './App.scss'
import { HashRouter as Router, Route, Link } from '../src'
import DefaultTheme from './example-classic'
import GenuineTheme from './example-genuine'
import OpenPng from './open.png'
class App extends Component {
  constructor () {
    super()
    this.state = {
      show: false
    }
  }

  render () {
    return (
      <Router>
        <div>
          <div className='theme-change'>
            {/* <span className='open' /> */}
            <img src={OpenPng} height={32} width={24} onClick={() => this.setState({show: !this.state.show})} />
            {
              this.state.show && <ul>
                <li>
                  <Link to='/'>default</Link>
                </li>
                <li>
                  <Link to='/genuine/home'>genuine</Link>
                </li>
              </ul>
            }
          </div>
          <Route exact path='/' component={DefaultTheme} />
          <Route path='/genuine/:type' component={GenuineTheme} />
        </div>
      </Router>
    )
  }
}

export default App
