import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { EmployeeFormUpdateWidget } from './employee-form-update.widget'

const meta: Meta<typeof EmployeeFormUpdateWidget> = {
    title: 'EmployeeFormUpdateWidget',
    component: EmployeeFormUpdateWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof EmployeeFormUpdateWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('employee-form-update-widget')

        expect(container).toBeTruthy()
    },
}
