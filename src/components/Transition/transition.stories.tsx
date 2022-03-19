import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Transition from './transition'
import Button from '../Button'

export default {
    title: 'Transition',
    component: Transition,
    argTypes: {
        animation: {
            description: '动画方式',
            defaultValue: 'zoom-in-top',
            control: {
                type: 'radio',
                options: ['zoom-in-top', 'zoom-in-left', 'zoom-in-bottom', 'zoom-in-right']
            },
        },
        wrapper: {
            description: '嵌套wrapper',
            defaultValue: true,
            control: {
                type: 'boolean',
            },
        },
        in: {
            description: '显示',
            defaultValue: false,
            control: {
                type: 'boolean',
            },
        },
    },
} as ComponentMeta<typeof Transition>

const Template: ComponentStory<typeof Transition> = (args) => {
    const [show, setShow] = useState(false)
    return (
        <div>
            <Button size='lg' onClick={() => { setShow(!show) }}>Toggle Show  </Button>
            <Transition
                in={show}
                timeout={300}
                animation='zoom-in-left'
            >
                <div>
                    <p> edit name</p>
                    <p> edit name</p>
                    <p> edit name</p>
                    <p> edit name</p>
                </div>
            </Transition>
        </div>
    )
}

export const Primary = Template.bind({})