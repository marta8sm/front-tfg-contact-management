import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { RoleFormUpdateWidget } from './role-form-update.widget'

const meta: Meta<typeof RoleFormUpdateWidget> = {
    title: 'RoleFormUpdateWidget',
    component: RoleFormUpdateWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof RoleFormUpdateWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('role-form-update-widget')

        expect(container).toBeTruthy()
    },
}
