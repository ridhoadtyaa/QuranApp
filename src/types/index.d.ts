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

  // Versi ramping SuratData untuk halaman home: hanya field yang dipakai kartu Surah,
  // agar payload getStaticProps tidak membawa deskripsi & audioFull yang tidak terpakai
  export type SuratListItem = Pick<
    SuratData,
    'nomor' | 'nama' | 'namaLatin' | 'jumlahAyat' | 'tempatTurun'
  >

  // Penanda posisi terakhir dibaca, disimpan di localStorage (per perangkat)
  export interface LastRead {
    surah: number
    namaLatin: string
    ayat: number
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
    // opsional: getStaticProps halaman detail sengaja membuang audio per-ayat (tidak dipakai UI)
    audio?: { [key: string]: string }
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
