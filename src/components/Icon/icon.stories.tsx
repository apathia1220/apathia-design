import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Icon from './icon'

export default {
    title: 'Icon',
    component: Icon,
    argTypes: {
        theme: {
            description: '主题颜色',
            control: {
                type: 'select',
                options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']
            }
        },
        icon: {
            description: '图标名称',
            control: {
                type: 'text',
            }
        },
        size: {
            description: '图标大小',
            control: {
                type: 'text',
            }
        }
    }
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = (args) => (<>
    <Icon {...args} />
</>);

export const Primary = Template.bind({})

Primary.args = {
    theme: 'primary',
    icon: "coffee",
    size: "5x"
}