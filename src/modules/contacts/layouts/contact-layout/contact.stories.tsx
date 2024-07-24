import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ContactLayout } from './contact.layout'

const meta: Meta<typeof ContactLayout> = {
    title: 'ContactLayout',
    component: ContactLayout,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ContactLayout>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('contact-layout')

        expect(container).toBeTruthy()
    },
}
