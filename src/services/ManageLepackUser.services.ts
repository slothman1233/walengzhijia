import config from '../common/config/env'
import http from '../common/utils/net'
import { bodyModel } from '../model/resModel'
import { LepackUserItemModel, LepackUserModel } from '../model/user/User'

export type productTypeIdModel = {
  productTypeId: number
}

class ManageLepackUser {
    // 修改用户
    // LepackUserModel
    //@CacheInterceptor('ManageLepackUser_UpdateUser', CacheTime.Min3)
    async UpdateUser(params: LepackUserModel) {
        return await http.post<bodyModel<boolean>>(`${config.apiPath}api/ManageLepackUser/UpdateUser`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    // 单项修改用户信息
    // LepackUserItemModel
    //@CacheInterceptor('ManageLepackUser_UpdateUser', CacheTime.Min3)
    async UpdateUserByItem(params: LepackUserItemModel) {
        return await http.post<bodyModel<boolean>>(`${config.apiPath}api/ManageLepackUser/UpdateUserByItem`, params, { headers: { 'Content-Type': 'application/json' } })
    }
}



let ManageLepackUsers = new ManageLepackUser()

export default ManageLepackUsers