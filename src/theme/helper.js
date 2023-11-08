/**
 * react-router 6 版本中，如果设置了 basename，当访问路由前缀没有加上 basename 时会报错
 * 详见：https://github.com/remix-run/react-router/issues/8427
 * 此函数用来兼容该问题
 * @param {*} basename
 * @param {*} fallback
 */
export const basenameFallbackPolyfill = ({ basename = '/', fallback = '', historyType = 'browserHistory' }) => {
  const { pathname, hash } = window.location
  let _basename = basename

  if (!_basename.startsWith('/')) {
    _basename = `/${_basename}`
  }

  // 此场景无需处理，可以正常跳转
  if (_basename === '/') {
    return
  }

  if (historyType === 'hashHistory') {
    if (!hash || !hash.replace('#', '').startsWith(_basename)) {
      window.location.assign(`/#${_basename}${fallback}`)
    }
  } else {
    if (pathname !== _basename && !pathname.startsWith(_basename)) {
      window.location.assign(`${_basename}${fallback}`)
    }
  }
}
