<template>
  <RouterLink v-if="movie" :to="`/movies/${movie?.id}`">
    <div
      class="rounded-lg aspect-[1/1.3] overflow-hidden relative hover:opacity-90 hover:scale-105 transition-all duration-300"
    >
      <img
        :src="movie?.poster"
        :alt="movie?.title"
        class="w-full h-full object-cover"
      />

      <div
        class="absolute top-4 right-4 bg-primary-900/60 px-2 py-1 text-xs text-primary-400 border border-primary-500 rounded-full font-bold"
      >
        {{ movie.actors?.length }} Actors
      </div>
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/0 to-black/90"
      ></div>
      <div class="mt-4 flex items-end gap-3 absolute w-full bottom-0 p-4">
        <h3 class="flex-1 text-lg">{{ movie?.title }}</h3>
        <strong class="text-primary-500"> {{ movie?.year }}</strong>
      </div>
    </div>
  </RouterLink>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  components: {
    RouterLink,
  },
  props: {
    movie: Object,
  },
};
</script>
