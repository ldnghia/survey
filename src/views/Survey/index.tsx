'use client'

import { useEffect, useState } from 'react'

import { ButtonBack } from '@dcorp/web-ui'
import { Button, Input, Rate, Space, Spin, Tag } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Title from 'antd/es/typography/Title'
import { useSearchParams } from 'next/navigation'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
    useCreateSurveyMutation,
    useGetListQaQuery,
} from '@/apis/endpoints/survey'
import Form from '@/components/Form/Form'
import FormController from '@/components/Form/FormController'
import { Scrollable } from '@/components/Scrollable'
import Notification from '@/components/ui/Result'
import {
    Answers,
    Questions,
    StepSurvey,
    SurveyCreateInputs,
} from '@/types/survey'

const { CheckableTag } = Tag

export default function Survey() {
    const ENV = process.env.NEXT_PUBLIC_ENVIRONMENT
    console.log('ENV', ENV)
    const { t } = useTranslation()
    const [showSuccess, setShowSuccess] = useState(false)
    const [step, setStep] = useState(StepSurvey.Info)
    const [stepSurvey, setStepSurvey] = useState(0)
    const [selectedTags, setSelectedTags] = useState<Answers[]>([])
    const [listQa, setListQa] = useState<Questions[]>([])
    const [offset, setOffset] = useState<number>(0)
    const searchParams = useSearchParams()

    const orgId = searchParams.get('orgId')
    const storeId = searchParams.get('storeId')
    const transactionNumber = searchParams.get('transactionNumber')
    const formMethods = useForm<SurveyCreateInputs>()

    const {
        handleSubmit,
        formState: { errors },
        register,
        control,
        watch,
        setValue,
    } = formMethods

    const valuesForm = useWatch({
        control,
    })
    const { contactPhone } = valuesForm

    const { data: dataQa, isInitialLoading: loadingQA } = useGetListQaQuery(
        {
            orgId: Number(orgId),
            storeId: Number(storeId) ?? undefined,
            transactionNumber: transactionNumber ?? undefined,
            contactPhone,
            offset,
            limit: 1,
        },
        {
            enabled: !!orgId && step === StepSurvey.Rate,
        }
    )

    const totalQa = dataQa?.data?.totalCount

    useEffect(() => {
        if (dataQa) {
            const qa = dataQa?.data?.records[0]
            if (dataQa.data?.totalCount === 0) {
                setListQa([])
                remove(0)
            } else if (!listQa.find((x) => x.id === qa?.id)) {
                const poll =
                    dataQa?.data?.records.map((x) => {
                        x.answers = x.answers?.map((y) => {
                            y.questionId = x.id
                            return y
                        })
                        return x
                    }) ?? []
                setListQa([...listQa, ...poll])
                append({
                    rating: 5,
                    ids: dataQa?.data?.records[0]?.id,
                })
            }
        }
    }, [dataQa])

    const { mutate: createSurveyMutation, isLoading } = useCreateSurveyMutation(
        {
            onSuccess: () => {
                setShowSuccess(true)
            },
            meta: {
                disableMessage: true,
            },
        }
    )

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'polls',
    })

    const handleSave = handleSubmit((data) => {
        const polls = data.polls?.map((x) => {
            const answersSelected = selectedTags.filter(
                (y) => y.questionId === x.ids
            )
            const poll = {
                id: x.ids,
                rating: x.rating,
                answers: answersSelected.map((z: any) => {
                    const ans = {
                        id: z.id,
                        name: z.name,
                    }
                    return ans
                }),
            }
            return poll
        })
        const payLoad: SurveyCreateInputs = {
            contactName: data.contactName,
            contactPhone: data.contactPhone,
            contactEmail: data.contactEmail,
            comment: data.comment,
            organizationId: Number(orgId) ?? undefined,
            storeId: Number(storeId) ?? undefined,
            transactionNumber: transactionNumber ?? undefined,
            polls,
        }
        createSurveyMutation(payLoad)
    })

    const nextStep = handleSubmit(() => {
        if (step === StepSurvey.Info) {
            setStep(StepSurvey.Rate)
            setOffset(0)
        }
    })

    const nextSurvey = () => {
        if (
            listQa &&
            dataQa?.data?.totalCount &&
            dataQa?.data?.totalCount > stepSurvey + 1
        ) {
            setOffset(offset + 1)
            setStepSurvey(stepSurvey + 1)
        } else {
            setStep(StepSurvey.CommentOther)
        }
    }

    const backStep = () => {
        if (step === StepSurvey.Rate && stepSurvey > 0) {
            setStepSurvey(stepSurvey - 1)
        } else if (step === StepSurvey.CommentOther) {
            setStep(StepSurvey.Rate)
        } else {
            setStep(StepSurvey.Info)
        }
    }

    const getTileQa = (id: number) => {
        return listQa ? listQa.find((x) => x.id === id)?.name : ''
    }

    const handleChange = (tag: Answers, checked: boolean) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((x) => x.id !== tag.id)
        setSelectedTags(nextSelectedTags)
    }

    const getListComment = (id: number, rating: number) => {
        const questions = listQa ? listQa.find((x) => x.id === id) : undefined
        return questions && questions.answers
            ? questions?.answers.filter((c) => c.rate === rating)
            : []
    }

    const changeRate = (index: number) => {
        const qaCurrent = listQa ? listQa[index] : undefined
        const listTags = selectedTags.filter(
            (x) => x.questionId !== qaCurrent?.id
        )
        setSelectedTags([...listTags])
    }

    const validateId = (id: any) => {
        const parsedId = parseInt(id, 10)
        // Check if it's a valid 32-bit integer
        return Number.isSafeInteger(parsedId)
    }

    if (!orgId || Number(orgId) <= 0 || !validateId(orgId)) {
        return <Notification message={t('message.error.url_validation')} />
    }

    if (storeId && !validateId(storeId)) {
        return <Notification message={t('message.error.url_validation')} />
    }

    return (
        <>
            {!showSuccess && !!orgId && (
                <div className="relative h-full">
                    <Spin
                        spinning={isLoading || loadingQA}
                        className="my-auto flex max-h-full"
                        style={{ maxHeight: '100%' }}
                    >
                        <div className="text-center p-4 relative">
                            {step !== StepSurvey.Info && (
                                <ButtonBack
                                    isOnlyIcon
                                    onClick={() => {
                                        backStep()
                                    }}
                                    className="absolute left-[16px] top-[18px] !text-neutral-text"
                                    color="#000000E0"
                                />
                            )}
                            <Title className="mb-0" level={3}>
                                {t('survey.title_page')}
                            </Title>
                        </div>
                        <Scrollable
                            style={{ maxHeight: 'calc(100dvh - 150px)' }}
                        >
                            <Form {...formMethods} className="mx-4">
                                {step === StepSurvey.Info && (
                                    <div className="">
                                        <div className="text-center text-[18px] font-[600] py-16">
                                            {t('survey.welcome')}
                                        </div>
                                        <div className="space-y-8">
                                            <FormController
                                                label={t(
                                                    'survey.field.contact_name'
                                                )}
                                                name="contactName"
                                                showRequired={true}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        allowClear
                                                        size="large"
                                                    />
                                                )}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: `${t(
                                                            'message.error.contact_name_required'
                                                        )}`,
                                                    },
                                                }}
                                                formItemProps={{
                                                    help: errors.contactName
                                                        ?.message,
                                                    validateStatus: errors
                                                        .contactName?.message
                                                        ? 'error'
                                                        : undefined,
                                                    className: 'label-input',
                                                }}
                                            />
                                            <FormController
                                                label={t(
                                                    'survey.field.phone_number'
                                                )}
                                                name="contactPhone"
                                                showRequired={true}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        allowClear
                                                        size="large"
                                                    />
                                                )}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: `${t(
                                                            'message.error.phone_number_required'
                                                        )}`,
                                                    },
                                                    pattern: {
                                                        // eslint-disable-next-line prefer-regex-literals
                                                        value: new RegExp(
                                                            /^\+?[0-9]{9,12}$/
                                                        ),
                                                        message: t(
                                                            'message.error.phone_number_validation'
                                                        ),
                                                    },
                                                }}
                                                formItemProps={{
                                                    help: errors.contactPhone
                                                        ?.message,
                                                    validateStatus: errors
                                                        .contactPhone?.message
                                                        ? 'error'
                                                        : undefined,
                                                    className: 'label-input',
                                                }}
                                            />
                                            <FormController
                                                label={t('survey.field.email')}
                                                name="contactEmail"
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        allowClear
                                                        size="large"
                                                    />
                                                )}
                                                rules={{
                                                    pattern: {
                                                        // eslint-disable-next-line prefer-regex-literals
                                                        value: new RegExp(
                                                            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                                        ),
                                                        message: t(
                                                            'message.error.email_validation'
                                                        ),
                                                    },
                                                }}
                                                formItemProps={{
                                                    help: errors.contactEmail
                                                        ?.message,
                                                    validateStatus: errors
                                                        .contactEmail?.message
                                                        ? 'error'
                                                        : undefined,
                                                    className: 'label-input',
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                                {step === StepSurvey.Rate && fields.length > 0 && (
                                    <div className="pt-40">
                                        {fields.map(
                                            (item, index) =>
                                                stepSurvey === index && (
                                                    <div key={index}>
                                                        {getTileQa(item.ids) ? (
                                                            <>
                                                                <FormController
                                                                    key={index}
                                                                    label={getTileQa(
                                                                        item.ids
                                                                    )}
                                                                    name={`polls.${index}.rating`}
                                                                    className="text-center"
                                                                    formItemProps={{
                                                                        className:
                                                                            'text-center form-rate',
                                                                    }}
                                                                    render={({
                                                                        field: {
                                                                            value,
                                                                            ...rest
                                                                        },
                                                                    }) => (
                                                                        <>
                                                                            <Rate
                                                                                key={
                                                                                    index
                                                                                }
                                                                                {...register(
                                                                                    `polls.${index}.rating`
                                                                                )}
                                                                                {...rest}
                                                                                value={
                                                                                    value
                                                                                }
                                                                                allowClear={
                                                                                    false
                                                                                }
                                                                                className="text-[48px] space-x-4 mt-6"
                                                                                onChange={(
                                                                                    values
                                                                                ) => {
                                                                                    setValue(
                                                                                        `polls.${index}.rating`,
                                                                                        values
                                                                                    )
                                                                                    changeRate(
                                                                                        index
                                                                                    )
                                                                                }}
                                                                            />
                                                                            <div className="w-[312px] absolute mx-auto left-0 right-0">
                                                                                <span className="ant-rate-text text-[16px] absolute left-[12px] top-[12px]">
                                                                                    {t(
                                                                                        'bad'
                                                                                    )}
                                                                                </span>
                                                                                <span className="ant-rate-text text-[16px] absolute right-[12px] top-[12px]">
                                                                                    {t(
                                                                                        'good'
                                                                                    )}
                                                                                </span>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                />
                                                                <FormController
                                                                    key={`${index}comment`}
                                                                    name={`polls.${index}.comment`}
                                                                    className="text-center"
                                                                    formItemProps={{
                                                                        className:
                                                                            'text-center !mt-16',
                                                                    }}
                                                                    render={() => (
                                                                        <Space
                                                                            size={[
                                                                                16,
                                                                                16,
                                                                            ]}
                                                                            wrap
                                                                            className="justify-center"
                                                                        >
                                                                            {getListComment(
                                                                                item.ids,
                                                                                watch(
                                                                                    `polls.${index}.rating`
                                                                                )
                                                                            )?.map(
                                                                                (
                                                                                    tag
                                                                                ) => (
                                                                                    <CheckableTag
                                                                                        key={
                                                                                            tag.id
                                                                                        }
                                                                                        checked={
                                                                                            !!selectedTags.find(
                                                                                                (
                                                                                                    x
                                                                                                ) =>
                                                                                                    x.id ===
                                                                                                    tag.id
                                                                                            )
                                                                                        }
                                                                                        onChange={(
                                                                                            checked
                                                                                        ) =>
                                                                                            handleChange(
                                                                                                tag,
                                                                                                checked
                                                                                            )
                                                                                        }
                                                                                        className="m-0"
                                                                                    >
                                                                                        {
                                                                                            tag.name
                                                                                        }
                                                                                    </CheckableTag>
                                                                                )
                                                                            )}
                                                                        </Space>
                                                                    )}
                                                                />
                                                            </>
                                                        ) : (
                                                            <Notification
                                                                message={t(
                                                                    'message.error.polled'
                                                                )}
                                                            />
                                                        )}
                                                    </div>
                                                )
                                        )}
                                    </div>
                                )}
                                {step === StepSurvey.Rate &&
                                    !loadingQA &&
                                    totalQa === 0 &&
                                    fields.length === 0 && (
                                        <Notification
                                            message={t('message.error.polled')}
                                        />
                                    )}
                                {step === StepSurvey.CommentOther && (
                                    <div className="pt-40">
                                        <FormController
                                            label={t('survey.field.comment')}
                                            formItemProps={{
                                                className:
                                                    'text-center form-rate',
                                            }}
                                            name="comment"
                                            className="form-rate"
                                            render={({ field }) => (
                                                <TextArea
                                                    {...field}
                                                    rows={4}
                                                    className="mt-8"
                                                />
                                            )}
                                        />
                                    </div>
                                )}
                            </Form>
                        </Scrollable>
                        <div className="absolute bottom-4 px-4 w-full">
                            {step === StepSurvey.Info && (
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        nextStep()
                                    }}
                                    block
                                    size="large"
                                >
                                    {t('next')}
                                </Button>
                            )}
                            {step === StepSurvey.Rate &&
                                !!totalQa &&
                                totalQa > 0 && (
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            nextSurvey()
                                        }}
                                        block
                                        size="large"
                                    >
                                        {t('next')}
                                    </Button>
                                )}

                            {step === StepSurvey.Rate &&
                                !loadingQA &&
                                totalQa === 0 &&
                                fields.length === 0 && (
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            backStep()
                                        }}
                                        block
                                        size="large"
                                    >
                                        {t('back')}
                                    </Button>
                                )}

                            {step === StepSurvey.CommentOther && (
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        handleSave()
                                    }}
                                    block
                                    size="large"
                                >
                                    {t('submit')}
                                </Button>
                            )}
                        </div>
                    </Spin>
                </div>
            )}
            {showSuccess && (
                <Notification
                    status="success"
                    message={t('survey.poll_success')}
                />
            )}
        </>
    )
}
