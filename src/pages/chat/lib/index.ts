import type { IMessage } from '@/shared/types'

export const filterMessages = (messages: IMessage[] | undefined, search: string): IMessage[] => {
  const lowerCaseSearch = search.toLowerCase()

  if (!messages) return []

  const checkSearchIncludes = (message: IMessage): boolean => {
    const lowerCaseName = message.text.toLowerCase()
    return lowerCaseName.includes(lowerCaseSearch)
  }

  return messages.filter(checkSearchIncludes)
}
