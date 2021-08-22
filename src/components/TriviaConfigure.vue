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
          <option v-for="n in 11" :key="n">
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
      this.$store.dispatch('fetchQuestions', this.selectedCategory, this.amount, this.selectedDifficulty)
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
  },

  mounted() {
    this.trivia_categories = this.$store.state.categories
    console.log(this.trivia_categories)
  },

  data() {
    return {
      error: "",
      selectedCategory: 9,
      selectedDifficulty: "Easy",
      amount: 10,
      difficulties: ["Easy", "Medium", "Hard"],
      trivia_categories: [],
      // trivia_categories: [
      //   {
      //     id: 9,
      //     name: "General Knowledge",
      //   },
      //   {
      //     id: 10,
      //     name: "Entertainment: Books",
      //   },
      //   {
      //     id: 11,
      //     name: "Entertainment: Film",
      //   },
      //   {
      //     id: 12,
      //     name: "Entertainment: Music",
      //   },
      //   {
      //     id: 13,
      //     name: "Entertainment: Musicals & Theatres",
      //   },
      //   {
      //     id: 14,
      //     name: "Entertainment: Television",
      //   },
      //   {
      //     id: 15,
      //     name: "Entertainment: Video Games",
      //   },
      //   {
      //     id: 16,
      //     name: "Entertainment: Board Games",
      //   },
      //   {
      //     id: 17,
      //     name: "Science & Nature",
      //   },
      //   {
      //     id: 18,
      //     name: "Science: Computers",
      //   },
      //   {
      //     id: 19,
      //     name: "Science: Mathematics",
      //   },
      //   {
      //     id: 20,
      //     name: "Mythology",
      //   },
      //   {
      //     id: 21,
      //     name: "Sports",
      //   },
      //   {
      //     id: 22,
      //     name: "Geography",
      //   },
      //   {
      //     id: 23,
      //     name: "History",
      //   },
      //   {
      //     id: 24,
      //     name: "Politics",
      //   },
      //   {
      //     id: 25,
      //     name: "Art",
      //   },
      //   {
      //     id: 26,
      //     name: "Celebrities",
      //   },
      //   {
      //     id: 27,
      //     name: "Animals",
      //   },
      //   {
      //     id: 28,
      //     name: "Vehicles",
      //   },
      //   {
      //     id: 29,
      //     name: "Entertainment: Comics",
      //   },
      //   {
      //     id: 30,
      //     name: "Science: Gadgets",
      //   },
      //   {
      //     id: 31,
      //     name: "Entertainment: Japanese Anime & Manga",
      //   },
      //   {
      //     id: 32,
      //     name: "Entertainment: Cartoon & Animations",
      //   },
      // ],
    };
  },

};
</script>
<style scoped>

.container {
  background: #C7DBE6;
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
