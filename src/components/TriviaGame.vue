<template>
  <main>
    <section class="container">
      <form class="m-3">
        <h1>Question 1</h1>
        <h4>{{ questions[currentQuestion].question }}</h4>
        <ul class="options-list">
          <button
            @click="increment()"
            class="btn btn-outline-secondary btn-lg"
            v-for="option of questions[currentQuestion].incorrect_answers"
            :key="option"
            :value="option"
          >
            {{ option }}
          </button>
        </ul>

        <button type="submit" class="btn btn-outline-success btn-lg">
          Next
        </button>
      </form>
      <section class="alert alert-danger" v-if="error">
        <h4>Hang on!</h4>
        <p class="mb-0">{{ error }}</p>
      </section>
    </section>
  </main>
</template>

<script>
export default {
  name: "TriviaConfigure",
  methods: {
    increment() {
      this.currentQuestion++;
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
      console.log(
        `${this.selectedCategory} : ${this.selectedDifficulty} : ${this.amount}`
      );
      this.$router.push("/start");
    },
  },

  data() {
    return {
      error: "",
      currentQuestion: 0,
      selectedCategory: 9,
      selectedDifficulty: "Easy",
      amount: 10,
      difficulties: ["Easy", "Medium", "Hard"],
      questions: [
        {
          category: "Politics",
          type: "multiple",
          difficulty: "easy",
          question: "The largest consumer market in 2015 was...",
          correct_answer: "The United States of America",
          incorrect_answers: ["Germany", "Japan", "United Kingdom"],
        },
        {
          category: "Politics",
          type: "multiple",
          difficulty: "easy",
          question: "How many people are in the U.S. House of Representatives?",
          correct_answer: "435",
          incorrect_answers: ["260", "415", "50"],
        },
        {
          category: "Politics",
          type: "multiple",
          difficulty: "easy",
          question: "Who was the 45th President of the United States?",
          correct_answer: "Donald Trump",
          incorrect_answers: ["Barack Obama", "Bill Clinton", "George Bush"],
        },
      ],
      trivia_categories: [
        {
          id: 9,
          name: "General Knowledge",
        },
        {
          id: 10,
          name: "Entertainment: Books",
        },
        {
          id: 11,
          name: "Entertainment: Film",
        },
        {
          id: 12,
          name: "Entertainment: Music",
        },
        {
          id: 13,
          name: "Entertainment: Musicals & Theatres",
        },
        {
          id: 14,
          name: "Entertainment: Television",
        },
        {
          id: 15,
          name: "Entertainment: Video Games",
        },
        {
          id: 16,
          name: "Entertainment: Board Games",
        },
        {
          id: 17,
          name: "Science & Nature",
        },
        {
          id: 18,
          name: "Science: Computers",
        },
        {
          id: 19,
          name: "Science: Mathematics",
        },
        {
          id: 20,
          name: "Mythology",
        },
        {
          id: 21,
          name: "Sports",
        },
        {
          id: 22,
          name: "Geography",
        },
        {
          id: 23,
          name: "History",
        },
        {
          id: 24,
          name: "Politics",
        },
        {
          id: 25,
          name: "Art",
        },
        {
          id: 26,
          name: "Celebrities",
        },
        {
          id: 27,
          name: "Animals",
        },
        {
          id: 28,
          name: "Vehicles",
        },
        {
          id: 29,
          name: "Entertainment: Comics",
        },
        {
          id: 30,
          name: "Science: Gadgets",
        },
        {
          id: 31,
          name: "Entertainment: Japanese Anime & Manga",
        },
        {
          id: 32,
          name: "Entertainment: Cartoon & Animations",
        },
      ],
    };
  },
};
</script>
<style scoped>
.options-list {
  list-style-type: none;
  padding-left: 20%;
  padding-right: 20%;
  margin-bottom: 1rem;
  display: grid;
  grid-gap: 1px;
}
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
