import { Show } from 'solid-js'

import { className as cn, isFunction } from '@/shared/lib'

import type { ParentComponent, JSX } from 'solid-js'

interface ILoaderProps {
  class?: string
  isLoading?: boolean
}

const getElementFromChildren = (children?: JSX.Element): HTMLElement | undefined => {
  if (children instanceof HTMLElement) return children

  const content = isFunction(children) ? children() : undefined

  return content instanceof HTMLElement ? content : undefined
}

const Loader: ParentComponent<ILoaderProps> = props => {
  const childrenClassName = (): string | undefined => {
    const element = getElementFromChildren(props.children)

    return element?.className
  }

  return (
    <Show when={ props.isLoading } fallback={ props.children }>
      <div class={ cn('relative flex justify-center items-center min-h-[2.5rem]', childrenClassName(), props.class) }>
        <span class={ cn('absolute border-surface-color h-10 w-10 animate-spin rounded-full border-4 border-t-primary-color') } />
      </div>
    </Show>
  )
}

export default Loader
