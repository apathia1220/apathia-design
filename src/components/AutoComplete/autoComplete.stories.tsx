import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import AutoComplete, { DataSourceType } from './autoComplete'

export default {
    title: 'AutoComplete',
    component: AutoComplete,
    argTypes: {
        fetchSuggestions: {
            description: '返回推荐结果',
            control: {
                type: 'text'
            }
        },
        onSelect: {
            description: '选择选中某一项',
            control: {
                type: 'text'
            }
        },
        renderOption: {
            description: '自定义渲染样式',
            control: {
                type: 'text'
            }
        }
    }
} as ComponentMeta<typeof AutoComplete>

const handleFetch = (query: string): DataSourceType[] | Promise<DataSourceType[]> => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
        .then(res => res.json())
        .then(({ items }) => {
            // let items = resp.items as DataSourceType[]
            return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
        })
}
const Template: ComponentStory<typeof AutoComplete> = (args) => <AutoComplete {...args} />

export const Primary = Template.bind({})
Primary.args = {
    fetchSuggestions: handleFetch
}