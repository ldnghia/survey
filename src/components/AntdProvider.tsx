'use client'

import React from 'react'

import {
    StyleProvider,
    createCache,
    extractStyle,
    px2remTransformer,
} from '@ant-design/cssinjs'
import type Entity from '@ant-design/cssinjs/lib/Cache'
import dayjs from 'dayjs'
import { useServerInsertedHTML } from 'next/navigation'

import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

// suppress useLayoutEffect warnings when running outside a browser
if (typeof window !== 'undefined') React.useLayoutEffect = React.useEffect

export function AntdProvider({ children }: { children: React.ReactNode }) {
    const cache = React.useMemo<Entity>(() => createCache(), [createCache])
    useServerInsertedHTML(() => (
        <style
            id="antd"
            dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
        />
    ))

    return (
        <StyleProvider cache={cache} transformers={[px2remTransformer()]}>
            {children}
        </StyleProvider>
    )
}
