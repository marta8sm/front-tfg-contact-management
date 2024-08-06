import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ContactFormCreateView } from './contact-form-create.view'

const meta: Meta<typeof ContactFormCreateView> = {
    title: 'ContactFormCreateView',
    component: ContactFormCreateView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ContactFormCreateView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('contact-form-create-view')

        expect(container).toBeTruthy()
    },
}
