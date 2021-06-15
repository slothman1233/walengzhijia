import config from '../common/config/env'
import http from '../common/utils/net'
import { NotificationTypeDefine, publishNewsTypeEnums } from '../enums/enums'
import { NoticeReadModel } from '../model/notice/notice'
import { ResNoticeModelPagedModelReturnModel } from '../model/notice/resNotice'
/**
 * 根据用户ID查找通知信息结果
 * @param {number} userId 公户id
 * @param {number} pageIndex 
 * @param {number} pageSize 页码
 * @param {boolean} notification 是否获取口碑新闻
 */
export type GetNoticeByUidModel = {
    userId: number
    pageIndex: number
    pageSize: number
    notification?: NotificationTypeDefine
}

export type HasNotReadNoticeModel = {
    userId: number
}

class ManageLepackNotice {
    /**
* 根据用户ID查找通知信息结果
* @param {number} userId 用户id
* @param {number} pageIndex 
* @param {number} pageSize 页码
* @param {NotificationTypeDefine} notification 通知类型
*/
    async GetNoticeByUid(params: GetNoticeByUidModel) {
        return await http.get<ResNoticeModelPagedModelReturnModel>(`${config.apiPath}api/ManageLepackNotice/GetNoticeByUid`, { params, headers: { 'Content-Type': 'application/json' } })
    }

    // 批量设置通知为已读状态
    // NoticeReadModel
    async SetNoticeIsRead(params: NoticeReadModel) {
        return await http.post<boolean>(`${config.apiPath}api/ManageLepackNotice/SetNoticeIsRead`, params, { headers: { 'Content-Type': 'application/json' } })
    }

    /**
     * 用户是否存在未读通知
     * HasNotReadNoticeModel
     */
    async HasNotReadNotice(params: HasNotReadNoticeModel) {
        return await http.get<boolean>(`${config.apiPath}api/ManageLepackNotice/HasNotReadNotice`, { params, headers: { 'Content-Type': 'application/json' } })
    }
}


let ManageLepackNotices = new ManageLepackNotice()

export default ManageLepackNotices