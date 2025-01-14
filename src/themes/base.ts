import {
    presetPalettes,
    red,
    grey,
    blue,
    green,
    gray,
    generate,
} from '@ant-design/colors'

const neutral = generate('#bfbfbf')

export const baseColors = {
    sidebar: {
        selected: '#F5F5F5',
        hover: '#FAFAFA',
        title: '#000000E0',
        item: '#000000E0',
        section: '#000000E0',
        bg: '#ffffff',
        icon: '#000000E0',
        'icon-hover': '#000000E0',
        'text-active': '#1677ff',
        'hover-danger': '#FFF1F0',
        'bg-active': '#E6F4FF',
        'bg-popover': '#ececef',
    },
    navbar: {
        'bg-hover': '#0000000F',
    },
    header: {
        'page-title': '#000000D9',
        'sub-title': '#333333',
    },
    border: '#0000000F',
    'border-menu': 'rgb(255,255,255,0.1)',
    status: {
        'deleted-bg': '#00000005',
        'deleted-text': '#000000E0',
        'deleted-border': '#D9D9D9',
        'draft-bg': '#e6fffb',
        'draft-text': '#08979c',
        'draft-border': '#87e8de',
        'inactive-bg': '#FFFBE6',
        'inactive-text': '#FAAD14',
        'inactive-border': '#FFE58F',
        'active-bg': '#F6FFED',
        'active-text': '#52C41A',
        'active-border': '#B7EB8F',
        'preset-bg': '#e6f4ff',
        'preset-text': '#1677ff',
        'preset-border': '#91caff',
        'new-bg': '#E6F7FF',
        'new-text': '#1890FF',
        'processing-bg': '#F6FFED',
        'processed-bg': '#FAFAFA',
        'processing-text': '#389E0D',
        'processed-text': 'rgba(0, 0, 0, 0.88)',
    },
    level: {
        'diamond-bg': '#F9F0FF',
        'gold-bg': '#FFFBE6',
        'silver-bg': '#00000005',
        'diamond-text': '#722ED1',
        'gold-text': '#FAAD14',
        'silver-text': '#000000E0',
    },
    neutral: {
        ...neutral,
        text: '#000000E0',
        'text-secondary': 'rgba(0, 0, 0, 0.65)',
        'text-tertiary': '#00000073',
        'text-quaternary': 'rgba(0, 0, 0, 0.25)',
        border: '#0000000F',
        'border-secondary': '#F0F0F0',
        fill: '#D9D9D9',
        'fill-secondary': '#0000000F',
        'fill-tertiary': '#E8E8E8',
        'fill-quaternary': 'rgba(0, 0, 0, 0.02)',
        'bg-container': '#FFFFFF',
        'bg-elevated': '#FFFFFF',
        'bg-table-title': '#FAFAFA',
        'bg-layout': '#FFFFFF',
        'bg-spotlight': '#242424',
        'bg-mask': '#8C8C8C',
        search: '#D9D9D9',
        'bg-icon-finish': '#1677FF',
        'border-overlay': '#FFFFFF',
        'bg-tree-selected': '#E6F4FF',
        tooltip: 'rgba(46,58,77,0.9)',
        scroll: '#D9D9D9',
        dropdown: '#00000040',
        'table-bg-hover': '#FAFAFA',
        'bg-card-feature': 'rgba(180,184,204,.14)',
    },
    spin: '#e6311a',
    'top-bar-shadow':
        '0px 2px 4px rgba(0, 0, 0, 0.02), 0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 1px 2px rgba(0, 0, 0, 0.03)',
    white: '#ffffff',
    dark: '#000000',
    'icon-placeholder': 'rgba(255, 255, 255, 0.25)',
    'menu-hover': 'rgba(0, 0, 0, 0.04)',
    icon: 'rgba(0, 0, 0, 0.29)',
    'icon-hover': 'rgba(0, 0, 0, 0.57)',
    'question-tooltip': 'rgba(0, 0, 0, 0.45)',
    red: {
        ...red,
    },
    grey: {
        ...grey,
    },
    blue: {
        ...blue,
    },
    green: {
        ...green,
    },
    gray: {
        ...gray,
    },
    ...presetPalettes,
}
