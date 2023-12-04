import { className as cn, rippleClick } from '@/shared/lib'

import type { Component, ParentProps } from 'solid-js'

const SubmitButton: Component<ParentProps> = props => {
  return (
    <button
      type="submit"
      use:rippleClick
      class={ cn(
        'relative h-14 w-full flex items-center justify-center text-white bg-primary-color rounded-lg uppercase overflow-hidden outline-none',
        'hover:brightness-95',
        'focus-visible:active:brightness-95'
      ) }
    >
      { props.children }
    </button>
  )
}

export default SubmitButton
