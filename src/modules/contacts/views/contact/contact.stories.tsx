import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ContactView } from './contact.view'

const meta: Meta<typeof ContactView> = {
    title: 'ContactView',
    component: ContactView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ContactView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('contact-view')

        expect(container).toBeTruthy()
    },
}
