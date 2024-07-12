import acceptLanguage from 'accept-language'
import { NextRequest, NextResponse } from 'next/server'

import { languages, fallbackLng, i18nCookieName } from './libs/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
    // matcher: '/:lng*'
    matcher: [
        '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|icon.ico|silent-check-sso).*)',
    ],
}

export function middleware(req: NextRequest) {
    if (
        req.nextUrl.pathname.indexOf('icon') > -1 ||
        req.nextUrl.pathname.indexOf('chrome') > -1
    )
        return NextResponse.next()
    let lng

    const lngInPath = languages.some((loc) =>
        req.nextUrl.pathname.startsWith(`/${loc}`)
    )
        ? req.nextUrl.pathname.split('/')[1]
        : null

    if (lngInPath) {
        lng = lngInPath
    }

    if (req.cookies.has(i18nCookieName) && !lng)
        lng = acceptLanguage.get(req.cookies.get(i18nCookieName)?.value)
    if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
    if (!lng) lng = req.cookies.get(i18nCookieName)?.value ?? fallbackLng

    // Redirect if lng in path is not supported
    if (
        !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
        !req.nextUrl.pathname.startsWith('/_next')
    ) {
        return NextResponse.redirect(
            new URL(
                `/${lng}${req.nextUrl.pathname}?${req.nextUrl.searchParams}`,
                req.url
            )
        )
    }

    if (req.headers.has('referer')) {
        const refererUrl = new URL(req.headers.get('referer') as any)
        const lngInReferer = languages.find((l) =>
            refererUrl.pathname.startsWith(`/${l}`)
        )
        const response = NextResponse.next()
        if (lngInReferer) response.cookies.set(i18nCookieName, lngInReferer)

        return response
    }

    return NextResponse.next()
}
