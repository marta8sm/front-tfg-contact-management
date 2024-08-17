import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { MeetingsOfClientView } from './meetings-of-client.view'

const meta: Meta<typeof MeetingsOfClientView> = {
    title: 'MeetingsOfClientView',
    component: MeetingsOfClientView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof MeetingsOfClientView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('meetings-of-client-view')

        expect(container).toBeTruthy()
    },
}
