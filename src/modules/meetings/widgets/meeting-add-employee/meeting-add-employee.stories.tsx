import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { MeetingAddEmployeeWidget } from './meeting-add-employee.widget'

const meta: Meta<typeof MeetingAddEmployeeWidget> = {
    title: 'MeetingAddEmployeeWidget',
    component: MeetingAddEmployeeWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof MeetingAddEmployeeWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('meeting-add-employee-widget')

        expect(container).toBeTruthy()
    },
}
