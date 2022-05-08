import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Button from "../Button";
import { ButtonType } from "../Button/button";

type modelVlaue = 'success' | 'info' | 'error' | 'warning' | 'confirm'

export interface ModalProps {
    /** 对话框是否可见 */
    visible?: boolean;
    /** 模式选择 */
    model?: modelVlaue;
    /** 标题 */
    title?: string;
    /** 是否显示右上方关闭按钮 */
    closeable?: boolean;
    /** 点击确定的回调 */
    onOk?: (e: React.MouseEvent<HTMLElement>) => void;
    /** 点击取消的回调 */
    onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
    afterClose?: () => void;
    /** 垂直居中 */
    center?: boolean;
    /** 宽度 */
    width?: string | number;
    /** 底部内容 */
    footer?: React.ReactNode;
    /** 确认按钮文字 */
    okText?: React.ReactNode;
    /** 取消按钮文字 */
    cancelText?: React.ReactNode;
    /** 确认按钮类型 */
    okType?: ButtonType;
    /** 点击蒙层是否允许关闭 */
    maskClosable?: boolean;
    /** 关闭按钮图标 */
    closeIcon?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {
    const {
        title,
        onOk,
        onCancel,
        closeable,
        visible,
        center,
        footer,
        okText,
        okType,
        cancelText,
        closeIcon,
        afterClose,
        children
    } = props
    const modalClass = classNames('apathia-modal')
    const maskRef = useRef<HTMLDivElement>(null)

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        onCancel?.(e)
        afterClose?.()
    }

    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        onOk?.(e)
        afterClose?.()
    }

    const renderFooter = () => {
        return footer
        ? footer
        :(
        <>
            <Button btnType={ okType ? okType : 'default'} onClick={handleCancel}>
                {cancelText ? cancelText : '取消'}
            </Button>
            <Button btnType={ okType ? okType : 'primary'} onClick={handleOk}>
                {okText ? okText : '确认'}
            </Button>
        </>
        )
    }

    const renderCloseIcon = () => {
        return closeable 
            ? ''
            :(
                <div className="modal-close-button" onClick={handleCancel}>
                    { closeIcon ? closeIcon : '×'}
                </div>
            )
    }
    
    return visible? ReactDOM.createPortal(
            <div className={ modalClass }>
                <div className="modal-mask" ref={maskRef} onClick={closeable ? onCancel : () => { }}/>
                <div className="modal-wrap">
                    <div className="modal-head">
                            { renderCloseIcon() }
                        <div className="modal-title">{ title }</div>
                    </div>
                    <div className="modal-content">
                        { children }
                    </div>
                    <div className="modal-footer">
                        {
                            renderFooter()
                        }
                    </div>
                </div>
            </div>
        , document.querySelector('body') as HTMLBodyElement)
        : null
}

export default Modal

Modal.defaultProps = {
    visible: false,
    title: 'Title'
}