import classNames from "classnames";
import React, { useRef } from "react";
import ReactDOM from "react-dom";
import Button from "../Button";
var Modal = function (props) {
    var title = props.title, onOk = props.onOk, onCancel = props.onCancel, closeable = props.closeable, visible = props.visible, center = props.center, footer = props.footer, okText = props.okText, okType = props.okType, cancelText = props.cancelText, closeIcon = props.closeIcon, afterClose = props.afterClose, children = props.children;
    var modalClass = classNames('apathia-modal');
    var maskRef = useRef(null);
    var handleCancel = function (e) {
        onCancel === null || onCancel === void 0 ? void 0 : onCancel(e);
        afterClose === null || afterClose === void 0 ? void 0 : afterClose();
    };
    var handleOk = function (e) {
        onOk === null || onOk === void 0 ? void 0 : onOk(e);
        afterClose === null || afterClose === void 0 ? void 0 : afterClose();
    };
    var renderFooter = function () {
        return footer
            ? footer
            : (React.createElement(React.Fragment, null,
                React.createElement(Button, { btnType: okType ? okType : 'default', onClick: handleCancel }, cancelText ? cancelText : '取消'),
                React.createElement(Button, { btnType: okType ? okType : 'primary', onClick: handleOk }, okText ? okText : '确认')));
    };
    var renderCloseIcon = function () {
        return closeable
            ? ''
            : (React.createElement("div", { className: "modal-close-button", onClick: handleCancel }, closeIcon ? closeIcon : '×'));
    };
    return ReactDOM.createPortal(React.createElement("div", { className: modalClass },
        React.createElement("div", { className: "modal-mask", ref: maskRef, onClick: closeable ? onCancel : function () { } }),
        React.createElement("div", { className: "modal-wrap" },
            React.createElement("div", { className: "modal-head" },
                renderCloseIcon(),
                React.createElement("div", { className: "modal-title" }, title)),
            React.createElement("div", { className: "modal-content" }, children),
            React.createElement("div", { className: "modal-footer" }, renderFooter()))), document.querySelector('body'));
};
export default Modal;
Modal.defaultProps = {
    visible: false,
    title: 'Title'
};
