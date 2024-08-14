import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { RoleDetailView } from './role-detail.view'

const meta: Meta<typeof RoleDetailView> = {
    title: 'RoleDetailView',
    component: RoleDetailView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof RoleDetailView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('role-detail-view')

        expect(container).toBeTruthy()
    },
}
