'use client'

import * as React from 'react'

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

import { cn } from '@/libs/cn'

export interface ScrollBarProps
    extends React.ComponentPropsWithoutRef<
        typeof ScrollAreaPrimitive.ScrollAreaScrollbar
    > {
    scrollAreaThumbProps?: React.ComponentPropsWithoutRef<
        typeof ScrollAreaPrimitive.ScrollAreaThumb
    >
}

const ScrollBar = React.forwardRef<
    React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
    ScrollBarProps
>(
    (
        { className, orientation = 'vertical', scrollAreaThumbProps, ...props },
        ref
    ) => (
        <ScrollAreaPrimitive.ScrollAreaScrollbar
            ref={ref}
            orientation={orientation}
            className={cn(
                'flex touch-none select-none transition-colors',
                orientation === 'vertical' &&
                    'h-full w-2 border-l border-l-transparent',
                orientation === 'horizontal' &&
                    'h-2 flex-col border-t border-t-transparent',
                className
            )}
            {...props}
        >
            <ScrollAreaPrimitive.ScrollAreaThumb
                {...scrollAreaThumbProps}
                className={cn(
                    'relative z-[999] flex-1 rounded-full bg-neutral-scroll',
                    scrollAreaThumbProps?.className
                )}
            />
        </ScrollAreaPrimitive.ScrollAreaScrollbar>
    )
)
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

const ScrollArea = React.forwardRef<
    React.ElementRef<typeof ScrollAreaPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
        scrollAreaThumbProps?: ScrollBarProps['scrollAreaThumbProps']
        verticalRef?: React.Ref<HTMLDivElement>
        viewPortRef?: React.Ref<HTMLDivElement>
        scrollBarProps?: ScrollBarProps
    }
>(
    (
        {
            className,
            children,
            onScroll,
            verticalRef,
            viewPortRef,
            scrollBarProps,
            scrollAreaThumbProps,
            ...props
        },
        ref
    ) => (
        <ScrollAreaPrimitive.Root
            ref={ref}
            className={cn('relative overflow-hidden', className)}
            {...props}
        >
            <ScrollAreaPrimitive.Viewport
                onScroll={onScroll}
                className="h-full w-full rounded-[inherit] [&>*:first-child]:first-of-type:h-full"
                ref={viewPortRef}
            >
                {children}
            </ScrollAreaPrimitive.Viewport>
            <ScrollBar
                scrollAreaThumbProps={scrollAreaThumbProps}
                {...scrollBarProps}
                ref={verticalRef}
            />
            <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
    )
)
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

export { ScrollArea, ScrollBar }
