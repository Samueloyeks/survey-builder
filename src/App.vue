<template>
  <div class="flex flex-col md:flex-row">
    <div class="bg-gray-800 sticky top-0 md:h-screen w-full md:w-2/3 z-1">
      <QuestionForm />
    </div>

    <div class="bg-white w-full min-h-screen">
      <QuestionsList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import QuestionsList from '@/components/QuestionsList.vue'
import QuestionForm from '@/components/QuestionForm.vue'
import { useQuestions } from '@/composables/question'

const { questions } = useQuestions()
provide('questions', questions)
</script>
