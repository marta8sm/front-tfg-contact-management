import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ClientDetailView } from './client-detail.view'

const meta: Meta<typeof ClientDetailView> = {
    title: 'ClientDetailView',
    component: ClientDetailView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ClientDetailView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('client-detail-view')

        expect(container).toBeTruthy()
    },
}
