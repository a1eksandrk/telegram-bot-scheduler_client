import { Show, createUniqueId, createSignal, mergeProps, splitProps } from 'solid-js'

import { isEmptyString, className as cn } from '@/shared/lib'

import type { Component, JSX } from 'solid-js'

interface IInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hasAlert?: boolean
}

const Input: Component<IInputProps> = props => {
  const merged = mergeProps({ value: '' }, props)
  const [local, inputProps] = splitProps(merged, ['label', 'hasAlert'])

  const inputId = createUniqueId()

  const [hasValue, setHasValue] = createSignal(false)

  const id = (): string => inputProps?.id ?? inputId

  const handleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = event => {
    const hasValue = !isEmptyString(event.currentTarget.value)

    setHasValue(hasValue)

    inputProps.onInput?.(event)
  }

  return (
    <div class="relative flex items-center h-14 w-full text-[#9e9e9e]">
      <input
        { ...inputProps }
        id={ id() }
        onInput={ handleInput }
        class={ cn(
          'peer h-full w-full pl-4 pr-12 text-primary-text-color bg-surface-color border border-input-search-border-color rounded-lg leading-none',
          'hover:border-primary-color',
          'focus:outline-2 focus:outline-primary-color',
          { 'border-danger-color hover:border-danger-color focus:outline-danger-color': local.hasAlert },
          inputProps.class
        ) }
      />

      <Show when={ local.label }>
        <label
          for={ id() }
          class={ cn(
            'absolute left-3 pl-1 pr-1 transition-transform leading-none bg-surface-color cursor-text',
            'hover:text-primary-color',
            'peer-hover:text-primary-color',
            'peer-focus:text-primary-color peer-focus:scale-75 peer-focus:-translate-y-7',
            { 'scale-75 -translate-y-7': hasValue() },
            { 'text-danger-color hover:text-danger-color peer-hover:text-danger-color peer-focus:text-danger-color': local.hasAlert }
          ) }
        >
          { local.label }
        </label>
      </Show>
    </div>
  )
}

export default Input
