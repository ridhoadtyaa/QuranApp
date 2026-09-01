import { twclsx } from '@/libs'
import * as atom from '@/stores'

import Button from '../atoms/Button'

import Modal from './Modal'

import { useAtom } from 'jotai'
import { Ayat, TafsirDetail } from 'quran-app'
import { memo, useEffect, useState } from 'react'
import { AiOutlineRead as Read, AiOutlineShareAlt as Share } from 'react-icons/ai'
import { BsBookmark as Bookmark, BsBookmarkFill as BookmarkFill } from 'react-icons/bs'

interface AyatProps {
  ayat: Ayat
  surah: string
  tafsir?: TafsirDetail
  loadTafsir: () => void
  nomor: number
}

const Ayat: React.FunctionComponent<AyatProps> = ({ ayat, surah, tafsir, loadTafsir, nomor }) => {
  const [modalTafsir, setModalTafsir] = useState(false)
  const [lastRead, setLastRead] = useAtom(atom.lastRead)

  // Status bookmark dibaca dari localStorage, jadi baru ditampilkan setelah mounted
  // agar tidak mismatch dengan HTML hasil SSG
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isLastRead = mounted && lastRead?.surah === nomor && lastRead?.ayat === ayat.nomorAyat

  const toggleLastRead = () => {
    setLastRead(isLastRead ? null : { surah: nomor, namaLatin: surah, ayat: ayat.nomorAyat })
  }

  const openTafsir = () => {
    loadTafsir()
    setModalTafsir(true)
  }

  const handleSharing = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: surah,
          text: `Baca Surah ${surah} ayat ${ayat.nomorAyat} di Quran App`,
          url: `https://quran-app-ran.vercel.app/surah/${nomor}#${ayat.nomorAyat}`
        })
      } catch (error) {
        console.log(`Oops! I couldn't share to the world because: ${error}`)
      }
    } else {
      console.log('Web share is currently not supported on this browser.')
    }
  }

  return (
    <>
      <div id={ayat.nomorAyat.toString()} className={twclsx('py-8')}>
        <div
          className={twclsx(
            'flex justify-between items-center',
            'bg-gray-100/90 rounded-lg dark:bg-[#101D4D]',
            'py-2 px-4'
          )}
        >
          <div
            className={twclsx(
              'bg-primary-700 rounded-full dark:bg-primary-500',
              'text-white text-center text-sm leading-7',
              'w-7 h-7'
            )}
          >
            <span className={twclsx('sr-only')}>Ayat </span>
            {ayat.nomorAyat}
          </div>
          <div className={twclsx('flex items-center', 'space-x-4')}>
            <Button onClick={toggleLastRead}>
              {isLastRead ? (
                <BookmarkFill
                  size={19}
                  className={twclsx('fill-primary-700 dark:fill-primary-400')}
                  title='Batalkan tanda terakhir dibaca'
                />
              ) : (
                <Bookmark
                  size={19}
                  className={twclsx('fill-primary-700 dark:fill-primary-400')}
                  title='Tandai terakhir dibaca'
                />
              )}
              <span className={twclsx('sr-only')}>Tombol Tandai Terakhir Dibaca</span>
            </Button>
            <Button onClick={handleSharing}>
              <Share
                size={22}
                className={twclsx('fill-primary-700 dark:fill-primary-400')}
                title='Bagikan'
              />
              <span className={twclsx('sr-only')}>Tombol Bagikan</span>
            </Button>
            <Button onClick={openTafsir}>
              <Read
                size={24}
                className={twclsx('fill-primary-700 dark:fill-primary-400')}
                title='Lihat Tafsir'
              />
              <span className={twclsx('sr-only')}>Tombol Lihat Tafsir</span>
            </Button>
          </div>
        </div>
        <div className={twclsx('mt-6', 'px-4')}>
          <div
            lang='ar'
            dir='rtl'
            className={twclsx('text-right text-3xl leading-[2.4]', 'font-arabic', 'mt-6')}
          >
            {ayat.teksArab}
          </div>
          <div
            className={twclsx('mt-8 mb-4')}
            dangerouslySetInnerHTML={{ __html: `<p>${ayat.teksLatin}</p>` }}
          />
          <p className={twclsx('text-sm', 'text-slate-600 dark:text-slate-400')}>
            {ayat.teksIndonesia}
          </p>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalTafsir}
        closeModal={() => setModalTafsir(false)}
        title={`Tafsir Ayat ${ayat.nomorAyat} Surah ${surah}`}
      >
        {/* aria-live agar screen reader mengumumkan saat tafsir selesai dimuat */}
        <div aria-live='polite'>
          {tafsir ? (
            <p className={twclsx('whitespace-pre-wrap', 'mt-6', 'text-sm xl:text-base')}>
              {tafsir.teks}
            </p>
          ) : (
            <p className={twclsx('mt-6', 'text-sm', 'text-slate-500 dark:text-slate-400')}>
              Memuat tafsir...
            </p>
          )}
        </div>
      </Modal>
    </>
  )
}

export default memo(Ayat)
