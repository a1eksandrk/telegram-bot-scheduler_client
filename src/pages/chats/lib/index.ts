import type { IChat } from '@/shared/types'

export const filterChats = (chats: IChat[] | undefined, search: string): IChat[] => {
  const lowerCaseSearch = search.toLowerCase()

  if (!chats) return []

  const checkSearchIncludes = (chat: IChat): boolean => {
    const lowerCaseName = chat.name.toLowerCase()
    return lowerCaseName.includes(lowerCaseSearch)
  }

  return chats.filter(checkSearchIncludes)
}
