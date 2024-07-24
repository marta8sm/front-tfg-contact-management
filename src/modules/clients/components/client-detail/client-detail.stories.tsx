import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { ClientDetail } from './client-detail.component'

const meta: Meta<typeof ClientDetail> = {
    title: 'ClientDetail',
    component: ClientDetail,
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof ClientDetail>

export const Default: Story = {
    args: {},
    async play({ canvasElement }) {
        const canvas = within(canvasElement)
        const container = canvas.getByTestId('client-detail')

        expect(container).toBeTruthy()
    },
}
