import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { MeetingRow } from './meeting-row.component'

const meta: Meta<typeof MeetingRow> = {
    title: 'MeetingRow',
    component: MeetingRow,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof MeetingRow>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('meeting-row')

        expect(container).toBeTruthy()
    },
}
