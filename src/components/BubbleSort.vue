<script setup lang="ts">
import type { ItemType } from './BaseSort.vue'
import BaseSort from './BaseSort.vue'

const { config: _c } = defineProps<{
  config?: {
    waitTime?: number
    length?: number
  }
}>()

const config = computed(() => Object.assign({ length: 40, waitTime: 200 }, _c))

let promise: Promise<void>, resolve: () => void, reject: () => void
function wait(ms: number) {
  ; ({ promise, resolve, reject } = Promise.withResolvers<void>())
  setTimeout(resolve, ms)
  return promise
}

async function run(arr: Ref<ItemType[]>) {
  let n = arr.value.length
  let swapped
  do {
    swapped = false
    for (let i = 0; i < n - 1; i++) {
      arr.value[i].active = true

      await wait(config.value.waitTime)

      if (arr.value[i].item > arr.value[i + 1].item) {
        ;[arr.value[i], arr.value[i + 1]] = [arr.value[i + 1], arr.value[i]]
        swapped = true
      }
      arr.value[i].active = false
    }

    n--
    arr.value[n].sorted = true

    if (!swapped) {
      while (n--) {
        arr.value[n].sorted = true
      }
    }
  } while (swapped)
}

const vm = getCurrentInstance()
function changeRef(instance: InstanceType<typeof BaseSort>) {
  vm!.exposed = instance
}

defineExpose<Pick<InstanceType<typeof BaseSort>, 'rerun'>>()
</script>

<template>
  <BaseSort :ref="changeRef as any" :config="config" @run-sort="run" @befor-run="reject?.()" />
</template>
