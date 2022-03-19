import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Alert from './alert'

export default {
    title: 'Alert',
    component: Alert,
} as ComponentMeta<typeof Alert>

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} ></Alert>;

export const Primary = Template.bind({})

Primary.args = {
    title: '通知',
    closable: true,
    type: 'primary',
    children: 'This is Alert!'

}
