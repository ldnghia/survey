import { useMediaQuery } from 'react-responsive'

export const useDetectDeviceSize = () => {
    const isMobile = useMediaQuery({ maxWidth: 672 })
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 })
    const isDesktop = useMediaQuery({ minWidth: 992 })
    const isNotMobile = useMediaQuery({ minWidth: 768 })
    return {
        isMobileOnly: isMobile,
        isMobile: isTablet || isMobile,
        isTablet,
        isDesktop,
        isNotMobile,
    }
}
