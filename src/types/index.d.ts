declare module 'quran-app' {
  export interface Surat {
    code: number
    message: string
    data: SuratData[]
  }

  export interface SuratData {
    nomor: number
    nama: string
    namaLatin: string
    jumlahAyat: number
    tempatTurun: TempatTurun
    arti: string
    deskripsi: string
    audioFull: { [key: string]: string }
  }

  export enum TempatTurun {
    Madinah = 'madinah',
    Mekah = 'mekah'
  }

  export interface SuratDetail {
    data: {
      nomor: number
      nama: string
      namaLatin: string
      jumlahAyat: number
      tempatTurun: string
      arti: string
      deskripsi: string
      audioFull: { [key: string]: string }
      ayat: Ayat[]
      suratSelanjutnya: SuratNextBefore
      suratSebelumnya: SuratNextBefore
    }
  }

  export interface Ayat {
    nomorAyat: number
    teksArab: string
    teksLatin: string
    teksIndonesia: string
    audio: { [key: string]: string }
  }

  export interface Tafsir {
    code: number
    message: number
    data: TafsirList
  }

  export interface TafsirList {
    nomor: number
    nama: string
    namaLatin: string
    jumlahAyat: number
    tempatTurun: string
    arti: string
    deskripsi: string
    audioFull: { [key: string]: string }
    tafsir: TafsirDetail[]
    suratSelanjutnya: SuratSelanjutnya
    suratSebelumnya: boolean
  }

  export interface TafsirDetail {
    ayat: number
    teks: string
  }

  export interface SuratNextBefore {
    nomor: number
    nama: string
    namaLatin: string
    jumlahAyat: number
  }
}
