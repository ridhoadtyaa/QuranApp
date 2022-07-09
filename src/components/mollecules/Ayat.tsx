import { twclsx } from "@/libs"
import Button from "../atoms/Button"

import { AiOutlineRead as Read, AiOutlineShareAlt as Share } from 'react-icons/ai'
import { Ayat } from "quran-app"

interface AyatProps {
  ayat: Ayat
}

const Ayat: React.FunctionComponent<AyatProps> = ({ayat}) => {
  return (
    <div id={ayat.id.toString()} className={twclsx('py-8')}>
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
            'w-7 h-7',
          )}
        >
          {ayat.nomor}
        </div>
        <div className={twclsx('flex items-center', 'space-x-4')}>
          <Button>
            <Share size={22} className={twclsx('fill-primary-700 dark:fill-primary-400')} title='Bagikan' />
            <span className={twclsx('sr-only')}>Tombol Bagikan</span>
          </Button>
          <Button>
            <Read size={24} className={twclsx('fill-primary-700 dark:fill-primary-400')} title='Lihat Tafsir' />
            <span className={twclsx('sr-only')}>Tombol Lihat Tafsir</span>
          </Button>
        </div>
      </div>
      <div className={twclsx('space-y-4', 'mt-6', 'px-4')}>
        <div className={twclsx('text-right text-xl', 'font-medium')}>{ayat.ar}</div>
        <p>{ayat.idn}</p>
      </div>
    </div>
  )
}

export default Ayat