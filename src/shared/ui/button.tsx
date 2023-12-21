import { splitProps } from 'solid-js'

import { className as cn, rippleClick } from '@/shared/lib'

import type { Component, JSX } from 'solid-js'

interface IButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: Component<IButtonProps> = props => {
  const [local, buttonProps] = splitProps(props, ['class', 'children'])

  return (
    <button
      { ...buttonProps }
      use:rippleClick
      class={ cn(
        'relative h-14 w-full flex items-center justify-center text-white bg-primary-color rounded-lg uppercase overflow-hidden outline-none',
        'hover:brightness-95',
        'focus-visible:active:brightness-95',
        local.class
      ) }
    >
      { local.children }
    </button>
  )
}

export default Button
