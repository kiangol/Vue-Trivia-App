<template>
  <main>
    <section class="container p-5">
      <section v-if="showQuestions">
        <h5>
          Question {{ currentNum + 1 }} of {{ questions.length }}
        </h5>
        <h4 class="pb-2" v-html="questions[currentNum].question" />
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
        <h4>{{rating}}</h4>
        <p class="mb-0">{{ message }}</p>
        <button class="btn btn-success" v-if="message" @click="restart()">
          New Game
        </button>
        <button class="btn btn-secondary" v-if="message" @click="results()">
          See Results
        </button>
        <button class="btn btn-primary" v-if="message" @click="replay()">
          Replay
        </button>
      </section>

      <section v-if="showAnswers">
        <ul v-for="item of resultingAnswers" :key="item.answer">
          <h5 v-html="item.question.question"></h5>
          <!-- <p>Correct answer: {{item.question.correct_answer}}</p> -->
          <button class="btn btn-success disabled btn-sm" v-html="item.question.correct_answer">
          </button>
          <p>Your answer: </p> <button class="btn btn-secondary disabled btn-sm" v-html="item.answer">
          </button>
        </ul>
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
      answers: [],
      message: "",
      rating: "",
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
    resultingAnswers() {
      return this.answers.map((element, i) => {
        return {answer: element, question: this.questions[i]}
      })
    }
  },
  methods: {
    results() {
      this.showAnswers = !this.showAnswers;
    },
    restart() {
      this.$router.push("/");
    },
    replay() {
      this.$store.dispatch("fetchQuestions", this.$store.state.payload);
      this.points = 0
      this.currentNum = 0
      this.answers = []
      this.message = ""
      this.showAnswers = false
      this.showQuestions = true
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

      this.answers.push(val)
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
  /* background: #c7dbe6; */
  background: repeat url(//s.ytimg.com/yt/imgbin/www-refreshbg-vflC3wnbM.png)
    0 0;
  /* background-color: #ebebeb; */
  /* background-repeat: repeat; */
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
