<script setup lang="ts">
defineEmits<{
  rerun: () => void
}>()
const waitTime = defineModel()
const length = defineModel<number>('length')

watch(length, (newValue) => {
  if (newValue! > 100) {
    length.value = 100
  }
  else if (newValue! < 2) {
    length.value = 2
  }
})
</script>

<template>
  <div flex justify-center>
    <div flex="~ col" gap-1 wfit justify-center>
      <div flex items-center justify-between>
        <div>{{ $route.meta.title }}</div>

        <div flex gap-2 justify-end>
          <div flex gap-1 items-center>
            <span>过渡时间</span><input
              v-model.lazy="waitTime" border="1px solid gray rd-sm"
              type="number"
              w-15
            >
          </div>

          <div flex gap-1 items-center>
            <span>元素数量</span><input v-model.lazy.number="length" step="1" type="range" min="2" max="100"><input
              v-model.lazy="length" border="1px solid gray rd-sm"
              type="number"
              w-15
              min="2" max="100"
            >
          </div>

          <button
            border="1px solid gray rd-sm" text-sm p-1 p-x-2 cursor-pointer hover="b-yellow-600 text-yellow-600"
            @click="$emit('rerun')"
          >
            再试一次
          </button>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>
