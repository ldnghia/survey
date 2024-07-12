'use client'

import React from 'react'

import LoadingOverlay from '@/components/ui/LoadingOverlay'
import SomethingError from '@/components/ui/SomethingError'
import useAuthStore from '@/stores/useAuthStore'

export const LayoutAuthorized = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const {
        initialized,
        initializeKeycloack,
        isError: isErrorConfigKeycloak,
        errorMessage,
    } = useAuthStore()

    React.useEffect(function handleInitializeKeycloack() {
        initializeKeycloack()
    }, [])

    if (isErrorConfigKeycloak) {
        return (
            <SomethingError
                error={{
                    message: (
                        <div>
                            Something wrong with keycloak config
                            <div>{errorMessage}</div>
                        </div>
                    ),
                    name: 'Keycloak config error',
                }}
                reset={() => window.location.reload()}
            />
        )
    }

    if (!initialized) {
        return <LoadingOverlay />
    }

    return <>{children}</>
}
