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
  const classifyItems = async (items: ItemType[], start: number, end: number) => {
    if (end - start < 1) {
      items.slice(start, end + 1).forEach((item) => {
        item.sorted = true
      })
      return
    }

    let flagIndex = start
    const flagItem = items[start]
    flagItem.active = true

    for (let i = start; i <= end; i++) {
      await wait(config.value.waitTime)

      if (flagItem.item > items[i].item) {
        const lesser = items.splice(i, 1)
        items.splice(start, 0, ...lesser)
        flagIndex++
      }
    }

    items[flagIndex].sorted = true
    await classifyItems(items, start, flagIndex - 1)
    await classifyItems(items, flagIndex + 1, end)
  }

  await classifyItems(arr.value, 0, arr.value.length - 1)
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
