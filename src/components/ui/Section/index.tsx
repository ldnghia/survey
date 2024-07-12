import React from 'react'

import { cn } from '@/libs/cn'

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
    ({ className, ...props }, ref) => (
        <div
            className={cn(
                'mx-auto flex w-full max-w-[520px] flex-col gap-4',
                className
            )}
            {...props}
            ref={ref}
        />
    )
)

Section.displayName = 'Section'

const SectionHeader = React.forwardRef<HTMLDivElement, SectionProps>(
    ({ className, ...props }, ref) => (
        <div
            className={cn('flex flex-col gap-2', className)}
            {...props}
            ref={ref}
        />
    )
)

SectionHeader.displayName = 'SectionHeader'

const SectionTitle = React.forwardRef<HTMLDivElement, SectionProps>(
    ({ className, ...props }, ref) => (
        <div
            className={cn('text-heading-l text-neutral-text', className)}
            {...props}
            ref={ref}
        />
    )
)
SectionTitle.displayName = 'SectionTitle'

const SectionDescription = React.forwardRef<HTMLDivElement, SectionProps>(
    ({ className, ...props }, ref) => (
        <div
            className={cn('text-base text-neutral-text-secondary', className)}
            {...props}
            ref={ref}
        />
    )
)
SectionDescription.displayName = 'SectionDescription'

const SectionSubHeader = React.forwardRef<HTMLDivElement, SectionProps>(
    ({ className, ...props }, ref) => (
        <div
            className={cn(
                'font-medium italic text-neutral-text-tertiary',
                className
            )}
            {...props}
            ref={ref}
        />
    )
)
SectionSubHeader.displayName = 'SectionSubHeader'

const SectionContent = React.forwardRef<HTMLDivElement, SectionProps>(
    ({ className, ...props }, ref) => (
        <div className={cn('flex flex-col', className)} {...props} ref={ref} />
    )
)
SectionContent.displayName = 'SectionContent'

export {
    SectionHeader,
    SectionTitle,
    SectionDescription,
    SectionSubHeader,
    Section,
    SectionContent,
}
