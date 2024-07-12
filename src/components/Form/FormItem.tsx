import React from 'react'

import { Form, FormItemProps } from 'antd'
import styled from 'styled-components'

import { cn } from '@/libs/cn'

export interface FormItemCustomProps extends FormItemProps {
    showRequired?: boolean
}

const StyledFormItem = styled(Form.Item)`
    .ant-form-item-required::before {
        display: none !important;
    }
`

export default function FormItem({
    label,
    showRequired,
    children,
    className,
    ...props
}: FormItemCustomProps) {
    return (
        <StyledFormItem
            label={
                label ? (
                    <div
                        className={cn({
                            "after:ml-1 after:inline-block after:text-sm after:text-red-5 after:content-['*']":
                                showRequired,
                        })}
                    >
                        {label}
                    </div>
                ) : undefined
            }
            {...props}
            className={cn('mb-0', className)}
        >
            {children}
        </StyledFormItem>
    )
}
