import type { IChatView } from '@/shared/types'

export const filterChatsList = (chatsList: IChatView[] | undefined, search: string): IChatView[] => {
  const lowerCaseSearch = search.toLowerCase()

  if (!chatsList) return []

  const checkSearchIncludes = (chat: IChatView): boolean => {
    const lowerCaseName = chat.name.toLowerCase()
    return lowerCaseName.includes(lowerCaseSearch)
  }

  return chatsList.filter(checkSearchIncludes)
}
