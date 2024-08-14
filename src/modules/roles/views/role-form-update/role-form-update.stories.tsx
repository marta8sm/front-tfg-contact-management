import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { RoleFormUpdateView } from './role-form-update.view'

const meta: Meta<typeof RoleFormUpdateView> = {
    title: 'RoleFormUpdateView',
    component: RoleFormUpdateView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof RoleFormUpdateView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('role-form-update-view')

        expect(container).toBeTruthy()
    },
}
