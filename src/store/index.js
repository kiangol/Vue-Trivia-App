import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    questions: [],
    answers: [],
    points: 0,
    currentQuestion: 0,
    difficulty: 'easy'
}

const mutations = {

}

const actions = {
    fetchQuestions({ commit }) {
        console.log(commit)
    }
}

const getters = {

}


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})