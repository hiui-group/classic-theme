import { isEqual, cloneDeep } from 'lodash'
import { useCallback, useState, useLayoutEffect } from 'react'
import { findMenu, getAncestor, getDefaultActiveMenu } from '../util/common'

const reg = /(http|https):\/\/([\w.]+\/?)\S*/gi

const useMenuCalculator = (menu, { location, history }, fallback, onMenuClick) => {
  const getCurrentMenu = useCallback(
    (menu) => {
      if (menu && menu.length > 0) {
        const _currentMenu =
          location.pathname === '/'
            ? findMenu(location.pathname, menu) || getDefaultActiveMenu(menu)
            : findMenu(location.pathname, menu) || findMenu(fallback, menu) || getDefaultActiveMenu(menu)

        return _currentMenu
      }
      return null
    },
    [location.pathname, fallback]
  )

  const [currentMenu, setCurrentMenu] = useState(() => getCurrentMenu(cloneDeep(menu)))
  const [selectedMenus, setselectedMenus] = useState([])

  const onSelectMenu = useCallback(
    (selectMenu, doNavigate = true) => {
      const _selectedMenus = getAncestor(selectMenu.path, menu).reverse().concat(selectMenu)
      if (!isEqual(selectedMenus, _selectedMenus)) {
        setselectedMenus(_selectedMenus)
      }
      if (doNavigate) {
        if (selectMenu.path.match(reg)) {
          window.open(selectMenu.path, selectMenu.target || '_blank')
        } else {
          history.push(selectMenu.path)
        }
        onMenuClick && onMenuClick(selectMenu)
      }
    },
    [menu, selectedMenus, onMenuClick]
  )

  useLayoutEffect(() => {
    const _menu = cloneDeep(menu)
    const nextMenu = getCurrentMenu(_menu)

    if (nextMenu) {
      onSelectMenu(nextMenu, !findMenu(location.pathname, _menu))
      setCurrentMenu(nextMenu)
    }
  }, [location.pathname, menu, onSelectMenu])

  return { currentMenu, selectedMenus, onSelectMenu, defaultPath: getDefaultActiveMenu(menu).path }
}

export default useMenuCalculator
