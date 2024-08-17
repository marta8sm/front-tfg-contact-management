import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { MeetingAddEmployeeView } from './meeting-add-employee.view'

const meta: Meta<typeof MeetingAddEmployeeView> = {
    title: 'MeetingAddEmployeeView',
    component: MeetingAddEmployeeView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof MeetingAddEmployeeView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('meeting-add-employee-view')

        expect(container).toBeTruthy()
    },
}
