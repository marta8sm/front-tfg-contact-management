import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { RoleView } from './role.view'

const meta: Meta<typeof RoleView> = {
    title: 'RoleView',
    component: RoleView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof RoleView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('role-view')

        expect(container).toBeTruthy()
    },
}
