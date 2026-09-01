import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import { HiX } from 'react-icons/hi'

interface ModalProps {
  closeModal: () => void
  isOpen: boolean
  title?: string
  children: React.ReactNode
}

const CustomModal: React.FunctionComponent<ModalProps> = ({
  closeModal,
  isOpen,
  title,
  children
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-[99]'
        onClose={closeModal}
        initialFocus={closeButtonRef}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='relative max-h-96 w-full max-w-xl transform overflow-y-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-dark'>
                <Dialog.Title
                  as='h2'
                  className='pr-8 text-lg font-medium leading-6 text-gray-900 dark:text-white'
                >
                  {title}
                </Dialog.Title>
                <button
                  ref={closeButtonRef}
                  type='button'
                  title='Tutup'
                  onClick={closeModal}
                  className='absolute top-5 right-5 inline-flex items-center justify-center rounded-md p-1 text-gray-500 transition hover:text-gray-900 dark:text-slate-400 dark:hover:text-white'
                >
                  <HiX size={20} />
                  <span className='sr-only'>Tutup</span>
                </button>
                <div className={`${title && 'mt-4'}`}>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CustomModal
