<template>
  <section class="pt-28 relative">
    <div class="absolute inset-0 h-[70vh] bg-black/75 z-[1]">
      <img
        :src="movie?.poster"
        :alt="movie?.title"
        class="w-full h-full object-cover opacity-30 blur-sm"
      />
    </div>

    <div class="relative z-[3]">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-3">
          <div class="md:col-span-2">
            <h1 class="text-3xl lg:text-4xl font-bold">{{ movie?.title }}</h1>

            <div class="my-4 flex items-center gap-3 opacity-70 text-lg">
              <span
                class="border border-primary-500 px-3 rounded text-base text-primary-500 font-bold"
              >
                {{ movie?.year }}
              </span>
              <span> - </span>
              <span v-for="(actor, ix) in movie?.actors" :key="actor?.actor_id">
                {{ actor.data.name }}
                <span v-if="ix < movie.actors.length - 1">, </span>
              </span>
            </div>

            <p class="text-lg opacity-70" v-html="movie?.description"></p>

            <div class="mt-6 lg:mt-8 flex items-center gap-4">
              <RouterLink :to="`/movies/${movie.id}/edit`">
                <Button size="large" outlined>
                  <div class="flex items-center gap-2 text-lg">
                    <ph-pencil-line :size="20" weight="duotone" />
                    <span> Edit Movie </span>
                  </div>
                </Button>
              </RouterLink>

              <Button
                size="large"
                severity="danger"
                @click="handleDeleteConfirm($event)"
              >
                <div class="flex items-center gap-2 text-lg">
                  <ph-trash :size="20" weight="duotone" />
                  <span> Delete </span>
                </div>
              </Button>

              <ConfirmPopup />
            </div>
          </div>
          <div class="flex justify-center">
            <img
              :src="movie?.poster"
              :alt="movie?.title"
              class="rounded-lg shadow-lg max-w-72 w-full"
            />
          </div>
        </div>
        <div class="my-12 opacity-90">
          <h2 class="text-xl mb-5">Actors</h2>

          <DataTable
            :value="actorsData"
            tableStyle="min-width: 50rem  "
            class=" "
            showGridlines
          >
            <Column field="name" header="Name"></Column>
            <Column field="birth_date" header="Birth Date"></Column>
            <Column field="join_date" header="Join Date"></Column>
            <Column field="role" header="Role"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import ConfirmPopup from "primevue/confirmpopup";
import { RouterLink } from "vue-router";
import { PhTrash, PhPencilLine } from "@phosphor-icons/vue";
import { MOVIE_TYPES } from "@/services/store/types";
export default {
  components: {
    Button,
    RouterLink,
    PhTrash,
    PhPencilLine,
    ConfirmPopup,
    DataTable,
    Column,
  },
  props: { movie: Object },
  computed: {
    actorsData() {
      return this.movie.actors.map((actor) => ({
        id: actor.actor_id,
        name: actor.data.name,
        birth_date: actor.data.birth_date,
        join_date: actor.join_date,
        role: actor.role.name,
      }));
    },
  },
  methods: {
    handleDeleteConfirm(event) {
      this.$confirm.require({
        target: event.currentTarget,
        message: "Are you sure you want to proceed?",
        rejectClass: "p-button-secondary p-button-outlined p-button-sm",
        acceptClass: "p-button-sm ",
        rejectLabel: "Cancel",
        acceptLabel: "Delete",
        accept: () => {
          this.$store.dispatch(MOVIE_TYPES.DELETE_MOVIE_ACTION, this.movie.id);
          this.$toast.add({
            severity: "info",
            summary: "Deleted",
            detail: "Movie has been deleted",
            life: 3000,
          });
          this.$router.push("/movies");
        },
      });
    },
  },
};
</script>
