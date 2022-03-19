import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Progress from './progress'

export default {
    title: 'Progress',
    component: Progress,
    argTypes: {
        percent: {
            description: '百分比',
            control: {
                type: 'text'
            }
        },
        strokeHeight: {
            description: '高度',
            defaultValue: 15,
            control: {
                type: 'text'
            }
        },
        showText: {
            description: '是否显示数字',
            defaultValue: true,
            control: {
                type: 'boolean'
            }
        },
        theme: {
            description: '主题色',
            defaultValue: 'primary',
            control: {
                type: 'radio',
                options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']
            }
        }
    }
} as ComponentMeta<typeof Progress>

const Template: ComponentStory<typeof Progress> = (args) => <Progress {...args} ></Progress>;

export const Primary = Template.bind({})

Primary.args = {
    percent: 50,
    showText: true,
    theme: 'success'
}
