import { ADD_COUNT, ADD_TO_CART } from './mutations_types'

export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            let oldProduct = null;
            // 1.判断商品在cartLists是否已经存在
            for (let item of context.state.cartLists) {
                if (item.iid === payload.iid && item.style === payload.style && item.size === payload.size) {
                    oldProduct = item
                }
            }
            // 2.如果存在就加1，否则进添加进cartLists中
            if (oldProduct) {
                context.commit(ADD_COUNT, { payload, oldProduct });
                resolve('当前商品数量加' + payload.count);
            } else {
                context.commit(ADD_TO_CART, payload);
                // payload.count = 1;
                // state.cartLists.push(payload);
                resolve('加入购物车成功');
            }
        })
    }
}