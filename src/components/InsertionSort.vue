<script setup lang="ts">
import type { ItemType } from './BaseSort.vue'
import BaseSort from './BaseSort.vue'

const props = defineProps<{
  config?: {
    waitTime?: number
    length?: number
  }
}>()

const { config, wait, reject, changeRef } = useSortInit(props)

async function run(arr: Ref<ItemType[]>) {
  arr.value[0].sorted = true
  for (let i = 1; i < arr.value.length; i++) {
    arr.value[i].active = true
    await wait(config.value.waitTime)
    const item = arr.value[i].item
    let j = 0
    while (1) {
      await wait(config.value.waitTime)
      if (arr.value[j].item > item || ++j === i) {
        const [present] = arr.value.splice(i, 1)
        present.sorted = true
        arr.value.splice(j, 0, present)
        break
      }
    }
  }
}

defineExpose<Pick<InstanceType<typeof BaseSort>, 'rerun'>>()
</script>

<template>
  <BaseSort :ref="changeRef as any" :config="config" @run-sort="run" @befor-run="reject()" />
</template>
