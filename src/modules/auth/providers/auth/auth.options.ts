import { getApiContext } from '@/common/providers/api-context/api-context.default'
import { AuthOptions, Role, role, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/sign-in',
    },
    callbacks: {
        async session({ session, token }) {
            if (token?.accessToken && session) {
                // Update server side API_CONTEXT
                getApiContext().setAuthorizationToken(token.accessToken)
                session.apiSession = {
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                }
                session.user = token.user
                session.user.roleId = token.user.roleId
            }
            return session
        },
        async jwt({ token, user }) {
            if (user?.apiSession) {
                token.accessToken = user.apiSession.accessToken
                token.refreshToken = user.apiSession.refreshToken
                token.user = user
            }
            return token
        },
    },
    providers: [
        CredentialsProvider({
            name: 'custom-credentials',
            credentials: {
                employeeEmail: { type: 'email' },
                employeePassword: { type: 'password' },
            },
            authorize: async (credentials, _req) => {
                /*console.log('Sending credentials:', {
                    email: credentials?.email,
                    password: credentials?.password,
                })*/
                const response = await fetch(
                    'http://localhost:8080/contact-management/v1/auth/login',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            //meter aqui para roles
                        },
                        body: JSON.stringify({
                            employeeEmail: credentials?.employeeEmail,
                            employeePassword: credentials?.employeePassword,
                        }),
                    }
                )

                if (!response.ok) return null

                type ResponseBody = {
                    token: string
                }

                const response_body = (await response.json()) as ResponseBody

                type JWTPayload = {
                    sub: string
                    role: Role
                }
                const token_payload = JSON.parse(
                    atob(response_body.token.split('.')[1])
                ) as JWTPayload

                const user: User = {
                    id: token_payload.sub,
                    name: token_payload.sub,
                    roleId: token_payload.role,
                    apiSession: {
                        accessToken: response_body.token,
                    },
                }

                return user

                //return credentials?.password === 'safe-password' ? user : null
            },
        }),
    ],
}
