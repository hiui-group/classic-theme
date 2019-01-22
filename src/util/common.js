import { createBrowserHistory, createHashHistory } from 'history'
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
    return _history.history || historyManager.createBrowserHistory()
  },
  listen: callback => {
    _history.history.listen((location, action) => {
      callback(location, action)
    })
  }
}
export default historyManager
