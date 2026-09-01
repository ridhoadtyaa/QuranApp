import UnstyledLink from '@/components/atoms/UnstyledLink'

import { twclsx } from '@/libs'
import * as atom from '@/stores'

import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { BsBookmarkFill as Bookmark } from 'react-icons/bs'
import { IoIosArrowRoundForward as Arrow } from 'react-icons/io'

const LastReadCard: React.FunctionComponent = () => {
  const [lastRead] = useAtom(atom.lastRead)

  // Data dari localStorage hanya ada di client — render setelah mounted agar bebas hydration mismatch
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted || !lastRead) return null

  return (
    <UnstyledLink
      href={`/surah/${lastRead.surah}#${lastRead.ayat}`}
      title={`Lanjutkan bacaan ${lastRead.namaLatin} ayat ${lastRead.ayat}`}
      className={twclsx(
        'flex items-center justify-between',
        'w-full',
        'mb-4',
        'py-3 px-4',
        'rounded-xl',
        'text-white',
        'bg-gradient-to-br from-primary-400/70 to-primary-500',
        'shadow-md shadow-primary-300 dark:shadow-none',
        'transition hover:ring hover:ring-primary-300 dark:hover:ring-primary-700'
      )}
    >
      <span className={twclsx('flex items-center', 'space-x-3')}>
        <Bookmark size={18} />
        <span>
          <span className={twclsx('block', 'text-xs', 'opacity-80')}>Terakhir dibaca</span>
          <span className={twclsx('font-semibold')}>
            {lastRead.namaLatin} &bull; Ayat {lastRead.ayat}
          </span>
        </span>
      </span>
      <Arrow size={30} />
    </UnstyledLink>
  )
}

export default LastReadCard
