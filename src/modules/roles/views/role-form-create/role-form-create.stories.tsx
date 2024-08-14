import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { RoleFormCreateView } from './role-form-create.view'

const meta: Meta<typeof RoleFormCreateView> = {
    title: 'RoleFormCreateView',
    component: RoleFormCreateView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof RoleFormCreateView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('role-form-create-view')

        expect(container).toBeTruthy()
    },
}
