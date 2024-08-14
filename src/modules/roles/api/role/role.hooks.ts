import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { roleApi } from './role.api'
import { RoleGetApiParams, RoleListApiParams } from './role.types'

export const useRoles = Pagination.makePaginationHook({
    cacheKey: 'role-api-list',
    clientFn: (params: RoleListApiParams) => roleApi.list(params),
    useApiContext: useApiContext,
    getCount: (data) => data.length,
    getPageData: (data) => data,
})

export const useRole = (params: RoleGetApiParams) => {
    return useQuery(
        ['role-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => roleApi.get(params)
    )
}
