import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import './style/index.scss'
import { Icon } from '@hi-ui/hiui'
import Expander from './Expander'

const NormalMenu = ({expandedId, menu, setExpandedId, selectedMenus, level, renderChildren}) => {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (expandedId.includes(menu.id)) {
      setExpanded(true)
    } else {
      setExpanded(false)
    }
  }, [expandedId])

  return <div className={'sider__menu-item'} key={menu.id}>
    <div
      onClick={() => {
        let _expandedId = [...expandedId]
        if (_expandedId.includes(menu.id)) {
          _expandedId = _expandedId.filter((id) => id !== menu.id)
        } else {
          _expandedId.push(menu.id)
        }
        setExpandedId(_expandedId)
        setExpanded(!expanded)
      }}
      style={{ paddingLeft: level * 16 }}
      className={classNames('menu__title', {
        'menu__title--active':
        selectedMenus &&
        selectedMenus.map((sm) => sm.id).includes(menu.id) &&
        menu.id !==
          (selectedMenus && selectedMenus.map((sm) => sm.id)[selectedMenus.length - 1]),
        'menu__leaf-title--active':
        menu.id ===
        (selectedMenus && selectedMenus.map((sm) => sm.id)[selectedMenus.length - 1])
      })}
    >
      <span>
        <Icon name={menu.icon || 'user'} />
        { menu.name}
      </span>

      {menu.children && menu.children.length > 0 && (
        <Icon name={expandedId.includes(menu.id) ? 'up' : 'down'} />
      )}
    </div>
    {menu.children && menu.children.length > 0 && <Expander expanded={expanded} >{renderChildren(menu.children, selectedMenus, level + 1, expandedId)}</Expander>}
  </div>
}

export default NormalMenu
