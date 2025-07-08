<script setup lang="ts">
definePage({
  meta: {
    title: '选择排序(Selection Sort)',
  },
})

const templateRef = useTemplateRef('selectionSort')

const length = useStorage('length', 20, undefined, { flush: 'post' })

const waitTime = useStorage('waitTime', 100)
</script>

<template>
  <SortWrapper v-model="waitTime" v-model:length="length" @rerun="templateRef?.rerun()">
    <SelectionSort ref="selectionSort" :config="{ waitTime, length }" />
  </SortWrapper>
</template>
