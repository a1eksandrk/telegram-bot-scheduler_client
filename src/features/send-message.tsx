import { createSignal } from 'solid-js'
import { BiSolidSend } from 'solid-icons/bi'

import { IconButton } from '@/shared/ui'
import { className as cn, createForm, isEmptyString, getCurrentISODate } from '@/shared/lib'

import type { Component, JSX } from 'solid-js'
import type { TMessageData, TValidation } from '@/shared/types'

interface ISendMessageProps {
  onSend?: (messageData: TMessageData) => Promise<void> | void
}

interface ISendMessageForm {
  text: string
}

const initialValues: ISendMessageForm = { text: '' }
const validation: TValidation<ISendMessageForm> = { text: value => !isEmptyString(value) }

export const SendMessage: Component<ISendMessageProps> = props => {
  let textAreaRef: HTMLTextAreaElement | undefined

  const [textAreaRows, setTextAreaRows] = createSignal(1)

  const { form, formRef, errors } = createForm<ISendMessageForm>({
    initialValues,
    validation,
    onInput: (_, value) => {
      const rows = value.split('\n').length

      setTextAreaRows(rows)
    },
    onSubmit: ({ text }, errors) => {
      if (errors.text) return

      const time = getCurrentISODate()

      formRef()?.reset()

      props.onSend?.({ time, text })
    }
  })

  const alert = (): boolean => errors().text

  const foo: JSX.EventHandler<HTMLTextAreaElement, KeyboardEvent> = (event) => {
    const { code, shiftKey } = event

    if (code === 'Enter' && !shiftKey) {
      event.preventDefault()

      formRef()?.dispatchEvent(new SubmitEvent('submit'))
    }
  }

  return (
    <form { ...form } class={ cn('flex flex-row gap-2 items-end p-2 border-t border-border-color') }>
      <div class={ cn(
        'flex items-center h-full w-full p-1 rounded-2xl bg-surface-color border border-border-color',
        { 'border-danger-color': alert() }
      ) }>
        <textarea
          name='text'
          ref={ textAreaRef }
          rows={ textAreaRows() }
          placeholder='Сообщение'
          onKeyDown={ foo }
          class={ cn(
            'flex w-full p-2 resize-none whitespace-nowrap bg-surface-color',
            'focus:outline-none'
          ) }
        />
      </div>

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
    </form>
  )
}
