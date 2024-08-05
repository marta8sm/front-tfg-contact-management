import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ContactListOfClientWidget } from './contact-list-of-client.widget'

const meta: Meta<typeof ContactListOfClientWidget> = {
    title: 'ContactListOfClientWidget',
    component: ContactListOfClientWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ContactListOfClientWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('contact-list-of-client-widget')

        expect(container).toBeTruthy()
    },
}
