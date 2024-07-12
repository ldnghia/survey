import { useMutation, useQuery } from '@tanstack/react-query'

import request from '@/apis/request'
import { HTTP_CLIENT_PROVIDERS } from '@/configs/api'
import { QueryKeys } from '@/configs/query'
import { DataResponse } from '@/types/common'
import {
    GetQaResponse,
    SurveyCreateInputs,
    SurveyListParams,
} from '@/types/survey'

import { MutationOptions, QueryOptions } from '../types'

type Response = {
    get: DataResponse<GetQaResponse>
    create: DataResponse<SurveyCreateInputs>
}

type Variables = {
    create: SurveyCreateInputs
}

const PREFIX = `${HTTP_CLIENT_PROVIDERS.CRM.URL}/survey`

const survey = {
    get: (params: SurveyListParams): Promise<Response['get']> =>
        request.get(`${PREFIX}`, {
            params: {
                ...params,
            },
        }),
    create: (payload: SurveyCreateInputs): Promise<Response['create']> =>
        request.post(`${PREFIX}`, payload),
}

export const useGetListQaQuery = (
    params: SurveyListParams,
    options?: QueryOptions<Response['get']>
) =>
    useQuery([QueryKeys.GET_LIST_QA[0], params], () => survey.get(params), {
        ...options,
        staleTime: 0,
    })

export const useCreateSurveyMutation = (
    options?: MutationOptions<Response['create'], Variables['create']>
) => {
    return useMutation(['create'], survey.create, options)
}
