import { createContext } from 'react'
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

type FormItemContextValue = {
  id: string
}

export const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
)

export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

export const FormFieldContextProvider = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

export const FormItemContextProvider = FormItemContext.Provider
