import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { clientApi } from './client.api'
import { ClientGetApiParams } from './client.types'

export const useClients = Pagination.makePaginationHook({
    cacheKey: 'client-api-list',
    clientFn: clientApi.list,
    useApiContext: useApiContext,
    getCount: (data) => data.length,
    getPageData: (data) => data,
})

export const useClient = (params: ClientGetApiParams) => {
    return useQuery(
        ['client-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => clientApi.get(params)
    )
}
