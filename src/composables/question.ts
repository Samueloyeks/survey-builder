import { inject, ref, type Ref } from 'vue'

export const useQuestions = () => {
  const questions: Ref<Question[]> =
    inject('questions') ?? ref(JSON.parse(localStorage.getItem('questions') ?? '[]'))

  const saveQuestion = (question: Question) => {
    const questionList = [...questions.value, question]
    questions.value = questionList
    localStorage.setItem('questions', JSON.stringify(questionList))
    return questionList
  }

  const updateQuestion = (question: Question, index: number) => {
    const questionList = [...questions.value]
    questionList[index] = question
    questions.value = questionList
    localStorage.setItem('questions', JSON.stringify(questionList))
    return questionList
  }

  return { questions, saveQuestion, updateQuestion }
}
