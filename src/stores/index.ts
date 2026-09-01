import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { LastRead } from 'quran-app'

export const search = atom<string>('')

// Posisi terakhir dibaca — persist di localStorage key 'last-read', null jika belum ada
export const lastRead = atomWithStorage<LastRead | null>('last-read', null)
