import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { MeetingDetail } from './meeting-detail.component'

const meta: Meta<typeof MeetingDetail> = {
    title: 'MeetingDetail',
    component: MeetingDetail,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof MeetingDetail>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('meeting-detail')

        expect(container).toBeTruthy()
    },
}
