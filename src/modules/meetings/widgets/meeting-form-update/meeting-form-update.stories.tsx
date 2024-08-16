import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { MeetingFormUpdateWidget } from './meeting-form-update.widget'

const meta: Meta<typeof MeetingFormUpdateWidget> = {
    title: 'MeetingFormUpdateWidget',
    component: MeetingFormUpdateWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof MeetingFormUpdateWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('meeting-form-update-widget')

        expect(container).toBeTruthy()
    },
}
