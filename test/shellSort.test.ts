import { describe, expect, it } from 'vitest'
import { checkArrayIsSorted, createArrayByLength, random } from './utils'

function shellSort(arr: number[]) {
  let increment = Math.floor(arr.length / 2)

  // 增量减少
  while (increment > 0) {
    let n = 0

    // 依次排序
    while (n < increment) {
      let i = n
      let j = n

      // 当前增量排序
      while (1) {
        i += increment

        if (i > arr.length - 1) {
          break
        }

        // 插入排序
        while (1) {
          if (arr[j] > arr[i]) {
            arr.splice(j, 0, ...arr.splice(i, 1))
            break
          }
          j += increment
          if (j > i) {
            break
          }
        }
        j = n
      }
      n++
    }

    increment = Math.floor(increment / 2)
  }

  return arr
}

describe('shellSort', () => {
  it('should sort an array', () => {
    Array.from({ length: 1000 }, () => createArrayByLength(random(2, 1000))).forEach((arr) => {
      expect(checkArrayIsSorted(shellSort(arr))).toBe(true)
    })
  })
})
