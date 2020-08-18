import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import './style/index.scss'
import Icon from '../icon'
import Expander from './Expander'

const NormalMenu = ({
  expandedId,
  menu,
  setExpandedId,
  selectedMenus,
  level,
  renderChildren,
  onSelectMenu,
  sibling,
  accordion
}) => {
  const [expanded, setExpanded] = useState(false)

  const [isManul, setIsManul] = useState(false)

  useEffect(() => {
    if (expandedId.includes(menu.id)) {
      setExpanded(true)
    } else {
      setExpanded(false)
    }
  }, [expandedId])

  return (
    <div className={'sider__menu-item'} key={menu.id}>
      <div
        onClick={() => {
          let _expandedId = [...expandedId]
          if (_expandedId.includes(menu.id)) {
            _expandedId = _expandedId.filter((id) => id !== menu.id)
          } else {
            if (accordion) {
              _expandedId = _expandedId.filter((id) => {
                return !sibling.map((m) => m.id).includes(id)
              })
            }
            _expandedId.push(menu.id)
          }
          setExpandedId(_expandedId)
          setExpanded(!expanded)
          setIsManul(true)
          if (menu.path) {
            onSelectMenu(menu)
          }
        }}
        style={{ paddingLeft: level * 16 }}
        className={classNames('menu__title', {
          'menu__title--active':
            selectedMenus &&
            selectedMenus.map((sm) => sm.id).includes(menu.id) &&
            menu.id !== (selectedMenus && selectedMenus.map((sm) => sm.id)[selectedMenus.length - 1]),
          'menu__leaf-title--active':
            menu.id === (selectedMenus && selectedMenus.map((sm) => sm.id)[selectedMenus.length - 1])
        })}
      >
        <span>
          <Icon name={menu.icon || 'user'} />
          {menu.name}
        </span>

        {menu.children && menu.children.length > 0 && (
          <Icon
            style={{
              display: 'inline-block',
              transition: 'transform 0.3s',
              transform: expandedId.includes(menu.id) ? 'rotate(180deg)' : 'rotate(0)'
            }}
            name={'down'}
          />
        )}
      </div>
      {menu.children && menu.children.length > 0 && (
        <Expander expanded={expanded} isManul={isManul}>
          {renderChildren(menu.children, selectedMenus, level + 1, expandedId)}
        </Expander>
      )}
    </div>
  )
}

export default NormalMenu
