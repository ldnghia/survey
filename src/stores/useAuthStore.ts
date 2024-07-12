import Keycloak from 'keycloak-js'
import { create } from 'zustand'

interface AuthStore {
    keycloak: Keycloak | null
    initialized: boolean
    initializeKeycloack: () => void
    isError: boolean
    errorMessage?: string
}

const keycloakConfig = {
    url: process.env.NEXT_PUBLIC_KEY_CLOAK_URL || '',
    realm: process.env.NEXT_PUBLIC_KEY_CLOAK_REALM || '',
    clientId: process.env.NEXT_PUBLIC_KEY_CLOAK_CLIENT_ID || '',
}

const useAuthStore = create<AuthStore>((set, get) => ({
    keycloak: null,
    initialized: false,
    isError: false,
    initializeKeycloack: async () => {
        const state = get()
        if (!state.initialized) {
            const keycloak = new Keycloak(keycloakConfig)
            // you probably want to do something else here than just calling init() without any other logic
            // follow keycloak js adapter docs
            try {
                const authenticated = await keycloak.init({
                    onLoad: 'check-sso',
                    pkceMethod: 'S256',
                    silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
                })
                if (authenticated) {
                    set({
                        keycloak,
                        initialized: true,
                    })
                } else {
                    keycloak.login()
                }
            } catch (err: any) {
                set({
                    isError: true,
                    errorMessage: err.message || err,
                })
            }
        }
    },
}))

export default useAuthStore
