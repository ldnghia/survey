export const createQueryString = (params: Record<string, string>) => {
    const query = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    return query ? `?${query}` : ''
}

export const createPathnameAndQueryString = (
    pathname: string,
    params: Record<string, string>
) => {
    const query = createQueryString(params)

    // Thay thế [nội dung] trong chuỗi pathname bằng giá trị từ params
    let updatedPathname = pathname
    Object.entries(params).forEach(([key, value]) => {
        updatedPathname = updatedPathname.replace(`[${key}]`, value)
    })

    return `${updatedPathname}${query}`
}
