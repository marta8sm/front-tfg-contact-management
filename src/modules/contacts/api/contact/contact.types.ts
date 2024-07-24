import type { Pagination } from '@/hookey'

export type Contact = {
    contactID: ContactId
    contactDNI: number
    contactName: string
    contactLastName1: string
    contactLastName2: string
    contactPhone: string
    contactEmail: string
    clientID: number
}

// TODO: Set the id type
export type ContactId = number

export type ContactApiResult = {
    // TODO: Replace with actual get api result
    results: Contact
}

export type ContactPaginatedApiResult = Contact[]

export type ContactListApiParams = Pagination.UsePaginatedQueryParams<{
    name?: string
    lastname1?: string
}>

export type ContactGetApiParams = {
    resourceId: ContactId
}

export type ContactCreateApiParams = {
    newResource: Omit<Contact, 'contactId'>
    // TODO: Add other params here
}

export type ContactUpdateApiParams = {
    updatedResource: Contact
    // TODO: Switch params if the api requires an id in the url for updates
    // updatedResource: Omit<Contact, 'contactId'>
    // resourceId: ContactId
    // TODO: Add other params here
}

export type ContactDeleteApiParams = {
    resourceId: ContactId
    // TODO: Add other params here
}
