import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Tabs from './tabs'
import TabsItem from './tabsItem'

export default {
    title: 'Tabs',
    component: Tabs,
} as ComponentMeta<typeof Tabs>

const Template: ComponentStory<typeof Tabs> = (args) => (
    <Tabs
        onSelect={function noRefCheck() { }}
    >
        <TabsItem label="选项卡一">
            this is content one
    </TabsItem>
        <TabsItem label="选项卡二">
            this is content two
    </TabsItem>
        <TabsItem label="用户管理">
            this is content three
    </TabsItem>
    </Tabs>
)

export const Primary = Template.bind({})

Primary.args = {
}
