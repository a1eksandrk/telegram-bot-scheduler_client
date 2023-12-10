import { Show, mergeProps } from 'solid-js'

import { className as cn } from '@/shared/lib'

import type { Component, JSX } from 'solid-js'

interface IAvatarProps {
  src?: string
  class?: string
  fallbackClass?: string
  children?: string
}

const getFallback = (letter: string, fallbackClass?: string): JSX.Element => (
  <span
    class={ cn(
      'flex items-center justify-center h-14 w-14 rounded-full text-xl text-white bg-primary-color transition-colors',
      fallbackClass
    ) }
  >
    { letter.toUpperCase() }
  </span>
)

export const Avatar: Component<IAvatarProps> = props => {
  const merged = mergeProps({ children: '' }, props)

  return (
    <Show when={ merged.src } fallback={ getFallback(merged.children, merged.fallbackClass) }>
      <img
        src={ merged.src }
        alt="chat avatar image"
        class={ cn('h-14 w-14 rounded-full object-cover', merged.class) }
      />
    </Show>
  )
}
