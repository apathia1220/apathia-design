import React from 'react';
import classNames from 'classnames';
export var TabsItem = function (props) {
    var label = props.label, isActive = props.isActive, className = props.className, children = props.children, disabled = props.disabled;
    var classes = classNames('tabs-content', className, {
        'tabs-content-active': isActive,
        'tabs-label-disabled': disabled
    });
    return (React.createElement("div", { key: label, className: classes }, children));
};
TabsItem.defaultProps = {
    disabled: false,
    isActive: false
};
TabsItem.displayName = 'TabsItem';
export default TabsItem;
