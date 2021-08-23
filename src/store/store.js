import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        payload: '',
        fetchingCategories: false,
        categories: [],
        questions: [],
        currentQuestion: 0,
        answers: {},
    },
    mutations: {
        setCategories: (state, payload) => {
            state.categories = payload
            console.log(payload)
        },
        setQuestions: (state, payload) => {
            console.log('setQuestions()')
            state.questions = payload
            console.log(state.questions)
        },
        setAnswers: (state, payload) => {
            console.log('setAnswers()')
            state.answers = payload
            console.log(state.questions)
        }
    },
    actions: {
        async fetchCategories({commit}) {
            await fetch('https://opentdb.com/api_category.php')
            .then(response => response.json())
            .then(data => commit('setCategories', data.trivia_categories))
        },
        async fetchQuestions({commit}, payload) {
            this.state.payload = payload
            let url = `https://opentdb.com/api.php?amount=${payload.amt}&category=${payload.category}&difficulty=${payload.diff}`
            console.log(url)
            await fetch(url)
            .then(response => response.json())
            .then(data => commit('setQuestions', data.results))
        },
        recvAnswers({commit}, payload) {
            commit('setAnswers', payload)
        }
    },
    getters: {
        getQuestion: state => {
            return state.questions[state.currentQuestion].question
        }
    },
})