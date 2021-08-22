import Vue from 'vue'
import VueRouter from 'vue-router'
import TriviaConfigure from '@/components/TriviaConfigure'
import TriviaGame from '@/components/TriviaGame'
import TriviaResults from '@/components/TriviaResults'
import TriviaStart from '@/components/TriviaStart'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: TriviaStart,
    },
    {
        path: '/config',
        component: TriviaConfigure,
    },
    {
        path: '/start',
        component: TriviaGame,
    },
    {
        path: '/results',
        component: TriviaResults,
    }
]


export default new VueRouter({ routes })