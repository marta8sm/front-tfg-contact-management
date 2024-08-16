import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { MeetingFormUpdateView } from './meeting-form-update.view'

const meta: Meta<typeof MeetingFormUpdateView> = {
    title: 'MeetingFormUpdateView',
    component: MeetingFormUpdateView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof MeetingFormUpdateView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('meeting-form-update-view')

        expect(container).toBeTruthy()
    },
}
