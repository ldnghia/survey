import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import { PluginAPI } from 'tailwindcss/types/config'

import {paletteBuilder} from './src/themes'


export default  {
    important: true,
    darkMode: 'class',
    content: [
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/views/**/*.{js,ts,jsx,tsx,mdx}',
        './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@dcorp/web-ui/dist/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    corePlugins: {
        preflight: false,
    },
    theme: {
        colors: {
            ...paletteBuilder(),
            inherit: 'inherit',
            transparent: 'transparent',
        },
        extend: {
            width: {
                sidebar: '230px',
                section: '784px',
                "11" : "2.75rem",
            },
            height: {
                navbar: '48px',
                "11" : "2.75rem",
                // https://stackoverflow.com/questions/61308575/tailwind-h-screen-doesn-t-work-properly-on-mobile-devices
                screen : 'calc(100dvh)'
            },
            boxShadow: {
                1: '0px 0px 10px rgba(0, 0, 0, 0.1',
                popover:
                    '0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)',
                sidebar: '0 -1px 0 rgb(255,255,255,0.1) inset',
                dropdown:
                    '0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08)',
                'drop-shadow': '0px 0px 10px 0px rgba(0, 0, 0, 0.10)',
                'page-title': '0px 0px 16px 0px rgba(0, 0, 0, 0.08)',
                'page-title-dark': '0px 0px 16px 0px rgba(255, 255, 255, 0.08)',
                footer: '0px 6px 16px 0px rgba(0, 0, 0, 0.08)',
                'footer-dark': '0px 0px 16px 0px rgba(255, 255, 255, 0.08)',
                'sticky-column':
                    'inset -0.625rem 0 0.5rem -0.5rem rgba(5, 5, 5, 0.06)',
            },
            spacing: {
                'sidebar-header': '48px',
                sidebar: '256px',
                'collapse-sidebar': '64px',
            },
            fontSize: {
                'heading-s': [
                    '1.125rem',
                    {
                        lineHeight: '1.375rem',
                        fontWeight: 500,
                    },
                ],
                'heading-m': [
                    '1.25rem',
                    {
                        lineHeight: '1.5rem',
                        fontWeight: 500,
                    },
                ],
                'heading-l': [
                    '1.5rem',
                    {
                        lineHeight: '1.75rem',
                        fontWeight: 500,
                    },
                ],
                'heading-xl': [
                    '1.75rem',
                    {
                        lineHeight: '2rem',
                        fontWeight: 500,
                    },
                ],
            },
        },
        maxHeight: ({theme}) => ({
            ...theme('height'),
        }),
        minHeight: ({theme}) => ({
            ...theme('height'),
        }),
        minWidth: ({theme}) => ({
            ...theme('width'),
        }),
        maxWidth: ({theme}) => ({
            ...theme('width'),
        }),
    },
    variants: {},

    plugins: [
        ({ addVariant } : PluginAPI) => {
            addVariant('child', '& > *')
            addVariant('child-hover', '& > *:hover')
        },
        plugin(function addUtilitiesPlugin({ addUtilities }) {
            addUtilities({
                '.flex-center': {
                    display: 'flex',
                    'align-items': 'center',
                    'justify-content': 'center',
                },
                '.break-word': {
                    'word-break': 'break-word',
                },
            })
        }),
    ],
}   satisfies Config
