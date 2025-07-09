<script setup lang="ts">
import type { ItemType } from './BaseSort.vue'
import BaseSort from './BaseSort.vue'

const props = defineProps<{
  config?: {
    waitTime?: number
    length?: number
  }
}>()

const { config, reject, changeRef } = useSortInit(props)

interface Chain extends ItemType {
  value: number
  next: Chain | null
}

interface ChainList {
  head: Chain | null
  tail: Chain | null
}

function getDigitByPlace(num: number, place: number) {
  if (place !== 1 && place % 10 !== 0)
    throw new Error('place must be a positive integer ending in 0')

  return Math.floor(Math.abs(num) % ((place * 10)) / place)
}
async function run(arr: Ref<ItemType[]>) {
  let place = 1

  const chainList = Array.from({ length: 10 }, () => ({ head: null, tail: null }))

  let head: Chain | null = null

  // 将所有数字包装后放入链表数组
  for (let i = 0; i < arr.value.length; i++) {
    Object.assign(arr.value[i], { value: arr.value[i].item, next: null })
    fillChainList(chainList, getDigitByPlace(arr.value[i].item, place), arr.value[i] as Chain)
  }

  while (1) {
    place *= 10
    let loop = false // 循环退出条件是当所有数字中没有数大于当前位
    head = convertList2Chain(chainList)

    getNext(head, (chain: Chain) => {
      if (chain.value >= place) {
        loop = true
      }

      fillChainList(chainList, getDigitByPlace(chain.value, place), chain)
    })

    if (!loop)
      break
  }

  head = convertList2Chain(chainList)

  arr.value = convertChain2Arr(head)

  function getNext(node: Chain | null, handle: (node: Chain) => void) {
    if (node === null)
      return

    handle(node)

    getNext(node.next, handle)
  }

  function fillChainList(list: ChainList[], place: number, chain: Chain) {
    if (!list[place].head) {
      list[place].head = list[place].tail = chain
    }
    else {
      list[place].tail!.next = chain
      list[place].tail = chain
    }
  }

  function convertList2Chain(list: ChainList[]): Chain {
    let head: Chain | null = null
    let last: Chain | null = null

    list.forEach((item) => {
      if (!item.head)
        return

      if (head === null) {
        head = item.head
      }

      if (last) {
        last.next = item.head
      }

      last = item.tail

      item.head = null
      item.tail = null
    })
    last!.next = null

    return head as unknown as Chain
  }

  function convertChain2Arr(data: Chain | null, arr: Chain[] = []) {
    if (data === null)
      return arr

    arr.push(data)
    convertChain2Arr(data.next, arr)
    return arr
  }
}

defineExpose<Pick<InstanceType<typeof BaseSort>, 'rerun'>>()
</script>

<template>
  <BaseSort :ref="changeRef as any" :config="config" @run-sort="run" @befor-run="reject()" />
</template>
