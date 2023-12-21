import { className as cn, convertISODateToTime } from '@/shared/lib'

import type { Component } from 'solid-js'
import type { IMessage } from '@/shared/types'

interface IMessageProps {
  message: IMessage
}

export const Message: Component<IMessageProps> = props => {
  const text = (): string => props.message.text.trim()
  const time = (): string | undefined => { return convertISODateToTime(props.message.time) }

  return (
    <div class='flex flex-col gap-1 p-2 rounded-2xl bg-message-bubble-color'>
      <p class={ cn('whitespace-pre-line') }>
        { text() }
      </p>

      <time
        dateTime={ props.message.time }
        class={ cn('text-xs ml-auto cursor-pointer text-[#5ca853] dark:text-gray-300') }
      >
        { time() }
      </time>
    </div>
  )
}
