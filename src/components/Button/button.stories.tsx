import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from './button'

export default {
    title: 'Button',
    component: Button,
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
        },
        size: {
            description: '按钮大小',
            defaultValue: 'default',
            control: {
                type: 'inline-radio',
                options: ['default', 'sm', 'lg']
            },
            table: {
                category: 'Button',
                type: { summary: 'default | sm | lg' },
                defaultValue: { summary: 'default' }
            }
        },
        btnType: {
            description: '按钮类型',
            defaultValue: 'default',
            control: {
                type: 'radio',
                options: ['default', 'primary', 'danger', 'link']
            },
            table: {
                category: 'Button',
                type: { summary: 'primary | default | danger | link ' },
                defaultValue: { summary: 'default' }
            }
        },
        href: {
            description: '链接地址',
            defaultValue: '',
            control: {
                type: 'text',
            },
            table: {
                category: 'Button',
                type: { summary: '' },
            }
        },
    }
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} >click</Button>;

export const Primary = Template.bind({})

Primary.args = {
    btnType: 'primary',
}

export const Large = Template.bind({})

Large.args = {
    size: "lg"
}

export const Danger = Template.bind({})

Danger.args = {
    btnType: 'danger'
}