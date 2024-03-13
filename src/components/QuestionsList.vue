<template>
  <div class="px-10">
    <h2 class="text-gray-600 text-xl my-5 font-bold">All Questions</h2>

    <QuestionItem
      v-for="(question, index) in questions"
      :question="question"
      :index="index"
      :key="question.question"
    />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import QuestionItem from '@/components/QuestionItem.vue'

const questions = inject('questions')
</script>
