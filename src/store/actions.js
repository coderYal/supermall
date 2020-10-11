import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutation-types'

export default {
  addToCart({state, commit}, payload) {
  const oldPayload = state.cartList.find(item => item.id === payload.id)
  if (oldPayload) {
    commit(ADD_COUNT, oldPayload)
  } else {
    payload.count = 1
    commit(ADD_TO_CART, payload)
  }
}
}
