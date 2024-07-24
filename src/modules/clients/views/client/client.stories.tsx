import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ClientView } from './client.view'

const meta: Meta<typeof ClientView> = {
    title: 'ClientView',
    component: ClientView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ClientView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('client-view')

        expect(container).toBeTruthy()
    },
}
