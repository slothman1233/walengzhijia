
import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'
import { GetCompanyInfoById, GetSalersByCompanyId } from '../../controller/company.controller'
import { GetCompanyProduct, GetCompanyProductByTypeId } from '../../controller/product.controller'
import { GetReputationByCompany, GetReputationStatisticsByProduct } from '../../controller/Reputation.controller'



export default class Business {

    @get('/:companyId?')
    async index(ctx: Context, next: Next) {
        let { companyId } = ctx.params
        //  let models = await GetReputationByCompany(companyId)
        //公司信息
        let companyinfo = await GetCompanyInfoById({ companyId })

        //根据公司ID获得所有产品信息
        let reputationinfo = await GetCompanyProduct({ companyId })

        //----------------------------------------------


        await ctx.render('business/index', {

            companyId,
            companyinfo,
            reputationinfo
        })

    }

    /**
    * @param {number} companyId 品牌商ID
    * @param {number} productTypeId 产品ID
    */
    @get('/product/:companyId/:productTypeId?')
    async product(ctx: Context, next: Next) {

        let { companyId, productTypeId } = ctx.params

        //销售信息
        let salers = await GetSalersByCompanyId({ companyId })
        //----------------------------------------------

        //获取产品信息
        // let CompanyProductInfo = await GetCompanyProductByTypeId({
        //     companyId, productTypeId
        // })
        //品牌商资料
        let kbByProduct = await GetReputationStatisticsByProduct(1)
        let kbscoreData: any[] = []

        if (kbByProduct) {

            kbByProduct.reputationScore.forEach(item => {
                kbscoreData.push({
                    name: item.reputationTypeName,
                    number: item.reputationScore
                })
            })
        }
        //----------------------------------------------

        await ctx.render('business/product', {
            companyId,
            productTypeId,
            kbByProduct,
            kbscoreData,
            salers
        })

    }
    @get('/answer/:id?')
    async answer(ctx: Context, next: Next) {

        await ctx.render('business/answer', {})

    }



}


export const ss = function () { return 1 }
