import React, { FC } from 'react'
import { ThemeProps } from '../Icon/icon'
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

const Progress: FC<ProgressProps> = (props) => {
    /**
     * 上传文件的进度条显示
     */
    const {
        percent,
        strokeHeight,
        showText,
        styles,
        theme,
    } = props
    return (
        <div className="apathia-progress-bar" style={styles}>
            <div className="apathia-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
                <div
                    className={`apathia-progress-bar-inner color-${theme}`}
                    style={{ width: `${percent}%` }} // 通过设置宽度百分比来显示进度
                >
                    {showText && <span className="inner-text">{`${percent}%`}</span>}
                </div>
            </div>
        </div>
    )
}

Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: "primary",
}
export default Progress;
