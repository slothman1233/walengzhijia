
import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'
import { GetCompnays, GetSalersByCompanyId } from '../../controller/company.controller'
import { GetCompanyProductType } from '../../controller/product.controller'
import { scoreItems } from '../../enums/enums'


/**
* @param {number} productId 产品ID
* @param {number} companyId 公司ID
 */
export default class Reputation {
    @get('/publish/:companyId?/:productId?')
    async publish(ctx: Context, next: Next) {
        let { companyId, productId } = ctx.params
        //获取所有品牌商
        let allbrandingSelectOption: any = { selectIndex: 1, data: [] };
        (await GetCompnays()).forEach((item, index) => {
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
        let CompanyProduct = await GetCompanyProductType({ companyId })
        console.log(CompanyProduct)
        let CompanyProductType: any[] = []
        CompanyProduct.forEach(item => {
            CompanyProductType.push({
                id: item.productTypeId,
                value: item.productTypeName
            })
        })
       


        //评分项
        // scoreItems
        //----------------------------------------------
        await ctx.render('reputation/publish', {
            allbrandingSelectOption,
            CompanyProductType,
            scoreItems
        })

    }

    @get('/:id?')
    async index(ctx: Context, next: Next) {

        await ctx.render('reputation/index', {})

    }






}


export const ss = function () { return 1 }
