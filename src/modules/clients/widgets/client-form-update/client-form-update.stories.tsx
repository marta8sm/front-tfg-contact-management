import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ClientFormUpdateWidget } from './client-form-update.widget'

const meta: Meta<typeof ClientFormUpdateWidget> = {
    title: 'ClientFormUpdateWidget',
    component: ClientFormUpdateWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ClientFormUpdateWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('client-form-update-widget')

        expect(container).toBeTruthy()
    },
}
