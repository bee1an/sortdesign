<script lang="ts">
export interface ItemType {
  item: number
  key: number
  active: boolean
  sorted: boolean
}
</script>

<script setup lang="ts">
const { config, onRunSort, onBeforRun } = defineProps<{
  config: {
    waitTime: number
    length: number
  }

  onRunSort: (arr: Ref<ItemType[]>) => any

  onBeforRun?: () => any
}>()

const arrWrapped = ref<ItemType[]>([])

const activeIdx = ref(-1)

let running = true
function init() {
  if (!running)
    return

  onBeforRun?.()

  running = false

  arrWrapped.value = (Array.from({ length: config.length }, () =>
    Math.floor(Math.random() * config.length) + 1)).map((item, key) => ({ item, key, active: false, sorted: false }))

  activeIdx.value = -1

  setTimeout(() => {
    running = true
    onRunSort(arrWrapped)
  }, 500)
}
watch(() => config, () => {
  init()
}, { immediate: true })

const max = computed(() => Math.max(...arrWrapped.value.map(({ item }) => item)))

defineExpose({ rerun: init })
</script>

<template>
  <div border="1px solid gray" flex="~ items-end" p-x-1 gap-1 h-60 max-w-266 overflow-auto>
    <TransitionGroup name="list">
      <Rect v-for="option in arrWrapped" :key="option.key" :num="option.item" :max :item="option" />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active {
  transition: all v-bind('`${config.waitTime / 1000}s`') ease;
}
</style>
