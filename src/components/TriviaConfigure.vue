<template>
  <main class="container">
    <button @click="loadCats()">Load Categories</button>
    <form @submit.prevent="onOptionsSubmit" class="m-3">
      <h1>Trivia</h1>
      <fieldset class="mb-3">
        <label for="category" class="h4">Category:</label>
        <select class="form-control" v-model="selectedCategory">
          <option
            v-for="category of trivia_categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </fieldset>

      <fieldset class="mb-3">
        <label for="difficulty" class="h4">Difficulty:</label>
        <select class="form-control" v-model="selectedDifficulty">
          <option v-for="difficulty of difficulties" :key="difficulty">
            {{ difficulty }}
          </option>
        </select>
      </fieldset>

      <fieldset class="mb-3">
        <label for="amount" class="h4">Number of questions:</label>
        <select class="form-control" v-model="amount">
          <option v-for="n in 11" :key="n" :value="n + 9">
            {{ n + 9 }}
          </option>
        </select>
      </fieldset>

      <button type="submit" class="btn btn-primary btn-lg">Start Game</button>
    </form>
    <section class="alert alert-danger" v-if="error">
      <h4>Hang on!</h4>
      <p class="mb-0">{{ error }}</p>
    </section>
  </main>
</template>

<script>
export default {
  name: "TriviaConfigure",
  methods: {
    loadCats() {
      this.$store.dispatch(('fetchCategories'))
      this.trivia_categories = this.$store.state.categories
    },
    onOptionsSubmit() {
      if (!this.selectedCategory) {
        this.error = "You forgot to select a category";
        return;
      }

      if (!this.selectedDifficulty) {
        this.error = "You forgot to select a difficulty";
        return;
      }
      this.$store.dispatch('fetchQuestions', this.selectedCategory, this.amount, this.selectedDifficulty)
      this.$router.push("/start");
    },

    computed: {
      trivia_categories() {
        return this.$store.state.categories
      }
    }
  },

  created() {
    this.$store.dispatch('fetchCategories')
  },

  data() {
    return {
      error: "",
      selectedCategory: '',
      selectedDifficulty: "Easy",
      amount: 10,
      difficulties: ["Easy", "Medium", "Hard"],
      trivia_categories: []
    };
  },

};
</script>
<style scoped>
.container {
  background: #c7dbe6;
  max-width: 95%;
  --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  border-radius: 0.25rem;
  overflow: hidden;
}

@media screen and (min-width: 45rem) {
  .container {
    max-width: 45rem;
  }
}
</style>
