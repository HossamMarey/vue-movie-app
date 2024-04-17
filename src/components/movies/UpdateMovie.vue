<template>
  <section>
    <div class="container pt-28">
      <h1 class="text-center text-3xl lg:text-4xl text-primary-500 font-bold">
        Edit Movie
      </h1>

      <div class="mt-10">
        <MovieForm :movie="movie" type="update" @submit="handleSubmit" />
      </div>
    </div>
  </section>
</template>

<script>
import { MOVIE_TYPES } from "@/services/store/types";
import MovieForm from "./form/MovieForm.vue";
export default {
  components: { MovieForm },
  props: { movie: Object },
  methods: {
    handleSubmit({ data, id }) {
      this.$store.dispatch(MOVIE_TYPES.UPDATE_MOVIE_ACTION, { ...data, id });
      this.$router.go(-1);
    },
  },
};
</script>
