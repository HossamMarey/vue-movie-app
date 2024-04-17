<template>
  <section>
    <div class="container pt-28">
      <h1 class="text-center text-3xl lg:text-4xl text-primary-500 font-bold">
        Edit Movie
      </h1>

      <div class="mt-10">
        <MovieForm :movie="movie" type="update" />
      </div>
    </div>
  </section>
</template>

<script>
import MovieForm from "./form/MovieForm.vue";
export default {
  components: { MovieForm },
  props: { movie: Object },
};
</script>
