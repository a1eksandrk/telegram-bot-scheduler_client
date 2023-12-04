import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { ClassValue } from 'clsx'

const className = (...classNames: ClassValue[]): string => {
  return twMerge(clsx(classNames))
}

export default className
