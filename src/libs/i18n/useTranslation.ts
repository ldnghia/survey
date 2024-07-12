'use client'

import { useEffect, useState } from 'react'

import { i18n as i18nOtherLib } from '@dcorp/web-ui'
import i18next, { FlatNamespace, KeyPrefix } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { useCookies } from 'react-cookie'
import {
    FallbackNs,
    UseTranslationOptions,
    initReactI18next,
    useTranslation as useTranslationOrg,
} from 'react-i18next'
import { $Tuple } from 'react-i18next/helpers'

import { useI18nContext } from './provider'
import { getOptions, i18nCookieName, languages } from './settings'

const runsOnServerSide = typeof window === 'undefined'

//
i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(
        resourcesToBackend(
            (language: any, namespace: any) =>
                import(`@/public/locales/${language}/${namespace}.json`)
        )
    )
    .init({
        ...getOptions(),
        lng: undefined, // let detect the language on client side
        detection: {
            order: ['path', 'htmlTag', 'cookie', 'navigator'],
        },
        preload: runsOnServerSide ? languages : [],
    })

i18next.on('languageChanged', (lng) => {
    i18nOtherLib.changeLanguage(lng)
})

export function useTranslation<
    Ns extends FlatNamespace | $Tuple<FlatNamespace> | undefined = undefined,
    KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined
>(ns?: Ns, lg?: string, options?: UseTranslationOptions<KPrefix>) {
    const { lng: lngContext } = useI18nContext()
    const lng = lg || lngContext

    const [cookies, setCookie] = useCookies([i18nCookieName])
    const ret = useTranslationOrg<Ns, KPrefix>(ns, options)
    const { i18n } = ret
    if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
        i18n.changeLanguage(lng)
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (activeLng === i18n.resolvedLanguage) return
            setActiveLng(i18n.resolvedLanguage)
        }, [activeLng, i18n.resolvedLanguage])
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (!lng || i18n.resolvedLanguage === lng) return
            i18n.changeLanguage(lng)
        }, [lng, i18n])
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (cookies.i18next === lng || !lng) return
            setCookie(i18nCookieName, lng, { path: '/' })
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [lng, cookies.i18next])
    }
    return ret
}
