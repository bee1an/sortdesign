<script setup lang="ts">
const { num, max } = defineProps<{
  num: number
  max: number
  active: boolean
}>()
</script>

<template>
  <div
    :style="{
      '--height': `${num / max * 100}%`,
      '--active': '1',
    }" class="h-[var(--height)]" :class="[active ? 'bg-#C8E6FF99' : 'bg-#C8B4FF99']"
    max-h="95%"
    flex="~ 1"
    w-10 items-end justify-center
  >
    {{ num }}
  </div>
</template>

<style scoped></style>
