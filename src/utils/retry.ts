import { DEFAULT_RETRY, HTTP_ERROR_CODE_UNAUTHORIZED } from '@/configs/api'
import { EVENT_KICK_OUT } from '@/configs/event'

import { isClient } from './client'

export const handleRetry = (failureCount: number, error: any) => {
    const isResponse401Error =
        // Allow 1 retry if response 401
        failureCount > 0 && error.message === HTTP_ERROR_CODE_UNAUTHORIZED

    if (isClient && isResponse401Error) {
        document.dispatchEvent(new Event(EVENT_KICK_OUT))
        return false
    }

    return failureCount < DEFAULT_RETRY
}
