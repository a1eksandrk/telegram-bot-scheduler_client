import { ChatItem, type IChatItem } from '@/entities/chat-item'
import { className as cn } from '@/shared/lib'

import { For, type Component } from 'solid-js'

interface IChatsListProps {
  list?: IChatItem[]
  onClick?: (id: string) => void
}

export const ChatsList: Component<IChatsListProps> = props => {
  const handleClick = (id: string): void => props.onClick?.(id)

  return (
    <div class='h-full overflow-hidden'>
      <ul class={ cn('flex flex-col p-2 h-full overflow-auto') }>
        <For each={ props.list }>
          {
            item => (
              <li>
                <ChatItem item={ item } onClick={ handleClick } />
              </li>
            )
          }
        </For>
      </ul>
    </div>
  )
}
