import * as React from 'react'

import { Form as FormAntd, FormProps as FormPropsAntd } from 'antd'
import { FormProvider, FieldValues, FormProviderProps } from 'react-hook-form'

export type FormPropsContextValue = {
    readonly?: boolean
}

export interface FormProps<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues extends FieldValues | undefined = undefined
> extends FormProviderProps<TFieldValues, TContext, TTransformedValues>,
        FormPropsContextValue {
    formProps?: Omit<FormPropsAntd, 'children' | 'className'>
    className?: string
}

const FormPropsContext = React.createContext<FormPropsContextValue>(
    {} as FormPropsContextValue
)

export function useFormPropsContext() {
    return React.useContext(FormPropsContext)
}

export default function Form<
    TFieldValues extends FieldValues,
    TContext = any,
    TTransformedValues extends FieldValues | undefined = undefined
>({
    formProps,
    children,
    readonly,
    className,
    ...props
}: FormProps<TFieldValues, TContext, TTransformedValues>) {
    return (
        <FormPropsContext.Provider value={{ readonly }}>
            <FormProvider {...props}>
                <FormAntd
                    autoComplete="off"
                    {...formProps}
                    className={className}
                    layout="vertical"
                >
                    {children}
                </FormAntd>
            </FormProvider>
        </FormPropsContext.Provider>
    )
}
