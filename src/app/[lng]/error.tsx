'use client'

import SomethingError from '@/components/ui/SomethingError'
import { ErrorComponentProps } from '@/types/common'

// Error components must be Client Components
export default function Error(props: ErrorComponentProps) {
    return <SomethingError {...props} />
}
