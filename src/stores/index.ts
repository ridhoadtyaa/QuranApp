import { atomWithStorage } from 'jotai/utils'

type Theme = 'light' | 'dark'

export const theme = atomWithStorage<Theme>('theme', 'light')
