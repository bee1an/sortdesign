<script setup>
const router = useRouter()

const sortRouters = computed(() => {
  const routes = router.getRoutes()
  return routes.filter(route => route.name !== '/' && route.name !== '/[...all]')
})
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <RouterView />
    <TheFooter />
  </main>

  <footer>
    <div h-1px bg="gray-200 dark:gray-700" />

    <div p="x-4 y-10" m-auto flex gap-3 w-screen-md justify-center>
      <div v-for="route in sortRouters" :key="route.path">
        <RouterLink
          :to="route.path" text-blue-500
          underline dark:text-gray-200 hover:text-blue-700 dark:hover:text-gray-100
        >
          {{ route.meta.title }}
        </RouterLink>
      </div>
    </div>
  </footer>
</template>
