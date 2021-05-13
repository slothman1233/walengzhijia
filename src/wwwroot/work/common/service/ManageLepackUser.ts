

import http from './http'

import { bodyModel } from '../../../../model/resModel'
import { LepackUserItemModel, LepackUserModel } from '../../../../model/user/User'



/**
 * 修改用户
 * LepackUserModel
 */
export const UpdateUser = async (options: LepackUserModel): Promise<bodyModel<boolean>> => await http.post<boolean>(`/api/ManageLepackUser/UpdateUser`, options)


/**
 * 单项修改用户信息
 * LepackUserItemModel
 */
export const UpdateUserByItem = async (options: LepackUserItemModel): Promise<bodyModel<boolean>> => await http.post<boolean>(`/api/ManageLepackUser/UpdateUserByItem`, options)



