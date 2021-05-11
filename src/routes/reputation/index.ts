
import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'
import { GetCompnays } from '../../controller/company.controller'
import { GetReputationTypeById } from '../../controller/ManageLepackReputaion.controller'
import { GetCompanyProduct, GetCompanyProductById, GetCompanySimilarProductById } from '../../controller/product.controller'
import { GetReputationByProductId } from '../../controller/Reputation.controller'



/**
* @param {number} productId 产品ID
* @param {number} companyId 公司ID
 */
export default class Reputation {
    @get('/publish/:companyId?/:productId?')
    async publish(ctx: Context) {
        let { companyId, productId } = ctx.params
        //获取所有品牌商
        let allbrandingSelectOption: any = { selectIndex: 1, data: [] }
        let CompnaysAll = await GetCompnays()
        CompnaysAll.forEach((item, index) => {
            if (parseInt(companyId) === item.companyId) {
                allbrandingSelectOption.selectIndex = index
            }
            allbrandingSelectOption.data.push({
                id: item.companyId,
                value: item.fullName
            })

        })

        //----------------------------------------------
        // 获取品牌商对应的产品
        if (!companyId) {
            companyId = CompnaysAll[0].companyId
        }
        let CompanyProduct = await GetCompanyProduct({ companyId })
        let companyProductObject: any = {
            selectIndex: 0,
            data: []
        }


        let productTypeId = 0
        if (CompanyProduct) {
            CompanyProduct.forEach((item, index) => {
                if (productId) {
                    if (item.productId === parseInt(productId)) {
                        companyProductObject.selectIndex = index
                        productTypeId = parseInt(item.productTypeId)
                    }
                } else {
                    //没有传产品默认给第一个产品的产品类型
                    if (index === 0) {
                        productTypeId = parseInt(item.productTypeId)
                    }
                }

                companyProductObject.data.push({
                    id: `${item.productId}_${item.productTypeId}`,
                    value: item.productName
                })
            })
        } else {

        }

        //----------------------------------------------


        //评分项
        let scoreItems = await GetReputationTypeById({ productTypeId })

        //----------------------------------------------
        await ctx.render('reputation/publish', {
            allbrandingSelectOption,
            companyProductObject,
            scoreItems,
            companyId,
            productId: productId || CompanyProduct[0].productId
        })

    }

    /**
    * @param {number} companyId 品牌商ID
    * @param {number} productId 产品ID
    */
    @get('/:companyId?/:productId?')
    async index(ctx: Context) {
        let { companyId, productId } = ctx.params
        //获取产品信息
        let CompanyProduct = await GetCompanyProductById({ productId })

        //-------------------------------
        //获取产品分类
        let reputationtypeinfo: any[] = []
        if (CompanyProduct) {
            reputationtypeinfo.push({
                id: CompanyProduct.productId,
                value: CompanyProduct.productName
            })

        }

        let reputationtype = await GetCompanySimilarProductById({ productId })
        if (reputationtype) {
            reputationtype.forEach(item => {
                reputationtypeinfo.push({
                    id: item.productId,
                    value: item.productName
                })
            })
        }

        //-------------------------------
        //获取口碑信息
        let ReputationData = await GetReputationByProductId(productId) || []


        //-------------------------------


        await ctx.render('reputation/index', {
            companyId,
            productId,
            CompanyProduct,
            reputationtypeinfo,
            ReputationData
        })

    }






}

