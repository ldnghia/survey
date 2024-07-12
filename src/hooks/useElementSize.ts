import { useCallback, useState } from 'react'

import { useEventListener } from './useEventListener'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

interface Size {
    width: number
    height: number
}

export function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
    (node: T | null) => void,
    Size
] {
    // Mutable values like 'ref.current' aren't valid dependencies
    // because mutating them doesn't re-render the component.
    // Instead, we use a state as a ref to be reactive.
    const [ref, setRef] = useState<T | null>(null)
    const [size, setSize] = useState<Size>({
        width: 0,
        height: 0,
    })

    // Prevent too many rendering using useCallback
    const handleSize = useCallback(() => {
        if (ref) {
            setSize({
                width: ref.offsetWidth,
                height: ref.offsetHeight,
            })
        }
    }, [ref?.offsetHeight, ref?.offsetWidth, ref])

    useEventListener('resize', handleSize)

    useIsomorphicLayoutEffect(() => {
        handleSize()
    }, [ref?.offsetHeight, ref?.offsetWidth, ref])

    return [setRef, size]
}
