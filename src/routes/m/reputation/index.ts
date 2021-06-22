
import { Context } from 'koa'
import { get } from '../../../common/decorator/httpMethod'
import { GetCompanyInfoById, GetCompnays } from '../../../controller/company.controller'
import { GetReputationTypeById } from '../../../controller/ManageLepackReputaion.controller'
import { GetCompanyProduct } from '../../../controller/product.controller'
import { GetReputationByCompanyFilter, GetReputationByProductId } from '../../../controller/Reputation.controller'
import { ReputationTypeArray, ReputationTypeEnum } from '../../../enums/enums'
import { ResCompanyInfoModel } from '../../../model/company/resCompany'
import { ResReputationFilterModel } from '../../../model/reputation/resreputation'



/**
* @param {number} productId 产品ID
* @param {number} companyId 公司ID
 */
export default class Reputation {
    @get('/publish/:companyId?/:productId?')
    async publish(ctx: Context) {
        let { companyId, productId } = ctx.params
        //获取公司信息
        let companyInfo = await GetCompanyInfoById({ companyId })

        //----------------------------------------------

        //获取产品信息
        let thatProductName = null
        let CompanyProductInfo = await GetCompanyProduct({
            companyId
        })
        let productTypeId = 0
        let productInfoObject: any[] = []
        if (CompanyProductInfo && CompanyProductInfo.length > 0) {
            CompanyProductInfo.forEach((item, index) => {

                if (!productInfoObject[item.productTypeId]) { productInfoObject[item.productTypeId] = {} }
                if (!productInfoObject[item.productTypeId]['productName']) { productInfoObject[item.productTypeId]['productName'] = [] }
                if (!productInfoObject[item.productTypeId].product) { productInfoObject[item.productTypeId].product = [] }


                productInfoObject[item.productTypeId].product.push({
                    productName: item.productName,
                    productid: item.productId,
                    productTypeId: item.productTypeId,
                    score: item.statisticsModel?.score || 0
                })

                if (productId) {
                    if (item.productId === parseInt(productId)) {
                        productTypeId = parseInt(item.productTypeId)
                        thatProductName = item.productName
                    }
                } else {
                    //没有传产品默认给第一个产品的产品类型
                    if (index === 0) {
                        productTypeId = parseInt(item.productTypeId)
                        thatProductName = item.productName
                    }
                }


                productInfoObject[item.productTypeId].productTypeName = item.productTypeName
                productInfoObject[item.productTypeId].productTypeId = item.productTypeId

            })
        }
        //----------------------------------------------
        //评分项
        let scoreItems = await GetReputationTypeById({ productTypeId })

        //----------------------------------------------
        await ctx.render('m/reputation/publish', {
            scoreItems,
            companyId,
            productId: productId || (CompanyProductInfo && CompanyProductInfo[0]?.productId) || 0,
            thatProductName,
            companyInfo,
            productInfoObject
        })

    }



}

