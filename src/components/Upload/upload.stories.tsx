import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Upload from './upload'
import Icon from '../Icon'
import axios from 'axios'

export default {
    title: 'Upload',
    component: Upload,
} as ComponentMeta<typeof Upload>

const Template: ComponentStory<typeof Upload> = (args) => {
    return (
        <Upload
            {...args}
            action="https://www.mocky.io/v2/5185415ba171ea3a00704eed"
            // onChange={() => handleFileChange}
            // defaultFileList={defaultFileList}
            // onRemove={action('removed')}
            // beforeUpload={filePromise}
            // name="fileName"
            // data={{ 'key': 'value' }}
            // headers={{'X-Powered-By': 'vikingship'}}
            // accept=".jpg"
            // multiple
            drag
        >
            <Icon icon="upload" size="5x" theme="secondary" />
            <br />
            <p>Drag file over to upload</p>
        </Upload>
    )
}

export const Primary = Template.bind({})