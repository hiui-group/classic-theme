export const transformConfig = (config, parentId) => {
  config.forEach((c, index) => {
    c.id = c.id || (parentId || parentId === 0 ? `${parentId}-${index}` : index.toString())
    if (c.children) {
      transformConfig(c.children, c.id)
    }
  })
  return config
}
