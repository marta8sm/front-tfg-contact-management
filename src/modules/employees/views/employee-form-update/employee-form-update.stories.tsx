import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { EmployeeFormUpdateView } from './employee-form-update.view'

const meta: Meta<typeof EmployeeFormUpdateView> = {
    title: 'EmployeeFormUpdateView',
    component: EmployeeFormUpdateView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof EmployeeFormUpdateView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('employee-form-update-view')

        expect(container).toBeTruthy()
    },
}
