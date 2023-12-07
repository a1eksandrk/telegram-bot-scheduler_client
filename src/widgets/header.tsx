import { SearchInput } from '@/entities/search-input'
import { className as cn } from '@/shared/lib'

import type { Component, JSX } from 'solid-js'

interface IHeaderProps {
  control?: JSX.Element
}

export const Header: Component<IHeaderProps> = props => {
  return (
    <header class={ cn(
      'flex items-center gap-1 h-14 pl-4 pr-4',
      'border-b border-border-color'
    ) }>
      { props.control }

      <SearchInput />
    </header>
  )
}
