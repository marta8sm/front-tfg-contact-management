import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ClientLayout } from './client.layout'

const meta: Meta<typeof ClientLayout> = {
    title: 'ClientLayout',
    component: ClientLayout,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ClientLayout>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('client-layout')

        expect(container).toBeTruthy()
    },
}
