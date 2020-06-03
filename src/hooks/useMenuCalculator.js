import { useCallback, useState, useEffect } from 'react'
import { findMenu, getAncestor, getDefaultActiveMenu } from '../util/common'

const useMenuCalculator = (menu, location, fallback) => {
  const [currentMenu, setCurrentMenu] = useState(null)
  const [selectedMenus, setselectedMenus] = useState([])
  const onSelectMenu = useCallback((selectMenu) => {
    const _selectedMenus = getAncestor(selectMenu.path, menu).reverse().concat(selectMenu)
    setselectedMenus(_selectedMenus)
  }, [menu])
  useEffect(() => {
    const _currentMenu =
    findMenu(location.pathname, menu) || findMenu(fallback, menu) || getDefaultActiveMenu(menu)
    onSelectMenu(_currentMenu)
    setCurrentMenu(_currentMenu)
  }, [location.pathname, menu])

  return {currentMenu, selectedMenus, onSelectMenu}
}

export default useMenuCalculator
