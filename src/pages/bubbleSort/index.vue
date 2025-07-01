<script setup lang="ts">
definePage({
  meta: {
    title: '冒泡排序(Bubble Sort)',
  },
})

const bubbleSort = useTemplateRef('bubbleSort')

const length = useStorage('length', 20)

const waitTime = useStorage('waitTime', 100)
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
            <span>元素数量</span><input v-model.lazy="length" step="1" type="range" min="2" max="100">{{ length }}
          </div>

          <button
            border="1px solid gray rd-sm" text-sm p-1 p-x-2 cursor-pointer hover="b-yellow-600 text-yellow-600"
            @click="bubbleSort?.rerun()"
          >
            再试一次
          </button>
        </div>
      </div>
      <BubbleSort ref="bubbleSort" :config="{ length, waitTime }" />
    </div>
  </div>
</template>
