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
