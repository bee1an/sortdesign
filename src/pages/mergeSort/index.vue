<script setup lang="ts">
definePage({
  meta: {
    title: '归并排序(Merge Sort)',
  },
})

const mergeSort = useTemplateRef('mergeSort')

const length = useStorage('length', 20)

const waitTime = useStorage('waitTime', 100)
</script>

<template>
  <SortWrapper v-model="waitTime" v-model:length="length" @rerun="mergeSort?.rerun()">
    <MergeSort ref="mergeSort" :config="{ waitTime, length }" />
  </SortWrapper>
</template>
