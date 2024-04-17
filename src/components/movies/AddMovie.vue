<template>
  <section>
    <div class="container pt-28">
      <h1 class="text-center text-3xl lg:text-4xl text-primary-500 font-bold">
        Add new Movie
      </h1>

      <div class="mt-10">
        <MovieForm type="add" @submit="handleSubmit" />
      </div>
    </div>
  </section>
</template>

<script>
import MovieForm from "./form/MovieForm.vue";
import { MOVIE_TYPES } from "@/services/store/types";
export default {
  components: { MovieForm },
  methods: {
    handleSubmit({ data }) {
      this.$store.dispatch(MOVIE_TYPES.CREATE_MOVIE_ACTION, data);
      this.$router.push("/movies");
    },
  },
};
</script>
