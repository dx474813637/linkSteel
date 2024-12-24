 // https://api.rawmex.cn/gw/demo/
const http = uni.$u.http 

import {all_api} from '@/config/apis/interface/base.js'
 
// export const ESIGN_CREATE_ESIGN_ACCOUNT = (data = {}) => all_api(uni.$u.deepMerge({API: 'ESIGN', Action: 'CREATE_ESIGN_ACCOUNT', token: 1}, data), 'POST')  
// export const ESIGN_QUERY_ESIGN_ACCOUNT = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'ESIGN', Action: 'QUERY_ESIGN_ACCOUNT', token: 1}}, data))
   
// 商品情报列表
export const WEB_QB_LIST_PPI_INTELLIGENCE = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'WEB_QB', Action: 'LIST_PPI_INTELLIGENCE', token: 1}}, data))
// 商品资讯列表
export const WEB_QB_LIST_PPI_NEWS = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'WEB_QB', Action: 'LIST_PPI_NEWS', token: 1}}, data))
// 商品资讯详情
export const WEB_QB_DETAIL_PPI_NEWS = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'WEB_QB', Action: 'DETAIL_PPI_NEWS', token: 1}}, data))

// （卖盘 列表 mancust_login 为 manlink 现货类型：2-即期）
// 合约市场 卖盘 列表
export const WEB_SELL_LIST1 = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'WEB_SELL', Action: 'LIST', token: 1, trdtype: 1, mancust_login: 'manlink'}}, data))
// 现货市场 卖盘 列表
export const WEB_SELL_LIST2 = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'WEB_SELL', Action: 'LIST', token: 1, trdtype: 2, mancust_login: 'manlink'}}, data))
// 卖盘 明细
export const WEB_SELL_DETAIL = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'WEB_SELL', Action: 'DETAIL', token: 1}}, data))
// 卖盘 竞拍记录
export const WEB_SELL_LIST_SELL_BID_ITEM = (data = {}) => all_api(uni.$u.deepMerge({params: {API: 'WEB_SELL', Action: 'LIST_SELL_BID_ITEM', token: 1}}, data))
 