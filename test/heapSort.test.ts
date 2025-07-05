import { describe, expect, it } from 'vitest'
import { checkArrayIsSorted, createArrayByLength, random } from './utils'

function heapSort(arr: number[]) {
  // 建堆, 从非叶子节点开始建堆
  for (let i = Math.floor(arr.length / 2); i--;) {
    heapify(i, arr.length)
  }

  let n = arr.length

  // 排序
  while (--n) {
    [arr[0], arr[n]] = [arr[n], arr[0]]

    heapify(0, n)
  }

  function heapify(i: number, maxIndex: number) {
    let largest = i
    const left = i * 2 + 1
    const right = i * 2 + 2

    if (left < maxIndex && arr[left] > arr[largest]) {
      largest = left
    }

    if (right < maxIndex && arr[right] > arr[largest]) {
      largest = right
    }

    if (largest !== i) {
      ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
      heapify(largest, maxIndex)
    }
  }

  return arr
}

describe('heapSort', () => {
  it('should sort an array', () => {
    Array.from({ length: 1000 }, () => createArrayByLength(random(2, 1000))).forEach((arr) => {
      expect(checkArrayIsSorted(heapSort(arr))).toBe(true)
    })
  })
})
