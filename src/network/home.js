//  首页相关的网络请求都放在该文件里
import { request } from "./request"

//  1: 首页轮播图及推荐商品数据
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

//  2: 商品数据
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
