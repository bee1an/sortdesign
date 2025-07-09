<script setup lang="ts">
definePage({
  meta: {
    title: '基数排序(Radix Sort)',
  },
})

const templateRef = useTemplateRef('selectionSort')

const length = useStorage('length', 20, undefined, { flush: 'post' })

const waitTime = useStorage('waitTime', 100)
</script>

<template>
  <SortWrapper v-model="waitTime" v-model:length="length" @rerun="templateRef?.rerun()">
    <RadixSort ref="selectionSort" :config="{ waitTime, length }" />
  </SortWrapper>
</template>
