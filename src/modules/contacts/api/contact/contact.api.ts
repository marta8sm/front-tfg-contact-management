import { ApiContext, DEFAULT_API_CONTEXT } from '@/common/providers/api-context'
import {
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

    type UrlParams = { resourceId?: ContactId }
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
        async delete(
            this: ApiContext,
            { resourceId, ...queryParams }: ContactDeleteApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = { resourceId }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Deleting Contact with id:`,
                resourceId,
                `on url: ${url}`
            )

            const response = await this.client.delete(url)

            // TODO: Add code handle the response if needed

            return response.status >= 200 && response.status < 300
        },
        async create(
            this: ApiContext,
            { newResource, ...queryParams }: ContactCreateApiParams
        ): Promise<ContactId> {
            const urlParams: UrlParams = {}
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `Creating Contact resource:`,
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
                return resourceId as ContactId
            }

            console.warn(new Error('No location header received'))
            return '' as ContactId
        },
        async update(
            this: ApiContext,
            {
                updatedResource,
                // resourceId,
                ...queryParams
            }: ContactUpdateApiParams
        ): Promise<boolean> {
            const urlParams: UrlParams = {
                // resourceId
            }
            const url = endpoint(urlParams, queryParams)
            console.debug(
                `updating Contact resource:`,
                updatedResource,
                `on url: ${url}`
            )
            const response = await this.client.put(url, updatedResource)

            // TODO: Add code handle the response if needed

            return response.status >= 200 && response.status < 300
        },
        async get(
            this: ApiContext,
            { resourceId, ...queryParams }: ContactGetApiParams
        ): Promise<ContactApiResult> {
            const urlParams: UrlParams = {
                resourceId,
            }
            const url = endpoint(urlParams, queryParams)
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
