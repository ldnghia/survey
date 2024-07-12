'use client'

import React from 'react'

import { Result, Button } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'

import Card from '../Card'

const ResultStyled = styled(Result)`
    .ant-result-image {
        margin: 0;
    }
`

const NotFound = () => {
    return (
        <Card bodyStyle={{ border: 0 }}>
            <ResultStyled
                className="flex flex-col items-center justify-center h-full pt-0"
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Link href="/">
                        <Button type="primary">Back Home</Button>
                    </Link>
                }
            />
        </Card>
    )
}

export default NotFound
