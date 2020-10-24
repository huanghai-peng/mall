import { request } from 'network/request'

// 1.请求分类页面切换列表数据
export function getCategory() {
    return request({
        url: '/category'
    })
}

// 2.请求分类页面的每个分类栏数据
export function getSubcategory(maitKey) {
    return request({
        url: '/subcategory',
        params: {
            maitKey
        }
    })
}

// 3.请求分类页面的商品数据
export function getCategoryDetail(miniWallkey, type) {
    return request({
        url: '/subcategory/detail',
        params: {
            miniWallkey,
            type
        }
    })
}