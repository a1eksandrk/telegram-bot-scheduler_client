export interface IBaseFormType { [s: string]: any }

export type TValidation<FormType extends IBaseFormType> = Record<keyof FormType, (value: FormType[keyof FormType]) => boolean>

export type TFormErrors<FormType extends IBaseFormType> = Record<keyof FormType, boolean>
