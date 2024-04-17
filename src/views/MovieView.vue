<template>
  <SingleMovie v-if="movie" :movie="movie" />
  <NotFound v-else />
</template>

<script>
import { MOVIE_TYPES } from "@/services/store/types";
import SingleMovie from "@/components/movies/SingleMovie.vue";
import NotFound from "@/components/shared/NotFound.vue";

export default {
  components: { SingleMovie, NotFound },
  computed: {
    movieId() {
      return this.$route.params.id;
    },
    movie() {
      return this.$store.getters[MOVIE_TYPES.MOVIE](this.movieId);
    },
  },
};
</script>
