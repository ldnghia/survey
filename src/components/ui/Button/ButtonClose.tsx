import React from 'react'

import { CloseOutlined } from '@ant-design/icons'
import { Button, ButtonProps } from 'antd'

import { cn } from '@/libs/cn'

export interface ButtonCloseProps extends ButtonProps {}

export const ButtonClose = ({ className, ...props }: ButtonCloseProps) => {
    return (
        <Button
            className={cn(
                'group h-fit min-h-fit w-fit min-w-fit py-0',
                className
            )}
            size="large"
            shape="circle"
            type="link"
            icon={
                <CloseOutlined className="text-base text-neutral-text group-hover:text-neutral-5 transition-colors" />
            }
            {...props}
        />
    )
}
