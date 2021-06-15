import { NotificationTypeDefine, } from '../../enums/enums'
/**
 * 系统通知模型
 * @param {NotificationTypeDefine} notificationType 通知类型
 * @param {number[]} receiver
 * @param {number} sender 发送者
 * @param {string} title 通知标题
 * @param {string} link 通知的外部链接
 * @param {string} content 通知内容
 * @param {string} noticeContent  通知内容用于传递
 */
export interface NoticeModel {
  notificationType: NotificationTypeDefine
  receiver: number[]
  sender: number
  title: string
  link: string
  content: string
  noticeContent: string
}

export interface NoticeSystemModel extends NoticeModel { }

export interface NoticeActivityModel extends NoticeModel { }

/**
 * 通知只读设置处理
 * @param {number} receiverUser 接收用户
 * @param {NoticeReadDetailModel[]} noticeIds 批量设置已读的通知ID
 */
export interface NoticeReadModel {
  receiverUser: number
  noticeIds: NoticeReadDetailModel[]
}

/**
 * 通知详细内容
 */
export interface NoticeReadDetailModel {
  noticeType: number
  noticeId: number
}