import Button from '@/components/atoms/Button'

import { twclsx } from '@/libs'
import { QARI_LIST, QariId } from '@/libs/audio'
import * as atom from '@/stores'

import Modal from './Modal'

import { useAtom } from 'jotai'
import { useState } from 'react'
import { AiOutlineSetting as Setting } from 'react-icons/ai'

const FONT_SIZES = [
  { id: 'kecil', label: 'Kecil' },
  { id: 'sedang', label: 'Sedang' },
  { id: 'besar', label: 'Besar' }
] as const

const ReadingSettings: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useAtom(atom.arabicFontSize)
  const [latin, setLatin] = useAtom(atom.showLatin)
  const [terjemahan, setTerjemahan] = useAtom(atom.showTerjemahan)
  const [qari, setQari] = useAtom(atom.qari)

  return (
    <>
      <Button
        title='Pengaturan baca'
        onClick={() => setIsOpen(true)}
        className={twclsx(
          'p-2',
          'rounded-md',
          'text-primary-700 dark:text-primary-400',
          'bg-primary-100 dark:bg-primary-900/50',
          'hover:ring hover:ring-primary-300 dark:hover:ring-primary-800',
          'transition duration-200'
        )}
      >
        <Setting size={18} />
        <span className={twclsx('sr-only')}>Pengaturan Baca</span>
      </Button>

      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)} title='Pengaturan Baca'>
        <div className={twclsx('space-y-5', 'mt-2')}>
          <div>
            <p className={twclsx('mb-2', 'font-medium', 'dark:text-white')}>Ukuran teks Arab</p>
            <div className={twclsx('flex items-center', 'space-x-2')}>
              {FONT_SIZES.map((size) => (
                <Button
                  key={size.id}
                  onClick={() => setFontSize(size.id)}
                  className={twclsx(
                    'py-1.5 px-3',
                    'rounded-md',
                    'text-sm',
                    'transition',
                    fontSize === size.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-slate-800 dark:text-slate-300'
                  )}
                >
                  {size.label}
                </Button>
              ))}
            </div>
          </div>

          <label className={twclsx('flex items-center justify-between', 'dark:text-white')}>
            <span className={twclsx('font-medium')}>Tampilkan teks latin</span>
            <input
              type='checkbox'
              checked={latin}
              onChange={(e) => setLatin(e.target.checked)}
              className={twclsx('h-4 w-4', 'accent-primary-600')}
            />
          </label>

          <label className={twclsx('flex items-center justify-between', 'dark:text-white')}>
            <span className={twclsx('font-medium')}>Tampilkan terjemahan</span>
            <input
              type='checkbox'
              checked={terjemahan}
              onChange={(e) => setTerjemahan(e.target.checked)}
              className={twclsx('h-4 w-4', 'accent-primary-600')}
            />
          </label>

          <div>
            <label
              htmlFor='pilih-qari'
              className={twclsx('mb-2 block', 'font-medium', 'dark:text-white')}
            >
              Qari murottal
            </label>
            <select
              id='pilih-qari'
              value={qari}
              onChange={(e) => setQari(e.target.value as QariId)}
              className={twclsx(
                'w-full',
                'rounded-md',
                'border border-slate-300 dark:border-slate-700',
                'bg-white dark:bg-slate-800 dark:text-white',
                'p-2',
                'text-sm',
                'outline-none focus:ring-1 focus:ring-primary-400'
              )}
            >
              {QARI_LIST.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.nama}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ReadingSettings
