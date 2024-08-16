import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { MeetingDeleteWidget } from './meeting-delete.widget'

const meta: Meta<typeof MeetingDeleteWidget> = {
    title: 'MeetingDeleteWidget',
    component: MeetingDeleteWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof MeetingDeleteWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('meeting-delete-widget')

        expect(container).toBeTruthy()
    },
}
