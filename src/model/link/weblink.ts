import { bodyModel } from '../resModel'


/**
 * 返回友情链接模型的bodyModel返回
 * @param {number} webLinkId 友情链接标识ID，用于修改和移除
 * @param {string} webName 站点名称
 * @param {string} link 友情链接地址
 * @param {number} sort 友情链接顺序
 */
export interface ResWebLinkModelListReturnModel extends bodyModel<ResWebLinkModel[]> {
}

/**
 * 返回友情链接模型
 * @param {number} webLinkId 友情链接标识ID，用于修改和移除
 * @param {string} webName 站点名称
 * @param {string} link 友情链接地址
 * @param {number} sort 友情链接顺序
 */
export interface ResWebLinkModel {
  webLinkId?: number
  webName: string
  link: string
  sort?: number

}