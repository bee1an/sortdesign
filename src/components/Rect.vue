<script setup lang="ts">
import type { ItemType } from './SortContainer.vue'

const { num, max, item } = defineProps<{
  num: number
  max: number
  item: ItemType

}>()

const colorClass = computed(() => {
  if (item.sorted)
    return 'bg-#78648CB3'

  if (item.active)
    return 'bg-#C8E6FF99'

  return 'bg-#C8B4FF99'
})
</script>

<template>
  <div
    :style="{
      '--height': `${num / max * 100}%`,
      '--active': '1',
    }"
    class="h-[var(--height)]" :class="colorClass"
    max-h="95%"
    flex="~ 1"
    w-10 items-end justify-center
  >
    {{ num }}
  </div>
</template>

<style scoped></style>
