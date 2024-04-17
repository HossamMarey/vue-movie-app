<template>
  <UpdateMovie v-if="movie" :movie="movie" />
  <NotFound v-else />
</template>

<script>
import { MOVIE_TYPES } from "@/services/store/types";
import UpdateMovie from "@/components/movies/UpdateMovie.vue";
import NotFound from "@/components/shared/NotFound.vue";

export default {
  components: { UpdateMovie, NotFound },
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
