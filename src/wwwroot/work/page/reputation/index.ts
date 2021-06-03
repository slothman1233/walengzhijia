import imgPreview from '../../common/utils/imgPreview/imgPreview'
import { bodyModel } from '../../../../model/resModel'
import { getcomponent } from '../../common/service/ComponentService/ComponentService'
import { navigationbar2 } from '../../components/navigationbar'
import { selectOption1 } from '../../components/select'
import { GetReputationByCompanyFilter, GetReputationByProductId } from '../../common/service/Reputation.services'
import type { JQueryStatic } from '../../../assets/plugin/jquery/jquery'
import { subCodeEnums } from '../../../../enums/enums'
import window from '../../common/win/windows'
import { ResReputationFilterModelReturnModel } from '../../../../model/reputation/resreputation'
declare const $: JQueryStatic
declare const companyId: any
declare const productId: any
declare const pageSize: any
declare const reputationType: any

let mian = document.querySelector('#main');
(function () {

    selectOption1('option1', (id, e, option) => {
        if (parseInt(productId) === id) {
            return
        }
        { document.location.href = `/reputation/${companyId}/${id}` }
        option.style.display = 'none'
    })
})();

(function () {
    mian.querySelector('.cr .list_box').querySelectorAll('.child').forEach((item: HTMLElement) => {

        imgPreview({
            parentEle: item.querySelector('.atlas'),
            key: 'img',
            clickCallback: function (dom, ev) {
                return true
            }
        })
    })


})();

(function () {
    //是否加载完成获取是否还有更多
    let isloaded = false
    let pageIndex = 1
    let row2 = document.querySelector('.row2')
    let list_box = row2.querySelector('.list_box')
    navigationbar2('reputationlist', async (dom) => {
        let id = dom.getAttribute('data-id')
        let data: ResReputationFilterModelReturnModel
        if (parseInt(productId) === 0) {
            data = await GetReputationByCompanyFilter(parseInt(companyId), 1, parseInt(pageSize), parseInt(id))
        } else {
            data = await GetReputationByProductId(parseInt(productId), 0, parseInt(pageSize), parseInt(id))
        }
        pageIndex = 1

        //
        if (data.code === 0 && data.subCode === subCodeEnums.success && data.bodyMessage) {
            let dataobj: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'reputationtemp', data: { args: data.bodyMessage.reputations } })
            if (dataobj.code === 0) {
                list_box.innerHTML = dataobj.bodyMessage
                isloaded = false
                window.imgload()
            }
        }
    })



    document.onscroll = async function () {

        if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight <= 150) {

            if (isloaded) { return }
            isloaded = true
            let id = row2.querySelector('#reputationlist .select').getAttribute('data-id')
            let length = $(list_box).find('.child').length
            let time = $(list_box).find('.child')[length - 1].getAttribute('data-time')
            time = time.substr(0, 10)
            let data: ResReputationFilterModelReturnModel
            if (parseInt(productId) === 0) {
                pageIndex = pageIndex + 1
                data = await GetReputationByCompanyFilter(parseInt(companyId), pageIndex, parseInt(pageSize), parseInt(id))
            } else {
                data = await GetReputationByProductId(parseInt(productId), parseInt(time), parseInt(pageSize), parseInt(id))
            }

            if (data.code === 0 && data.subCode === subCodeEnums.success && data.bodyMessage) {

                let dataobj: bodyModel<string> = await getcomponent({ path: 'components/list.njk', name: 'reputationtemp', data: { args: data.bodyMessage.reputations } })
                if (dataobj.code === 0) {
                    $(list_box).append(dataobj.bodyMessage)
                    window.imgload()
                    isloaded = data.bodyMessage.reputations.length < parseInt(pageSize) ? true : false


                }
            }
        }
    }




})()