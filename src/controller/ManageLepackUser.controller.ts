import { JSONParse } from '../common/utils/ModelHelper'
import { bodyModel } from '../model/resModel'
import { ResUserModel, ResUserModelReturnModel } from '../model/user/resUser'
import { LepackUserItemModel, LepackUserModel } from '../model/user/User'
import ManageLepackUsers, { getuserByuserIdModel } from '../services/ManageLepackUser.services'

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



/**
 * 根据用户id用户完成的用户信息
 * getuserByuserIdModel
 */
export async function GetUserById(params: getuserByuserIdModel): Promise<ResUserModel | null> {
    let rm = await GetUserByIdRm(params)
    try {
        let models = JSONParse<ResUserModel | null>(rm?.code, rm?.bodyMessage)
        return models
    } catch (e) {
        return null
    }

}

/**
 * 根据用户id用户完成的用户信息
 * getuserByuserIdModel
 */
export async function GetUserByIdRm(params: getuserByuserIdModel): Promise<ResUserModelReturnModel> {
    return await ManageLepackUsers.GetUserById(params).catch(data => data)
}