/* eslint-disable no-param-reassign */
import axios, { AxiosError } from 'axios'
import i18next, { t } from 'i18next'

import { HTTP_ERROR_CODE_UNAUTHORIZED } from '@/configs/api'
import UserService from '@/libs/keycloak/UserService'
import { isClient } from '@/utils/client'

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL

declare module 'axios' {
    export interface AxiosRequestConfig {}
}

const handleErrorResponse = async (error: AxiosError) => {
    if (error.response) {
        if (
            error.response.status === HTTP_ERROR_CODE_UNAUTHORIZED &&
            isClient
        ) {
            return Promise.reject(HTTP_ERROR_CODE_UNAUTHORIZED)
        }
        const message = error?.response?.data?.message
            ? error.response.data.message
            : error.message
        // @ts-ignore
        return error.config.withErrorHandle
            ? error.response.data
            : Promise.reject(new Error(message))
    }
    if (error.request) {
        return Promise.reject(t('message.error.time_out')) // system issue, mainly because of internet connection
    }
    return Promise.reject(t('message.error.unexpected')) // 600, unexpected error from server
}

const getMessage = (method: string) => {
    switch (method.toLowerCase()) {
        case 'get':
            return t('message.success.get')
        case 'post':
            return t('message.success.create')
        case 'put':
            return t('message.success.update')
        case 'delete':
            return t('message.success.delete')
        default:
            return t('message.success.default')
    }
}

// Common request
const request = axios.create({
    baseURL: BASE_URL,
    paramsSerializer: (params) => {
        // Sample implementation of query string building
        let result = ''
        Object.entries(params)
            .filter(([_key, val]) => val)
            .forEach(([key, _val]) => {
                result += `${key}=${encodeURIComponent(params[key])}&`
            })
        return result.substring(0, result.length - 1)
    },
})

request.interceptors.request.use(
    async (config) => {
        if (UserService()?.isLoggedIn()) {
            UserService()?.updateToken()
            config.headers = {
                Authorization: `Bearer ${UserService()?.getToken()}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }

            config.params = {
                ...config.params,
                lang: i18next.language,
            }
            config.timeout = 1000 * 60 * 60
        } else {
            UserService().doLogin()
        }
        return config
    },
    (error) => Promise.reject(error)
)

request.interceptors.response.use(
    (response) => {
        if (response.data.success || response?.data?.data?.transactions) {
            return {
                data: response.data?.data,
                meta: {
                    message:
                        response.data?.meta?.message ||
                        getMessage(response.config.method ?? ''),
                },
            }
        }

        return Promise.reject(response.data)
    },
    (error) => {
        return handleErrorResponse(error)
    }
)

export default request
