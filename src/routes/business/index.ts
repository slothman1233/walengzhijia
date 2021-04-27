
import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'
import { GetCompanyInfoById, GetSalersByCompanyId } from '../../controller/company.controller'
import { GetCompanyProduct, GetCompanyProductByTypeId, GetCompanyProductType } from '../../controller/product.controller'
import { GetReputationByCompany, GetReputationStatisticsByProduct } from '../../controller/Reputation.controller'



export default class Business {

    @get('/:companyId?')
    async index(ctx: Context, next: Next) {
        let { companyId } = ctx.params
        let productTypeId = 0
        console.log(companyId)
        //公司信息
        let companyinfo = await GetCompanyInfoById({ companyId })

        //根据公司ID获得所有产品分类
        let reputationtype = await GetCompanyProductType({ companyId })

        let reputationtypeinfo: any[] = []
        reputationtype.forEach((item, index) => {
            if (index === 0) {
                productTypeId = item.productTypeId
            }
            reputationtypeinfo.push({
                class: '',
                title: item.productTypeName,
                id: item.productTypeId,
                nlink: 'javascript:(0)'
            })
        })
        //----------------------------------------------
        //根据公司ID和产品id 获取产品列表
        let GetCompanyProduct = await GetCompanyProductByTypeId({ companyId, productTypeId })
        //----------------------------------------------
        ///api/Reputation/GetReputationByCompany
        let Reputation = await GetReputationByCompany(companyId)

        let reshighKb: any[] = []
        let reshighKbChart: any[] = []
        if (Reputation !== null) {
            Reputation.forEach((item) => {
                reshighKb.push({
                    hread: item.userIcon,
                    img: item.productCover,
                    name: item.userName,
                    kbscore: item.statisticsModel.score,
                    link: `/business/product/${item.companyId}/${item.productId}`,
                    title: item.productName,
                    description: item.summary
                })

                let name: any[] = []
                let value: any[] = []
                item.statisticsModel.reputationScore.forEach((kbitem) => {
                    name.push(kbitem.reputationTypeName)
                    value.push(kbitem.reputationScore)
                })
                reshighKbChart.push({
                    name,
                    value
                })
            })
        }
        //----------------------------------------------

        await ctx.render('business/index', {
            Reputation,
            companyId,
            companyinfo,
            reputationtypeinfo,
            GetCompanyProduct,
            reshighKb,
            reshighKbChart: JSON.stringify(reshighKbChart)
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
