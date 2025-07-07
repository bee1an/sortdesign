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
  let increment = Math.floor(arr.value.length / 2)

  // 增量减少
  while (increment > 0) {
    let n = 0
    if (increment === 1) {
      arr.value[0].sorted = true
    }

    // 依次排序
    while (n < increment) {
      let i = n
      let j = n

      // 当前增量排序
      while (1) {
        i += increment

        if (i > arr.value.length - 1) {
          break
        }

        // 插入排序
        while (1) {
          arr.value[j].active = true
          arr.value[i].active = true
          await wait(config.value.waitTime)
          if (increment === 1) {
            arr.value[i].sorted = true
          }
          arr.value[j].active = false
          arr.value[i].active = false
          if (arr.value[j].item > arr.value[i].item) {
            arr.value.splice(j, 0, ...arr.value.splice(i, 1))
            break
          }
          j += increment
          if (j > i) {
            break
          }
        }
        j = n
      }
      n++
    }

    increment = Math.floor(increment / 2)
  }

  return arr
}

defineExpose<Pick<InstanceType<typeof BaseSort>, 'rerun'>>()
</script>

<template>
  <BaseSort :ref="changeRef as any" :config="config" @run-sort="run" @befor-run="reject()" />
</template>
