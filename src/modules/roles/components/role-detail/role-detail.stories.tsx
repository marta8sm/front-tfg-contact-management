import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { RoleDetail } from './role-detail.component'

const meta: Meta<typeof RoleDetail> = {
    title: 'RoleDetail',
    component: RoleDetail,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof RoleDetail>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('role-detail')

        expect(container).toBeTruthy()
    },
}
