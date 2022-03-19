import React, { FC } from 'react';
import { ThemeProps } from '../Icon/icon';
export interface ProgressProps {
    /**
     * percent：当前上传任务的百分比
     * storkeHeight：进度条的高度
     * showText：是否显示百分比的数字
     * theme：上传进度的主题色
     */
    /**前上传任务的百分比 */
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
}
declare const Progress: FC<ProgressProps>;
export default Progress;
