import React from 'react'
import cn from 'classnames'
import { LoadingButton } from '@/common/components/loading-button'
import * as Form from '@/common/components/ui/form'
import { z } from 'zod'

export type AuthFormCredentials = {
    employeeEmail: string
    employeePassword: string
}
export type AuthFormProps = Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onSubmit'
> & {
    onSubmit: (credentials: AuthFormCredentials) => Promise<void | string>
}

export function AuthForm({ className, onSubmit, ...props }: AuthFormProps) {
    const form = Form.useZodForm<AuthFormCredentials>({
        criteriaMode: 'firstError',
        schema: z.object({
            employeeEmail: z
                .string()
                .min(2, {
                    message: 'Email must be at least 2 characters',
                })
                .max(50),
            employeePassword: z.string().min(1, {
                message: 'Password must contain at least 8 characters',
            }),
        }),
        defaultValues: {
            employeeEmail: '',
            employeePassword: '',
        },
        onSubmit: async (data) => {
            try {
                const error = await onSubmit(data)
                if (typeof error === 'string') {
                    form.setError('root.submit', {
                        type: 'server',
                        message: error,
                    })
                }
            } catch (e: any) {
                console.error('AuthForm.onSubmit error', e)
                form.setError('root.submit', {
                    type: 'unknown',
                    message: 'Unknown error',
                })
            }
        },
    })

    return (
        <div
            data-testid="auth-form"
            className={cn('grid gap-6', className)}
            {...props}
        >
            <Form.Root {...form} className="grid gap-4">
                <div className="grid gap-2">
                    <Form.Field
                        control={form.control}
                        name="employeeEmail"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label>Username</Form.Label>
                                <Form.Input
                                    placeholder="user@uxcale.com"
                                    {...field}
                                />
                                <Form.Message />
                            </Form.Item>
                        )}
                    />
                    <Form.Field
                        control={form.control}
                        name="employeePassword"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label>Password</Form.Label>
                                <Form.Input
                                    placeholder="*****"
                                    type="password"
                                    {...field}
                                />
                                <Form.Message />
                            </Form.Item>
                        )}
                    />
                </div>
                <Form.CustomMessage isError>
                    {form.formState.errors.root?.submit?.message || null}
                </Form.CustomMessage>
                <LoadingButton
                    loading={form.formState.isSubmitting}
                    type="submit"
                >
                    Sign In
                </LoadingButton>
            </Form.Root>
        </div>
    )
}
