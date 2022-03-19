var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import classNames from 'classnames';
import React, { useEffect, useRef, useState, } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import useDebounce from '../../hooks/useDebounce';
import Icon from '../Icon/icon';
import Input from '../Input/input';
import Transition from '../Transition/transition';
var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, renderOption = props.renderOption, value = props.value, restProps = __rest(props
    /**
     * inputValue：输入框值的state
     * suggestion：经过筛选后的数据的state
     * loading：请求响应返回之前
     * showDropdown：显示自动补全的state
     * highlightIndex：选中需要高亮的数据的id的state
     */
    , ["fetchSuggestions", "onSelect", "renderOption", "value"]);
    /**
     * inputValue：输入框值的state
     * suggestion：经过筛选后的数据的state
     * loading：请求响应返回之前
     * showDropdown：显示自动补全的state
     * highlightIndex：选中需要高亮的数据的id的state
     */
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSugestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(false), showDropdown = _d[0], setShowDropdown = _d[1];
    var _e = useState(-1), highlightIndex = _e[0], setHighlightIndex = _e[1];
    /**
     * triggerSearch: 标记是否发起请求
     * componentRef：标记需要进行DOM操作的节点的ref
     */
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    // 防抖处理
    var debouncedValue = useDebounce(inputValue, 300);
    // 点击dropdown外时将数据列表设置为空
    useClickOutside(componentRef, function () { setSugestions([]); });
    useEffect(function () {
        if (debouncedValue && triggerSearch.current) {
            // 每次输入时将显示数据列表设置为空
            setSugestions([]);
            // 经过处理后的数据结果
            var results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                //判断是不是promise
                setLoading(true);
                results.then(function (data) {
                    //数据返回之前将loading设置为false，并且将数据设置到显示数据列表中
                    setLoading(false);
                    setSugestions(data);
                    if (data.length > 0) {
                        // 先死数据列表不为空是显示
                        setShowDropdown(true);
                    }
                });
            }
            else {
                setSugestions(results);
                setShowDropdown(true);
                if (results.length > 0) {
                    setShowDropdown(true);
                }
            }
        }
        else {
            // 没有数据或者在选中后不显示补全数据
            setShowDropdown(false);
        }
        // 每次补全之后将高亮的选中取消
        setHighlightIndex(-1);
    }, [debouncedValue, fetchSuggestions]);
    var highlight = function (index) {
        // 设置选中高亮的项
        // 限制index在显示数据中，到最上面和最下面时不会一移动
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.key) {
            case 'Enter':
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 'ArrowUp':
                highlight(highlightIndex - 1);
                break;
            case 'ArrowDown':
                highlight(highlightIndex + 1);
                break;
            case 'Escape':
                setShowDropdown(false);
                break;
            default:
                break;
        }
    };
    var handleChange = function (e) {
        /**
         * input发生变化时
         */
        var value = e.target.value.trim();
        setInputValue(value);
        // 设置可以发送搜索请求
        triggerSearch.current = true;
    };
    var handleSelect = function (item) {
        // 选中后将选中的值设置到input中
        setInputValue(item.value);
        // 选中之后不显示补全后的数据了
        setShowDropdown(false);
        if (onSelect) {
            onSelect(item);
        }
        // 选中后不再发送请求
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        // 判断需不需要自定义显示方式
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement(Transition, { in: showDropdown || loading, animation: "zoom-in-top", timeout: 300, onExited: function () { setSugestions([]); } },
            React.createElement("ul", { className: "apathia-suggestion-list" },
                loading &&
                    React.createElement("div", { className: "suggstions-loading-icon" },
                        React.createElement(Icon, { icon: "spinner", spin: true })),
                suggestions.map(function (item, index) {
                    var cnames = classNames('suggestion-item', {
                        'is-active': index === highlightIndex
                    });
                    return (React.createElement("li", { key: index, className: cnames, onClick: function () { return handleSelect(item); } }, renderTemplate(item)));
                }))));
    };
    return React.createElement("div", { className: "apathia-auto-complete", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        generateDropdown());
};
export default AutoComplete;
