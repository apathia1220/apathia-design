import classNames from 'classnames'
import React, { ReactElement, useEffect, useRef, useState, ChangeEvent, KeyboardEvent, } from 'react'
import useClickOutside from '../../hooks/useClickOutside'
import useDebounce from '../../hooks/useDebounce'
import Icon from '../Icon/icon'
import Input, { InputProps } from '../Input/input'
import Transition from '../Transition/transition'
interface DataSourceObject {
    value: string
}
// 返回数据类型的是T或者DataSourceObject
// 等于号表示默认值
export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /**
     * fetchSuggestions:用户自定义的进行自动补全操作的函数，返回值是经过筛选后的数据的数组或者一个promise
     * onSelect:当补全的项被选中的回调
     * renderOption:自定义渲染元素的回调
     */
    /** 返回推荐结果 */
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
    /** 选择选中某一项 */
    onSelect?: (item: DataSourceType) => void;
    /** 自定义渲染样式 */
    renderOption?: (item: DataSourceType) => ReactElement;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const {
        fetchSuggestions,
        onSelect,
        renderOption,
        value,
        ...restProps
    } = props

    /**
     * inputValue：输入框值的state
     * suggestion：经过筛选后的数据的state
     * loading：请求响应返回之前
     * showDropdown：显示自动补全的state
     * highlightIndex：选中需要高亮的数据的id的state
     */
    const [inputValue, setInputValue] = useState(value as string)
    const [suggestions, setSugestions] = useState<DataSourceType[]>([])
    const [loading, setLoading] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [highlightIndex, setHighlightIndex] = useState(-1)
    /**
     * triggerSearch: 标记是否发起请求
     * componentRef：标记需要进行DOM操作的节点的ref
     */
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    // 防抖处理
    const debouncedValue = useDebounce(inputValue, 300)
    // 点击dropdown外时将数据列表设置为空
    useClickOutside(componentRef, () => { setSugestions([]) })
    useEffect(() => {
        if (debouncedValue && triggerSearch.current) {
            // 每次输入时将显示数据列表设置为空
            setSugestions([])
            // 经过处理后的数据结果
            const results = fetchSuggestions(debouncedValue)
            if (results instanceof Promise) {
                //判断是不是promise
                setLoading(true)
                results.then(data => {
                    //数据返回之前将loading设置为false，并且将数据设置到显示数据列表中
                    setLoading(false)
                    setSugestions(data)
                    if (data.length > 0) {
                        // 先死数据列表不为空是显示
                        setShowDropdown(true)
                    }
                })
            } else {
                setSugestions(results)
                setShowDropdown(true)
                if (results.length > 0) {
                    setShowDropdown(true)
                }
            }
        } else {
            // 没有数据或者在选中后不显示补全数据
            setShowDropdown(false)
        }
        // 每次补全之后将高亮的选中取消
        setHighlightIndex(-1)
    }, [debouncedValue, fetchSuggestions])
    const highlight = (index: number) => {
        // 设置选中高亮的项
        // 限制index在显示数据中，到最上面和最下面时不会一移动
        if (index < 0) index = 0
        if (index >= suggestions.length) {
            index = suggestions.length - 1
        }
        setHighlightIndex(index)
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'Enter':
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex])
                }
                break
            case 'ArrowUp':
                highlight(highlightIndex - 1)
                break
            case 'ArrowDown':
                highlight(highlightIndex + 1)
                break
            case 'Escape':
                setShowDropdown(false)
                break
            default:
                break
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        /**
         * input发生变化时
         */
        const value = e.target.value.trim()
        setInputValue(value)
        // 设置可以发送搜索请求
        triggerSearch.current = true
    }
    const handleSelect = (item: DataSourceType) => {
        // 选中后将选中的值设置到input中
        setInputValue(item.value)
        // 选中之后不显示补全后的数据了
        setShowDropdown(false)
        if (onSelect) {
            onSelect(item)
        }
        // 选中后不再发送请求
        triggerSearch.current = false
    }
    const renderTemplate = (item: DataSourceType) => {
        // 判断需不需要自定义显示方式
        return renderOption ? renderOption(item) : item.value
    }
    const generateDropdown = () => {
        return (
            <Transition
                in={showDropdown || loading}
                animation="zoom-in-top"
                timeout={300}
                onExited={() => { setSugestions([]) }}
            >
                <ul className="apathia-suggestion-list">
                    {loading &&
                        <div className="suggstions-loading-icon">
                            <Icon icon="spinner" spin />
                        </div>
                    }
                    {suggestions.map((item, index) => {
                        const cnames = classNames('suggestion-item', {
                            'is-active': index === highlightIndex
                        })
                        return (
                            <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                                {renderTemplate(item)}
                            </li>
                        )
                    })}
                </ul>
            </Transition>
        )
    }
    return <div className="apathia-auto-complete" ref={componentRef}>
        <Input
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            {...restProps}
        />
        {generateDropdown()}
    </div>
}

export default AutoComplete