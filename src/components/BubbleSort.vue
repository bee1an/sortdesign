<script setup lang="ts">
const { config: _c } = defineProps<{
  config?: {
    waitTime?: number
    length?: number
  }
}>()
const config = computed(() => Object.assign({ length: 40, waitTime: 200 }, _c))

const arrWrapped = ref<{ item: number, key: number }[]>([])

let promise: Promise<void>, resolve: () => void, reject: () => void

function wait(ms: number) {
  ; ({ promise, resolve, reject } = Promise.withResolvers<void>())
  setTimeout(resolve, ms)
  return promise
}

const activeIdx = ref(-1)

let running = true
function init() {
  if (!running)
    return

  running = false
  reject?.()
  arrWrapped.value = (Array.from({ length: config.value.length }, () => Math.floor(Math.random() * config.value.length) + 1)).map((item, key) => ({ item, key }))
  activeIdx.value = -1

  setTimeout(() => {
    running = true
    bubbleSortArr()
  }, 500)
}
watch(config, () => {
  init()
}, { immediate: true })

const max = computed(() => Math.max(...arrWrapped.value.map(({ item }) => item)))

async function bubbleSortArr() {
  let n = arrWrapped.value.length
  let swapped
  do {
    swapped = false
    for (let i = 0; i < n - 1; i++) {
      activeIdx.value = i

      const err = Symbol('')
      const returnable = await wait(config.value.waitTime).catch(() => err)
      if (returnable === err)
        return

      if (arrWrapped.value[i].item > arrWrapped.value[i + 1].item) {
        ;[arrWrapped.value[i], arrWrapped.value[i + 1]] = [arrWrapped.value[i + 1], arrWrapped.value[i]]
        swapped = true
      }
    }
    n--
  } while (swapped)
  activeIdx.value = -1
}

defineExpose({ rerun: init })
</script>

<template>
  <div border="1px solid gray" flex="~ items-end" p-x-1 gap-1 h-60 max-w-266 overflow-auto>
    <TransitionGroup name="list">
      <Rect
        v-for="(option, index) in arrWrapped" :key="option.key" :num="option.item" :max
        :active="activeIdx === index"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active {
  transition: all v-bind('`${config.waitTime / 1000}s`') ease;
}
</style>
