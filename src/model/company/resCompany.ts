
import { HotCompanyDefine } from '../../enums/enums'
import { string } from '../../wwwroot/assets/plugin/xlsx/jszip'
import { pageTypeModel } from '../pageModel'
import { ResCompanyInfoIndexPageModel } from '../product/resproductType'
import { ResCompanyProductInfoModel, ResReputationStatisticsModel } from '../reputation/resreputation'
import { bodyModel } from '../resModel'




/**
 * 公司信息
 * @param {number} companyId 公司标识ID
 * @param {string} fullName 公司全称
 * @param {string} abbrName 公司简称
 * @param {string} logo 公司封面图
 * @param {string} website 公司网站首页
 * @param {string} addr 公司联系地址
 * @param {string} contactPhone 联系电话
 * @param {string} desc 公司介绍
 * @param {string} license 营业执照图片
 * @param {number} totalReputationCount 总口碑数
 * @param {number} favorableRate 好评率
 * @param {number} highReputationCount 优质口碑数
 * @param {number} reputationScore 整体口碑得分
 * @param {string} stockInfo 股票信息
 * @param {HotCompanyDefine} hotDefine 品牌商类型
 * @param {string} VideoIntroduce 视频介绍
 * @param {number} Weight 公司权重，在排名的时候优先按照公司权重进行排序处理
 */
export interface ResCompanyInfoModel {
  companyId: number
  fullName: string
  abbrName: string
  logo: string
  website: string
  addr: string
  contactPhone: string
  desc: string
  license: string
  totalReputationCount: number
  favorableRate: number
  highReputationCount: number
  reputationScore: number
  stockInfo: string
  hotDefine: HotCompanyDefine
  VideoIntroduce: string
  Weight: number
}

/**
 * 公司信息返回的bodyModel模型
 * @param {number} companyId 公司标识ID
 * @param {string} fullName 公司全称
 * @param {string} abbrName 公司简称
 * @param {string} logo 公司封面图
 * @param {string} website 公司网站首页
 * @param {string} addr 公司联系地址
 * @param {string} desc 公司介绍
 * @param {string} license 营业执照图片
 */
export interface ResCompanyInfoModelReturnModel extends bodyModel<ResCompanyInfoModel> {

}




/**
 * 热门板块-公司信息
 * @param {number} companyId 公司标识ID
 * @param {string} fullName 公司全称
 * @param {string} abbrName 公司简称
 * @param {string} logo 公司封面图
 * @param {number} companySort 排序
 * @param {ResReputationStatisticsModel} reputation 口碑概要信息
 * @param {string[]} companyLabels 公司标签
 * @param {HotCompanyDefine} hotType 品牌商的类型标记
 */
export interface ResCompanyHotModel {
  companyId?: number
  fullName: string
  abbrName: string
  logo: string
  companySort: number
  reputation: ResReputationStatisticsModel
  companyLabels: string[]
  hotType: HotCompanyDefine
}


/**
 * 销售返回模型
 * @param {number} salerId 销售ID，删除和修改信息时候使用
 * @param {number} companyId  公司ID-对应公司下面的销售人员
 * @param {string} salerName 销售员名称
 * @param {string} salerPosition 销售职位
 * @param {string} salerFunction 销售职能
 * @param {string} salerIcon 销售头像
 * @param {string} salerSummary 销售介绍
 * @param {string} salerWorkYears 销售从业年限
 * @param {number} sortId 销售排序ID
 * @param {string} createTime 创建时间
 */
export interface ResCompanySalerModel {
  salerId?: number
  companyId?: number
  salerName: string
  salerPosition: string
  salerFunction: string
  salerIcon: string
  salerSummary: string
  salerWorkYears: string
  sortId?: number
  createTime: string
}

/**
 * 销售返回的bodyModel模型
 * @param {number} salerId 销售ID，删除和修改信息时候使用
 * @param {number} companyId  公司ID-对应公司下面的销售人员
 * @param {string} salerName 销售员名称
 * @param {string} salerPosition 销售职位
 * @param {string} salerFunction 销售职能
 * @param {string} salerIcon 销售头像
 * @param {string} salerSummary 销售介绍
 * @param {string} salerWorkYears 销售从业年限
 * @param {number} sortId 销售排序ID
 * @param {string} createTime 创建时间
 */
export interface ResCompanySalerModelReturnModel extends bodyModel<ResCompanySalerModel> {

}


/**
 * 销售返回的bodyModel模型
 * @param {number} salerId 销售ID，删除和修改信息时候使用
 * @param {number} companyId  公司ID-对应公司下面的销售人员
 * @param {string} salerName 销售员名称
 * @param {string} salerPosition 销售职位
 * @param {string} salerFunction 销售职能
 * @param {string} salerIcon 销售头像
 * @param {string} salerSummary 销售介绍
 * @param {string} salerWorkYears 销售从业年限
 * @param {number} sortId 销售排序ID
 */
export interface ResCompanySalerModelListReturnModel extends bodyModel<ResCompanySalerModel[]> {
}


/**
 * 热门板块-公司信息返回的bodyModel模型
 * @param {number} companyId 公司标识ID
 * @param {string} fullName 公司全称
 * @param {string} abbrName 公司简称
 * @param {string} logo 公司封面图
 * @param {number} companySort 排序
 * @param {ResReputationModel} reputation 口碑概要信息
 * @param {string} companyLabels 公司标签
 */
export interface ResCompanyHotModelListReturnModel extends bodyModel<ResCompanyHotModel[]> {

}


/**
 * 返回询价模型
 * @param {number} advisoryId 产品询价模型ID，用户修改和删除
 * @param {number} companyId 公司ID
 * @param {number} productId 咨询的公司产品ID
 * @param {string} contactPhone 用户联系电话
 * @param {number} summary 用户需求描述
 * @param {number} status 咨询状态
 * @param {ResCompanySalerModel[]} salers 提交的销售，用于绑定销售，咨询关系的
 */
export interface ResCompanyProductAdvisoryModel {
  advisoryId?: number
  companyId?: number
  productId?: number
  contactPhone: string
  summary: string
  status: number
  salers: ResCompanySalerModel[]
}

/**
 * 返回询价模型的bodyModel
 * @param {number} advisoryId 产品询价模型ID，用户修改和删除
 * @param {number} companyId 公司ID
 * @param {number} productId 咨询的公司产品ID
 * @param {string} contactPhone 用户联系电话
 * @param {number} summary 用户需求描述
 * @param {number} status 咨询状态
 * @param {ResCompanySalerModel[]} salers 提交的销售，用于绑定销售，咨询关系的
 */
export interface ResCompanyProductAdvisoryModelListReturnModel extends bodyModel<ResCompanyProductAdvisoryModel[]> {

}

/**
 * 返回询价模型的bodyModel
 * @param {number} advisoryId 产品询价模型ID，用户修改和删除
 * @param {number} companyId 公司ID
 * @param {number} productId 咨询的公司产品ID
 * @param {string} contactPhone 用户联系电话
 * @param {number} summary 用户需求描述
 * @param {number} status 咨询状态
 * @param {ResCompanySalerModel[]} salers 提交的销售，用于绑定销售，咨询关系的
 */
export interface ResCompanyProductAdvisoryModelReturnModel extends bodyModel<ResCompanyProductAdvisoryModel[]> {

}

/**
 * 获取所有公司信息的bodyModel返回
 * @param {number} companyId 公司标识ID
 * @param {string} fullName 公司全称
 * @param {string} abbrName 公司简称
 * @param {string} logo 公司封面图
 * @param {string} website 公司网站首页
 * @param {string} addr 公司联系地址
 * @param {string} desc 公司介绍
 * @param {string} license 营业执照图片
 */
export interface ResCompanyInfoModelListReturnModel extends bodyModel<ResCompanyInfoModel[]> {


}

/**
 * 企业品牌商模型
 * @param {number} totalReputationCount 总口碑数
 * @param {number} favorableRate 好评率
 * @param {number} highReputationCount 优质口碑数
 * @param {number} reputationScore 整体口碑得分
 * @param {ResCompanyHotModel} company 热门板块-公司信息
 * @param {string[]} productTypes 公司的产品覆盖的产品二级分类有那些
 */
export interface ResCompanyBrandModel {
  totalReputationCount?: number
  favorableRate?: number
  highReputationCount?: number
  reputationScore?: number
  company: ResCompanyHotModel
  productTypes: string[]
}


/**
 * 企业品牌商模型
 * @param {number} totalReputationCount 总口碑数
 * @param {number} favorableRate 好评率
 * @param {number} highReputationCount 优质口碑数
 * @param {number} reputationScore 整体口碑得分
 * @param {ResCompanyHotModel} company 热门板块-公司信息
 * @param {string[]} productTypes 公司的产品覆盖的产品二级分类有那些
 */
export interface ResCompanyBrandModelPagedModel extends pageTypeModel<ResCompanyBrandModel> {
}

/**
 * 企业品牌商模型 bodyModel的返回
 * @param {number} totalReputationCount 总口碑数
 * @param {number} favorableRate 好评率
 * @param {number} highReputationCount 优质口碑数
 * @param {number} reputationScore 整体口碑得分
 * @param {ResCompanyHotModel} company 热门板块-公司信息
 * @param {string[]} productTypes 公司的产品覆盖的产品二级分类有那些
 */
export interface ResCompanyBrandModelPagedModelReturnModel extends bodyModel<ResCompanyBrandModelPagedModel> {

}


/**
 * 产品信息的bodyModel 模型
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
 */
export interface ResCompanyProductInfoModelReturnModel extends bodyModel<ResCompanyProductInfoModel> {

}


/**
 * 同类产品模型
 * @param {number} productId 产品ID
 * @param {string} productName 产品名称
 */
export interface ResCompanySimilarProductModel {
  productId: number
  productName: string

}

/**
 * 同类产品模型
 */
export interface ResCompanySimilarProductModelListReturnModel extends bodyModel<ResCompanySimilarProductModel[]> {

}


/**
 * 添加销售
 * @param {number} salerId 销售ID，删除和修改信息时候使用
 * @param {number} companyId 公司ID-对应公司下面的销售人员
 * @param {string} salerName 销售员名称
 * @param {string} salerPosition 销售职位
 * @param {string} salerFunction 销售职能
 * @param {string} salerIcon 销售头像
 * @param {string} salerSummary 销售介绍
 * @param {string} salerWorkYears 销售从业年限
 * @param {number} sortId 销售排序ID
 * @param {number} createUser 添加用户
 */
export interface CompanyProductSalerModel {
  salerId?: number
  companyId?: number
  salerName?: string
  salerPosition?: string
  salerFunction?: string
  salerIcon?: string
  salerSummary?: string
  salerWorkYears?: string
  sortId?: number
  createUser?: number
}