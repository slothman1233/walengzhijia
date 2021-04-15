import { bodyModel } from '../resModel'




/**
 * 返回地区信息
 * @param {number} areaCode 地区编码
 * @param {string} areaDesc 地区值 - 自动拼接上一级ParentCode
 * @param {number} parentCode 上一层地区编码，为0代表是国家
 */
export interface ResAreaInfoModel {
  areaCode?: number
  areaDesc: string
  parentCode?: number
}


/**
 * 返回地区信息返回的bodyModel模型
 * @param {number} areaCode 地区编码
 * @param {string} areaDesc 地区值 - 自动拼接上一级ParentCode
 * @param {number} parentCode 上一层地区编码，为0代表是国家
 */
export interface ResAreaInfoModelListReturnModel extends bodyModel<ResAreaInfoModel[]> {

}


/**
 * 返回地区结构化信息
 * @param {number} areaCodes 地区编码
 * @param {string} areaDesc 地区值 - 自动拼接上一级ParentCode
 * @param {string} areaFullPath 国家地区完整衔接
 * @param {ResAreaInfoStructModel[]} childAreaCodes 国家地区完整衔接
 */
export interface ResAreaInfoStructModel {
  areaCode?: number
  areaDesc: string
  areaFullPath: string
  childAreaCodes: ResAreaInfoStructModel[]
}


/**
 * 返回地区结构化信息返回的bodyModel模型
 * @param {number} areaCodes 地区编码
 * @param {string} areaDesc 地区值 - 自动拼接上一级ParentCode
 * @param {string} areaFullPath 国家地区完整衔接
 * @param {ResAreaInfoStructModel[]} childAreaCodes 国家地区完整衔接
 */
export interface ResAreaInfoStructModelListReturnModel extends bodyModel<ResAreaInfoStructModel[]> { }