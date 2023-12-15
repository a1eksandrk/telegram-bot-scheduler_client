import { mockChatsList } from '@/shared/lib'

import type { IChatItem } from '@/shared/types'

export const fetchChatsList = async (): Promise<IChatItem[]> => {
  return await new Promise(resolve => setTimeout(() => { resolve(mockChatsList) }, 1000))
}
