import React, { useCallback, useState, useEffect } from 'react'
// import Menu from './menu'
import classNames from 'classnames'
import './style/index.scss'
import { Icon, Tooltip } from '@hi-ui/hiui'
import NormalMenu from './NormalMenu'
import PopperMenu from './PopperMenu'
// const reg = /(http|https):\/\/([\w.]+\/?)\S*/gi

const Sider = ({
  siderMenu,
  siderTopRender,
  siderBottomRender,
  selectedMenus,
  logo,
  login,
  setSiderMenu,
  history,
  getInitNav,
  color,
  accordion
}) => {
  const [mini, toggleMini] = useState(false)
  const [expandedId, setExpandedId] = useState([])
  const [visiblePopper, setVisiblePopper] = useState(null)

  useEffect(() => {
    setExpandedId(selectedMenus.map((sm) => sm.id))
  }, [])

  const renderMiniChildren = (menu, selectedMenus) => {
    return menu.map((m) => {
      return (
        <div className={'sider__menu-item'} key={m.id}
          onMouseEnter={() => {
            setVisiblePopper(m.id)
          }}
          onClick={() => {
            setVisiblePopper(null)
          }}
        >
          <Tooltip title={m.name} placement='right' visible={visiblePopper === m.id}>
            <PopperMenu menu={m} selectedMenus={selectedMenus} />
          </Tooltip>
        </div>
      )
    })
  }
  const renderChildren = useCallback(
    (menu, selectedMenus, level = 1, expandedId) => {
      return menu.map((m) => {
        return (<NormalMenu key={m.id} menu={m} setExpandedId={setExpandedId} expandedId={expandedId} level={level} selectedMenus={selectedMenus} renderChildren={renderChildren} />)
      })
    },
    []
  )
  return (
    <div className={classNames('hi-theme__sider', { 'hi-theme__sider--mini': mini })}>
      {logo && <div className={classNames('sider__logo', { mini: mini })}>{logo}</div>}
      {siderTopRender && siderTopRender(mini)}
      {siderMenu.length > 0 && (
        <div className='sider__menu'>
          {mini
            ? renderMiniChildren(siderMenu, selectedMenus)
            : renderChildren(siderMenu, selectedMenus, 1, expandedId)}
        </div>
      )}
      {siderBottomRender && siderBottomRender(mini)}
      <div className='sider__footer'>
        <Icon
          name='list'
          onClick={() => {
            const _mini = !mini
            toggleMini(_mini)
          }}
        />
        {login && (
          <div className={'login__wrapper'}>
            <Icon name={login.icon} />
            {login.name}
          </div>
        )}
      </div>
    </div>
  )
}

export default Sider
