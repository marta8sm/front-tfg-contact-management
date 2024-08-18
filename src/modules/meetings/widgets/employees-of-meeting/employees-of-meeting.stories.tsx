import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { EmployeesOfMeetingWidget } from './employees-of-meeting.widget'

const meta: Meta<typeof EmployeesOfMeetingWidget> = {
    title: 'EmployeesOfMeetingWidget',
    component: EmployeesOfMeetingWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof EmployeesOfMeetingWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('employees-of-meeting-widget')

        expect(container).toBeTruthy()
    },
}
