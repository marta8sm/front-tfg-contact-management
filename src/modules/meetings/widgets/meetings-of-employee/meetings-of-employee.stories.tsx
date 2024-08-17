import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { MeetingsOfEmployeeWidget } from './meetings-of-employee.widget'

const meta: Meta<typeof MeetingsOfEmployeeWidget> = {
    title: 'MeetingsOfEmployeeWidget',
    component: MeetingsOfEmployeeWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof MeetingsOfEmployeeWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('meetings-of-employee-widget')

        expect(container).toBeTruthy()
    },
}
