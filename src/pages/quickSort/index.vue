<script setup lang="ts">
definePage({
  meta: {
    title: '快速排序(QuickSort)',
  },
})

const quickSort = useTemplateRef('quickSort')

const length = useStorage('length', 20, undefined, { flush: 'post' })

const waitTime = useStorage('waitTime', 100)
</script>

<template>
  <SortWrapper v-model="waitTime" v-model:length="length" @rerun="quickSort?.rerun()">
    <QuickSort ref="quickSort" :config="{ waitTime, length }" />
  </SortWrapper>
</template>
