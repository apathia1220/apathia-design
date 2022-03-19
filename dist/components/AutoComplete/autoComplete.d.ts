import React, { ReactElement } from 'react';
import { InputProps } from '../Input/input';
interface DataSourceObject {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /**
     * fetchSuggestions:用户自定义的进行自动补全操作的函数，返回值是经过筛选后的数据的数组或者一个promise
     * onSelect:当补全的项被选中的回调
     * renderOption:自定义渲染元素的回调
     */
    /** 返回推荐结果 */
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /** 选择选中某一项 */
    onSelect?: (item: DataSourceType) => void;
    /** 自定义渲染样式 */
    renderOption?: (item: DataSourceType) => ReactElement;
}
declare const AutoComplete: React.FC<AutoCompleteProps>;
export default AutoComplete;
