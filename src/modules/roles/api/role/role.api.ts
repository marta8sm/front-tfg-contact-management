import { ApiContext, DEFAULT_API_CONTEXT } from '@/common/providers/api-context'
import {
    RoleApiResult,
    RoleCreateApiParams,
    RoleDeleteApiParams,
    RoleGetApiParams,
    RoleId,
    RoleListApiParams,
    RolePaginatedApiResult,
    RoleUpdateApiParams,
} from './role.types'

export const roleApiProto = (
    baseUrl: string = process.env.NEXT_PUBLIC_API_ENDPOINT || '/api',
    defaultApiContext = DEFAULT_API_CONTEXT
) => {
    const endpointUrl = `${baseUrl}/role`

    type UrlParams = { resourceId?: RoleId }
    const endpoint = (
        urlParams: UrlParams,
        queryParams: Record<string, string>
    ) => {
        const queryParamString = new URLSearchParams(queryParams).toString()
        const resourceIdParam =
            urlParams.resourceId === undefined ? '' : `/${urlParams.resourceId}`

        // TODO: Customize the endpoint url generation here
        return `${endpointUrl}${resourceIdParam}?${queryParamString}`
    }

    return {
        async list(
            this: ApiContext,
            { page, size, ...otherQueryParams }: RoleListApiParams
        ): Promise<RolePaginatedApiResult> {
            const urlParams: UrlParams = {}
            const queryParams = {
                // TODO: Map the pagination params as required by the API
                page: `${page}`,
                size: `${size}`,
                // limit: `${size}`,
                // offset: `${Math.max((page - 1) * size, 0)}`,
                ...otherQueryParams,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Listing Role with page: ${page}, size: ${size}`,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as RolePaginatedApiResult
        },
        async delete(
            this: ApiContext,
            { resourceId, ...queryParams }: RoleDeleteApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { resourceId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Deleting Role with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.delete(url)

            // TODO: Add code handle the response if needed

            return response.status >= 200 && response.status < 300
        },
        async create(
            this: ApiContext,
            { newResource, ...queryParams }: RoleCreateApiParams
        ): Promise<RoleId> {
            const urlParams: UrlParams = {}
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Creating Role resource:`,
                newResource,
                `on url: ${url}`
            )
            const response = await this.client.post(url, newResource)

            // TODO: Add code handle the response if needed

            // TODO: Adapt code to handle the receiving of the resourceId (if any)
            const locationHeader = response.headers.location as
                | string
                | undefined

            if (locationHeader) {
                const segments = new URL(locationHeader).pathname.split('/')
                const lastIdx = segments.length - 1
                const resourceId =
                    segments[lastIdx] || segments[Math.max(lastIdx - 1, 0)]
                if (!resourceId)
                    console.warn(new Error('Invalid location header received'))
                return resourceId as RoleId
            }

            console.warn(new Error('No location header received'))
            return '' as RoleId
        },
        async update(
            this: ApiContext,
            {
                updatedResource,
                // resourceId,
                ...queryParams
            }: RoleUpdateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {
                // resourceId
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `updating Role resource:`,
                updatedResource,
                `on url: ${url}`
            )
            const response = await this.client.put(url, updatedResource)

            // TODO: Add code handle the response if needed

            return response.status >= 200 && response.status < 300
        },
        async get(
            this: ApiContext,
            { resourceId, ...queryParams }: RoleGetApiParams
        ): Promise<RoleApiResult> {
            const urlParams: UrlParams = {
                resourceId,
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Getting Role with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.get(url)

            // TODO: Add code handle the response if needed

            return response.data as RoleApiResult
        },
        ...defaultApiContext,
    }
}

export const roleApi = roleApiProto()
