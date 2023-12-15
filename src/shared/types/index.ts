export interface IBaseFormType { [s: string]: any }

export type TValidation<FormType extends IBaseFormType> = Record<keyof FormType, (value: FormType[keyof FormType]) => boolean>

export type TFormErrors<FormType extends IBaseFormType> = Record<keyof FormType, boolean>

export interface IChatItem {
  id: string
  name: string
  time: string
  message: string
  count: number
  image?: string
}
