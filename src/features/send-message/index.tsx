import { createSignal } from 'solid-js'
import { BiSolidSend, BiRegularTime } from 'solid-icons/bi'

import { IconButton, Input } from '@/shared/ui'
import { className as cn, createForm, convertDateToISO, getCurrentISO } from '@/shared/lib'

import { initialValues, validation } from './lib'

import type { Component, JSX } from 'solid-js'
import type { ISendMessageProps, ISendMessageForm } from './types'

export const SendMessage: Component<ISendMessageProps> = props => {
  let textAreaRef: HTMLTextAreaElement | undefined

  const [textAreaRows, setTextAreaRows] = createSignal(1)

  const { form, formRef, errors } = createForm<ISendMessageForm>({
    initialValues,
    validation,
    onInput: (name, value) => {
      if (name !== 'text') return

      const rows = value.split('\n').length

      setTextAreaRows(rows)
    },
    onSubmit: ({ text, time: rawTime }, errors) => {
      if (errors.text || errors.time) return

      formRef()?.reset()

      const time = convertDateToISO(rawTime)

      if (!time) return

      props.onSend?.({ text, time })
    }
  })

  const alert = (): boolean => errors().text || errors().time

  const preventLineBreakByEnter: JSX.EventHandler<HTMLTextAreaElement, KeyboardEvent> = (event) => {
    const { code, shiftKey } = event

    if (code === 'Enter' && !shiftKey) {
      event.preventDefault()

      formRef()?.dispatchEvent(new SubmitEvent('submit'))
    }
  }

  return (
    <form { ...form } class={ cn('') }>
      <div class={ cn('p-2 border-t border-border-color') }>
        <Input
          name='time'
          size='small'
          type='datetime-local'
          placeholder='Выберите время'
          min={ getCurrentISO().substring(0, 16) }
          prefixIcon={ <BiRegularTime /> }
          class={ cn('rounded-2xl pr-4 dark:dark-scheme') }
        />
      </div>

      <div class={ cn('flex flex-row gap-2 items-end p-2 border-t border-border-color') }>
        <div class={ cn(
          'flex items-center h-full w-full p-1 rounded-2xl bg-surface-color border border-border-color',
          { 'border-danger-color': alert() }
        ) }>
          <textarea
            name='text'
            ref={ textAreaRef }
            rows={ textAreaRows() }
            placeholder='Сообщение'
            onKeyDown={ preventLineBreakByEnter }
            class={ cn(
              'flex w-full p-2 resize-none whitespace-nowrap bg-surface-color',
              'focus:outline-none'
            ) }
          />
        </div>

        <div class={ cn('flex flex-row items-center gap-2') }>
          <IconButton
            type='submit'
            icon={ <BiSolidSend /> }
            class={ cn(
              'h-[54px] bg-primary-color text-white text-3xl',
              'hover:bg-primary-color hover:brightness-95',
              'focus:bg-primary-color focus:brightness-95',
              'disabled:bg-primary-color/10'
            ) }
          />
        </div>
      </div>
    </form>
  )
}
