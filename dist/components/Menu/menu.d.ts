import React, { ReactNode } from 'react';
declare type MenuMode = 'horizontal' | 'vertical';
declare type SelectCallback = (selectedIndex: string) => void;
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
export declare const MenuContext: React.Context<ImenuContext>;
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单
 */
declare const Menu: React.FC<MenuProps>;
export default Menu;
