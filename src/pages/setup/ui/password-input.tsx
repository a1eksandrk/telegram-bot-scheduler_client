import { Show, createUniqueId, createSignal } from 'solid-js'
import { AiFillEye, AiFillEyeInvisible } from 'solid-icons/ai'

import { isBoolean, isEmptyString, className as cn } from '@/shared/lib'

import type { Component, JSX } from 'solid-js'

interface IPasswordInputProps {
  name?: string
  label?: string
  value?: string
  alert?: boolean
  showPassword?: boolean
  onInput?: JSX.EventHandler<HTMLInputElement, InputEvent>
  onShowPasswordChange?: (showPassword: boolean) => void
}

type TTextType = 'text' | 'password'

const textType: Record<string, TTextType> = {
  TEXT: 'text',
  PASSWORD: 'password'
} as const

const PasswordInput: Component<IPasswordInputProps> = props => {
  const inputId = createUniqueId()

  const [hasValue, setHasValue] = createSignal(false)
  const [showPassword, setShowPassword] = createSignal(false)

  const show = (): boolean => props.showPassword ?? showPassword()
  const type = (): TTextType => show() ? textType.TEXT : textType.PASSWORD

  const handleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = event => {
    const hasValue = !isEmptyString(event.currentTarget.value)

    setHasValue(hasValue)

    props.onInput?.(event)
  }

  const handleShowPasswordChange = (): void => {
    if (isBoolean(props.showPassword)) {
      return props.onShowPasswordChange?.(!props.showPassword)
    }

    setShowPassword(prev => {
      const showPassword = !prev

      props.onShowPasswordChange?.(showPassword)

      return showPassword
    })
  }

  return (
    <div class="relative flex items-center text-[#9e9e9e]">
      <input
        id={ inputId }
        type={ type() }
        name={ props.name }
        value={ props.value ?? '' }
        onInput={ handleInput }
        class={ cn(
          'peer h-14 w-full pl-4 pr-12 text-primary-text-color bg-surface-color border border-input-search-border-color rounded-lg leading-none',
          'hover:border-primary-color',
          'focus:outline-2 focus:outline-primary-color',
          { 'text-4xl -tracking-widest': !show() },
          { 'border-danger-color hover:border-danger-color focus:outline-danger-color': props.alert }
        ) }
      />

      <Show when={ props.label }>
        <label
          for={ inputId }
          class={ cn(
            'absolute left-3 pl-1 pr-1 transition-transform leading-none bg-surface-color cursor-text',
            'hover:text-primary-color',
            'peer-hover:text-primary-color',
            'peer-focus:text-primary-color peer-focus:scale-75 peer-focus:-translate-y-7',
            { 'scale-75 -translate-y-7': hasValue() },
            { 'text-danger-color hover:text-danger-color peer-hover:text-danger-color peer-focus:text-danger-color': props.alert }
          ) }
        >
          { props.label }
        </label>
      </Show>

      <span
        onClick={ handleShowPasswordChange }
        class={ cn(
          'absolute p-1 right-3 cursor-pointer select-none text-2xl',
          'hover:text-primary-text-color'
        ) }
      >
        <Show when={ !show() } fallback={ <AiFillEyeInvisible /> }>
          <AiFillEye />
        </Show>
      </span>
    </div>
  )
}

export default PasswordInput
