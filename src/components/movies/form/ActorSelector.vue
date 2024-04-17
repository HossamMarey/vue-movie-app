<template>
  <div>
    <div>Movie Actors</div>
    <div class="mt-4" v-if="selectedActors?.length">
      <div
        v-for="actor in selectedActors"
        :key="actor.actor_id"
        class="border border-primary-700 p-2 border-dashed rounded flex items-center justify-between"
      >
        <div>
          Actor: {{ actor.name }} - Role: {{ actor.role }} - Join Date:
          {{ actor.join_date }}
        </div>

        <Button
          size="small"
          outlined
          class="me-2"
          severity="danger"
          @click="handleRemoveActor(actor)"
        >
          <PhTrash :size="12" weight="bold" />
        </Button>
      </div>
    </div>
    <div
      class="items-end mt-4 bg-surface-700 px-2 py-3 rounded grid grid-cols-1 lg:grid-cols-2 gap-3"
    >
      <div class=" ">
        <div class="flex items-center justify-between text-sm mb-2">
          <strong> Actor </strong>

          <Button
            size="small"
            outlined
            class="me-2"
            @click="addActorVisible = true"
          >
            <PhPlus :size="12" weight="bold" />
          </Button>
        </div>

        <Dropdown
          v-model="currentActor"
          :options="currentActorsFiltered"
          optionLabel="name"
          optionValue="id"
          placeholder="Select Actor"
          class="[&>*]:text-lg w-full"
          :invalid="currentActorError"
        />
      </div>

      <div class=" ">
        <div class="flex items-center justify-between text-sm mb-2">
          <strong> Rule </strong>

          <Button
            size="small"
            outlined
            class="me-2"
            @click="addRuleVisible = true"
          >
            <PhPlus :size="12" weight="bold" />
          </Button>
        </div>

        <Dropdown
          v-model="currentRule"
          :options="currentActorsRules"
          optionLabel="name"
          optionValue="id"
          placeholder="Select Actor Rule"
          class="[&>*]:text-lg w-full"
          :invalid="currentRuleError"
        />
      </div>
      <div class=" ">
        <div class="flex items-center justify-between text-sm mb-2">
          <strong> Join Date </strong>
        </div>
        <Calendar
          placeholder="Join Date"
          dateFormat="yy-mm-dd"
          v-model="currentDate"
          :maxDate="new Date()"
          :invalid="currentDateError"
          class="[&>input]:!text-lg [&>input]:py-2 w-full"
        />
      </div>

      <Button
        size="large"
        outlined
        class="flex-shrink-0"
        @click="handleAddActor"
      >
        <div class="flex items-center gap-2 text-lg">
          <PhPlus :size="18" weight="bold" />
          Add Actor
        </div>
      </Button>
    </div>

    <Dialog
      v-model:visible="addActorVisible"
      modal
      header="Add New Actor "
      :style="{ width: '25rem' }"
    >
      <AddActor @close="addActorVisible = false" />
    </Dialog>

    <Dialog
      v-model:visible="addRuleVisible"
      modal
      header="Add New Actor Rule "
      :style="{ width: '25rem' }"
    >
      <AddActorRule @close="addRuleVisible = false" />
    </Dialog>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import AddActor from "./AddActor.vue";
import AddActorRule from "./AddActorRule.vue";
import { PhPlus, PhTrash } from "@phosphor-icons/vue";
import dayjs from "dayjs";
export default {
  // actor_id: 7,
  // actor_role_id: 1,
  // join_date: "2001-11-07",
  components: {
    Dropdown,
    Calendar,
    Button,
    PhPlus,
    PhTrash,
    Dialog,
    AddActor,
    AddActorRule,
  },
  props: {
    defaultActors: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentActor: null,
      currentRule: null,
      currentDate: null,
      currentActorError: false,
      currentRuleError: false,
      currentDateError: false,
      actors: [],
      addActorVisible: false,
      addRuleVisible: false,
    };
  },
  created() {
    this.actors = this.defaultActors;
  },
  computed: {
    currentActors() {
      return this.$store.state.MoviesModule.actors || [];
    },
    currentActorsFiltered() {
      return this.currentActors.filter(
        (a) => this.actors.findIndex((actor) => actor.actor_id === a.id) === -1
      );
    },
    currentActorsRules() {
      return this.$store.state.MoviesModule.actor_rules || [];
    },
    selectedActors() {
      return this.actors.map((actor) => {
        const actorData = this.currentActors.find(
          (a) => a.id === actor.actor_id
        );
        const actorRole = this.currentActorsRules.find(
          (a) => a.id === actor.actor_role_id
        );

        return { ...actor, name: actorData.name, role: actorRole.name };
      });
    },
  },
  methods: {
    handleAddActor() {
      let isValid = true;

      this.currentActorError = false;
      this.currentRuleError = false;
      this.currentDateError = false;

      if (!this.currentActor) {
        this.currentActorError = true;
        isValid = false;
      }

      if (!this.currentRule) {
        this.currentRuleError = true;
        isValid = false;
      }

      if (!this.currentDate) {
        this.currentDateError = true;
        isValid = false;
      }

      if (!isValid) return;

      this.actors.push({
        actor_id: this.currentActor,
        actor_role_id: this.currentRule,
        join_date: dayjs(this.currentDate).format("YYYY-MM-DD"),
      });

      this.currentActor = null;
      this.currentRule = null;
      this.currentDate = null;

      this.handleSubmit();
    },
    handleRemoveActor(actor) {
      this.actors = this.actors.filter((a) => a.actor_id !== actor.actor_id);
      this.handleSubmit();
    },
    handleSubmit() {
      this.$emit("submit", this.actors);
    },
  },
};
</script>
