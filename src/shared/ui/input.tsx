import { Show, createUniqueId, createSignal, mergeProps, splitProps } from 'solid-js'

import { isEmptyString, className as cn } from '@/shared/lib'

import type { Component, JSX } from 'solid-js'

type InputSize = 'small' | 'large'

interface IInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  size?: InputSize
  label?: string
  hasAlert?: boolean
  prefixIcon?: JSX.Element
}

const Input: Component<IInputProps> = props => {
  const merged = mergeProps({ value: '', size: 'large' }, props)
  const [local, inputProps] = splitProps(merged, ['size', 'label', 'hasAlert', 'prefixIcon'])

  const inputId = createUniqueId()

  const [hasValue, setHasValue] = createSignal(false)

  const id = (): string => inputProps?.id ?? inputId

  const handleInput: JSX.InputEventHandler<HTMLInputElement, InputEvent> = event => {
    const hasValue = !isEmptyString(event.currentTarget.value)

    setHasValue(hasValue)

    inputProps.onInput?.(event)
  }

  return (
    <div class={ cn(
      'relative flex items-center w-full text-[#9e9e9e]',
      { 'h-10': local.size === 'small' },
      { 'h-14': local.size === 'large' }
    ) }>
      <input
        { ...inputProps }
        id={ id() }
        onInput={ handleInput }
        class={ cn(
          'peer h-full w-full pl-4 pr-12 text-primary-text-color bg-surface-color border border-border-color rounded-lg leading-none',
          'hover:border-primary-color',
          'focus:outline-2 focus:outline-primary-color',
          { 'border-danger-color hover:border-danger-color focus:outline-danger-color': local.hasAlert },
          { 'pl-12': local.prefixIcon },
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

      <Show when={ local.prefixIcon }>
        <span class={ cn(
          'absolute p-1 left-3 pointer-events-none select-none text-xl',
          'hover:text-primary-color',
          'peer-hover:text-primary-color',
          'peer-focus:text-primary-color'
        ) }>
          { local.prefixIcon }
        </span>
      </Show>
    </div>
  )
}

export default Input
