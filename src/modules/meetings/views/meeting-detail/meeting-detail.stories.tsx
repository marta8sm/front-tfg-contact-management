import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { MeetingDetailView } from './meeting-detail.view'

const meta: Meta<typeof MeetingDetailView> = {
    title: 'MeetingDetailView',
    component: MeetingDetailView,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof MeetingDetailView>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('meeting-detail-view')

        expect(container).toBeTruthy()
    },
}
