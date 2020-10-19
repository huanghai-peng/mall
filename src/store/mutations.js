import { ADD_COUNT, ADD_TO_CART } from './mutations_types'

export default {
    [ADD_COUNT](state, oldProduct) {
        oldProduct.count++;
    },
    [ADD_TO_CART](state, payload) {
        payload.count = 1;
        payload.checked = true;
        state.cartLists.push(payload);
    }
}