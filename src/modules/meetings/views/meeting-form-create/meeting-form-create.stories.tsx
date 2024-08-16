import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { MeetingFormCreateView } from './meeting-form-create.view'

const meta: Meta<typeof MeetingFormCreateView> = {
    title: 'MeetingFormCreateView',
    component: MeetingFormCreateView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof MeetingFormCreateView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('meeting-form-create-view')

        expect(container).toBeTruthy()
    },
}
