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
}
