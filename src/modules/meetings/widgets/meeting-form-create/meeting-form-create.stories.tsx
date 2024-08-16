import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { MeetingFormCreateWidget } from './meeting-form-create.widget'

const meta: Meta<typeof MeetingFormCreateWidget> = {
    title: 'MeetingFormCreateWidget',
    component: MeetingFormCreateWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof MeetingFormCreateWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('meeting-form-create-widget')

        expect(container).toBeTruthy()
    },
}
