import React from 'react';
import { TabProps } from './tabs';
import { TabsItemProps } from './tabsItem';
declare type TabsComponent = React.FC<TabProps> & {
    Item?: React.FC<TabsItemProps>;
};
declare let TransTab: TabsComponent;
export default TransTab;
