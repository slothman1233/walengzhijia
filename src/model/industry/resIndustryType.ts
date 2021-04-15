import { ResProductTypeModel } from '../product/resproductType'
import { bodyModel } from '../resModel'



/**
 *  产品类型返回模型
 * @param {number} industryId 行业标识ID
 * @param {string} industryName 行业标识名称
 * @param {string} productType 行业分类大类
 */
export interface ResIndustryTypeModel {
  industryId?: number
  industryName: string
  productType: ResProductTypeModel
}


/**
 * 产品类型返回的bodyModel模型
 */
export interface ResIndustryTypeModelListReturnModel extends bodyModel<ResIndustryTypeModel[]>{

}	
 
  