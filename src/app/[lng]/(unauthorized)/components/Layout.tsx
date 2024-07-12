'use client'

import React from 'react'

import { ScrollArea } from '@/components/ui/ScrollArea'
import { useDetectDeviceSize } from '@/hooks/useDetectDeviceSize'
import { cn } from '@/libs/cn'

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const { isMobile } = useDetectDeviceSize()

    return (
        <div
            className={cn(
                'relative mx-auto flex h-screen flex-col overflow-auto',
                'w-full max-w-[520px] lg:max-w-[100vw]'
            )}
        >
            <ScrollArea className="h-full">
                <div
                    className={cn('flex h-full p-0', {
                        'flex-col p-0 space-y-6': isMobile,
                    })}
                    style={{
                        minHeight: isMobile
                            ? 'calc(100dvh - 125px)'
                            : undefined,
                    }}
                >
                    <main
                        className={cn(
                            'mx-auto flex w-full max-w-[672px] flex-1 flex-col',
                            {
                                'h-full': isMobile,
                            }
                        )}
                    >
                        {children}
                    </main>
                </div>
            </ScrollArea>
        </div>
    )
}
