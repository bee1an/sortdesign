<script setup lang="ts">
definePage({
  meta: {
    title: '冒泡排序(Bubble Sort)',
  },
})

const bubbleSort = useTemplateRef('bubbleSort')

const length = useStorage('length', 20)

const waitTime = useStorage('waitTime', 100)
</script>

<template>
  <SortWrapper v-model="waitTime" v-model:length="length" @rerun="bubbleSort?.rerun()">
    <BubbleSort ref="bubbleSort" :config="{ length, waitTime }" />
  </SortWrapper>
</template>
