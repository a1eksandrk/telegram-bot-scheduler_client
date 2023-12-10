import { Avatar } from '@/entities/avatar'
import { Badge } from '@/shared/ui'
import { rippleClick, className as cn } from '@/shared/lib'

import type { Component } from 'solid-js'

export interface IChatItem {
  id: string
  name: string
  time: string
  message: string
  count: number
  image?: string
}

interface IChatItemProps {
  item: IChatItem
  onClick?: (id: string) => void
}

export const ChatItem: Component<IChatItemProps> = props => {
  const handleClick = (): void => props.onClick?.(props.item.id)

  return (
    <a
      tabIndex="0"
      use:rippleClick
      onClick={ handleClick }
      class={ cn(
        'group flex flex-row items-center gap-2 h-20 p-3 rounded-lg cursor-pointer select-none transition-colors',
        'hover:bg-[#f3f3f4]',
        'focus:outline-none focus:bg-primary-color'
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
    </a>
  )
}
