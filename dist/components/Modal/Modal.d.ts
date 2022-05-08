import React from "react";
import { ButtonType } from "../Button/button";
declare type modelVlaue = 'success' | 'info' | 'error' | 'warning' | 'confirm';
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
declare const Modal: React.FC<ModalProps>;
export default Modal;
