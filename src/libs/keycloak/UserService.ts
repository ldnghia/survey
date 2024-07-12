'use client'

import useAuthStore from '@/stores/useAuthStore'

const UserService = () => {
    const { keycloak } = useAuthStore.getState()

    const doLogin = keycloak?.login || (() => {})

    const doLogout = () => {
        localStorage.clear()
        sessionStorage.clear()
        keycloak?.logout()
    }

    const getToken = () => keycloak?.token

    const isLoggedIn = () => !!keycloak?.token

    const updateToken = () =>
        keycloak
            ?.updateToken(5)
            .then(() => {})
            .catch(() => {
                doLogin()
            })

    const getUsername = () => keycloak?.tokenParsed?.preferred_username

    const hasRole = (roles: string[]) =>
        roles.some((role) => keycloak?.hasRealmRole(role))

    return {
        doLogin,
        doLogout,
        isLoggedIn,
        getToken,
        updateToken,
        getUsername,
        hasRole,
        keycloak,
    }
}

export default UserService
