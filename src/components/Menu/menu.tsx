import classNames from 'classnames'
import React, { ReactNode, createContext, useState } from 'react'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void
export interface MenuProps {
    /**
     * defaultIndex:选中的menu的index
     * mode：menu的布局方向，水平或垂直
     * onSelect：选中回调函数
     * defaultOpenSubMenus：垂直状态时，默认展开的subMenu
     */
    /** 默认 active 的菜单项的索引值 */
    defaultIndex?: string;
    className?: string;
    /** 	菜单类型 横向或者纵向 */
    mode?: MenuMode;
    style?: React.CSSProperties;
    children?: ReactNode;
    /** 点击菜单项触发的回掉函数 */
    onSelect?: SelectCallback;
    defaultOpenSubMenus?: string[];
}
interface ImenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<ImenuContext>({ index: '0' })
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单
 */
const Menu: React.FC<MenuProps> = (props) => {
    const {
        className,
        mode,
        style,
        children,
        defaultIndex,
        onSelect,
        defaultOpenSubMenus
    } = props
    const [currentActive, setActive] = useState(defaultIndex)
    const classes = classNames('apathia-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })
    const handleClick = (index: string) => {
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }

    }
    const passedContext: ImenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus
    }
    const renderChildren = () => {
        /**
         * 判断子节点是不是menuItem
         * 如果不是抛出错误
         */
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const displayName = childElement.type.name

            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // 自动添加index
                return React.cloneElement(childElement, { index: index.toString() })
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
    }

    return (
        <ul className={classes} style={style} >
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}
export default Menu