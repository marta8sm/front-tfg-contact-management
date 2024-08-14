import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { EmployeeDeleteWidget } from './employee-delete.widget'

const meta: Meta<typeof EmployeeDeleteWidget> = {
    title: 'EmployeeDeleteWidget',
    component: EmployeeDeleteWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof EmployeeDeleteWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('employee-delete-widget')

        expect(container).toBeTruthy()
    },
}
