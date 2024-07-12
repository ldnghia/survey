import {
    QueryKey,
    UseMutationOptions,
    UseQueryOptions,
} from '@tanstack/react-query'

export type QueryOptions<
    TQueryFnData,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = any[]
> = Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
>

export type MutationOptions<
    TData = unknown,
    TVariables = void,
    TError = unknown,
    TContext = unknown
> = Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationKey' | 'mutationFn'
>
