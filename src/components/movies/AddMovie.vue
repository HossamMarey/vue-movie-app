<template>
  <section>
    <div class="container pt-28">
      <h1 class="text-center text-3xl lg:text-4xl text-primary-500 font-bold">
        Add new Movie
      </h1>

      <div class="mt-10">
        <MovieForm type="add" />
      </div>
    </div>
  </section>
</template>

<script>
import MovieForm from "./form/MovieForm.vue";
export default {
  components: { MovieForm },
};
</script>
