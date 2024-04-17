<template>
  <MainLayout>
    <RouterView />
    <Toast />
  </MainLayout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import { MOVIE_TYPES } from "@/services/store/types";
import { RouterView } from "vue-router";
import Toast from "primevue/toast";
export default {
  components: {
    MainLayout,
    RouterView,
    Toast,
  },
  beforeMount() {
    this.$store.dispatch(MOVIE_TYPES.INIT_MOVIES_ACTION);
  },
};
</script>
