import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { employeeApi } from './employee.api'
import { EmployeeGetApiParams } from './employee.types'

export const useEmployees = Pagination.makePaginationHook({
    cacheKey: 'employee-api-list',
    clientFn: employeeApi.list,
    useApiContext: useApiContext,
    getCount: (data) => data.length,
    getPageData: (data) => data,
})

export const useEmployee = (params: EmployeeGetApiParams) => {
    return useQuery(
        ['employee-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => employeeApi.get(params)
    )
}
