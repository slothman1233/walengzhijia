

/**
 * 
 * @param {number} industryId 行业标识ID
 * @param {string} productType 行业产品类型名称
 * @param {string} productTypeIcon 行业产品分类icon图标
 */
export interface ProductTypeModel {
  industryId: number
  productType: string
  productTypeIcon: string
}

/**
 *  产品分类下面的标签分类
 * @param {number} productTypeDetailId 产品分类，二级分类
 * @param {string} productTypeDetail 产品分类标签分类
 */
export interface ProductTypeDetailModel {
  productTypeDetailId: number
  productTypeDetail: string
}

