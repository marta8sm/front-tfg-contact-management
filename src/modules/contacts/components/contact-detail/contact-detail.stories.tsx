import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ContactDetail } from './contact-detail.component'

const meta: Meta<typeof ContactDetail> = {
    title: 'ContactDetail',
    component: ContactDetail,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ContactDetail>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('contact-detail')

        expect(container).toBeTruthy()
    },
}
