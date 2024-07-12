import { presetDarkPalettes, presetPalettes } from '@ant-design/colors'

import { ThemeStore } from '@/stores/settings'

import { baseColors } from './base'
import { darkColors } from './dark'

export const themes = {
    base: {
        ...baseColors,
    },
    dark: {
        ...darkColors,
    },
}

export const convertObjectToVariables = (obj: Object, parentKey = '') => {
    const converted: any = {}

    Object.entries(obj).forEach(([key, value]) => {
        const variableName = parentKey ? `${parentKey}-${key}` : key

        if (typeof value === 'object') {
            const nestedVariables = convertObjectToVariables(
                value,
                variableName
            )
            Object.assign(converted, nestedVariables)
        } else {
            converted[variableName] = value
        }
    })

    return converted
}

export const convertToVariables = <T>(data: any, parentKey?: any): T => {
    const convertedData = JSON.parse(JSON.stringify(data)) // Tạo bản sao của dữ liệu gốc

    Object.keys(convertedData).forEach((key) => {
        const newKey = parentKey ? `${parentKey}-${key}` : key
        if (convertedData[key] instanceof Object) {
            convertedData[key] = convertToVariables(convertedData[key], newKey)
        } else {
            convertedData[key] = `var(--color-${newKey},${convertedData[key]})`
        }
    })

    return convertedData
}

export const mergedColors = (baseTheme: any, newTheme: any) => {
    return Object.keys(baseTheme).reduce((merged: any, key: any) => {
        if (newTheme[key]) {
            // If the key exists in both objects, merge the properties
            if (
                typeof baseTheme[key] === 'object' &&
                typeof newTheme[key] === 'object'
            ) {
                merged[key] = { ...baseTheme[key], ...newTheme[key] }
            } else {
                merged[key] = newTheme[key]
            }
        } else {
            // For all other keys, use the value from the original baseColors object
            merged[key] = baseTheme[key]
        }
        return merged
    }, {})
}

const applyTheme = (theme: ThemeStore = 'base') => {
    if (typeof document === 'undefined') return
    const colors = mergedColors(themes.base, themes[theme])

    const variables = convertObjectToVariables(colors)

    if (theme === 'dark') {
        document.querySelector('body')?.classList.add('dark')
    } else {
        document.querySelector('body')?.classList.remove('dark')
    }

    Object.entries(variables).forEach(([key, value]) => {
        document.documentElement.style.setProperty(
            `--color-${key}`,
            value as any
        )
    })
}

export function getRandomColors(
    length: number,
    theme: ThemeStore = 'base'
): string[] {
    const darkPalettesArray: string[][] = Object.values(
        Object.entries(presetDarkPalettes)
            .filter(([key]) => key !== 'grey')
            .map(([, value]) => value)
    )

    const lightPalettesArray: string[][] = Object.values(
        Object.entries(presetPalettes)
            .filter(([key]) => key !== 'grey')
            .map(([, value]) => value)
    )

    const colors = theme !== 'base' ? lightPalettesArray : darkPalettesArray
    const randomColors: string[] = []

    let currentIndex = 6 // blue-6
    let currentPaletteIndex = 8 // blue

    while (randomColors.length < length) {
        if (currentPaletteIndex >= colors.length) {
            currentPaletteIndex = 0
        }

        const currentPalette = colors[currentPaletteIndex]

        if (currentPalette) {
            const currentIndexInPalette = currentIndex % currentPalette.length

            const randomColor: any = currentPalette[currentIndexInPalette]

            if (!randomColors.includes(randomColor)) {
                randomColors.push(randomColor)
                currentPaletteIndex += 1
            } else {
                currentIndex += 1
            }
        }
    }

    return randomColors
}

export const themeColors = convertToVariables<typeof themes.base>(themes.base)

export default applyTheme

const convertToTailwind = (color: any) => {
    const variables: any = {}

    Object.entries(convertObjectToVariables(color)).forEach(([key, value]) => {
        variables[key] = `var(--color-${key},${value})`
    })
    return variables
}

export const paletteBuilder = () => {
    return convertToTailwind(baseColors)
}
