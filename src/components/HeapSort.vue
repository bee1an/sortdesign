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
  // 建堆, 从非叶子节点开始建堆
  for (let i = Math.floor(arr.value.length / 2); i--;) {
    await heapify(i, arr.value.length)
  }

  let n = arr.value.length

  // 排序
  while (--n) {
    [arr.value[0], arr.value[n]] = [arr.value[n], arr.value[0]]

    arr.value[n].sorted = true

    if (n === 1) {
      arr.value[0].sorted = true
    }
    await heapify(0, n)
  }

  async function heapify(i: number, maxIndex: number) {
    arr.value[i].active = true

    await wait(config.value.waitTime)

    let largest = i
    const left = i * 2 + 1
    const right = i * 2 + 2

    if (left < maxIndex && arr.value[left].item > arr.value[largest].item) {
      largest = left
    }

    if (right < maxIndex && arr.value[right].item > arr.value[largest].item) {
      largest = right
    }

    if (largest !== i) {
      ;[arr.value[i], arr.value[largest]] = [arr.value[largest], arr.value[i]]
      await heapify(largest, maxIndex)
    }
    else {
      arr.value[i].active = false
    }
  }
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
