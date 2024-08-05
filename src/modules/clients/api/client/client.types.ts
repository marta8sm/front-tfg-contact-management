import type { Pagination } from '@/hookey'

export type Client = {
    map(arg0: (contact: any) => JSX.Element): import('react').ReactNode
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
    updatedResource: Omit<Client, 'clientID'>
    resourceId: ClientId
}

export type ClientDeleteApiParams = {
    resourceId: ClientId
}
