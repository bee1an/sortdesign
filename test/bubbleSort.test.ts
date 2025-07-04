import { describe, expect, it } from 'vitest'
import { checkArrayIsSorted, createArrayByLength, random } from './utils'

function bubbleSort(arr: number[]) {
  let n = arr.length
  let swapped
  do {
    swapped = false
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        ;[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
        swapped = true
      }
    }

    n--
  } while (swapped)

  return arr
}

describe('bubbleSort', () => {
  it('should sort an array', () => {
    Array.from({ length: 1000 }, () => createArrayByLength(random(2, 1000))).forEach((arr) => {
      expect(checkArrayIsSorted(bubbleSort(arr))).toBe(true)
    })
  })
})
