import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { MeetingsOfEmployeeView } from './meetings-of-employee.view'

const meta: Meta<typeof MeetingsOfEmployeeView> = {
    title: 'MeetingsOfEmployeeView',
    component: MeetingsOfEmployeeView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof MeetingsOfEmployeeView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('meetings-of-employee-view')

        expect(container).toBeTruthy()
    },
}
