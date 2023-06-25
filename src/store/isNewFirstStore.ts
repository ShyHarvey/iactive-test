import { create } from 'zustand'

type State = {
    isNewFirst: boolean,
    setIsNewFirst: (isNewFirst: boolean) => void
}

export const useNewFirst = create<State>((set) => ({
    isNewFirst: false,
    setIsNewFirst: (isNewFirst) => set(() => ({ isNewFirst: isNewFirst })),
}))