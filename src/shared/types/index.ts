export interface IBaseFormType { [s: string]: any }

export type TValidation<FormType extends IBaseFormType> = Record<keyof FormType, (value: FormType[keyof FormType]) => boolean>

export type TFormErrors<FormType extends IBaseFormType> = Record<keyof FormType, boolean>

export interface IMessage {
  id: string
  time: string
  text: string
}

export interface IChatView {
  id: string
  name: string
  count: number
  message: IMessage
  avatar?: string
}

export interface IChat {
  id: string
  name: string
  count: number
  messages: IMessage[]
  avatar?: string
}
