<template>
  <section class="py-16">
    <div class="container">
      <div class="text-center mt-20">
        <p class="text-lg text-primary-500">Online Streaming</p>
        <h1 class="text-3xl mt-2 font-bold">Popular Shows</h1>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-4 mt-10">
        <AutoComplete
          v-model="filteredTitle"
          :suggestions="filteredMoviesTitles"
          @complete="search"
          dropdown
          placeholder="Search movie"
        />

        <Calendar
          v-model="date"
          placeholder="filter by year"
          view="year"
          dateFormat="yy"
          :maxDate="new Date()"
        />
        <InputNumber
          v-model="filteredActors"
          placeholder="filter by actors numbers"
        />

        <Button
          label="reset"
          outlined
          severity="secondary"
          @click="resetFilters"
        />
      </div>

      <div
        v-if="filteredMovies?.length"
        class="mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6"
      >
        <MoviesCard
          v-for="movie in filteredMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>

      <div
        v-else
        class="flex items-center justify-center py-28 text-3xl opacity-40"
      >
        No Movies
      </div>
    </div>
  </section>
</template>
<script>
import { MOVIE_TYPES } from "@/services/store/types";
import MoviesCard from "./MoviesCard.vue";
import AutoComplete from "primevue/autocomplete";
import Calendar from "primevue/calendar";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";

export default {
  components: { MoviesCard, AutoComplete, Calendar, InputNumber, Button },
  data() {
    return {
      filteredTitle: "",
      filteredActors: null,
      filteredMoviesTitles: [],
      date: null,
    };
  },
  computed: {
    movies() {
      return this.$store.getters[MOVIE_TYPES.MOVIES];
    },
    moviesTitles() {
      return this.movies.map((movie) => movie.title);
    },
    filteredYears() {
      if (!this.date) return null;
      return new Date(this.date).getFullYear();
    },
    filteredMovies() {
      return this.movies.filter((movie) => {
        const title = movie.title.toLowerCase();
        const actors = movie.actors?.length;
        const year = movie.year;

        let filtered = true;
        if (this.filteredTitle && filtered) {
          filtered = title.includes(this.filteredTitle.toLowerCase());
        }

        if (this.filteredActors && filtered) {
          filtered = actors == this.filteredActors;
        }

        if (this.filteredYears && filtered) {
          filtered = year === this.filteredYears;
        }

        return filtered;
      });
    },
  },

  methods: {
    search(event) {
      this.filteredMoviesTitles = this.moviesTitles.filter((title) => {
        return title.toLowerCase().includes(event.query.toLowerCase());
      });
    },
    resetFilters() {
      this.filteredTitle = "";
      this.filteredActors = null;
      this.date = null;
    },
  },
};
</script>
import { data } from "autoprefixer";
