import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { MeetingView } from './meeting.view'

const meta: Meta<typeof MeetingView> = {
    title: 'MeetingView',
    component: MeetingView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof MeetingView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('meeting-view')

        expect(container).toBeTruthy()
    },
}
