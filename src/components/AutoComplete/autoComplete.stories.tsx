import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import AutoComplete, { DataSourceType } from './autoComplete'

export default {
    title: 'AutoComplete',
    component: AutoComplete,
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