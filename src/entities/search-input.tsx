import { Show } from 'solid-js'
import { BiRegularSearch, BiRegularX } from 'solid-icons/bi'

import { className as cn, createForm } from '@/shared/lib'
import { Input, IconButton } from '@/shared/ui'

import type { Component } from 'solid-js'

interface ISearchInputProps {
  onSearch?: (value: string) => void
}

interface ISearchForm {
  search: string
}

export const SearchInput: Component<ISearchInputProps> = props => {
  const { form, values } = createForm<ISearchForm>({
    initialValues: { search: '' },
    onInput: (_, value) => props.onSearch?.(value),
    onReset: () => props.onSearch?.('')
  })

  const hasReset = (): boolean => !!values().search

  return (
    <form
      { ...form }
      class={ cn(
        'group relative flex items-center w-full text-[#9e9e9e]',
        'focus-within:text-primary-color'
      ) }
    >
      <Input
        size="small"
        name="search"
        placeholder="Поиск"
        autocomplete="off"
        prefixIcon={ <BiRegularSearch /> }
        class={ cn('rounded-3xl') }
      />

      <Show when={ hasReset() }>
        <IconButton
          type="reset"
          icon={ <BiRegularX /> }
          class={ cn(
            'absolute right-1',
            'hover:bg-primary-color/5',
            'group-hover:text-primary-color',
            'focus:outline-none focus:bg-primary-color/5'
          ) }
        />
      </Show>
    </form>
  )
}
