import { JSONParse } from '../common/utils/ModelHelper'
import { ResWebLinkModel, ResWebLinkModelListReturnModel } from '../model/link/weblink'
import WebsiteLinks from '../services/websitelink.services'

/**
 * 获取友情链接
 */
export async function GetWebLinks(): Promise<ResWebLinkModel[] | null> {
    let rm = await GetWebLinksRm()
    let models = JSONParse<ResWebLinkModel[] | null>(rm?.code, rm?.bodyMessage)
    return models
}

/**
* 获取友情链接
*/
export async function GetWebLinksRm(): Promise<ResWebLinkModelListReturnModel> {
    return await WebsiteLinks.GetWebLinks().catch(data => data)
}