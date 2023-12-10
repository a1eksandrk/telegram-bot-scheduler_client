import { Avatar } from '@/entities/avatar'
import { Badge } from '@/shared/ui'
import { rippleClick, className as cn } from '@/shared/lib'

import type { Component } from 'solid-js'

export interface IChatItem {
  name: string
  time: string
  message: string
  count: number
  image?: string
}

interface IChatItemProps {
  item: IChatItem
  onClick?: () => void
}

export const ChatItem: Component<IChatItemProps> = props => {
  const handleClick = (): void => props.onClick?.()

  return (
    <a
      tabIndex="0"
      use:rippleClick
      onClick={ handleClick }
      class={ cn(
        'group grid grid-rows-1 grid-cols-min-first-2 items-center gap-2 h-20 p-3 rounded-lg cursor-pointer select-none transition-colors overflow-hidden',
        'hover:bg-[#f3f3f4]',
        'focus:outline-none focus:bg-primary-color'
      ) }
    >
      <Avatar
        src={ props.item.image }
        fallbackClass={ cn('group-focus:bg-white group-focus:text-primary-color') }
      >
        { props.item.name[0].toUpperCase() }
      </Avatar>

      <div>
        <p class={ cn('flex gap-2 justify-between') }>
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
        </p>

        <p class={ cn('flex gap-2 justify-between') }>
          <span
            class={ cn(
              'text-secondary-text-color truncate transition-colors',
              'group-focus:text-white'
            ) }
          >
            { props.item.message }
          </span>

          <Badge
            class={ cn(
              'transition-colors',
              'group-focus:bg-white group-focus:text-primary-color'
            )}
          >
            { props.item.count }
          </Badge>
        </p>
      </div>
    </a>
  )
}
