import 'i18next'
import { defaultNS } from '@/libs/i18n/settings'
import translation from '@/public/locales/en/translation.json'

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS
        resources: {
            translation: typeof translation
        }
    }
}
