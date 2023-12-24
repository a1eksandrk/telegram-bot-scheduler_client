import type { TMessageData } from '@/shared/types'

export interface ISendMessageProps {
  onSend?: (messageData: TMessageData) => Promise<void> | void
}

export interface ISendMessageForm {
  text: string
  time: string
}
