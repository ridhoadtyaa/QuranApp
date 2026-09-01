// URL audio CDN eQuran mengikuti pola deterministik, jadi tidak perlu ikut payload API:
// full  : https://cdn.equran.id/audio-full/{slug-qari}/{surah 3 digit}.mp3
// ayat  : https://cdn.equran.id/audio-partial/{slug-qari}/{surah 3 digit}{ayat 3 digit}.mp3
export const QARI_LIST = [
  { id: '01', nama: 'Abdullah Al-Juhany', slug: 'Abdullah-Al-Juhany' },
  { id: '02', nama: 'Abdul Muhsin Al-Qasim', slug: 'Abdul-Muhsin-Al-Qasim' },
  { id: '03', nama: 'Abdurrahman As-Sudais', slug: 'Abdurrahman-as-Sudais' },
  { id: '04', nama: 'Ibrahim Al-Dossari', slug: 'Ibrahim-Al-Dossari' },
  { id: '05', nama: 'Misyari Rasyid Al-Afasi', slug: 'Misyari-Rasyid-Al-Afasi' },
  { id: '06', nama: 'Yasser Al-Dosari', slug: 'Yasser-Al-Dosari' }
] as const

export type QariId = (typeof QARI_LIST)[number]['id']

const CDN = 'https://cdn.equran.id'

const pad = (angka: number, panjang: number) => angka.toString().padStart(panjang, '0')

const qariSlug = (id: QariId) => QARI_LIST.find((q) => q.id === id)?.slug ?? QARI_LIST[0].slug

export const audioFullUrl = (qari: QariId, surah: number) =>
  `${CDN}/audio-full/${qariSlug(qari)}/${pad(surah, 3)}.mp3`

export const audioAyatUrl = (qari: QariId, surah: number, ayat: number) =>
  `${CDN}/audio-partial/${qariSlug(qari)}/${pad(surah, 3)}${pad(ayat, 3)}.mp3`
