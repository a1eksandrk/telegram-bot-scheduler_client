import { A } from '@solidjs/router'

import { Avatar } from '@/entities/avatar'
import { Badge } from '@/shared/ui'
import { className as cn, convertISODateToTime, rippleClick } from '@/shared/lib'

import { Show, type Component } from 'solid-js'
import type { IChat, IMessage } from '@/shared/types'

interface IChatItemProps {
  chat: IChat
}

export const Chat: Component<IChatItemProps> = props => {
  const lastMessage = (): IMessage | undefined => props.chat.messages.at(-1)

  const time = (): string | undefined => { return convertISODateToTime(lastMessage()?.time) }

  return (
    <A
      href={ `/chat/${props.chat.id}` }
      tabIndex="0"
      use:rippleClick
      ondragstart={ e => { e.preventDefault() } }
      class={ cn(
        'group flex flex-row items-center gap-2 h-20 p-3 rounded-lg cursor-pointer select-none transition-colors',
        'hover:bg-[#f3f3f4]',
        'dark:hover:bg-[#2b2b2b]',
        'focus:outline-none focus:bg-primary-color',
        'focus:hover:bg-primary-color'
      ) }
    >
      <Avatar
        src={ props.chat.avatar }
        class={ cn('grow-0 shrink-0 basis-auto') }
        fallbackClass={ cn(
          'grow-0 shrink-0 basis-auto',
          'group-focus:bg-white group-focus:text-primary-color'
        ) }
      >
        { props.chat.name[0].toUpperCase() }
      </Avatar>

      <div class={ cn('flex flex-col justify-between mb-auto overflow-hidden') }>
        <div class={ cn('flex gap-2 justify-between') }>
          <strong
            class={ cn(
              'truncate font-normal transition-colors',
              'group-focus:text-white'
            ) }
          >
            { props.chat.name }
          </strong>

          <Show when={ lastMessage() }>
            <time
              dateTime={ lastMessage()?.time }
              class={ cn(
                'text-xs text-secondary-text-color transition-colors',
                'group-focus:text-white'
              ) }
            >
              { time() }
            </time>
          </Show>
        </div>

        <Show when={ lastMessage() }>
          <div class={ cn('flex flex-row gap-2 justify-between') }>
            <div
              class={ cn(
                'truncate text-secondary-text-color transition-colors',
                'group-focus:text-white'
              ) }
            >
              { lastMessage()?.text }
            </div>

            <Badge
              class={ cn(
                'transition-colors ml-auto',
                'group-focus:bg-white group-focus:text-primary-color'
              )}
            >
              { props.chat.count }
            </Badge>
          </div>
        </Show>
      </div>
    </A>
  )
}
