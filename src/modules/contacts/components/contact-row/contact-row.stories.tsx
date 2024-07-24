import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ContactRow } from './contact-row.component'

const meta: Meta<typeof ContactRow> = {
    title: 'ContactRow',
    component: ContactRow,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ContactRow>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('contact-row')

        expect(container).toBeTruthy()
    },
}
