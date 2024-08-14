import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { RoleDeleteWidget } from './role-delete.widget'

const meta: Meta<typeof RoleDeleteWidget> = {
    title: 'RoleDeleteWidget',
    component: RoleDeleteWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof RoleDeleteWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('role-delete-widget')

        expect(container).toBeTruthy()
    },
}
