import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ClientFormWidget } from './client-form.widget'

const meta: Meta<typeof ClientFormWidget> = {
    title: 'ClientFormWidget',
    component: ClientFormWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ClientFormWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('client-form-widget')

        expect(container).toBeTruthy()
    },
}
