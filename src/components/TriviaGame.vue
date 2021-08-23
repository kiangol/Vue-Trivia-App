<template>
  <main>
    <section class="container p-5">
      <section v-if="showQuestions">
        <h4 class="pb-5">
          Question {{ currentNum + 1 }} of {{ questions.length }}
        </h4>
        <h2 class="pb-5" v-html="questions[currentNum].question" />
        <ul class="options-list" style="width: 100%">
          <button
            @click="nextQuestion(option)"
            class="btn btn-light btn-lg"
            v-for="option of alternatives"
            :key="option"
            v-html="option"
          ></button>
        </ul>
      </section>
      <section class="alert alert-success" v-if="message">
        <h4>Congratulations!</h4>
        <p class="mb-0">{{ message }}</p>
        <button class="btn btn-success" v-if="message" @click="restart()">
          New Game
        </button>
        <button class="btn btn-secondary" v-if="message" @click="results()">
          See Results
        </button>
      </section>
      <section class="container" v-if="showAnswers">
        <section v-for="question in questions" :key="question.question">
          <h5 v-html="question.question"></h5>
          <button class="btn btn-success btn-sm">
            {{ question.correct_answer }}
          </button>
        </section>
      </section>
    </section>
  </main>
</template>

<script>
export default {
  name: "TriviaGame",
  data() {
    return {
      points: 0,
      currentNum: 0,
      answers: {},
      message: "",
      showAnswers: false,
      showQuestions: true,
    };
  },
  computed: {
    alternatives() {
      let alts = [];
      alts.push(...this.questions[this.currentNum].incorrect_answers);
      alts.push(this.questions[this.currentNum].correct_answer);
      return alts.sort(() => 0.5 - Math.random());
    },
    questions() {
      return this.$store.state.questions;
    },
  },
  methods: {
    results() {
      this.showAnswers = !this.showAnswers;
    },
    restart() {
      this.$router.push("/");
    },
    nextQuestion(val) {
      if (this.currentNum === this.questions.length - 1) {
        this.showQuestions = false;
        this.message = "You got " + this.points + " points!";
        console.log("ANSWERS: " + this.answers);
        return;
      }
      if (val === this.questions[this.currentNum].correct_answer)
        this.points += 10;

      this.answers[this.questions[this.currentNum]] = val;
      console.log("ANSWER: " + val);
      this.currentNum++;
    },
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
