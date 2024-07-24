import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ClientFormView } from './client-form.update.view'

const meta: Meta<typeof ClientFormView> = {
    title: 'ClientFormView',
    component: ClientFormView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ClientFormView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('client-form-view')

        expect(container).toBeTruthy()
    },
}
