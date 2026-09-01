import Ayat from '@/components/mollecules/Ayat'
import ReadingSettings from '@/components/mollecules/ReadingSettings'
import SurahInfo from '@/components/mollecules/SurahInfo'

import { twclsx } from '@/libs'
import { audioAyatUrl, audioFullUrl } from '@/libs/audio'
import * as atom from '@/stores'

import UnstyledLink from '../atoms/UnstyledLink'

import { useAtom } from 'jotai'
import { Ayat as AyatType, SuratDetail, Tafsir, TafsirDetail } from 'quran-app'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { BsArrowLeft as ArrowLeft, BsArrowRight as ArrowRight } from 'react-icons/bs'

const AYAT_PER_CHUNK = 30

interface SurahDetailProps {
  surah: SuratDetail
}

const SurahDetail: React.FunctionComponent<SurahDetailProps> = ({ surah }) => {
  const totalAyat = surah.data.ayat.length
  const [visibleCount, setVisibleCount] = useState(Math.min(AYAT_PER_CHUNK, totalAyat))
  const [tafsir, setTafsir] = useState<TafsirDetail[] | null>(null)
  const [qari] = useAtom(atom.qari)
  const [playingAyat, setPlayingAyat] = useState<number | null>(null)

  const tafsirRequested = useRef(false)
  const pendingAyat = useRef<number | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const ayatAudioRef = useRef<HTMLAudioElement | null>(null)

  // Preferensi qari dari localStorage baru dipakai setelah mounted agar SSR konsisten
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const toggleAyatAudio = useCallback(
    (nomorAyat: number) => {
      ayatAudioRef.current?.pause()

      if (playingAyat === nomorAyat) {
        setPlayingAyat(null)
        return
      }

      const audio = new Audio(audioAyatUrl(qari, surah.data.nomor, nomorAyat))
      ayatAudioRef.current = audio
      audio.addEventListener('ended', () => setPlayingAyat(null))
      audio.addEventListener('error', () => setPlayingAyat(null))
      audio.play().catch(() => setPlayingAyat(null))
      setPlayingAyat(nomorAyat)
    },
    [playingAyat, qari, surah.data.nomor]
  )

  // Hentikan audio ayat saat meninggalkan halaman surah
  useEffect(() => {
    return () => ayatAudioRef.current?.pause()
  }, [])

  const loadTafsir = useCallback(() => {
    if (tafsirRequested.current) return
    tafsirRequested.current = true

    fetch(`https://equran.id/api/v2/tafsir/${surah.data.nomor}`)
      .then((res) => res.json())
      .then((res: Tafsir) => setTafsir(res.data.tafsir))
      .catch(() => {
        tafsirRequested.current = false
      })
  }, [surah.data.nomor])

  // Tautan hasil share memakai anchor #nomorAyat, ayat tujuan harus ikut dirender agar bisa dituju.
  // Tanpa anchor, scroll dikembalikan ke atas karena UnstyledLink memakai scroll={false}
  useEffect(() => {
    const nomorAyat = Number(window.location.hash.slice(1))
    if (nomorAyat > 0) {
      pendingAyat.current = nomorAyat
      setVisibleCount((count) => Math.max(count, Math.min(nomorAyat + AYAT_PER_CHUNK, totalAyat)))
    } else {
      window.scrollTo(0, 0)
    }
  }, [totalAyat])

  useEffect(() => {
    if (pendingAyat.current === null) return
    const el = document.getElementById(pendingAyat.current.toString())
    if (el) {
      pendingAyat.current = null
      el.scrollIntoView()
    }
  }, [visibleCount])

  useEffect(() => {
    if (visibleCount >= totalAyat) return

    const maybeGrow = () => {
      const sentinel = sentinelRef.current
      if (!sentinel) return

      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      if (sentinel.getBoundingClientRect().top - viewportHeight < 600) {
        setVisibleCount((count) => Math.min(count + AYAT_PER_CHUNK, totalAyat))
      }
    }

    maybeGrow()
    window.addEventListener('scroll', maybeGrow, { passive: true })
    window.addEventListener('resize', maybeGrow)

    return () => {
      window.removeEventListener('scroll', maybeGrow)
      window.removeEventListener('resize', maybeGrow)
    }
  }, [visibleCount, totalAyat])

  return (
    <>
      <SurahInfo
        nama_latin={surah.data.namaLatin}
        arti={surah.data.arti}
        jumlah_ayat={surah.data.jumlahAyat}
        tempat_turun={surah.data.tempatTurun}
        deskripsi={surah.data.deskripsi}
      />
      <div className={twclsx('flex items-center', 'space-x-2', 'mt-7')}>
        <audio
          src={mounted ? audioFullUrl(qari, surah.data.nomor) : surah.data.audioFull['01']}
          controls
          preload='none'
          aria-label={`Murottal Surah ${surah.data.namaLatin}`}
          className={twclsx('w-full')}
        ></audio>
        <ReadingSettings />
      </div>

      <section className={twclsx('divide-y-[1px] divide-slate-200/80 dark:divide-slate-700/80')}>
        {surah.data.ayat.slice(0, visibleCount).map((a: AyatType, i: number) => (
          <Ayat
            ayat={a}
            nomor={surah.data.nomor}
            surah={surah.data.namaLatin}
            key={a.nomorAyat}
            tafsir={tafsir?.[i]}
            loadTafsir={loadTafsir}
            isPlaying={playingAyat === a.nomorAyat}
            onTogglePlay={toggleAyatAudio}
          />
        ))}
      </section>

      {visibleCount < totalAyat && <div ref={sentinelRef} aria-hidden='true' />}

      <section className={twclsx('flex items-center justify-between', 'my-3')}>
        {surah.data.suratSebelumnya && (
          <UnstyledLink
            title='Surat Sebelumnya'
            href={`/surah/${surah.data.suratSebelumnya.nomor}`}
            className={twclsx('next-before-button')}
          >
            <ArrowLeft className={twclsx('mr-2')} />
            <span>{surah.data.suratSebelumnya.namaLatin}</span>
          </UnstyledLink>
        )}
        {surah.data.suratSelanjutnya && (
          <UnstyledLink
            title='Surat Selanjutnya'
            href={`/surah/${surah.data.suratSelanjutnya.nomor}`}
            className={twclsx('next-before-button', 'ml-auto')}
          >
            <span>{surah.data.suratSelanjutnya.namaLatin}</span>
            <ArrowRight className={twclsx('ml-2')} />
          </UnstyledLink>
        )}
      </section>
    </>
  )
}

export default memo(SurahDetail)
