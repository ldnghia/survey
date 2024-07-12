export type GenerateMetadataDefaultProps = {
    params: {
        lng: string
    }
}

export type ErrorComponentProps = {
    error: Error
    reset: () => void
}

export type ListParamsDefault = {
    search?: string
    orderBy?: string
    offset?: number
    limit?: number
    nopaging?: boolean
}

export interface DataResponse<T = any> {
    data?: T
    meta?: {
        message: string
    }
}

export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>
}

export type PartialExcept<T, K extends keyof T> = RecursivePartial<T> &
    Pick<T, K>

export enum DialogType {
    UserMenu = 'user-menu',
    AddRequest = 'add-request',
    Language = 'language',
    Theme = 'theme',
}
