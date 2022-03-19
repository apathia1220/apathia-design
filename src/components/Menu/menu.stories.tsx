import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

export default {
    title: 'Menu',
    component: Menu,
    argTypes: {
        defaultIndex: {
            description: 'active的菜单项的索引值',
            defaultValue: '0',
            control: {
                type: 'text',
            },
        },
        mode: {
            description: '菜单类型 横向或者纵向',
            defaultValue: 'horizontal',
            control: {
                type: 'radio',
                options: ['horizontal', 'vertical']
            },
            table: {
                type: { summary: 'horizontal | vertical' },
                defaultValue: { summary: 'horizontal' }
            }
        },
        onSelect: {
            description: '点击菜单项触发的回掉函数',
            control: {
                type: 'text',
            },
        },
        defaultOpenSubMenus: {
            description: '垂直状态时，默认展开的subMenu',
            control: {
                type: 'text',
            },
        }
    },
} as ComponentMeta<typeof Menu>

const Template: ComponentStory<typeof MenuItem> = (args) => (
    <Menu {...args} defaultIndex={'0'} mode={'horizontal'} defaultOpenSubMenus={['0']}>

        <MenuItem disabled>
            disabled
      </MenuItem>
        <MenuItem>
            cool link 2
      </MenuItem>
        <SubMenu title="下拉选项">
            <MenuItem>
                下拉选项一
        </MenuItem>
            <MenuItem>
                下拉选项二
        </MenuItem>
        </SubMenu>
    </Menu>
)

export const Primary = Template.bind({})