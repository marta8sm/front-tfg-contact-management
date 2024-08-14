import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { RoleRow } from './role-row.component'

const meta: Meta<typeof RoleRow> = {
    title: 'RoleRow',
    component: RoleRow,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof RoleRow>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('role-row')

        expect(container).toBeTruthy()
    },
}
