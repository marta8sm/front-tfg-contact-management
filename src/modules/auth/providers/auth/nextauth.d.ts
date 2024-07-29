import { ApiSession, DefaultSession } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
    declare type Role = number
    declare interface ApiSession {
        accessToken: string
        refreshToken?: string
    }
    declare interface User {
        id: string
        name: string
        roleId: Role
        apiSession?: ApiSession
    }

    declare interface Session extends DefaultSession {
        user: Omit<User, 'apiSession'>
        apiSession?: ApiSession
    }
}
/*
declare module 'next-auth/jwt' {
    declare interface JWT
        extends WithOptional<ApiSession, 'accessToken'>,
            DefaultJWT {}
}*/

declare module 'next-auth/jwt' {
    declare interface JWT extends DefaultJWT {
        apiSession: ApiSession
        user: User
    }
}
