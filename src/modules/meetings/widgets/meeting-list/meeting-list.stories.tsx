import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { MeetingListWidget } from './meeting-list.widget'

const meta: Meta<typeof MeetingListWidget> = {
    title: 'MeetingListWidget',
    component: MeetingListWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof MeetingListWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('meeting-list-widget')

        expect(container).toBeTruthy()
    },
}
