import { languages } from '@/libs/i18n/settings'

export const getPathnameReplaceLocal = (pathname: string) => {
    let newPathname = pathname
    languages.forEach((locale) => {
        const pattern = new RegExp(`^\\/${locale}\\/?`, 'g')
        if (newPathname.length === pathname.length) {
            newPathname = pathname.replace(pattern, '') // replace the locale string with an empty string
        }
    })
    return newPathname
}
export function checkURLMatch(constant: string, url: string) {
    // Chuẩn bị biểu thức chính quy từ constant
    const regexPattern = constant
        .replace(/\//g, '\\/')
        .replace(/\[.*?\]/g, '([^\\/]+)') // Thay thế các phần tử linh động bằng '([^\\/]+)', nghĩa là bất kỳ ký tự không phải dấu / nào

    const regex = new RegExp(`^${regexPattern}$`)

    // Kiểm tra khớp chuỗi URL với constant
    return regex.test(url)
}
