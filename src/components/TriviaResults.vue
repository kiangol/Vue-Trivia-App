<template>
  <main>
    <section class="container">
      <form class="m-3">
        <h1>Results</h1>
        <h4>{{ questions[currentQuestion].question }}</h4>
        <li class="options-list">
          <button
            @click="nextQuestion(option)"
            class="btn btn-outline-secondary btn-lg"
            v-for="option of questions[currentQuestion].incorrect_answers"
            :key="option"
            :value="option"
          >
            {{ option }}
          </button>
          <button
            @click="nextQuestion(questions[currentQuestion].correct_answer)"
            class="btn btn-outline-secondary btn-lg"
          >
            {{ questions[currentQuestion].correct_answer }}
          </button>
        </li>
        

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
    nextQuestion(value) {
      if (value === this.questions[this.currentQuestion].correct_answer) {
        this.points += 10;
      }
      if (this.currentQuestion === this.questions.length - 1) {
        alert("You got " + this.points + " points!");
        this.$router.push("/");
        return;
      }
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
      points: 0,
      currentQuestion: 0,
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
    };
  },
};
</script>
<style scoped>
.options-list {
  list-style-type: none;
  padding-left: 20%;
  padding-right: 20%;
  margin-bottom: 1.5rem;
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
