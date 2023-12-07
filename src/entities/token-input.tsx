import { Show, createSignal, splitProps } from 'solid-js'
import { IoEyeOutline, IoEyeOffOutline } from 'solid-icons/io'

import { Input } from '@/shared/ui'
import { isBoolean, className as cn } from '@/shared/lib'

import type { Component, JSX } from 'solid-js'

interface ITokenInputProps {
  name?: string
  label?: string
  value?: string
  hasAlert?: boolean
  isTokenVisible?: boolean
  onInput?: JSX.EventHandler<HTMLInputElement, InputEvent>
  onTokenVisibleChange?: (showToken: boolean) => void
}

type TTextType = 'text' | 'password'

export const TokenInput: Component<ITokenInputProps> = props => {
  const [local, inputProps] = splitProps(props, ['isTokenVisible', 'onTokenVisibleChange'])

  const [isTokenVisible, setIsTokenVisible] = createSignal(false)

  const show = (): boolean => local.isTokenVisible ?? isTokenVisible()
  const type = (): TTextType => show() ? 'text' : 'password'

  const handleTokenVisibleChange = (): void => {
    if (isBoolean(local.isTokenVisible)) {
      return local.onTokenVisibleChange?.(!local.isTokenVisible)
    }

    setIsTokenVisible(prev => {
      const showPassword = !prev

      local.onTokenVisibleChange?.(showPassword)

      return showPassword
    })
  }

  return (
    <div class="relative flex items-center text-[#9e9e9e]">
      <Input
        { ...inputProps }
        type={ type() }
        class={ cn({ 'text-4xl -tracking-widest': !show() }) }
      />

      <span
        onClick={ handleTokenVisibleChange }
        class={ cn(
          'absolute p-1 right-3 cursor-pointer select-none text-2xl',
          'hover:text-primary-text-color'
        ) }
      >
        <Show when={ !show() } fallback={ <IoEyeOffOutline /> }>
          <IoEyeOutline />
        </Show>
      </span>
    </div>
  )
}
