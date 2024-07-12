import * as React from 'react'

import { Popover, PopoverProps } from 'antd'

import { useDetectDeviceSize } from '@/hooks/useDetectDeviceSize'
import { cn } from '@/libs/cn'

export interface PopoverInteractiveProps extends PopoverProps {}

export const PopoverContainer = ({
    style,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    const { isMobile } = useDetectDeviceSize()

    return (
        <div
            className={cn(
                'flex h-full flex-col overflow-hidden',
                {
                    'max-h-[70vh]': !isMobile,
                },
                className
            )}
            style={{
                borderRadius: isMobile ? 0 : 24,
                ...style,
            }}
            {...props}
        />
    )
}

export default function PopoverInteractive({
    overlayInnerStyle,
    rootClassName,
    ...props
}: PopoverInteractiveProps) {
    const { isMobile } = useDetectDeviceSize()
    return (
        <Popover
            trigger={['click']}
            destroyTooltipOnHide
            rootClassName={cn(
                {
                    'top-0 left-0 right-0 bottom-0 flex flex-col overflow-auto bg-white':
                        isMobile,
                },
                rootClassName
            )}
            overlayInnerStyle={{
                padding: 0,
                borderRadius: isMobile ? 0 : 24,
                height: '100%',
                overflow: 'auto',
                width: isMobile ? '100%' : 325,
                ...overlayInnerStyle,
            }}
            placement="bottomRight"
            arrow={false}
            style={{
                top: 0,
                background: 'red',
            }}
            {...props}
        />
    )
}
