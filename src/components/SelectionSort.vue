<script setup lang="ts">
import type { ItemType } from './BaseSort.vue'
import BaseSort from './BaseSort.vue'

const { config: _c } = defineProps<{
  config?: {
    waitTime?: number
    length?: number
  }
}>()

const { config, wait, reject, changeRef } = useSortInit(_c)

async function run(arr: Ref<ItemType[]>) {
  for (let i = 0; i < arr.value.length; i++) {
    await wait(config.value.waitTime)
    let j = i
    let min = arr.value[j].item
    let minIndex = j
    while (j < arr.value.length) {
      arr.value[j].active = true
      await wait(config.value.waitTime)
      arr.value[j].active = false
      if (arr.value[j].item < min) {
        min = arr.value[j].item
        arr.value[minIndex].active = false
        minIndex = j
        arr.value[minIndex].active = true
      }
      j++
    }

    arr.value.splice(i, 0, ...arr.value.splice(minIndex, 1))
    arr.value[i].sorted = true
  }
}

defineExpose<Pick<InstanceType<typeof BaseSort>, 'rerun'>>()
</script>

<template>
  <BaseSort :ref="changeRef as any" :config="config" @run-sort="run" @befor-run="reject()" />
</template>
