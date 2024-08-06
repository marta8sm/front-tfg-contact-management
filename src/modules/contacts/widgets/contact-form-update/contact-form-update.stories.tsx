import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ContactFormUpdateWidget } from './contact-form-update.widget'

const meta: Meta<typeof ContactFormUpdateWidget> = {
    title: 'ContactFormUpdateWidget',
    component: ContactFormUpdateWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ContactFormUpdateWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('contact-form-update-widget')

        expect(container).toBeTruthy()
    },
}
