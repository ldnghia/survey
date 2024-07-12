import * as React from 'react'

import NextLink, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'

import { useDetectDeviceSize } from '@/hooks/useDetectDeviceSize'

export interface LinkCustomProps extends Omit<LinkProps, 'href'> {
    isDisabled?: boolean
    className?: string
    children: React.ReactNode
    id?: any
    href?: string
}

export default function Link({
    href,
    isDisabled,
    children,
    onClick,
    ...rest
}: LinkCustomProps) {
    const { isMobileOnly } = useDetectDeviceSize()
    const router = useRouter()
    if (isDisabled || !href) {
        return (
            <div {...(rest as any)} onClick={onClick}>
                {children}
            </div>
        )
    }
    return (
        <NextLink
            href={href}
            {...rest}
            onClick={(e) => {
                if (href && isMobileOnly) {
                    router.push(href)
                }

                onClick?.(e)
            }}
        >
            {children}
        </NextLink>
    )
}
