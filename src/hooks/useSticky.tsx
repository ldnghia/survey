import { useEffect, useRef, useState } from 'react'

/**
 * Returns a ref, and a stateful value bound to the ref
 */
export function useSticky<T extends HTMLElement>(scrollElement: HTMLElement) {
    const stickyRef = useRef<T>(null)
    const [sticky, setSticky] = useState(false)

    useEffect(() => {
        // Observe when ref enters or leaves sticky state
        // rAF https://stackoverflow.com/questions/41740082/scroll-events-requestanimationframe-vs-requestidlecallback-vs-passive-event-lis
        function observe() {
            if (!stickyRef.current) return
            const refPageOffset = stickyRef.current.getBoundingClientRect().top
            const stickyOffset = +getComputedStyle(stickyRef.current).top
            const stickyActive = refPageOffset <= stickyOffset

            if (stickyActive && !sticky) setSticky(true)
            else if (!stickyActive && sticky) setSticky(false)
        }
        observe()

        // Bind events
        scrollElement.addEventListener('scroll', observe)
        window.addEventListener('resize', observe)
        window.addEventListener('orientationchange', observe)

        return () => {
            scrollElement.removeEventListener('scroll', observe)
            window.removeEventListener('resize', observe)
            window.removeEventListener('orientationchange', observe)
        }
    }, [sticky])

    return [stickyRef, sticky] as const
}
