declare global {
  interface Question {
    question: string
    type: 'open' | 'multipleChoice'
    answer?: number | string
  }
}

export {}
