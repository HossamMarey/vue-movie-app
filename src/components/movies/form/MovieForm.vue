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
      <span> {{ errors }} </span>
      <Field name="title" as="input">
        <!-- <div class="mb-1">Movie title *</div>
        <InputText
          size="large"
          name="title"
          v-bind="title"
          v-model="title"
          placeholder="Movie title"
          class="w-full"
        />
        <span>{{ errors[0] }}</span> -->
      </Field>
      <label>
        <div class="mb-1">Movie description</div>
        <Textarea
          size="large"
          name="description"
          v-model="description"
          placeholder="Movie description"
          class="w-full !text-lg"
        />
      </label>

      <div class="flex flex-col gap-3 md:flex-row">
        <label class="flex-1">
          <div class="mb-1">Movie Poster</div>
          <InputText
            size="large"
            name="poster"
            v-model="poster"
            placeholder="Movie poster url"
            class="w-full"
          />
        </label>
        <label>
          <div class="mb-1">Movie Year *</div>
          <Calendar
            size="large"
            name="yearDate"
            v-model="yearDate"
            placeholder="Movie year"
            view="year"
            dateFormat="yy"
            :maxDate="new Date()"
            class="[&>input]:!text-lg [&>input]:py-2.5"
          />
        </label>
      </div>

      <div class="flex items-end gap-4">
        <div class="flex-1">
          <div class="mb-1">Movie Actors</div>
          <MultiSelect
            v-model="selectedActors"
            :options="actors"
            optionLabel="name"
            optionValue="id"
            display="chip"
            placeholder="Select Movie Actors"
            class="w-full !text-lg py-2"
          />
        </div>
        <Button size="large" outlined>
          <div class="flex items-center gap-2 text-lg">
            <PhPlus :size="18" weight="bold" />
            <span class="mb-0.5"> New Actor </span>
          </div>
        </Button>
      </div>

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
import MultiSelect from "primevue/multiselect";
import { PhPlus } from "@phosphor-icons/vue";
import { Form, Field } from "vee-validate";
import * as Yup from "yup";

export default {
  components: {
    InputText,
    Textarea,
    Calendar,
    Button,
    MultiSelect,
    PhPlus,
    Form,
    Field,
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
        this.selectedActors = this.movie.actors.map((actor) => actor.actor_id);
      }
    }
  },
  computed: {
    actors() {
      return this.$store.state.MoviesModule.actors || [];
    },
  },
  methods: {
    validate: async function () {
      const result = await this.$refs.form.validate();
      if (result.isValid) {
        // do something here
      }
    },
    handleSubmit() {
      const data = {
        title: this.title,
        description: this.description,
        poster: this.poster,
        year: this.yearDate.getFullYear(),
        actors: this.selectedActors,
      };
      console.log("datadata", data);
    },
  },
};
</script>
