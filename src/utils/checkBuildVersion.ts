'use-client'

import { LocalStorage } from '@/configs/localStorage'

const KEYS = {
    BUILD_VERSION: 'buildVersion',
}

export const checkBuildVersion = () => {
    const version = process.env.NEXT_PUBLIC_DCORP_VERSION || ''
    const clientVersion = localStorage.getItem(KEYS.BUILD_VERSION) || ''
    if (typeof document === 'undefined' || typeof localStorage === 'undefined')
        return
    if (
        (!clientVersion || JSON.parse(clientVersion) !== version) &&
        !!version
    ) {
        localStorage.removeItem(LocalStorage.settings)
        localStorage.setItem(KEYS.BUILD_VERSION, JSON.stringify(version))
    }
}
