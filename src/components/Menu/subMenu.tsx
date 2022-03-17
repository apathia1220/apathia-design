import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'

export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className }) => {
    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    const [menuOpen, setOpen] = useState(isOpend)
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    })

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen(!menuOpen)
    }

    let timer: any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setOpen(toggle)
        }, 300)
    }
    //垂直时需要点击才会展开
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}
    //水平时鼠标经过就会显示
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
    } : {}
    const renderChildren = () => {
        // 在子组件上添加点击后的类名
        const submenuClasses = classNames('apathia-submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            if (childElement.type.name === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${context.index}-${i}`
                })
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
        return (
            /**
             * in:表示动画出现的条件
             * timeout:动画的持续时间
             */
            <Transition
                in={menuOpen}
                timeout={300}
                animation="zoom-in-top"
            >
                <ul className={submenuClasses}>
                    {childrenComponent}
                </ul>
            </Transition>
        )
    }

    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className={'submenu-title'} {...clickEvents}>
                {title}
                <Icon icon="angle-down" className="arrow-icon" />
            </div>
            { renderChildren()}
        </li>
    )
}

export default SubMenu