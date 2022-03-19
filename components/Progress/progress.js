import React from 'react';
var Progress = function (props) {
    /**
     * 上传文件的进度条显示
     */
    var percent = props.percent, strokeHeight = props.strokeHeight, showText = props.showText, styles = props.styles, theme = props.theme;
    return (React.createElement("div", { className: "apathia-progress-bar", style: styles },
        React.createElement("div", { className: "apathia-progress-bar-outer", style: { height: "".concat(strokeHeight, "px") } },
            React.createElement("div", { className: "apathia-progress-bar-inner color-".concat(theme), style: { width: "".concat(percent, "%") } }, showText && React.createElement("span", { className: "inner-text" }, "".concat(percent, "%"))))));
};
Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: "primary",
};
export default Progress;
