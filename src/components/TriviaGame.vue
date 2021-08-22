<template>
  <main>
    <section class="container">
      <form class="m-3">
        <h1>{{ questions[currentQuestion].category }}</h1>
        <h4 v-html="questions[currentQuestion].question"></h4>
        <ul class="options-list" style="width: 100%">
          <button
            @click="nextQuestion(option)"
            class="btn btn-light btn-lg"
            v-for="option of questions[currentQuestion].incorrect_answers"
            :key="option"
            :value="option"
            v-html="option"
          >
            <!-- {{ option }} -->
          </button>
          <button
            @click="nextQuestion(questions[currentQuestion].correct_answer)"
            class="btn btn-light btn-lg"
          >
            {{ questions[currentQuestion].correct_answer }}
          </button>
        </ul>
      </form>
      <section class="alert alert-danger" v-if="error">
        <h4>Hang on!</h4>
        <p class="mb-0">{{ error }}</p>
      </section>
      <section class="alert alert-success" v-if="message">
        <h4>Congratulations!</h4>
        <p class="mb-0">{{ message }}</p>
      <button class="btn btn-success" v-if="message" @click="restart()">New Game</button>
      <button class="btn btn-secondary" v-if="message" @click="results()">See Results</button>
      </section>
    </section>
  </main>
</template>

<script>
export default {
  name: "TriviaConfigure",
  methods: {
    restart() {
      this.$router.push("/");
    },
    results() {
      this.$router.push("/results")
    },
    nextQuestion(value) {
      if (value === this.questions[this.currentQuestion].correct_answer) {
        this.points += 10;
      }
      if (this.currentQuestion === this.questions.length - 1) {
        this.message = `You got ${this.points}/${this.questions.length * 10} points!`
        // alert("You got " + this.points + " points!");
        return;
      }
      this.currentQuestion++;
    },
  },
  mounted() {
    
    this.questions = this.$store.state.questions
  },
  data() {
    return {
      message: "",
      error: "",
      points: 0,
      currentOptions: [],
      currentQuestion: 0,
      questions: [],
    };
  },
};
</script>
<style scoped>
.btn-group-vertical {
  display: grid;
  list-style-type: none;
  padding-left: 20%;
  padding-right: 20%;
  margin-bottom: 1.5rem;
  grid-gap: 1px;
}

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
