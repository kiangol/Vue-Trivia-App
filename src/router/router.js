import Vue from 'vue'
import VueRouter from 'vue-router'
import TriviaConfigure from '@/components/TriviaConfigure'
import TriviaGame from '@/components/TriviaGame'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: TriviaConfigure,
    },
    {
        path: '/start',
        component: TriviaGame,
    }
]


export default new VueRouter({ routes })