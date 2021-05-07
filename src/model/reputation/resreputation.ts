import { priceShowStatusEnums, productImgTypeEnums } from '../../enums/enums'
import { ResCompanyInfoModel } from '../company/resCompany'
import { PageModel, pageTypeModel } from '../pageModel'
import { bodyModel } from '../resModel'
import { productTypeListModel } from './reputation'

export interface ResReputationModelListReturnModel extends bodyModel<ResReputationModel[]> {

}


/**
 * 口碑返回模型
 * @param {number} createUser 口碑发表人
 * @param {string} userName 发表人名称
 * @param {string} userIcon 发表人头像
 * @param {string} productName 产品名称
 * @param {number} productId 产品ID
 * @param {number} newsId 新闻ID
 * @param {number} companyId 公司ID
 * @param {string} summary 口碑描述内容
 * @param {number} reputationId 口碑ID
 * @param {string} productCover 产品封面图
 * @param {string} buyTime 购买时间
 * @param {string} useTime 使用时间 
 * @param {number} purchasePrice 购买价格
 * @param {priceShowStatusEnums} priceShowStatus 价格显示状态-显示价格，显示数字第一位有小数点，不现实价格
 * @param {ResReputationStatisticsModel} statisticsModel 口碑统计信息
 */
export interface ResReputationModel {

  createUser: number
  userName: string
  userIcon: string
  productName: string
  productId: number
  companyName: string
  newsId: string
  companyId: number
  summary: string
  reputationId: number
  buyTime: string
  useTime: string
  purchasePrice: number
  productCover: string
  priceShowStatus: priceShowStatusEnums
  statisticsModel: ResReputationStatisticsModel
}

/**
 * 口碑统计信息
 * @param {number} score 口碑评分(总分)
 * @param {number} reputationCount 口碑数量
 * @param {ResReputationScoreStatisticsModel[]} reputationScore 聚合统计
 */
export interface ResReputationStatisticsModel {
  score: number
  reputationCount: number
  reputationScore: ResReputationScoreStatisticsModel[]


}

/**
 * 口碑评分统计信息
 * @param {number} reputationTypeId 口碑评分项
 * @param {string} reputationTypeName： 口碑评分项名称
 * @param {number} reputationScore 口碑评分项聚合统计值
 * 
 */
export interface ResReputationScoreStatisticsModel {
  reputationTypeId: number
  reputationTypeName: string
  reputationScore: number
}

/**
 * 公司产品详细参数描述
 * @param {string} productKey 产品参数指标
 * @param {string} productValue 产品参数指标值
 */
export interface ResCompanyProductInfoDetailModel {
  productKey: string
  productValue: string

}

/**
 * 产品信息
 * @param {number} productId 产品ID
 * @param {string} productName 产品名称
 * @param {number} listingDateYear 上市年份
 * @param {number} listingDateMonth 上市月份
 * @param {string} productVideo 产品视频介绍地址
 * @param {string} productCover 产品封面图
 * @param {string} summary 产品详细描述信息
 * @param { { [index: string]: any } } classify  允许提交多个三级标签场景
 * @param {ResReputationStatisticsModel} statisticsModel 	口碑统计信息
 * @param {ResCompanyProductInfoDetailModel[]} productArgs 产品参数指标
 * @param {ResCompanyInfoModel} company 公司信息
 * @param {ResCompanyProductImageModel[]}companyProductImages 产品细节图集合对象
 */
export interface ResCompanyProductInfoModel {
  productId?: number
  productName: string
  listingDateYear?: number
  listingDateMonth?: number
  productVideo: string
  productCover: string
  productTypeId: string
  summary: string
  classify: { [index: string]: any }
  statisticsModel: ResReputationStatisticsModel
  productArgs: ResCompanyProductInfoDetailModel[],
  company: ResCompanyInfoModel
  companyProductImages: ResCompanyProductImageModel[]
}

/**
 * 产品细节图
 * @param {productImgTypeEnums} productImgType 产品图片类型-外观图，细节图，等等
 * @param {string} imageUrl 图片地址
 * @param {string} imageDesc 图片描述信息
 */
export interface ResCompanyProductImageModel {
  productImgType: productImgTypeEnums
  imageUrl: string
  imageDesc: string

}



/**
 * 产品信息的bodyModel模型
 * @param {number} productId 产品ID
 * @param {string} productName 产品名称
 * @param { { [index: string]: any } } classify  允许提交多个三级标签场景
 * @param {ResReputationStatisticsModel} statisticsModel 	口碑统计信息
 * @param {ResCompanyProductInfoDetailModel[]} productArgs 产品参数指标
 */
export interface ResCompanyProductInfoModelListReturnModel extends bodyModel<ResCompanyProductInfoModel[]> {

}

/**
 * 根据公司ID和产品分类获得所有产品信息,需要分页模型接收 bodyModel的返回
 * @param {number} productId 产品ID
 * @param {string} productName 产品名称
 * @param {number} listingDateYear 上市年份
 * @param {number} listingDateMonth 上市月份
 * @param {string} productVideo 产品视频介绍地址
 * @param {string} productCover 产品封面图
 * @param {string} summary 产品详细描述信息
 * @param { { [index: string]: any } } classify  允许提交多个三级标签场景
 * @param {ResReputationStatisticsModel} statisticsModel 	口碑统计信息
 * @param {ResCompanyProductInfoDetailModel[]} productArgs 产品参数指标
 * @param {ResCompanyInfoModel} company 公司信息
 */
export interface ResCompanyProductInfoModelPagedModelReturnModel extends bodyModel<ResCompanyProductInfoModelPagedModel> {

}

/**
 * 根据公司ID和产品分类获得所有产品信息,需要分页模型接收
 * @param {number} productId 产品ID
 * @param {string} productName 产品名称
 * @param {number} listingDateYear 上市年份
 * @param {number} listingDateMonth 上市月份
 * @param {string} productVideo 产品视频介绍地址
 * @param {string} productCover 产品封面图
 * @param {string} summary 产品详细描述信息
 * @param { { [index: string]: any } } classify  允许提交多个三级标签场景
 * @param {ResReputationStatisticsModel} statisticsModel 	口碑统计信息
 * @param {ResCompanyProductInfoDetailModel[]} productArgs 产品参数指标
 * @param {ResCompanyInfoModel} company 公司信息
 */
export interface ResCompanyProductInfoModelPagedModel extends pageTypeModel<ResCompanyProductInfoModel> {

}


/**
 * 所有产品分类的bodyModel模型
 * @param {number} 分类id
 * @param {string} 分类名称
 */
export interface ResproductTypeListModel extends bodyModel<productTypeListModel[]> {

}

/**
 * 获得热门口碑排行数据模型
 * @param {string} companyName 公司名称
 * @param {nuber} companyId 公司ID
 * @param {string} logo 公司封面图
 * @param {number} reputationCount 口碑数量（涵盖所有）
 * @param {number} reputationScore 热门口碑分数
 */
export interface ResHotReputationModel {
  companyName?: string
  companyId: number
  logo: string
  reputationCount: number
  reputationScore: number
}


/**
 * 获得热门口碑排行数据模型返回的bodyModel
 * @param {string} companyName 公司名称
 * @param {nuber} companyId 公司ID
 * @param {string} logo 公司封面图
 * @param {number} reputationCount 口碑数量（涵盖所有）
 * @param {number} reputationScore 热门口碑分数
 */
export interface ResHotReputationModelListReturnModel extends bodyModel<ResHotReputationModel[]> {

}


/**
 * 口碑评分项属性的bodyModel
 * @param {number} reputationTypeId 口碑属性的标识ID，用于在score关联
 * @param {number} productTypeId 产品类型ID
 * @param {string} reputationName 口碑评分项的属性字段值
 * 
 */
export interface ResReputationTypeModelListReturnModel extends bodyModel<ResReputationTypeModel[]> {

}

/**
 * 口碑评分项属性字段
 * @param {number} reputationTypeId 口碑属性的标识ID，用于在score关联
 * @param {number} productTypeId 产品类型ID
 * @param {string} reputationName 口碑评分项的属性字段值
 * 
 */
export interface ResReputationTypeModel {
  reputationTypeId?: number
  productTypeId?: number
  reputationName: string
}

