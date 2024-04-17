<template>
  <section
    v-if="activeMovie"
    :style="{ backgroundImage: `url(${activeMovie?.poster})` }"
    class="h-screen bg-cover"
  >
    <div class="w-full h-full hero-shade">
      <div class="container pt-28 md:pt-32 lg:pt-40">
        <div class="max-w-2xl">
          <h1
            class="text-3xl lg:text-5xl text-surface-0 font-bold !leading-[1.5]"
          >
            {{ activeMovie?.title }}
          </h1>

          <div class="my-2 flex items-center gap-3 opacity-70">
            <span> {{ activeMovie.year }} </span>
            <span> - </span>
            <span
              v-for="(actor, ix) in activeMovie.actors"
              :key="actor.actor_id"
            >
              {{ actor.data.name }}
              <span v-if="ix < activeMovie.actors.length - 1">, </span>
            </span>
          </div>
          <div class="mt-6 flex items-center gap-4">
            <RouterLink :to="`/movies/${activeMovie.id}/edit`">
              <Button size="large" outlined>
                <div class="flex items-center gap-2">
                  <ph-pencil-line :size="18" weight="duotone" />
                  <span> Edit Movie </span>
                </div>
              </Button>
            </RouterLink>
            <RouterLink :to="`/movies/${activeMovie.id}`">
              <Button size="large">
                <div class="flex items-center gap-2">
                  <span> See details </span>
                  <ph-arrow-right :size="18" weight="duotone" />
                </div>
              </Button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Button from "primevue/button";
import { RouterLink } from "vue-router";
import { PhArrowRight, PhPencilLine } from "@phosphor-icons/vue";
export default {
  components: {
    Button,
    RouterLink,
    PhArrowRight,
    PhPencilLine,
  },
  props: {
    movies: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {
    activeMovie() {
      return this.movies[this.activeMovieIndex];
    },
    activeMovieIndex() {
      return this.$store.state.MoviesModule.home_active_movie_index;
    },
  },
};
</script>

<style scoped>
.hero-shade {
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.75) 60%,
    rgba(0, 0, 0, 0.3) 100%
  );
}
</style>
