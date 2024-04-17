<template>
  <HomeHero v-if="movies?.length" :movies="movies" />
  <HomeMoviesCards v-if="movies?.length" :movies="movies" />
  <EmptyMovies v-else />
</template>

<script>
import { MOVIE_TYPES } from "@/services/store/types";
import HomeHero from "@/components/home/HomeHero.vue";
import HomeMoviesCards from "@/components/home/HomeMoviesCards.vue";
import EmptyMovies from "@/components/shared/EmptyMovies.vue";
export default {
  components: { HomeHero, EmptyMovies, HomeMoviesCards },
  computed: {
    movies() {
      return this.$store.getters[MOVIE_TYPES.MOVIES];
    },
  },
};
</script>
