import { twclsx } from '@/libs'

import Link from 'next/link'
import { Surat } from 'quran-app'

const Surah: React.FunctionComponent<Surat> = ({
  nomor,
  nama_latin,
  tempat_turun,
  jumlah_ayat,
  nama
}) => {
  return (
    <Link href={`/surat/${nomor}`} key={nomor}>
      <div
        className={twclsx('flex justify-between items-center', 'py-4', 'cursor-pointer')}
        key={nomor}
      >
        <div className={twclsx('flex items-center', 'space-x-5')}>
          <div className={twclsx('star8')}>
            <div className={twclsx('-rotate-45', 'z-10', 'font-medium', 'text-sm')}>{nomor}</div>
          </div>
          <div className={twclsx('space-y-2')}>
            <div className={twclsx('font-semibold', 'text-lg')}>{nama_latin}</div>
            <p
              className={twclsx(
                'text-slate-400 text-xs dark:text-slate-500',
                'font-semibold',
                'uppercase'
              )}
            >
              {tempat_turun} &bull; {jumlah_ayat} AYAT
            </p>
          </div>
        </div>
        <div className={twclsx('font-bold', 'text-primary-600 text-xl')}>{nama}</div>
      </div>
    </Link>
  )
}

export default Surah
