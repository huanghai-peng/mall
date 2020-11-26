import { ADD_COUNT, ADD_TO_CART } from './mutations_types'

export default {
    [ADD_COUNT](state, payload) {
        payload.oldProduct.count += payload.payload.count;
    },
    [ADD_TO_CART](state, payload) {
        // payload.count = payload.count;
        payload.checked = true;
        state.cartLists.push(payload);
    },
    sub(state, payload) {
        if (state.cartLists[payload.index].count > 1)
            state.cartLists[payload.index].count--
    },
    add(state, payload) {
        state.cartLists[payload.index].count++
    }
}