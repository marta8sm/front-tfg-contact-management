import { ApiContext, DEFAULT_API_CONTEXT } from '@/common/providers/api-context'
import {
    ClientApiResult,
    ClientCreateApiParams,
    ClientDeleteApiParams,
    ClientGetApiParams,
    ClientId,
    ClientListApiParams,
    ClientPaginatedApiResult,
    ClientUpdateApiParams,
} from './client.types'

export const clientApiProto = (
    baseUrl: string = process.env.NEXT_PUBLIC_API_ENDPOINT || '',
    defaultApiContext = DEFAULT_API_CONTEXT
) => {
    const endpointUrl = `${baseUrl}/clients`
    const endpointAdminUrl = `${baseUrl}/admin/clients`

    type UrlParams = { resourceId?: ClientId }
    const endpoint = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const resourceIdParam =
            urlParams.resourceId === undefined ? '' : `/${urlParams.resourceId}`

        return `${endpointUrl}${resourceIdParam}?${queryParamString}`
    }
    const endpointAdmin = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const resourceIdParam =
            urlParams.resourceId === undefined ? '' : `/${urlParams.resourceId}`

        return `${endpointAdminUrl}${resourceIdParam}?${queryParamString}`
    }

    return {
        async list(
            this: ApiContext,
            { page, size, ...otherQueryParams }: ClientListApiParams
        ): Promise<ClientPaginatedApiResult> {
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
                `Listing Client with page: ${page}, size: ${size}`,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as ClientPaginatedApiResult
        },
        async delete(
            this: ApiContext,
            { resourceId, ...queryParams }: ClientDeleteApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { resourceId }
            const url = endpointAdmin(urlParams, queryParams)
            console.debug(
                `Deleting Client with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.delete(url)

            // TODO: Add code handle the response if needed

            return response.status >= 200 && response.status < 300
        },
        async create(
            this: ApiContext,
            { newResource, ...queryParams }: ClientCreateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {}
            const url = endpointAdmin(urlParams, queryParams)
            console.debug(
                `Creating Client resource:`,
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
                ...queryParams
            }: ClientUpdateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {
                resourceId,
            }
            const url = endpointAdmin(urlParams, queryParams)
            console.debug(
                `updating Client resource:`,
                updatedResource,
                `on url: ${url}`
            )
            const response = await this.client.put(url, updatedResource)

            // TODO: Add code handle the response if needed

            return response.status >= 200 && response.status < 300
        },
        async get(
            this: ApiContext,
            { resourceId, ...queryParams }: ClientGetApiParams
        ): Promise<ClientApiResult> {
            const urlParams: UrlParams = {
                resourceId,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Getting Client with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as ClientApiResult
        },
        ...defaultApiContext,
    }
}

export const clientApi = clientApiProto()
