'use client'

import type { DependencyList } from 'react'
import { useEffect } from 'react'

import axios from 'axios'

import UserService from './UserService'

const PATH_SEPARATOR = '/'
const CONTENT_TYPE_HEADER = 'content-type'
const CONTENT_TYPE_JSON = 'application/json'

type CallOptions = {
    signal?: AbortSignal
}

export type Environment = {
    /** The realm which should be used when signing into the application. */
    loginRealm: string
    /** The URL to the root of the auth server. */
    authServerUrl: string
}

interface UserProfileAttributeMetadata {
    name: string
    displayName: string
    required: boolean
    readOnly: boolean
    annotations: { [index: string]: any }
    validators: { [index: string]: { [index: string]: any } }
}

interface UserProfileMetadata {
    attributes: UserProfileAttributeMetadata[]
}

export interface UserRepresentation {
    id: string
    username: string
    firstName: string
    lastName: string
    email: string
    emailVerified: boolean
    userProfileMetadata: UserProfileMetadata
    attributes: { [index: string]: string[] }
}

export class ApiError extends Error {}

// The default environment, used during development.
const environment: Environment = {
    loginRealm: process.env.NEXT_PUBLIC_KEY_CLOAK_REALM || '',
    authServerUrl: process.env.NEXT_PUBLIC_KEY_CLOAK_URL || '',
}

/**
 * Function that creates a Promise. Receives an [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
 * which is aborted when the component unmounts, or the dependencies of the hook have changed.
 */
export type PromiseFactoryFn<T> = (signal: AbortSignal) => Promise<T>

/**
 * Function which is called with the value of the Promise when it resolves.
 */
export type PromiseResolvedFn<T> = (value: T) => void

/**
 * Takes a function that creates a Promise and returns its resolved result through a callback.
 *
 * ```ts
 * const [products, setProducts] = useState();
 *
 * function getProducts() {
 *  return fetch('/api/products').then((res) => res.json());
 * }
 *
 * usePromise(() => getProducts(), setProducts);
 * ```
 *
 * Also takes a list of dependencies, when the dependencies change the Promise is recreated.
 *
 * ```ts
 * usePromise(() => getProduct(id), setProduct, [id]);
 * ```
 *
 * Can abort a fetch request, an [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) is provided from the factory function to do so.
 * This signal will be aborted if the component unmounts, or if the dependencies of the hook have changed.
 *
 * ```ts
 * usePromise((signal) => fetch(`/api/products/${id}`, { signal }).then((res) => res.json()), setProduct, [id]);
 * ```
 *
 * @param factory Function that creates the Promise.
 * @param callback Function that gets called with the value of the Promise when it resolves.
 * @param deps If present, Promise will be recreated if the values in the list change.
 */
export function usePromise<T>(
    factory: PromiseFactoryFn<T>,
    callback: PromiseResolvedFn<T>,
    deps: DependencyList = []
) {
    useEffect(() => {
        const controller = new AbortController()
        const { signal } = controller

        async function handlePromise() {
            const value = await factory(signal)

            if (!signal.aborted) {
                callback(value)
            }
        }

        handlePromise()

        return () => controller.abort()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}

function joinPath(...paths: string[]) {
    const normalizedPaths = paths.map((path, index) => {
        const isFirst = index === 0
        const isLast = index === paths.length - 1

        // Strip out any leading slashes from the path.
        let newPath = path
        if (!isFirst && path.startsWith(PATH_SEPARATOR)) {
            newPath = path.slice(1)
        }

        // Strip out any trailing slashes from the path.
        if (!isLast && path.endsWith(PATH_SEPARATOR)) {
            newPath = path.slice(0, -1)
        }

        return newPath
    }, [])

    return normalizedPaths.join(PATH_SEPARATOR)
}

async function requestUserInfo<T = any>(
    path: string,
    { signal, method, searchParams, body }: any = {}
): Promise<{
    data: T
    statusText?: string
    message?: string
}> {
    const url: any = joinPath(
        environment.authServerUrl,
        'realms',
        environment.loginRealm,
        'account',
        path
    )

    if (searchParams) {
        Object.entries(searchParams).forEach(([key, value]: any) =>
            url.searchParams.set(key, value)
        )
    }

    return axios.request({
        url,
        signal,
        method,
        data: body ? JSON.stringify(body) : undefined,
        headers: {
            [CONTENT_TYPE_HEADER]: CONTENT_TYPE_JSON,
            authorization: `Bearer ${UserService()?.getToken()}`,
        },
    })
}

export async function getPersonalInfo({
    signal,
}: CallOptions = {}): Promise<UserRepresentation> {
    const response = await requestUserInfo<UserRepresentation>(
        '/?userProfileMetadata=true',
        {
            signal,
        }
    )
    return response.data
}

export async function savePersonalInfo(
    info: UserRepresentation
): Promise<void> {
    try {
        await requestUserInfo('/', {
            body: info,
            method: 'POST',
        })
    } catch (e) {
        console.log(e)
        throw e
    }
}
