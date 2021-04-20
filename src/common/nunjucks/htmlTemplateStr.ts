import { bodyModel } from '../../model/resModel'
import { nunRender } from './index'
import commonService from '../../services/common/component.services'


export default {
    'FmMoreRead': function (url: string, ...arg: any) {

        try {
            return nunRender(url, { models: arg })

        } catch (e) {
            return 'sdfdsf'
        }

    },
    'userlistbox': async function (url: string, ...arg: any) {

        try {
            let html = await commonService.ComponentApiService({ path: url, name: 'userlistbox', data: arg })
            return html
        } catch (e) {
            return 'sdfdsf'
        }

    }
}
