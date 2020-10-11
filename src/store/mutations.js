import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutation-types'

export default {
  //  把商品数量加一
  [ADD_COUNT](state, payload) {
    payload.count ++
  },
  //  把商品添加到购物车
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  }
}
