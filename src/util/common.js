import {createBrowserHistory, createHashHistory} from 'history'
const _history = {}
const historyManager = {
  createBrowserHistory: (_h) => {
    const h = createBrowserHistory()
    _history.history = h
    return h
  },
  createHashHistory: () => {
    const h = createHashHistory()
    _history.history = h
    return h
  },
  getHistory: () => {
    return _history.history
  }
}
export default historyManager
