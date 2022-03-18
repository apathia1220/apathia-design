import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Input from './input'

export default {
    title: 'Input',
    component: Input,
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />

export const Primary = Template.bind({})
Primary.args = {
    style: { width: '300px' },
    size: 'lg',
    prepend: 'hello',
    icon: 'search'
}