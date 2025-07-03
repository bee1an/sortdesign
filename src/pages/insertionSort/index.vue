<script setup lang="ts">
definePage({
  meta: {
    title: '插入排序(Insertion Sort)',
  },
})

const insertionSort = useTemplateRef('insertionSort')

const length = useStorage('length', 20)

const waitTime = useStorage('waitTime', 100)
</script>

<template>
  <SortWrapper v-model="waitTime" v-model:length="length" @rerun="insertionSort?.rerun()">
    <InsertionSort ref="insertionSort" :config="{ waitTime, length }" />
  </SortWrapper>
</template>
