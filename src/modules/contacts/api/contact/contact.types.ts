import type { Pagination } from '@/hookey'

export type Contact = {
    contactID: ContactId
    contactDNI: number
    contactName: string
    contactLastName1: string
    contactLastName2?: string
    contactPhone: string
    contactEmail: string
    clientID: number
}

export type ContactId = number

export type ClientId = number

export type ContactApiResult = Contact

export type ContactPaginatedApiResult = Contact[]

export type ContactListApiParams = Pagination.UsePaginatedQueryParams<{
    name?: string
    lastname1?: string
    clientId?: ClientId
}>

export type ContactGetApiParams = {
    resourceId: ContactId
    clientId: ClientId
}

export type ContactCreateApiParams = {
    newResource: Omit<Contact, 'contactId'>
}

export type ContactUpdateApiParams = {
    //updatedResource: Contact
    updatedResource: Omit<Contact, 'contactId'>
    resourceId: ContactId
    clientId: ClientId
}

export type ContactDeleteApiParams = {
    resourceId: ContactId
}
