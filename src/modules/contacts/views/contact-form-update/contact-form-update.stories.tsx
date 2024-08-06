import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ContactFormUpdateView } from './contact-form-update.view'

const meta: Meta<typeof ContactFormUpdateView> = {
    title: 'ContactFormUpdateView',
    component: ContactFormUpdateView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ContactFormUpdateView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('contact-form-update-view')

        expect(container).toBeTruthy()
    },
}
