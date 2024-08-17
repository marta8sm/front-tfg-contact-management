import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { meetingApi } from './meeting.api'
import { MeetingGetApiParams } from './meeting.types'

export const useMeetings = Pagination.makePaginationHook({
    cacheKey: 'meeting-api-list',
    clientFn: meetingApi.list,
    useApiContext: useApiContext,
    getCount: (data) => data.length,
    getPageData: (data) => data,
})

export const useMeetingsOfClient = Pagination.makePaginationHook({
    cacheKey: 'meeting-of-client-api-list',
    clientFn: meetingApi.listByClient,
    useApiContext: useApiContext,
    getCount: (data) => data.length,
    getPageData: (data) => data,
})

export const useMeeting = (params: MeetingGetApiParams) => {
    return useQuery(
        ['meeting-api-get', params] as [string, typeof params],
        ({ queryKey: [_key, params] }) => meetingApi.get(params)
    )
}
