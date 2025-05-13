// src/types.ts
export interface Question {
    id: number
    title?: string
    optionA: string
    optionB: string
    optionC: string
    optionD: string
    answer?: string
    createdAt?: string
}

export interface Option {
    label: string
    text: string
}
