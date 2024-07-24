import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { contactApi } from './contact.api'
import { ContactGetApiParams } from './contact.types'

export const useContacts = Pagination.makePaginationHook({
    cacheKey: 'contact-api-list',
    clientFn: contactApi.list,
    useApiContext: useApiContext,
    getCount: (data) => data.length,
    getPageData: (data) => data,
})

export const useContact = (params: ContactGetApiParams) => {
    return useQuery(
        ['contact-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => contactApi.get(params)
    )
}
