import { ApiContext, DEFAULT_API_CONTEXT } from '@/common/providers/api-context'
import {
    ClientId,
    ContactApiResult,
    ContactCreateApiParams,
    ContactDeleteApiParams,
    ContactGetApiParams,
    ContactId,
    ContactListApiParams,
    ContactPaginatedApiResult,
    ContactUpdateApiParams,
} from './contact.types'

export const contactApiProto = (
    baseUrl: string = process.env.NEXT_PUBLIC_API_ENDPOINT || '',
    defaultApiContext = DEFAULT_API_CONTEXT
) => {
    const endpointUrl = `${baseUrl}/contacts`
    const endpointUrlClient = `${baseUrl}/clients`
    //Preguntar
    const endpointAdminUrl = `${baseUrl}/admin/clients`

    type UrlParams = { resourceId?: ContactId; clientId?: number }
    const endpoint = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()

        return `${endpointUrl}?${queryParamString}`
    }
    const endpointAdmin = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const resourceIdParam =
            urlParams.resourceId === undefined ? '' : `/${urlParams.resourceId}`
        const clientIdParam =
            urlParams.clientId === undefined ? '' : `/${urlParams.clientId}`

        return `${endpointAdminUrl}${clientIdParam}/contacts${resourceIdParam}?${queryParamString}`
    }
    const endpointContact = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const resourceIdParam =
            urlParams.resourceId === undefined ? '' : `/${urlParams.resourceId}`
        const clientIdParam =
            urlParams.clientId === undefined ? '' : `/${urlParams.clientId}`

        return `${endpointUrlClient}${clientIdParam}/contacts${resourceIdParam}?${queryParamString}`
    }
    const endpointContactsOfClient = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const clientIdParam =
            urlParams.clientId === undefined ? '' : `/${urlParams.clientId}`

        return `${endpointUrlClient}${clientIdParam}/contacts?${queryParamString}`
    }

    return {
        async list(
            this: ApiContext,
            { page, size, ...otherQueryParams }: ContactListApiParams
        ): Promise<ContactPaginatedApiResult> {
            const urlParams: UrlParams = {}
            const queryParams = {
                //page: `${page}`,
                //size: `${size}`,
                limit: `${size}`,
                offset: `${Math.max((page - 1) * size, 0)}`,
                ...otherQueryParams,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Listing Contact with page: ${page}, size: ${size}`,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as ContactPaginatedApiResult
        },
        async listByClient(
            this: ApiContext,
            { page, size, clientId, ...otherQueryParams }: ContactListApiParams
        ): Promise<ContactPaginatedApiResult> {
            const urlParams: UrlParams = { clientId }
            const queryParams = {
                //page: `${page}`,
                //size: `${size}`,
                limit: `${size}`,
                offset: `${Math.max((page - 1) * size, 0)}`,
                ...otherQueryParams,
            }
            const url = endpointContactsOfClient(urlParams, queryParams)
            console.debug(
                `Listing Contact with page: ${page}, size: ${size}`,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as ContactPaginatedApiResult
        },
        async delete(
            this: ApiContext,
            { resourceId, ...queryParams }: ContactDeleteApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { resourceId }
            const url = endpointAdmin(urlParams, queryParams)
            console.debug(
                `Deleting Contact with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.delete(url)

            return response.status >= 200 && response.status < 300
        },
        async create(
            this: ApiContext,
            { newResource, clientId, ...queryParams }: ContactCreateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { clientId }
            const url = endpointAdmin(urlParams, queryParams)
            console.debug(
                `Creating Contact resource:`,
                newResource,
                `on url: ${url}`
            )
            const response = await this.client.post(url, newResource)

            return response.status >= 200 && response.status < 300
        },
        async update(
            this: ApiContext,
            {
                updatedResource,
                resourceId,
                clientId,
                ...queryParams
            }: ContactUpdateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {
                resourceId,
                clientId,
            }
            const url = endpointAdmin(urlParams, queryParams)
            console.debug(
                `updating Contact resource:`,
                updatedResource,
                `on url: ${url}`
            )
            const response = await this.client.put(url, updatedResource)

            return response.status >= 200 && response.status < 300
        },
        async get(
            this: ApiContext,
            { resourceId, clientId, ...queryParams }: ContactGetApiParams
        ): Promise<ContactApiResult> {
            const urlParams: UrlParams = {
                resourceId,
                clientId,
            }
            const url = endpointContact(urlParams, queryParams)
            console.debug(
                `Getting Contact with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as ContactApiResult
        },
        ...defaultApiContext,
    }
}

export const contactApi = contactApiProto()
