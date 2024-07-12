'use client'

import React, { PropsWithChildren, useEffect, useState } from 'react'

import {
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { App, ConfigProvider, message, theme as themeAntd } from 'antd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useTranslation } from 'react-i18next'
import { ThemeProvider } from 'styled-components'

import { EVENT_KICK_OUT } from '@/configs/event'
import UserService from '@/libs/keycloak/UserService'
import { useSettingsStore } from '@/stores/settings'
import applyTheme from '@/themes'
import { theme } from '@/themes/themeStyled'
import { checkBuildVersion } from '@/utils/checkBuildVersion'
import { handleRetry } from '@/utils/retry'

import { AntdProvider } from './AntdProvider'

export type ProviderProps = PropsWithChildren<{
    locale: string
}>

const { defaultAlgorithm, darkAlgorithm } = themeAntd

export function AntdConfigProvider({ children, locale }: ProviderProps) {
    const { settings } = useSettingsStore()

    useEffect(() => {
        checkBuildVersion()
    }, [])

    useEffect(() => {
        applyTheme(settings.theme)
    }, [settings.theme])

    return (
        <ConfigProvider
            locale={{
                locale,
            }}
            theme={{
                algorithm:
                    settings.theme === 'dark'
                        ? darkAlgorithm
                        : defaultAlgorithm,
                components: {
                    Tooltip: {
                        colorBgDefault: 'rgba(0, 0, 0, 0.85)',
                    },
                    Modal: {
                        zIndexPopupBase: 1030,
                    },
                },
            }}
        >
            <App>
                <AntdProvider>{children}</AntdProvider>
            </App>
        </ConfigProvider>
    )
}

export default function Providers(props: ProviderProps) {
    const { t } = useTranslation()
    const messageSuccessDefault = t('message.success.default')
    let messageErrorDefault = t('message.error.default')

    const [client] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    retry: handleRetry,
                    staleTime: Infinity,
                    refetchOnWindowFocus: false,
                },
            },
            queryCache: new QueryCache({
                onError: (err: any, query) => {
                    if (!query?.meta?.disableErrorMessage) {
                        const isString = typeof err === 'string'
                        messageErrorDefault = isString
                            ? err
                            : messageErrorDefault
                        message.error({
                            content:
                                query?.meta?.errorMessage ||
                                err?.message ||
                                messageErrorDefault,
                        })
                    }
                },
                onSuccess: (data: any, query) => {
                    const disable =
                        query?.meta?.disableMessage !== undefined
                            ? query?.meta?.disableMessage
                            : true
                    if (!disable) {
                        message.success({
                            content:
                                query?.meta?.successMessage ||
                                data?.meta?.message ||
                                messageSuccessDefault,
                        })
                    }
                },
            }),
            mutationCache: new MutationCache({
                onError: (err: any, _v, _c, query) => {
                    if (!query?.meta?.disableErrorMessage) {
                        const isString = typeof err === 'string'
                        messageErrorDefault = isString
                            ? err
                            : messageErrorDefault
                        message.error({
                            content:
                                query?.meta?.errorMessage ||
                                err?.message ||
                                messageErrorDefault,
                        })
                    }
                },
                onSuccess: (data: any, _v, _c, query) => {
                    if (!query?.meta?.disableMessage) {
                        message.success({
                            content:
                                query?.meta?.successMessage ||
                                data?.meta?.message ||
                                messageSuccessDefault,
                        })
                    }
                },
            }),
        })
    )

    useEffect(function handleKickOut() {
        const kickOut = () => {
            UserService()?.doLogout()
        }
        document.addEventListener(EVENT_KICK_OUT, kickOut)

        return () => {
            document.removeEventListener(EVENT_KICK_OUT, kickOut)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(function disableWarningReactBeautiful() {
        // @ts-ignore
        window['__react-beautiful-dnd-disable-dev-warnings'] = true
    }, [])

    return (
        <QueryClientProvider client={client}>
            <ReactQueryDevtools position="bottom-left" initialIsOpen={false} />
            <AntdConfigProvider {...props}>
                <DndProvider backend={HTML5Backend}>
                    <ThemeProvider theme={theme}>
                        {props.children}
                    </ThemeProvider>
                </DndProvider>
            </AntdConfigProvider>
        </QueryClientProvider>
    )
}
