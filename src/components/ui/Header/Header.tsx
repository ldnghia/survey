import React from 'react'

import { cn } from '@/libs/cn'

const Header = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div
            className={cn('flex w-full flex-col space-y-4', className)}
            ref={ref}
            {...props}
        />
    )
})

Header.displayName = 'Header'

const HeaderPanel = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div
            className={cn('flex items-center justify-between', className)}
            ref={ref}
            {...props}
        />
    )
})

HeaderPanel.displayName = 'Header'

const HeaderContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div
            className={cn('flex w-full flex-col items-center', className)}
            ref={ref}
            {...props}
        />
    )
})

HeaderContent.displayName = 'Header'

export { Header, HeaderPanel, HeaderContent }
