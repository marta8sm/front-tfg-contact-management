import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { RoleFormCreateWidget } from './role-form-create.widget'

const meta: Meta<typeof RoleFormCreateWidget> = {
    title: 'RoleFormCreateWidget',
    component: RoleFormCreateWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof RoleFormCreateWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('role-form-create-widget')

        expect(container).toBeTruthy()
    },
}
