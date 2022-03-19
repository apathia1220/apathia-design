import React from 'react'
import Menu, { MenuProps } from './menu'
import SubMenu, { SubMenuProps } from './subMenu'
import MenuItem, { MenuItemProps } from './menuItem'

// 交叉类型定义
export type IMenuComponent = React.FC<MenuProps> & {
    Item: React.FC<MenuItemProps>,
    SubMenu: React.FC<SubMenuProps>
}
const TransMenu = Menu as IMenuComponent

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu