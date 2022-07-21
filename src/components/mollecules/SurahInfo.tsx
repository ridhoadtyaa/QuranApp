import Button from '@/components/atoms/Button'

import { twclsx } from '@/libs'

import Modal from './Modal'

import { memo, useState } from 'react'
import { AiOutlineInfoCircle as Info } from 'react-icons/ai'

interface SurahInfoProps {
  nama_latin: string | undefined
  arti: string | undefined
  jumlah_ayat: number | undefined
  tempat_turun: string | undefined
  deskripsi: string | undefined
}

const SurahInfo: React.FunctionComponent<SurahInfoProps> = ({
  nama_latin,
  arti,
  jumlah_ayat,
  tempat_turun,
  deskripsi
}) => {
  const [modalDeskripsi, setModalDeskripsi] = useState(false)

  return (
    <>
      <section
        className={twclsx(
          'w-full',
          'rounded-xl',
          'text-center text-white',
          'bg-gradient-to-br from-primary-400/70 to-primary-500',
          'p-6',
          'shadow-lg shadow-primary-300 dark:shadow-none',
          'relative'
        )}
      >
        <h3 className={twclsx('mb-1', 'font-semibold')}>{nama_latin}</h3>
        <p className={twclsx('mb-2')}>{arti}</p>
        <div className={twclsx('bg-white/70', 'h-[.5px]', 'w-5/12', 'mx-auto')}></div>
        <span className={twclsx('uppercase', 'block', 'mt-3 mb-5')}>
          {tempat_turun} &bull; {jumlah_ayat} AYAT
        </span>

        <h2 className={twclsx('font-arabic')}>ِبِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْم</h2>

        <Button
          className={twclsx('absolute top-3 right-3')}
          title='Info Surah'
          onClick={() => setModalDeskripsi(true)}
        >
          <Info size={23} className={twclsx('opacity-70 hover:opacity-100')} />
          <span className={twclsx('sr-only')}>Info Surah</span>
        </Button>
      </section>

      <Modal
        isOpen={modalDeskripsi}
        closeModal={() => setModalDeskripsi(false)}
        title='Deskripsi Surah'
      >
        <div dangerouslySetInnerHTML={{ __html: `<p>${deskripsi}</p>` }} />
      </Modal>
    </>
  )
}

export default memo(SurahInfo)
