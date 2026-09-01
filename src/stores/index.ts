import { QariId } from '@/libs/audio'

import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { LastRead } from 'quran-app'

export const search = atom<string>('')

// Posisi terakhir dibaca — persist di localStorage key 'last-read', null jika belum ada
export const lastRead = atomWithStorage<LastRead | null>('last-read', null)

// Preferensi baca — semuanya persist di localStorage (per perangkat).
// Komponen yang membacanya wajib digate flag mounted agar tidak mismatch dengan HTML SSG
export const qari = atomWithStorage<QariId>('qari', '01')
export const arabicFontSize = atomWithStorage<'kecil' | 'sedang' | 'besar'>(
  'arabic-font-size',
  'sedang'
)
export const showLatin = atomWithStorage<boolean>('show-latin', true)
export const showTerjemahan = atomWithStorage<boolean>('show-terjemahan', true)
