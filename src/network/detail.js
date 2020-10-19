// import { construct } from 'core-js/fn/reflect';
import { request } from './request'

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

export class GoodsInfo {
    constructor(columns, itemInfo, services) {
        this.columns = columns,
            this.title = itemInfo.title,
            this.desc = itemInfo.desc,
            this.price = itemInfo.price,
            this.oldPrice = itemInfo.oldPrice,
            this.discountDesc = itemInfo.discountDesc,
            this.discountBgColor = itemInfo.discountBgColor,
            this.services = services,
            this.realPrice = itemInfo.lowNowPrice
    }
}

export class Shop {
    constructor(shopInfo) {
        this.cFans = shopInfo.cfans;
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}

export class GoodsParam {
    constructor(info, rule) {
        if (rule) {
            // 注: images可能没有值(某些商品有值, 某些没有值)
            this.image = info.images ? info.images[0] : '';
            this.infos = info.set;
            this.sizes = rule.tables;
        }
    }
}

export function recommend() {
    return request({
        url: '/recommend'
    })
}