import { themeColors } from '@/themes'
import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: typeof themeColors
    }
}
