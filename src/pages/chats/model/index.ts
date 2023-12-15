import { createResource } from 'solid-js'

import { fetchChatsList } from '@/shared/api'

import type { Resource } from 'solid-js'
import type { IChatItem } from '@/shared/types'

export const chatsData = (): Resource<IChatItem[]> => {
  const [chatsList] = createResource(fetchChatsList)

  return chatsList
}
