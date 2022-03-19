import classNames from 'classnames';
import React, { createContext, useState } from 'react';
export var MenuContext = createContext({ index: '0' });
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单
 */
var Menu = function (props) {
    var className = props.className, mode = props.mode, style = props.style, children = props.children, defaultIndex = props.defaultIndex, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames('apathia-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    });
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus
    };
    var renderChildren = function () {
        /**
         * 判断子节点是不是menuItem
         * 如果不是抛出错误
         */
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.name;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // 自动添加index
                return React.cloneElement(childElement, { index: index.toString() });
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
};
export default Menu;
