import React from 'react'

import { DividerProps, Divider as DividerAntd } from 'antd'

import { cn } from '@/libs/cn'

export const Divider = ({ className, type, ...props }: DividerProps) => {
    return (
        <DividerAntd
            className={cn(
                'my-3',
                {
                    'my-0 h-6': type === 'vertical',
                },
                className
            )}
            type={type}
            {...props}
        />
    )
}
