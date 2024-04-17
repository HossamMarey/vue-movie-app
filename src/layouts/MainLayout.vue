<template>
  <header
    class="fixed top-0 left-0 right-0 w-full bg-black/15 backdrop-blur-xl z-50"
  >
    <div class="container flex items-center justify-between gap-4 py-4">
      <RouterLink to="/">
        <h1 class="text-xl text-primary-500">Movies App</h1>
      </RouterLink>
      <nav class="flex gap-4 items-center">
        <RouterLink to="/movies">Movies</RouterLink>
        <RouterLink to="/movies/add">Add Movie</RouterLink>
      </nav>
    </div>
  </header>
  <main>
    <slot />
  </main>
  <!-- <footer>footer</footer> -->
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
  },
};
</script>

<style scoped>
.router-link-exact-active {
  @apply text-primary-500;
}
</style>
