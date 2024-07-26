import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ClientDeleteWidget } from './client-delete.widget'

const meta: Meta<typeof ClientDeleteWidget> = {
    title: 'ClientDeleteWidget',
    component: ClientDeleteWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ClientDeleteWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('client-delete-widget')

        expect(container).toBeTruthy()
    },
}
