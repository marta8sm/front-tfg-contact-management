import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { EmployeeRow } from './employee-row.component'

const meta: Meta<typeof EmployeeRow> = {
    title: 'EmployeeRow',
    component: EmployeeRow,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof EmployeeRow>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('employee-row')

        expect(container).toBeTruthy()
    },
}
