import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ClientRow } from './client-row.component'

const meta: Meta<typeof ClientRow> = {
    title: 'ClientRow',
    component: ClientRow,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ClientRow>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('client-row')

        expect(container).toBeTruthy()
    },
}
