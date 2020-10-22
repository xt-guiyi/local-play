import { createStore } from 'vuex'
import cart from './modules/cart/cart.js'
import ball from './modules/ball/ball.js'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { cart, ball }
})
