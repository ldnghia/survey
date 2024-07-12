import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { LocalStorage } from '@/configs/localStorage'

export type ThemeStore = 'dark' | 'base'

type Settings = {
    theme: ThemeStore
}

type SettingsStore = {
    open: boolean
    setOpen: (open: boolean) => void
    settings: Settings
    setSettings: (settings: Partial<Settings>) => void
}

export const useSettingsStore = create<SettingsStore>()(
    persist(
        (set, get) => ({
            open: false,
            settings: {
                theme: 'base',
            },
            setOpen: (open) =>
                set({
                    open,
                }),
            setSettings: (settings) =>
                set({
                    settings: {
                        ...get().settings,
                        ...settings,
                    },
                }),
        }),
        {
            name: LocalStorage.settings,
        }
    )
)
