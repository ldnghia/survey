'use client'

import React from 'react'

import { Card as CardAntd } from 'antd'
import classNames from 'classnames'
import styled from 'styled-components'

export interface CardProps extends React.ComponentProps<typeof CardAntd> {}

const StyledCard = styled(CardAntd)`
    .ant-card-body {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: auto;
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .ant-card-head {
        z-index: 10;
        padding: 1rem;
        margin-bottom: 0px;
    }
`

export default function Card({ children, className, ...props }: CardProps) {
    return (
        <StyledCard
            className={classNames(
                'flex h-full w-full flex-col overflow-x-auto',
                className
            )}
            {...props}
        >
            {children}
        </StyledCard>
    )
}
