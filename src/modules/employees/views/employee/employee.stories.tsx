import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { EmployeeView } from './employee.view'

const meta: Meta<typeof EmployeeView> = {
    title: 'EmployeeView',
    component: EmployeeView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof EmployeeView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('employee-view')

        expect(container).toBeTruthy()
    },
}
