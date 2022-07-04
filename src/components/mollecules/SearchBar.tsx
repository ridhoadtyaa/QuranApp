import Input from '@/components/atoms/Input'

import { twclsx } from '@/libs'
import * as atom from '@/stores'

import { useAtom } from 'jotai'
import { FaSearch } from 'react-icons/fa'

const SearchBar: React.FunctionComponent = () => {
  const [search, setSearch] = useAtom(atom.search)

  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <div className={twclsx('my-4', 'relative')}>
      <Input
        className={twclsx(
          'rounded-md',
          'border-slate-300 dark:border-0 dark:bg-slate-800',
          'w-full transition',
          'focus:ring-1 ring-primary-400 dark:ring-primary-600',
          'peer',
          'placeholder:text-sm'
        )}
        placeholder='Cari Surah'
        value={search}
        onChange={changeSearch}
      />
      <FaSearch
        className={twclsx(
          'absolute right-3 top-[13px]',
          'fill-slate-400 peer-focus:fill-primary-400 dark:peer-focus:ring-primary-600'
        )}
      />
    </div>
  )
}

export default SearchBar
