
import { Context, Next } from 'koa'
import { get } from '../../common/decorator/httpMethod'
import { GetCompanyInfoById, GetCompnays } from '../../controller/company.controller'
import { GetReputationTypeById } from '../../controller/ManageLepackReputaion.controller'
import { GetCompanyProduct, GetCompanyProductById, GetCompanySimilarProductById } from '../../controller/product.controller'
import { GetReputationByCompany, GetReputationByCompanyFilter, GetReputationByProductId } from '../../controller/Reputation.controller'
import { ReputationTypeArray, ReputationTypeEnum } from '../../enums/enums'
import { ResCompanyInfoModel } from '../../model/company/resCompany'
import { ResReputationFilterModel, ResReputationStatisticsModel } from '../../model/reputation/resreputation'



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
            productId: productId || (CompanyProduct && CompanyProduct[0]?.productId) || 0
        })

    }

    /**
    * @param {number} companyId 品牌商ID
    * @param {number} productId 产品ID
    * @param {number} reputationType 口碑类型 0 全部 1 好  2 中  3 差
    */
    @get('/:companyId?/:productId?/:reputationType?')
    async index(ctx: Context) {
        let { companyId, productId = 0, reputationType = 0 } = ctx.params
        //获取产品信息
        let CompanyProducts = await GetCompanyProduct({ companyId })
        let CompanyProduct
        //-------------------------------
        //获取公司信息
        let companyInfo: ResCompanyInfoModel
        if (parseInt(productId) === 0) {
            companyInfo = await GetCompanyInfoById({ companyId })
        }
        //-------------------------------
        //获取产品分类

        let reputationSelectOption: any = {
            selectIndex: 0,
            data: [{
                id: '0',
                value: '全部产品'
            }]
        }

        if (CompanyProducts) {
            CompanyProducts.forEach((item, index) => {
                if (item.productId === parseInt(productId)) {
                    reputationSelectOption.selectIndex = index + 1
                    CompanyProduct = item
                }
                reputationSelectOption.data.push({
                    id: item.productId,
                    value: item.productName
                })
            })
        }

        //-------------------------------
        let pageSize = 10
        //获取口碑信息
        let ReputationData:ResReputationFilterModel
        if(parseInt(productId) === 0){
            ReputationData  = await GetReputationByCompanyFilter(companyId, 0, pageSize, parseInt(reputationType))
        }else{
            ReputationData  = await GetReputationByProductId(productId, 0, pageSize, parseInt(reputationType))
        }
      
        

        let reputationTypeObject: any = {
            isSelect: parseInt(reputationType) + 1,
            data: []
        }
        ReputationTypeArray.forEach((value: string, index: number) => {
            let number = ReputationData?.reputationCount || 0
            let title = ''
            let cls = 'high'
            switch (index) {
                case ReputationTypeEnum.All:
                    title = `${value}（${ReputationData?.reputationCount || 0}）`
                    cls = 'high'
                    break
                case ReputationTypeEnum.good:
                    title = `${value}（${ReputationData?.goodReputationCount || 0}）`
                    cls = 'high'
                    break
                case ReputationTypeEnum.middel:
                    title = `${value}（${ReputationData?.middleReputationCount || 0}）`
                    cls = 'high'
                    break
                case ReputationTypeEnum.short:
                    title = `${value}（${ReputationData?.badReputationCount || 0}）`
                    cls = ''
                    break
                default:
                    break
            }

            reputationTypeObject.data.push({
                class: cls,
                id: index,
                title,
                link: 'javascript:void(0);'
            })

        })

        //-------------------------------


        await ctx.render('reputation/index', {
            companyId,
            productId,
            CompanyProduct,
            reputationSelectOption,
            ReputationData,
            reputationTypeObject,
            companyInfo,
            reputationType,
            pageSize
        })

    }






}

