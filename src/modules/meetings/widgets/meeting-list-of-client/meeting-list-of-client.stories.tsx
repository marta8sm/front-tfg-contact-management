import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { MeetingListOfClientWidget } from './meeting-list-of-client.widget'

const meta: Meta<typeof MeetingListOfClientWidget> = {
    title: 'MeetingListOfClientWidget',
    component: MeetingListOfClientWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof MeetingListOfClientWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('meeting-list-of-client-widget')

        expect(container).toBeTruthy()
    },
}
