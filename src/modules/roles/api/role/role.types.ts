import type { Pagination } from '@/hookey'

export type Role = {
    roleId: RoleId
}

// TODO: Set the id type
export type RoleId = string | number

export type RoleApiResult = {
    // TODO: Replace with actual get api result
    results: Role
}

export type RolePaginatedApiResult = {
    // TODO: Replace with actual list api result
    results: Role[]
    count: number
}

export type RoleListApiParams = Pagination.UsePaginatedQueryParams<{
    // TODO: Add other params here
}>

export type RoleGetApiParams = {
    resourceId: RoleId
    // TODO: Add other params here
}

export type RoleCreateApiParams = {
    newResource: Omit<Role, 'roleId'>
    // TODO: Add other params here
}

export type RoleUpdateApiParams = {
    updatedResource: Role
    // TODO: Switch params if the api requires an id in the url for updates
    // updatedResource: Omit<Role, 'roleId'>
    // resourceId: RoleId
    // TODO: Add other params here
}

export type RoleDeleteApiParams = {
    resourceId: RoleId
    // TODO: Add other params here
}
