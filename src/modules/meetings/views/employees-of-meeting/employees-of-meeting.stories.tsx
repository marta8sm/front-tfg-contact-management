import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { EmployeesOfMeetingView } from './employees-of-meeting.view'

const meta: Meta<typeof EmployeesOfMeetingView> = {
    title: 'EmployeesOfMeetingView',
    component: EmployeesOfMeetingView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof EmployeesOfMeetingView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('employees-of-meeting-view')

        expect(container).toBeTruthy()
    },
}
