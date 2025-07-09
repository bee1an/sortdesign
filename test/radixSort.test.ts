import { describe, expect, it } from 'vitest'
import { checkArrayIsSorted, createArrayByLength, random } from './utils'

/**
 * 取指定位上的数字
 *
 * 例如 getDigitByPlace(123, 1) = 3, getDigitByPlace(123, 10) = 2, getDigitByPlace(123, 100) = 2
 * getDigitByPlace(123, 1000) = 0, getDigitByPlace(-123, 1) = 3
 */
function getDigitByPlace(num: number, place: number) {
  if (place !== 1 && place % 10 !== 0)
    throw new Error('place must be a positive integer ending in 0')

  return Math.floor(Math.abs(num) % ((place * 10)) / place)
}
interface Chain {
  value: number
  next: Chain | null
}

interface ChainList {
  head: Chain | null
  tail: Chain | null
}

function radixSort(arr: number[]) {
  let place = 1

  const chainList = Array.from({ length: 10 }, () => ({ head: null, tail: null }))

  let head: Chain | null = null

  // 将所有数字包装后放入链表数组
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i]

    fillChainList(chainList, getDigitByPlace(num, place), {
      value: num,
      next: null,
    })
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

  return convertChain2Arr(head)

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

  function convertChain2Arr(data: Chain | null, arr: number[] = []) {
    if (data === null)
      return arr

    arr.push(data.value)
    convertChain2Arr(data.next, arr)
    return arr
  }
}
// function radixSort(arr: number[]) {
//   let place = 10

//   const chainArr = Array.from({ length: 10 }, () => createBucket())

//   let firstOne: Chain | null = null

//   while (1) {
//     let broundary = true
//     for (let i = 0; i < arr.length; i++) {
//       const num = arr[i]

//       const placeNumber = getDigitByPlace(num, place)

//       if (num >= place) {
//         broundary = false
//       }

//       const chain = typeof num === 'number' ? convertNum2Chain(num) : num
//       if (!chainArr[placeNumber].start) {
//         chainArr[placeNumber].start = chainArr[placeNumber].end = chain
//       }
//       else {
//         chainArr[placeNumber].end!.next = chain
//         chainArr[placeNumber].end = chain
//       }
//     }

//     firstOne = null
//     let lastOne: Chain | null = null
//     chainArr.forEach((bucket) => {
//       if (bucket.end === null)
//         return

//       if (lastOne !== null) {
//         lastOne.next = bucket.start
//       }

//       if (firstOne === null) {
//         firstOne = bucket.start
//       }

//       lastOne = bucket.end

//       bucket.end = bucket.start = null
//     })

//     place *= 10

//     arr = getNext(firstOne)

//     if (broundary) {
//       break
//     }
//   }

//   function getNext(data: Chain | null, arr: number[] = []) {
//     if (data === null)
//       return arr

//     arr.push(data.value)
//     getNext(data.next, arr)
//     return arr
//   }

//   function convertNum2Chain(num: number): Chain {
//     return {
//       value: num,
//       next: null,
//     }
//   }

//   function createBucket(): {
//     start: Chain | null
//     end: Chain | null
//   } {
//     return {
//       start: null,
//       end: null,
//     }
//   }

//   return arr
// }

describe('radixSort', () => {
  it('should sort an array', () => {
    expect(getDigitByPlace(123, 1)).toMatchInlineSnapshot(`3`)
    expect(getDigitByPlace(123, 10)).toMatchInlineSnapshot(`2`)
    expect(getDigitByPlace(123, 100)).toMatchInlineSnapshot(`1`)
    expect(getDigitByPlace(123, 1000)).toMatchInlineSnapshot(`0`)
    expect(getDigitByPlace(-123, 1)).toMatchInlineSnapshot(`3`)

    Array.from({ length: 1000 }, () => createArrayByLength(random(2, 1000))).forEach((arr) => {
      expect(checkArrayIsSorted(radixSort(arr))).toBe(true)
    })

    expect(radixSort([
      7,
      0,
      8,
      12,
      7,
      6,
      0,
      9,
      5,
      3,
    ])).toMatchInlineSnapshot(`
      [
        0,
        0,
        3,
        5,
        6,
        7,
        7,
        8,
        9,
        12,
      ]
    `)
  })
})
