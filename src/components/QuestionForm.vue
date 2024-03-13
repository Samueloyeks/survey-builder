<template>
  <form>
    <div class="p-5 md:p-10">
      <label for="question" class="block mb-2 text-sm font-semibold dark:text-white"
        >Question</label
      >
      <textarea
        rows="4"
        class="block p-3 mb-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Type your question here..."
        v-model="question"
        required
      ></textarea>

      <label for="question" class="block mb-2 text-sm font-semibold dark:text-white"
        >Question type</label
      >
      <ul
        class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div class="flex items-center ps-3">
            <input
              id="horizontal-list-radio-id"
              type="radio"
              name="open"
              value="open"
              v-model="questionType"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              for="horizontal-list-radio-id"
              class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Open Question</label
            >
          </div>
        </li>
        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div class="flex items-center ps-3">
            <input
              id="horizontal-list-radio-license"
              type="radio"
              name="multipleChoice"
              value="multipleChoice"
              v-model="questionType"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              for="horizontal-list-radio-license"
              class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Multiple choice
            </label>
          </div>
        </li>
      </ul>

      <button
        @click.prevent="handleSubmit()"
        :disabled="isEmpty"
        :class="{ 'bg-gray-700': isEmpty }"
        class="my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Create Question
      </button>
    </div>
  </form>
</template>

<style scoped></style>
<script setup lang="ts">
import { useQuestions } from '@/composables/question'
import { computed, ref } from 'vue'

const { saveQuestion } = useQuestions()
const DEFAULT_QUESTION_TYPE = 'open'

let question = ref('')
let questionType = ref<'open' | 'multipleChoice'>(DEFAULT_QUESTION_TYPE)

const handleSubmit = () => {
  const newQueston: Question = {
    question: question.value,
    type: questionType.value
  }

  saveQuestion(newQueston)
  question.value = ''
  questionType.value = DEFAULT_QUESTION_TYPE
}

const isEmpty = computed(() => question.value.trim() === '')
</script>
