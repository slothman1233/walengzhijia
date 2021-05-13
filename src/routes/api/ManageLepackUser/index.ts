import { Context } from 'koa'
import { post } from '../../../common/decorator/httpMethod'
import { UpdateUser, UpdateUserByItem } from '../../../controller/ManageLepackUser.controller'
import { LepackUserItemModel, LepackUserModel } from '../../../model/user/User'
export default class ManageLepackUserapi {
  /**
   * 修改用户
   * LepackUserModel
   */
  @post('/UpdateUser')
    async UpdateUser(ctx: Context) {
        let models = await UpdateUser((<LepackUserModel>ctx.request.body))
        ctx.body = models
    }

  /**
   * 单项修改用户信息
   * LepackUserItemModel
   */
  @post('/UpdateUserByItem')
  async UpdateUserByItem(ctx: Context) {
      let models = await UpdateUserByItem((<LepackUserItemModel>ctx.request.body))
      ctx.body = models
  }
}

