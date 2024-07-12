import React from 'react'

import { FormItemProps } from 'antd'
import {
    Controller,
    FieldValues,
    ControllerProps,
    FieldPath,
} from 'react-hook-form'

import FormItem from './FormItem'

export interface FormControllerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends ControllerProps<TFieldValues, TName> {
    className?: string
    label?: string
    showRequired?: boolean
    tooltip?: string
    formItemProps?: FormItemProps
}

export default function FormController<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    label,
    showRequired,
    tooltip,
    control,
    formItemProps,
    ...props
}: FormControllerProps<TFieldValues, TName>) {
    return (
        <FormItem
            tooltip={tooltip}
            showRequired={showRequired}
            label={label}
            {...formItemProps}
        >
            <Controller control={control} {...props} />
        </FormItem>
    )
}
