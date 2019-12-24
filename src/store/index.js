import Vue from 'vue'
import Vuex from 'vuex'
import { mutations, actions } from './names'
import shopData from '../utils/shopData'
import { random } from '../utils/helpers'

Vue.use(Vuex)

const savedLocalCart = localStorage.getItem('testVueCart')
export default new Vuex.Store({
  state: {
    products: [],
    selectedProduct: undefined,
    cart: savedLocalCart ? JSON.parse(savedLocalCart) : []
  },
  mutations: {
    [mutations.SET_PRODUCT_LIST]: (state, payload) => {
      state.products = payload
    },
    [mutations.SET_SELECTED_PRODUCT]: (state, payload) => {
      state.selectedProduct = payload
    },
    [mutations.SET_CART]: (state, payload) => {
      if (!payload) return
      const oldCart = [...state.cart]
      oldCart.push(payload)
      state.cart = oldCart
      localStorage.setItem('testVueCart', JSON.stringify(oldCart))
    },
    [mutations.UPDATE_CART]: (state, payload) => {
      if (!payload) return
      const oldCart = [...state.cart]
      state.cart = oldCart.map(product => {
        if (product.id === payload.id) return payload
        return product
      })
      localStorage.setItem('testVueCart', JSON.stringify(state.cart))
    },
    [mutations.DELETE_PRODUCT_FROM_CART]: (state, payload) => {
      const oldCart = [...state.cart]
      state.cart = oldCart.filter(product => product.id !== payload)
      localStorage.setItem('testVueCart', JSON.stringify(state.cart))
    },
    [mutations.CLEAR_CART]: state => {
      state.cart = []
      localStorage.setItem('testVueCart', JSON.stringify(state.cart))
    }
  },
  actions: {
    [actions.getProductList]: ({ commit }) => {
      const randomNumber1 = random(0, 9)
      const data = [...shopData].slice(randomNumber1)
      commit(mutations.SET_PRODUCT_LIST, data)
    },
    [actions.getSelectedProduct]: ({ commit }, productId) => {
      const product = shopData.find(product => product.id === productId)
      commit(mutations.SET_SELECTED_PRODUCT, product)
    },
    [actions.addProductToCart]: ({ commit }, productId) => {
      const product = shopData.find(product => product.id === productId)
      const productForCart = { quantity: 1, sum: product.price * 1, ...product }
      commit(mutations.SET_CART, productForCart)
    }
  }
})
