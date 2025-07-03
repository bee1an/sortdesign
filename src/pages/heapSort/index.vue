<script setup lang="ts">
definePage({
  meta: {
    title: '堆排序(Heap Sort)',
  },
})

const heapSort = useTemplateRef('heapSort')

const length = useStorage('length', 20)

const waitTime = useStorage('waitTime', 100)
</script>

<template>
  <SortWrapper v-model="waitTime" v-model:length="length" @rerun="heapSort?.rerun()">
    <HeapSort ref="heapSort" :config="{ length, waitTime }" />
  </SortWrapper>
</template>
