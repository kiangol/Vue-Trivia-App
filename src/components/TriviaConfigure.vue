<template>
  <main class="container">
    <form @submit="onConfigSubmit" class="mb-3">
      <h2 class="p-5">Setup</h2>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label for="categorySelect" class="input-group-text">Category:</label>
        </div>
        <select
          id="categorySelect"
          class="custom-select"
          v-model="selectedCategory"
        >
          <option
            v-for="category of categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label for="difficultySelect" class="input-group-text"
            >Difficulty:</label
          >
        </div>
        <select
          id="difficultySelect"
          class="custom-select"
          v-model="selectedDifficulty"
        >
          <option
            v-for="difficulty of ['Easy', 'Medium', 'Hard']"
            :key="difficulty"
            :value="difficulty.toLowerCase()"
          >
            {{ difficulty }}
          </option>
        </select>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label for="amountSelect" class="input-group-text">Questions:</label>
        </div>
        <select
          id="amountSelect"
          class="custom-select"
          v-model="selectedAmount"
        >
          <option v-for="n in 16" :key="n" :value="n + 4">
            {{ n + 4 }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary btn-lg">Start Game</button>
    </form>
  </main>
</template>

<script>
export default {
  name: "TriviaConfigure",
  data() {
    return {
      selectedCategory: 9,
      selectedDifficulty: "easy",
      selectedAmount: 10,
    };
  },
  created() {
    this.$store.dispatch("fetchCategories");
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
  methods: {
    onConfigSubmit() {
      console.log(
        "CAT:" +
          this.selectedCategory +
          " DIFF:" +
          this.selectedDifficulty +
          " AMT:" +
          this.selectedAmount
      );
      let payload = {
        category: this.selectedCategory,
        amt: this.selectedAmount,
        diff: this.selectedDifficulty,
      };
      this.$store.dispatch("fetchQuestions", payload);
      this.$router.push("/game");
    },
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
