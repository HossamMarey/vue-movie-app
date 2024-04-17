<template>
  <div
    class="bg-surface-800 mb-20 p-6 border border-primary-900 rounded-lg shadow-xl shadow-surface-400/10 max-w-2xl mx-auto"
  >
    <Form
      class="flex flex-col gap-3"
      ref="form"
      :validation-schema="schema"
      v-slot="{ errors }"
    >
      <Field name="title" v-model="title" v-slot="{ field }">
        <div class="mb-1">Movie title *</div>
        <InputText
          size="large"
          name="title"
          v-bind="field"
          placeholder="Movie title"
          class="w-full"
          :invalid="!!errors?.title"
        />
        <small v-if="errors?.title" class="text-red-500 -mt-2">{{
          errors?.title
        }}</small>
      </Field>
      <Field name="description" v-model="description" v-slot="{ field }">
        <div class="mb-1">Movie description</div>
        <Textarea
          size="large"
          name="description"
          v-bind="field"
          placeholder="Movie description"
          class="w-full !text-lg"
          :invalid="!!errors?.description"
        />
        <small v-if="errors?.description" class="text-red-500 -mt-2">{{
          errors?.description
        }}</small>
      </Field>

      <div class="flex flex-col gap-3 md:flex-row">
        <div class="flex-1">
          <Field name="poster" v-model="poster" v-slot="{ field }">
            <div class="mb-1">Movie Poster</div>
            <InputText
              size="large"
              name="poster"
              v-bind="field"
              placeholder="Movie poster url"
              class="w-full"
              :invalid="!!errors?.poster"
            />
            <small v-if="errors?.poster" class="text-red-500 block">{{
              errors?.poster
            }}</small>
          </Field>
        </div>
        <div class="flex-grow-0">
          <Field name="yearDate" v-model="yearDate" v-slot="{ field, errors }">
            <div class="mb-1">Movie Year *</div>
            <div>
              <Calendar
                size="large"
                name="yearDate"
                v-bind="field"
                placeholder="Movie year"
                view="year"
                dateFormat="yy"
                v-model="yearDate"
                :maxDate="new Date()"
                :invalid="!!errors.length"
                class="[&>input]:!text-lg [&>input]:py-2.5"
              />
              <!-- :class="errors?.yearDate ? '[&>input]:!border-red-400 [&>input]:border' : ''" -->
            </div>
            <small
              v-if="errors && errors.length"
              class="text-red-500 max-w-[150px] block"
              >{{ errors[0] }}</small
            >
          </Field>
        </div>
      </div>

      <ActorSelector :defaultActors="selectedActors" @submit="handleAddActor" />

      <div class="mt-5">
        <Button
          :label="type + ' movie'"
          size="large"
          class="w-full capitalize !text-lg"
          @click.prevent="handleSubmit"
        />
      </div>
    </Form>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Calendar from "primevue/calendar";
import Button from "primevue/button";
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import ActorSelector from "./ActorSelector.vue";

export default {
  components: {
    InputText,
    Textarea,
    Calendar,
    Button,
    Form,
    Field,
    ActorSelector,
  },
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) => ["add", "edit"].includes(value),
      default: "add",
    },
    movie: Object,
  },
  data() {
    const schema = Yup.object().shape({
      title: Yup.string().required("Title is required"),
      description: Yup.string(),
      poster: Yup.string().url("Invalid url"),
      yearDate: Yup.date().required("Year is required"),
    });

    return {
      schema,
      title: "",
      description: "",
      poster: "",
      yearDate: null,
      selectedActors: [],
    };
  },
  created() {
    if (this.movie) {
      this.title = this.movie.title;
      this.description = this.movie.description;
      this.poster = this.movie.poster;
      this.yearDate = new Date(this.movie.year);

      if (this.movie.actors) {
        this.selectedActors = this.movie.actors.map((m) => ({
          actor_id: m.actor_id,
          actor_role_id: m.actor_role_id,
          join_date: m.join_date,
        }));
      }
    }
  },
  computed: {
    actors() {
      return this.$store.state.MoviesModule.actors || [];
    },
  },
  methods: {
    handleAddActor(data) {
      this.selectedActors = data;
    },
    validate: async function () {
      const result = await this.$refs.form.validate();
      return result.valid;
    },
    async handleSubmit() {
      const isValid = await this.validate();
      if (!isValid) return;
      const data = {
        title: this.title,
        description: this.description,
        poster: this.poster,
        year: this.yearDate.getFullYear(),
        actors: this.selectedActors,
      };
      this.$emit("submit", { data, id: this.movie?.id });
    },
  },
};
</script>
