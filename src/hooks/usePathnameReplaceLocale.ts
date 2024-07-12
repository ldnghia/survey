import { usePathname } from 'next/navigation'

import { getPathnameReplaceLocal } from '@/utils/route'

export const usePathnameReplaceLocale = () => {
    const pathname = usePathname()
    return getPathnameReplaceLocal(pathname)
}
