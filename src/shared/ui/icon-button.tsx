import { splitProps } from 'solid-js'

import { className as cn, rippleClick } from '@/shared/lib'

import type { Component, JSX } from 'solid-js'

type TBaseButton = Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

interface IIconButtonProps extends TBaseButton {
  icon?: JSX.Element
}

const IconButton: Component<IIconButtonProps> = props => {
  const [local, buttonProps] = splitProps(props, ['class', 'icon'])

  return (
    <button
      { ...buttonProps }
      use:rippleClick
      class={ cn(
        'relative flex justify-center items-center h-[40px] aspect-square p-1 select-none text-xl rounded-full',
        'hover:bg-secondary-text-color/5',
        'focus:outline-none focus:bg-secondary-text-color/5',
        local.class
      ) }
    >
      { local.icon }
    </button>
  )
}

export default IconButton
