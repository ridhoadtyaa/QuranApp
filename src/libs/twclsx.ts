import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const twclsx = (...classes: ClassValue[]) => twMerge(clsx(...classes))
