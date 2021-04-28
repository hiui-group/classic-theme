import { useCallback, useState, useLayoutEffect } from 'react'
import { findMenu, getAncestor, getDefaultActiveMenu } from '../util/common'
import _ from 'lodash'

const reg = /(http|https):\/\/([\w.]+\/?)\S*/gi

const useMenuCalculator = (menu, { location, history }, fallback, onMenuClick) => {
  const [currentMenu, setCurrentMenu] = useState(null)
  const [selectedMenus, setselectedMenus] = useState([])

  const onSelectMenu = useCallback(
    (selectMenu, doNavigate = true) => {
      const _selectedMenus = getAncestor(selectMenu.path, menu).reverse().concat(selectMenu)
      if (!_.isEqual(selectedMenus, _selectedMenus)) {
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
    const _currentMenu =
      location.pathname === '/'
        ? findMenu(location.pathname, menu) || getDefaultActiveMenu(menu)
        : findMenu(location.pathname, menu) || findMenu(fallback, menu) || getDefaultActiveMenu(menu)
    onSelectMenu(_currentMenu, !findMenu(location.pathname, menu))
    setCurrentMenu(_currentMenu)
  }, [location.pathname, menu, onSelectMenu])

  return { currentMenu, selectedMenus, onSelectMenu, defaultPath: getDefaultActiveMenu(menu).path }
}

export default useMenuCalculator
