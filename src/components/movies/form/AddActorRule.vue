<template>
  <div class="flex flex-col gap-3">
    <InputText
      v-model="name"
      placeholder="Add Rule Name"
      class="w-full"
      :invalid="nameError"
    />

    <Button @click="handleAddActor" class="w-full mt-4">
      <div class="flex items-center gap-2">
        <PhPlus :size="14" weight="bold" />
        Add New Actor Rule
      </div>
    </Button>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { PhPlus } from "@phosphor-icons/vue";
import { MOVIE_TYPES } from "@/services/store/types";
export default {
  components: { InputText, Button, PhPlus },
  data() {
    return {
      name: "",
      nameError: false,
    };
  },
  methods: {
    handleAddActor() {
      if (!this.name) {
        this.nameError = true;
        return;
      }

      this.$store.dispatch(MOVIE_TYPES.ADD_ACTOR_RULE_ACTION, {
        name: this.name,
      });

      this.$emit("close");
    },
  },
};
</script>
