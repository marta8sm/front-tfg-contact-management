import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { EmployeeDetailView } from './employee-detail.view'

const meta: Meta<typeof EmployeeDetailView> = {
    title: 'EmployeeDetailView',
    component: EmployeeDetailView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof EmployeeDetailView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('employee-detail-view')

        expect(container).toBeTruthy()
    },
}
