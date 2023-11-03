import { isEqual, cloneDeep } from 'lodash'
import { useCallback, useState, useLayoutEffect, useMemo } from 'react'
import { findMenu, getAncestor, getDefaultActiveMenu, getNamedParent, parsePath } from '../util/common'

const reg = /(http|https):\/\/([\w.]+\/?)\S*/gi

const useMenuCalculator = ({
  menu,
  location,
  history,
  fallback,
  onMenuClick,
  disabledAutoFallback,
  basename,
  historyType
}) => {
  const getCurrentMenu = useCallback(
    (menu) => {
      if (menu && menu.length > 0) {
        const _currentMenu =
          location.pathname === '/'
            ? findMenu(location.pathname, menu) || (disabledAutoFallback ? null : getDefaultActiveMenu(menu))
            : findMenu(location.pathname, menu) ||
              findMenu(fallback, menu) ||
              (disabledAutoFallback ? null : getDefaultActiveMenu(menu))

        return _currentMenu
      }
      return null
    },
    [location.pathname, fallback]
  )

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
        } else if (selectMenu.target) {
          window.open(parsePath({ path: selectMenu.path, basename, historyType }), selectMenu.target)
        } else {
          history.push(selectMenu.path)
        }
        onMenuClick && onMenuClick(selectMenu)
      }
    },
    [menu, selectedMenus, onMenuClick]
  )

  useLayoutEffect(() => {
    const _menu = menu
    const nextMenu = getCurrentMenu(_menu)

    if (nextMenu) {
      onSelectMenu(nextMenu, !findMenu(location.pathname, _menu))
    }
  }, [location.pathname, menu, onSelectMenu, getCurrentMenu])

  const currentMenu = useMemo(() => {
    const _menu = cloneDeep(menu)
    return getCurrentMenu(_menu)
  }, [getCurrentMenu, menu])

  const activeMenuId = useMemo(() => {
    if (!currentMenu) return ''
    if (!currentMenu.name || currentMenu.hideInMenu) {
      return getNamedParent(currentMenu.path, menu)?.id ?? ''
    } else {
      return currentMenu.id
    }
  }, [menu, currentMenu?.id, find])

  return {
    activeMenuId,
    currentMenu,
    selectedMenus,
    onSelectMenu,
    defaultPath: disabledAutoFallback ? null : getDefaultActiveMenu(menu).path
  }
}

export default useMenuCalculator
