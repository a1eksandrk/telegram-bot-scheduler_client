export interface IBaseFormType { [s: string]: any }

export type TValidation<FormType extends IBaseFormType> = { [K in keyof FormType]: (value: FormType[K]) => boolean }

export type TFormErrors<FormType extends IBaseFormType> = Record<keyof FormType, boolean>

export interface IMessage {
  id: string
  time: string
  text: string
}

export interface IChat {
  id: string
  name: string
  count: number
  messages: IMessage[]
  avatar?: string
}

export type TMessageData = Omit<IMessage, 'id'>
