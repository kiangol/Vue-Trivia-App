import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    questions: [],
    answers: {},
    categories: [],
    points: 0,
    currentQuestion: 0,
    difficulty: 'easy'
}

const mutations = {
    async setCategories(state, categories) {
        state.categories = categories
        console.log(state.categories)
    },
    async setQuestions(state, questions) {
        state.questions = questions
        console.log("QUESTIONS: ", questions)
    },
    SET_ANSWER(state, question, answer) {
        state.answers[question] = answer
    }
}

const actions = {
    setAnswer({ commit }, question, answer) {
        commit('SET_ANSWER', question, answer)
    },
    async fetchQuestions({ commit }, cat, amt) {
        let url = `https://opentdb.com/api.php?amount=10&category=${cat}&difficulty=easy&type=multiple`
        console.log("URL: " + url + " AMT: " + amt)
        fetch(url)
        .then(response => response.json())
        .then(data => commit('setQuestions', data.results))
        // fetch(`https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=multiple`)
    },
    async fetchCategories({
        commit
    }) {
        console.log("FETCH_CATEGORIES")
        fetch('https://opentdb.com/api_category.php')
            .then(response => response.json())
            .then(data => commit('setCategories', data.trivia_categories))
    },
}

const getters = {
    getCategories: state => {
        return state.categories
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})