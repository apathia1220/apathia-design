import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import React, { ChangeEvent, InputHTMLAttributes, ReactElement } from 'react'
import Icon from '../Icon/icon'

type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    // 是否禁用Input
    disabled?: boolean;
    // 设置input大小
    size?: InputSize;
    // 添加图标，在input框右侧悬浮一个图标，用于提示
    icon?: IconProp;
    // 添加前缀
    prepend?: string | ReactElement;
    // 添加后缀
    append?: string | ReactElement;
    // 输入框改变的回调
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputProps> = (props) => {
    const {
        disabled,
        size,
        icon,
        prepend,
        append,
        style,
        ...resProps
    } = props
    const cnames = classNames('apathia-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend
    })

    const fixControlledValue = (value: any) => {
        /**
         * 判断如果将input框设为受控组件时
         * 初始设置state时，不设置值时会为undefined，会报错
         * 此处如果设置时将value设置为空字符''
         */
        if (typeof value === 'undefined' || value === null) {
            return ''
        }
        return value
    }
    if ('value' in props) {
        /**
         * 在defaultvalue和value同时存在时，去除default value
         */
        delete resProps.defaultValue
        resProps.value = fixControlledValue(props.value)
    }

    return (
        <div className={cnames} style={style}>
            {prepend && <div className='apathia-input-group-prepend'>{prepend}</div>}
            {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div>}
            <input
                className="apathia-input-inner"
                disabled={disabled}
                {...resProps}
            />
            {append && <div className="apathia-input-group-append">{append}</div>}
        </div>
    )
}

export default Input