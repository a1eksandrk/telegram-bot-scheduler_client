import { className as cn } from '@/shared/lib'

import type { ParentComponent } from 'solid-js'

interface IBadge {
  class?: string
  active?: boolean
}

const Badge: ParentComponent<IBadge> = props => {
  return (
    <span class={ cn(
      'pl-2 pr-2 bg-secondary-color text-white rounded-xl',
      { 'bg-primary-color': props.active },
      props.class
    ) }>
      { props.children }
    </span>
  )
}

export default Badge
