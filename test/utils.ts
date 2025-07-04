export function createArrayByLength(length: number) {
  return Array.from({ length }, () => random(0, length))
}

export function checkArrayIsSorted(arr: number[]) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false
    }
  }
  return true
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
