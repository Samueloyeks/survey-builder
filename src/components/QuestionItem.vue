<template>
  <div>
    <div
      class="block max-w p-6 my-3 border border-gray-200 rounded-lg shadow break-word bg-gray-800"
    >
      <div class="mb-5">
        <label class="font-bold">Question:</label>
        <p>{{ question?.question }}</p>
      </div>
      <div>
        <label class="font-bold mb-10">Answer:</label>
        <div v-if="question?.type === 'open'">
          <textarea
            class="block p-3 mt-5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 dark:text-white"
            @input="debouncedHandler"
            v-model="question.answer"
          >
          </textarea>
        </div>
        <div v-else>
          <div class="flex flex-row">
            <div
              v-for="scale of LIKERT_SCALE"
              @click="handleLikertResponseChange(scale.value)"
              :key="scale.value"
              :class="{ 'bg-white text-black': scale.value === question?.answer }"
              class="block max-w border px-5 mr-3 mt-5 border-gray-200 rounded-lg bg-gray-800 inline cursor-pointer"
            >
              {{ scale.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onBeforeUnmount, watch, ref, type Ref } from 'vue'
import { useQuestions } from '@/composables/question'
import debounce from 'lodash.debounce'

const LIKERT_SCALE = [
  { value: 1, color: 'red' },
  { value: 2, color: 'red' },
  { value: 3, color: 'amber' },
  { value: 4, color: 'red' },
  { value: 5, color: 'green' }
]
const INPUT_DEBOUNCE = 700

const { updateQuestion } = useQuestions()

const props = defineProps<{
  question?: Question
  index: number
}>()

const question: Ref<Question | undefined> = ref(props.question)

const handleLikertResponseChange = (response: number) => {
  if (props.question) {
    const updatedQuestion: Question = { ...props.question, answer: Number(response) }

    updateQuestion(updatedQuestion, props.index)
  }
}

const debouncedHandler = debounce((event) => {
  if (props.question) {
    const updatedQuestion: Question = { ...props.question, answer: event.target.value }

    updateQuestion(updatedQuestion, props.index)
  }
}, INPUT_DEBOUNCE)

onBeforeUnmount(() => {
  debouncedHandler.cancel()
})

watch(
  () => props.question?.answer,
  (newVal) => {
    console.log(newVal)
    question.value = { ...props.question, answer: newVal }
  }
)
</script>
