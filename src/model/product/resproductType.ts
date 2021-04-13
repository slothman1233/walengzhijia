import { bodyModel } from '../resModel'
import { ProductTypeDetailModel, ProductTypeModel } from './ProductType'



/**
 * 	产品分类返回
 * @param {number} industryId 行业标识ID
 * @param {string} productType 行业产品类型名称
 * @param {string} productTypeIcon 行业产品分类icon图标
 * @param {ResProductTypeDetailModel} productTypeLabels 产分分类标签
 */
export interface ResProductTypeModel extends ProductTypeModel {
  productTypeLabels: ResProductTypeDetailModel
}



/**
 * 产分分类标签
 * @param {number} productTypeId 产品分类，二级分类
 * @param {string} productTypeDetail 产品分类标签分类
 */
export interface ResProductTypeDetailModel extends ProductTypeDetailModel {

}


/**
 * 产分分类标签的bodyModel模型
 */
export interface ResProductTypeModelListReturnModel extends bodyModel<ResProductTypeModel> {

}

