export const transformConfig = (config, parentId) => {
  config.forEach((c, index) => {
    c.id = c.id || (parentId || parentId === 0 ? `${parentId}-${index}` : index)
    if (c.children) {
      transformConfig(c.children, c.id)
    }
  })
  return config
}
