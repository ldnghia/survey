'use client'

import { usePathname, useSearchParams } from 'next/navigation'

export function useCurrentUrl() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    return `${pathname}?${searchParams}`
}
