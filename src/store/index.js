import Vue from 'vue'
import Vuex from 'vuex'

//  1: 安装插件
Vue.use(Vuex)

//  2: 创建store对象
const store = new Vuex.Store({
  state: {
  //  购物车商品对象
    cartList: []
  },
  //  mutations的作用就是修改state的状态
  //  注意: 尽量一个方法只做一个状态的改变, 比如一个方法对应数量加一, 一个方法对应添加到购物车
  mutations: {
    //  把商品数量加一
    addCount(state, payload) {
      payload.count ++
    },
    //  把商品添加到购物车
    addToCart(state, payload) {
      state.cartList.push(payload)
    }
  },
  //  通过actions做一些逻辑的判断和异步修改状态的操作
  actions: {
    addToCart({state, commit}, payload) {
      const oldPayload = state.cartList.find(item => item.id === payload.id)
      if (oldPayload) {
        commit('addCount', oldPayload)
      } else {
        payload.count = 1
        commit('addToCart', payload)
      }
    }
  }
})

//  3: 挂载到实例上
export default store
