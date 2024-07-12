'use client'

import React from 'react'

import { Button, Result } from 'antd'

import { AUTHORIZED_TO_ACCESS_PAGE } from '@/configs/error'
import { useTranslation } from '@/libs/i18n/useTranslation'

import Link from '../Link'

export interface Props {
    error: {
        message: string | React.ReactNode
        name?: string
    }
    reset?: () => void
    title?: string
    okText?: string
}

const SomethingError = ({ error, reset, title, okText }: Props) => {
    const { t } = useTranslation()

    if (error.message === AUTHORIZED_TO_ACCESS_PAGE) {
        return (
            <Result
                status="403"
                title="403"
                subTitle={t('auth.content_body_not_authorized_to_access_page')}
                extra={
                    <Link href="/">
                        <Button type="primary">Back Home</Button>
                    </Link>
                }
            />
        )
    }
    return (
        <Result
            status="error"
            title={title || error.name || t('something_went_wrong')}
            subTitle={error.message}
            extra={
                <Button
                    type="primary"
                    onClick={() => {
                        reset?.()
                    }}
                >
                    {okText || t('reload')}
                </Button>
            }
        />
    )
}

export default SomethingError
