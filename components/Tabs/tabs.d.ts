import React from 'react';
declare type TabStyle = "underline" | "outline";
export interface TabProps {
    /** 当前激活 tab 面板的 index，默认为0 */
    defaultIndex?: number;
    /** Tabs的样式，两种可选，默认为 underline */
    styleType?: TabStyle;
    /** 点击 Tab 触发的回调函数 */
    onSelect?: (selectedIndex: number) => void;
    /** 可以扩展的 className */
    className?: string;
}
/**
 * 选项卡切换组件。
 */
export declare const Tabs: React.FC<TabProps>;
export default Tabs;
