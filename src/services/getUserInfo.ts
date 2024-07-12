import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '@/configs/query'
import useAuthStore from '@/stores/useAuthStore'
import { UserInfo } from '@/types/user'

export const useGetUserInfoQuery = () => {
    const { keycloak } = useAuthStore()

    return useQuery<UserInfo>(
        QueryKeys.GET_USER_INFO,
        () => keycloak?.loadUserInfo?.() || Promise.resolve({} as UserInfo)
    )
}
