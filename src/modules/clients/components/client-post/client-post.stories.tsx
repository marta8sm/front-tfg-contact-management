import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ClientPost } from './client-post.component'

const meta: Meta<typeof ClientPost> = {
    title: 'ClientPost',
    component: ClientPost,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ClientPost>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('client-post')

        expect(container).toBeTruthy()
    },
}
