import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { MeetingDetailWidget } from './meeting-detail.widget'

const meta: Meta<typeof MeetingDetailWidget> = {
    title: 'MeetingDetailWidget',
    component: MeetingDetailWidget,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof MeetingDetailWidget>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('meeting-detail-widget')

        expect(container).toBeTruthy()
    },
}
