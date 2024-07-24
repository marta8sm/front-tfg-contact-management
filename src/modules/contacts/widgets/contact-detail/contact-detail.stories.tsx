import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ContactDetailWidget } from './contact-detail.widget'

const meta: Meta<typeof ContactDetailWidget> = {
    title: 'ContactDetailWidget',
    component: ContactDetailWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ContactDetailWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('contact-detail-widget')

        expect(container).toBeTruthy()
    },
}
