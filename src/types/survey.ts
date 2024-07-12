export type Collection<T, Name extends string> = {
    [key in Name]: T[]
} & { total: number; totalCount: number }

export enum StepSurvey {
    Info = 1,
    Rate = 2,
    CommentOther = 3,
}

export type ListParamsDefault = {
    offset?: number
    limit?: number
}

export interface SurveyListParams extends ListParamsDefault {
    /** @format int32 */
    orgId?: number
    storeId?: number
    transactionNumber?: string
    contactPhone?: string
}

export type Survey = {
    id: number
    contactName?: string
    contactPhone?: string
    contactEmail?: string
    organizationId?: number
    storeId?: number
    transactionNumber?: string
    comment?: string
    polls?: any[]
}

export type Comments = {
    id: number
    title?: string
    qaId?: number
    ster?: number
}

export type SurveyCreateInputs = Omit<Survey, 'id'>

export type Questions = {
    id: number
    ids: number
    name?: string
    answers?: Answers[]
}

export type Answers = {
    id: number
    name?: string
    rate?: number
    questionId?: number
}

export type GetQaResponse = Collection<Questions, 'records'>
