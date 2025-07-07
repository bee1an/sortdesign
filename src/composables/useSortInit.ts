import type BaseSort from '../components/BaseSort.vue'

export function useSortInit(props: { config?: {
  waitTime?: number
  length?: number
} }) {
  const config = computed(() => Object.assign({ length: 40, waitTime: 200 }, props.config))

  let promise: Promise<void>
  let resolve: () => void
  let reject: (() => void) | null = null
  function wait(ms: number) {
    ; ({ promise, resolve, reject } = Promise.withResolvers<void>())
    setTimeout(resolve, ms)
    return promise
  }

  const vm = getCurrentInstance()
  function changeRef(instance: InstanceType<typeof BaseSort>) {
    vm!.exposed = instance
  }

  return { config, wait, reject: () => reject?.(), changeRef }
}
