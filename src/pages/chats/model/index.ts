import { createCachedResource } from 'solid-cached-resource'

import { fetchChats } from '@/shared/api'

import type { Resource } from 'solid-js'
import type { IChatView } from '@/shared/types'

export const chatsData = (): Resource<IChatView[]> => {
  const [chats] = createCachedResource<IChatView[], typeof fetchChats>(
    () => ['chatsData'],
    fetchChats
  )

  return chats
}
