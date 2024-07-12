import React from 'react'

import { Card } from 'antd'
import styled from 'styled-components'

import { cn } from '@/libs/cn'

import { CardProps } from '../Card'

const StyledCard = styled(Card)`
    .ant-card-body {
        padding: 0px;
    }
`

export const CardMeta = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, ...props }, ref) => (
        <StyledCard
            className={cn('cursor-pointer rounded-2xl', className)}
            ref={ref}
            {...props}
        />
    )
)

CardMeta.displayName = 'CardMeta'

export const Meta = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        hovered?: boolean
    }
>(({ className, hovered, ...props }, ref) => (
    <div
        className={cn(
            'flex w-full items-center gap-4 rounded-2xl p-3',
            {
                'hover:bg-neutral-bg-card-feature group': hovered,
            },
            className
        )}
        ref={ref}
        {...props}
    />
))

Meta.displayName = 'Meta'

export const MetaAvatar = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        className={cn(
            'flex min-h-11 min-w-11 items-center justify-center overflow-hidden rounded-full bg-neutral-1',
            className
        )}
        ref={ref}
        {...props}
    />
))

MetaAvatar.displayName = 'MetaAvatar'

export const MetaContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        className={cn(
            'flex w-full flex-col justify-between gap-0.5',
            className
        )}
        ref={ref}
        {...props}
    />
))

MetaContent.displayName = 'MetaContent'

export const MetaTitle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        truncate?: boolean
    }
>(({ className, truncate = true, ...props }, ref) => (
    <div
        className={cn(
            'text-base font-medium  text-neutral-text',
            {
                'line-clamp-1 break-word': truncate,
            },
            className
        )}
        ref={ref}
        {...props}
    />
))

MetaTitle.displayName = 'MetaTitle'

export const MetaDescription = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        truncate?: boolean
    }
>(({ className, truncate, ...props }, ref) => (
    <div
        className={cn(
            'text-sm font-normal text-neutral-text-tertiary',
            {
                'line-clamp-1 break-word': truncate,
            },
            className
        )}
        ref={ref}
        {...props}
    />
))

MetaDescription.displayName = 'MetaDescription'

export const MetaAction = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        className={cn('flex items-center justify-center', className)}
        ref={ref}
        {...props}
    />
))

MetaAction.displayName = 'MetaAction'
