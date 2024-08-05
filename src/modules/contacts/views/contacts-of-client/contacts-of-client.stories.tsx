import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ContactsOfClientView } from './contacts-of-client.view'

const meta: Meta<typeof ContactsOfClientView> = {
    title: 'ContactsOfClientView',
    component: ContactsOfClientView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ContactsOfClientView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('contacts-of-client-view')

        expect(container).toBeTruthy()
    },
}
