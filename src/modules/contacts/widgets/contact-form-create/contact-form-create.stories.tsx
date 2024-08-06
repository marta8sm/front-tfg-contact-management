import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ContactFormCreateWidget } from './contact-form-create.widget'

const meta: Meta<typeof ContactFormCreateWidget> = {
    title: 'ContactFormCreateWidget',
    component: ContactFormCreateWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ContactFormCreateWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('contact-form-create-widget')

        expect(container).toBeTruthy()
    },
}
