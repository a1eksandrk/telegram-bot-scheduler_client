import { A } from '@solidjs/router'

import { Avatar } from '@/entities/avatar'
import { Badge } from '@/shared/ui'
import { rippleClick, className as cn } from '@/shared/lib'

import type { Component } from 'solid-js'
import type { IChatItem } from '@/shared/types'

interface IChatItemProps {
  item: IChatItem
}

export const ChatItem: Component<IChatItemProps> = props => {
  return (
    <A
      href={ `/chat/${props.item.id}` }
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
        src={ props.item.image }
        class={ cn('grow-0 shrink-0 basis-auto') }
        fallbackClass={ cn(
          'grow-0 shrink-0 basis-auto',
          'group-focus:bg-white group-focus:text-primary-color'
        ) }
      >
        { props.item.name[0].toUpperCase() }
      </Avatar>

      <div class={ cn('flex-1 overflow-hidden') }>
        <div class={ cn('flex gap-2 justify-between') }>
          <strong
            class={ cn(
              'truncate font-normal transition-colors',
              'group-focus:text-white'
            ) }
          >
            { props.item.name }
          </strong>

          <time
            dateTime={ props.item.time }
            class={ cn(
              'text-xs text-secondary-text-color transition-colors',
              'group-focus:text-white'
            ) }
          >
            { props.item.time }
          </time>
        </div>

        <div class={ cn('flex gap-2 justify-between') }>
          <div
            class={ cn(
              'truncate text-secondary-text-color transition-colors',
              'group-focus:text-white'
            ) }
          >
            { props.item.message }
          </div>

          <Badge
            class={ cn(
              'transition-colors',
              'group-focus:bg-white group-focus:text-primary-color'
            )}
          >
            { props.item.count }
          </Badge>
        </div>
      </div>
    </A>
  )
}
