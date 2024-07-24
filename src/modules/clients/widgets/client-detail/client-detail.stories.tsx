import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ClientDetailWidget } from './client-detail.widget'

const meta: Meta<typeof ClientDetailWidget> = {
    title: 'ClientDetailWidget',
    component: ClientDetailWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ClientDetailWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('client-detail-widget')

        expect(container).toBeTruthy()
    },
}
