import { Show } from 'solid-js'

import { className as cn, isFunction } from '@/shared/lib'

import type { ParentComponent } from 'solid-js'

interface ILoaderProps {
  isLoading?: boolean
}

const Loader: ParentComponent<ILoaderProps> = props => {
  const childrenClassName = (): string | undefined => {
    const content = isFunction(props.children) ? props.children() : undefined
    const element = content instanceof HTMLElement ? content : undefined

    return element?.className
  }

  return (
    <Show when={ props.isLoading } fallback={ props.children }>
      <div class={ cn('relative flex justify-center items-center', childrenClassName()) }>
        <span class={ cn('absolute border-surface-color h-10 w-10 animate-spin rounded-full border-4 border-t-primary-color') } />
      </div>
    </Show>
  )
}

export default Loader
