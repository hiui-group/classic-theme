const config = [
  { name: '手机', children: [{ name: '小米' }, { name: '红米' }, { name: '黑鲨' }] },
  { name: '电视' },
  { name: '智能硬件', children: [{ name: '路由器' }, { name: '音响' }, { name: '扫地机器人' }] }
]

const transformConfig = (config, parentId) => {
  config.forEach((c, index) => {
    c.id = parentId || parentId === 0 ? `${parentId}-${index}` : index
    if (c.children) {
      transformConfig(c.children, c.id)
    }
  })
  return config
}
export default transformConfig(config)
