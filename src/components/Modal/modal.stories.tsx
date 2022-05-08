import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Modal from './Modal'
import Button from '../Button'
import Icon from '../Icon'

export default {
    title: 'Modal',
    component: Modal,
    argTypes: {
    },
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => {
    const [show, setShow] = useState<boolean>(false)
    const onCancel = () => {
        setShow(false)
    }
    const onOk = () => {
        setShow(false)
    }
    const closeIcon = () => { 
        return (
            <Icon icon="times"/>
        )
    }
    return(
        <>
            <Button onClick={() => { setShow(true) }}>弹窗{ show}</Button>
            <Modal
                visible={show}
                onOk={onOk}
                onCancel={onCancel}
                closeIcon={closeIcon()}
            >
                <div>
                    modal内容
                </div>
            </Modal>
        </>
    )
}

export const Primary = Template.bind({})
