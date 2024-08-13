import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { EmployeeListWidget } from './employee-list.widget'

const meta: Meta<typeof EmployeeListWidget> = {
    title: 'EmployeeListWidget',
    component: EmployeeListWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof EmployeeListWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('employee-list-widget')

        expect(container).toBeTruthy()
    },
}
