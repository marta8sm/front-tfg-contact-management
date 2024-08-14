import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { EmployeeDetailWidget } from './employee-detail.widget'

const meta: Meta<typeof EmployeeDetailWidget> = {
    title: 'EmployeeDetailWidget',
    component: EmployeeDetailWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof EmployeeDetailWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('employee-detail-widget')

        expect(container).toBeTruthy()
    },
}
