import { SearchInput } from '@/entities/search-input'
import { className as cn } from '@/shared/lib'

import type { Component, JSX } from 'solid-js'

interface IHeaderProps {
  control?: JSX.Element
  onSearch?: (value: string) => void
}

export const Header: Component<IHeaderProps> = props => {
  const handleSearch = (value: string): void => props.onSearch?.(value)

  return (
    <header class={ cn(
      'flex items-center gap-1 min-h-[3.5rem] h-14 pl-4 pr-4',
      'border-b border-border-color'
    ) }>
      { props.control }

      <SearchInput onSearch={ handleSearch } />
    </header>
  )
}
