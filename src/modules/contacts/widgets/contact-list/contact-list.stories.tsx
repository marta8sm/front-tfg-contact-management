import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ContactListWidget } from './contact-list.widget'

const meta: Meta<typeof ContactListWidget> = {
    title: 'ContactListWidget',
    component: ContactListWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ContactListWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('contact-list-widget')

        expect(container).toBeTruthy()
    },
}
