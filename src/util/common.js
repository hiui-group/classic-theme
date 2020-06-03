import { matchPath } from 'react-router'

export const transformConfig = (config, parentId) => {
  config.forEach((c, index) => {
    c.id = c.id || (parentId || parentId === 0 ? `${parentId}-${index}` : index.toString())
    if (c.children) {
      transformConfig(c.children, c.id)
    }
  })
  return config
}

export const findMenu = (path, data) => {
  let node
  data.forEach((d, index) => {
    if (
      d.pathname === path ||
      d.path === path ||
      matchPath(path, {
        path: d.path || d.pathname,
        exact: true
      })
    ) {
      node = d
    } else {
      if (d.children && findMenu(path, d.children)) {
        node = findMenu(path, d.children)
      }
    }
  })
  return node
}

// 寻找某一节点的父节点
export const getParent = (path, data) => {
  let parent
  data.forEach((item) => {
    if (item.children) {
      if (
        item.children.some(
          (child) =>
            child.path === path ||
            matchPath(path, {
              path: child.path,
              exact: true
            }) ||
            child.id === path
        )
      ) {
        parent = item
      } else if (getParent(path, item.children)) {
        parent = getParent(path, item.children)
      }
    }
  })
  return parent
}

// 寻找某一节点的所有祖先节点
export const getAncestor = (path, data, arr = []) => {
  if (getParent(path, data)) {
    const parent = getParent(path, data)
    arr.push(parent)
    getAncestor(parent.path || parent.id, data, arr)
  }
  return arr
}
// 寻找默认需要高亮的菜单
export const getDefaultActiveMenu = (menu, idx = 0) => {
  if (menu[idx] && menu[idx].path) {
    return menu[idx]
  } else if (menu[idx] && menu[idx].children) {
    return getDefaultActiveMenu(menu[idx].children)
  } else {
    return getDefaultActiveMenu(menu, idx + 1)
  }
}

// 根据菜单筛选出路由项
export const getRoutes = (menu, routes = []) => {
  menu.forEach((item) => {
    if (item.component) {
      routes.push(item)
    }
    if (item.children) {
      getRoutes(item.children, routes)
    }
  })
  return routes
}
// 过滤没有 name 的 menu
export const filterMenu = (menu) => {
  return menu.filter((item) => {
    if (item.children) {
      item.children = (filterMenu(item.children).length > 0 && filterMenu(item.children)) || null
    }
    return item.name
  })
}
