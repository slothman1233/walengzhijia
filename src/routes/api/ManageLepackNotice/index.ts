

//managelepackproduct


import { Context } from 'koa'
import { get, post } from '../../../common/decorator/httpMethod'
import { GetNoticeByUidRm, HasNotReadNoticeRm, SetNoticeIsReadByPlatRm, SetNoticeIsReadRm } from '../../../controller/ManageLepackNotice.controller'
import { NoticeReadModel } from '../../../model/notice/notice'
import { GetNoticeByUidModel, HasNotReadNoticeByPlatModel, HasNotReadNoticeModel } from '../../../services/ManageLepackNotice.services'
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

  /**
  * 用户是否存在未读通知
  * @param {number} userId 用户id
  */
  @get('/HasNotReadNotice')
  async HasNotReadNotice(ctx: Context) {
      let models = await HasNotReadNoticeRm((<HasNotReadNoticeModel>ctx.query))
      ctx.body = models
  }

  /**
   * 通知只读设置处理
   * @param {number} receiverUser 接收用户
   * @param {NoticeReadDetailModel[]} noticeIds 批量设置已读的通知ID
   */
  @post('/SetNoticeIsRead')
  async SetNoticeIsRead(ctx: Context) {
      let models = await SetNoticeIsReadRm((<NoticeReadModel>ctx.request.body))
      ctx.body = models
  }


  /**
* 根据板块设置用户全部已读操作
* @param {number} userId 接收用户
* @param {NotificationQueryTypeDefine} notificationQueryType 查找通知类型
  */
  @post('/SetNoticeIsReadByPlat')
  async SetNoticeIsReadByPlat(ctx: Context) {
      let models = await SetNoticeIsReadByPlatRm((<HasNotReadNoticeByPlatModel>ctx.request.body))
      ctx.body = models
  }


}

