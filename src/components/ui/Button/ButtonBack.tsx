import React from 'react'

import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, ButtonProps } from 'antd'
import { useRouter } from 'next/navigation'

import { useTranslation } from '@/libs/i18n/useTranslation'

export interface ButtonBackProps extends ButtonProps {
    isOnlyIcon?: boolean
    url?: string
}

export const ButtonBack = ({ isOnlyIcon, url, ...props }: ButtonBackProps) => {
    const router = useRouter()
    const { t } = useTranslation()

    return (
        <Button
            type="link"
            shape="circle"
            className="items-center rounded-3xl text-base group flex text-blue-5 hover:text-blue-3 transition-colors hover:bg-transparent w-fit min-w-fit"
            classNames={{
                icon: 'mr-1',
            }}
            icon={
                <FontAwesomeIcon
                    icon={faChevronDown}
                    rotation={90}
                    className="w-[16px] h-[16px]"
                />
            }
            onClick={() => {
                if (url) {
                    router.push(url)
                    return
                }
                router.back()
            }}
            {...props}
        >
            {isOnlyIcon ? undefined : t('back')}
        </Button>
    )
}
