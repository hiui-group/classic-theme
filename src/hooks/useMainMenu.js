import { useCallback } from 'react'

const useMainMenu = (menu) => {
  const getMainMenuPath = useCallback((menu) => {
    if (menu.path) {
      return menu.path
    } else if (menu.children) {
      return getMainMenuPath(menu.children[0])
    }
  }, [])

  const getMainMenu = useCallback((menu) => {
    return menu.map((m) => {
      return {
        content: m.name,
        id: m.id,
        icon: m.icon,
        target: m.target,
        path: getMainMenuPath(m) || '',
        component: m.component
      }
    })
  }, [])

  return getMainMenu(menu)
}

export default useMainMenu
