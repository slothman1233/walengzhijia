import { adTypeEnums } from '../enums/enums'
import { bodyModel } from './resModel'

/**
 * 广告响应模型的bodyModel 返回
 * @param {number} adId 广告ID
 * @param {number} adType 广告类型-内部品牌商推荐-1，外部连接推荐-2
 * @param {string} icon 广告Icon信息
 * @param {string} desc 添加的文字描述信息
 * @param {number} targetId 拓展ID信息
 * @param {string} extensionArgs 拓展参数
 */
export interface ResAdvertisingModelListReturnModel extends bodyModel<ResAdvertisingModel[]> {
}

/**
 * 广告响应模型
 * @param {number} adId 广告ID
 * @param {adTypeEnums} adType 广告类型-内部品牌商推荐-1，外部链接推荐-2
 * @param {string} icon 广告Icon信息
 * @param {string} desc 添加的文字描述信息
 * @param {number} targetId 拓展ID信息
 * @param {string} extensionArgs 拓展参数
 * @param {string} adLink 广告连接
 */
export interface ResAdvertisingModel {
  adId?: number
  adType?: adTypeEnums
  icon: string
  desc: string
  targetId: number
  extensionArgs: string
  adLink:string
}


