'use client'

import React from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { createQueryString } from '@/utils/createPathnameAndQueryString'

import { fallbackLng } from './settings'

export interface I18nContextProps {
    lng: string
}
export const I18nContext = React.createContext<I18nContextProps>({
    lng: fallbackLng,
})

export interface I18nProviderProps {
    lng: string
    children: React.ReactNode
}
export const I18nProvider = ({ lng, ...props }: I18nProviderProps) => {
    return <I18nContext.Provider {...props} value={{ lng }} />
}

export const useI18nContext = () => {
    return React.useContext(I18nContext)
}

export const getRedirectedPathName = (
    locale: string,
    pathname: string,
    searchParams: string = ''
) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = locale

    return segments.join('/') + searchParams
}

export const useChangeLanguage = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    return (
        newLanguage: string,
        newPathname?: string,
        {
            newSearchParams,
            isSearchParam = true,
        }: {
            newSearchParams?: string
            isSearchParam?: boolean
        } = {}
    ) => {
        router.push(
            getRedirectedPathName(
                newLanguage,
                newPathname || pathname,
                isSearchParam
                    ? newSearchParams ||
                          createQueryString({
                              ...Object.fromEntries(searchParams),
                          })
                    : undefined
            )
        )
        router.refresh()
    }
}
