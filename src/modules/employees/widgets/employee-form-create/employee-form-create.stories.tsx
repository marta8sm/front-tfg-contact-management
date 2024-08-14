import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { EmployeeFormCreateWidget } from './employee-form-create.widget'

const meta: Meta<typeof EmployeeFormCreateWidget> = {
    title: 'EmployeeFormCreateWidget',
    component: EmployeeFormCreateWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof EmployeeFormCreateWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('employee-form-create-widget')

        expect(container).toBeTruthy()
    },
}
