
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
  productTypeLabels: ResProductTypeDetailModel[]
}


/**
 * 产分分类标签
 * @param {number} productTypeDetailId 标签ID
 * @param {string} productTypeDetail 产品分类标签分类
 */
export interface ResProductTypeDetailModel {
  productTypeDetailId?: number
  productTypeDetail?: string
}


/**
 * 产分分类标签的bodyModel模型
 */
export interface ResProductTypeModelListReturnModel extends bodyModel<ResProductTypeModel[]> {

}

/**
 * 首页布局重要产品列表信息的bodyModel模型
 * @param {number} productTypeId 产品分类标识ID,根据产品分类标识查找公司信息
 * @param {number} sort 排序信息
 * @param {string} productTypeName 产品分类名称
 * @param {ResCompanyInfoIndexPageModel} companyInfo 根据产品类型在首页获取公司信息集合
 */
export interface ResProductIndexPageModelListReturnModel extends bodyModel<ResProductIndexPageModel[]> {

}


/**
 * 首页布局重要产品列表信息
 * @param {number} productTypeId 产品分类标识ID,根据产品分类标识查找公司信息
 * @param {number} sort 排序信息
 * @param {string} productTypeName 产品分类名称
 * @param {ResCompanyInfoIndexPageModel} companyInfo 根据产品类型在首页获取公司信息集合
 */
export interface ResProductIndexPageModel {

  productTypeId: number
  sort: number
  productTypeName: string
  companyInfo: ResCompanyInfoIndexPageModel[]
}

/**
 * 根据产品类型在首页获取公司信息集合
 * @param {number} companyId 公司标识ID
 * @param {string} fullName 公司全称
 * @param {string} abbrName 公司简称
 * @param {string} logo 公司封面图
 * @param {number} companySort 排序
 * @param {ResReputationModel} reputation 口碑概要信息
 * @param {string[]} companyLabels 公司标签
 */
export interface ResCompanyInfoIndexPageModel {
  companyId: number
  fullName: string
  abbrName: string
  logo: string
  companySort: number
  reputation: ResReputationModel
  companyLabels: string[]
}

/**
 * 口碑概要信息
 * @param {number} score 口碑评分
 * @param {number} reputationCount 口碑数量
 */
export interface ResReputationModel {
  score: number
  reputationCount: number
}