import { themeColors } from '@dcorp/web-ui'
import SimpleBar from 'simplebar-react'
import styled from 'styled-components'

export const Scrollable = styled(SimpleBar)`
    .simplebar-scrollbar::before {
        background-color: ${themeColors.neutral.scroll};
        top: 0px;
        bottom: 0px;
        right: 0px;
    }
    .simplebar-scrollbar.simplebar-visible:before {
        opacity: 1;
    }
`
