import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'

import { getOptions } from './settings'

const initI18next = async (lng: any, ns: any) => {
    // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
    const i18nInstance = createInstance()
    await i18nInstance
        .use(initReactI18next)
        .use(
            resourcesToBackend(
                (language: any, namespace: any) =>
                    import(`@/public/locales/${language}/${namespace}.json`)
            )
        )
        .init(getOptions(lng, ns))
    return i18nInstance
}

// eslint-disable-next-line import/prefer-default-export
export async function useServerTranslate(
    lng: any,
    ns?: any,
    options: any = {}
) {
    const i18nextInstance = await initI18next(lng, ns)
    return {
        t: i18nextInstance.getFixedT(
            lng,
            Array.isArray(ns) ? ns[0] : ns,
            options.keyPrefix
        ),
        i18n: i18nextInstance,
    }
}
