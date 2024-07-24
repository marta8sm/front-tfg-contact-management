import type { Pagination } from '@/hookey'

export type Client = {
    clientID: ClientId
    clientName: string
    clientAddress: string
    clientPhone?: string
    clientEmail: string
}

export type ClientId = number

export type ClientApiResult = Client

export type ClientPaginatedApiResult = Client[]

export type ClientListApiParams = Pagination.UsePaginatedQueryParams<{
    name?: string
}>

export type ClientGetApiParams = {
    resourceId: ClientId
}

export type ClientCreateApiParams = {
    newResource: Omit<Client, 'clientID'>
}

export type ClientUpdateApiParams = {
    //updatedResource: Client
    // TODO: Switch params if the api requires an id in the url for updates
    updatedResource: Omit<Client, 'clientID'>
    resourceId: ClientId
    // TODO: Add other params here
}

export type ClientDeleteApiParams = {
    resourceId: ClientId
    // TODO: Add other params here
}
