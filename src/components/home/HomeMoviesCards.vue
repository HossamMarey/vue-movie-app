<template>
  <section
    class="-mt-[50vh] md:-mt-[45vh] lg:-mt-[40vh] xl:-mt-[35vh] max-w-screen w-full mb-12 hero-slider"
  >
    <div class=" ">
      <swiper :space-between="50" slides-per-view="auto">
        <swiper-slide
          v-for="(movie, ix) in movies"
          :key="movie.id"
          class="!w-auto"
        >
          <div
            class="!w-[350px] hover:scale-110 transition-transform duration-300 cursor-pointer"
            @click="() => handleActiveMovie(ix)"
          >
            <img
              :src="movie.poster"
              :alt="movie.title"
              class="w-full aspect-[1/1.3] object-cover"
            />
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <div
      class="flex items-center justify-center mt-24 mb-20 text-center flex-col gap-5"
    >
      <h2 class="text-3xl">Popular Movies</h2>
      <RouterLink :to="`/movies`">
        <Button
          label="See All Movies"
          size="large"
          outlined
          class="text-xl px-12"
        />
      </RouterLink>
    </div>
  </section>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { MOVIE_TYPES } from "@/services/store/types";
import Button from "primevue/button";
import { RouterLink } from "vue-router";
// Import Swiper styles
import "swiper/css";

export default {
  components: { Swiper, SwiperSlide, RouterLink, Button },
  props: {
    movies: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    handleActiveMovie(ix) {
      this.$store.commit(MOVIE_TYPES.SET_ACTIVE_MOVIE_INDEX, ix);
    },
  },
};
</script>

<style>
.hero-slider .swiper-wrapper {
  justify-content: center !important;
}
</style>
