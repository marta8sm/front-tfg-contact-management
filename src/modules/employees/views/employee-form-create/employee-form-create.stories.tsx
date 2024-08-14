import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { EmployeeFormCreateView } from './employee-form-create.view'

const meta: Meta<typeof EmployeeFormCreateView> = {
    title: 'EmployeeFormCreateView',
    component: EmployeeFormCreateView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof EmployeeFormCreateView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('employee-form-create-view')

        expect(container).toBeTruthy()
    },
}
