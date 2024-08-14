import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { roleApi } from './role.api'
import { RoleGetApiParams } from './role.types'

export const useRoles = Pagination.makePaginationHook({
    cacheKey: 'role-api-list',
    clientFn: roleApi.list,
    useApiContext: useApiContext,
    // TODO: Connect getCount and getPageData with the list response data
    getCount: (data) => data.count,
    getPageData: (data) => data.results,
})

export const useRole = (params: RoleGetApiParams) => {
    return useQuery(
        ['role-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => roleApi.get(params)
    )
}
