'use client'

import React from 'react'

import { ResultProps as ResultAntProps, Result } from 'antd'
import styled from 'styled-components'

export interface ResultProps extends ResultAntProps {
    message?: string
}

const StyledResult = styled(Result)`
    .ant-result-title {
        font-size: 18px;
    }
`

export default function Notification({ message, ...props }: ResultProps) {
    return (
        <div
            className="fixed top-[50%] left-[50%] max-w-[672px] w-full"
            style={{ transform: 'translate(-50%, -50%)' }}
        >
            <StyledResult
                {...props}
                title={message}
                className="font-semibold"
            />
        </div>
    )
}
