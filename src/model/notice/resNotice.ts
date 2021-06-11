import { NotificationTypeDefine } from '../../enums/enums'
import { pageTypeModel } from '../pageModel'
import { bodyModel } from '../resModel'
/**
 * 通知响应模型
 * @param {number} noticeId 通知ID
 * @param {NotificationTypeDefine} notificationType 通知类型
 * @param {string} notificationTitle 评论标题
 * @param {string} notificationLink 通知链接
 * @param {string} notificationH5Link 移动端链接
 * @param {string} notificationContent 通知内容
 * @param {number} notificationSendUser 通知发送者
 * @param {string} notificationSendUserIcon 发送者头像
 * @param {string} notificationSendUserName 发送者昵称
 * @param {number} notificationReciveUser 通知接收者
 * @param {boolean} isRead 是否已读
 * @param {string} extensionJson 标准的拓展模型对象
 * @param {string} noticeTime 发表时间
 */
export interface ResNoticeModel {
  noticeId: number
  notificationType: NotificationTypeDefine
  notificationTitle: string
  notificationLink: string
  notificationH5Link:string
  notificationContent: string
  notificationSendUser: number
  notificationSendUserIcon:string
  notificationSendUserName:string
  notificationReceivedUser: number
  isRead: boolean
  extensionJson: string
  noticeTime:string
}
export interface ResNoticeModelPagedModel extends pageTypeModel<ResNoticeModel> {

}

export interface ResNoticeModelPagedModelReturnModel extends bodyModel<ResNoticeModelPagedModel> {

}