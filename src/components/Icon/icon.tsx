import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps
}

const Icon: React.FC<IconProps> = (props) => {
    // icon-primary
    const { className, theme, ...restProps } = props
    const classes = classNames('apathia-icon', className, {
        // 根据传入的不同主题生成不同的class名称
        // 不同的class对应不同的主题颜色
        [`icon-${theme}`]: theme
    })
    return (
        <FontAwesomeIcon className={classes} {...restProps} />
    )
}

export default Icon