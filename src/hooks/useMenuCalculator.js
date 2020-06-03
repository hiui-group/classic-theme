import { useCallback, useState, useEffect } from 'react'
import { findMenu, getAncestor, getDefaultActiveMenu } from '../util/common'

const reg = /(http|https):\/\/([\w.]+\/?)\S*/gi

const useMenuCalculator = (menu, { location, history }, fallback) => {
  const [currentMenu, setCurrentMenu] = useState(null)
  const [selectedMenus, setselectedMenus] = useState([])

  const onSelectMenu = useCallback(
    (selectMenu) => {
      const _selectedMenus = getAncestor(selectMenu.path, menu).reverse().concat(selectMenu)
      setselectedMenus(_selectedMenus)
      if (selectMenu.path.match(reg)) {
        window.open(selectMenu.path, selectMenu.target || '_blank')
      } else {
        history.push(selectMenu.path)
      }
    },
    [menu]
  )

  useEffect(() => {
    const _currentMenu =
      findMenu(location.pathname, menu) || findMenu(fallback, menu) || getDefaultActiveMenu(menu)
    onSelectMenu(_currentMenu)
    setCurrentMenu(_currentMenu)
  }, [location.pathname, menu])

  return { currentMenu, selectedMenus, onSelectMenu }
}

export default useMenuCalculator
