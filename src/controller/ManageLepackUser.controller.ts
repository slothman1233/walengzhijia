import { bodyModel } from '../model/resModel'
import { LepackUserItemModel, LepackUserModel } from '../model/user/User'
import ManageLepackUsers from '../services/ManageLepackUser.services'

/**
 * 修改用户
 * LepackUserModel
 */
export async function UpdateUser(params: LepackUserModel): Promise<bodyModel<boolean>> {
    return await ManageLepackUsers.UpdateUser(params).catch(data => data)
}

/**
 * 单项修改用户信息
 * LepackUserItemModel
 */
export async function UpdateUserByItem(params: LepackUserItemModel): Promise<bodyModel<boolean>> {
    return await ManageLepackUsers.UpdateUserByItem(params).catch(data => data)
}

