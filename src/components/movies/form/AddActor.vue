<template>
  <div class="flex flex-col gap-3">
    <InputText
      v-model="name"
      placeholder="Add Actor Name"
      class="w-full"
      :invalid="nameError"
    />

    <Calendar
      placeholder="Actor Birth Date"
      dateFormat="yy-mm-dd"
      v-model="date"
      :maxDate="new Date()"
      :invalid="dateError"
      class="w-full"
    />

    <Button @click="handleAddActor" class="w-full mt-4">
      <div class="flex items-center gap-2">
        <PhPlus :size="14" weight="bold" />
        Add New Actor
      </div>
    </Button>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import Button from "primevue/button";
import { PhPlus } from "@phosphor-icons/vue";
import dayjs from "dayjs";
import { MOVIE_TYPES } from "@/services/store/types";
export default {
  components: { InputText, Calendar, Button, PhPlus },
  data() {
    return {
      name: "",
      date: null,
      nameError: false,
      dateError: false,
    };
  },
  methods: {
    handleAddActor() {
      if (!this.name) {
        this.nameError = true;
        return;
      }
      if (!this.date) {
        this.dateError = true;
        return;
      }

      this.$store.dispatch(MOVIE_TYPES.ADD_ACTOR_ACTION, {
        name: this.name,
        date: dayjs(this.date).format("YYYY-MM-DD"),
      });

      this.$emit("close");
    },
  },
};
</script>
