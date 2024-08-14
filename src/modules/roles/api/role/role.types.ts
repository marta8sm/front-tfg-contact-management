import type { Pagination } from '@/hookey'

export type Role = {
    roleID: RoleId
    roleName: string
    roleDescription?: string
}

export type RoleId = number

export type RoleApiResult = Role

export type RolePaginatedApiResult = Role[]

export type RoleListApiParams = Pagination.UsePaginatedQueryParams<{
    name?: string
}>

export type RoleGetApiParams = {
    resourceId: RoleId
}

export type RoleCreateApiParams = {
    newResource: Omit<Role, 'roleId'>
}

export type RoleUpdateApiParams = {
    updatedResource: Omit<Role, 'roleId'>
    resourceId: RoleId
}

export type RoleDeleteApiParams = {
    resourceId: RoleId
}
