import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutation-types'

export default {
  addToCart({state, commit}, payload) {
    return new Promise((resolve, reject) => {
      const oldPayload = state.cartList.find(item => item.id === payload.id)
      if (oldPayload) {
        commit(ADD_COUNT, oldPayload)
      } else {
        payload.count = 1
        payload.check = true
        commit(ADD_TO_CART, payload)
        resolve({msg: '加入购物车成功', code: 200})
      }
    })

  }
}
