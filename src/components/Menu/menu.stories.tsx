import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Menu from './menu'

export default {
    title: 'Menu/Menu',
    component: Menu,
    argTypes: {
        disabled: {
            description: '是否可选中',
            defaultValue: false,
            control: {
                type: 'boolean',
                options: ['true', 'false']
            },
            table: {
                category: 'Button',
                type: { summary: 'true | false' },
                defaultValue: { summary: 'true' }
            }
        }
    }
} as ComponentMeta<typeof Menu>

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} >click</Menu>;

export const Primary = Template.bind({})
