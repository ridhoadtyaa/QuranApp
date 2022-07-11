declare module 'quran-app' {
  export interface Surat {
    nomor: number
    nama: string
    nama_latin: string
    jumlah_ayat: number
    tempat_turun: TempatTurun
    arti: string
    deskripsi: string
    audio: string
  }

  export enum TempatTurun {
    Madinah = 'madinah',
    Mekah = 'mekah'
  }

  export interface SuratDetail {
    status: boolean
    nomor: number
    nama: string
    nama_latin: string
    jumlah_ayat: number
    tempat_turun: string
    arti: string
    deskripsi: string
    audio: string
    ayat: Ayat[]
    surat_selanjutnya: SuratNextBefore | false
    surat_sebelumnya: SuratNextBefore | false
  }

  export interface Ayat {
    id: number
    surah: number
    nomor: number
    ar: string
    tr: string
    idn: string
  }

  export interface Tafsir {
    id: number
    surah: number
    ayat: number
    tafsir: string
  }

  export interface SuratNextBefore {
    id: number
    nomor: number
    nama: string
    nama_latin: string
    jumlah_ayat: number
    tempat_turun: string
    arti: string
    deskripsi: string
    audio: string
  }
}
