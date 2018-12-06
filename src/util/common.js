import {createBrowserHistory, createHashHistory} from 'history'
const _history = {}
const historyManager = {
  setHistory: (_h) => {
    const h = _h ? createHashHistory() : createBrowserHistory()
    _history.history = h
    return h
  },
  getHistory: () => {
    return _history.history
  }
}
export default historyManager
