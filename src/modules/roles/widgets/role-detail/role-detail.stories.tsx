import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { RoleDetailWidget } from './role-detail.widget'

const meta: Meta<typeof RoleDetailWidget> = {
    title: 'RoleDetailWidget',
    component: RoleDetailWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof RoleDetailWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('role-detail-widget')

        expect(container).toBeTruthy()
    },
}
