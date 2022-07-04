import { twclsx } from '@/libs'

import { createElement } from 'react'

const Input: React.FunctionComponent<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = ({ className: classes, ...props }) => {
  const className = twclsx(
    'inline-flex p-2 outline-none',
    'border border-main-900 dark:border-main-100',
    'placeholder:dark:text-main-200',
    'bg-white dark:bg-main-900',
    classes
  )

  return createElement('input', {
    ...props,
    autoCorrect: 'off',
    type: props.type ? props.type : 'text',
    className
  })
}

export default Input
