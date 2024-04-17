<template>
  <HomeHero v-if="movies?.length" />
  <EmptyMovies v-else />
</template>

<script>
import { MOVIE_TYPES } from "@/services/store/types";
import HomeHero from "@/components/movies/MoviesCards.vue";
import EmptyMovies from "@/components/shared/EmptyMovies.vue";
export default {
  components: { HomeHero, EmptyMovies },
  computed: {
    movies() {
      return this.$store.getters[MOVIE_TYPES.MOVIES];
    },
  },
};
</script>
