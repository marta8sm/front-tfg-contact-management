import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { EmployeeDetail } from './employee-detail.component'

const meta: Meta<typeof EmployeeDetail> = {
    title: 'EmployeeDetail',
    component: EmployeeDetail,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof EmployeeDetail>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('employee-detail')

        expect(container).toBeTruthy()
    },
}
