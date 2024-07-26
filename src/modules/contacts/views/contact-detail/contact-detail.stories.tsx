import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ContactDetailView } from './contact-detail.view'

const meta: Meta<typeof ContactDetailView> = {
    title: 'ContactDetailView',
    component: ContactDetailView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ContactDetailView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('contact-detail-view')

        expect(container).toBeTruthy()
    },
}
