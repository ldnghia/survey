export const MAX_LIMIT = 500
export const DEFAULT_LIMIT = 20
export const HTTP_ERROR_CODE_UNAUTHORIZED = 401
export const HTTP_CLIENT_ERROR_NO_RESPONSE = 'Request Timeout'
export const HTTP_CLIENT_ERROR_UNEXPECTED = 'An Unexpected Error Occurred'

export const DEFAULT_RETRY = 1

export const HTTP_CLIENT_PROVIDERS = {
    CRM: {
        URL: 'crm',
    },
    SKYOFFICE: {
        URL: 'skyoffice/api',
    },
    INVOICE: {
        URL: 'invoice/api',
    },
    MASTER_DATA: {
        URL: 'masterdata/api',
    },
    REPORT: {
        URL: 'report/api',
    },
    ORDER: {
        URL: 'order/api',
    },
}
