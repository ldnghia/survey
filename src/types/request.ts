import { z } from 'zod'

export const formRequestSchema = z.object({
    title: z.string().min(1).max(100),
    description: z.string().nullish(),
    priority: z.number(),
    images: z.any().nullish(),
})

export type FormRequestType = z.infer<typeof formRequestSchema>

export enum RequestStatus {
    Processing = 0,
    Processed = 1,
}

export enum RequestPriority {
    Low = 0,
    Medium = 1,
    High = 2,
}
