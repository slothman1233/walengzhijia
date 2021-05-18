import { CompanyUpdateTypeDefine, productImgTypeEnums } from '../../enums/enums'



/**
 * 公司产品信息
 * @param {number} companyId 公司标识ID
 * @param {number} createUser 创建用户
 * @param {string} productName 产品名称
 * @param {number} listingDateYear 上市年份
 * @param {number} listingDateMonth 上市月份
 * @param {string} productVideo 产品视频介绍地址
 * @param {string} productCover 产品封面图
 * @param {number} sortId 产品的排序ID，对应前台呈现
 * @param {number} status 产品状态-审核相关的
 * @param {string} summary 产品概要信息，富媒体内容
 * @param {CompanyProductInfoDetailModel[]} productDetailArguments 产品基本信息，自定义参数列表信息
 * @param {CompanyProductTypeModel} productType 公司添加产品的分类信息
 * @param {CompanyProductMediaModel[]} productMedias 产品图片，外观，视频媒体资源等
 */
export interface CompanyProductInfoModel {
  companyId?: number
  createUser?: number
  productName: string
  listingDateYear?: number
  listingDateMonth?: number
  productVideo: string
  productCover: string
  sortId?: number
  status?: number
  summary: string
  productDetailArguments: CompanyProductInfoDetailModel[]
  productType?: CompanyProductTypeModel
  productMedias: CompanyProductMediaModel[]
}

/**
 * 公司添加产品的分类信息
 * @param {number} productTypeId 产品分类ID
 * @param {number} productClassifyType 产品标签，对应三级分类信息
 */
export interface CompanyProductTypeModel {
  productTypeId?: number
  productClassifyType?: number[]
}


/**
 * 产品图片，外观，视频媒体资源等
 * @param {productImgTypeEnums} productTypeId 产品图片类型-外观图，细节图，等等
 * @param {string} imageUrl 图片地址
 * @param {string} imageDesc 图片描述信息
 */
export interface CompanyProductMediaModel {
  productImgType?: productImgTypeEnums
  imageUrl: string
  imageDesc: string
}


/**
 * 产品的拓展信息，参数信息
 * @param {number} productKey 产品参数指标
 * @param {number} productValue 产品参数指标值
 */
export interface CompanyProductInfoDetailModel {
  productKey: string
  productValue: string

}

/**
 * 产品询价模型
 * @param {number} advisoryId 产品询价模型ID，用户修改和删除
 * @param {number} companyId 公司ID
 * @param {number} productId 咨询的公司产品ID
 * @param {string} contactPhone 用户联系电话
 * @param {number} summary 用户需求描述
 * @param {number} status 咨询状态
 * @param {number} createUser 提交用户，如果登录来的话
 * @param {CompanyProductAdvisorySalerModel[]} salers 提交的销售，用于绑定销售，咨询关系的
 */
export interface CompanyProductAdvisoryModel {
  advisoryId?: number
  companyId?: number
  productId?: number
  contactPhone: string
  summary: string
  status: number
  createUser: number
  salers: CompanyProductAdvisorySalerModel[]
}


/**
 * 提交的销售，用于绑定销售，咨询关系的
 * @param {number} advisorySalerId 咨询和销售关联信息
 * @param {number} advisoryId 用户提交的咨询联系ID
 * @param {number} salerId 销售ID
 */
export interface CompanyProductAdvisorySalerModel {
  advisorySalerId?: number
  advisoryId?: number
  salerId?: number
}


/**
 * 公司单项修改内容
 * @param {number} companyId 公司ID
 * @param {number} userId 用户是否存在
 * @param {string} itemValue 单项值
 * @param {CompanyUpdateTypeDefine} itemType 公司企业修改类型属性字段枚举
 */
export interface ManageCompanyInfoItemModel {
  companyId?: number
  userId?: number
  itemValue: string
  itemType?: CompanyUpdateTypeDefine
}