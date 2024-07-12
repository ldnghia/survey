import { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import Providers from '@/components/Provider'
import { cn } from '@/libs/cn'
import { I18nProvider } from '@/libs/i18n/provider'
import { languages } from '@/libs/i18n/settings'
import StyledComponentsRegistry from '@/libs/registry'

import 'antd/dist/reset.css'
import '@dcorp/web-ui/dist/style.css'
import '../../styles/globals.css'

declare module '@tanstack/react-query' {
    interface QueryMeta {
        successMessage?: string
        errorMessage?: string
        disableMessage?: boolean
        disableErrorMessage?: boolean
    }
    interface MutationMeta extends QueryMeta {}
}

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
    title: 'SkySurvey',
    openGraph: {
        title: 'SkySurvey',
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: false,
}

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
    children,
    params: { lng },
}: {
    children: React.ReactNode
    params: {
        lng: string
    }
}) {
    return (
        <html suppressHydrationWarning={true} lang={lng}>
            <body
                className={cn('overflow-y-hidden', inter.className)}
                suppressHydrationWarning={true}
            >
                <StyledComponentsRegistry>
                    <I18nProvider lng={lng}>
                        <Providers locale={lng}>{children}</Providers>
                    </I18nProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}
