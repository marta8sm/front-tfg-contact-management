import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ClientListWidget } from './client-list.widget'

const meta: Meta<typeof ClientListWidget> = {
    title: 'ClientListWidget',
    component: ClientListWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ClientListWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('client-list-widget')

        expect(container).toBeTruthy()
    },
}
