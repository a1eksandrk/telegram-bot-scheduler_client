import { createResource } from 'solid-js'

import { fetchChats } from '@/shared/api'

import type { ResourceReturn } from 'solid-js'
import type { IChat } from '@/shared/types'

export const chatsData = (): ResourceReturn<IChat[]> => {
  return createResource(fetchChats)
}
