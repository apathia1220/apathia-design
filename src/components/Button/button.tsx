import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'

export type ButtonSize = 'lg' | 'sm'

export type ButtonType = 'primary' | 'default' | 'danger' | 'link'


interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children: ReactNode;
    href?: string
}

// ButtonHTMLAttributes<HTMLElement> 原生的button按钮所带的props属性
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
// AnchorHTMLAttributes<HTMLElement> 原生的a标签所自带的属性
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
    const {
        btnType,
        disabled,
        size,
        children,
        href,
        ...restProps
    } = props
    const classes = classNames('btn', {
        [`btn-type-${btnType}`]: btnType,
        [`btn-size-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    })
    if (btnType === 'link' && href) {
        return (
            <a
                href={href}
                className={classes}
                {...restProps}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: 'default'
}

export default Button