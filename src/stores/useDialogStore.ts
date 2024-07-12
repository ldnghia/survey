import { create } from 'zustand'

export type DialogType = 'user-menu' | 'add-request' | 'language' | 'theme'

interface DialogStoreState {
    openDialog: Partial<Record<DialogType, boolean>>
    state?: Record<string, any>
}

interface DialogStoreAction {
    setOpenDialog: (
        dialog: DialogStoreState['openDialog'],
        state?: DialogStoreState['state']
    ) => void
}

export const initialStateDialogStore: DialogStoreState = {
    state: {},
    openDialog: {
        'user-menu': false,
        'add-request': false,
        language: false,
        theme: false,
    },
}

const useDialogStore = create<DialogStoreState & DialogStoreAction>(
    (set, get) => ({
        ...initialStateDialogStore,
        setOpenDialog: (dialog, state) =>
            set({
                openDialog: {
                    ...get().openDialog,
                    ...dialog,
                },
                state,
            }),
    })
)

export default useDialogStore
