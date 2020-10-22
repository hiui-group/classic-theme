import { useCallback } from 'react'
import { checkAuth } from '../util/common'

const useMainMenu = (menu, authority) => {
  const getMainMenuPath = useCallback((menu) => {
    if (menu.path) {
      return menu.path
    } else if (menu.children) {
      return getMainMenuPath(menu.children[0])
    }
  }, [])

  const getMainMenu = useCallback((menu, authority) => {
    return menu
      .map((m) => {
        return {
          name: m.name,
          id: m.id,
          icon: m.icon,
          target: m.target,
          path: getMainMenuPath(m) || '',
          component: m.component,
          children: m.children,
          authority: m.authority
        }
      })
      .filter((m) => m.name && checkAuth(authority, m.authority))
  }, [])

  return getMainMenu(menu, authority)
}

export default useMainMenu
