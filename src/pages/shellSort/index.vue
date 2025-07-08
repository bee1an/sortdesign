<script setup lang="ts">
definePage({
  meta: {
    title: '希尔排序(Shell Sort)',
  },
})

const templateRef = useTemplateRef('shellSort')

const length = useStorage('length', 20, undefined, { flush: 'post' })

const waitTime = useStorage('waitTime', 100)
</script>

<template>
  <SortWrapper v-model="waitTime" v-model:length="length" @rerun="templateRef?.rerun()">
    <ShellSort ref="shellSort" :config="{ waitTime, length }" />
  </SortWrapper>
</template>
