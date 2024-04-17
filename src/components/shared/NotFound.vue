<template>
  <div class="container">
    <div
      class="flex flex-col items-center justify-center gap-5 text-xl h-screen"
    >
      <ph-camera-slash
        :size="100"
        weight="duotone"
        class="text-primary-500 opacity-50"
      />
      <h1 class="opacity-50">Page Not Found</h1>
      <RouterLink to="/">
        <Button
          label="Go Home "
          size="large"
          class="w-full capitalize !text-lg"
        />
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { PhCameraSlash } from "@phosphor-icons/vue";
import Button from "primevue/button";
import { RouterLink } from "vue-router";
export default {
  components: {
    PhCameraSlash,
    Button,
    RouterLink,
  },
};
</script>
