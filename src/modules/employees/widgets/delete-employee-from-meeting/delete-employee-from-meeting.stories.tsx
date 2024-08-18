import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { DeleteEmployeeFromMeetingWidget } from './delete-employee-from-meeting.widget'

const meta: Meta<typeof DeleteEmployeeFromMeetingWidget> = {
    title: 'DeleteEmployeeFromMeetingWidget',
    component: DeleteEmployeeFromMeetingWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof DeleteEmployeeFromMeetingWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('delete-employee-from-meeting-widget')

        expect(container).toBeTruthy()
    },
}
