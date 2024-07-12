import * as React from 'react'

import Image, { ImageProps } from 'next/image'

import { useDetectDeviceSize } from '@/hooks/useDetectDeviceSize'
import { cn } from '@/libs/cn'
import RequestBg from '@/public/images/request.png'

import Link, { LinkCustomProps } from '../Link'
import { SectionTitle } from '../Section'

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'relative h-[124px] overflow-hidden rounded-3xl bg-neutral-bg-card-feature',
            className
        )}
        {...props}
    />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-3', className)}
        {...props}
    />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            'text-base font-semibold leading-none tracking-tight',
            className
        )}
        {...props}
    />
))
CardTitle.displayName = 'CardTitle'

const CardCover = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('absolute inset-0', className)} {...props}>
        {props.children}
    </div>
))
CardCover.displayName = 'CardCover'

export interface CardFeatureProps extends Partial<LinkCustomProps> {
    title: React.ReactNode
    src?: ImageProps['src']
}

const CardFeature = ({
    title,
    src = RequestBg,
    ...props
}: CardFeatureProps) => {
    return (
        <Link {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                {src && (
                    <CardCover>
                        <div className="relative w-[114%] h-[114%]">
                            <Image src={RequestBg} fill alt="request" />
                        </div>
                    </CardCover>
                )}
            </Card>
        </Link>
    )
}

const ListFeatureTitle = ({
    className,
    children,
    ...props
}: LinkCustomProps) => {
    const { isMobile } = useDetectDeviceSize()
    return (
        <Link
            className={cn(
                'w-fit',
                {
                    'w-full': isMobile,
                },
                className
            )}
            {...props}
        >
            <SectionTitle className="flex items-center justify-between">
                {children}
            </SectionTitle>
        </Link>
    )
}
ListFeatureTitle.displayName = 'ListFeatureTitle'

export { CardFeature, ListFeatureTitle }
