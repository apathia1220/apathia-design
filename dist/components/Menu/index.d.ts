import React from 'react';
import { MenuProps } from './menu';
import { SubMenuProps } from './subMenu';
import { MenuItemProps } from './menuItem';
export declare type IMenuComponent = React.FC<MenuProps> & {
    Item: React.FC<MenuItemProps>;
    SubMenu: React.FC<SubMenuProps>;
};
declare const TransMenu: IMenuComponent;
export default TransMenu;
