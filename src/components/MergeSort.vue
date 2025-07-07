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

/**
 * 这里为了直接在原数组上操作才这样写
 *
 * 实际的归并排序会借助一个临时数组
 */

async function run(arr: Ref<ItemType[]>) {
  await splitAndMerge(0, arr.value.length - 1)

  async function splitAndMerge(start: number, end: number): Promise<[number, number]> {
    if (start === end) {
      return [start, end]
    }

    const mid = Math.floor((end - start) / 2)

    const merged = await merge(await splitAndMerge(start, start + mid), await splitAndMerge(start + mid + 1, end))

    return merged
  }

  async function merge(section1: [start: number, end: number], section2: [start: number, end: number]): Promise<[number, number]> {
    const lastMerge = section1[0] === 0 && section2[1] === arr.value.length - 1

    if (lastMerge) {
      for (let i = section1[0]; i <= section1[1]; i++) {
        arr.value[i].sorted = true
      }
    }

    let j = section2[0]
    while (j <= section2[1]) {
      let i = section1[0]

      while (1) {
        arr.value[i].active = true
        arr.value[j].active = true
        await wait(config.value.waitTime)
        arr.value[i].active = false
        arr.value[j].active = false
        if (arr.value[i].item > arr.value[j].item || i++ === section1[1]) {
          arr.value.splice(i, 0, ...arr.value.splice(j, 1))
          lastMerge && (arr.value[i].sorted = true)
          section1[1]++
          break
        }
      }
      j++
    }

    return [section1[0], section2[1]]
  }
}

defineExpose<Pick<InstanceType<typeof BaseSort>, 'rerun'>>()
</script>

<template>
  <BaseSort :ref="changeRef as any" :config="config" @run-sort="run" @befor-run="reject()" />
</template>
