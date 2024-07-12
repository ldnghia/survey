'use client'

import SomethingError from '@/components/ui/SomethingError'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    return (
        <html>
            <body>
                <SomethingError
                    title="Something went wrong"
                    okText="Reload"
                    error={error}
                    reset={reset}
                />
            </body>
        </html>
    )
}
