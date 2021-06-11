

//managelepackproduct


import { Context } from 'koa'
import { get } from '../../../common/decorator/httpMethod'
import { GetNoticeByUidRm } from '../../../controller/ManageLepackNotice.controller'
import { GetNoticeByUidModel } from '../../../services/ManageLepackNotice.services'
export default class ManageLepackNoticeapi {
  /**
  * 根据用户ID查找通知信息结果
  * @param {number} userId 用户id
  * @param {number} pageIndex 
  * @param {number} pageSize 页码
  * @param {NotificationTypeDefine} notification 通知类型
  */
  @get('/GetNoticeByUid')
    async GetNoticeByUid(ctx: Context) {
        let models = await GetNoticeByUidRm((<GetNoticeByUidModel>ctx.query))
        ctx.body = models
    }


}

